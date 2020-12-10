"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const image_reader_class_1 = require("./image-reader.class");
const image_writer_class_1 = require("./image-writer.class");
const INPUT_PATH = path_1.resolve(__dirname, "./__mocks__/mouse.png");
const OUTPUT_PATH_PNG = path_1.resolve(__dirname, "./__mocks__/output.png");
const OUTPUT_PATH_JPG = path_1.resolve(__dirname, "./__mocks__/output.jpg");
beforeEach(() => {
    for (const file of [OUTPUT_PATH_JPG, OUTPUT_PATH_PNG]) {
        if (fs_1.existsSync(file)) {
            fs_1.unlinkSync(file);
        }
    }
});
describe.each([[OUTPUT_PATH_PNG], [OUTPUT_PATH_JPG]])("Image writer", (outputPath) => {
    test("should allow to store image data to disk", async () => {
        // GIVEN
        const imageReader = new image_reader_class_1.ImageReader();
        const image = await imageReader.load(INPUT_PATH);
        const imageWriter = new image_writer_class_1.ImageWriter();
        // WHEN
        await imageWriter.store(image, outputPath);
        // THEN
        expect(fs_1.existsSync(outputPath)).toBeTruthy();
    });
});
//# sourceMappingURL=image-writer.class.spec.js.map