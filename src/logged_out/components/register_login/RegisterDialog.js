import React, { useState, useCallback, useRef, Fragment } from "react";
import PropTypes from "prop-types";
import { FormHelperText, TextField, Button, Checkbox, Typography, FormControlLabel } from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import FormDialog from "../../../shared/components/FormDialog";
import HighlightedInformation from "../../../shared/components/HighlightedInformation";
import ButtonCircularProgress from "../../../shared/components/ButtonCircularProgress";
import VisibilityPasswordTextField from "../../../shared/components/VisibilityPasswordTextField";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../../../firebase.client.js";
import { useAuthState } from "react-firebase-hooks/auth";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { withRouter } from "react-router-dom";


const styles = (theme) => ({
  link: {
    transition: theme.transitions.create(["background-color"], {
      duration: theme.transitions.duration.complex,
      easing: theme.transitions.easing.easeInOut,
    }),
    cursor: "pointer",
    color: theme.palette.primary.main,
    "&:enabled:hover": {
      color: theme.palette.primary.dark,
    },
    "&:enabled:focus": {
      color: theme.palette.primary.dark,
    },
  },
});

function RegisterDialog(props) {
  const { setStatus, theme, onClose, openTermsDialog, status, classes, history } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [hasTermsOfServiceError, setHasTermsOfServiceError] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const registerTermsCheckbox = useRef();
  const registerPassword = useRef();
  const registerPasswordRepeat = useRef();
  const registerEmail = useRef();
  const registerName = useRef();
  const registerStudentName = useRef();
  const [registerType, setregisterType] = useState(null);
  const [registerTest, setregisterTest] = useState(null);
  const [user, loading, error] = useAuthState(auth);
  const [DropdownError, setDropdownError] = useState(false)

  const register = useCallback(() => {

    console.log("Super dub")
    console.log(registerType)
    console.log(registerTest)
    console.log(registerType.value)
    //console.log(registerTest.value)

    if(registerType == null || (registerTest == null && registerType.value !== 'Parent' )){
      console.log("INIT")
      setDropdownError(true)
      return;
    }
    
    if (!registerTermsCheckbox.current.checked) {
      setHasTermsOfServiceError(true);
      return;
    }
    if (
      registerPassword.current.value !== registerPasswordRepeat.current.value
    ) {
      setStatus("passwordsDontMatch");
      return;
    }
    if(registerType.value == 'Parent'){
      try{
        registerWithEmailAndPassword( registerName.current.value,  registerEmail.current.value, registerPassword.current.value, registerType.value, registerTest.value,registerStudentName.current.value);
        }catch(e){
          registerWithEmailAndPassword( registerName.current.value,  registerEmail.current.value, registerPassword.current.value, registerType.value, 'Null',registerStudentName.current.value);
        }
    }
    else{
      try{
        registerWithEmailAndPassword( registerName.current.value,  registerEmail.current.value, registerPassword.current.value, registerType.value, registerTest.value,'');
        }catch(e){
        registerWithEmailAndPassword( registerName.current.value,  registerEmail.current.value, registerPassword.current.value, registerType.value, 'Null','');
        }
    }
  
    setStatus(null);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      history.push("/c/dashboard");
    }, 1500);
   
  }, [
    setIsLoading,
    setStatus,
    setHasTermsOfServiceError,
    registerPassword,
    registerPasswordRepeat,
    registerTermsCheckbox,
    registerEmail,
    registerName,
    registerType,
    registerTest,
    history,
    registerStudentName
  ]);

  function GetStudentNameForm(){
    console.log("GetStudentNameForm")
    console.log(registerType)
    try{
      if(registerType.value == 'Parent'){
        return(
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              //error={status === "invalidEmail"}
              label="Student Name"
              autoFocus
              autoComplete="off"
              //type="email"
              inputRef={registerStudentName}
              onChange={() => {
                if (status === "invalidEmail") {
                  setStatus(null);
                }
              }}
              FormHelperTextProps={{ error: true }}
            />
        )
      }
      else{
        return(null)
      }
    }catch(e){
      return(null)
    }
  }

  function ShowDropdownError(){
    if(DropdownError && registerType.value !== 'Parent'){
      return(<p style={{ color: 'red', fontSize:15}}>Error: Pick Dropdown Option</p>)
    }else{
      return(null)
    }
  }

  function ShowTestDropdown(){
    try{
      if((registerType.value == 'Tutor') || (registerType.value == 'Parent')){
        return(
          null
        )
      }
      else{
        return(
          <>
            <div style={{height:10}}></div>
            <Dropdown options={['SAT','ACT','Diagnostics']} onChange={(x)=>{setregisterTest(x)}} placeholder="Select a test"  />
          </>
        )
      }
    }catch(e){
      return(null)
    }
  }

  return (
    <FormDialog
      loading={isLoading}
      onClose={onClose}
      open
      headline="Register"
      onFormSubmit={(e) => {
        e.preventDefault();
        register();
      }}
      hideBackdrop
      hasCloseIcon
      content={
        <Fragment>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={status === "invalidEmail"}
            label="Email Address"
            autoFocus
            autoComplete="off"
            type="email"
            inputRef={registerEmail}
            onChange={() => {
              if (status === "invalidEmail") {
                setStatus(null);
              }
            }}
            FormHelperTextProps={{ error: true }}
          />
         
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            //error={status === "invalidEmail"}
            label="Name"
            autoFocus
            autoComplete="off"
            //type="email"
            inputRef={registerName}
            onChange={() => {
              if (status === "invalidEmail") {
                setStatus(null);
              }
            }}
            FormHelperTextProps={{ error: true }}
          />
          {GetStudentNameForm()}
          <div style={{height:10}}></div>
          <Dropdown options={['Parent','Student','Tutor']} onChange={(s)=>{setregisterType(s)}} placeholder="Select an option"  />
          
          <p></p>
          {ShowTestDropdown()}
          <p></p>
          <VisibilityPasswordTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={
              status === "passwordTooShort" || status === "passwordsDontMatch"
            }
            label="Password"
            inputRef={registerPassword}
            autoComplete="off"
            onChange={() => {
              if (
                status === "passwordTooShort" ||
                status === "passwordsDontMatch"
              ) {
                setStatus(null);
              }
            }}
            helperText={(() => {
              if (status === "passwordTooShort") {
                return "Create a password at least 6 characters long.";
              }
              if (status === "passwordsDontMatch") {
                return "Your passwords dont match.";
              }
              return null;
            })()}
            FormHelperTextProps={{ error: true }}
            isVisible={isPasswordVisible}
            onVisibilityChange={setIsPasswordVisible}
          />
          <VisibilityPasswordTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={
              status === "passwordTooShort" || status === "passwordsDontMatch"
            }
            label="Repeat Password"
            inputRef={registerPasswordRepeat}
            autoComplete="off"
            onChange={() => {
              if (
                status === "passwordTooShort" ||
                status === "passwordsDontMatch"
              ) {
                setStatus(null);
              }
            }}
            helperText={(() => {
              if (status === "passwordTooShort") {
                return "Create a password at least 6 characters long.";
              }
              if (status === "passwordsDontMatch") {
                return "Your passwords dont match.";
              }
            })()}
            FormHelperTextProps={{ error: true }}
            isVisible={isPasswordVisible}
            onVisibilityChange={setIsPasswordVisible}
          />
          <FormControlLabel
            style={{ marginRight: 0 }}
            control={
              <Checkbox
                color="primary"
                inputRef={registerTermsCheckbox}
                onChange={() => {
                  setHasTermsOfServiceError(false);
                }}
              />
            }
            label={
              <Typography variant="body1">
                I agree to the
                <span
                  className={classes.link}
                  //onClick={isLoading ? null : openTermsDialog}
                  tabIndex={0}
                  role="button"
                  onKeyDown={(event) => {
                    // For screenreaders listen to space and enter events
                    if (
                      (!isLoading && event.keyCode === 13) ||
                      event.keyCode === 32
                    ) {
                      openTermsDialog();
                    }
                  }}
                >
                  {" "}
                  terms of service
                </span>
              </Typography>
            }
          />
          {hasTermsOfServiceError && (
            <FormHelperText
              error
              style={{
                display: "block",
                marginTop: theme.spacing(-1),
              }}
            >
              In order to create an account, you have to accept our terms of
              service.
            </FormHelperText>
          )}
         
          {ShowDropdownError()}
        </Fragment>
      }
      actions={
        <div>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          size="large"
          color="secondary"
          disabled={isLoading}
        >
          Register
          {isLoading && <ButtonCircularProgress />}
        </Button>
        <p></p>
       
      </div>
      }
    />
  );
}

/*
 {status === "accountCreated" ? (
            <HighlightedInformation>
              We have created your account. Please click on the link in the
              email we have sent to you before logging in.
            </HighlightedInformation>
          ) : (
            <HighlightedInformation>
              Registration is disabled until we go live.
            </HighlightedInformation>
          )}

*/
RegisterDialog.propTypes = {
  theme: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  openTermsDialog: PropTypes.func.isRequired,
  status: PropTypes.string,
  setStatus: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(withStyles(styles, { withTheme: true })(RegisterDialog));
