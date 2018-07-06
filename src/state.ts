import { Yabee } from './interfaces';

export type VideoObservables = {
    'ended':Yabee.Observable<any>,
    'pause':Yabee.Observable<any>,
    'playing':Yabee.Observable<any>,
    'seeked':Yabee.Observable<any>
}

type BlayerStateArgs = {
    bulletSource:Yabee.BulletSource,
    renderer:Yabee.Renderer,
    placement:Yabee.Placement
}

export function makeBlayerState(args:BlayerStateArgs){
    const {renderer,bulletSource,placement} = args
    const observables = renderer.getVideoObservables()
    const bulletStream = bulletSource(observables)
    const currentBulletInstances:Set<Yabee.BulletInstance> = new Set()
    const state = {
        get bulletStream(){
            return bulletStream
        },
        get observables(){
            return observables
        },
        get renderer(){
            return renderer
        },
        get currentBullets(){
            return currentBulletInstances
        },
        get placement(){
            return placement
        }
    }
    return {
        state,
        methods:{
            destroy(){
                //unused
            }
        }
    }
}