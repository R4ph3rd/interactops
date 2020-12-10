"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const window_class_1 = require("./window.class");
exports.createWindowApi = (nativeAdapter) => {
    return ({
        async getActiveWindow() {
            const windowHandle = await nativeAdapter.getActiveWindow();
            return new window_class_1.Window(nativeAdapter, windowHandle);
        },
        async getWindows() {
            const windowHandles = await nativeAdapter.getWindows();
            return windowHandles.map((handle) => {
                return new window_class_1.Window(nativeAdapter, handle);
            });
        },
    });
};
//# sourceMappingURL=window.function.js.map