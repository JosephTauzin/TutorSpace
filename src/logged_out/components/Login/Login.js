
import { Grid, Box } from "@mui/material";


import useMediaQuery from "@mui/material/useMediaQuery";
import React, { useState, useCallback, useRef, Fragment,useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withRouter } from "react-router-dom";
import { FormHelperText,TextField, Button, Checkbox, Typography, FormControlLabel } from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import FormDialog from "../../../shared/components/FormDialog";
import HighlightedInformation from "../../../shared/components/HighlightedInformation";
import ButtonCircularProgress from "../../../shared/components/ButtonCircularProgress";
import VisibilityPasswordTextField from "../../../shared/components/VisibilityPasswordTextField";
import { auth, logInWithEmailAndPassword, signInWithGoogle,registerWithEmailAndPassword } from "../../../firebase.client.js";
import { useAuthState } from "react-firebase-hooks/auth";
import useGlobal from '@donnikitos/react-useglobal';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { doc, onSnapshot, collection, query, where,updateDoc, arrayUnion, arrayRemove, setDoc , deleteDoc} from "firebase/firestore";
import '@firebase/firestore';
import {  db, storage} from "../../../firebase.client.js";
import TutorSpaceDashboard from "./images/TutorSpaceDashboard.png"
import TutorSpaceDashboardDarkShadow from "./images/TutorSpaceDashboardDarkShadow.png"
import TutorSpaceDashboardLightShadow from "./images/TutorSpaceDashboardLightShadow.png"
import TutorSpaceFeatures from "./images/TutorSpaceFeatures.png"
import TutorSpaceFooterLogo from "./images/TutorSpaceFooterLogo.png"
import TutorSpaceMenuDashboard from "./images/TutorSpaceMenuDashboard.png"
import TutorSpaceMenuRoster from "./images/TutorSpaceMenuRoster.png"
import TutorSpaceNavLogo from "./images/TutorSpaceNavLogo.png"
import TutorSpaceNotes from "./images/TutorSpaceNotes.png"
import TutorSpacePayments from "./images/TutorSpacePayments.png"
import TutorSpaceProgress from "./images/TutorSpaceProgress.png"
import TutorSpaceQuiz from "./images/TutorSpaceQuiz.png"
import TutorSpaceRoster from "./images/TutorSpaceRoster.png"
import TutorSpaceWhiteboard from "./images/TutorSpaceWhiteboard.png"
import TutorSpaceWhiteShadow from "./images/TutorSpaceWhiteShadow.png"
import "./index.css"
import { set } from "date-fns";
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

