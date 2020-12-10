"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const native_adapter_class_1 = require("./adapter/native.adapter.class");
const clipboard_class_1 = require("./clipboard.class");
jest.mock("./adapter/native.adapter.class");
beforeEach(() => {
    jest.resetAllMocks();
});
describe("Clipboard class", () => {
    it("should call the native adapters copy method.", () => {
        const adapterMock = new native_adapter_class_1.NativeAdapter();
        const SUT = new clipboard_class_1.Clipboard(adapterMock);
        const textToCopy = "bar";
        SUT.copy(textToCopy);
        expect(adapterMock.copy).toHaveBeenCalledTimes(1);
        expect(adapterMock.copy).toHaveBeenCalledWith(textToCopy);
    });
    it("should call the native adapters paste method.", () => {
        const adapterMock = new native_adapter_class_1.NativeAdapter();
        const SUT = new clipboard_class_1.Clipboard(adapterMock);
        SUT.paste();
        expect(adapterMock.paste).toHaveBeenCalledTimes(1);
    });
});
//# sourceMappingURL=clipboard.class.spec.js.map