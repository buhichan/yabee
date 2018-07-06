import { Yabee } from '../interfaces';
import { makeObservable } from '../observable';
import { VideoObservables } from '../state';

function makeBatchAppender(container:HTMLElement){
    const queue = new Set() as Set<HTMLElement>
    function scheduleAppend(){
        if(!queue.size)
            return
        const frag = document.createDocumentFragment()
        queue.forEach(child=>frag.appendChild(child))
        container.appendChild(frag)
        queue.clear()
    }
    return {
        append(element:HTMLElement){
            queue.add(element)
            requestAnimationFrame(scheduleAppend)
        }
    }
}

export default function html5renderer (container:HTMLElement,video:HTMLVideoElement,getBulletClassName:(b:Yabee.Bullet)=>string){
    const styles = `
        .yabee {
            position:absolute;
            color:#fff;
            animation: yabee 5s linear;
            white-space: nowrap;
        }
        .paused>.yabee{
            -webkit-animation-play-state:paused;
            -moz-animation-play-state:paused;
            -o-animation-play-state:paused; 
            animation-play-state:paused;
        }
        ${
            new Array(16).fill(0).map((_,i)=>{
                return `.yabee.placement-${i}{
                    top:${100/16*i}%;
                }`
            }).join("\n")
        }
        @keyframes yabee {
            0%{
                left: ${window.getComputedStyle(container).width};
            }
            100%{
                left: -200px
            }
        }
    `
    container.classList.add("paused") // initially paused.
    const style = document.createElement('style')
    style.innerHTML = styles
    document.head.appendChild(style)
    const batchAppender = makeBatchAppender(container)
    return {
        getVideoObservables():VideoObservables{
            return {
                pause:makeObservable<keyof HTMLVideoElementEventMap>(video,'pause'),
                playing:makeObservable<keyof HTMLVideoElementEventMap>(video, 'playing'),
                seeked:makeObservable<keyof HTMLVideoElementEventMap>(video, 'seeked'),
                ended:makeObservable<keyof HTMLVideoElementEventMap>(video, 'ended'),
            }
        },
        play:()=>{
            container.classList.remove("paused")
        },
        pause:()=>{
            container.classList.add("paused")
        },
        renderBullet(bullet:Yabee.Bullet,placementResult:Yabee.PlacementResult){
            const spanEl = document.createElement('span')
            spanEl.innerText = bullet.text
            spanEl.className=`yabee ${getBulletClassName(bullet)} placement-${placementResult}`
            batchAppender.append(spanEl)
            return {
                remove:()=>spanEl.remove(),
                subscribe:(ob:Yabee.Observer<void>)=>{
                    spanEl.addEventListener('animationend', ()=>{
                        ob.complete && ob.complete()
                    })
                },
            }
        }
    }
}
