import React, { useState, useCallback, useRef, Fragment } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withRouter } from "react-router-dom";
import { FormHelperText,TextField, Button, Checkbox, Typography, FormControlLabel } from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import FormDialog from "../../../shared/components/FormDialog";
import HighlightedInformation from "../../../shared/components/HighlightedInformation";
import ButtonCircularProgress from "../../../shared/components/ButtonCircularProgress";
import VisibilityPasswordTextField from "../../../shared/components/VisibilityPasswordTextField";
import { auth, logInWithEmailAndPassword, signInWithGoogle,registerWithEmailAndPassword } from "../../../firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import useGlobal from '@donnikitos/react-useglobal';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const styles = (theme) => ({
  forgotPassword: {
    marginTop: theme.spacing(2),
    color: theme.palette.primary.main,
    cursor: "pointer",
    "&:enabled:hover": {
      color: theme.palette.primary.dark,
    },
    "&:enabled:focus": {
      color: theme.palette.primary.dark,
    },
  },
  disabledText: {
    cursor: "auto",
    color: theme.palette.text.disabled,
  },
  formControlLabel: {
    marginRight: 0,
  },
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

function LoginDialog(props) {
  const {
    setStatus,
    history,
    classes,
    onClose,
    openChangePasswordDialog,
    status,
    openRegisterDialog,
    openTermsDialog
  } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const loginEmail = useRef();
  const loginPassword = useRef();
  const [user, loading, error] = useAuthState(auth);
  const [response, setresponse] = useState('')
  const [globalEmail, setGlobalEmail] = useGlobal('x');	


  const [hasTermsOfServiceError, setHasTermsOfServiceError] = useState(false);

  const registerTermsCheckbox = useRef();
  const registerPassword = useRef();
  const registerPasswordRepeat = useRef();
  const registerEmail = useRef();
  const registerName = useRef();
  const registerPhoneNumber = useRef();
  const registerStudentName = useRef();
  const [registerType, setregisterType] = useState(null);
  const [registerTest, setregisterTest] = useState(null);

  const [DropdownError, setDropdownError] = useState(false)
  const [showLogin, setShowLogin] = useState(true);

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
        registerWithEmailAndPassword( registerName.current.value,  registerEmail.current.value, registerPassword.current.value, registerType.value, registerTest.value,registerStudentName.current.value, registerPhoneNumber.current.value);
        }catch(e){
          registerWithEmailAndPassword( registerName.current.value,  registerEmail.current.value, registerPassword.current.value, registerType.value, 'Null',registerStudentName.current.value, registerPhoneNumber.current.value);
        }
    }
    else{
      try{
        registerWithEmailAndPassword( registerName.current.value,  registerEmail.current.value, registerPassword.current.value, registerType.value, registerTest.value,'', registerPhoneNumber.current.value);
        }catch(e){
        registerWithEmailAndPassword( registerName.current.value,  registerEmail.current.value, registerPassword.current.value, registerType.value, 'Null','',registerPhoneNumber.current.value);
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
    registerStudentName,
    registerPhoneNumber
  ]);

  function GetStudentNameForm(){
    
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


  const login = useCallback(() => {
    setIsLoading(true);
    setStatus(null);
    handleSub()
    /*
    if(false){
      setTimeout(() => {
        history.push("/c/dashboard");
      }, 150);
    }
    else{
      setStatus("Invalid User Info");
      setIsLoading(false);
    }
  
    
    if (loginEmail.current.value !== "test@web.com") {
      setTimeout(() => {
        setStatus("invalidEmail");
        setIsLoading(false);
      }, 1500);
    } else if (loginPassword.current.value !== "HaRzwc") {
      setTimeout(() => {
        setStatus("invalidPassword");
        setIsLoading(false);
      }, 1500);
    } else {
      setTimeout(() => {
        history.push("/c/dashboard");
      }, 150);
    }
    */
  }, [setIsLoading, loginEmail, loginPassword, history, setStatus]);

  async function handleSub(){
    try{
      await logInWithEmailAndPassword(loginEmail.current.value, loginPassword.current.value);
    
      history.push("/c/dashboard");
      window.location.reload();
    }catch(err){
      alert(err.message);
      setIsLoading(false);
    }
  }




  function SignInInfo(){
    return(
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

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            //error={status === "invalidEmail"}
            label="Phone Number"
            autoFocus
            autoComplete="off"
            type="tel"
            inputRef={registerPhoneNumber}
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
                marginTop: 10,
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




  function LoginInfo(){
    return(
      <Fragment>
      <FormDialog
        open
        onClose={onClose}
        loading={isLoading}
        onFormSubmit={(e) => {
          e.preventDefault();
          login();
        }}
        hideBackdrop
        headline="Login"
        content={
          <Fragment>
            <TextField
              variant="outlined"
              margin="normal"
              error={status === "invalidEmail"}
              required
              fullWidth
              label="Email Address"
              inputRef={loginEmail}
              autoFocus
              autoComplete="off"
              type="email"
              onChange={() => {
                if (status === "invalidEmail") {
                  setStatus(null);
                }
              }}
              helperText={
                status === "invalidEmail" &&
                "This email address isn't associated with an account."
              }
              FormHelperTextProps={{ error: true }}
            />
            <p>{response}</p>
            <VisibilityPasswordTextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={status === "invalidPassword"}
              label="Password"
              inputRef={loginPassword}
              autoComplete="off"
              onChange={() => {
                if (status === "invalidPassword") {
                  setStatus(null);
                }
              }}
              helperText={
                status === "invalidPassword" ? (
                  <span>
                    Incorrect password. Try again, or click on{" "}
                    <b>&quot;Forgot Password?&quot;</b> to reset it.
                  </span>
                ) : (
                  ""
                )
              }
              FormHelperTextProps={{ error: true }}
              onVisibilityChange={setIsPasswordVisible}
              isVisible={isPasswordVisible}
            />
            <FormControlLabel
              className={classes.formControlLabel}
              control={<Checkbox color="primary" />}
              label={<Typography variant="body1">Remember me</Typography>}
            />
            {status === "verificationEmailSend" ? (
              <HighlightedInformation>
                We have send instructions on how to reset your password to your
                email address
              </HighlightedInformation>
            ) : (
              null
            )}
          </Fragment>
        }
        actions={
          <Fragment>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              disabled={isLoading}
              size="large"
            >
              Login
              {isLoading && <ButtonCircularProgress />}
            </Button>
            <p></p>

            
            <Typography
              align="center"
              className={classNames(
                classes.forgotPassword,
                isLoading ? classes.disabledText : null
              )}
              color="primary"
              
              tabIndex={0}
              role="button"
              onClick={()=>{setShowLogin(false)}}
              //setShowLogin(false)
              onKeyDown={(event) => {
                // For screenreaders listen to space and enter events
                if (
                  (!isLoading && event.keyCode === 13) ||
                  event.keyCode === 32
                ) {
                  openChangePasswordDialog();
                }
              }}
            >
          
              <b>Create an Account</b>
            </Typography>


            <Typography
              align="center"
              className={classNames(
                classes.forgotPassword,
                isLoading ? classes.disabledText : null
              )}
              color="primary"
              onClick={isLoading ? null : openChangePasswordDialog}
              tabIndex={0}
              role="button"
              onKeyDown={(event) => {
                // For screenreaders listen to space and enter events
                if (
                  (!isLoading && event.keyCode === 13) ||
                  event.keyCode === 32
                ) {
                  openChangePasswordDialog();
                }
              }}
            >
          
              Forgot Password?
            </Typography>



          </Fragment>
        }
      />
    </Fragment>
    )
  }


  function SwitchInfo(){
    if(showLogin){
      return(LoginInfo())
    }else{
      return(SignInInfo())
    }
  }


  return (
    SwitchInfo()
  );
}

LoginDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
  openChangePasswordDialog: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  status: PropTypes.string,
  openRegisterDialog: PropTypes.func.isRequired,
  
};
/*
<HighlightedInformation>
                Email is: <b>test@web.com</b>
                <br />
                Password is: <b>HaRzwc</b>
              </HighlightedInformation>
*/
 
export default withRouter(withStyles(styles)(LoginDialog));
