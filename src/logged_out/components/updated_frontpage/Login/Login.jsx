import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, logInWithEmailAndPassword, registerWithEmailAndPassword } from "../../../../firebase.client.js";
import Nav from "../Nav";
import Footer from "../Footer";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { useHistory } from "react-router-dom";
import { doc, onSnapshot, collection, query, where,updateDoc, arrayUnion, arrayRemove, setDoc , deleteDoc} from "firebase/firestore";
import '@firebase/firestore';
//import {  db, storage} from "../../../firebase.client.js";
import { db } from "../../../../firebase.client.js";


const Login = () => {
    // Existing state and ref variables
    const [isLoading, setIsLoading] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const loginEmail = useRef();
    const loginPassword = useRef();
    const registerEmail = useRef();
    const registerPassword = useRef();
    const registerPasswordRepeat = useRef();
    const registerPhoneNumber = useRef();
    const registerStudentName = useRef();
    const registerCompanyCode = useRef();
    const registerName = useRef();
    const [IsNewCompany, setIsNewCompany] = useState(false);
    const [IsIndividual, setIsIndividual] = useState(true)
    const [registerType, setregisterType] = useState(null);
    const [registerTest, setregisterTest] = useState(null);
    const [DropdownError, setDropdownError] = useState(false)
  

    const [user, loading, error] = useAuthState(auth);
    const history = useHistory();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [userType, setUserType] = useState("Company"); // New state for user type
    const [CompanyCodes, setCompanyCodes] = useState([]);
    const [CompanyCodesUnique, setCompanyCodesUnique] = useState([]);

    const [companyCode, setCompanyCode] = useState('');


    const usersRef = collection(db, "users");

    useEffect(() => {
      if(userType == 'Individual'){
        setIsIndividual(true)
      }
      else{
        setIsIndividual(false)
      }
    },[userType])
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
      if(IsIndividual){
        return(null)
      }
      if(CompanyCodes.includes(CompanyCode)){
        console.log('In true')
        return("You are joining an existing company/school.")
      }
      else{
        return("You are creating a new company/school account. Make sure you select the correct code.")
        
      }
    }

    function ShowDropdownError(){
        if(DropdownError ){
          return(<p style={{ color: 'red', fontSize:15}}>Error: Missing Data</p>)
        }else{
          return(null)
        }
      }

    function findUniqueValues(arr) {
        let uniqueValues = [];
      
        arr.forEach(function(value) {
          if (!uniqueValues.includes(value)) {
            uniqueValues.push(value);
          }
        });
      
        return uniqueValues;
      }


    const getButtonStyle = (type) => {
        const baseStyle = "btn mx-2 border";
        const selectedStyle = " bg-blue-500 text-white";
        return `${baseStyle} ${type === userType ? selectedStyle : ''}`;
    };

    // Existing login function
    const login = useCallback(async () => {
        setIsLoading(true);
        try {
            await logInWithEmailAndPassword(loginEmail.current.value, loginPassword.current.value);
            history.push("/c/dashboard");
            window.location.reload();
            setTimeout(() => {
              window.location.reload();
            }, 750);
            setTimeout(() => {
              window.location.reload();
            }, 1000);
        } catch (err) {
            alert(err.message);
            setIsLoading(false);
        }
    }, [loginEmail, loginPassword]);

    // New register function
    const register = useCallback(async () =>{

        console.log('In Register')
        console.log(registerType)
        console.log(registerTest)
        console.log(registerCompanyCode)
        console.log(registerStudentName)
        
        console.log(registerName)
        console.log(registerName.current.value)
        console.log(registerEmail.current.value)
        console.log(registerPassword.current.value)
        console.log(registerPasswordRepeat.current.value)

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
        /*
        if (!registerTermsCheckbox.current.checked) {
          setHasTermsOfServiceError(true);
          return;
        }
        */
        if (
          registerPassword.current.value !== registerPasswordRepeat.current.value
        ) {
          console.log('passwords dont match')
          alert('Passwords do not match');
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
     
        
        registerPassword,
        registerPasswordRepeat,
        
        registerEmail,
        registerName,
        registerType,
        registerTest,
        history,
        registerStudentName,
        registerPhoneNumber,
        registerCompanyCode
      ]);

    // Function to toggle between login and registration
    const toggleForm = () => {
        setIsRegistering(!isRegistering);
    };

    function ShowTestDropdown(forceTest = false){
        try{
          if(forceTest){
            return(
              <>
                <label htmlFor="registerTest" className="">Test</label>
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
                <label htmlFor="registerTest" className="">Test</label>
                <Dropdown options={['SAT','ACT','Diagnostics']} onChange={(x)=>{setregisterTest(x)}} placeholder="Select a test"  />
              </>
            )
          }
        }catch(e){
          return(null)
        }
      }

    function ShowCompanyCode(){
        if(userType == 'Company'){
            return(
                <div className="inline-block">
                    <label htmlFor="registercompanycode" className="">Company Code</label>
                    <input type="text" name="registercompanycode" ref={registerCompanyCode} onChange={()=>{setCompanyCode(registerCompanyCode.current.value)}} className="w-full bg-secondary p-1 text-accent mt-1 rounded focus:outline-none" required />
                </div>
            )
        }else{
            return(null)
        }
    }

    function ShowStudentName(){
        try{
            if(registerType.value == 'Parent'){
                return(
                    <div className="inline-block">
                        <label htmlFor="registerstudentname" className="">Student Name</label>
                        <input type="text" name="registerstudentname" ref={registerStudentName} className="w-full bg-secondary p-1 text-accent mt-1 rounded focus:outline-none" required />
                    </div>
                )
            }else{
                return(null)
            }
        } catch(e){
            return(null)
        }

    }


  
    function ShowAccountType(){
        if(!IsIndividual){
          return(
            <div className="inline-block">
              <label htmlFor="registerType" className="">Account Type</label>
              <Dropdown options={['Parent','Student','Tutor']} onChange={(s)=>{setregisterType(s)}} placeholder="Select an option"  />
            </div>
          )
        }else{
          return(null)
        }
    }


    return (
        <>
         
            <Nav />
            <div className="min-h-screen flex flex-col justify-center items-center m-4 sm:m-6 md:m-8 lg:m-10 xl:m-12">
                <h3 className="text-center text-accent my-3 text-xl xl:text-3xl xl:py-6">
                    {isRegistering ? "Create an Account" : "Log in to Tutorspace"}
                </h3>
                <div className="bg-accent rounded-lg p-4 sm:p-8 md:p-12 lg:p-16 mx-auto text-xl text-secondary lg:text-2xl">
                    {isRegistering ? (
                         <form className="grid grid-cols-1 gap-4" onSubmit={(e) => { e.preventDefault(); register(); }}>
                            <div className="flex justify-center space-x-2">
                                <button className={getButtonStyle("Company")} onClick={() => setUserType("Company")}>Company</button>
                                <button className={getButtonStyle("Individual")} onClick={() => setUserType("Individual")}>Individual</button>
                            </div>
                         <div className="inline-block">
                             <label htmlFor="registername" className="">Name</label>
                             <input type="text" name="registername" ref={registerName} className="w-full bg-secondary p-1 text-accent mt-1 rounded focus:outline-none" required />
                         </div>
                         <div className="inline-block">
                             <label htmlFor="registeremail" className="">Email</label>
                             <input type="text" name="registeremail" ref={registerEmail} className="w-full bg-secondary p-1 text-accent mt-1 rounded focus:outline-none" required />
                         </div>
                         {ShowAccountType()}
                         <p></p>
                         {ShowStudentName()}
                         {ShowTestDropdown()}
                         <p></p>
                         {ShowCompanyCode()}
                         <div className="inline-block">
                             <label htmlFor="registerpassword" className="">Password</label>
                             <input type="password" name="registerpassword" ref={registerPassword} className="w-full bg-secondary p-1 text-accent mt-1 rounded focus:outline-none" required />
                         </div>
                         <div className="inline-block">
                             <label htmlFor="registerpasswordrepeat" className="">Repeat Password</label>
                             <input type="password" name="registerpasswordrepeat" ref={registerPasswordRepeat} className="w-full bg-secondary p-1 text-accent mt-1 rounded focus:outline-none" required />
                         </div>
                         
                           
                         <p className="text-center max-w-sm ml-5">{FindIfCompanyCodeExists(companyCode)}</p>

                             
                         {ShowDropdownError()}
             
                         <button className="btn btn-secondary mt-10" type="submit" disabled={isLoading}> 
                             {isLoading ? 'Creating account...' : 'Create Account'}
                         </button>
                     </form>
                    ) : (
                        <form className="grid grid-cols-1 gap-4" onSubmit={(e) => { e.preventDefault(); login(); }}>
                        <div className="inline-block">
                            <label htmlFor="loginemail" className="">Email</label>
                            <input type="text" name="loginemail" ref={loginEmail} className="w-full bg-secondary p-1 text-accent mt-1 rounded focus:outline-none" required />
                        </div>
                        <div className="inline-block">
                            <label htmlFor="loginpassword" className="">Password</label>
                            <input type={isPasswordVisible ? "text" : "password"} name="loginpassword" ref={loginPassword} className="w-full bg-secondary p-1 text-accent mt-1 rounded focus:outline-none" required />
                        </div>
                        <button className="btn btn-secondary mt-10" type="submit" disabled={isLoading}>
                            {isLoading ? 'Logging in...' : 'Log In'}
                        </button>
                    </form>
                    )}
                    <div className="mt-10 flex justify-center">
                    <button className="btn btn-secondary mt-10" onClick={toggleForm}>
                        {isRegistering ? "Already have an account? Log In" : "Create an Account"}
                    </button>
                   
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Login;
