import * as path from 'path';
import spawn from 'utils/spawn';
import findModules from 'utils/findModules';
import chalk from 'chalk';

const buildModule = (command, args, dest) => {
  const app = path.basename(dest);
  console.log(`building ${app}`);
  return spawn(command, args, { stdio: 'inherit', cwd: dest })
    .then(() => console.log(`${chalk.green('\u2714')} ${app} built successfully`));
};

const buildModules = (command, args) => (modules) => Promise.all(modules.map((module) => buildModule(command, args, module)));

export default function build({ command = 'webpack', args = [], src, pattern }) {
  return findModules(src, pattern)
    .then(buildModules(command, args));
}
