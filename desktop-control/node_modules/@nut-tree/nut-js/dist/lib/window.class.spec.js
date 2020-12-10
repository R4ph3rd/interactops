"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const window_class_1 = require("./window.class");
const native_adapter_class_1 = require("./adapter/native.adapter.class");
jest.mock("./adapter/native.adapter.class");
describe("Window class", () => {
    it("should retrieve the window region via its native adapter", async () => {
        // GIVEN
        const nativeAdapterMock = new native_adapter_class_1.NativeAdapter();
        const mockWindowHandle = 123;
        const SUT = new window_class_1.Window(nativeAdapterMock, mockWindowHandle);
        // WHEN
        await SUT.region;
        // THEN
        expect(nativeAdapterMock.getWindowRegion).toBeCalledTimes(1);
        expect(nativeAdapterMock.getWindowRegion).toBeCalledWith(mockWindowHandle);
    });
    it("should retrieve the window title via its native adapter", async () => {
        // GIVEN
        const nativeAdapterMock = new native_adapter_class_1.NativeAdapter();
        const mockWindowHandle = 123;
        const SUT = new window_class_1.Window(nativeAdapterMock, mockWindowHandle);
        // WHEN
        await SUT.title;
        // THEN
        expect(nativeAdapterMock.getWindowTitle).toBeCalledTimes(1);
        expect(nativeAdapterMock.getWindowTitle).toBeCalledWith(mockWindowHandle);
    });
});
//# sourceMappingURL=window.class.spec.js.map