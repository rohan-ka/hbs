import build from 'build';
import args from 'utils/cmdArgs';

const {
  'build-command': command = 'webpack', _: buildArgs = [], 'app-src': src, 'app-pattern': appPattern, 'pattern-args': patternArgs,
} = args;

const pattern = appPattern ? new RegExp(appPattern, patternArgs) : null;

build({ command, args: buildArgs, src, pattern })
  .then(() => console.log('Build finished...'))
  .catch(console.error);
