"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const locationparameters_class_1 = require("../../locationparameters.class");
exports.toShow = async (received, needle, confidence) => {
    let locationParams;
    if (confidence) {
        locationParams = new locationparameters_class_1.LocationParameters();
        locationParams.confidence = confidence;
    }
    try {
        await received.find(needle, locationParams);
        return {
            message: () => `Expected screen to not show ${needle}`,
            pass: true,
        };
    }
    catch (err) {
        return {
            message: () => `Screen is not showing ${needle}: ${err}`,
            pass: false,
        };
    }
};
//# sourceMappingURL=toShow.function.js.map