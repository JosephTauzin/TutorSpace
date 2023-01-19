import React, {useEffect, useState} from "react";
import { render } from "react-dom";
import { TransitionMotion, spring } from "react-motion";
import "./style.css";
import withTheme from '@mui/styles/withTheme';
import Button from '@mui/material/Button';




const handleSubmission = () => {
  /*
  const formData = new FormData();

  formData.append('File', selectedFile);
	*/
  fetch(
    'http://127.0.0.1:5000/text',
    {
      method: 'POST',
      body: 'Test',
    }
  )
    .then((response) => response.json())
    .then((result) => {
      console.log('Success:', result);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};


class Input extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: (props.locked && props.active) || true,
      value: props.value || "",
      error: props.error || "",
      label: props.label || "Label"
    };
  }

  changeValue(event) {
    const value = event.target.value;
    this.setState({ value, error: "" });
  }

  handleKeyPress(event) {
    if (event.which === 13) {
      this.setState({ value: this.props.predicted });
    }
  }

  render() {
    const { active, value, error, label } = this.state;
    const { predicted, locked } = this.props;
    const fieldClassName = `field ${(locked ? active : active || value) &&
      "active"} ${locked && !active && "locked"}`;
    //setLocalValue(value);

    return (
      <div className={fieldClassName}>
        {active &&
          value &&
          predicted &&
          predicted.includes(value) && <p className="predicted">{predicted}</p>}
        <textarea
          id={2}
          type="text"
          value={value}
          placeholder={label}
          onChange={this.changeValue.bind(this)}
          onKeyPress={this.handleKeyPress.bind(this)}
          onFocus={() => !locked && this.setState({ active: true })}
          onBlur={() => !locked && this.setState({ active: true })}
        />
        
      </div>
    );
  }
}

class InputShort extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      active: (props.locked && props.active) || true,
      value: props.value || "",
      error: props.error || "",
      label: props.label || "Label"
    };
  }

  changeValue(event) {
    const value = event.target.value;
    this.setState({ value, error: "" });
  }

  handleKeyPress(event) {
    if (event.which === 13) {
      this.setState({ value: this.props.predicted });
    }
  }

  render() {
    const { active, value, error, label } = this.state;
    const { predicted, locked } = this.props;
    const fieldClassName = `fieldSmall ${(locked ? active : active || value) &&
      "active"} ${locked && !active && "locked"}`;
    //setLocalValue(value);

    return (
      <div className={fieldClassName}>
        {active &&
          value &&
          predicted &&
          predicted.includes(value) && <p className="predicted">{predicted}</p>}
        <textarea
          id={2}
          type="text"
          value={value}
          placeholder={label}
          onChange={this.changeValue.bind(this)}
          onKeyPress={this.handleKeyPress.bind(this)}
          onFocus={() => !locked && this.setState({ active: true })}
          onBlur={() => !locked && this.setState({ active: true })}
        />
        
      </div>
    );
  }
}


function VerifyInput(){
  if(true){
    handleSubmission()
  }
}
function GetInput(){
  return(
    <>
    <InputShort
      id={2}
      label="Title Input (Optional)"
      //predicted="California"
      locked={false}
      active={false}
    />
	
    <Input
      id={2}
      label="Text Input"
      //predicted="California"
      locked={false}
      active={false}
    />
   
    </>
  );
}
export default (GetInput);