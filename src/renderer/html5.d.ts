import { Yabee } from '../interfaces';
import { VideoObservables } from '../state';
interface HTML5RendererOptions {
    containerEl: HTMLElement;
    videoEl: HTMLVideoElement;
    getBulletClassName?: (b: Yabee.Bullet) => string;
    rowStyle?: (rowIndex: number) => string;
    maxRows?: number;
    duration?: number;
    placementStrategy?: Yabee.PlacementStrategy;
    fontSize?: number;
}
export default function html5renderer(options: HTML5RendererOptions): {
    getVideoObservables(): VideoObservables;
    play: () => void;
    pause: () => void;
    renderBullet(bullet: Yabee.Bullet, currentInstances: Set<Yabee.BulletInstance>): {
        remove: () => void;
        startTime: number;
        placement: number;
        duration: number;
        subscribe: (ob: Yabee.Observer<void>) => void;
    };
};
export {};
