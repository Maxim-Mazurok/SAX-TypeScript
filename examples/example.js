/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
let fs = require('fs'),
  util = require('util'),
  path = require('path'),
  xml = fs.readFileSync(path.join(__dirname, 'test.xml'), 'utf8'),
  sax = require('../build/src/sax.js'),
  strict = new sax.SAXParser(true),
  loose = new sax.SAXParser(false, {trim: true}),
  inspector = function (ev) {
    return function (data) {
      console.error('%s %s %j', this.line + ':' + this.column, ev, data);
    };
  };

sax.EVENTS.forEach(ev => {
  loose['on' + ev] = inspector(ev);
});
loose.onend = (function () {
  console.error('end');
  console.error(loose);
})(
  // do this in random bits at a time to verify that it works.
  function () {
    if (xml) {
      const c = Math.ceil(Math.random() * 1000);
      loose.write(xml.substr(0, c));
      xml = xml.substr(c);
      process.nextTick(arguments.callee);
    } else loose.close();
  }
)();
