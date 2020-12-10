"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * {@link Clipboard} class gives access to a systems clipboard
 */
class Clipboard {
    /**
     * {@link Clipboard} class constructor
     * @param nativeAdapter {@link NativeAdapter} instance used to access OS API
     */
    constructor(nativeAdapter) {
        this.nativeAdapter = nativeAdapter;
    }
    /**
     * {@link copy} copies a given text to the system clipboard
     * @param text The text to copy
     */
    copy(text) {
        return this.nativeAdapter.copy(text);
    }
    /**
     * {@link paste} pastes the current content of the system clipboard (limited to text)
     */
    paste() {
        return this.nativeAdapter.paste();
    }
}
exports.Clipboard = Clipboard;
//# sourceMappingURL=clipboard.class.js.map