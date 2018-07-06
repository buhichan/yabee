import {Yabee} from "./interfaces"

export function makeObservable<events extends string>(item:EventTarget,eventName:events){
    const observable:Yabee.Observable<Event> = {
        subscribe(ob){
            ob.next && item.addEventListener(eventName, ob.next)
            return ()=>{
                item.removeEventListener(eventName,ob.next)
            }
        }
    }
    return observable
}