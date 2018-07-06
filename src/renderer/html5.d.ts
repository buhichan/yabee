import { Yabee } from '../interfaces';
import { VideoObservables } from '../state';
export default function html5renderer(container: HTMLElement, video: HTMLVideoElement, getBulletClassName: (b: Yabee.Bullet) => string): {
    getVideoObservables(): VideoObservables;
    play: () => void;
    pause: () => void;
    renderBullet(bullet: Yabee.Bullet, placementResult: number): {
        remove: () => void;
        subscribe: (ob: Yabee.Observer<void>) => void;
    };
};
