import { Button } from "../button.enum";
import { Key } from "../key.enum";
import { Point } from "../point.class";
import { ClipboardActionProvider } from "../provider/native/clipboard-action-provider.interface";
import { KeyboardActionProvider } from "../provider/native/keyboard-action-provider.interface";
import { MouseActionProvider } from "../provider/native/mouse-action-provider.interface";
import { Region } from "../region.class";
import { WindowActionProvider } from "../provider/native/window-action-provider.interface";
/**
 * {@link NativeAdapter} serves as an abstraction layer for all OS level interactions.
 *
 * This allows to provide a high level interface for native actions,
 * without having to spread (possibly) multiple dependencies all over the code.
 * All actions which involve the OS are bundled in this adapter.
 */
export declare class NativeAdapter {
    private clipboard;
    private keyboard;
    private mouse;
    private window;
    /**
     * {@link NativeAdapter} class constructor
     * @param clipboard {@link ClipboardActionProvider} instance used to interact with a systems clipboard (Default: {@link ClipboardAction})
     * @param keyboard {@link KeyboardActionProvider} instance used to interact with a systems keybaord (Default: {@link KeyboardAction})
     * @param mouse {@link MouseActionProvider} instance used to interact with a systems mouse (Default: {@link MouseAction})
     * @param window {@link WindowActionProvider} instance used to interact with a systems windows (Default: {@link WindowAction})
     */
    constructor(clipboard?: ClipboardActionProvider, keyboard?: KeyboardActionProvider, mouse?: MouseActionProvider, window?: WindowActionProvider);
    /**
     * {@link setMouseDelay} configures mouse speed for movement
     *
     * @param delay Mouse delay in milliseconds
     */
    setMouseDelay(delay: number): void;
    /**
     * {@link setKeyboardDelay} configures keyboard delay between key presses
     *
     * @param delay The keyboard delay in milliseconds
     */
    setKeyboardDelay(delay: number): void;
    /**
     * {@link setMousePosition} changes the current mouse cursor position to a given {@link Point}
     *
     * @param p The new cursor position at {@link Point} p
     */
    setMousePosition(p: Point): Promise<void>;
    /**
     * {@link currentMousePosition} returns the current mouse position
     *
     * @returns Current cursor position at a certain {@link Point}
     */
    currentMousePosition(): Promise<Point>;
    /**
     * {@link leftClick} triggers a native left-click event via OS API
     */
    leftClick(): Promise<void>;
    /**
     * {@link rightClick} triggers a native right-click event via OS API
     */
    rightClick(): Promise<void>;
    /**
     * {@link middleClick} triggers a native middle-click event via OS API
     */
    middleClick(): Promise<void>;
    /**
     * {@link pressButton} presses and holds a mouse {@link Button}
     *
     * @param btn The mouse {@link Button} to press
     */
    pressButton(btn: Button): Promise<void>;
    /**
     * {@link releaseButton} releases a mouse {@link Button} previously clicked via {@link pressButton}
     *
     * @param btn The mouse {@link Button} to release
     */
    releaseButton(btn: Button): Promise<void>;
    /**
     * {@link type} types a given string via native keyboard events
     *
     * @param input The text to type
     */
    type(input: string): Promise<void>;
    /**
     * {@link click} clicks a {@link Key} via native keyboard event
     *
     * @param keys Array of {@link Key}s to click
     */
    click(...keys: Key[]): Promise<void>;
    /**
     * {@link pressKey} presses and holds a given {@link Key}
     *
     * @param keys Array of {@link Key}s to press and hold
     */
    pressKey(...keys: Key[]): Promise<void>;
    /**
     * {@link releaseKey} releases a {@link Key} previously presses via {@link pressKey}
     *
     * @param keys Array of {@link Key}s to release
     */
    releaseKey(...keys: Key[]): Promise<void>;
    /**
     * {@link scrollUp} triggers an upwards mouse wheel scroll
     *
     * @param amount The amount of 'ticks' to scroll
     */
    scrollUp(amount: number): Promise<void>;
    /**
     * {@link scrollDown} triggers a downward mouse wheel scroll
     *
     * @param amount The amount of 'ticks' to scroll
     */
    scrollDown(amount: number): Promise<void>;
    /**
     * {@link scrollLeft} triggers a left mouse scroll
     *
     * @param amount The amount of 'ticks' to scroll
     */
    scrollLeft(amount: number): Promise<void>;
    /**
     * {@link scrollRight} triggers a right mouse scroll
     *
     * @param amount The amount of 'ticks' to scroll
     */
    scrollRight(amount: number): Promise<void>;
    /**
     * {@link copy} copies a given text to the system clipboard
     *
     * @param text The text to copy
     */
    copy(text: string): Promise<void>;
    /**
     * {@link paste} pastes the current text on the system clipboard
     *
     * @returns The clipboard text
     */
    paste(): Promise<string>;
    getWindows(): Promise<number[]>;
    /**
     * {@link getActiveWindow} returns the window handle of the currently active foreground window
     *
     * @returns The handle to the currently active foreground window
     */
    getActiveWindow(): Promise<number>;
    /**
     * {@link getWindowTitle} returns the title of a window addressed via its window handle
     *
     * @returns A string representing the title of a window addressed via its window handle
     */
    getWindowTitle(windowHandle: number): Promise<string>;
    /**
     * {@link getWindowRegion} returns a {@link Region} object representing the size and position of the window addressed via its window handle
     *
     * @returns The {@link Region} occupied by the window addressed via its window handle
     */
    getWindowRegion(windowHandle: number): Promise<Region>;
}
//# sourceMappingURL=native.adapter.class.d.ts.map