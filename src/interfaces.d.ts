import { makeBlayerState, VideoObservables } from "./state";
import defaultRenderer from "./renderer/html5";
import defaultPlacement from "./placement/default";
import { renderPlayer } from ".";

export type FirstArgumentOf<Fn> = Fn extends (arg1:infer U, ...args:any[])=>any ? U : never

export namespace Yabee {
    export interface Bullet{
        text:string
        type:'default' | string,
        timeOffset:number,
        userData?:any
    }
    export type State = ReturnType<typeof makeBlayerState>['state']
    export type Renderer = ReturnType<typeof defaultRenderer>
    export type PlacementStrategy = typeof defaultPlacement 
    export interface Observable<T> {
        subscribe(ob:Yabee.Observer<T>):{
            unsubscribe:()=>void,
            closed:boolean
        }
    }
    export interface Observer<T> {
        next:(t:T)=>void,
        error?:(e:Error)=>void,
        complete?:()=>void
    }
    export type BulletInstance = {
        def:Bullet,
        inst:ReturnType<Yabee.Renderer['renderBullet']>
    }
    export type BulletStream = Yabee.Observable<Yabee.Bullet[]>&Yabee.Observer<Yabee.Bullet>
    export type BulletSource = (events:VideoObservables)=>BulletStream
    export type BumakuInstance = ReturnType<typeof renderPlayer>
}