import type { ViteDevServer } from 'vite';
export const devPlugin = () => {
  return {
    name: 'dev-plugin',
    configureServer(server: ViteDevServer) {
      require('esbuild').buildSync({
        entryPoints: ['./src/main/main.js'],
        bundle: true,
        platform: 'node',
        outfile: './dist/main.js',
        external: ['electron'],
      });
      server.httpServer?.once('listening', () => {
        const { spawn } = require('child_process');
        const addressInfo = server.httpServer?.address();
        //ipv6
        // const httpAddress = `http://${addressInfo.address}:${addressInfo.port}`;
        //ipv4
        const httpAddress = `http://localhost:${addressInfo.port}`;
        const electronProcess = spawn(
          require('electron').toString(),
          ['./src/main/main.js', httpAddress],
          {
            cwd: process.cwd(),
            stdio: 'inherit',
          }
        );
        console.log(electronProcess);
        electronProcess.on('close', () => {
          server.close();
          process.exit();
        });
      });
    },
  };
};
