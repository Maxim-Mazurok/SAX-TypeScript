"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sax2_1 = require("./sax2");
let parser = new sax2_1.SAXParser(false, []);
parser.EVENTS.forEach(function (ev) {
    parser['on' + ev] = function (n) {
        console.log(ev, n);
    };
});
parser.MAX_BUFFER_LENGTH = 5;
parser.write('<a>&#x1f525;</a>').close()
//# sourceMappingURL=mytest.js.map