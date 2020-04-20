import { Dispatch } from 'redux'
import { InferActionType, StateType } from './ReduxStore'
import { analyticsAPI } from '../api'

export type AnalysticsType = {
    id: number
    timestamp: number
    duration: number
    zone: {
        left: number
        top: number
        width: number
        height: number
    }
}

export type InitialStateType = {
    isPlay: boolean
    videoURL: string
    analysticsDate: Array<AnalysticsType>
    currentTime: number
    currentTimeTo: number
    greenElementStyle: GreenElementType
    currentIndex: number
}

export type GreenElementType = {
    left: number
    top: number
    width: number
    height: number
}

const initialState: InitialStateType = {
    isPlay: false,
    videoURL: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    analysticsDate: [],
    currentTime: 0,
    currentTimeTo: 0,
    greenElementStyle: {
        left: 0,
        top: -100,
        width: 0,
        height: 0
    },
    currentIndex: -1
}

const Reduser = (state = initialState, action: ActionType) => {

    switch (action.type){

        // Видео play / stop
        case 'IS_VIDEO_PLAY': {
            return { ...state, isPlay: action.isPlayNew }
        }

        // Данные аналитики
        case 'SET_ANALYSTICS_DATA': {
            return { ...state, analysticsDate: action.NewAnalysticsData }
        }

        // Текущее время проигрывателя
        case 'SET_CURRENT_TIME': {
            return { ...state, currentTime: action.NewCurrentTime }
        }

        // Текущие данные зеленого элемента
        case 'SET_GREEN_ELEMENT_STYLE': {
            return { ...state, greenElementStyle: action.NewElement }
        }
        
        // Время для перемотки видео и индекс элемента списка на который нажали
        case 'SET_CURRENT_TIME_TO': {
            return { ...state, currentTimeTo: action.payload.NewCurrentTimeTo, currentIndex: action.payload.newCurrentIndex }
        }

        default: 
            return state
    }
}

// Экшены
type ActionType = InferActionType<typeof actions>
const actions = {
    setIsPlay: (play: boolean) => ({ type: 'IS_VIDEO_PLAY', isPlayNew: play} as const),
    setAnalysticsDate: (data: Array<any>) => ({ type: 'SET_ANALYSTICS_DATA', NewAnalysticsData: data } as const),
    setCurrentTime: (time: number) => ({ type: 'SET_CURRENT_TIME', NewCurrentTime: time } as const),
    setCurrentTimeTo: (timeTo: number, index: number) => ({ type: 'SET_CURRENT_TIME_TO', payload: {NewCurrentTimeTo: timeTo, newCurrentIndex: index} } as const),
    setGreenElementStyle: (element: GreenElementType) => ({ type: 'SET_GREEN_ELEMENT_STYLE', NewElement: element } as const)
}

// Thunk creators
// Видео play / stop
export const videoPlayStop = (play: boolean) => {
    return (dispatch: Dispatch<ActionType>) => {
            dispatch(actions.setIsPlay(play))
    }
}

// Запрос данных аналитики с помощью analyticsAPI
export const getAnalysticsData = () =>  async (dispatch: Dispatch<ActionType>) => {
    try{
        let response = await analyticsAPI.getAnalysticsDate()
        dispatch(actions.setAnalysticsDate(response.data))
        } catch(error){
           console.log(error) 
        }
}

// Сравнение текущего времени проигрывателя с временем из данных аналитики
export const getCurrentTime = (time: number) => {
    return (dispatch: Dispatch<ActionType>, getState: () => StateType) => {
            let dateArray = getState().Reduser.analysticsDate
            for (let i=0; i<dateArray.length; i++){
                if( time >= dateArray[i].timestamp && 
                    time <= dateArray[i].timestamp + dateArray[i].duration )
                        {
                            dispatch(actions.setGreenElementStyle(dateArray[i].zone))                   
                        } 
            }
            dispatch(actions.setCurrentTime(time))
    }
}

// Установить при клике время проигрывытеля и индекс элемента списка 
export const getCurrentTimeTo = (timeTo: number, indexLine: number) => {
    return (dispatch: Dispatch<ActionType>) => {
        dispatch(actions.setCurrentTimeTo(timeTo, indexLine))
    }
}

export default Reduser
