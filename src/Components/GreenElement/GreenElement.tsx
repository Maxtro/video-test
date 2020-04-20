import React, { useRef, useEffect } from 'react'
import style from './GreenElement.module.css'
import { GreenElementType } from '../../Redux/Reduser'

type PropsType = {
    greenElementStyle: GreenElementType
}

const GreenElement: React.FC<PropsType> = (props) => {

    const greenElement = useRef<any>(null)

    useEffect(() => {
        greenElement.current.style.top = `${props.greenElementStyle.top}px`
        greenElement.current.style.left = `${props.greenElementStyle.left}px`
        greenElement.current.style.height = `${props.greenElementStyle.height}px`
        greenElement.current.style.width = `${props.greenElementStyle.width}px`
    }, [props])

    return  <div className={style.element} ref={div => greenElement.current = div}></div>
}

export default GreenElement