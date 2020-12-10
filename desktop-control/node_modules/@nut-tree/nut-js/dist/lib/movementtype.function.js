"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.linear = (amountOfSteps, speedInPixelsPerSecond) => {
    const timeSteps = [];
    // Duration per movement step in nanoseconds
    let stepDuration = (1 / speedInPixelsPerSecond) * 1000000000;
    if (stepDuration <= 0) {
        stepDuration = 0;
    }
    for (let idx = 0; idx < amountOfSteps; ++idx) {
        timeSteps.push(stepDuration);
    }
    return timeSteps;
};
//# sourceMappingURL=movementtype.function.js.map