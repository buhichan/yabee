import { Yabee } from '../interfaces';
import { makeObservable } from '../observable';
import { VideoObservables } from '../state';
import { makeBatchAppender } from './utils/batch-appender';

const defaultRowStyle = (row:number)=>`top:${100/16*row}%`

interface HTML5RendererOptions {
    containerEl:HTMLElement,
    videoEl:HTMLVideoElement,
    getBulletClassName?:(b:Yabee.Bullet)=>string,
    rowStyle?:typeof defaultRowStyle,
    maxRows?:number,
    duration?:number,
    fontSize?:number
}

export default function html5renderer ( options:HTML5RendererOptions ){
    const {
        containerEl,
        videoEl,
        getBulletClassName = ()=>"",
        rowStyle = defaultRowStyle,
        maxRows = 16,
        duration = 5,
    } = options
    let containerWidth = 0
    const renderStyle = ()=>{
        containerWidth = containerEl.getBoundingClientRect().width
        let style = document.getElementById("yabee-style")
        const fillStyle = ()=>{
            if(style)
                style.innerHTML = `
                    .yabee {
                        position:absolute;
                        color:#fff;
                        animation: yabee ${duration}s linear;
                        white-space: nowrap;
                        text-align: right;
                        left:0;
                        overflow: visible;
                    }
                    .yabee-text{
                        animation: yabee-text ${duration}s linear;
                        position: absolute;
                        top:0;
                        left:0;
                    }
                    .paused .yabee, 
                    .paused .yabee-text{
                        -webkit-animation-play-state:paused;
                        -moz-animation-play-state:paused;
                        -o-animation-play-state:paused; 
                        animation-play-state:paused;
                    }
                    ${new Array(maxRows).fill(0).map((_,i)=>rowStyle(i)).map((style,i)=>{
                        return  `.yabee.placement-${i} {${style}}`
                    }).join("\n")}
                    @keyframes yabee {
                        0%{
                            transform: translateX(${containerWidth}px);
                        }
                        100%{
                            transform: translateX(0px);
                        }
                    }
                    @keyframes yabee-text {
                        0%{
                            transform: translateX(0);
                        }
                        100%{
                            transform: translateX(-100%);
                        }
                    }
                `
        }
        if(!style){
            style = document.createElement('style')
            style.id = `yabee-style`
            fillStyle()
            document.head.appendChild(style)
        }else
            fillStyle()
    }
    renderStyle()
    window.addEventListener("resize", renderStyle)
    containerEl.classList.add("paused") // initially paused.
    const batchAppender = makeBatchAppender(containerEl)
    return {
        getVideoObservables():VideoObservables{
            return {
                pause:makeObservable<keyof HTMLVideoElementEventMap>(videoEl,'pause'),
                playing:makeObservable<keyof HTMLVideoElementEventMap>(videoEl, 'playing'),
                seeked:makeObservable<keyof HTMLVideoElementEventMap>(videoEl, 'seeked'),
                ended:makeObservable<keyof HTMLVideoElementEventMap>(videoEl, 'ended'),
            }
        },
        play:()=>{
            containerEl.classList.remove("paused")
        },
        pause:()=>{
            containerEl.classList.add("paused")
        },
        renderBullet(bullet:Yabee.Bullet,placementResult:Yabee.PlacementResult){
            const outerSpan = document.createElement('span')
            const innerSpan = document.createElement('span')
            const innerSpan2 = document.createElement('span')
            innerSpan.innerText = bullet.text
            innerSpan.classList.add("yabee-text")
            innerSpan2.innerText = bullet.text
            innerSpan2.style.opacity = "0"
            outerSpan.appendChild(innerSpan2)
            outerSpan.appendChild(innerSpan)
            outerSpan.className=`yabee ${getBulletClassName(bullet)} placement-${placementResult}`
            batchAppender.append(outerSpan)
            return {
                remove:()=>outerSpan.remove(),
                startTime:Date.now(),
                duration,
                subscribe:(ob:Yabee.Observer<void>)=>{
                    outerSpan.addEventListener('animationend', ()=>{
                        ob.complete && ob.complete()
                    })
                },
            }
        }
    }
}
