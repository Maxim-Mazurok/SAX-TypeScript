"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sax2_1 = require("./sax2");
let parser = new sax2_1.SAXParser(false, {
    strictEntities: true,
})
parser.EVENTS.forEach(function (ev) {
    parser['on' + ev] = function (n) {
        console.error(ev, n)
    };
});
parser.write('<r>&rfloor; ' +
  '&spades; &copy; &rarr; &amp; ' +
  '&lt; < <  <   < &gt; &real; &weierp; &euro;</r>')
parser.close()
//# sourceMappingURL=mytest.js.map