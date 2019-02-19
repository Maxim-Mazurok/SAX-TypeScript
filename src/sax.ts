type SAXParserOptions = {
  lowercase: boolean,
};

enum BufferEnum {
  comment,
  sgmlDecl,
  textNode,
  tagName,
  doctype,
  procInstName,
  procInstBody,
  entity,
  attribName,
  attribValue,
  cdata,
  script,
}

enum EventEnum {
  text,
  processingInstruction,
  SGMLDeclaration,
  doctype,
  comment,
  openTagStart,
  attribute,
  openTag,
  closeTag,
  openCDATA,
  CDATA,
  closeCDATA,
  error,
  end,
  ready,
  script,
  openNamespace,
  closeNamespace,
}

const
  MAX_BUFFER_LENGTH: number = 64 * 1024,
  EVENTS: EventEnum[] = [
    EventEnum.text,
    EventEnum.processingInstruction,
    EventEnum.SGMLDeclaration,
    EventEnum.doctype,
    EventEnum.comment,
    EventEnum.openTagStart,
    EventEnum.attribute,
    EventEnum.openTag,
    EventEnum.closeTag,
    EventEnum.openCDATA,
    EventEnum.CDATA,
    EventEnum.closeCDATA,
    EventEnum.error,
    EventEnum.end,
    EventEnum.ready,
    EventEnum.script,
    EventEnum.openNamespace,
    EventEnum.closeNamespace,
  ],
  DEFAULT_OPTIONS: SAXParserOptions = {
    lowercase: false,
  },
  XML_ENTITIES: { [key: string]: string } = {
    'amp': '&',
    'gt': '>',
    'lt': '<',
    'quot': '"',
    'apos': '\'',
  };

export class SAXParser {
  private buffers: Map<BufferEnum, string> = new Map([
    [BufferEnum.comment, ''],
    [BufferEnum.sgmlDecl, ''],
    [BufferEnum.textNode, ''],
    [BufferEnum.tagName, ''],
    [BufferEnum.doctype, ''],
    [BufferEnum.procInstName, ''],
    [BufferEnum.procInstBody, ''],
    [BufferEnum.entity, ''],
    [BufferEnum.attribName, ''],
    [BufferEnum.attribValue, ''],
    [BufferEnum.cdata, ''],
    [BufferEnum.script, ''],
  ]);
  private bufferCheckPosition: number = MAX_BUFFER_LENGTH;
  private opt: SAXParserOptions = DEFAULT_OPTIONS;
  private q = '';
  private c = '';
  private tags: string[] = [];

  constructor(strict = false, opt: SAXParserOptions = DEFAULT_OPTIONS) {
    this.clearBuffers();
    this.opt = opt;
  }

  private looseCase(value: string): string {
    return this.opt.lowercase ? value.toLowerCase() : value.toUpperCase();
  }

  private clearBuffers() {
    this.buffers.forEach((value: string, key: BufferEnum) => {
      this.buffers.set(key, '');
    });
  }
}
