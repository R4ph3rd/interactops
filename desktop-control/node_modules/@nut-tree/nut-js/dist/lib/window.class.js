"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Window {
    constructor(nativeActions, windowHandle) {
        this.nativeActions = nativeActions;
        this.windowHandle = windowHandle;
    }
    get title() {
        return this.nativeActions.getWindowTitle(this.windowHandle);
    }
    get region() {
        return this.nativeActions.getWindowRegion(this.windowHandle);
    }
}
exports.Window = Window;
//# sourceMappingURL=window.class.js.map