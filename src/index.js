"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var play_1 = require("./play");
var state_1 = require("./state");
var default_1 = require("./placement/default");
function renderPlayer(bulletSource, renderer, placement) {
    if (placement === void 0) { placement = default_1.default; }
    var _a = state_1.makeBlayerState({ bulletSource: bulletSource, renderer: renderer, placement: placement }), state = _a.state, methods = _a.methods;
    play_1.play(state);
    return __assign({ state: state }, methods);
}
exports.renderPlayer = renderPlayer;
//# sourceMappingURL=index.js.map