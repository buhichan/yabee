"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function makeObservable(item, eventName) {
    var observable = {
        subscribe: function (ob) {
            ob.next && item.addEventListener(eventName, ob.next);
            return {
                unsubscribe: function () {
                    item.removeEventListener(eventName, ob.next);
                },
                closed: false
            };
        }
    };
    return observable;
}
exports.makeObservable = makeObservable;
//# sourceMappingURL=observable.js.map