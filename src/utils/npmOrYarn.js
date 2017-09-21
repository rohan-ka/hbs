const { spawnSync } = require('child_process');

module.exports = spawnSync('yarn', ['--version']).status === 0 ? 'yarn' : 'npm';
