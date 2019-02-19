import {SAXParser} from './sax2';

let parser = new SAXParser(false, {
    strictEntities: true,
});

parser.EVENTS.forEach(function (ev) {
    parser['on' + ev] = function (n: string) {
        console.error(ev, n);
    };
});

parser.write('<r>&rfloor; ' +
    '&spades; &copy; &rarr; &amp; ' +
    '&lt; < <  <   < &gt; &real; &weierp; &euro;</r>');
parser.close();