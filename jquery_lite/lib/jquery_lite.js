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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DomNodeCollection = __webpack_require__(1);

document.addEventListener("DOMContentLoaded", function(){
  window.$l = function(query) {
    let doc = this.document;
    const nodeList = doc.querySelectorAll(query);
    const arr = Array.from(nodeList);
    const DomNodes = new DomNodeCollection(arr);
    return DomNodes;
  };

    window.$l.extend = function(target, ...nodes) {
        target = Object.assign(target, ...nodes);
        return target;
    };

    window.$l.ajax = function(options) {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', 'http://www.google.com');
      xhr.setRequestHeader('anything','also anything');
      xhr.onload = function () {
        console.log(xhr.status);
        console.log(xhr.responseType);
        console.log(xhr.response);
      };

      xhr.send();
    };
});


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor(htmlEls) {
    this.htmlElements = htmlEls;
    this.listener = null;
  }

  html(str) {
    if (str instanceof String) {
      this.htmlElements.forEach((ele) => {
        ele.innerHTML = str;
      });
    } else if (str === "") {
      this.htmlElements.forEach((ele) => {
        ele.innerHTML = str;
      });
    } else {
      return this.htmlElements[0].innerHTML;
    }
  }

  empty() {
    this.html("");
    // this.htmlElements.forEach(ele) => {
    //   this.html("");
    // }
  }

  append(...args) {
    args.forEach((arg) => {
      this.htmlElements.forEach((el) => {
        el.innerHTML += arg;
      });
    });
  }

  attr(key, value) {
    if (value) {
      this.htmlElements.forEach( (el) => {
        el.setAttribute(key , value);
      });
    } else {
      return this.htmlElements[0].getAttribute(key);
    }
    return "cool";
  }

  addClass(value) {
    this.htmlElements.forEach((el) => {
      let classStr = el.getAttribute('class');
      classStr += ' ' + value;
      el.setAttribute('class', classStr);
    });
  }

  removeClass(value) {
    this.htmlElements.forEach((el) => {
      let classStr = el.getAttribute('class');
      const classIdx = classStr.indexOf(value);

      if (classIdx !== - 1) {
        classStr = classStr.slice(0, classIdx - 1) + classStr.slice(classIdx + value.length);
        el.setAttribute('class', classStr);
      }
    });
  }

  children() {
    const children = [];
    this.htmlElements.forEach( (el) => {
      children.push(el.children);
    });

    return new DOMNodeCollection(children);
  }

  parent() {
    const parents = [];
    this.htmlElements.forEach( (el) => {
      if (!parents.includes(el.parentNode)) {
        parents.push(el.parentNode);
      }
    });

    return new DOMNodeCollection(parents);
  }

  find(tag) {
    const found = [];
    this.htmlElements.forEach( (el) => {
      found.push(el.querySelectorAll(tag));
    });

    return new DOMNodeCollection(found);
  }

  remove(tag) {
    this.htmlElements.forEach( (el) => {
      el.remove(tag);
    });
  }

  on(ev, cb) {
    this.listener = cb;

    this.htmlElements.forEach( (el) => {
      el.addEventListener(ev, cb);
    });
  }

  off(ev) {
    this.htmlElements.forEach( (el) => {
      el.removeEventListener(ev, this.listener);
    });
  }


}


module.exports = DOMNodeCollection;


/***/ })
/******/ ]);