import { Yabee } from '../interfaces';
import { VideoObservables } from '../state';
declare const defaultRowStyle: (row: number) => string;
interface HTML5RendererOptions {
    containerEl: HTMLElement;
    videoEl: HTMLVideoElement;
    getBulletClassName?: (b: Yabee.Bullet) => string;
    rowStyle?: typeof defaultRowStyle;
    maxRows?: number;
    duration?: number;
    fontSize?: number;
}
export default function html5renderer(options: HTML5RendererOptions): {
    getVideoObservables(): VideoObservables;
    play: () => void;
    pause: () => void;
    renderBullet(bullet: Yabee.Bullet, placementResult: number): {
        remove: () => void;
        startTime: number;
        duration: number;
        subscribe: (ob: Yabee.Observer<void>) => void;
    };
};
export {};
