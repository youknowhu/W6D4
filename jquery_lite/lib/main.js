const DomNodeCollection = require('./dom_node_collection.js');

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
