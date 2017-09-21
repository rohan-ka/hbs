import composer from 'composer';
import load from 'load';
import build from 'build';
import ncp from 'ncp';

export default function setup({ composerArgs = [], loadArgs = [], buildArgs = [], src, pattern, command }) {
  const setupJs = load(src, pattern, loadArgs)
    .then(() => build({ src, pattern, command, args: buildArgs }));

  const setupPhp = composer(composerArgs).then(() => ncp('.env.example', '.env'));

  return Promise.all([
    setupPhp,
    setupJs,
  ]);
}
