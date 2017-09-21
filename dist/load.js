#!/usr/local/bin/node
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 30);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _child_process = __webpack_require__(0);

exports.default = function () {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return new Promise(function (res, rej) {
    var proc = _child_process.spawn.apply(undefined, args);
    proc.on('close', function (code) {
      return code === 0 ? res(code) : rej();
    });
  });
};

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = findModules;

var _fs = __webpack_require__(2);

var fs = _interopRequireWildcard(_fs);

var _path = __webpack_require__(1);

var path = _interopRequireWildcard(_path);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var defaultSrc = path.resolve(process.cwd(), 'src');

function findModules(src, pattern) {
  src = path.resolve(process.cwd(), src || defaultSrc); // eslint-disable-line no-param-reassign
  pattern = pattern || /-app$/; // eslint-disable-line no-param-reassign

  return new Promise(function (res, rej) {
    fs.readdir(src, function (err, dirs) {
      if (err) {
        switch (err.code) {
          case 'ENOENT':
            rej(new Error('Directory ' + src + ' does not exist'));
            break;
          case 'ENOTDIR':
            rej(new Error(src + ' is not a directory '));
            break;
          default:
            rej(err);
        }
        return;
      }

      var apps = dirs.filter(function (dir) {
        return pattern.test(dir);
      }).map(function (dir) {
        return path.resolve(src, dir);
      });
      res(apps);
    });
  });
}

/***/ }),
/* 5 */,
/* 6 */,
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = load;

var _spawn = __webpack_require__(3);

var _spawn2 = _interopRequireDefault(_spawn);

var _npmOrYarn = __webpack_require__(13);

var _npmOrYarn2 = _interopRequireDefault(_npmOrYarn);

var _findModules = __webpack_require__(4);

var _findModules2 = _interopRequireDefault(_findModules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var loadModule = function loadModule(args) {
  return function (module) {
    (0, _spawn2.default)(_npmOrYarn2.default, ['install'].concat(_toConsumableArray(args)), { stdio: 'inherit', cwd: module });
  };
};

function load(src, pattern) {
  var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  return (0, _findModules2.default)(src, pattern).then(function (modules) {
    return Promise.all(modules.map(loadModule(args)));
  });
}

/***/ }),
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _require = __webpack_require__(0),
    spawnSync = _require.spawnSync;

module.exports = spawnSync('yarn', ['--version']).status === 0 ? 'yarn' : 'npm';

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _minimist = __webpack_require__(15);

