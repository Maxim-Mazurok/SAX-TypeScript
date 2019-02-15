// type SAXParserOptions = {
//     lowercase: boolean,
// }
//
// enum BufferEnum {
//     comment,
//     sgmlDecl,
//     textNode,
//     tagName,
//     doctype,
//     procInstName,
//     procInstBody,
//     entity,
//     attribName,
//     attribValue,
//     cdata,
//     script,
// }
//
// enum EventEnum {
//     text,
//     processinginstruction,
//     sgmldeclaration,
//     doctype,
//     comment,
//     opentagstart,
//     attribute,
//     opentag,
//     closetag,
//     opencdata,
//     cdata,
//     closecdata,
//     error,
//     end,
//     ready,
//     script,
//     opennamespace,
//     closenamespace,
// }
//
// const
//     MAX_BUFFER_LENGTH: number = 64 * 1024,
//     EVENTS: EventEnum[] = [
//         EventEnum.text,
//         EventEnum.processinginstruction,
//         EventEnum.sgmldeclaration,
//         EventEnum.doctype,
//         EventEnum.comment,
//         EventEnum.opentagstart,
//         EventEnum.attribute,
//         EventEnum.opentag,
//         EventEnum.closetag,
//         EventEnum.opencdata,
//         EventEnum.cdata,
//         EventEnum.closecdata,
//         EventEnum.error,
//         EventEnum.end,
//         EventEnum.ready,
//         EventEnum.script,
//         EventEnum.opennamespace,
//         EventEnum.closenamespace,
//     ],
//     DEFAULT_OPTIONS: SAXParserOptions = {
//         lowercase: false,
//     };
//
// export class SAXParser {
//     private buffers: Map<BufferEnum, string> = new Map([
//         [BufferEnum.comment, ''],
//         [BufferEnum.sgmlDecl, ''],
//         [BufferEnum.textNode, ''],
//         [BufferEnum.tagName, ''],
//         [BufferEnum.doctype, ''],
//         [BufferEnum.procInstName, ''],
//         [BufferEnum.procInstBody, ''],
//         [BufferEnum.entity, ''],
//         [BufferEnum.attribName, ''],
//         [BufferEnum.attribValue, ''],
//         [BufferEnum.cdata, ''],
//         [BufferEnum.script, ''],
//     ]);
//     private bufferCheckPosition: number = MAX_BUFFER_LENGTH;
//     private opt: SAXParserOptions = DEFAULT_OPTIONS;
//     private q: string = '';
//     private c: string = '';
//     private tags: string[] = [];
//
//     constructor(strict: boolean = false, opt: SAXParserOptions = DEFAULT_OPTIONS) {
//         this.clearBuffers();
//         this.opt = opt;
//     }
//
//     private looseCase(value: string): string {
//         return this.opt.lowercase ? value.toLowerCase() : value.toUpperCase();
//     }
//
//     private clearBuffers() {
//         this.buffers.forEach((value: string, key: BufferEnum) => {
//             this.buffers.set(key, '');
//         });
//     }
// }
