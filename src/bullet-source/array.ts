import { Yabee } from '../interfaces';

export function makeBulletSourceFromArray(arr:Yabee.Bullet[],getCurrentTimeOffset:()=>number){
    const listeners:Set<(b:Yabee.Bullet[])=>void>= new Set()
    arr.sort((a,b)=>a.timeOffset-b.timeOffset)
    const bulletSource:Yabee.BulletSource = (observables)=>{
        return {
            next(b:Yabee.Bullet){
                listeners.forEach(x=>x([b]))
                const i = arr.findIndex(x=>x.timeOffset >= b.timeOffset)
                if(i===-1)
                    arr.push(b)
                else
                    arr.splice(i,0,b)
                return arr
            },
            subscribe(fn){
                let cursor = 0
                let playing:number|null = null
                let bullets = arr.slice() //bullets should be immutable in a subscription
                listeners.add(fn.next)
                const send = ()=>{
                    if(cursor<bullets.length){
                        const currentTime = getCurrentTimeOffset()
                        let start = cursor
                        while(cursor<bullets.length && bullets[cursor].timeOffset<=currentTime){
                            cursor ++
                        }
                        const toPush = bullets.slice(start,cursor)
                        toPush.length && fn.next(toPush)
                        if(cursor<bullets.length){
                            const sleepTime = Math.max(24,(bullets[cursor].timeOffset - currentTime) * 1000) // always sleep more than 16ms which is 1 frame
                            playing = setTimeout(send,sleepTime) as any
                        }
                    }
                }
                const subscriptions = [
                    observables.pause.subscribe({
                        next(){
                            playing && clearTimeout(playing)
                        }
                    }),
                    observables.playing.subscribe({
                        next(){
                            send()
                        }
                    }),
                    observables.seeked.subscribe({
                        next(){
                            cursor = bullets.findIndex(x=>x.timeOffset >= getCurrentTimeOffset())
                            if(cursor===-1)
                                cursor = Infinity
                        }
                    })
                ]
                return {
                    unsubscribe:()=>{
                        fn.next && listeners.delete(fn.next)
                        playing && clearTimeout(playing)
                        subscriptions.forEach(x=>x.unsubscribe())
                    },
                    get closed(){
                        return cursor >= arr.length
                    }
                }
            }
        }
    }
    return bulletSource
}