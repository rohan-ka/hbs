import args from 'utils/cmdArgs';
import setup from 'setup';


const {
  'build-command': command = 'webpack',
  _: buildArgs = [],
  'app-src': src,
  'app-pattern': appPattern,
  'pattern-args': patternArgs,
} = args;


const pattern = appPattern ? new RegExp(appPattern, patternArgs) : null;

setup({ src, pattern, command, buildArgs });
