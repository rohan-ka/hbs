import { spawn } from 'child_process';

function runComposerInstall(composerName, composerArgs) {
  return new Promise((res, rej) => {
    const [command, ...args] = composerName.split(' ');
    const proc = spawn(command, [...args, 'install', ...composerArgs], { stdio: 'inherit' });
    proc.on('close', (code) => code === 0 ? res() : rej());
  });
}

export default runComposerInstall;
