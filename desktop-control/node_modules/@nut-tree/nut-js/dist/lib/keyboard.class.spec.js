"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const native_adapter_class_1 = require("./adapter/native.adapter.class");
const key_enum_1 = require("./key.enum");
const keyboard_class_1 = require("./keyboard.class");
jest.mock("./adapter/native.adapter.class");
beforeEach(() => {
    jest.resetAllMocks();
});
describe("Keyboard", () => {
    it("should have a default delay of 300 ms", () => {
        // GIVEN
        const adapterMock = new native_adapter_class_1.NativeAdapter();
        const SUT = new keyboard_class_1.Keyboard(adapterMock);
        // WHEN
        // THEN
        expect(SUT.config.autoDelayMs).toEqual(300);
    });
    it("should pass input strings down to the type call.", async () => {
        // GIVEN
        const adapterMock = new native_adapter_class_1.NativeAdapter();
        const SUT = new keyboard_class_1.Keyboard(adapterMock);
        const payload = "Test input!";
        // WHEN
        await SUT.type(payload);
        // THEN
        expect(adapterMock.type).toHaveBeenCalledTimes(payload.length);
        for (const char of payload.split("")) {
            expect(adapterMock.type).toHaveBeenCalledWith(char);
        }
    });
    it("should pass multiple input strings down to the type call.", async () => {
        // GIVEN
        jest.setTimeout(10000);
        const adapterMock = new native_adapter_class_1.NativeAdapter();
        const SUT = new keyboard_class_1.Keyboard(adapterMock);
        const payload = ["Test input!", "Array test2"];
        // WHEN
        await SUT.type(...payload);
        // THEN
        expect(adapterMock.type).toHaveBeenCalledTimes(payload.join(" ").length);
        for (const char of payload.join(" ").split("")) {
            expect(adapterMock.type).toHaveBeenCalledWith(char);
        }
    });
    it("should pass input keys down to the click call.", async () => {
        // GIVEN
        const adapterMock = new native_adapter_class_1.NativeAdapter();
        const SUT = new keyboard_class_1.Keyboard(adapterMock);
        const payload = [key_enum_1.Key.A, key_enum_1.Key.S, key_enum_1.Key.D, key_enum_1.Key.F];
        // WHEN
        await SUT.type(...payload);
        // THEN
        expect(adapterMock.click).toHaveBeenCalledTimes(1);
        expect(adapterMock.click).toHaveBeenCalledWith(...payload);
    });
    it("should pass a list of input keys down to the click call.", async () => {
        // GIVEN
        const adapterMock = new native_adapter_class_1.NativeAdapter();
        const SUT = new keyboard_class_1.Keyboard(adapterMock);
        const payload = [key_enum_1.Key.A, key_enum_1.Key.S, key_enum_1.Key.D, key_enum_1.Key.F];
        // WHEN
        for (const key of payload) {
            await SUT.type(key);
        }
        // THEN
        expect(adapterMock.click).toHaveBeenCalledTimes(payload.length);
    });
    it("should pass a list of input keys down to the pressKey call.", async () => {
        // GIVEN
        const adapterMock = new native_adapter_class_1.NativeAdapter();
        const SUT = new keyboard_class_1.Keyboard(adapterMock);
        const payload = [key_enum_1.Key.A, key_enum_1.Key.S, key_enum_1.Key.D, key_enum_1.Key.F];
        // WHEN
        for (const key of payload) {
            await SUT.pressKey(key);
        }
        // THEN
        expect(adapterMock.pressKey).toHaveBeenCalledTimes(payload.length);
    });
    it("should pass a list of input keys down to the releaseKey call.", async () => {
        // GIVEN
        const adapterMock = new native_adapter_class_1.NativeAdapter();
        const SUT = new keyboard_class_1.Keyboard(adapterMock);
        const payload = [key_enum_1.Key.A, key_enum_1.Key.S, key_enum_1.Key.D, key_enum_1.Key.F];
        // WHEN
        for (const key of payload) {
            await SUT.releaseKey(key);
        }
        // THEN
        expect(adapterMock.releaseKey).toHaveBeenCalledTimes(payload.length);
    });
});
//# sourceMappingURL=keyboard.class.spec.js.map