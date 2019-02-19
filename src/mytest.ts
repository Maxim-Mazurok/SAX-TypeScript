import {SAXParser} from './sax2';

let parser = new SAXParser(false, []);

parser.EVENTS.forEach(function (ev) {
    parser['on' + ev] = function (n: string) {
        console.log(ev, n);
    };
});

parser.MAX_BUFFER_LENGTH = 5;
parser.write('<a>&#x1f525;</a>').close();
