import React, { useState, useEffect } from 'react'
import DayColumn from './DayColumn'
import LabelColumn from './LabelColumn'
import "./timeSelect.css"

const TimeSelect = () => {
    const [isMouseDown, setIsMouseDown] = useState(false)

    useEffect(() => {
        document.addEventListener("mousedown", handleMouseDown)
        document.addEventListener("mouseup", handleMouseUp)
        return () => {
          document.removeEventListener("mousedown", handleMouseDown)
          document.removeEventListener("mouseup", handleMouseUp)
        }
      }, [])

      const handleMouseDown = (event) => {
        event.preventDefault()
        setIsMouseDown(true)
      }
      const handleMouseUp = (event) => {
        setIsMouseDown(false)
      }    

    return (
        <div className='timeSelect'>
            <LabelColumn />
            <DayColumn day={'Sunday'} isMouseDown={isMouseDown} />
            <DayColumn day={'Monday'} isMouseDown={isMouseDown}/>
            <DayColumn day={'Tuesday'} isMouseDown={isMouseDown}/>
            <DayColumn day={'Wednesday'} isMouseDown={isMouseDown}/>
            <DayColumn day={'Thursday'} isMouseDown={isMouseDown}/>
            <DayColumn day={'Friday'} isMouseDown={isMouseDown}/>
            <DayColumn day={'Saturday'} isMouseDown={isMouseDown}/>
        </div>
    )
}

export default TimeSelect