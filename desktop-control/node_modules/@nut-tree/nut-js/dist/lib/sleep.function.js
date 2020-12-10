"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = async (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};
exports.busyWaitForNanoSeconds = (duration) => {
    return new Promise(res => {
        const start = process.hrtime.bigint();
        let isWaiting = true;
        while (isWaiting) {
            if ((process.hrtime.bigint() - start) > duration) {
                isWaiting = false;
            }
        }
        res();
    });
};
//# sourceMappingURL=sleep.function.js.map