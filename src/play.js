"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function play(state) {
    var observables = state.observables, bulletStream = state.bulletStream, renderer = state.renderer;
    var currentBullets = state.currentBullets;
    bulletStream.subscribe({
        next: function (bullets) {
            if (!bullets.length)
                return;
            var bulletInstance = bullets.map(function (bullet) {
                var bulletInstance = {
                    def: bullet,
                    inst: renderer.renderBullet(bullet, currentBullets)
                };
                currentBullets.add(bulletInstance);
                return bulletInstance;
            });
            bulletInstance[bulletInstance.length - 1].inst.subscribe({
                next: function () { },
                complete: function () {
                    bulletInstance.forEach(function (bulletInstance) {
                        bulletInstance.inst.remove();
                        currentBullets.delete(bulletInstance);
                    });
                }
            });
        }
    });
    var clearAll = {
        next: function () {
            currentBullets.forEach(function (x) { return x.inst.remove(); });
            currentBullets.clear();
        }
    };
    var playAll = {
        next: function () {
            renderer.play();
        }
    };
    var pauseAll = {
        next: function () {
            renderer.pause();
        }
    };
    observables.playing.subscribe(playAll);
    observables.pause.subscribe(pauseAll);
    observables.seeked.subscribe(clearAll);
    observables.ended.subscribe(clearAll);
}
exports.play = play;
//# sourceMappingURL=play.js.map