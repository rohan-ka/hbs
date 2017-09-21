import * as fs from 'fs';
import * as path from 'path';
import { get } from 'https';
import { spawn } from 'child_process';

const installerName = 'composer-setup.php';

function runComposerSetup() {
  return new Promise((res, rej) => {
    console.log('Running composer installer');
    const setup = spawn('php', [installerName]);
    setup.on('close', (code) => code === 0 ? res() : rej());
  });
}

function deleteInstaller() {
  const installerFile = path.resolve(process.cwd(), installerName);
  fs.unlinkSync(installerFile);
  return Promise.resolve();
}

function downloadComposerSetup() {
  return new Promise((res) => {
    const file = fs.createWriteStream(installerName);
    console.log('Downloading composer installer');
    get('https://getcomposer.org/installer', (response) => response.pipe(file));
    file.on('finish', () => res());
  });
}

function downloadComposer() {
  return new Promise((res, rej) => {
    downloadComposerSetup()
      .then(runComposerSetup)
      .then(deleteInstaller)
      .then(() => res('php composer.phar'), (err) => rej(err));
  });
}

export default downloadComposer;
