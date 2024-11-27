import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import fs from 'fs';
import path from 'path';
import child_process from 'child_process';
import { env } from 'process';
import { fileURLToPath, URL } from 'url'; // Import fileURLToPath and URL from the 'url' module

const baseFolder =
  env.APPDATA !== undefined && env.APPDATA !== ''
    ? `${env.APPDATA}/ASP.NET/https`
    : `${env.HOME}/.aspnet/https`;

const certificateName = "projectx.client";
const certFilePath = path.join(baseFolder, `${certificateName}.pem`);
const keyFilePath = path.join(baseFolder, `${certificateName}.key`);

if (!fs.existsSync(baseFolder)) {
  fs.mkdirSync(baseFolder, { recursive: true });
}

if (!fs.existsSync(certFilePath) || !fs.existsSync(keyFilePath)) {
  if (0 !== child_process.spawnSync('dotnet', [
    'dev-certs',
    'https',
    '--export-path',
    certFilePath,
    '--format',
    'Pem',
    '--no-password',
  ], { stdio: 'inherit', }).status) {
    throw new Error("Could not create certificate.");
  }
}

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'https://localhost:7237';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: '../wwwroot', // Ensure the build files go to the wwwroot directory
    assetsDir: 'static',  // Put static assets in the 'static' sub-folder within wwwroot
  },
  server: {
    proxy: {
      '/weatherforecast': {
        target: 'https://localhost:5001', // Update this if the API is running on a different port
        secure: false
      }
    },
    port: 62429,  // Use a port that doesn’t conflict with ASP.NET Core
    https: {
      key: fs.readFileSync(keyFilePath),
      cert: fs.readFileSync(certFilePath),
    }
  },
});

