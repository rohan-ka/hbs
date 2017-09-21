import spawn from 'utils/spawn';
import npm from 'utils/npmOrYarn';
import findModules from 'utils/findModules';

const loadModule = (args) => (module) => {
  spawn(npm, ['install', ...args], { stdio: 'inherit', cwd: module });
};

export default function load(src, pattern, args = []) {
  return findModules(src, pattern)
    .then((modules) => Promise.all(modules.map(loadModule(args))));
}
