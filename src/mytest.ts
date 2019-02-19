import {SAXParser} from './sax2';

let parser = new SAXParser(false, []);

parser.EVENTS.forEach(function (ev) {
    parser['on' + ev] = function (n: string) {
        console.error(ev, n);
    };
});

parser.write('<T>flush');
parser.flush();
parser.write('rest</T>');
parser.close();