"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sax2_1 = require("./sax2");
let parser = new sax2_1.SAXParser(false, []);
parser.EVENTS.forEach(function (ev) {
    parser['on' + ev] = function (n) {
        console.error(ev, n)
    };
});
parser.write('<T>flush')
parser.flush()
parser.write('rest</T>')
parser.close()
//# sourceMappingURL=mytest.js.map