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
parser.write('<abcdefghijklmn').write('opqrstuvwxyzABC').write('DEFGHIJKLMNOPQR').write('STUVWXYZ>').write('yo').write('</abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ>').close();
//# sourceMappingURL=mytest.js.map