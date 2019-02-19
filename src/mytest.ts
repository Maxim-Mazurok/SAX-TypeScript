import {SAXParser} from './sax2';

let parser = new SAXParser(true, []);

parser.EVENTS.forEach(function (ev) {
    parser['on' + ev] = function (n: string) {
        console.log(ev, n);
    };
});

parser.write('\uFEFF<P BOM="\uFEFF">\uFEFFStarts and ends with BOM\uFEFF</P>');