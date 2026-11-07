import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// Custom plugin to allow CMS UI to persist changes directly to src/data/works.json
function worksApiPlugin() {
  const handler = (req, res, next) => {
    if (req.url === '/api/save-works' && req.method === 'POST') {
      let body = '';
      req.on('data', chunk => { body += chunk; });
      req.on('end', () => {
        try {
          const data = JSON.parse(body);
          const filePath = path.resolve(__dirname, 'src/data/works.json');
          fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ success: true, count: data.length }));
        } catch (err) {
          res.statusCode = 500;
          res.end(JSON.stringify({ error: err.message }));
        }
      });
    } else {
      next();
    }
  };

  return {
    name: 'works-api-plugin',
    configureServer(server) {
      server.middlewares.use(handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler);
    }
  };
}

const isGitHubActions = process.env.GITHUB_ACTIONS === 'true';
const repoName = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split('/')[1] : 'NorqueStudios';
const base = process.env.VITE_BASE || (isGitHubActions ? `/${repoName}/` : '/');

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react(), worksApiPlugin()],
  server: {
    port: 3000,
    open: true,
    allowedHosts: true,
    watch: {
      usePolling: true,
      interval: 300,
      ignored: ['**/*.crdownload', '**/*.tmp', '**/node_modules/**', '**/page2_figma/**']
    }
  },
  preview: {
    port: 4173,
    host: true,
    allowedHosts: true
  }
})
