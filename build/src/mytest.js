"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sax2_1 = require("./sax2");
let parser = new sax2_1.SAXParser(false, []);
parser.EVENTS.forEach(function (ev) {
    parser['on' + ev] = function (n) {
        console.log(ev, n);
    };
});
parser.write('<root length=\'12345\'></root>');
//# sourceMappingURL=mytest.js.map