const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

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
    // Wait for Chrome to be ready
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

    if (!wsUrl) {
      throw new Error('Failed to get WebSocket debugger URL');
    }

    // Connect WebSocket
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

    // Create a new target / page
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

    // Emulate Mobile iPhone 14/15 (390 x 844)
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

    // Wait 3 seconds for load and animations
    await sleep(3000);

    // Capture Hero / Top
    const heroShot = await sendSession('Page.captureScreenshot', {
      format: 'png',
      clip: { x: 0, y: 0, width: 390, height: 844, scale: 2 }
    });
    fs.writeFileSync('References/captured-mobile-hero.png', Buffer.from(heroShot.data, 'base64'));
    console.log('Saved References/captured-mobile-hero.png');

    // Scroll to Showcase / Section 2
    await sendSession('Runtime.evaluate', {
      expression: `
        const el = document.querySelector('.showcase-section') || document.querySelector('.showcase-media-box');
        if (el) el.scrollIntoView({ behavior: 'instant' });
      `
    });
    await sleep(800);
    const showcaseShot = await sendSession('Page.captureScreenshot', {
      format: 'png',
      clip: { x: 0, y: 0, width: 390, height: 844, scale: 2 }
    });
    fs.writeFileSync('References/captured-mobile-showcase.png', Buffer.from(showcaseShot.data, 'base64'));
    console.log('Saved References/captured-mobile-showcase.png');

    // Scroll to Selected Works
    await sendSession('Runtime.evaluate', {
      expression: `
        const el = document.querySelector('.selected-works-section');
        if (el) el.scrollIntoView({ behavior: 'instant' });
      `
    });
    await sleep(800);
    const worksShot = await sendSession('Page.captureScreenshot', {
      format: 'png',
      clip: { x: 0, y: 0, width: 390, height: 844, scale: 2 }
    });
    fs.writeFileSync('References/captured-mobile-works.png', Buffer.from(worksShot.data, 'base64'));
    console.log('Saved References/captured-mobile-works.png');

    // Scroll to News Section
    await sendSession('Runtime.evaluate', {
      expression: `
        const el = document.querySelector('.news-home-section');
        if (el) el.scrollIntoView({ behavior: 'instant' });
      `
    });
    await sleep(800);
    const newsShot = await sendSession('Page.captureScreenshot', {
      format: 'png',
      clip: { x: 0, y: 0, width: 390, height: 844, scale: 2 }
    });
    fs.writeFileSync('References/captured-mobile-news.png', Buffer.from(newsShot.data, 'base64'));
    console.log('Saved References/captured-mobile-news.png');

    // Scroll to Philosophy & Done By Humans
    await sendSession('Runtime.evaluate', {
      expression: `
        const el = document.querySelector('.philosophy-section') || document.querySelector('.done-by-humans-section');
        if (el) el.scrollIntoView({ behavior: 'instant' });
      `
    });
    await sleep(800);
    const philosophyShot = await sendSession('Page.captureScreenshot', {
      format: 'png',
      clip: { x: 0, y: 0, width: 390, height: 844, scale: 2 }
    });
    fs.writeFileSync('References/captured-mobile-philosophy.png', Buffer.from(philosophyShot.data, 'base64'));
    console.log('Saved References/captured-mobile-philosophy.png');

    // Scroll to Done By Humans Banner
    await sendSession('Runtime.evaluate', {
      expression: `
        const el = document.querySelector('.done-by-humans-section');
        if (el) el.scrollIntoView({ behavior: 'instant' });
      `
    });
    await sleep(800);
    const dbhShot = await sendSession('Page.captureScreenshot', {
      format: 'png',
      clip: { x: 0, y: 0, width: 390, height: 844, scale: 2 }
    });
    fs.writeFileSync('References/captured-mobile-donebyhumans.png', Buffer.from(dbhShot.data, 'base64'));
    console.log('Saved References/captured-mobile-donebyhumans.png');

    // Scroll to Footer
    await sendSession('Runtime.evaluate', {
      expression: `
        window.scrollTo(0, document.body.scrollHeight);
      `
    });
    await sleep(800);
    const footerShot = await sendSession('Page.captureScreenshot', {
      format: 'png',
      clip: { x: 0, y: 0, width: 390, height: 844, scale: 2 }
    });
    fs.writeFileSync('References/captured-mobile-footer.png', Buffer.from(footerShot.data, 'base64'));
    console.log('Saved References/captured-mobile-footer.png');

    ws.close();
  } finally {
    chrome.kill('SIGTERM');
  }
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
