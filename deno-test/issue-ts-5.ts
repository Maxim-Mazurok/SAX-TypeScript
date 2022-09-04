import {SAXParser} from '../src/sax.ts';

Deno.test({name: 'hello world #5', permissions: {read: true}}, async () => {
  const parser = new SAXParser(true, {});
  const text = await Deno.readTextFile('deno-test/issue-ts-5.xml');
  parser.write(text).close();
});
