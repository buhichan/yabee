import { Yabee } from "./interfaces";
export declare function makeObservable<events extends string>(item: EventTarget, eventName: events): Yabee.Observable<Event>;
