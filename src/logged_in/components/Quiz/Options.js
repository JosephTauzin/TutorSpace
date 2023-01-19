
import React from "react";
import { render } from "react-dom";
import { TransitionMotion, spring } from "react-motion";
import "./style.css";
import withTheme from '@mui/styles/withTheme';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import ReactHover, { Trigger, Hover } from "react-hover";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useGlobalOutput } from '../../../useGlobalOutput'


/*
{`
                <ReactHover
                  options={optionsCursorTrueWithMargin}>
                  <Trigger type='trigger'>
                    <TriggerComponent />
                  </Trigger>
                  <Hover type='hover>
                    <HoverComponent />
                  </Hover>
                  </ReactHover>`}
*/


  
function Options(){
	const optionsCursorTrueWithMargin = {
		followCursor: true,
		shiftX: 20,
		shiftY: 0
	  };
	//onChange={handleChange}
	return(
        <div className={'check'}>
            <div className={'checkbox'} >
	
				
                <ReactHover
                  options={optionsCursorTrueWithMargin}>
                  	<Trigger type='trigger'>
				  		<p style={{color:'white', fontSize:25}}>Video Pace</p>
                  	</Trigger>
                  	<Hover type='hover'>
						<div className ={'hoverbox'}>
				  			<p style={{color:'black', fontSize:25}}>Select the tempo of your video.</p>
						</div>
                  	</Hover>
                  </ReactHover>
        		<FormGroup>
            		<FormControlLabel control={<Checkbox color="default" />} label="Fast" />
            		<FormControlLabel control={<Checkbox color="default" defaultChecked />} label="Medium" />
            		<FormControlLabel control={<Checkbox color="default"/>} label="Slow" />
     	 		</FormGroup>
          	</div>
          	<div className={'checkbox'} >
          
			  <ReactHover
                  options={optionsCursorTrueWithMargin}>
                  	<Trigger type='trigger'>
						
				  			<p style={{color:'white', fontSize:25}}>Video Orientation</p>
					
                  	</Trigger>
                  	<Hover type='hover'>
					  <div className ={'hoverbox'}>
				  		<p style={{color:'black', fontSize:25}}>Youtube or TikTok?</p>
						  </div>
                  	</Hover>
                  </ReactHover>
        		<FormGroup>
           			<FormControlLabel control={<Checkbox color="default"/>} label="Portrait" />
           			<FormControlLabel control={<Checkbox color="default"defaultChecked />} label="Landscape" />
           		
         		</FormGroup>
         	</div>
			 <div className={'checkbox'} >
     
			  <ReactHover
                  options={optionsCursorTrueWithMargin}>
                  	<Trigger type='trigger'>
						  
				  				<p style={{color:'white', fontSize:25}}>Output</p>
						  
                  	</Trigger>
                  	<Hover type='hover'>
					  <div className ={'hoverbox'}>
				  		<p style={{color:'black', fontSize:25}}>Choose to output one video file or a folder containing each clip </p>
						  </div>
                  	</Hover>
                  </ReactHover>
        		<FormGroup>
           			<FormControlLabel control={<Checkbox color="default"/>} label="Full Video" />
           			<FormControlLabel control={<Checkbox color="default"defaultChecked />} label="Video Segments" />
           		
         		</FormGroup>
         	</div>
         </div>
	)
};

export default withTheme(Options);
