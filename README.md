# sax-ts

**Simple API for XML in TypeScript**

[![Build Status](https://travis-ci.org/Maxim-Mazurok/sax-ts.svg?branch=master)](https://travis-ci.org/Maxim-Mazurok/sax-ts)

A [SAX](https://en.wikipedia.org/wiki/Simple_API_for_XML)-style parser for XML
and HTML.

Designed with [deno](https://deno.land/) in mind, so it's **browser compatible**

## What This Is

- A very simple tool to parse through an XML string.
- A handy way to deal with RSS and other mostly-ok-but-kinda-broken XML
  docs.
- A perfect way to parse 80 GB of XML data and don't burn your laptop :)

## Usage

### Deno
```typescript
// import { SAXParser } from 'https://unpkg.com/sax-ts@1.2.5/src/sax.ts'; TODO: change when published
import { SAXParser } from 'https://raw.githubusercontent.com/Maxim-Mazurok/sax-ts/master/src/sax.ts';
const strict: boolean = true; // change to false for HTML parsing
const options: {} = {}; // refer to "Arguments" section
const parser = new SAXParser(strict, options);

parser.onerror = function (e) {
  // an error happened.
  console.error(e);
};
parser.ontext = function (t) {
  // got some text.  t is the string of text.
  console.log('onText: ', t)
};
parser.onopentag = function (node) {
  // opened a tag.  node has "name" and "attributes"
  console.log('onOpenTag: ', node)
};
parser.onattribute = function (attr) {
  // an attribute.  attr has "name" and "value"
  console.log('onAttribute: ', attr)
};
parser.onend = function () {
  // parser stream is done, and ready to have more stuff written to it.
  console.warn('end of XML')
};

parser.write('<xml>Hello, <who name="world">world</who>!</xml>').close();
```


## Arguments

Pass the following arguments to the parser function. All are optional.

`strict` - Boolean. Disabled "forgiving" mode. Default: `false`.

`options` - Object bag of settings regarding string formatting. All default to 
`false`.

Settings supported:

- `trim` - Boolean. Whether or not to trim text and comment nodes.
- `normalize` - Boolean. If true, then turn any whitespace into a single
  space.
- `lowercase` - Boolean. If true, then lowercase tag names and attribute names
  in loose mode, rather than uppercasing them.
- `xmlns` - Boolean. If true, then namespaces are supported.
- `position` - Boolean. If false, then don't track line/col/position.
- `strictEntities` - Boolean. If true, only parse [predefined XML
  entities](http://www.w3.org/TR/REC-xml/#sec-predefined-ent)
  (`&amp;`, `&apos;`, `&gt;`, `&lt;`, and `&quot;`)

## Methods

`write` - Write bytes onto the stream. You don't have to do this all at
once. You can keep writing as much as you want.

`close` - Close the stream. Once closed, no more data may be written until
it is done processing the buffer, which is signaled by the `end` event.

`resume` - To gracefully handle errors, assign a listener to the `error`
event. Then, when the error is taken care of, you can call `resume` to
continue parsing. Otherwise, the parser will not continue while in an error
state.

## Events

All events emit with a single argument. To listen to an event, assign a
function to `on<eventname>`. Functions get executed in the this-context of
the parser object. The list of supported events are also in the exported
`EVENTS` array.

`error` - Indication that something bad happened. The error will be hanging
out on `parser.error`, and must be deleted before parsing can continue. By
listening to this event, you can keep an eye on that kind of stuff. Note:
this happens *much* more in strict mode. Argument: instance of `Error`.
```javascript
//TODO: currently `error` is protected, need to expose it to user somehow.
```

`text` - Text node. Argument: string of text.

`doctype` - The `<!DOCTYPE` declaration. Argument: doctype string.

`processinginstruction` - Stuff like `<?xml foo="blerg" ?>`. Argument:
object with `name` and `body` members. Attributes are not parsed, as
processing instructions have implementation dependent semantics.

`sgmldeclaration` - Random SGML declarations. Stuff like `<!ENTITY p>`
would trigger this kind of event. This is a weird thing to support, so it
might go away at some point. SAX isn't intended to be used to parse SGML,
after all.

`opentagstart` - Emitted immediately when the tag name is available,
but before any attributes are encountered.  Argument: object with a
`name` field and an empty `attributes` set.  Note that this is the
same object that will later be emitted in the `opentag` event.

`opentag` - An opening tag. Argument: object with `name` and `attributes`.
In non-strict mode, tag names are uppercased, unless the `lowercase`
option is set.  If the `xmlns` option is set, then it will contain
namespace binding information on the `ns` member, and will have a
`local`, `prefix`, and `uri` member.

`closetag` - A closing tag. In loose mode, tags are auto-closed if their
parent closes. In strict mode, well-formedness is enforced. Note that
self-closing tags will have `closeTag` emitted immediately after `openTag`.
Argument: tag name.

`attribute` - An attribute node.  Argument: object with `name` and `value`.
In non-strict mode, attribute names are in upper-case, unless the `lowercase`
option is set.  If the `xmlns` option is set, it will also contains namespace
information.

`comment` - A comment node.  Argument: the string of the comment.

`opencdata` - The opening tag of a `<![CDATA[` block.

`cdata` - The text of a `<![CDATA[` block. Since `<![CDATA[` blocks can get
quite large, this event may fire multiple times for a single block, if it
is broken up into multiple `write()`s. Argument: the string of random
character data.

`closecdata` - The closing tag (`]]>`) of a `<![CDATA[` block.

`opennamespace` - If the `xmlns` option is set, then this event will
signal the start of a new namespace binding.

`closenamespace` - If the `xmlns` option is set, then this event will
signal the end of a namespace binding.

`end` - Indication that the closed stream has ended.

`ready` - Indication that the stream has reset, and is ready to be written
to.

`noscript` - In non-strict mode, `<script>` tags trigger a `"script"`
event, and their contents are not checked for special xml characters.
If you pass `noscript: true`, then this behavior is suppressed.

---

# Disclaimers

## What This Is (probably) Not

- An HTML Parser - That's a fine goal, but this isn't it. It's just XML.
- A DOM Builder - You can use it to build an object model out of XML, but it 
does not do that out of the box.
- XSLT - No DOM = no querying.
- 100% Compliant with (some other SAX implementation) - Most SAX
  implementations are in Java and do a lot more than this does.
- An XML Validator - It does a little validation when in strict mode, but
  not much.
- A Schema-Aware XSD Thing - Schemas are an exercise in fetishistic
  masochism.
- A DTD-aware Thing - Fetching DTDs is a much bigger job.

## Regarding `<!DOCTYPE`s and `<!ENTITY`s

The parser will handle the basic XML entities in text nodes and attribute
values: `&amp; &lt; &gt; &apos; &quot;`. It's possible to define additional
entities in XML by putting them in the DTD. This parser does not do anything
with that.

Unknown entities will fail in strict mode, and in loose mode, will pass
through unmolested.
