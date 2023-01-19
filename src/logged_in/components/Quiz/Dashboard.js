import React, { Fragment, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Typography, Box } from "@mui/material";
import SettingsArea from "./SettingsArea";
import UserDataArea from "./UserDataArea";
import AccountInformationArea from "./AccountInformationArea";
import StatisticsArea from "./StatisticsArea";
import FileInputs from "./FileInputs"
//import TextInput from './TextInput'
//import Options from "./Options"
import withTheme from '@mui/styles/withTheme';
import AlertTemplate from "react-alert-template-basic"
import {positions, Provider, useAlert} from "react-alert"

import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import ReactHover, { Trigger, Hover } from "react-hover";
import SubscriptionInfo from "./SubscriptionInfo";
import { CirclesWithBar } from 'react-loader-spinner'
import "./style.css";
import { auth, getNames, db, storage} from "../../../firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, onSnapshot, collection, query, where,updateDoc } from "firebase/firestore";
import Spreadsheet from "react-spreadsheet";
import '@firebase/firestore';
import Quiz from './libQuiz/Quiz';
import {  ref, getDownloadURL } from "firebase/storage";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Taskmanager from 'react-drag-taskmanager';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaRegStickyNote } from "react-icons/fa";
import Modal from 'react-modal';

/*==
const handleSubmission = () => {
 
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
*/


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
        <p>{fieldClassName}</p>
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



function GetInput(){

	const [InputValue, setInputValue] = useState('hey')

  const changeHandler = (event) => {
		setInputValue(event.target.value);
	
	};

  return(
    <>
    <p style={{color:'white', fontSize:'20px'}}>{InputValue}</p>
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
      onChange={changeHandler}
      active={false}
   
    />
   
    </>
  );
}



	
	

	const optionsAlert = {
		// you can also just use 'bottom center'
		position: positions.BOTTOM_CENTER,
		timeout: 5000,
		
	}

	const AlertRoot = () => (
		<Provider template={AlertTemplate} {...optionsAlert}>

		</Provider>
	)

	function GetAlert(){
		
	}
	

	/*
	{isFilePicked ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
					<p>errorCheck: {errorCheck}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</p>
				</div>
			) : (
				<p>Select a file to show details</p>
			)}
	*/



  


