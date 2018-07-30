"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function makeBatchAppender(container) {
    var queue = new Set();
    function scheduleAppend() {
        if (!queue.size)
            return;
        var frag = document.createDocumentFragment();
        queue.forEach(function (child) {
            frag.appendChild(child);
        });
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
exports.makeBatchAppender = makeBatchAppender;
//# sourceMappingURL=batch-appender.js.map