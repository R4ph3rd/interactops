import { NativeAdapter } from "./adapter/native.adapter.class";
import { Key } from "./key.enum";
declare type StringOrKey = string[] | Key[];
/**
 * {@link Keyboard} class provides methods to emulate keyboard input
 */
export declare class Keyboard {
    private nativeAdapter;
    /**
     * Config object for {@link Keyboard} class
     */
    config: {
        /**
         * Configures the delay between single key events
         */
        autoDelayMs: number;
    };
    /**
     * {@link Keyboard} class constructor
     * @param nativeAdapter {@link NativeAdapter} instance which bundles access to mouse, keyboard and clipboard
     */
    constructor(nativeAdapter: NativeAdapter);
    /**
     * {@link type} types a sequence of {@link String} or single {@link Key}s via system keyboard
     * @example
     * ```typescript
     *    await keyboard.type(Key.A, Key.S, Key.D, Key.F);
     *    await keyboard.type("Hello, world!");
     * ```
     *
     * @param input Sequence of {@link String} or {@link Key} to type
     */
    type(...input: StringOrKey): Promise<Keyboard>;
    /**
     * {@link pressKey} presses and holds a single {@link Key} for {@link Key} combinations
     * Modifier {@link Key}s are to be given in "natural" ordering, so first modifier {@link Key}s, followed by the {@link Key} to press
     * @example
     * ```typescript
     *    // Will press and hold key combination STRG + V
     *    await keyboard.pressKey(Key.STRG, Key.A);
     * ```
     *
     * @param keys Array of {@link Key}s to press and hold
     */
    pressKey(...keys: Key[]): Promise<Keyboard>;
    /**
     * {@link pressKey} releases a single {@link Key} for {@link Key} combinations
     * Modifier {@link Key}s are to be given in "natural" ordering, so first modifier {@link Key}s, followed by the {@link Key} to press
     * @example
     * ```typescript
     *    // Will release key combination STRG + V
     *    await keyboard.releaseKey(Key.STRG, Key.A);
     * ```
     *
     * @param keys Array of {@link Key}s to release
     */
    releaseKey(...keys: Key[]): Promise<Keyboard>;
}
export {};
//# sourceMappingURL=keyboard.class.d.ts.map