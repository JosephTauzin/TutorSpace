import React, {Fragment } from 'react'

const DayColumn = ({ day, isMouseDown }) => {
  const handleMouseOver = (event) => {
    if (isMouseDown) {
      if (event.currentTarget.classList.contains("tdSelected")) {
        event.currentTarget.classList.remove("tdSelected")
      }

      else {
        event.currentTarget.classList.add("tdSelected")
      }

    }
  }

  const handleClick = (event) => {
    if (event.currentTarget.classList.contains("tdSelected")) {
      event.currentTarget.classList.remove("tdSelected")
    }

    else {
      event.currentTarget.classList.add("tdSelected")
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
                <tr><td onMouseOver={handleMouseOver} onClick={handleClick}></td></tr>
                <tr><td onMouseOver={handleMouseOver} onClick={handleClick}></td></tr>
                <tr><td onMouseOver={handleMouseOver} onClick={handleClick}></td></tr>
                <tr><td onMouseOver={handleMouseOver} onClick={handleClick}></td></tr>
                <tr><td onMouseOver={handleMouseOver} onClick={handleClick}></td></tr>
                <tr><td onMouseOver={handleMouseOver} onClick={handleClick}></td></tr>
                <tr><td onMouseOver={handleMouseOver} onClick={handleClick}></td></tr>
                <tr><td onMouseOver={handleMouseOver} onClick={handleClick}></td></tr>
                <tr><td onMouseOver={handleMouseOver} onClick={handleClick}></td></tr>
                <tr><td onMouseOver={handleMouseOver} onClick={handleClick}></td></tr>
                <tr><td onMouseOver={handleMouseOver} onClick={handleClick}></td></tr>
                <tr><td onMouseOver={handleMouseOver} onClick={handleClick}></td></tr>
              </tbody>
          </table>
          </Fragment>
  )
}

export default DayColumn