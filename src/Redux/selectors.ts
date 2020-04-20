import { StateType } from '../Redux/ReduxStore'

export const getIsPlay = (state: StateType) => {
    return state.Reduser.isPlay
}

export const getVideoURL = (state: StateType) => {
    return state.Reduser.videoURL
}

export const getDataAnalystics = (state: StateType) => {
    return state.Reduser.analysticsDate
}

export const getVideoTime = (state: StateType) => {
    return state.Reduser.currentTime
} 

export const getGreenElementStyle = (state: StateType) => {
    return state.Reduser.greenElementStyle
}

export const getVideoTimeTo = (state: StateType) => {
    return state.Reduser.currentTimeTo
}

export const getIndex = (state: StateType) => {
    return state.Reduser.currentIndex
}