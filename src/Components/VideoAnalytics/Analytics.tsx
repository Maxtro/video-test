import React from 'react'
import { AnalysticsType } from '../../Redux/Reduser'
import style from './Analystics.module.css'

type PropsType = {
    analysticsDate: Array<AnalysticsType>
    currentIndex: number
    getCurrentTimeTo: (timeTo: number, index: number) => void
}

const Analytics: React.FC<PropsType> = (props) => {

    let dateAnalystics = []

    for (let i=0; i < props.analysticsDate.length; i++){
        let data = new Date(props.analysticsDate[i].timestamp)
        let min = data.getMinutes()
        let sec = data.getSeconds()
        let millisec = data.getMilliseconds()
        let convTime = `${min}:${sec}:${millisec}`
        let dateAnalysticsObject = {
            time: convTime,
            timestamp: props.analysticsDate[i].timestamp,
            id: props.analysticsDate[i].id
        }
        dateAnalystics.push(dateAnalysticsObject)
    }

    const onChangeTime = (timestamp: number, index: number) => { 
            props.getCurrentTimeTo(timestamp, index)
    }

    return  <div className={style.block}>
            { dateAnalystics.sort((a,b) => (a.time > b.time) ? 1 : ((b.time > a.time) ? -1 : 0)).map( (date, index) => {
                return  <div key={index} className={index === props.currentIndex ? style.block_line_selected : style.block_line} onClick={() => { onChangeTime(date.timestamp, index) } }>
                           { index + 1 } - { date.time }
                        </div>
            } ) }
            </div>
}

export default Analytics