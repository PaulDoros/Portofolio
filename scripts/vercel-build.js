// Custom build script for Vercel deployment
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = join(__dirname, '..');

console.log('Running Vercel build script...');

// Run the replace-env.js script first
console.log('Running replace-env.js...');
const replaceEnvPath = join(root, 'scripts', 'replace-env.js');
if (fs.existsSync(replaceEnvPath)) {
  try {
    execSync(`node ${replaceEnvPath}`, { stdio: 'inherit' });
  } catch (error) {
    console.error('Error running replace-env.js:', error);
  }
}

// Run the Remix build
console.log('Running Remix build...');
try {
  execSync('npx @remix-run/dev build', { stdio: 'inherit', cwd: root });
  console.log('Build completed successfully.');
} catch (error) {
  console.error('Error during build:', error);
  process.exit(1);
}
