const { spawn } = require('child_process');
const fs = require('fs');

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const chrome = spawn(chromePath, [
    '--headless=new',
    '--remote-debugging-port=9222',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check',
    '--user-data-dir=/tmp/chrome-test-profile-' + Date.now()
  ]);

  try {
    let wsUrl = null;
    for (let i = 0; i < 20; i++) {
      try {
        const res = await fetch('http://127.0.0.1:9222/json/version');
        const data = await res.json();
        wsUrl = data.webSocketDebuggerUrl;
        break;
      } catch (e) {
        await sleep(200);
      }
    }

    if (!wsUrl) throw new Error('Failed to get WebSocket debugger URL');

    const ws = new WebSocket(wsUrl);
    let msgId = 1;
    const pending = new Map();

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && pending.has(msg.id)) {
        pending.get(msg.id)(msg);
        pending.delete(msg.id);
      }
    };

    await new Promise(r => ws.onopen = r);

    function send(method, params = {}) {
      return new Promise((resolve, reject) => {
        const id = msgId++;
        pending.set(id, (res) => {
          if (res.error) reject(res.error);
          else resolve(res.result);
        });
        ws.send(JSON.stringify({ id, method, params }));
      });
    }

    const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });

    function sendSession(method, params = {}) {
      return new Promise((resolve, reject) => {
        const id = msgId++;
        pending.set(id, (res) => {
          if (res.error) reject(res.error);
          else resolve(res.result);
        });
        ws.send(JSON.stringify({ id, sessionId, method, params }));
      });
    }

    await sendSession('Page.enable');
    await sendSession('DOM.enable');

    await sendSession('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
      screenOrientation: { angle: 0, type: 'portraitPrimary' }
    });

    await sendSession('Emulation.setUserAgentOverride', {
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1'
    });

    console.log('Navigating to http://localhost:4173/ ...');
    await sendSession('Page.navigate', { url: 'http://localhost:4173/' });

    // Wait 5 seconds for splash
    await sleep(5000);

    // Scroll down progressively to force all lazy images to trigger and load
    console.log('Progressively scrolling to load all lazy images...');
    await sendSession('Runtime.evaluate', {
      expression: `
        (async () => {
          const totalHeight = document.body.scrollHeight;
          const step = 600;
          for (let y = 0; y <= totalHeight; y += step) {
            if (window.lenis) {
              window.lenis.scrollTo(y, { immediate: true });
            } else {
              window.scrollTo(0, y);
            }
            await new Promise(r => setTimeout(r, 150));
          }
          // Scroll back to top
          if (window.lenis) {
            window.lenis.scrollTo(0, { immediate: true });
          } else {
            window.scrollTo(0, 0);
          }
        })()
      `,
      awaitPromise: true
    });

    await sleep(1500);

    // Full page screenshot with all lazy images loaded
    const layout = await sendSession('Page.getLayoutMetrics');
    const { contentSize } = layout;
    console.log('Full content size:', contentSize);
    const fullShot = await sendSession('Page.captureScreenshot', {
      format: 'png',
      captureBeyondViewport: true,
      clip: {
        x: 0,
        y: 0,
        width: 390,
        height: contentSize.height,
        scale: 1
      }
    });
    fs.writeFileSync('References/captured-mobile-fullpage.png', Buffer.from(fullShot.data, 'base64'));
    console.log('Saved References/captured-mobile-fullpage.png');

    ws.close();
  } finally {
    chrome.kill('SIGTERM');
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
