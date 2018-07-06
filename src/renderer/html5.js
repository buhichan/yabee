"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("../observable");
function makeBatchAppender(container) {
    var queue = new Set();
    function scheduleAppend() {
        if (!queue.size)
            return;
        var frag = document.createDocumentFragment();
        queue.forEach(function (child) { return frag.appendChild(child); });
        container.appendChild(frag);
        queue.clear();
    }
    return {
        append: function (element) {
            queue.add(element);
            requestAnimationFrame(scheduleAppend);
        }
    };
}
function html5renderer(container, video, getBulletClassName) {
    var styles = "\n        .yabee {\n            position:absolute;\n            color:#fff;\n            animation: yabee 5s linear;\n            white-space: nowrap;\n        }\n        .paused>.yabee{\n            -webkit-animation-play-state:paused;\n            -moz-animation-play-state:paused;\n            -o-animation-play-state:paused; \n            animation-play-state:paused;\n        }\n        " + new Array(16).fill(0).map(function (_, i) {
        return ".yabee.placement-" + i + "{\n                    top:" + 100 / 16 * i + "%;\n                }";
    }).join("\n") + "\n        @keyframes yabee {\n            0%{\n                left: " + window.getComputedStyle(container).width + ";\n            }\n            100%{\n                left: -200px\n            }\n        }\n    ";
    container.classList.add("paused");
    var style = document.createElement('style');
    style.innerHTML = styles;
    document.head.appendChild(style);
    var batchAppender = makeBatchAppender(container);
    return {
        getVideoObservables: function () {
            return {
                pause: observable_1.makeObservable(video, 'pause'),
                playing: observable_1.makeObservable(video, 'playing'),
                seeked: observable_1.makeObservable(video, 'seeked'),
                ended: observable_1.makeObservable(video, 'ended'),
            };
        },
        play: function () {
            container.classList.remove("paused");
        },
        pause: function () {
            container.classList.add("paused");
        },
        renderBullet: function (bullet, placementResult) {
            var spanEl = document.createElement('span');
            spanEl.innerText = bullet.text;
            spanEl.className = "yabee " + getBulletClassName(bullet) + " placement-" + placementResult;
            batchAppender.append(spanEl);
            return {
                remove: function () { return spanEl.remove(); },
                subscribe: function (ob) {
                    spanEl.addEventListener('animationend', function () {
                        ob.complete && ob.complete();
                    });
                },
            };
        }
    };
}
exports.default = html5renderer;
//# sourceMappingURL=html5.js.map