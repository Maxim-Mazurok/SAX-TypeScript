"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sax2_1 = require("./sax2");
let parser = new sax2_1.SAXParser(true, []);
parser.EVENTS.forEach(function (ev) {
    parser['on' + ev] = function (n) {
        console.log(ev, n);
    };
});
parser.write('\uFEFF<P BOM="\uFEFF">\uFEFFStarts and ends with BOM\uFEFF</P>');
//# sourceMappingURL=mytest.js.map