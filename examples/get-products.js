// pull out /GeneralSearchResponse/categories/category/items/product tags
// the rest we don't care about.

const sax = require('../src/sax.ts');
const fs = require('fs');
const path = require('path');
const xmlFile = path.resolve(__dirname, 'shopping.xml');
const util = require('util');
const http = require('http');

fs.readFile(xmlFile, (er, d) => {
  http
    .createServer((req, res) => {
      if (er) throw er;
      const xmlstr = d.toString('utf8');

      const parser = new sax.SAXParser(true);
      const products = [];
      let product = null;
      let currentTag = null;

      parser.onclosetag = function (tagName) {
        if (tagName === 'product') {
          products.push(product);
          currentTag = product = null;
          return;
        }
        if (currentTag && currentTag.parent) {
          const p = currentTag.parent;
          delete currentTag.parent;
          currentTag = p;
        }
      };

      parser.onopentag = function (tag) {
        if (tag.name !== 'product' && !product) return;
        if (tag.name === 'product') {
          product = tag;
        }
        tag.parent = currentTag;
        tag.children = [];
        tag.parent && tag.parent.children.push(tag);
        currentTag = tag;
      };

      parser.ontext = function (text) {
        if (currentTag) currentTag.children.push(text);
      };

      parser.onend = function () {
        // eslint-disable-next-line no-unused-vars
        const out = util.inspect(products, false, 3, true);
        res.writeHead(200, {'content-type': 'application/json'});
        res.end('{"ok":true}');
        // res.end(JSON.stringify(products))
      };

      parser.write(xmlstr).end();
    })
    .listen(1337);
});
