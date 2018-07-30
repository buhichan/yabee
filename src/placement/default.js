"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (function (bullet, bullets) {
    var maxLines = 16;
    var buckets = new Array(maxLines).fill(0);
    bullets.forEach(function (x) {
        if (x.def.type !== bullet.type)
            return;
        if (Date.now() > x.inst.startTime + x.inst.duration * 1000 / 2)
            return;
        buckets[x.placement] += x.def.text.length;
    });
    return buckets.indexOf(Math.min.apply(Math, buckets));
});
//# sourceMappingURL=default.js.map