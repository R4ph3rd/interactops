"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const native_adapter_class_1 = require("./adapter/native.adapter.class");
const button_enum_1 = require("./button.enum");
const mouse_class_1 = require("./mouse.class");
const point_class_1 = require("./point.class");
const linehelper_class_1 = require("./util/linehelper.class");
jest.mock("./adapter/native.adapter.class");
beforeEach(() => {
    jest.resetAllMocks();
});
const linehelper = new linehelper_class_1.LineHelper();
describe("Mouse class", () => {
    it("should have a default delay of 500 ms", () => {
        // GIVEN
        const adapterMock = new native_adapter_class_1.NativeAdapter();
        const SUT = new mouse_class_1.Mouse(adapterMock);
        // WHEN
        // THEN
        expect(SUT.config.autoDelayMs).toEqual(100);
    });
    it("should forward scrollLeft to the native adapter class", async () => {
        // GIVEN
        const nativeAdapterMock = new native_adapter_class_1.NativeAdapter();
        const SUT = new mouse_class_1.Mouse(nativeAdapterMock);
        const scrollAmount = 5;
        // WHEN
        const result = await SUT.scrollLeft(scrollAmount);
        // THEN
        expect(nativeAdapterMock.scrollLeft).toBeCalledWith(scrollAmount);
        expect(result).toBe(SUT);
    });
    it("should forward scrollRight to the native adapter class", async () => {
        // GIVEN
        const nativeAdapterMock = new native_adapter_class_1.NativeAdapter();
        const SUT = new mouse_class_1.Mouse(nativeAdapterMock);
        const scrollAmount = 5;
        // WHEN
        const result = await SUT.scrollRight(scrollAmount);
        // THEN
        expect(nativeAdapterMock.scrollRight).toBeCalledWith(scrollAmount);
        expect(result).toBe(SUT);
    });
    it("should forward scrollDown to the native adapter class", async () => {
        // GIVEN
        const nativeAdapterMock = new native_adapter_class_1.NativeAdapter();
        const SUT = new mouse_class_1.Mouse(nativeAdapterMock);
        const scrollAmount = 5;
        // WHEN
        const result = await SUT.scrollDown(scrollAmount);
        // THEN
        expect(nativeAdapterMock.scrollDown).toBeCalledWith(scrollAmount);
        expect(result).toBe(SUT);
    });
    it("should forward scrollUp to the native adapter class", async () => {
        // GIVEN
        const nativeAdapterMock = new native_adapter_class_1.NativeAdapter();
        const SUT = new mouse_class_1.Mouse(nativeAdapterMock);
        const scrollAmount = 5;
        // WHEN
        const result = await SUT.scrollUp(scrollAmount);
        // THEN
        expect(nativeAdapterMock.scrollUp).toBeCalledWith(scrollAmount);
        expect(result).toBe(SUT);
    });
    it("should forward leftClick to the native adapter class", async () => {
        // GIVEN
        const nativeAdapterMock = new native_adapter_class_1.NativeAdapter();
        const SUT = new mouse_class_1.Mouse(nativeAdapterMock);
        // WHEN
        const result = await SUT.leftClick();
        // THEN
        expect(nativeAdapterMock.leftClick).toBeCalled();
        expect(result).toBe(SUT);
    });
    it("should forward rightClick to the native adapter class", async () => {
        // GIVEN
        const nativeAdapterMock = new native_adapter_class_1.NativeAdapter();
        const SUT = new mouse_class_1.Mouse(nativeAdapterMock);
        // WHEN
        const result = await SUT.rightClick();
        // THEN
        expect(nativeAdapterMock.rightClick).toBeCalled();
        expect(result).toBe(SUT);
    });
    it("update mouse position along path on move", async () => {
        // GIVEN
        const nativeAdapterMock = new native_adapter_class_1.NativeAdapter();
        const SUT = new mouse_class_1.Mouse(nativeAdapterMock);
        const path = linehelper.straightLine(new point_class_1.Point(0, 0), new point_class_1.Point(10, 10));
        // WHEN
        const result = await SUT.move(path);
        // THEN
        expect(nativeAdapterMock.setMousePosition).toBeCalledTimes(path.length);
        expect(result).toBe(SUT);
    });
    it("should press and hold left mouse button, move and release left mouse button on drag", async () => {
        // GIVEN
        const nativeAdapterMock = new native_adapter_class_1.NativeAdapter();
        const SUT = new mouse_class_1.Mouse(nativeAdapterMock);
        const path = linehelper.straightLine(new point_class_1.Point(0, 0), new point_class_1.Point(10, 10));
        // WHEN
        const result = await SUT.drag(path);
        // THEN
        expect(nativeAdapterMock.pressButton).toBeCalledWith(button_enum_1.Button.LEFT);
        expect(nativeAdapterMock.setMousePosition).toBeCalledTimes(path.length);
        expect(nativeAdapterMock.releaseButton).toBeCalledWith(button_enum_1.Button.LEFT);
        expect(result).toBe(SUT);
    });
});
describe("Mousebuttons", () => {
    it.each([
        [button_enum_1.Button.LEFT, button_enum_1.Button.LEFT],
        [button_enum_1.Button.MIDDLE, button_enum_1.Button.MIDDLE],
        [button_enum_1.Button.RIGHT, button_enum_1.Button.RIGHT],
    ])("should be pressed and released", async (input, expected) => {
        const nativeAdapterMock = new native_adapter_class_1.NativeAdapter();
        const SUT = new mouse_class_1.Mouse(nativeAdapterMock);
        const pressed = await SUT.pressButton(input);
        const released = await SUT.releaseButton(input);
        expect(nativeAdapterMock.pressButton).toBeCalledWith(expected);
        expect(nativeAdapterMock.releaseButton).toBeCalledWith(expected);
        expect(pressed).toBe(SUT);
        expect(released).toBe(SUT);
    });
});
//# sourceMappingURL=mouse.class.spec.js.map