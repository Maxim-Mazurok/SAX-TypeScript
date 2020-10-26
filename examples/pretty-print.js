const sax = require('../build/src/sax.js'),
  printer = sax.createStream(false, {lowercasetags: true, trim: true}),
  fs = require('fs');

function entity(str) {
  return str.replace('"', '&quot;');
}

printer.tabstop = 2;
printer.level = 0;
printer.indent = function () {
  print('\n');
  for (let i = this.level; i > 0; i--) {
    for (let j = this.tabstop; j > 0; j--) {
      print(' ');
    }
  }
};
printer.on('opentag', function (tag) {
  this.indent();
  this.level++;
  print('<' + tag.name);
  for (const i in tag.attributes) {
    print(' ' + i + '="' + entity(tag.attributes[i]) + '"');
  }
  print('>');
});

printer.on('text', ontext);
printer.on('doctype', ontext);
function ontext(text) {
  this.indent();
  print(text);
}

printer.on('closetag', function (tag) {
  this.level--;
  this.indent();
  print('</' + tag + '>');
});

printer.on('cdata', function (data) {
  this.indent();
  print('<![CDATA[' + data + ']]>');
});

printer.on('comment', function (comment) {
  this.indent();
  print('<!--' + comment + '-->');
});

printer.on('error', error => {
  console.error(error);
  throw error;
});

if (!process.argv[2]) {
  throw new Error(
    'Please provide an xml file to prettify\n' +
      'TODO: read from stdin or take a file'
  );
}
const xmlfile = require('path').join(process.cwd(), process.argv[2]);
const fstr = fs.createReadStream(xmlfile, {encoding: 'utf8'});

function print(c) {
  if (!process.stdout.write(c)) {
    fstr.pause();
  }
}

process.stdout.on('drain', () => {
  fstr.resume();
});

fstr.pipe(printer);
