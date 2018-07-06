"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function makeBlayerState(args) {
    var renderer = args.renderer, bulletSource = args.bulletSource, placement = args.placement;
    var observables = renderer.getVideoObservables();
    var bulletStream = bulletSource(observables);
    var currentBulletInstances = new Set();
    var state = {
        get bulletStream() {
            return bulletStream;
        },
        get observables() {
            return observables;
        },
        get renderer() {
            return renderer;
        },
        get currentBullets() {
            return currentBulletInstances;
        },
        get placement() {
            return placement;
        }
    };
    return {
        state: state,
        methods: {
            destroy: function () {
            }
        }
    };
}
exports.makeBlayerState = makeBlayerState;
//# sourceMappingURL=state.js.map