var _minimist2 = _interopRequireDefault(_minimist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _minimist2.default)(process.argv.slice(2));

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (args, opts) {
    if (!opts) opts = {};

    var flags = { bools: {}, strings: {}, unknownFn: null };

    if (typeof opts['unknown'] === 'function') {
        flags.unknownFn = opts['unknown'];
    }

    if (typeof opts['boolean'] === 'boolean' && opts['boolean']) {
        flags.allBools = true;
    } else {
        [].concat(opts['boolean']).filter(Boolean).forEach(function (key) {
            flags.bools[key] = true;
        });
    }

    var aliases = {};
    Object.keys(opts.alias || {}).forEach(function (key) {
        aliases[key] = [].concat(opts.alias[key]);
        aliases[key].forEach(function (x) {
            aliases[x] = [key].concat(aliases[key].filter(function (y) {
                return x !== y;
            }));
        });
    });

    [].concat(opts.string).filter(Boolean).forEach(function (key) {
        flags.strings[key] = true;
        if (aliases[key]) {
            flags.strings[aliases[key]] = true;
        }
    });

    var defaults = opts['default'] || {};

    var argv = { _: [] };
    Object.keys(flags.bools).forEach(function (key) {
        setArg(key, defaults[key] === undefined ? false : defaults[key]);
    });

    var notFlags = [];

    if (args.indexOf('--') !== -1) {
        notFlags = args.slice(args.indexOf('--') + 1);
        args = args.slice(0, args.indexOf('--'));
    }

    function argDefined(key, arg) {
        return flags.allBools && /^--[^=]+$/.test(arg) || flags.strings[key] || flags.bools[key] || aliases[key];
    }

    function setArg(key, val, arg) {
        if (arg && flags.unknownFn && !argDefined(key, arg)) {
            if (flags.unknownFn(arg) === false) return;
        }

        var value = !flags.strings[key] && isNumber(val) ? Number(val) : val;
        setKey(argv, key.split('.'), value);

        (aliases[key] || []).forEach(function (x) {
            setKey(argv, x.split('.'), value);
        });
    }

    function setKey(obj, keys, value) {
        var o = obj;
        keys.slice(0, -1).forEach(function (key) {
            if (o[key] === undefined) o[key] = {};
            o = o[key];
        });

        var key = keys[keys.length - 1];
        if (o[key] === undefined || flags.bools[key] || typeof o[key] === 'boolean') {
            o[key] = value;
        } else if (Array.isArray(o[key])) {
            o[key].push(value);
        } else {
            o[key] = [o[key], value];
        }
    }

    function aliasIsBoolean(key) {
        return aliases[key].some(function (x) {
            return flags.bools[x];
        });
    }

    for (var i = 0; i < args.length; i++) {
        var arg = args[i];

        if (/^--.+=/.test(arg)) {
            // Using [\s\S] instead of . because js doesn't support the
            // 'dotall' regex modifier. See:
            // http://stackoverflow.com/a/1068308/13216
            var m = arg.match(/^--([^=]+)=([\s\S]*)$/);
            var key = m[1];
            var value = m[2];
            if (flags.bools[key]) {
                value = value !== 'false';
            }
            setArg(key, value, arg);
        } else if (/^--no-.+/.test(arg)) {
            var key = arg.match(/^--no-(.+)/)[1];
            setArg(key, false, arg);
        } else if (/^--.+/.test(arg)) {
            var key = arg.match(/^--(.+)/)[1];
            var next = args[i + 1];
            if (next !== undefined && !/^-/.test(next) && !flags.bools[key] && !flags.allBools && (aliases[key] ? !aliasIsBoolean(key) : true)) {
                setArg(key, next, arg);
                i++;
            } else if (/^(true|false)$/.test(next)) {
                setArg(key, next === 'true', arg);
                i++;
            } else {
                setArg(key, flags.strings[key] ? '' : true, arg);
            }
        } else if (/^-[^-]+/.test(arg)) {
            var letters = arg.slice(1, -1).split('');

            var broken = false;
            for (var j = 0; j < letters.length; j++) {
                var next = arg.slice(j + 2);

                if (next === '-') {
                    setArg(letters[j], next, arg);
                    continue;
                }

                if (/[A-Za-z]/.test(letters[j]) && /=/.test(next)) {
                    setArg(letters[j], next.split('=')[1], arg);
                    broken = true;
                    break;
                }

                if (/[A-Za-z]/.test(letters[j]) && /-?\d+(\.\d*)?(e-?\d+)?$/.test(next)) {
                    setArg(letters[j], next, arg);
                    broken = true;
                    break;
                }

                if (letters[j + 1] && letters[j + 1].match(/\W/)) {
                    setArg(letters[j], arg.slice(j + 2), arg);
                    broken = true;
                    break;
                } else {
                    setArg(letters[j], flags.strings[letters[j]] ? '' : true, arg);
                }
            }

            var key = arg.slice(-1)[0];
            if (!broken && key !== '-') {
                if (args[i + 1] && !/^(-|--)[^-]/.test(args[i + 1]) && !flags.bools[key] && (aliases[key] ? !aliasIsBoolean(key) : true)) {
                    setArg(key, args[i + 1], arg);
                    i++;
                } else if (args[i + 1] && /true|false/.test(args[i + 1])) {
                    setArg(key, args[i + 1] === 'true', arg);
                    i++;
                } else {
                    setArg(key, flags.strings[key] ? '' : true, arg);
                }
            }
        } else {
            if (!flags.unknownFn || flags.unknownFn(arg) !== false) {
                argv._.push(flags.strings['_'] || !isNumber(arg) ? arg : Number(arg));
            }
            if (opts.stopEarly) {
                argv._.push.apply(argv._, args.slice(i + 1));
                break;
            }
        }
    }

    Object.keys(defaults).forEach(function (key) {
        if (!hasKey(argv, key.split('.'))) {
            setKey(argv, key.split('.'), defaults[key]);

            (aliases[key] || []).forEach(function (x) {
                setKey(argv, x.split('.'), defaults[key]);
            });
        }
    });

    if (opts['--']) {
        argv['--'] = new Array();
        notFlags.forEach(function (key) {
            argv['--'].push(key);
        });
    } else {
        notFlags.forEach(function (key) {
            argv._.push(key);
        });
    }

    return argv;
};

function hasKey(obj, keys) {
    var o = obj;
    keys.slice(0, -1).forEach(function (key) {
        o = o[key] || {};
    });

    var key = keys[keys.length - 1];
    return key in o;
}

function isNumber(x) {
    if (typeof x === 'number') return true;
    if (/^0x[0-9a-f]+$/i.test(x)) return true;
    return (/^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(x)
    );
}

/***/ }),
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _load = __webpack_require__(7);

var _load2 = _interopRequireDefault(_load);

var _cmdArgs = __webpack_require__(14);

var _cmdArgs2 = _interopRequireDefault(_cmdArgs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var src = _cmdArgs2.default['app-src'],
    appPattern = _cmdArgs2.default['app-pattern'],
    _args$_ = _cmdArgs2.default._,
    loadArgs = _args$_ === undefined ? [] : _args$_,
    patternArgs = _cmdArgs2.default['pattern-args'];


var pattern = appPattern ? new RegExp(appPattern, patternArgs) : null;

(0, _load2.default)(src, pattern, loadArgs).catch(function (err) {
  return console.log(err.message);
});

/***/ })
/******/ ]);