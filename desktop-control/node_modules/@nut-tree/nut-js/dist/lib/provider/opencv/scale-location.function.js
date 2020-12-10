"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const region_class_1 = require("../../region.class");
const bound_value_function_1 = require("./bound-value.function");
function scaleLocation(result, scaleFactor) {
    const boundScaleFactor = bound_value_function_1.lowerBound(scaleFactor, 0.0, 1.0);
    return new region_class_1.Region(result.left / boundScaleFactor, result.top / boundScaleFactor, result.width, result.height);
}
exports.scaleLocation = scaleLocation;
//# sourceMappingURL=scale-location.function.js.map