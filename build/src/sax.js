"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BufferEnum;
(function (BufferEnum) {
    BufferEnum[BufferEnum["comment"] = 0] = "comment";
    BufferEnum[BufferEnum["sgmlDecl"] = 1] = "sgmlDecl";
    BufferEnum[BufferEnum["textNode"] = 2] = "textNode";
    BufferEnum[BufferEnum["tagName"] = 3] = "tagName";
    BufferEnum[BufferEnum["doctype"] = 4] = "doctype";
    BufferEnum[BufferEnum["procInstName"] = 5] = "procInstName";
    BufferEnum[BufferEnum["procInstBody"] = 6] = "procInstBody";
    BufferEnum[BufferEnum["entity"] = 7] = "entity";
    BufferEnum[BufferEnum["attribName"] = 8] = "attribName";
    BufferEnum[BufferEnum["attribValue"] = 9] = "attribValue";
    BufferEnum[BufferEnum["cdata"] = 10] = "cdata";
    BufferEnum[BufferEnum["script"] = 11] = "script";
})(BufferEnum || (BufferEnum = {}));
var EventEnum;
(function (EventEnum) {
    EventEnum[EventEnum["text"] = 0] = "text";
    EventEnum[EventEnum["processingInstruction"] = 1] = "processingInstruction";
    EventEnum[EventEnum["SGMLDeclaration"] = 2] = "SGMLDeclaration";
    EventEnum[EventEnum["doctype"] = 3] = "doctype";
    EventEnum[EventEnum["comment"] = 4] = "comment";
    EventEnum[EventEnum["openTagStart"] = 5] = "openTagStart";
    EventEnum[EventEnum["attribute"] = 6] = "attribute";
    EventEnum[EventEnum["openTag"] = 7] = "openTag";
    EventEnum[EventEnum["closeTag"] = 8] = "closeTag";
    EventEnum[EventEnum["openCDATA"] = 9] = "openCDATA";
    EventEnum[EventEnum["CDATA"] = 10] = "CDATA";
    EventEnum[EventEnum["closeCDATA"] = 11] = "closeCDATA";
    EventEnum[EventEnum["error"] = 12] = "error";
    EventEnum[EventEnum["end"] = 13] = "end";
    EventEnum[EventEnum["ready"] = 14] = "ready";
    EventEnum[EventEnum["script"] = 15] = "script";
    EventEnum[EventEnum["openNamespace"] = 16] = "openNamespace";
    EventEnum[EventEnum["closeNamespace"] = 17] = "closeNamespace";
})(EventEnum || (EventEnum = {}));
const MAX_BUFFER_LENGTH = 64 * 1024, EVENTS = [
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
], DEFAULT_OPTIONS = {
    lowercase: false,
}, XML_ENTITIES = {
    'amp': '&',
    'gt': '>',
    'lt': '<',
    'quot': '"',
    'apos': '\'',
};
class SAXParser {
    constructor(strict = false, opt = DEFAULT_OPTIONS) {
        this.buffers = new Map([
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
        this.bufferCheckPosition = MAX_BUFFER_LENGTH;
        this.opt = DEFAULT_OPTIONS;
        this.q = '';
        this.c = '';
        this.tags = [];
        this.clearBuffers();
        this.opt = opt;
    }
    looseCase(value) {
        return this.opt.lowercase ? value.toLowerCase() : value.toUpperCase();
    }
    clearBuffers() {
        this.buffers.forEach((value, key) => {
            this.buffers.set(key, '');
        });
    }
}
exports.SAXParser = SAXParser;
//# sourceMappingURL=sax.js.map