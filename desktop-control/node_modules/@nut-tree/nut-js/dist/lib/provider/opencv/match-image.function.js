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
const match_result_class_1 = require("../../match-result.class");
const region_class_1 = require("../../region.class");
async function matchImages(haystack, needle) {
    const match = await haystack.matchTemplateAsync(needle, cv.TM_SQDIFF_NORMED);
    const minMax = await match.minMaxLocAsync();
    return new match_result_class_1.MatchResult(1.0 - minMax.minVal, new region_class_1.Region(minMax.minLoc.x, minMax.minLoc.y, needle.cols, needle.rows));
}
exports.matchImages = matchImages;
//# sourceMappingURL=match-image.function.js.map