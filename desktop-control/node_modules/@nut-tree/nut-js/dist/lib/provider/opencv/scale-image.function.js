"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const cv = __importStar(require("opencv4nodejs-prebuilt"));
const bound_value_function_1 = require("./bound-value.function");
async function scaleImage(image, scaleFactor) {
    const boundScaleFactor = bound_value_function_1.lowerBound(scaleFactor, 0.0, 1.0);
    const scaledRows = Math.floor(image.rows * boundScaleFactor);
    const scaledCols = Math.floor(image.cols * boundScaleFactor);
    return image.resizeAsync(scaledRows, scaledCols, 0, 0, cv.INTER_AREA);
}
exports.scaleImage = scaleImage;
//# sourceMappingURL=scale-image.function.js.map