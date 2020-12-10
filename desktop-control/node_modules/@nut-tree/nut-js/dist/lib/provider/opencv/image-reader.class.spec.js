"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const image_reader_class_1 = require("./image-reader.class");
describe("Image loader", () => {
    it("should resolve to a non-empty Mat on successful load", async () => {
        // GIVEN
        const SUT = new image_reader_class_1.ImageReader();
        const imagePath = path.resolve(__dirname, "./__mocks__/mouse.png");
        // WHEN
        const result = await SUT.load(imagePath);
        // THEN
        expect(result.height).toBeGreaterThan(0);
        expect(result.width).toBeGreaterThan(0);
    });
    it("loadImage should reject on unsuccessful load", async () => {
        // GIVEN
        const SUT = new image_reader_class_1.ImageReader();
        const imagePath = "./__mocks__/foo.png";
        // WHEN
        const call = SUT.load;
        // THEN
        await expect(call(imagePath)).rejects.toEqual(`Failed to load image from '${imagePath}'`);
    });
});
//# sourceMappingURL=image-reader.class.spec.js.map