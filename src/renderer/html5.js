"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var observable_1 = require("../observable");
var batch_appender_1 = require("./utils/batch-appender");
var defaultRowStyle = function (row) { return "top:" + 100 / 16 * row + "%"; };
function html5renderer(options) {
    var containerEl = options.containerEl, videoEl = options.videoEl, _a = options.getBulletClassName, getBulletClassName = _a === void 0 ? function () { return ""; } : _a, _b = options.rowStyle, rowStyle = _b === void 0 ? defaultRowStyle : _b, _c = options.maxRows, maxRows = _c === void 0 ? 16 : _c, _d = options.duration, duration = _d === void 0 ? 5 : _d;
    var containerWidth = 0;
    var renderStyle = function () {
        containerWidth = containerEl.getBoundingClientRect().width;
        var style = document.getElementById("yabee-style");
        var fillStyle = function () {
            if (style)
                style.innerHTML = "\n                    .yabee {\n                        position:absolute;\n                        color:#fff;\n                        animation: yabee " + duration + "s linear;\n                        white-space: nowrap;\n                        text-align: right;\n                        left:0;\n                        overflow: visible;\n                    }\n                    .yabee-text{\n                        animation: yabee-text " + duration + "s linear;\n                        position: absolute;\n                        top:0;\n                        left:0;\n                    }\n                    .paused .yabee, \n                    .paused .yabee-text{\n                        -webkit-animation-play-state:paused;\n                        -moz-animation-play-state:paused;\n                        -o-animation-play-state:paused; \n                        animation-play-state:paused;\n                    }\n                    " + new Array(maxRows).fill(0).map(function (_, i) { return rowStyle(i); }).map(function (style, i) {
                    return ".yabee.placement-" + i + " {" + style + "}";
                }).join("\n") + "\n                    @keyframes yabee {\n                        0%{\n                            transform: translateX(" + containerWidth + "px);\n                        }\n                        100%{\n                            transform: translateX(0px);\n                        }\n                    }\n                    @keyframes yabee-text {\n                        0%{\n                            transform: translateX(0);\n                        }\n                        100%{\n                            transform: translateX(-100%);\n                        }\n                    }\n                ";
        };
        if (!style) {
            style = document.createElement('style');
            style.id = "yabee-style";
            fillStyle();
            document.head.appendChild(style);
        }
        else
            fillStyle();
    };
    renderStyle();
    window.addEventListener("resize", renderStyle);
    containerEl.classList.add("paused");
    var batchAppender = batch_appender_1.makeBatchAppender(containerEl);
    return {
        getVideoObservables: function () {
            return {
                pause: observable_1.makeObservable(videoEl, 'pause'),
                playing: observable_1.makeObservable(videoEl, 'playing'),
                seeked: observable_1.makeObservable(videoEl, 'seeked'),
                ended: observable_1.makeObservable(videoEl, 'ended'),
            };
        },
        play: function () {
            containerEl.classList.remove("paused");
        },
        pause: function () {
            containerEl.classList.add("paused");
        },
        renderBullet: function (bullet, placementResult) {
            var outerSpan = document.createElement('span');
            var innerSpan = document.createElement('span');
            var innerSpan2 = document.createElement('span');
            innerSpan.innerText = bullet.text;
            innerSpan.classList.add("yabee-text");
            innerSpan2.innerText = bullet.text;
            innerSpan2.style.opacity = "0";
            outerSpan.appendChild(innerSpan2);
            outerSpan.appendChild(innerSpan);
            outerSpan.className = "yabee " + getBulletClassName(bullet) + " placement-" + placementResult;
            batchAppender.append(outerSpan);
            return {
                remove: function () { return outerSpan.remove(); },
                startTime: Date.now(),
                duration: duration,
                subscribe: function (ob) {
                    outerSpan.addEventListener('animationend', function () {
                        ob.complete && ob.complete();
                    });
                },
            };
        }
    };
}
exports.default = html5renderer;
//# sourceMappingURL=html5.js.map