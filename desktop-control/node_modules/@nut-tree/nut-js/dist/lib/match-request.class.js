"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MatchRequest {
    constructor(haystack, pathToNeedle, searchRegion, confidence, searchMultipleScales = true) {
        this.haystack = haystack;
        this.pathToNeedle = pathToNeedle;
        this.searchRegion = searchRegion;
        this.confidence = confidence;
        this.searchMultipleScales = searchMultipleScales;
    }
}
exports.MatchRequest = MatchRequest;
//# sourceMappingURL=match-request.class.js.map