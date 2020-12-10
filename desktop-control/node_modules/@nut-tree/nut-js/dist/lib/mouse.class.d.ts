import { NativeAdapter } from "./adapter/native.adapter.class";
import { Button } from "./button.enum";
import { Point } from "./point.class";
/**
 * {@link Mouse} class provides methods to emulate mouse input
 */
export declare class Mouse {
    private native;
    /**
     * Config object for {@link Mouse} class
     */
    config: {
        /**
         * Configures the delay between single mouse events
         */
        autoDelayMs: number;
        /**
         * Configures the speed in pixels/second for mouse movement
         */
        mouseSpeed: number;
    };
    /**
     * {@link Mouse} class constructor
     * @param native {@link NativeAdapter} instance which bundles access to mouse, keyboard and clipboard
     */
    constructor(native: NativeAdapter);
    /**
     * {@link setPosition} instantly moves the mouse cursor to a given {@link Point}
     * @param target {@link Point} to move the cursor to
     */
    setPosition(target: Point): Promise<Mouse>;
    /**
     * {@link getPosition} returns a {@link Point} representing the current mouse position
     */
    getPosition(): Promise<Point>;
    /**
     * {@link move} moves the mouse cursor along a given path of {@link Point}s, according to a movement type
     * @param path Array of {@link Point}s to follow
     * @param movementType Defines the type of mouse movement. Would allow to configured acceleration etc. (Default: {@link linear}, no acceleration)
     */
    move(path: Point[] | Promise<Point[]>, movementType?: (amountOfSteps: number, speedInPixelsPerSecond: number) => number[]): Promise<Mouse>;
    /**
     * {@link leftClick} performs a click with the left mouse button
     */
    leftClick(): Promise<Mouse>;
    /**
     * {@link rightClick} performs a click with the right mouse button
     */
    rightClick(): Promise<Mouse>;
    /**
     * {@link scrollDown} scrolls down for a given amount of "steps"
     * Please note that the actual scroll distance of a single "step" is OS dependent
     * @param amount The amount of "steps" to scroll
     */
    scrollDown(amount: number): Promise<Mouse>;
    /**
     * {@link scrollUp} scrolls up for a given amount of "steps"
     * Please note that the actual scroll distance of a single "step" is OS dependent
     * @param amount The amount of "steps" to scroll
     */
    scrollUp(amount: number): Promise<Mouse>;
    /**
     * {@link scrollLeft} scrolls left for a given amount of "steps"
     * Please note that the actual scroll distance of a single "step" is OS dependent
     * @param amount The amount of "steps" to scroll
     */
    scrollLeft(amount: number): Promise<Mouse>;
    /**
     * {@link scrollRight} scrolls right for a given amount of "steps"
     * Please note that the actual scroll distance of a single "step" is OS dependent
     * @param amount The amount of "steps" to scroll
     */
    scrollRight(amount: number): Promise<Mouse>;
    /**
     * {@link drag} drags the mouse along a certain path
     * In summary, {@link drag} presses and holds the left mouse button, moves the mouse and releases the left button
     * @param path The path of {@link Point}s to drag along
     */
    drag(path: Point[] | Promise<Point[]>): Promise<Mouse>;
    /**
     * {@link pressButton} presses and holds a mouse button
     * @param btn The {@link Button} to press and hold
     */
    pressButton(btn: Button): Promise<Mouse>;
    /**
     * {@link releaseButton} releases a mouse button previously pressed via {@link pressButton}
     * @param btn The {@link Button} to release
     */
    releaseButton(btn: Button): Promise<Mouse>;
}
//# sourceMappingURL=mouse.class.d.ts.map