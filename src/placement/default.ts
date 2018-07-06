import { Yabee } from "../interfaces";

export default (bullet:Yabee.Bullet,bullets:Set<Yabee.BulletInstance>)=>{
    let maxLines = 16 // 16 lines
    let buckets = new Array(maxLines).fill(0)
    bullets.forEach(x=>{
        if(x.def.type !== bullet.type)
            return
        buckets[x.placement] += x.def.text.length
    })
    return buckets.indexOf(Math.min(...buckets))
}