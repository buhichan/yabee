import { Yabee } from './interfaces';
export declare type VideoObservables = {
    'ended': Yabee.Observable<any>;
    'pause': Yabee.Observable<any>;
    'playing': Yabee.Observable<any>;
    'seeked': Yabee.Observable<any>;
};
declare type BlayerStateArgs = {
    bulletSource: Yabee.BulletSource;
    renderer: Yabee.Renderer;
};
export declare function makeBlayerState(args: BlayerStateArgs): {
    state: {
        readonly bulletStream: Yabee.BulletStream;
        readonly observables: VideoObservables;
        readonly renderer: {
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
        readonly currentBullets: Set<Yabee.BulletInstance>;
    };
    methods: {
        destroy(): void;
    };
};
export {};
