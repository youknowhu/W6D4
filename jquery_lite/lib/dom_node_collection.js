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