function GetLoadingScreen(){
    return(
      <CirclesWithBar
        height="200"
        width="200"
        color="white"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        outerCircleColor=""
        innerCircleColor=""
        barColor=""
        ariaLabel='circles-with-bar-loading'
      />
    )
}


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

  const [ErrorMessage, setErrorMessage] = useState('')
  const [UserName, setUserName] = useState([''])
  const [Type, setType] = useState(['1'])
  const [QuizData, setQuizData] = useState()
  const [UserEmail, setUserEmail] = useState([])
  const quizesRef = collection(db, "Quizes");
  const [CurrentQuizTopic, setCurrentQuizTopic] = useState('ComplexNumbers')
  //const storage = getStorage();
  const [CurrentImageURL, setCurrentImageURL] = useState('')
  const [MyName, setMyName] = useState('');
  const [Students, setStudents] = useState()
  const [NameId, setNameId] = useState([])
  const usersRef = collection(db, "users");
  const [ErrorUpdate, setErrorUpdate] = useState(1)
  const [CurrentStudent, setCurrentStudent] = useState('')
  const [StudentAssignments, setStudentAssignments] = useState([['Finish Chapter 1', false,0]])
  const [Topics, setTopics] = useState([['Topic 1', false], ['Topic 2', false], ['Topic 3', false]]);
  const [TopicsBool, setTopicsBool] = useState([false,false,false])
  const [NextCurrentStudentDate, setNextCurrentStudentDate] = useState(new Date());
  const [TextOutput, setTextOutput] = useState('')

  useEffect(() => {
    try{
      const x = query(usersRef, where("uid", "==", auth.currentUser.uid.toString()));
      //console.log(x)
      //const q = query(collection(db, "users"))
      const unsub = onSnapshot(x, (querySnapshot) => {
      //console.log(querySnapshot.docs[0]._document.data.value.mapValue.fields.name.stringValue)
      //querySnapshot.docs.map(d => setUserNames(UserNames.push(d._document.data.value.mapValue.fields.name.stringValue)))
      //console.log("Data", querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.name.stringValue));
      setUserName( querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.name.stringValue));

      var UserType = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.Type.stringValue)
      setType(UserType[0]);
      
      if(UserType == 'Tutor'){
        
        setStudents(querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.Students.arrayValue.values))
      }
      
      
  });
     
     //setErrorMessage(unsub())
    // return cleanup function
    //return () => subscriber();
    }catch(err){
     
      setErrorMessage(err.toString())
      setTimeout(() => {
        setErrorUpdate(ErrorUpdate+1);
      }, 1000)
      //setErrorUpdate(ErrorUpdate+1)
    }
  }, [ErrorUpdate]); // empty dependencies array => useEffect only called once

  /*
  Grab all names/uids
  */
  useEffect(() => {
    try{
      const z = query(usersRef);
      //console.log(x)
     //const q = query(collection(db, "users"))
    const unsub = onSnapshot(z, (querySnapshot) => {
      //console.log(querySnapshot.docs[0]._document.data.value.mapValue.fields.name.stringValue)
      //querySnapshot.docs.map(d => setUserNames(UserNames.push(d._document.data.value.mapValue.fields.name.stringValue)))
      //console.log("Data", querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.name.stringValue));
      var NewArr = NameId
  
      if(NameId){
        //setNameId
       
        querySnapshot.docs.map(d => NewArr[NewArr.length] = ([d._document.data.value.mapValue.fields.name.stringValue, d.id,d._document.data.value.mapValue.fields.uid.stringValue]) )
        //console.log(NewArr)
        setNameId(NewArr)
      }
      
      
      
      
  });
     
     //setErrorMessage(unsub())
    // return cleanup function
    //return () => subscriber();
    }catch(err){
      console.log("Error")
      console.log(err)
      setErrorMessage(err.toString())
    }
  }, [NameId]); // empty dependencies array => useEffect only called once

  function LoadImage(path){

    getDownloadURL(ref(storage, path.toString()))


    .then((url) => {
      console.log("HeyNeato")
      console.log(url)
      /*
      // `url` is the download URL for 'images/stars.jpg'

      // This can be downloaded directly:
      const xhr = new XMLHttpRequest();
      xhr.responseType = 'blob';
      xhr.onload = (event) => {
        const blob = xhr.response;
      };
      xhr.open('GET', url);
      xhr.send();

      // Or inserted into an <img> element
      */
     //setCurrentImageURL(url)
     return(url)
      //const img = document.getElementById('myimg');
      //img.setAttribute('src', url);
      

    })
    .catch((error) => {
      // Handle any errors
      console.log("Image Error")
      console.log(error)
    });
  }

  function ChangeImage(QuestionPackage,NumQuestion, NumberOfQuestions){
    //[Number of questions, Question path]


    //QuestionPackage = 'ComplexNumbers'
    
    var QuestionsInPackageArr = [[NumberOfQuestions,'SAT{}/SAT{}().png']]
    var CurrNum = QuestionsInPackageArr[QuestionPackage-1[0]]
    console.log("COOL")

    console.log(QuestionsInPackageArr)
    console.log([NumQuestion])

    var Path = QuestionsInPackageArr[NumQuestion][1].replaceAll('{}',QuestionPackage).replaceAll('()',(parseInt(NumQuestion)+1).toString())

    
    var URLPic = LoadImage(Path)
    return(URLPic)
  }
  /*
  Get Quiz Data
  */
  useEffect(() => {
    try{
      const x = query(quizesRef, where("Topic", "==", CurrentQuizTopic.toString()));

    const unsub = onSnapshot(x, (querySnapshot) => {
      //console.log(querySnapshot.docs[0]._document.data.value.mapValue.fields.name.stringValue)
      //querySnapshot.docs.map(d => setUserNames(UserNames.push(d._document.data.value.mapValue.fields.name.stringValue)))
      //console.log("Data", querySnapshot.docs.map(d => d._document.data.value.mapValue.fields));
      setQuizData( querySnapshot.docs.map(d => d._document.data.value.mapValue.fields));
    });
  
     //setErrorMessage(unsub())
    // return cleanup function
    //return () => subscriber();
    //unsub()
    }catch(err){
      console.log("Error")
      console.log(err)
      setErrorMessage(err.toString())
    }
  }, []); // empty dependencies array => useEffect only called once

  const [StudentData, setStudentData] = useState();
   /*
  Get Student Data
  */

 const StudentRef = collection(db, "users");
 useEffect(() => {
  try{
    const x = query(quizesRef, where("Tutor", "==", UserName.toString()));

  const unsub = onSnapshot(x, (querySnapshot) => {
    //console.log(querySnapshot.docs[0]._document.data.value.mapValue.fields.name.stringValue)
    //querySnapshot.docs.map(d => setUserNames(UserNames.push(d._document.data.value.mapValue.fields.name.stringValue)))
 
    setStudentData( querySnapshot.docs.map(d => d._document.data.value.mapValue.fields));
  });

   //setErrorMessage(unsub())
  // return cleanup function
  //return () => subscriber();
  //unsub()
  }catch(err){
    console.log("Error")
    console.log(err)
    setErrorMessage(err.toString())
  }
}, []); // empty dependencies array => useEffect only called once

function PullDate(s){
  function FindMatchingUid(){
    //NameId
    //CurrentStudent
    
      for(var i = 0; i< NameId.length; i++){
      
        if(s.value == NameId[i][0]){
          return(NameId[i][2])
        }
      }
    }

      
      
      const x = query(usersRef, where("uid", "==", FindMatchingUid())) //query(usersRef, where("id", "==", FindMatchingUid()));
      var NewArr = []
      const unsub = onSnapshot(x, (querySnapshot) => {
        var AssignmentString = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.NextMeetingDate.timestampValue)

        //console.log(new Date(AssignmentString[0]))
        var DateX = new Date(AssignmentString[0].toString())

        setNextCurrentStudentDate(DateX)
        
      });

      if(Type == 'Student' || Type == 'Parent'){
      
      }else if(Type == 'Tutor'){

      }
}

