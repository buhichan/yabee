import { Yabee } from './interfaces';
import { play } from './play';
import { makeBlayerState } from './state';

export * from "./interfaces"

export function renderPlayer(
    bulletSource:Yabee.BulletSource,
    renderer:Yabee.Renderer,
){
    const {state,methods} = makeBlayerState({bulletSource, renderer})
    play(state)
    return {
        state,
        ...methods
    }
}