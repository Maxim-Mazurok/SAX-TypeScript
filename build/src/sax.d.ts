interface SAXParserOptions {
    lowercase: boolean;
}
export declare class SAXParser {
    private buffers;
    private bufferCheckPosition;
    private opt;
    private q;
    private c;
    private tags;
    constructor(strict?: boolean, opt?: SAXParserOptions);
    private looseCase;
    private clearBuffers;
}
export {};
