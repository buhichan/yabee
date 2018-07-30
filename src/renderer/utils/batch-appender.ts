
export function makeBatchAppender(container:HTMLElement){
    const queue = new Set() as Set<HTMLElement>
    function scheduleAppend(){
        if(!queue.size)
            return
        const frag = document.createDocumentFragment()
        queue.forEach(child=>{
            frag.appendChild(child)
        })
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