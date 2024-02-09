import React, { Fragment } from 'react'

const DayColumn = ({ day, isMouseDown,isEditable }) => {  

  const handleMouseInside = (event) => {

    if(isEditable){
      if (isMouseDown) {
        if (event.currentTarget.classList.contains("tdSelected")) {
          event.currentTarget.classList.remove("tdSelected")
          event.currentTarget.setAttribute("selected", null)
          
        }

        else {
          event.currentTarget.classList.add("tdSelected")
          event.currentTarget.setAttribute("selected", true)
          event.currentTarget.classList.remove("tdUnselectedHover")
        }
      }

      else if(event.currentTarget.classList.contains("tdUnselectedHover")){
        event.currentTarget.classList.remove("tdUnselectedHover")
      }
    }
  }

  const handleUnselectedHover = (event) => {
    if(isEditable){

      if (!event.currentTarget.classList.contains("tdSelected")) {
        event.currentTarget.classList.add("tdUnselectedHover")
      }
    }
  }

  return (
        <Fragment>
          <table className='data'>
              <thead>
                <tr>
                  <th>
                    <h3>{day}</h3>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr><td onMouseLeave={handleMouseInside} onMouseEnter={handleUnselectedHover} day={day} time={7}></td></tr>
                <tr><td onMouseLeave={handleMouseInside} onMouseEnter={handleUnselectedHover} day={day} time={8}></td></tr>
                <tr><td onMouseLeave={handleMouseInside} onMouseEnter={handleUnselectedHover} day={day} time={9}></td></tr>
                <tr><td onMouseLeave={handleMouseInside} onMouseEnter={handleUnselectedHover} day={day} time={10}></td></tr>
                <tr><td onMouseLeave={handleMouseInside} onMouseEnter={handleUnselectedHover} day={day} time={11}></td></tr>
                <tr><td onMouseLeave={handleMouseInside} onMouseEnter={handleUnselectedHover} day={day} time={12}></td></tr>
                <tr><td onMouseLeave={handleMouseInside} onMouseEnter={handleUnselectedHover} day={day} time={13}></td></tr>
                <tr><td onMouseLeave={handleMouseInside} onMouseEnter={handleUnselectedHover} day={day} time={14}></td></tr>
                <tr><td onMouseLeave={handleMouseInside} onMouseEnter={handleUnselectedHover} day={day} time={15}></td></tr>
                <tr><td onMouseLeave={handleMouseInside} onMouseEnter={handleUnselectedHover} day={day} time={16}></td></tr>
                <tr><td onMouseLeave={handleMouseInside} onMouseEnter={handleUnselectedHover} day={day} time={17}></td></tr>
                <tr><td onMouseLeave={handleMouseInside} onMouseEnter={handleUnselectedHover} day={day} time={18}></td></tr>
                <tr><td onMouseLeave={handleMouseInside} onMouseEnter={handleUnselectedHover} day={day} time={19}></td></tr>
                <tr><td onMouseLeave={handleMouseInside} onMouseEnter={handleUnselectedHover} day={day} time={20}></td></tr>
                <tr><td onMouseLeave={handleMouseInside} onMouseEnter={handleUnselectedHover} day={day} time={21}></td></tr>
                <tr><td onMouseLeave={handleMouseInside} onMouseEnter={handleUnselectedHover} day={day} time={22}></td></tr>
              </tbody>
          </table>
          </Fragment>
  )
}

export default DayColumn