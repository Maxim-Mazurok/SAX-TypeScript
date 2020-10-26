/* eslint-disable node/no-deprecated-api */
require(__dirname).test({
  strict: true,
  xml: new Buffer('<x>y</x>'),
  expect: [
    ['opentagstart', {name: 'x', attributes: {}}],
    ['opentag', {name: 'x', attributes: {}, isSelfClosing: false}],
    ['text', 'y'],
    ['closetag', 'x'],
  ],
});
