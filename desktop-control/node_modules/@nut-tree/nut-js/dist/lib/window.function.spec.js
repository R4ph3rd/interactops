"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const window_function_1 = require("./window.function");
const native_adapter_class_1 = require("./adapter/native.adapter.class");
const window_class_1 = require("./window.class");
describe("WindowApi", () => {
    describe("getWindows", () => {
        it("should return a list of open Windows", async () => {
            // GIVEN
            const SUT = window_function_1.createWindowApi(new native_adapter_class_1.NativeAdapter());
            // WHEN
            const windows = await SUT.getWindows();
            // THEN
            windows.forEach(wnd => {
                expect(wnd).toEqual(expect.any(window_class_1.Window));
            });
        });
    });
    describe("getActiveWindow", () => {
        it("should return the a single Window which is currently active", async () => {
            // GIVEN
            const SUT = window_function_1.createWindowApi(new native_adapter_class_1.NativeAdapter());
            // WHEN
            const window = await SUT.getActiveWindow();
            // THEN
            expect(window).toEqual(expect.any(window_class_1.Window));
        });
    });
});
//# sourceMappingURL=window.function.spec.js.map