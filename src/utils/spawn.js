import { spawn } from 'child_process';

export default (...args) => new Promise((res, rej) => {
  const proc = spawn(...args);
  proc.on('close', (code) => code === 0 ? res(code) : rej());
});
