import React from 'react'
import Video from './Video'
import { StateType } from '../../Redux/ReduxStore'
import { videoPlayStop, getCurrentTime, GreenElementType } from '../../Redux/Reduser'
import { connect, ConnectedProps } from 'react-redux'
import { getIsPlay, getVideoURL, getVideoTime, getGreenElementStyle, getVideoTimeTo } from '../../Redux/selectors'

type MapStateToPropsType = {
    isPlay: boolean
    videoURL: string
    currentTime: number
    currentTimeTo: number
    greenElementStyle: GreenElementType
}

type MapDispatchToPropsType = {
    videoPlayStop: (play: boolean) => void
    getCurrentTime: (time: number, currentIndex: number) => void
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType & PropsFromRedux

const VideoContainer: React.FC<PropsType> = (props) => {

    return  <Video 
                isPlay={ props.isPlay } 
                videoURL={ props.videoURL }  
                currentTime={ props.currentTime }
                currentTimeTo={ props.currentTimeTo }
                greenElementStyle={ props.greenElementStyle }
                videoPlayStop={ props.videoPlayStop } 
                getCurrentTime = { props.getCurrentTime }
            />

}

const mapStateToProps = (state: StateType): MapStateToPropsType => {
    return {
        isPlay: getIsPlay(state),
        videoURL: getVideoURL(state),
        currentTime: getVideoTime(state),
        greenElementStyle: getGreenElementStyle(state),
        currentTimeTo: getVideoTimeTo(state),
    }
}

const connector = connect(mapStateToProps, { videoPlayStop, getCurrentTime })
type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(VideoContainer)