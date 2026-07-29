import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'fs';
import path from 'path';

function handlePromptRequest(req, res, next) {
  if (req.url === '/api/submit-prompt' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const filePath = path.join(process.cwd(), '.antigravity-prompt.json');
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
        
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: true }));
      } catch (err) {
        res.statusCode = 500;
        res.end(JSON.stringify({ error: err.message }));
      }
    });
  } else {
    next();
  }
}

const stripAntigravityPlugin = () => ({
  name: 'strip-antigravity',
  transformIndexHtml(html, ctx) {
    if (!ctx.server) {
      return html.replace(/<script[^>]*src="[^"]*antigravity-bridge\.js"[^>]*><\/script>/g, '');
    }
    return html;
  }
});

const promptPlugin = () => ({
  name: 'prompt-api',
  configureServer(server) {
    server.middlewares.use(handlePromptRequest);
  },
  configurePreviewServer(server) {
    server.middlewares.use(handlePromptRequest);
  }
});

export default defineConfig({
  plugins: [react(), tailwindcss(), promptPlugin(), stripAntigravityPlugin()],
  base: './', // Ensures relative asset paths work seamlessly on Hostinger static hosting and subdomains
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  },
  server: {
    port: 3000,
    open: false
  }
});
