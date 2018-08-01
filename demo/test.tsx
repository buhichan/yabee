import * as React from "react"
import * as ReactDOM from "react-dom"
import { renderPlayer } from '../src';
import { makeBulletSourceFromArray } from '../src/bullet-source/array';
import { Yabee } from '../src/interfaces';
import defaultRenderer from '../src/renderer/html5';

// function safeJsonParse(str:string){
//     try{
//         return JSON.parse(str)
//     }catch{}
// }

class App extends React.PureComponent<any>{
    bumaku:Yabee.BumakuInstance
    bullets:Yabee.Bullet[]
    bulletSource:Yabee.BulletSource
    video:HTMLVideoElement
    componentDidMount(){
        const container = document.getElementById('container')
        this.video = document.getElementById('video') as HTMLVideoElement
        // this.bullets = safeJsonParse(localStorage.bullets) || []
        const bulletNumber = 50
        this.bullets = new Array(bulletNumber).fill(0).map((_, i) => {
            return {
              timeOffset: i * 5 / bulletNumber, // in seconds
              type: "default",
              text: '6'.repeat(Math.random()*1000 % 20 + 1)
            };
          }),
        this.bulletSource = makeBulletSourceFromArray(this.bullets,()=>this.video.currentTime)
        if(container && this.video && this.bullets)
            this.bumaku = renderPlayer(this.bulletSource,defaultRenderer({
                containerEl:container,
                videoEl:this.video,
                getBulletClassName:b=>`${b.type}` ,
                maxRows:10
            }))
    }
    addBullet=()=>{
        const input:HTMLInputElement = document.getElementById('input') as any
        if(input && this.bumaku){
            this.bumaku.state.bulletStream.next({
                text:input.value,
                type:"default",
                timeOffset:this.video.currentTime,
            })
            localStorage.setItem('bullets',JSON.stringify(this.bullets))
        }
    }
    render(){
        return <div style={{transform:"translate(200px, 200px)"}}>
            <style>
                {`.yabee { color: #f00 }`}
            </style>
            <div id="container" style={{position:"relative"}}>
                <video id="video" controls muted>
                    <source src="/sample mp4.mp4" />
                </video>
            </div>
            <input id="input" type="text" onKeyDown={e=>{
                if(e.key === 'Enter')
                    this.addBullet()
            }} />
            <button onClick={this.addBullet}>add</button>
            <button onClick={()=>localStorage.setItem('bullets',"[]")}>clear</button>
            <button onClick={()=>this.video.play()}>play</button>
        </div>
    }
}

ReactDOM.render(<App />,document.getElementById('root'))