function UpdateDate(){
  // d could just feed in date
  if(CurrentStudent !== ''){
    function FindMatchingUid(){
      //NameId
      //CurrentStudent
      
      for(var i = 0; i< NameId.length; i++){
      
        if(CurrentStudent.value == NameId[i][0]){
          return(NameId[i][1])
        }
      }
    }

    const studentDef = doc(db, "users", FindMatchingUid());

    updateDoc(studentDef, {
            NextMeetingDate: NextCurrentStudentDate
          
            });
          }
  }

  useEffect(()=>{
    UpdateDate()
  },[NextCurrentStudentDate])


  function PullNotepad(s){
    function FindMatchingUid(){
      //NameId
      //CurrentStudent
      
        for(var i = 0; i< NameId.length; i++){
        
          if(s.value == NameId[i][0]){
            return(NameId[i][2])
          }
        }
      }
  
        
        
        const x = query(usersRef, where("uid", "==", FindMatchingUid())) //query(usersRef, where("id", "==", FindMatchingUid()));
       
        const unsub = onSnapshot(x, (querySnapshot) => {
          var AssignmentString = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.Notepad.stringValue)
  
          //console.log(new Date(AssignmentString[0]))
         
  
          setTextOutput(AssignmentString)
          
        });
  
        if(Type == 'Student' || Type == 'Parent'){
        
        }else if(Type == 'Tutor'){
  
        }
  }

  function UpdateNotepad(){
    // d could just feed in date

    if(CurrentStudent !== ''){
      function FindMatchingUid(){
        //NameId
        //CurrentStudent
        
        for(var i = 0; i< NameId.length; i++){
        
          if(CurrentStudent.value == NameId[i][0]){
            return(NameId[i][1])
          }
        }
      }
  
      const studentDef = doc(db, "users", FindMatchingUid());
  
      updateDoc(studentDef, {
              Notepad: TextOutput
            
              });
            }
  }

  useEffect(()=>{
    UpdateNotepad()
  },[TextOutput])

  function RemoveAssignments(){
    function FindMatchingUid(){
      //NameId
      //CurrentStudent
      
      for(var i = 0; i< NameId.length; i++){
      
        if(CurrentStudent.value == NameId[i][0]){
          return(NameId[i][1])
        }
      }
    }

    const studentDef = doc(db, "users", FindMatchingUid());

    updateDoc(studentDef, {
            assignments: ''
          
            });

  }
  function UpdateDoneAssignments(AssignmentNumber, Bool){

    function FindMatchingUid(){
      //NameId
      //CurrentStudent
      
      for(var i = 0; i< NameId.length; i++){
      
        if(CurrentStudent.value == NameId[i][0]){
          return(NameId[i][1])
        }
      }
    }
    const studentDef = doc(db, "users", FindMatchingUid());

    var AssignmentArr =  StudentAssignments.split('%')
    AssignmentArr[AssignmentNumber][1] = Bool

    for(var i = 0; i < StudentAssignments.length; i++){
      for(var x = 0; x<3; x++){
        console.log(StudentAssignments[i][x])
        ArrString = ArrString + StudentAssignments[i][x].toString() + '+'
      }
      ArrString = ArrString.slice(0, -1)
      ArrString = ArrString + '%'
    }
    var ArrString = ''


  updateDoc(studentDef, {
            assignments: ArrString.slice(0, -1) 
          
            });

  }  


  function UpdateStudentAssignments(){

    if(CurrentStudent !== ''){
      function FindMatchingUid(){
        //NameId
        //CurrentStudent
        
        for(var i = 0; i< NameId.length; i++){
        
          if(CurrentStudent.value == NameId[i][0]){
            return(NameId[i][1])
          }
        }
      }
    
      const studentDef = doc(db, "users", FindMatchingUid());
      var ArrString = ''
      
      for(var i = 0; i < StudentAssignments.length; i++){
        for(var x = 0; x<3; x++){
          console.log(StudentAssignments[i][x])
          ArrString = ArrString + StudentAssignments[i][x].toString() + '+'
        }
        ArrString = ArrString.slice(0, -1)
        ArrString = ArrString + '%'
      }
   

      if(Type == 'Student' || Type == 'Parent'){

      }else if(Type == 'Tutor'){
        updateDoc(studentDef, {
          assignments: ArrString.slice(0, -1) 
          });
      }
    }
  }



  function PullStudentAssignments(s){
 
    function FindMatchingUid(){
      //NameId
      //CurrentStudent
      
        for(var i = 0; i< NameId.length; i++){
        
          if(s.value == NameId[i][0]){
            return(NameId[i][2])
          }
        }
      }

        console.log('pul')
        
        const x = query(usersRef, where("uid", "==", FindMatchingUid())) //query(usersRef, where("id", "==", FindMatchingUid()));
        var NewArr = []
        const unsub = onSnapshot(x, (querySnapshot) => {
          var AssignmentString = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.assignments.stringValue)
          console.log(querySnapshot.docs.map(d => d))
          console.log( AssignmentString[0]);
          var AssignmentArr = AssignmentString[0].split('%')
          
         
          console.log(AssignmentArr.length)
          for(var i = 0; i< AssignmentArr.length; i++){
            var TempArr = []
            var Splitter = AssignmentArr[i].split('+')
            TempArr[0] = Splitter[0]
            if(Splitter[1] == 'true'){
              TempArr[1] = true
            }
            else{
              TempArr[1] = false
            }
            
            TempArr[2] = parseInt(Splitter[2])
            
            NewArr[i] = TempArr
           
          }
         
          setStudentAssignments(NewArr)
        });

        if(Type == 'Student' || Type == 'Parent'){

       
        
        }else if(Type == 'Tutor'){

        }
      
  }
 
  
  //const [user, loading, error] = useAuthState(auth);
	const [selectedFile, setSelectedFile] = useState();
  const [selectedText, setSelectedText] = useState('N/A');
  const [selectedTitle, setSelectedTitle] = useState('');
	const [isFilePicked, setIsFilePicked] = useState(false);

  const [numProjectsLeft, setNumProjectsLeft] = useState(10)
  const [TitleOutput, setTitleOutput] = useState()
  
  const [Email, setEmail] = useState('N/A')
  const [EmailSubmitted, setEmailSubmitted] = useState(false)
  const [PageSwitch, setPageSwitch] = useState(1)
  //const [globalEmail, setGlobalEmail] = useGlobal('x');	
  //let Users = firebase.firestore().collection('users');
  const [UsersX, setUsersX] = useState([])
  
	





  const handleTextChange = event => {
    // 👇️ update textarea value
    setTextOutput(event.target.value);
    //setSelectedText(event.target.value)
  };


  const [posts, setPosts] = useState([]);
  
  
  

  useEffect(selectDashboard, [selectDashboard]);
  const Name = 'Joseph'
  const [name, setName] = useState()
  const [info , setInfo] = useState([]);
 


 

  
  const [errorCheck, setErrorCheck] = useState()
	//const alert = useAlert();
  //const alert = useAlert();


 



  const [QuizLoaded, setQuizLoaded] = useState(0)

 
  
 
  function QuizBuilder(){
    /*  
      //CorrectAnswer
      console.log(QuizData[0]['Question1'].arrayValue.values[0].stringValue)
      //Explanation
      console.log(QuizData[0]['Question1'].arrayValue.values[1].stringValue)
      //Topic
      console.log(QuizData[0]['Topic'].stringValue)
    */

    console.log("In quiz")
    
    var CurNum = 0
    var TotalNum = parseInt(QuizData[0]['nrOfQuestions'].stringValue)
   
    console.log(QuizData[0]['Topic'].stringValue)

    console.log(Header)
    var List = []
    for(var x = 0; x <TotalNum; x++){

      var Temp = {
        "question": "How can you access the state of a component from inside of a member function?",
        "questionType": "text",
        "questionPic": ChangeImage(QuizData[x]['Topic'].stringValue,CurNum, parseInt(QuizData[x]['nrOfQuestions'].stringValue)), // if you need to display Picture in Question
        "answerSelectionType": "single",
        "answers": [
          "A",
          "B",
          "C",
          "D"
        ],
        "correctAnswer": QuizData[x]['Question1'].arrayValue.values[0].stringValue,
        "messageForCorrectAnswer": "Correct answer. Good job!",
        "messageForIncorrectAnswer": "Incorrect answer. Please try again!",
        "explanation": QuizData[x]['Question1'].arrayValue.values[1].stringValue,
        "point": "20"
      }
      List.push(Temp)
    }


    var Header = {
      "quizTitle": QuizData[0]['quizTitle'].stringValue,
      "quizSynopsis":QuizData[0]['quizSynopsis'].stringValue ,
      "nrOfQuestions": QuizData[0]['nrOfQuestions'].stringValue,
      "questions": List
    }

    
  }

  useEffect(()=>{
    if(QuizData){
      QuizBuilder()
    }
    
  },[])

  const segment = {
    basic: 'basic',
    medium: 'medium',
    advanced: 'advanced',
  };

  const quizTest =  {
    quizTitle: 'React Quiz Component Demo',
  quizSynopsis: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim',
  nrOfQuestions: '6',
  questions: [
    {
      question: 'How can you access the state of a component from inside of a member function?',
      questionPic: 'https://dummyimage.com/600x400/000/fff&text=X',
      questionType: 'text',
      answerSelectionType: 'single',
      answers: [
        'this.getState()',
        'this.prototype.stateValue',
        'this.state',
        'this.values',
      ],
      correctAnswer: '3',
      messageForCorrectAnswer: 'Correct answer. Good job.',
      messageForIncorrectAnswer: 'Incorrect answer. Please try again.',
      explanation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      point: '20',
      segment: segment.advanced,
    },
    {
      question: 'ReactJS is developed by _____?',
      questionType: 'text',
      answerSelectionType: 'single',
      answers: [
        'Google Engineers',
        'Facebook Engineers',
      ],
      correctAnswer: '2',
      messageForCorrectAnswer: 'Correct answer. Good job.',
      messageForIncorrectAnswer: 'Incorrect answer. Please try again.',
      explanation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      point: '20',
      segment: segment.basic,
    },
    {
      question: 'ReactJS is an MVC based framework?',
      questionType: 'text',
      answerSelectionType: 'single',
      answers: [
        'True',
        'False',
      ],
      correctAnswer: '2',
      messageForCorrectAnswer: 'Correct answer. Good job.',
      messageForIncorrectAnswer: 'Incorrect answer. Please try again.',
      explanation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      point: '10',
    },
    {
      question: 'Which of the following concepts is/are key to ReactJS?',
      questionType: 'text',
      answerSelectionType: 'single',
      answers: [
        'Component-oriented design',
        'Event delegation model',
        'Both of the above',
      ],
      correctAnswer: '3',
      messageForCorrectAnswer: 'Correct answer. Good job.',
      messageForIncorrectAnswer: 'Incorrect answer. Please try again.',
      explanation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      point: '30',
      segment: segment.medium,
    },
    {
      question: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit,',
      questionType: 'photo',
      answerSelectionType: 'single',
      answers: [
        'https://dummyimage.com/600x400/000/fff&text=A',
        'https://dummyimage.com/600x400/000/fff&text=B',
        'https://dummyimage.com/600x400/000/fff&text=C',
        'https://dummyimage.com/600x400/000/fff&text=D',
      ],
      correctAnswer: '1',
      messageForCorrectAnswer: 'Correct answer. Good job.',
      messageForIncorrectAnswer: 'Incorrect answer. Please try again.',
      explanation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      point: '20',
    },
    {
      question: 'What are the advantages of React JS?',
      questionType: 'text',
      answerSelectionType: 'multiple',
      answers: [
        'React can be used on client and as well as server side too',
        'Using React increases readability and makes maintainability easier. Component, Data patterns improves readability and thus makes it easier for manitaining larger apps',
        'React components have lifecycle events that fall into State/Property Updates',
        'React can be used with any other framework (Backbone.js, Angular.js) as it is only a view layer',
      ],
      correctAnswer: [1, 2, 4],
      messageForCorrectAnswer: 'Correct answer. Good job.',
      messageForIncorrectAnswer: 'Incorrect answer. Please try again.',
      explanation: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      point: '20',
    },
  ],
  } 
  const [CurrentTestNumber, setCurrentTestNumber] = useState(1)
  const [data, setData] = useState([
    [{ value: "Test" }, { value: "Section" },{ value: "Question" }, { value: "Subject" },{ value: "Detail" },{ value: "Student answer" },{value:'Correct Answer'},{ value: "Outcome" }],
    
  ]);
  function UpdateStudentData(TempArr){
    if(CurrentStudent !== ''){
      function FindMatchingUid(){
        for(var i = 0; i< NameId.length; i++){
        
          if(CurrentStudent.value == NameId[i][0]){
            return(NameId[i][1])
          }
        }
      }
      const studentDef = doc(db, "users", FindMatchingUid());
      var ArrString = ''
      for(var i = 0; i < TempArr.length; i++){
        ArrString = ArrString + TempArr[i].toString() + '+'
      }
      if(Type == 'Student' || Type == 'Parent'){

      }else if(Type == 'Tutor'){
        if(CurrentTestNumber == 1){
          updateDoc(studentDef, {
            Test1: ArrString.slice(0, -1) 
            });
        }
      }
    }
  }
  

  function CompileTestData(TestNum){
    var SATSections = "Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C"
    var SATSectionsArr = SATSections.split(',')
    var SATSectionNumber = "1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4"
    var SATSectionNumberArr = SATSectionNumber.split(',')
    var SATQuestion = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38"
    var SATQuestionArr = SATQuestion.split(',')
    var SATDetails1 = "Fiction,Fiction,Fiction,Fiction,Fiction,Fiction,Fiction,Fiction,Fiction,Fiction,Social Science,Social Science,Social Science,Social Science,Social Science,Social Science,Social Science,Social Science,Social Science,Social Science,Social Science,Natural Science,Natural Science,Natural Science,Natural Science,Natural Science,Natural Science,Natural Science,Natural Science,Natural Science,Natural Science,Historical Documents,Historical Documents,Historical Documents,Historical Documents,Historical Documents,Historical Documents,Historical Documents,Historical Documents,Historical Documents,Historical Documents,Paired Passages,Paired Passages,Paired Passages,Paired Passages,Paired Passages,Paired Passages,Paired Passages,Paired Passages,Paired Passages,Paired Passages,Paired Passages,Diction, idioms, and register (5),Add, revise, or delete (1),Apostrophes (13),Punctuation (10,11,12),Sentence and paragraph order (2),Add, revise, or delete (1),Diction, idioms, and register (5),Verb agreement and tense (15),Transitions (8),Diction, idioms, and register (5),Transitions (8),Infographics (3),Combining and separating sentences (7),Transitions (8),Non-essential and essential clauses (9),Punctuation (10,11,12),Sentences and fragments (6),Verb agreement and tense (15),Pronoun and noun agreement (14),Add, revise, or delete (1),Shorter is better (4),Sentence and paragraph order (2),Shorter is better (4),Modification (18),Diction, idioms, and register (5),Punctuation (10,11,12),Transitions (8),Add, revise, or delete (1),Infographics (3),Pronoun and noun agreement (14),Sentence and paragraph order (2),Punctuation (10,11,12),Diction, idioms, and register (5),Transitions (8),Shorter is better (4),Verb agreement and tense (15),Add, revise, or delete (1),Transitions (8),Shorter is better (4),Verb agreement and tense (15),Apostrophes (13),Add, revise, or delete (1),Pronoun and noun agreement (14),Pronoun and noun agreement (14),Solving algebraic equations (8),Complex numbers (19),Constructing models (7),Lines (14),Expressions (6),Lines (14),Expressions (6),Expressions (6),Systems of equations (10),Quadratics (17),Systems of equations (10),Lines (14),Expressions (6),Exponents and radicals (1),Matching coefficients (9),Quadratics (17),Triangles (22),Systems of equations (10),Trigonometry (24),Systems of equations (10),Reading data (25),Ratio and proportion (5),Angles (21),Word problems (12),Exponential and linear growth (3),Ratio and proportion (5),Reading data (25),Absolute value (20),Solving algebraic equations (8),Solving algebraic equations (8),Inequalities (11),Mean, median, and mode (27),Percents (2),Mean, median, and mode (27),Lines (14),Lines (14),Functions (16),Inequalities (11),Systems of equations (10),Percents (2),Probability (26),Mean, median, and mode (27),Ratio and proportion (5),Circles (23),Quadratics (17),Percents (2),Reading data (25),Inequalities (11),Synthetic division (18),Quadratics (17),Inequalities (11),Inequalities (11),Reading data (25),Word problems (12),Volume (29),Functions (16),Exponential and linear growth (3),Exponential and linear growth (3)"
    
    var SATDetails1Arr = SATDetails1.split(',')
    var SATCorrectAnswer = "B,B,C,A,C,D,D,B,C,B,A,B,D,A,A,C,C,D,A,B,A,B,D,D,C,B,D,C,A,A,D,B,A,C,B,D,C,C,B,C,B,B,A,A,D,C,B,A,D,B,D,A,D,B,A,C,C,D,B,C,A,A,B,B,A,B,C,C,C,A,D,D,B,D,D,D,B,A,B,C,B,D,C,A,A,A,A,B,D,C,A,B,B,C,D,D,D,A,C,B,C,A,B,C,B,A,D,D,B,A,D,2,1600,7,0.8,100,B,C,D,C,D,D,C,D,A,B,A,C,C,C,A,C,B,A,B,D,C,B,B,A,D,B,C,C,D,D,4,107,0.625,96,6,3,1.02,6.11"
    var SATCorrectAnswerArr = SATCorrectAnswer.split(',')
    var Arr = [[{ value: "Test" }, { value: "Section" },{ value: "Question" }, { value: "Subject" },{ value: "Detail" },{ value: "Student answer" },{value:'Correct Answer'},{ value: "Outcome" }]]
    
    var TempArr = []
    for(var i =0; i<SATSectionsArr.length; i++){
      TempArr = [{ value: TestNum }, { value: SATSectionNumberArr[i] },{ value: SATQuestionArr[i]}, { value: SATSectionsArr[i]},{ value: SATDetails1Arr[i] },{ value: "" },{value: SATCorrectAnswerArr[i]},{ value: "=(F"+(i+2).toString()+" = G"+(i+2).toString()+ ")" }]
      Arr.push(TempArr)
    }
    //setData(Arr)
    return(Arr)
  }

  function PullStudentData(s){
    var TempD = CompileTestData(1)
    function FindMatchingUid(){
      for(var i = 0; i< NameId.length; i++){
      
        if(s.value == NameId[i][0]){
          return(NameId[i][2])
        }
      }
    }
    const x = query(usersRef, where("uid", "==", FindMatchingUid()))
    var ArrString = ''
    const unsub = onSnapshot(x, (querySnapshot) => {
      var ArrString = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.Test1.stringValue)
      console.log(ArrString)
      console.log("Sup dude")

      //return(null)
      var Arr = ArrString[0].split('+')
      console.log(Arr)
      var TempData = TempD
      for(var i = 0; i < Arr.length; i++){
        TempData[i][5] = {value: Arr[i]}
      }
      console.log(TempData)
      setData(TempData)
   
    });
  
}

  
  const [StudentAnswerData, setStudentAnswerData] = useState()
  useEffect(()=>{


    var TempArr = []
    for(var i = 0; i < data.length; i++){
      TempArr.push(data[i][5].value)
      
    }
    setStudentAnswerData(TempArr)
    UpdateStudentData(TempArr)
  },[data])
  /*
  const excelToJson = require('convert-excel-to-json');
  const resultExcel = excelToJson({
    sourceFile: '../../../SAT.xlsx'
  });
  console.log(resultExcel)
  */




 function PullTopics(s){
 
  function FindMatchingUid(){
    //NameId
    //CurrentStudent
    
      for(var i = 0; i< NameId.length; i++){
      
        if(s.value == NameId[i][0]){
          return(NameId[i][2])
        }
      }
    }

      console.log('pulTOpic')
      
      const x = query(usersRef, where("uid", "==", FindMatchingUid())) //query(usersRef, where("id", "==", FindMatchingUid()));
      var NewArr = []
      const unsub = onSnapshot(x, (querySnapshot) => {
        var AssignmentString = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.topics.stringValue)
        
        var AssignmentArr = AssignmentString[0].split('%')
        var NewTopics = Topics
        var TopicBools = []
        for(var i = 0; i < Topics.length; i++){
          //NewTopics[i][1] = AssignmentArr[i]
          if(AssignmentArr[i] == 'true'){
            NewTopics[i][1] = true
            TopicBools[i]= true
          }
          else{
            NewTopics[i][1] = false
            TopicBools[i]= false
          }
          //TopicBools[i] = AssignmentArr[i]
        }
   
        setTopicsBool(TopicBools)
        setTopics(NewTopics)
     
      });

      if(Type == 'Student' || Type == 'Parent'){

     
      
      }else if(Type == 'Tutor'){

      }
    
}
  const[StudentTestAnswers, setStudentTestAnswers] = useState();
  function GetStudentAnswers(){

  }
  const SpreadsheetApp = () => {
    
    return <Spreadsheet data={data} onChange={setData}/>;
  };

 
  const [NewAssignment, setNewAssignment] = useState('')

  const handleTitleChange = event => {
    // 👇️ update textarea value
    setNewAssignment(event.target.value);
   
  };

  function SubmitAssignment(){
    var NewArr = [NewAssignment,false, StudentAssignments.length]
    console.log("Egghead")
    var StudentAssignmentCopy = StudentAssignments
    StudentAssignmentCopy[StudentAssignmentCopy.length] = []

    console.log(NewArr)
    StudentAssignmentCopy[StudentAssignmentCopy.length-1] = NewArr
    console.log(StudentAssignmentCopy)
    //console.log(StudentAssignments.push(NewArr))
    //setStudentAssignments( StudentAssignmentCopy)
    //Placeholder
    UpdateStudentAssignments()
    setNewAssignment('')
  }
  function ChangeCheck(num){
    var CurrentCheck = StudentAssignments[num][1]
    var CurrentArr = StudentAssignments
    
    if(CurrentCheck == true){
      CurrentArr[num][1] = false
      setStudentAssignments(CurrentArr)
    }else{
      CurrentArr[num][1] = true
      setStudentAssignments(CurrentArr)
    }
  }
  function CheckBoxMaker(){
    var lengthCB = StudentAssignments.length
    for(var i = 0; i<lengthCB; i++){
      var CurrChecked = StudentAssignments[i][1]

    }
      // <FormControlLabel control={<Checkbox style={{color:"#ccc"}} labelStyle={{color:"#ccc"}}  checked={CurrChecked} onChange={()=>ChangeCheck(i)}/>} label="Sharp" />

  }

  function GetLoadingScreen(){

  }

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  const [valueTab, setValueTab] = useState(0);

  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  };
  function DropDownOnChange(s){
      
      setCurrentStudent(s)
    
      PullStudentAssignments(s)
      PullTopics(s)
      PullStudentData(s)
      PullDate(s)
      PullNotepad(s)
    
  }
  function GetDropDown(){
    if(Students){
      //console.log("Students")
      var NewArr = []
      var StudentLength = Students[0].length
      //console.log(StudentLength)
      for(var i = 0; i<StudentLength; i++){
        NewArr[NewArr.length] = Students[0][i].stringValue
      }
      //console.log(NewArr)
      
        const options = NewArr
      
        const defaultOption = 'Please Choose Student';
        //setCurrentStudent(NewArr[0])
        return(<Dropdown options={options} onChange={(s)=>{DropDownOnChange(s)}} value={defaultOption} placeholder="Select an option" />)
      }
      else{
        return(null)
      }
    
    
  }
  
  
  

  function UpdateTopics(){
    if(CurrentStudent !== ''){
    function FindMatchingUid(){
      //NameId
      //CurrentStudent
      
      for(var i = 0; i< NameId.length; i++){
      
        if(CurrentStudent.value == NameId[i][0]){
          return(NameId[i][1])
        }
      }
    }
    const studentDef = doc(db, "users", FindMatchingUid());

    var ArrString = ''
    console.log("inupdate")
    for(var i = 0; i < Topics.length; i++){
      ArrString = ArrString + Topics[i][1]+ '%'
    }
    
    updateDoc(studentDef, {
            topics: ArrString.slice(0, -1) 
          
            });
  }
  }

  

  function ChangeTopic(name){
 
    var NewTopics = Topics
    var NewTopicsBool = TopicsBool
    for(var i = 0; i<Topics.length; i++){
      if(Topics[i][0] == name){
        NewTopics[i][1] = !(Topics[i][1])
        NewTopicsBool[i] = !(NewTopicsBool[1])
      }
    }
    console.log(NewTopics)
    setTopics(NewTopics)
    setTimeout(() => {
      UpdateTopics()
    }, 500)
    UpdateTopics()
  }



  function Checked(name){
    for(var i = 0; i<Topics.length; i++){
      if(Topics[i][0] == name){
        return(TopicsBool[i])
        
      }
    }
  }

  const ModalCustomStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width:'50%',
      backgroundColor:'#526572',
      borderRadius:10,
    },
  };
  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = 'black';
    subtitle.style.fontWeight = '200';
    subtitle.style.fontSize = '40px';
  }

  function closeModal() {
    setIsOpen(false);
  }
  
 
  const [TempA, setTempA] = useState([true,false])
  

  if(false){
    return(
      <Fragment>
        <p  className={'TitleTextStyle'}>Welcome to your Dashboard {UserName.toString().split(' ')[0]}</p>

        
        <div className={'NotepadButtonDiv'}>
          <button onClick={openModal} style={{backgroundColor:"#526572", borderRadius:5}}>
            <FaRegStickyNote size={40}/>
          </button>
        </div>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={ModalCustomStyles}
          contentLabel="Example Modal"
        >
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Notebook</h2>
          <Button onClick={closeModal} variant="contained" color="primary" >close</Button>
       
          <div className={'field active false'}>
          <textarea
              id={2}
              type="text"
              //value={''}
              placeholder={'Enter Text Here'}
              onChange={handleTextChange}
              //onChange={this.changeValue.bind(this)}
              //onKeyPress={this.handleKeyPress.bind(this)}
              //onFocus={() => !locked && this.setState({ active: true })}
              //onBlur={() => !locked && this.setState({ active: true })}
            />
          </div>
        </Modal>
       
        <p  className={'TitleTextStyleLight'}>Choose your student:</p>
        {GetDropDown()}

        <p className={'TitleTextStyleLight'}>Next Meeting:</p>
        <DatePicker selected={NextCurrentStudentDate} onChange={(date:Date) => setNextCurrentStudentDate(date)} />
        <p></p>

        <p  className={'TitleTextStyleLight'}>Current Assignments:</p>
        <div className={'fieldSmall active false'}>
        <textarea
            id={2}
            type="text"
            value={NewAssignment}
            placeholder={'Enter Assignment Here'}
            onChange={handleTitleChange}
            
            //onKeyPress={this.handleKeyPress.bind(this)}
            //onFocus={() => !locked && this.setState({ active: true })}
            // onBlur={() => !locked && this.setState({ active: true })}
          />
          </div>
          <div className ={'ButtonDivWaiting'} >
          <Button onClick={()=>{SubmitAssignment()}} variant="contained" color="secondary" >Assign Task</Button>
        </div>
        <div className={'StudentAssignments'}>
        <FormGroup>

                 {
                    StudentAssignments.map(obj=>{
                      return(
                      <>
                      <FormControlLabel control={<Checkbox style={{color:"#ccc"}} labelStyle={{color:"#ccc"}}   onChange={()=>ChangeCheck(obj[2])}/>} label={obj[0]} />
                
                      </>
                      )
                    })
                 }    
        </FormGroup>
        </div>
        <div className ={'ButtonDivComplete'} >
        <Button onClick={()=>{RemoveAssignments()}} variant="contained" color="secondary" >Complete Assignments</Button>
        </div>
        <div className={'TopicsDiv'}>
        <p  className={'TitleTextStyleLight'}>Topics:</p>
        <FormGroup>
         
          {
            
            Topics.map(obj=>{
              return(
              <>
            

              <FormControlLabel control={<Checkbox style={{color:"#ccc"}} labelStyle={{color:"#ccc"}} checked= {Checked(obj[0])}  onChange={()=>ChangeTopic(obj[0])}/>} label={obj[0]} />

              </>
              )
            })
          }    
         
        </FormGroup>
        </div>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={valueTab} onChange={handleChangeTab} aria-label="basic tabs example">
              <Tab label="Test One" {...a11yProps(0)} />
              <Tab label="Test Two" {...a11yProps(1)} />
              <Tab label="Test Three" {...a11yProps(2)} />
              <Tab label="Test Four" {...a11yProps(3)} />
              <Tab label="Test Five" {...a11yProps(4)} />
              <Tab label="Test Six" {...a11yProps(5)} />
              <Tab label="Test Seven" {...a11yProps(6)} />
              <Tab label="Test Eight" {...a11yProps(7)} />
              <Tab label="Test Nine" {...a11yProps(8)} />
              <Tab label="Test Ten" {...a11yProps(9)} />
            </Tabs>
          </Box>
          <TabPanel value={valueTab} index={0}>
            Test One
          </TabPanel>
          <TabPanel value={valueTab} index={1}>
            Test Two
          </TabPanel>
          <TabPanel value={valueTab} index={2}>
            Test Three
          </TabPanel>
          <TabPanel value={valueTab} index={3}>
            Test Four
          </TabPanel>
          <TabPanel value={valueTab} index={4}>
            Test Five
          </TabPanel>
          <TabPanel value={valueTab} index={5}>
            Test Six
          </TabPanel>
          <TabPanel value={valueTab} index={6}>
            Test Seven
          </TabPanel>
          <TabPanel value={valueTab} index={7}>
            Test Eight
          </TabPanel>
          <TabPanel value={valueTab} index={8}>
            Test Nine
          </TabPanel>
          <TabPanel value={valueTab} index={9}>
            Test Ten
          </TabPanel>
        </Box>
       
        <SpreadsheetApp/>
       
        
      </Fragment>
    )
  }


 
  
  function ChangeTopicColor(name){

  }

  
  
  
  //<StatisticsArea CardChart={CardChart} data={statistics} />
  if(true){
    return (
      <Fragment>
            <div className ={'rowDiv'}>
             
            <Quiz quiz={quizTest} />
            <div className ={'columnDiv'}>
              {
              Topics.map(obj=>{
                return(
                <>
              

                  <Button className ={'quizTopics'} onClick={()=>{setCurrentQuizTopic(obj)}}>
                    {obj}
                  </Button>
                  </>
                  )
                })
              }    
            </div>
          </div>
        </Fragment>
        )
  }
}


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
