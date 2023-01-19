import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Typography, Box } from "@mui/material";
import SettingsArea from "./SettingsArea";
import UserDataArea from "./UserDataArea";
import AccountInformationArea from "./AccountInformationArea";
import StatisticsArea from "./StatisticsArea";
import FileInputs from "./FileInputs"
import TextInput from './TextInput'
import Options from "./Options"

import ReactLoading from 'react-loading';
import Button from '@mui/material/Button';
import "./style.css";


function Dashboard(props) {
  const {
    selectDashboard,
    CardChart,
    statistics,
    toggleAccountActivation,
    pushMessageToSnackbar,
    targets,
    setTargets,
    isAccountActivated,
  } = props;

  const Loading = ({ type, color }) => (
    <ReactLoading type={type} color={color} height={'20%'} width={'20%'} />
	);
 

  useEffect(selectDashboard, [selectDashboard]);
  const Name = 'Joseph'
  const [EstimatedTime, setEstimatedTime] = useState(0)
  
  //<StatisticsArea CardChart={CardChart} data={statistics} />
  return (
    <Fragment>
      <div>
        <p style={{color:'white', fontSize:30}}>Welcome to your Dashboard {Name}</p>
      </div>

      <ReactLoading type={'cylon'} color={'#fff'} height={'20%'} width={'20%'} />

		<div>
            <p>Estimated Time: {EstimatedTime}</p>
        </div>

      <TextInput/>
      <div>
        <p style={{color:'white', fontSize:30}}>-Or-</p>
      </div>
      <FileInputs/>
    	<Options/>
      <div className ={'ButtonDiv'} >
				<Button variant="contained" color="success">Submit</Button>
			</div>
      <Box mt={4}>
        <Typography variant="subtitle1" gutterBottom>
          <p style={{color:'white'}}>Your Account</p>
        </Typography>
      </Box>
      <AccountInformationArea
        isAccountActivated={isAccountActivated}
        toggleAccountActivation={toggleAccountActivation}
      />
      
      
       
    </Fragment>
  );
}
/*
<Box mt={4}>
        <Typography variant="subtitle1" gutterBottom>
        <p style={{color:'white'}}>Settings</p>
        </Typography>
      </Box>
      <SettingsArea pushMessageToSnackbar={pushMessageToSnackbar} />
      <UserDataArea
        pushMessageToSnackbar={pushMessageToSnackbar}
        targets={targets}
        setTargets={setTargets}
      />
*/

Dashboard.propTypes = {
  CardChart: PropTypes.elementType,
  statistics: PropTypes.object.isRequired,
  toggleAccountActivation: PropTypes.func,
  pushMessageToSnackbar: PropTypes.func,
  targets: PropTypes.arrayOf(PropTypes.object).isRequired,
  setTargets: PropTypes.func.isRequired,
  isAccountActivated: PropTypes.bool.isRequired,
  selectDashboard: PropTypes.func.isRequired,
};

export default Dashboard;
