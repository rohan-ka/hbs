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
/******/ 	return __webpack_require__(__webpack_require__.s = 29);
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
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = composer;

var _checkLocalComposer = __webpack_require__(9);

var _checkLocalComposer2 = _interopRequireDefault(_checkLocalComposer);

var _downloadComposer = __webpack_require__(10);

var _downloadComposer2 = _interopRequireDefault(_downloadComposer);

var _runComposerInstall = __webpack_require__(12);

var _runComposerInstall2 = _interopRequireDefault(_runComposerInstall);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function composer(args) {
  return (0, _checkLocalComposer2.default)().catch(_downloadComposer2.default).then(function (commandName) {
    return (0, _runComposerInstall2.default)(commandName, args);
  });
}

/***/ }),
/* 7 */,
/* 8 */,
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _child_process = __webpack_require__(0);

function checkComposer(command) {
  return new Promise(function (res, rej) {
    (0, _child_process.exec)(command + ' -v', function (err) {
      if (err) {
        console.log('Not found');
        rej();
      } else {
        res(command);
      }
    });
  });
}

function checkComposerOnPath() {
  console.log('Checking for composer in path');
  return checkComposer('composer');
}

function checkComposerInCwd() {
  console.log('Checking for composer.phar in ' + process.cwd());
  return checkComposer('php composer.phar');
}

function checkLocalComposer() {
  return new Promise(function (res, rej) {
    checkComposerOnPath().catch(checkComposerInCwd).then(function (command) {
      return res(command);
    }, function (err) {
      return rej(err);
    });
  });
}

exports.default = checkLocalComposer;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fs = __webpack_require__(2);

var fs = _interopRequireWildcard(_fs);

var _path = __webpack_require__(1);

var path = _interopRequireWildcard(_path);

var _https = __webpack_require__(11);

var _child_process = __webpack_require__(0);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var installerName = 'composer-setup.php';

function runComposerSetup() {
  return new Promise(function (res, rej) {
    console.log('Running composer installer');
    var setup = (0, _child_process.spawn)('php', [installerName]);
    setup.on('close', function (code) {
      return code === 0 ? res() : rej();
    });
  });
}

function deleteInstaller() {
  var installerFile = path.resolve(process.cwd(), installerName);
  fs.unlinkSync(installerFile);
  return Promise.resolve();
}

function downloadComposerSetup() {
  return new Promise(function (res) {
    var file = fs.createWriteStream(installerName);
    console.log('Downloading composer installer');
    (0, _https.get)('https://getcomposer.org/installer', function (response) {
      return response.pipe(file);
    });
    file.on('finish', function () {
      return res();
    });
  });
}

function downloadComposer() {
  return new Promise(function (res, rej) {
    downloadComposerSetup().then(runComposerSetup).then(deleteInstaller).then(function () {
      return res('php composer.phar');
    }, function (err) {
      return rej(err);
    });
  });
}

exports.default = downloadComposer;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("https");

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _child_process = __webpack_require__(0);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function runComposerInstall(composerName, composerArgs) {
  return new Promise(function (res, rej) {
    var _composerName$split = composerName.split(' '),
        _composerName$split2 = _toArray(_composerName$split),
        command = _composerName$split2[0],
        args = _composerName$split2.slice(1);

    var proc = (0, _child_process.spawn)(command, [].concat(_toConsumableArray(args), ['install'], _toConsumableArray(composerArgs)), { stdio: 'inherit' });
    proc.on('close', function (code) {
      return code === 0 ? res() : rej();
    });
  });
}

exports.default = runComposerInstall;

/***/ }),
/* 13 */,
/* 14 */,
/* 15 */,
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
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _composer = __webpack_require__(6);

var _composer2 = _interopRequireDefault(_composer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var composerArgs = process.argv.slice(2);

(0, _composer2.default)(composerArgs);

/***/ })
/******/ ]);