import React from 'react'
import ScheduleSelector from 'react-schedule-selector'


//@This is the code from the repo, it's a class component demo of it, can't figure why my arrow component isn't working: https://github.com/bibekg/react-schedule-selector
/*
class DashboardScheduleSelector extends React.Component {
  state = { schedule = [] }

  handleChange = newSchedule => {
    this.setState({ schedule: newSchedule })
  }

  render() {
    return (
      <ScheduleSelector
        selection={this.state.schedule}
        numDays={5}
        minTime={8}
        maxTime={22}
        hourlyChunks={2}
        onChange={this.handleChange}
      />
    )
  }
}

//1st thing I tried
const DashboardScheduleSelector = () => {
    //this.state = {schedule = []}
    const handleChange = (newSchedule) => {
        this.setState({schedule: newSchedule})
    }
    const schedule = []
    return (
        <ScheduleSelector
            selection={schedule}
            numDays={5}
            minTime={8}
            maxTime={22}
            hourlyChunks={2}
            onChange={this.handleChange}
      />
    )
}


//Then trying to use default handlers on the package - guess there aren't any
const DashboardScheduleSelector = () => {
  return (
    <ScheduleSelector 
        selection={this.state.schedule}
        numDays={5}
        minTime={8}
        maxTime={22}
        hourlyChunks={2}
        onChange={this.handleChange}
    />

  )
}

export default DashboardScheduleSelector
*/