"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
var src_1 = require("../src");
var array_1 = require("../src/bullet-source/array");
var html5_1 = require("../src/renderer/html5");
var App = (function (_super) {
    __extends(App, _super);
    function App() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.addBullet = function () {
            var input = document.getElementById('input');
            if (input && _this.bumaku) {
                _this.bumaku.state.bulletStream.next({
                    text: input.value,
                    type: "default",
                    timeOffset: _this.video.currentTime,
                });
                localStorage.bullets = JSON.stringify(_this.bullets);
            }
        };
        return _this;
    }
    App.prototype.componentDidMount = function () {
        var _this = this;
        var container = document.getElementById('container');
        this.video = document.getElementById('video');
        var bulletNumber = 5;
        this.bullets = new Array(bulletNumber).fill(0).map(function (_, i) {
            return {
                timeOffset: i * 5 / bulletNumber,
                type: "default",
                text: '6'.repeat(Math.random() * 1000 % 20 + 1)
            };
        }),
            this.bulletSource = array_1.makeBulletSourceFromArray(this.bullets, function () { return _this.video.currentTime; });
        if (container && this.video && this.bullets)
            this.bumaku = src_1.renderPlayer(this.bulletSource, html5_1.default({
                containerEl: container,
                videoEl: this.video,
                getBulletClassName: function (b) { return "" + b.type; }
            }));
    };
    App.prototype.render = function () {
        var _this = this;
        return React.createElement("div", { style: { transform: "translate(200px, 200px)" } },
            React.createElement("style", null, ".yabee { color: #f00 }"),
            React.createElement("div", { id: "container", style: { position: "relative" } },
                React.createElement("video", { id: "video", controls: true, muted: true },
                    React.createElement("source", { src: "/sample mp4.mp4" }))),
            React.createElement("input", { id: "input", type: "text", onKeyDown: function (e) {
                    if (e.key === 'Enter')
                        _this.addBullet();
                } }),
            React.createElement("button", { onClick: this.addBullet }, "add"),
            React.createElement("button", { onClick: function () { return localStorage.bullets = []; } }, "clear"),
            React.createElement("button", { onClick: function () { return _this.video.play(); } }, "play"));
    };
    return App;
}(React.PureComponent));
ReactDOM.render(React.createElement(App, null), document.getElementById('root'));
//# sourceMappingURL=test.js.map