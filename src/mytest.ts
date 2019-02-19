import {SAXParser} from './sax2';

let parser = new SAXParser(false, []);

parser.EVENTS.forEach(function (ev) {
    parser['on' + ev] = function (n: string) {
        console.log(ev, n);
    };
});

parser.write('<root length=\'12345\'></root>');