import load from 'load';
import args from 'utils/cmdArgs';

const {
  'app-src': src, 'app-pattern': appPattern, _: loadArgs = [], 'pattern-args': patternArgs,
} = args;

const pattern = appPattern ? new RegExp(appPattern, patternArgs) : null;

load(src, pattern, loadArgs)
  .catch((err) => console.log(err.message));
