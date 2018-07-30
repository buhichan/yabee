import { Yabee } from './interfaces';

export function play(state:Yabee.State){
    const {observables,bulletStream,renderer} = state
    const {currentBullets} = state
    bulletStream.subscribe({
        next(bullets){
            if(!bullets.length)
                return 
            const bulletInstance = bullets.map((bullet)=>{
                const bulletInstance = {
                    def:bullet,
                    inst:renderer.renderBullet(bullet,currentBullets)
                }
                currentBullets.add(bulletInstance)
                return bulletInstance
            })
            bulletInstance[bulletInstance.length-1].inst.subscribe({
                next(){},
                complete:()=>{
                    bulletInstance.forEach(bulletInstance=>{
                        bulletInstance.inst.remove()
                        currentBullets.delete(bulletInstance)
                    })
                }
            })
        }
    })
    const clearAll = {
        next(){
            currentBullets.forEach(x=>x.inst.remove()) //todo: how to smoothly move bullets backwards?
            currentBullets.clear()
        }
    }
    const playAll = {
        next(){
            renderer.play()
        }
    }
    const pauseAll = {
        next(){
            renderer.pause()
        }
    }
    observables.playing.subscribe(playAll)
    observables.pause.subscribe(pauseAll)
    observables.seeked.subscribe(clearAll)
    observables.ended.subscribe(clearAll)
}