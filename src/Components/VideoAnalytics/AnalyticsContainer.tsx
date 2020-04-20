import React, { useEffect } from 'react'
import Analytics from './Analytics'
import { connect, ConnectedProps } from 'react-redux'
import { StateType } from '../../Redux/ReduxStore'
import { getAnalysticsData, AnalysticsType, getCurrentTimeTo } from '../../Redux/Reduser'
import { getDataAnalystics, getIndex} from '../../Redux/selectors'

type MapStateToPropsType = {
    analysticsDate: Array<AnalysticsType>
    currentIndex: number
}

type MapDispatchToPropsType = {
    getAnalysticsData: () => void
    getCurrentTimeTo: (timeTo: number, index: number) => void
}

type PropsType = MapStateToPropsType & MapDispatchToPropsType & PropsFromRedux

const AnalyticsContainer: React.FC<PropsType> = React.memo((props) => {

    useEffect(() => {
        props.getAnalysticsData()
    }, [props])

    return <Analytics 
                analysticsDate={ props.analysticsDate } 
                currentIndex={ props.currentIndex } 
                getCurrentTimeTo={ props.getCurrentTimeTo }
                />
})

const mapStateToProps = (state: StateType): MapStateToPropsType => {
    return {
        analysticsDate: getDataAnalystics(state),
        currentIndex: getIndex(state),
    }
}

const connector = connect(mapStateToProps, { getAnalysticsData, getCurrentTimeTo })
type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(AnalyticsContainer)
