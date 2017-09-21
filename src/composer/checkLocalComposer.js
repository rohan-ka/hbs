import { exec } from 'child_process';

function checkComposer(command) {
  return new Promise((res, rej) => {
    exec(`${command} -v`, (err) => {
      if (err) {
        console.log('Not found');
        rej();
      } else {
        res(command);
      }
    });
  });
}


function checkComposerOnPath() {
  console.log('Checking for composer in path');
  return checkComposer('composer');
}

function checkComposerInCwd() {
  console.log(`Checking for composer.phar in ${process.cwd()}`);
  return checkComposer('php composer.phar');
}

function checkLocalComposer() {
  return new Promise((res, rej) => {
    checkComposerOnPath()
      .catch(checkComposerInCwd)
      .then((command) => res(command), (err) => rej(err));
  });
}

export default checkLocalComposer;
