import * as fs from 'fs';
import * as path from 'path';

const defaultSrc = path.resolve(process.cwd(), 'src');

export default function findModules(src, pattern) {
  src = path.resolve(process.cwd(), src || defaultSrc); // eslint-disable-line no-param-reassign
  pattern = pattern || /-app$/; // eslint-disable-line no-param-reassign

  return new Promise((res, rej) => {
    fs.readdir(src, (err, dirs) => {
      if (err) {
        switch (err.code) {
          case 'ENOENT':
            rej(new Error(`Directory ${src} does not exist`));
            break;
          case 'ENOTDIR':
            rej(new Error(`${src} is not a directory `));
            break;
          default:
            rej(err);
        }
        return;
      }

      const apps = dirs.filter((dir) => pattern.test(dir)).map((dir) => path.resolve(src, dir));
      res(apps);
    });
  });
}
