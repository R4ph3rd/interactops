"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sleep_function_1 = require("./sleep.function");
const inputIsString = (input) => {
    return input.every((elem) => typeof elem === "string");
};
/**
 * {@link Keyboard} class provides methods to emulate keyboard input
 */
class Keyboard {
    /**
     * {@link Keyboard} class constructor
     * @param nativeAdapter {@link NativeAdapter} instance which bundles access to mouse, keyboard and clipboard
     */
    constructor(nativeAdapter) {
        this.nativeAdapter = nativeAdapter;
        /**
         * Config object for {@link Keyboard} class
         */
        this.config = {
            /**
             * Configures the delay between single key events
             */
            autoDelayMs: 300,
        };
        this.nativeAdapter.setKeyboardDelay(this.config.autoDelayMs);
    }
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
    type(...input) {
        return new Promise(async (resolve, reject) => {
            try {
                if (inputIsString(input)) {
                    for (const char of input.join(" ").split("")) {
                        await sleep_function_1.sleep(this.config.autoDelayMs);
                        await this.nativeAdapter.type(char);
                    }
                }
                else {
                    await this.nativeAdapter.click(...input);
                }
                resolve(this);
            }
            catch (e) {
                reject(e);
            }
        });
    }
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
    pressKey(...keys) {
        return new Promise(async (resolve, reject) => {
            try {
                await this.nativeAdapter.pressKey(...keys);
                resolve(this);
            }
            catch (e) {
                reject(e);
            }
        });
    }
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
    releaseKey(...keys) {
        return new Promise(async (resolve, reject) => {
            try {
                await this.nativeAdapter.releaseKey(...keys);
                resolve(this);
            }
            catch (e) {
                reject(e);
            }
        });
    }
}
exports.Keyboard = Keyboard;
//# sourceMappingURL=keyboard.class.js.map