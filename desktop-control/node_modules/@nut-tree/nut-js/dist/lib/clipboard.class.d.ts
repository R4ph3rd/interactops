import { NativeAdapter } from "./adapter/native.adapter.class";
/**
 * {@link Clipboard} class gives access to a systems clipboard
 */
export declare class Clipboard {
    private nativeAdapter;
    /**
     * {@link Clipboard} class constructor
     * @param nativeAdapter {@link NativeAdapter} instance used to access OS API
     */
    constructor(nativeAdapter: NativeAdapter);
    /**
     * {@link copy} copies a given text to the system clipboard
     * @param text The text to copy
     */
    copy(text: string): Promise<void>;
    /**
     * {@link paste} pastes the current content of the system clipboard (limited to text)
     */
    paste(): Promise<string>;
}
//# sourceMappingURL=clipboard.class.d.ts.map