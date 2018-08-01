"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var play_1 = require("./play");
var state_1 = require("./state");
function renderPlayer(bulletSource, renderer) {
    var _a = state_1.makeBlayerState({ bulletSource: bulletSource, renderer: renderer }), state = _a.state, methods = _a.methods;
    play_1.play(state);
    return __assign({ state: state }, methods);
}
exports.renderPlayer = renderPlayer;
var a = 1;
a = a + 1;
//# sourceMappingURL=index.js.map