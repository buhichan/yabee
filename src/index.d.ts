import { Yabee } from './interfaces';
export * from "./interfaces";
export declare function renderPlayer(bulletSource: Yabee.BulletSource, renderer: Yabee.Renderer): {
    destroy(): void;
    state: {
        readonly bulletStream: Yabee.BulletStream;
        readonly observables: import("../../../../../../Users/buhi/Documents/js_projects/yabee/src/state").VideoObservables;
        readonly renderer: {
            getVideoObservables(): import("../../../../../../Users/buhi/Documents/js_projects/yabee/src/state").VideoObservables;
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
        readonly currentBullets: Set<Yabee.BulletInstance>;
    };
};
