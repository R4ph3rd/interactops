"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const native_adapter_class_1 = require("./adapter/native.adapter.class");
const clipboard_class_1 = require("./clipboard.class");
describe("Clipboard class", () => {
    it("should paste copied input from system clipboard.", async () => {
        const adapterMock = new native_adapter_class_1.NativeAdapter();
        const SUT = new clipboard_class_1.Clipboard(adapterMock);
        const textToCopy = "bar";
        SUT.copy(textToCopy);
        await expect(SUT.paste()).resolves.toEqual(textToCopy);
    });
});
//# sourceMappingURL=clipboard.class.e2e.spec.js.map