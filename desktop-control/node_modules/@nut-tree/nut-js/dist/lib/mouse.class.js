"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const button_enum_1 = require("./button.enum");
const movementtype_function_1 = require("./movementtype.function");
const sleep_function_1 = require("./sleep.function");
/**
 * {@link Mouse} class provides methods to emulate mouse input
 */
class Mouse {
    /**
     * {@link Mouse} class constructor
     * @param native {@link NativeAdapter} instance which bundles access to mouse, keyboard and clipboard
     */
    constructor(native) {
        this.native = native;
        /**
         * Config object for {@link Mouse} class
         */
        this.config = {
            /**
             * Configures the delay between single mouse events
             */
            autoDelayMs: 100,
            /**
             * Configures the speed in pixels/second for mouse movement
             */
            mouseSpeed: 1000,
        };
        this.native.setMouseDelay(0);
    }
    /**
     * {@link setPosition} instantly moves the mouse cursor to a given {@link Point}
     * @param target {@link Point} to move the cursor to
     */
    async setPosition(target) {
        return new Promise(async (resolve, reject) => {
            try {
                await this.native.setMousePosition(target);
                resolve(this);
            }
            catch (e) {
                reject(e);
            }
        });
    }
    /**
     * {@link getPosition} returns a {@link Point} representing the current mouse position
     */
    getPosition() {
        return this.native.currentMousePosition();
    }
    /**
     * {@link move} moves the mouse cursor along a given path of {@link Point}s, according to a movement type
     * @param path Array of {@link Point}s to follow
     * @param movementType Defines the type of mouse movement. Would allow to configured acceleration etc. (Default: {@link linear}, no acceleration)
     */
    async move(path, movementType = movementtype_function_1.linear) {
        return new Promise(async (resolve, reject) => {
            try {
                const pathSteps = await path;
                const timeSteps = movementType(pathSteps.length, this.config.mouseSpeed);
                for (let idx = 0; idx < pathSteps.length; ++idx) {
                    const node = pathSteps[idx];
                    const minTime = timeSteps[idx];
                    await sleep_function_1.busyWaitForNanoSeconds(minTime);
                    await this.native.setMousePosition(node);
                }
                resolve(this);
            }
            catch (e) {
                reject(e);
            }
        });
    }
    /**
     * {@link leftClick} performs a click with the left mouse button
     */
    async leftClick() {
        return new Promise(async (resolve) => {
            await sleep_function_1.sleep(this.config.autoDelayMs);
            await this.native.leftClick();
            resolve(this);
        });
    }
    /**
     * {@link rightClick} performs a click with the right mouse button
     */
    async rightClick() {
        return new Promise(async (resolve, reject) => {
            try {
                await sleep_function_1.sleep(this.config.autoDelayMs);
                await this.native.rightClick();
                resolve(this);
            }
            catch (e) {
                reject(e);
            }
        });
    }
    /**
     * {@link scrollDown} scrolls down for a given amount of "steps"
     * Please note that the actual scroll distance of a single "step" is OS dependent
     * @param amount The amount of "steps" to scroll
     */
    async scrollDown(amount) {
        return new Promise(async (resolve, reject) => {
            try {
                await sleep_function_1.sleep(this.config.autoDelayMs);
                await this.native.scrollDown(amount);
                resolve(this);
            }
            catch (e) {
                reject(e);
            }
        });
    }
    /**
     * {@link scrollUp} scrolls up for a given amount of "steps"
     * Please note that the actual scroll distance of a single "step" is OS dependent
     * @param amount The amount of "steps" to scroll
     */
    async scrollUp(amount) {
        return new Promise(async (resolve, reject) => {
            try {
                await sleep_function_1.sleep(this.config.autoDelayMs);
                await this.native.scrollUp(amount);
                resolve(this);
            }
            catch (e) {
                reject(e);
            }
        });
    }
    /**
     * {@link scrollLeft} scrolls left for a given amount of "steps"
     * Please note that the actual scroll distance of a single "step" is OS dependent
     * @param amount The amount of "steps" to scroll
     */
    async scrollLeft(amount) {
        return new Promise(async (resolve, reject) => {
            try {
                await sleep_function_1.sleep(this.config.autoDelayMs);
                await this.native.scrollLeft(amount);
                resolve(this);
            }
            catch (e) {
                reject(e);
            }
        });
    }
    /**
     * {@link scrollRight} scrolls right for a given amount of "steps"
     * Please note that the actual scroll distance of a single "step" is OS dependent
     * @param amount The amount of "steps" to scroll
     */
    async scrollRight(amount) {
        return new Promise(async (resolve, reject) => {
            try {
                await sleep_function_1.sleep(this.config.autoDelayMs);
                await this.native.scrollRight(amount);
                resolve(this);
            }
            catch (e) {
                reject(e);
            }
        });
    }
    /**
     * {@link drag} drags the mouse along a certain path
     * In summary, {@link drag} presses and holds the left mouse button, moves the mouse and releases the left button
     * @param path The path of {@link Point}s to drag along
     */
    async drag(path) {
        return new Promise(async (resolve, reject) => {
            try {
                await sleep_function_1.sleep(this.config.autoDelayMs);
                await this.native.pressButton(button_enum_1.Button.LEFT);
                await this.move(path);
                await this.native.releaseButton(button_enum_1.Button.LEFT);
                resolve(this);
            }
            catch (e) {
                reject(e);
            }
        });
    }
    /**
     * {@link pressButton} presses and holds a mouse button
     * @param btn The {@link Button} to press and hold
     */
    async pressButton(btn) {
        return new Promise(async (resolve, reject) => {
            try {
                await this.native.pressButton(btn);
                resolve(this);
            }
            catch (e) {
                reject(e);
            }
        });
    }
    /**
     * {@link releaseButton} releases a mouse button previously pressed via {@link pressButton}
     * @param btn The {@link Button} to release
     */
    async releaseButton(btn) {
        return new Promise(async (resolve, reject) => {
            try {
                await this.native.releaseButton(btn);
                resolve(this);
            }
            catch (e) {
                reject(e);
            }
        });
    }
}
exports.Mouse = Mouse;
//# sourceMappingURL=mouse.class.js.map