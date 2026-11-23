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
    '--user-data-dir=/tmp/chrome-desktop-profile-' + Date.now()
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

    // Desktop viewport (1440 x 900)
    await sendSession('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 2,
      mobile: false
    });

    console.log('Navigating to http://localhost:4173/ on desktop...');
    await sendSession('Page.navigate', { url: 'http://localhost:4173/' });

    await sleep(5000);

    const desktopHero = await sendSession('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('References/captured-desktop-hero.png', Buffer.from(desktopHero.data, 'base64'));
    console.log('Saved References/captured-desktop-hero.png');

    // Scroll to showcase section on desktop
    await sendSession('Runtime.evaluate', {
      expression: `
        if (window.lenis) {
          window.lenis.scrollTo(window.innerHeight * 1.5, { immediate: true });
        } else {
          window.scrollTo(0, window.innerHeight * 1.5);
        }
      `
    });
    await sleep(1000);
    const desktopShowcase = await sendSession('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('References/captured-desktop-showcase.png', Buffer.from(desktopShowcase.data, 'base64'));
    console.log('Saved References/captured-desktop-showcase.png');

    // Scroll to Selected Works on desktop
    await sendSession('Runtime.evaluate', {
      expression: `
        const el = document.querySelector('.selected-works-section');
        if (el && window.lenis) {
          window.lenis.scrollTo(el, { immediate: true });
        }
      `
    });
    await sleep(1000);
    const desktopWorks = await sendSession('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('References/captured-desktop-works.png', Buffer.from(desktopWorks.data, 'base64'));
    console.log('Saved References/captured-desktop-works.png');

    // Scroll to News on desktop
    await sendSession('Runtime.evaluate', {
      expression: `
        const el = document.querySelector('.news-home-section');
        if (el && window.lenis) {
          window.lenis.scrollTo(el, { immediate: true });
        }
      `
    });
    await sleep(1000);
    const desktopNews = await sendSession('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync('References/captured-desktop-news.png', Buffer.from(desktopNews.data, 'base64'));
    console.log('Saved References/captured-desktop-news.png');

    ws.close();
  } finally {
    chrome.kill('SIGTERM');
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