function Login(props) {
 
    /*
  const isWidthUpSm = useMediaQuery(theme.breakpoints.up("sm"));
  const isWidthUpMd = useMediaQuery(theme.breakpoints.up("md"));
    */
  //Mobile Menu Fuctionality
  var mobileMenu = document.querySelector(".mobileMenu")
  var menuIcon = document.getElementById("menuIcon")


  const handleMenuClick = () => {
      if (mobileMenu.style.opacity == 0) {
          mobileMenu.style.transform = "translateX(0%)"
          mobileMenu.style.opacity = 1
      }
      else {
          mobileMenu.style.transform = "translateX(-100%)"
          mobileMenu.style.opacity = 0
      }
  }
  setTimeout(() => {
    menuIcon.addEventListener('click', handleMenuClick)
  }, 300);


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
  const registerCompanyCode = useRef();
  const [registerType, setregisterType] = useState(null);
  const [registerTest, setregisterTest] = useState(null);

  const [DropdownError, setDropdownError] = useState(false)
  const [showLogin, setShowLogin] = useState(true);
  const [IsNewCompany, setIsNewCompany] = useState(false);
  const [IsIndividual, setIsIndividual] = useState(true)


  const register = useCallback(() => {

    if(IsIndividual){
      if(registerName.current.value == '' || registerEmail.current.value == '' || registerPassword.current.value == '' || registerPasswordRepeat.current.value == ''){
        setDropdownError(true)
        return;
      }
    }
    else{
      if(registerType == null || (registerTest == null && registerType.value == 'Student' ) || registerCompanyCode.current.value == '' || "9999999999" == '' || registerName.current.value == '' || registerEmail.current.value == '' || registerPassword.current.value == '' || registerPasswordRepeat.current.value == ''){

        setDropdownError(true)
        return;
      }
    }
    
    if (!registerTermsCheckbox.current.checked) {
      setHasTermsOfServiceError(true);
      return;
    }
    if (
      registerPassword.current.value !== registerPasswordRepeat.current.value
    ) {
      console.log('passwords dont match')
      setStatus("passwordsDontMatch");
      return;
    }

    if(IsIndividual){
      console.log('In Individual')
      try{
        registerWithEmailAndPassword( registerName.current.value,  registerEmail.current.value, registerPassword.current.value, 'Individual', registerTest.value,'none', "9999999999", 'Individual',false);
        }catch(e){
          console.log('In error for individual')
          console.log(e)
          registerWithEmailAndPassword( registerName.current.value,  registerEmail.current.value, registerPassword.current.value, 'Individual', 'Null','none', "9999999999", 'Individual', false);
        } 

    }


    else if(registerType.value == 'Parent'){
      try{
        registerWithEmailAndPassword( registerName.current.value,  registerEmail.current.value, registerPassword.current.value, registerType.value, registerTest.value,registerStudentName.current.value, "9999999999", registerCompanyCode.current.value,IsNewCompany);
        }catch(e){
          registerWithEmailAndPassword( registerName.current.value,  registerEmail.current.value, registerPassword.current.value, registerType.value, 'Null',registerStudentName.current.value, "9999999999", registerCompanyCode.current.value, IsNewCompany);
        }
    }
    else{
      try{
        registerWithEmailAndPassword( registerName.current.value,  registerEmail.current.value, registerPassword.current.value, registerType.value, registerTest.value,'', "9999999999", registerCompanyCode.current.value, IsNewCompany);
        }catch(e){
        registerWithEmailAndPassword( registerName.current.value,  registerEmail.current.value, registerPassword.current.value, registerType.value, 'Null','',"9999999999", registerCompanyCode.current.value, IsNewCompany);
      }
    }
  
    //setStatus(null);
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
    registerPhoneNumber,
    registerCompanyCode
  ]);


  function GetStudentNameForm(){
    
    try{
      if(registerType.value == 'Parent'){
        return(
          <TextField
              variant="standard"
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
    if(DropdownError ){
      return(<p style={{ color: 'red', fontSize:15}}>Error: Missing Data</p>)
    }else{
      return(null)
    }
  }

  function ShowTestDropdown(forceTest = false){
    try{
      if(forceTest){
        return(
          <>
            <div style={{height:40}}></div>
            <Dropdown options={['SAT','ACT','Diagnostics']} onChange={(x)=>{setregisterTest(x)}} placeholder="Select a test"  />
          </>
        )
      }
      if(((registerType.value == 'Tutor') || (registerType.value == 'Parent')) ){
        return(
          null
        )
      }
      else{
        return(
          <>
            <div style={{height:40}}></div>
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
      setTimeout(() => {
        window.location.reload();
      }, 750);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }catch(err){
      alert(err.message);
      setIsLoading(false);
    }
  }


  //FUnction that returns only unique values in an array and takes only an array

  function findUniqueValues(arr) {
    let uniqueValues = [];
  
    arr.forEach(function(value) {
      if (!uniqueValues.includes(value)) {
        uniqueValues.push(value);
      }
    });
  
    return uniqueValues;
  }

  const [CompanyCodes, setCompanyCodes] = useState([]);
  const [CompanyCodesUnique, setCompanyCodesUnique] = useState([]);
  //Get all company codes from users
  const usersRef = collection(db, "users");
  useEffect(() => {
    const x = query(usersRef);
    
    const unsubscribe = onSnapshot(x, (snapshot) => {
      snapshot.docs.map((doc) => {
        if(doc.data().CompanyCode !== ''){
          setCompanyCodes((CompanyCodes) => [...CompanyCodes, doc.data().CompanyCode]);
        }
      });
  
      console.log("FInd Unique")
      console.log(CompanyCodes)
      console.log(findUniqueValues(CompanyCodes))
      
      //setCompanyCodes(findUniqueValues(CompanyCodes));
    });
    return () => {
      unsubscribe();
    };
  }, []);

  function FindIfCompanyCodeExists(CompanyCode){
    if(CompanyCodesUnique.includes(CompanyCode)){
      return("You are joining an existing company/school.")
    }
    else{
      return("You are creating a new company/school account. Make sure you select the correct code.")
      
    }
  }


  const [CompanyCodeAlert, setCompanyCodeAlert] = useState("")
  useEffect(() => {

    if(CompanyCodesUnique && registerCompanyCode){
     
      //var CurrCompanyCode = registerCompanyCode.current.value;
 
      //setCompanyCodeAlert(FindIfCompanyCodeExists(CurrCompanyCode))
    }
  }, [registerCompanyCode])

  

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
 
      var x = findUniqueValues(CompanyCodes)
    
      setCompanyCodesUnique(findUniqueValues(CompanyCodes));
    }, 1000)
    return () => clearTimeout(delayDebounceFn)
  }, [CompanyCodes])



  function PullColor(bool){
    if(bool){
      return('#7494FB')
    }
    else{
      return('#FFFFFF')
    }
  }
  function PullColorText(bool){
    if(bool){
      return('#FFFFFF')
    }
    else{
      return('#7494FB')
    }
  }
  function SignInInfo(){

    if(IsIndividual){
      return(
        <Fragment>
        <div className="rowDiv">
          
        <Button
                      //type="submit"
                      fullWidth
                      variant="contained"
                      //color="secondary"
                      style={{ backgroundColor: PullColor(IsIndividual) }}
                      disabled={isLoading}
                      size="large"
                      onClick={() => {setIsIndividual(true)}}
                      >
                      <p style = {{color: PullColorText(IsIndividual), fontSize: 15}}>Individual</p>
                      {isLoading && <ButtonCircularProgress />}
         </Button>

         <Button
                      //type="submit"
                      fullWidth
                      variant="contained"
                      //color="secondary"
                      style={{ backgroundColor: PullColor(!IsIndividual) }}
                      disabled={isLoading}
                      size="large"
                      onClick={() => {setIsIndividual(false)}}
                      >
                      <p style = {{color: PullColorText(!IsIndividual), fontSize: 15}}>Company/School</p>
                      {isLoading && <ButtonCircularProgress />}
         </Button>
        </div>


        <TextField
          variant="standard"
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
          variant="standard"
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

    

   
        
       
       
        <p></p>
        {ShowTestDropdown(true)}
        <p></p>
        <VisibilityPasswordTextField
          variant="standard"
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
          variant="standard"
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

        <div style={{marginTop:20}}>
                    <p>{CompanyCodeAlert}</p>
                  </div>





        <div class="loginButtonWrap">
                  <Button
                      //type="submit"
                      fullWidth
                      variant="contained"
                      //color="secondary"
                      style={{ backgroundColor: '#7494FB' }}
                      disabled={isLoading}
                      size="large"
                      onClick={() => {register()}}
                      >
                      Sign Up
                      {isLoading && <ButtonCircularProgress />}
                      </Button>
                  </div>
      </Fragment>
    

    
 

  );

      
    }else{
    return(
      
        <Fragment>
          <div className="rowDiv">
          <Button
                        //type="submit"
                        fullWidth
                        variant="contained"
                        //color="secondary"
                        style={{ backgroundColor: PullColor(IsIndividual) }}
                        disabled={isLoading}
                        size="large"
                        onClick={() => {setIsIndividual(true)}}
                        >
                        <p style = {{color: PullColorText(IsIndividual), fontSize: 15}}>Individual</p>
                        {isLoading && <ButtonCircularProgress />}
           </Button>

           <Button
                        ////type="submit"
                        fullWidth
                        variant="contained"
                        //color="secondary"
                        style={{ backgroundColor: PullColor(!IsIndividual) }}
                        disabled={isLoading}
                        size="large"
                        onClick={() => {setIsIndividual(false)}}
                        >
                        <p style = {{color: PullColorText(!IsIndividual), fontSize: 15}}>Company/School</p>
                        {isLoading && <ButtonCircularProgress />}
           </Button>
          </div>


          <TextField
            variant="standard"
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
            variant="standard"
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
            variant="standard"
            margin="normal"
            required
            fullWidth
            //error={status === "invalidEmail"}
            label=" Company/School Code"
            autoFocus
            autoComplete="off"
            //type="email"
            inputRef={registerCompanyCode}
            onChange={() => {
              if (status === "invalidEmail") {
                setStatus(null);
              }
              console.log("FInd Unique 3")
              var CurrCompanyCode = registerCompanyCode.current.value;
 
              setCompanyCodeAlert(FindIfCompanyCodeExists(CurrCompanyCode))

              setIsNewCompany(!CompanyCodesUnique.includes(CurrCompanyCode))

            }}
            FormHelperTextProps={{ error: true }}
          />
          {
            /*
          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            //error={status === "invalidEmail"}
            label="Compant Code (Enter a New Code if you are a new company)"
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
          />`
          */
          }
          {GetStudentNameForm()}
          <div style={{height:40}}></div>
          <Dropdown options={['Parent','Student','Tutor']} onChange={(s)=>{setregisterType(s)}} placeholder="Select an option"  />
          
          <p></p>
          {ShowTestDropdown()}
          <p></p>
          <VisibilityPasswordTextField
            variant="standard"
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
            variant="standard"
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

          <div style={{marginTop:20}}>
                      <p>{CompanyCodeAlert}</p>
                    </div>





          <div class="loginButtonWrap">
                    <Button
                        ////type="submit"
                        fullWidth
                        variant="contained"
                        //color="secondary"
                        style={{ backgroundColor: '#7494FB' }}
                        disabled={isLoading}
                        size="large"
                        onClick={() => {register()}}
                        >
                        Sign Up
                        {isLoading && <ButtonCircularProgress />}
                        </Button>
                    </div>
        </Fragment>
      
 
      
   
  
    );
    }
  }




  

  function SwitchInfo(){
    if(showLogin){
      return(

        <form id="login">
                    <div class="">
                    <TextField
                    variant="standard"
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
                    variant="standard"
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
         
                    </div>

                    <div class="loginButtonWrap">
                      <Button
                        ////type="submit"
                        fullWidth
                        //variant="contained"
                        //color="secondary"
                        disabled={isLoading}
                        size="large"
                        onClick={() => {login()}}
                        >
                        Login
                        {isLoading && <ButtonCircularProgress />}
                        </Button>
                    </div>

                    <div>
                      <Button
                        ////type="submit"
                        fullWidth
                        variant="contained"
                        //color="secondary"
                        style={{ backgroundColor: '#7494FB' }}
                        disabled={isLoading}
                        size="large"
                        onClick={()=>{setShowLogin(false)}}
                        >
                          Create Account
                        {isLoading && <ButtonCircularProgress />}
                        </Button>
                    </div>




                  
                </form>
      )
    }else{
      return(SignInInfo())
    }
  }


  /*

                    <Typography
                      align="center"
                      className={classNames(
                          classes.forgotPassword,
                          isLoading ? classes.disabledText : null
                      )}
                      color="secondary"
                      
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

  */

  return (
<body>
<div class="mobileMenu">
        <a href="index"><div class="mobileNavLinkBlock">
            <span class="selectedNavLink">Home</span>
        </div></a>
        <a href="about"><div class="mobileNavLinkBlock">
            <span class="navLink">About</span>
        </div></a>
        <a href="index#contact"><div class="mobileNavLinkBlock contactLinkMobile">
            <span class="navLink">Contact</span>   </div></a>
     
        <a href="login"><div class="mobileNavLinkBlock">
            <span class="navLink">Try Tutorspae</span>
        </div></a>
    </div>

    <nav>
        <div class="logo">
            <img src ={TutorSpaceNavLogo} alt="TutorSpace Logo"/>
        </div>
        <div class="navLinks">
            <a href="index"><span class="navLink">Home</span></a>
            <a href="about"><span class="navLink">About</span></a>
            <a href="index#contact"><span class="navLink">Contact</span></a>
            <a href="login"><span class="selectedNavLink">Try Tutorspace</span></a>
            <xml version="1.0" encoding="UTF-8"><svg id="menuIcon" width="20px" height="20px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#2e4756"><path d="M3 5h18M3 12h18M3 19h18" stroke="#2e4756" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></xml>
        </div>
    </nav>
   
    <section class ="loginSection">
        <div class="loginSectionContent">
            <div class="loginForm">
                {SwitchInfo()}
            </div>
        </div>
    </section>

   

    <section class="section5">
        <div class="section5Content">
            <h3 id="loginPricing">Not a user yet? Get started with TutorSpace today!</h3>
            <div class="pricingBoxes">
                <div class="starterPricing priceBox" data-aos="fade-up" data-aos-duration="250">
                    <h4>Starter</h4>
                    <p>Up to 15 student seats</p>
                    <div class="listedCost starterCost">
                        <span class="bigDollar">$5</span>
                        <div class="smallCost">
                            <p><span class="perStudent">per student</span></p>
                            <p><span class="costCaption">billed monthly</span></p>
                        </div>
                    </div>
                </div>
                
                <div class="businessPricing priceBox" data-aos="fade-up" data-aos-duration="350">
                    <h4>Business</h4>
                    <p>Up to 50 student seats</p>
                    <div class="listedCost businessCost">
                        <span class="bigDollar">$3</span>
                        <div class="smallCost">
                            <p><span class="perStudent">per student</span></p>
                            <p><span class="costCaption">billed monthly</span></p>
                        </div>
                    </div>
                </div>

                <div class="enterprisePricing priceBox" data-aos="fade-up" data-aos-duration="450">
                    <h4>Enterprise</h4>
                     <p>Need more seats? Let’s talk!</p>
                     <a href="index.html#contact"><button class="enterpriseCTA">Contact Us</button></a>
                </div>
            </div>

            <div class ="freeTrialCaption">
                <p>Try <span class="bold">TutorSpace</span> for free for 1 month, no strings attached!</p>
            </div>
        </div>
    </section>

    <footer>
        <div class="footerLogo">
            <img src={TutorSpaceFooterLogo} alt="TutorSpace Logo"/>
        </div>

        <div class="navLinks">
            <a href="index.html"><span class="navLink">Home</span></a>
            <a href="about.html"><span class="navLink">About</span></a>
            <a href="index.html#contact"><span class="navLink">Contact</span></a>
            <a href="login.html"><span class="navLink">Try Tutorspace</span></a>
        </div>
    </footer>

</body>
  );
}

Login.propTypes = {

    classes: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    setStatus: PropTypes.func.isRequired,
    openChangePasswordDialog: PropTypes.func.isRequired,
    history: PropTypes.object.isRequired,
    status: PropTypes.string,
    openRegisterDialog: PropTypes.func.isRequired,

};

export default withStyles(styles, { withTheme: true })(Login);
