import { Yabee } from "../interfaces";

export default (bullet:Yabee.Bullet,bullets:Set<Yabee.BulletInstance>,maxRows:number)=>{
    let buckets = new Array(maxRows).fill(0)
    const isFlowingBullet = bullet.type === 'default'
    bullets.forEach(x=>{
        if(x.def.type !== bullet.type)
            return
        /**
         * if the bullet type is "default", and has been near the center, then it is counted as 'not holding the placement'
         */
        if(isFlowingBullet && Date.now() > x.inst.startTime + x.inst.duration * 1000 / 2)
            return 
        buckets[x.inst.placement] += x.def.text.length
    })
    return buckets.indexOf(Math.min(...buckets))
}