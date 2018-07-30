import { Yabee } from '../interfaces';
import { VideoObservables } from '../state';
declare const defaultPlacement: (maxRow: number) => string;
interface HTML5RendererOptions {
    containerEl: HTMLElement;
    videoEl: HTMLVideoElement;
    getBulletClassName?: (b: Yabee.Bullet) => string;
    placement?: typeof defaultPlacement;
    maxRows?: number;
}
export default function html5TransitionRenderer(options: HTML5RendererOptions): {
    getVideoObservables(): VideoObservables;
    play: () => void;
    pause: () => void;
    renderBullet(bullet: Yabee.Bullet, placementResult: number): {
        remove: () => void;
        subscribe: (ob: Yabee.Observer<void>) => void;
    };
};
export {};
