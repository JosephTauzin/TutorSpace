import React, { Fragment } from 'react'

const DayColumn = ({ day, isMouseDown }) => {  

  const handleMouseInside = (event) => {
    if (isMouseDown) {
      if (event.currentTarget.classList.contains("tdSelected")) {
        event.currentTarget.classList.remove("tdSelected")
      }

      else {
        event.currentTarget.classList.add("tdSelected")
        event.currentTarget.classList.remove("tdUnselectedHover")
      }
    }

    else if(event.currentTarget.classList.contains("tdUnselectedHover")){
      event.currentTarget.classList.remove("tdUnselectedHover")
    }
  }

  const handleUnselectedHover = (event) => {
    if (!event.currentTarget.classList.contains("tdSelected")) {
      event.currentTarget.classList.add("tdUnselectedHover")
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
                <tr><td onMouseLeave={handleMouseInside} onMouseEnter={handleUnselectedHover}></td></tr>
                <tr><td onMouseLeave={handleMouseInside} onMouseEnter={handleUnselectedHover}></td></tr>
                <tr><td onMouseLeave={handleMouseInside} onMouseEnter={handleUnselectedHover}></td></tr>
                <tr><td onMouseLeave={handleMouseInside} onMouseEnter={handleUnselectedHover}></td></tr>
                <tr><td onMouseLeave={handleMouseInside} onMouseEnter={handleUnselectedHover}></td></tr>
                <tr><td onMouseLeave={handleMouseInside} onMouseEnter={handleUnselectedHover}></td></tr>
                <tr><td onMouseLeave={handleMouseInside}></td></tr>
                <tr><td onMouseLeave={handleMouseInside} onMouseEnter={handleUnselectedHover}></td></tr>
                <tr><td onMouseLeave={handleMouseInside} onMouseEnter={handleUnselectedHover}></td></tr>
                <tr><td onMouseLeave={handleMouseInside} onMouseEnter={handleUnselectedHover}></td></tr>
                <tr><td onMouseLeave={handleMouseInside} onMouseEnter={handleUnselectedHover}></td></tr>
                <tr><td onMouseLeave={handleMouseInside} onMouseEnter={handleUnselectedHover}></td></tr>
              </tbody>
          </table>
          </Fragment>
  )
}

export default DayColumn