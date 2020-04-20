import React, { useRef, useEffect } from 'react'
import GreenElement from '../GreenElement/GreenElement'
import style from './Video.module.css'
import { GreenElementType } from '../../Redux/Reduser'

type PropsType = {
    isPlay: boolean
    videoURL: string
    currentTime: number
    currentTimeTo: number
    greenElementStyle: GreenElementType
    getCurrentTime: (time: number) => void
    videoPlayStop: (play: boolean) => void
}
const Video: React.FC<PropsType> = (props) => {
    
    const videoPlayer = useRef<any>(null)

    useEffect(() => {
        videoPlayer.current.currentTime = props.currentTimeTo / 1000
    }, [props.currentTimeTo])

    const seekTimeUpdate = () => {
       let time = videoPlayer.current.currentTime * 1000
       props.getCurrentTime(time)
    }

    const onPlayVideo = () => {
        if(props.isPlay === false){
            videoPlayer.current.play()
            videoPlayer.current.addEventListener("timeupdate",seekTimeUpdate,false)
            props.videoPlayStop(true)
        } else {
            videoPlayer.current.pause()
            videoPlayer.current.removeEventListener("timeupdate",seekTimeUpdate,false)
            props.videoPlayStop(false)
        }
    }


    return  <div className={style.video_pos}>
                <GreenElement greenElementStyle={props.greenElementStyle} />
                <video ref={video => videoPlayer.current = video} width='1300px' height='auto' 
                onClick={() => {onPlayVideo()}} >
                    <source src={ props.videoURL } type="video/mp4" />
                </video>
                <p> { Math.floor(props.currentTime / 1000)} </p>
            </div>

}

export default Video 