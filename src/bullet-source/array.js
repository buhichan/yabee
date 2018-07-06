"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function makeBulletSourceFromArray(arr, getCurrentTimeOffset) {
    var listeners = new Set();
    arr.sort(function (a, b) { return a.timeOffset - b.timeOffset; });
    var bulletSource = function (observables) {
        return {
            next: function (b) {
                listeners.forEach(function (x) { return x([b]); });
                var i = arr.findIndex(function (x) { return x.timeOffset >= b.timeOffset; });
                if (i === -1)
                    arr.push(b);
                else
                    arr.splice(i, 0, b);
                return arr;
            },
            subscribe: function (fn) {
                var cursor = 0;
                var playing = null;
                var bullets = arr.slice();
                listeners.add(fn.next);
                var send = function () {
                    if (cursor < bullets.length) {
                        var currentTime = getCurrentTimeOffset();
                        var start = cursor;
                        while (cursor < bullets.length && bullets[cursor].timeOffset <= currentTime) {
                            cursor++;
                        }
                        var toPush = bullets.slice(start, cursor);
                        toPush.length && fn.next(toPush);
                        if (cursor < bullets.length) {
                            var sleepTime = Math.max(24, (bullets[cursor].timeOffset - currentTime) * 1000);
                            playing = setTimeout(send, sleepTime);
                        }
                    }
                };
                var subscriptions = [
                    observables.pause.subscribe({
                        next: function () {
                            playing && clearTimeout(playing);
                        }
                    }),
                    observables.playing.subscribe({
                        next: function () {
                            send();
                        }
                    }),
                    observables.seeked.subscribe({
                        next: function () {
                            cursor = bullets.findIndex(function (x) { return x.timeOffset >= getCurrentTimeOffset(); });
                            if (cursor === -1)
                                cursor = Infinity;
                        }
                    })
                ];
                return function () {
                    fn.next && listeners.delete(fn.next);
                    playing && clearTimeout(playing);
                    subscriptions.forEach(function (x) { return x(); });
                };
            }
        };
    };
    return bulletSource;
}
exports.makeBulletSourceFromArray = makeBulletSourceFromArray;
//# sourceMappingURL=array.js.map