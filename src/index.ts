import { Yabee } from './interfaces';
import { play } from './play';
import { makeBlayerState } from './state';
import rtl from './placement/default';

export * from "./interfaces"

export function renderPlayer(
    bulletSource:Yabee.BulletSource,
    renderer:Yabee.Renderer,
    placement:Yabee.Placement = rtl
){
    const {state,methods} = makeBlayerState({bulletSource, renderer, placement})
    play(state)
    return {
        state,
        ...methods
    }
}