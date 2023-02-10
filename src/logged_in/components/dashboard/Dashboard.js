import React, { Fragment, useEffect, useState, useRef, useCallback } from "react";
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
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import ReactHover, { Trigger, Hover } from "react-hover";
import SubscriptionInfo from "./SubscriptionInfo";
import { CirclesWithBar } from 'react-loader-spinner'
import Collapse from '@mui/material/Collapse';
import { auth, getNames, db, storage} from "../../../firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, onSnapshot, collection, query, where,updateDoc, arrayUnion, arrayRemove, setDoc , deleteDoc} from "firebase/firestore";
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
import { FaRegStickyNote, FaSquare } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import { FaSchool } from "react-icons/fa";
import { FaRegSquare } from "react-icons/fa";
import {FaChalkboardTeacher} from "react-icons/fa";
import {FaChalkboard} from "react-icons/fa";
import {FaEraser} from "react-icons/fa";
import {FaPen} from "react-icons/fa";
import {FaTrash} from "react-icons/fa";
import { FaFileDownload } from "react-icons/fa";
import { FaDesktop } from "react-icons/fa";
import { FaPowerOff } from "react-icons/fa";
import {FaPhone} from "react-icons/fa"
import {FaUser} from "react-icons/fa"
import {FaBook} from "react-icons/fa"
import {FaCalendar} from "react-icons/fa"
import {FaCalculator} from "react-icons/fa"
import {FaEnvelope} from "react-icons/fa"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {FaGoogleDrive} from "react-icons/fa"
import Modal from 'react-modal';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Document, Page } from 'react-pdf';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import { Link } from "react-router-dom";
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {VictoryChart, VictoryArea, VictoryLine, VictoryLabel, VictoryLegend, VictoryAxis} from "victory";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { ConnectedTvOutlined, ConstructionOutlined, ContactsOutlined, ElevatorSharp, RestaurantRounded } from "@mui/icons-material";
import { Scheduler } from "@aldabil/react-scheduler";
import DateTimePicker from 'react-datetime-picker';
import { faCropSimple } from "@fortawesome/free-solid-svg-icons";
import {
  ProcessedEvent,
  SchedulerHelpers
} from "@aldabil/react-scheduler";
import { TextField,  DialogActions } from "@mui/material";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

import TablePagination from '@mui/material/TablePagination';

import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';


import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';

import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils'
import { alpha } from '@mui/material/styles';
import {
  CanvasPath,
  ExportImageType,
  ReactSketchCanvas,
  ReactSketchCanvasProps,
  ReactSketchCanvasRef,
} from "react-sketch-canvas";

import { SketchPicker, TwitterPicker, GithubPicker, CirclePicker } from 'react-color'






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
    //selectDashboard,
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
  const [ParentStudentName, setParentStudentName] = useState('')
  const [Type, setType] = useState(['1'])
  const [QuizData, setQuizData] = useState()
  const [QuizDataId, setQuizDataId] = useState()
  const [UserEmail, setUserEmail] = useState([])
  const quizesRef = collection(db, "Quizes");
  const quizesRefACT = collection(db, "QuizesACT");
  const [CurrentQuizTopic, setCurrentQuizTopic] = useState('ComplexNumbers')
  //const storage = getStorage();
  const [CurrentImageURL, setCurrentImageURL] = useState('')
  const [MyName, setMyName] = useState('');
  const [Students, setStudents] = useState()
  const [AdminBool, setAdminBool] = useState(false)
  const [StudentsTotal, setStudentsTotal] = useState()
  const [StudentsTotalBool, setStudentsTotalBool] = useState()
  const [NameId, setNameId] = useState([])
  const usersRef = collection(db, "users");
  const constantsRef = collection(db, "GlobalVariables");
  const [ErrorUpdate, setErrorUpdate] = useState(1)
  const [CurrentStudent, setCurrentStudent] = useState('')
  const [StudentAssignments, setStudentAssignments] = useState([])
  const [Topics, setTopics] = useState([['Absolute value', false, 50], ['Expressions', false, 50], ['Inequalities', false, 50],['Lines', false, 50],['Solving algebraic equations', false, 50],['Systems of equations', false, 50],['Word problems', false, 50],['Complex numbers', false, 50],['Constructing models', false, 50],['Exponents and radicals', false, 50],['Exponential and linear growth', false, 50], ['Functions', false, 50], ['Matching coefficients', false, 50], ['Quadratics', false, 50], ['Synthetic division', false, 50], ['Experiment design', false, 50], ['Mean, median and mode', false, 50], ['Percents', false, 50], ['Probability', false, 50], ['Ratio and proportion', false, 50],['Reading data', false, 50], ['Scatter plots', false, 50], ['Angles', false, 50],['Circles', false, 50], ['Triangles', false, 50], ['Trigonometry', false, 50], ['Volume', false, 50],['Add, revise, or delete', false, 50], ['Apostrophes', false, 50], ['Combining and separating sentences', false, 50],['Diction, idioms, and register', false, 50], ['Modification', false, 50], ['Non-essential and essential clauses', false, 50], ['Parallel structure', false, 50], ['Pronoun and noun agreement', false, 50], ['Punctuation', false, 50], ['Sentence and paragraph order', false, 50], ['Sentences and fragments', false, 50], ['Shorter is better', false, 50], ['Infographics', false, 50], ['Transitions', false, 50], ['Verb agreement and tense', false, 50], ['Word pairs and comparisons', false, 50], ['Fiction', false, 50], ['Social Science', false, 50], ['Natural Science', false, 50], ['Historical Documents', false, 50], ['Paired Passages', false, 50]]);
  const [TopicsFull, setTopicsFull] = useState([['Absolute value', false, 50], ['Expressions', false, 50], ['Inequalities', false, 50],['Lines', false, 50],['Solving algebraic equations', false, 50],['Systems of equations', false, 50],['Word problems', false, 50],['Complex numbers', false, 50],['Constructing models', false, 50],['Exponents and radicals', false, 50],['Exponential and linear growth', false, 50], ['Functions', false, 50], ['Matching coefficients', false, 50], ['Quadratics', false, 50], ['Synthetic division', false, 50], ['Experiment design', false, 50], ['Mean, median and mode', false, 50], ['Percents', false, 50], ['Probability', false, 50], ['Ratio and proportion', false, 50],['Reading data', false, 50], ['Scatter plots', false, 50], ['Angles', false, 50],['Circles', false, 50], ['Triangles', false, 50], ['Trigonometry', false, 50], ['Volume', false, 50],['Add, revise, or delete', false, 50], ['Apostrophes', false, 50], ['Combining and separating sentences', false, 50],['Diction, idioms, and register', false, 50], ['Modification', false, 50], ['Non-essential and essential clauses', false, 50], ['Parallel structure', false, 50], ['Pronoun and noun agreement', false, 50], ['Punctuation', false, 50], ['Sentence and paragraph order', false, 50], ['Sentences and fragments', false, 50], ['Shorter is better', false, 50], ['Infographics', false, 50], ['Transitions', false, 50], ['Verb agreement and tense', false, 50], ['Word pairs and comparisons', false, 50], ['Fiction', false, 50], ['Social Science', false, 50], ['Natural Science', false, 50], ['Historical Documents', false, 50], ['Paired Passages', false, 50]]);
  const [TopicsBookCapter, setTopicsBookCapter] = useState(['20','6','11','14/15','8','10','12','19','7','1','3','16','9','17','18','28','27','2','26','5','25','28','1','13','7','5','18','9','17','14','','2','6','4','3','8','15','16','','','','',''])
  const [TopicsBookCapterConst, setTopicsBookCapterConst] = useState(['20','6','11','14/15','8','10','12','19','7','1','3','16','9','17','18','28','27','2','26','5','25','28','1','13','7','5','18','9','17','14','','2','6','4','3','8','15','16','','','','',''])
  
  const [TopicsACT, setTopicsACT] = useState([['Word problems', false, 50, 26],['Absolute value', false, 50,1], ['Expressions', false, 50,4], ['Inequalities', false, 50,21],['Solving equations', false, 50,3],['Systems of equations', false, 50,20],['Complex numbers', false, 50,7],['Exponents and radicals', false, 50,2],['Numbers and Operations', false, 50,5], ['Properties of numbers', false, 50,6],['Functions', false, 50,11], ['Coordinate Geometry', false, 50,14], ['Quadratics', false, 50,13], ['Logaritms', false, 50,25], ['Matrices', false, 50,28], ['Sequences', false, 50,27], ['Percents', false, 50,10], ['Probability', false, 50,23], ['Ratio and proportion', false, 50,9],['Vectors', false, 50,28], ['Area and Perimeter', false, 50,18], ['Angles', false, 50, 15],['Circles', false, 50, 17], ['Triangles', false, 50, 16], ['Trigonometry', false, 50, 22], ['Volume', false, 50, 19],['Ellipses', false, 50, 28],['Data and Statistics', false, 50, 24],['Add, revise, or delete', false, 50, 18], ['Apostrophes', false, 50, 1], ['Joining and separating sentences', false, 50, 3],['Diction, idioms, and register', false, 50, 16], ['Modification', false, 50, 12], ['Non-essential and essential clauses', false, 50, 4], ['Parallel structure', false, 50, 13], ['Pronouns', false, 50, 9], ['Punctuation', false, 50, '5,6,7'], ['Sentence and paragraph order', false, 50, 19], ['Sentences and fragments', false, 50, 2], ['Shorter is better', false, 50, 15], ['Transitions', false, 50, 17], ['Verbs', false, 50, 8], ['Word pairs and comparisons', false, 50, 11], ['Evaluation of Purpose', false, 50, 20], ['Adjectives and Adverbs', false, 50, 10]]);
  const [TopicsFullACT, setTopicsFullACT] = useState([['Word problems', false, 50, 26],['Absolute value', false, 50,1], ['Expressions', false, 50,4], ['Inequalities', false, 50,21],['Solving equations', false, 50,3],['Systems of equations', false, 50,20],['Complex numbers', false, 50,7],['Exponents and radicals', false, 50,2],['Numbers and Operations', false, 50,5], ['Properties of numbers', false, 50,6],['Functions', false, 50,11], ['Coordinate Geometry', false, 50,14], ['Quadratics', false, 50,13], ['Logaritms', false, 50,25], ['Matrices', false, 50,28], ['Sequences', false, 50,27], ['Percents', false, 50,10], ['Probability', false, 50,23], ['Ratio and proportion', false, 50,9],['Vectors', false, 50,28], ['Area and Perimeter', false, 50,18], ['Angles', false, 50, 15],['Circles', false, 50, 17], ['Triangles', false, 50, 16], ['Trigonometry', false, 50, 22], ['Volume', false, 50, 19],['Ellipses', false, 50, 28],['Data and Statistics', false, 50, 24],['Add, revise, or delete', false, 50, 18], ['Apostrophes', false, 50, 1], ['Joining and separating sentences', false, 50, 3],['Diction, idioms, and register', false, 50, 16], ['Modification', false, 50, 12], ['Non-essential and essential clauses', false, 50, 4], ['Parallel structure', false, 50, 13], ['Pronouns', false, 50, 9], ['Punctuation', false, 50, '5,6,7'], ['Sentence and paragraph order', false, 50, 19], ['Sentences and fragments', false, 50, 2], ['Shorter is better', false, 50, 15], ['Transitions', false, 50, 17], ['Verbs', false, 50, 8], ['Word pairs and comparisons', false, 50, 11], ['Evaluation of Purpose', false, 50, 20], ['Adjectives and Adverbs', false, 50, 10]]);
  const [TopicsBookCapterACT, setTopicsBookCapterACT] = useState(['26','1','4','21','3','20','7','2','5','6','11','14','13','25','28','27','10','23','9','28','18','15','17','16','22','19','28','24','18','1','3','16','12','4','13','9','5,6,7','19','2','15','17','8','11','20','10'])
  const [TopicsBookCapterConstACT, setTopicsBookCapterConstACT] = useState(['26','1','4','21','3','20','7','2','5','6','11','14','13','25','28','27','10','23','9','28','18','15','17','16','22','19','28','24','18','1','3','16','12','4','13','9','5,6,7','19','2','15','17','8','11','20','10'])
  const [DiagnosticsTestData, setDiagnosticsTestData] = useState([])

//Ended updates at chapter 12
  const [TopicCat, setTopicCat] = useState([['Math','0:27'],['Verbal', '28:46']])
  const [TopicsBool, setTopicsBool]= useState([])
  const [NextCurrentStudentDate, setNextCurrentStudentDate] = useState(new Date());
  const [NextClassDate, setNextClassDate] = useState(new Date());
  const [TextOutput, setTextOutput] = useState('')
  const [TutorNotes, setTutorNotes] = useState('')
  //Placeholder
  const [SATDetailsTotalGlobal, setSATDetailsTotalGlobal] = useState([])
  const [SATCorrectAnswerTotalGlobal, setSATCorrectAnswerTotalGlobal] = useState([])
  const [CurrentQuiz, setCurrentQuiz] = useState([])
  const [CurrentQuiz2, setCurrentQuiz2] = useState([])
  const [CurrentQuiz3, setCurrentQuiz3] = useState([])
  const [CurrentQuiz4, setCurrentQuiz4] = useState([])
  const [CurrentQuiz5, setCurrentQuiz5] = useState([])
  const [CurrentQuiz6, setCurrentQuiz6] = useState([])
  const [CurrentQuiz7, setCurrentQuiz7] = useState([])
  const [CurrentQuiz8, setCurrentQuiz8] = useState([])
  const [CurrentQuiz9, setCurrentQuiz9] = useState([])
  const [CurrentQuiz10, setCurrentQuiz10] = useState([])
  const [CurrentQuiz11, setCurrentQuiz11] = useState([])
  const [CurrentQuiz12, setCurrentQuiz12] = useState([])
  const [CurrentQuiz13, setCurrentQuiz13] = useState([])
  const [CurrentQuiz14, setCurrentQuiz14] = useState([])
  const [CurrentQuiz15, setCurrentQuiz15] = useState([])
  const [CurrentQuiz16, setCurrentQuiz16] = useState([])
  const [CurrentQuiz17, setCurrentQuiz17] = useState([])
  const [CurrentQuiz18, setCurrentQuiz18] = useState([])
  const [CurrentQuiz19, setCurrentQuiz19] = useState([])

  const [CurrentQuizNum, setCurrentQuizNum] = useState(-1)

  const [TopicsMath, setTopicsMath] = useState([])
  const [TopicsVerbal, setTopicsVerbal] = useState([])
  const [TopicsMathACT, setTopicsMathACT] = useState([])
  const [TopicsVerbalACT, setTopicsVerbalACT] = useState([])

  const [CurrentTestNumber, setCurrentTestNumber] = useState(1)
  const [ZoomLink, setZoomLink] = useState('')

  const [StudentAnswerData, setStudentAnswerData] = useState()

  const [MathrowsGlobal, setMathrowsGlobal] = useState([])
  const [VerbalrowsGlobal, setVerbalrowsGlobal] = useState([])
  const [MathrowsGlobalClassroom, setMathrowsGlobalClassroom] = useState([])
  const [VerbalrowsGlobalClassroom, setVerbalrowsGlobalClassroom] = useState([])
  const [MathrowsGlobalPercent, setMathrowsGlobalPercent] = useState([])
  const [HWrowsGlobal, setHWrowsGlobal] = useState([])
  const [VerbalrowsGlobalPercent, setVerbalrowsGlobalPercent] = useState([])
  const [ImagePipelineDone, setImagePipelineDone] = useState(0)
  const [AssignmentsDoneGlobal, setAssignmentsDoneGlobal] = useState('')
  const [QuizResultsGlobal, setQuizResultsGlobal] = useState('')

  const [ClassroomStudents, setClassroomStudents] = useState([])
  const [ClassroomStudentsClean, setClassroomStudentsClean] = useState([])
  const [ClassroomStudentsACT, setClassroomStudentsACT] = useState([])
  const [ClassroomStudentsCleanACT, setClassroomStudentsCleanACT] = useState([])
  const [ClassroomRows, setClassroomRows] = useState([])

  const links = useRef([]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);
 
  const [Events, setEvents] = useState();

  const [AddStudentBinary, setAddStudentBinary] = useState(false)
  const [NewMeetingString, setNewMeetingString] = useState()
  const[CalendarSwitch, setCalendarSwitch] = useState(false)


  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('Category');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [orderMath, setOrderMath] = React.useState('desc');
  const [orderByMath, setOrderByMath] = React.useState('Category');
  const [selectedMath, setSelectedMath] = React.useState([]);
  const [pageMath, setPageMath] = React.useState(0);
  const [denseMath, setDenseMath] = React.useState(false);
  const [rowsPerPageMath, setRowsPerPageMath] = React.useState(5);

  const [orderVerbal, setOrderVerbal] = React.useState('desc');
  const [orderByVerbal, setOrderByVerbal] = React.useState('Category');
  const [selectedVerbal, setSelectedVerbal] = React.useState([]);
  const [pageVerbal, setPageVerbal] = React.useState(0);
  const [denseVerbal, setDenseVerbal] = React.useState(false);
  const [rowsPerPageVerbal, setRowsPerPageVerbal] = React.useState(5);

  const [TriSwitchSpreadSheetValues, setTriSwitchSpreadSheetValues] = useState(0)
  const [TriSwitchSpreadSheetValuesDiagnostics, setTriSwitchSpreadSheetValuesDiagnostics] = useState(0)
  const [TestIndexConst, setTestIndexConst] = useState(1)
  const[AtStart, setAtStart] = useState(0)
  const openMobileDrawer = useCallback(() => {
    setIsMobileOpen(true);
  }, [setIsMobileOpen]);

  const closeMobileDrawer = useCallback(() => {
    setIsMobileOpen(false);
  }, [setIsMobileOpen]);

  const openDrawer = useCallback(() => {
    setIsSideDrawerOpen(true);
  }, [setIsSideDrawerOpen]);

  const closeDrawer = useCallback(() => {
    setIsSideDrawerOpen(false);
  }, [setIsSideDrawerOpen]);


  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalIsOpenTwo, setIsOpenTwo] = React.useState(false);
  const [modalIsOpenThree, setIsOpenThree] = React.useState(false);

  const [CurrentTest, setCurrentTest] = useState()

  const [ClassroomTest,setClassroomTest] = useState('SAT')
  const [UpdatedCurrentTest, setUpdatedCurrentTest] = useState()
  const [Tutor, setTutor] = useState()
  const [ErrorScreenOn, setErrorScreenOn] = useState(false)

  const [AdminInfo, setAdminInfo] = useState(null)
  const [AdminInfoParent, setAdminInfoParent] = useState(null)
  const [AdminInfoTutor, setAdminInfoTutor] = useState(null)


  function refreshPage() {
    window.location.reload(false);
  }
 

  const menuItems = [
    
   
    {
      link: "/",
      name: "Logout",
      icon: {
        desktop: (
          <PowerSettingsNewIcon className="text-white" fontSize="small" />
        ),
        mobile: <PowerSettingsNewIcon className="text-white" />,
      },
    },
  ];

  const [SAVnum, setSAVnum] = useState(0)
  const [SVG, setSVG] = useState()

  const canvasRef = useRef(null);


  function IncreaseSAVnum(){
    setSAVnum(SAVnum + 1)
  }
  const parse = require('html-react-parser');
  const loadSVGHandler = () => {
    console.log('loadSVGHandler')
    try{
    var svg = JSON.parse(SVG)
    
    const loadPaths = canvasRef.current?.loadPaths(svg);
   
    if (loadPaths) {
      console.log("fd;sdlfksdf")
      loadPaths();
    }
    console.log("kfljslksdfjf")
    }catch{
      console.log('error')
    }
    //console.log(parse(SVG))
  
  

    //
  
  }

  const svgExportHandler = async () => {
    const exportSvg = canvasRef.current?.exportPaths;
  
    if (exportSvg) {
      const exportedDataURI = await exportSvg();
     
  
      UpdateSVG(JSON.stringify(exportedDataURI))
      //setSVG(exportedDataURI)
    }
  };

  //UseEffect with a 100 ms timeout
  const [SAVstart, setSAVstart] = useState(0)
  const [IsCanvas, setIsCanvas] = useState(false)
  useEffect(() => {
    //placeholder

    console.log('SAVnum')
    console.log(SAVnum)
    if(SAVstart > 1){
      const delayDebounceFn = setTimeout(() => {
        svgExportHandler()
      }, 10)
      return () => clearTimeout(delayDebounceFn)
    }
    //UpdateNotepad(TextOutput)
    setSAVstart(SAVstart + 1)
  }, []);
  
  useEffect(()=>{
    
    if(SVG !== undefined && canvasRef.current !== null){
      loadSVGHandler()
    }
  },[SVG,IsCanvas])

  useEffect(()=>{
    if(canvasRef.current !== null && IsCanvas === false){
      setIsCanvas(true)
    }
  },[canvasRef.current])



  
  function diffArray(arr1, arr2) {
    return arr1
      .concat(arr2)
      .filter(item => !arr1.includes(item) || !arr2.includes(item));
  }
  function ACTtoSAT(num = 0){
    var ACTArr = [600,600,600,600,600,600,600,600,600,640,680,720,770,820,870,910,950,980,1020,1050,1090,1120,1150,1190,1220,1250,1290,1320,1350,1380,1410,1430,1470,1520,1560,1600]
    return(ACTArr[num])
}

  useEffect(()=>{
    
    var TopicCopy = Topics
    var TopicCopy2 = Topics
    var TopicsBookCapterCopy = TopicsBookCapter
    var TopicsBookCapterCopy2 = TopicsBookCapter
    var TopicsMathX = TopicCopy.splice(0,27)
    var BookCaptersMath = TopicsBookCapterCopy.splice(0,27)
    
    for(var i = 0; i<TopicsMathX.length; i++){
      TopicsMathX[i][3] = BookCaptersMath[i]
      
    }
    TopicsMathX.splice(4,1)

    
    //['Solving algebraic equations', false, 50, '8']
   
    
    
 
    //var TopicsBookCapterCopy = TopicsBookCapter
    var TopicsVerbalX = TopicCopy2
    var BookCaptersVerbal = TopicsBookCapterCopy2
    for(var i = 0; i<TopicsVerbalX.length; i++){
      TopicsVerbalX[i][3] = BookCaptersVerbal[i]
      
    }
    
    setTopicsVerbal(TopicsVerbalX)
    setTopicsMath(TopicsMathX)
   
  },[])

  useEffect(()=>{
    
    var TopicCopy = TopicsACT
    var TopicCopy2 = TopicsACT
    var TopicsBookCapterCopy = TopicsBookCapterACT
    var TopicsBookCapterCopy2 = TopicsBookCapterACT
    var TopicsMathX = TopicCopy.splice(0,28)
    var BookCaptersMath = TopicsBookCapterCopy.splice(0,28)
    
    for(var i = 0; i<TopicsMathX.length; i++){
      TopicsMathX[i][3] = BookCaptersMath[i]
      
    }
    TopicsMathX.splice(4,1)

    
    //['Solving algebraic equations', false, 50, '8']
   
    
 
    //var TopicsBookCapterCopy = TopicsBookCapter
    var TopicsVerbalX = TopicCopy2
    var BookCaptersVerbal = TopicsBookCapterCopy2
    for(var i = 0; i<TopicsVerbalX.length; i++){
      TopicsVerbalX[i][3] = BookCaptersVerbal[i]
      
    }
    
    setTopicsVerbalACT(TopicsVerbalX)
    setTopicsMathACT(TopicsMathX)
   
  },[])

  function AddBoolToArr(arr, arr2){
    var ArrTemp = []
    for(var i = 0; i < arr.length; i++){
        if(arr2.includes(arr[i])){
            ArrTemp.push([arr[i],true])
        }else{
            ArrTemp.push([arr[i],false])
        }
    }
    return(ArrTemp)
  }
  const [CompanyCode, setCompanyCode] = useState('')
  useEffect(() => {
    try{
      const x = query(usersRef, where("uid", "==", auth.currentUser.uid.toString()));
      
      //const q = query(collection(db, "users"))
      const unsub = onSnapshot(x, (querySnapshot) => {
     
      //querySnapshot.docs.map(d => setUserNames(UserNames.push(d._document.data.value.mapValue.fields.name.stringValue)))

      setUserName( querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.name.stringValue));

      var UserType = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.Type.stringValue)
     
      setType(UserType[0]);
      if(UserType == 'Parent'){
        setParentStudentName(querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.ParentName.stringValue))
       
      }
      if(UserType == 'Tutor'){
        
        setStudents(querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.Students.arrayValue.values))
        setClassroomStudents(querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.Class.arrayValue.values))
        setClassroomStudentsACT(querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.ClassACT.arrayValue.values))
        setTutor(querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.name.stringValue))
        setAdminBool(querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.Admin.booleanValue)[0])
        console.log("Priod")
        console.log(querySnapshot.docs.map(d => d._document.data.value.mapValue.fields))
        setCompanyCode(querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.CompanyCode.stringValue)[0])
        console.log(querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.CompanyCode.stringValue)[0])
        console.log('CompanyCode')
      }
      else{
        setTutor(querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.Tutor.stringValue))
      }

      }); 
      setTimeout(() => {

        

        const x = query(usersRef, where("Type", "==", "Student"),where("CompanyCode", "==", CompanyCode));
      
        //const q = query(collection(db, "users"))
        const unsub = onSnapshot(x, (querySnapshot) => {
        
        //querySnapshot.docs.map(d => setUserNames(UserNames.push(d._document.data.value.mapValue.fields.name.stringValue)))
 
        //setUserName( querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.name.stringValue));

        
      
          
        //setStudentsTotal(querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.Students.arrayValue.values))
        
        if(Type == 'Tutor'){
         
          var TempStudentsTotal = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.name.stringValue)
          var MeetingDateTotal = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.NextMeetingDate.timestampValue)
          var TempTutorsTotal = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.Tutor.stringValue)
          var TempEmailTotal = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.email.stringValue)
          var TempPhonelTotal = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.PhoneNumber.stringValue)
        
          var StudentsTemp = []
          try{
            for(var i = 0; i < Students[0].length; i++){
              StudentsTemp.push(Students[0][i].stringValue)
            }
          }catch(e){
            
          }
          setStudentsTotalBool(AddBoolToArr(TempStudentsTotal, StudentsTemp))
          setStudentsTotal(TempStudentsTotal)
          setAdminInfo([TempStudentsTotal, TempTutorsTotal, MeetingDateTotal,TempEmailTotal,TempPhonelTotal])

        }

      });  
      }, 100)

      setTimeout(() => {

        

        const x = query(usersRef, where("Type", "==", "Parent"));
      
        //const q = query(collection(db, "users"))
        const unsub = onSnapshot(x, (querySnapshot) => {
        
        //querySnapshot.docs.map(d => setUserNames(UserNames.push(d._document.data.value.mapValue.fields.name.stringValue)))
 
        //setUserName( querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.name.stringValue));

        
      
          
        //setStudentsTotal(querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.Students.arrayValue.values))
        
        if(Type == 'Tutor'){
         
          var TempStudentsTotal = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.name.stringValue)
       
          var TempEmailTotal = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.email.stringValue)
          var TempParentTotal = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.ParentName.stringValue)
          var TempPhonelTotal = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.PhoneNumber.stringValue)
          var StudentsTemp = []
          try{
            for(var i = 0; i < Students[0].length; i++){
              StudentsTemp.push(Students[0][i].stringValue)
            }
          }catch(e){
            
          }
          console.log("AdminInfoParent")
          console.log([TempStudentsTotal, TempEmailTotal,TempParentTotal])
          setAdminInfoParent([TempStudentsTotal, TempEmailTotal,TempParentTotal,TempPhonelTotal])
          
        }

      });  
      }, 100)

      setTimeout(() => {

        

        const x = query(usersRef, where("Type", "==", "Tutor"));
      
        //const q = query(collection(db, "users"))
        const unsub = onSnapshot(x, (querySnapshot) => {
        
        //querySnapshot.docs.map(d => setUserNames(UserNames.push(d._document.data.value.mapValue.fields.name.stringValue)))
 
        //setUserName( querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.name.stringValue));

        
      
          
        //setStudentsTotal(querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.Students.arrayValue.values))
        
        if(Type == 'Tutor'){
         
          var TempStudentsTotal = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.name.stringValue)
       
          var TempEmailTotal = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.email.stringValue)
        
          var TempPhonelTotal = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.PhoneNumber.stringValue)
          
          console.log("AdminInfoTutor")
          console.log(TempStudentsTotal)
          console.log([TempStudentsTotal, TempEmailTotal,TempPhonelTotal])
          setAdminInfoTutor([TempStudentsTotal, TempEmailTotal,TempPhonelTotal])
          
        }

      });  
      }, 100)
      
    
  
    
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
  }, [ErrorUpdate, auth.currentUser]); // empty dependencies array => useEffect only called once

  useEffect(()=>{
    if(ClassroomStudents){
      try{
        var CS = ClassroomStudents[0]
    
        var TempArr = []
        for(var i = 0; i< CS.length; i++){
          TempArr.push(CS[i].stringValue)
        }
        setClassroomStudentsClean(TempArr)
      }catch(err){

      }
    }
  },[ClassroomStudents])

  useEffect(()=>{
    if(ClassroomStudentsACT){
      try{
        var CS = ClassroomStudentsACT[0]
      
        var TempArr = []
        for(var i = 0; i< CS.length; i++){
          TempArr.push(CS[i].stringValue)
        }
        setClassroomStudentsCleanACT(TempArr)
      }catch(err){

      }
    }
  },[ClassroomStudentsACT])

  function dateInPast(firstDate, secondDate) {
    if (firstDate <= secondDate) {
      return true;
    }
  
    return false;
  };




  /*
  Grab all names/uids
  */

  const [NewArrFinished, setNewArrFinished] = useState(false)
  useEffect(() => {
    try{
      const z = query(usersRef);
  
     //const q = query(collection(db, "users"))
     var NewwerArr  = []
     var NewArr = NameId
    const unsub = onSnapshot(z, (querySnapshot) => {
      
      
  
      if(NameId){
      
        
        querySnapshot.docs.map(d => NewArr[NewArr.length] = ([d._document.data.value.mapValue.fields.name.stringValue, d.id,d._document.data.value.mapValue.fields.uid.stringValue,d._document.data.value.mapValue.fields.Type.stringValue]) )
    
       
        for(var t = 0; t<NewArr.length; t++){
          if(NewArr[t][3] !== 'Parent'){
            NewwerArr.push(NewArr[t])
          }
        }
   
        setNameId(NewwerArr)
        setNewArrFinished(true)
       
      }
      
      
      
      
  });
  
 
}
     
     //setErrorMessage(unsub())
    // return cleanup function
    //return () => subscriber();
    catch(err){
   
      setErrorMessage(err.toString())
    }
  }, []); // empty dependencies array => useEffect only called once




  function LoadImage(path){

    getDownloadURL(ref(storage, path.toString()))


    .then((url) => {
     
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

  
  

  function MakeCamelCase(stringCurr){
    function capitalizeFirstLetter(string) {
          return string.charAt(0).toUpperCase() + string.slice(1);
        }
    var StringArr= stringCurr.split(' ')
    var TempString = ''
    for(var i = 0; i < StringArr.length; i++){
        TempString = TempString + capitalizeFirstLetter(StringArr[i])
        if(i == StringArr.length-1){
            
        }
        else{
            TempString = TempString + ' '
        }
    }
    return(TempString)
  }

  useEffect(() => {
    try{
     
      var X = MakeCamelCase(CurrentQuizTopic.toString()).replaceAll(' ','').toString()
      if(CurrentTest == 'SAT'){
        var x = query(quizesRef, where("Topic", "==", X)); //, where("Topic", "==", CurrentQuizTopic.toString().toLowerCase())
      }else if(CurrentTest == 'ACT'){
        var x = query(quizesRefACT, where("Topic", "==", X)); //, where("Topic", "==", CurrentQuizTopic.toString().toLowerCase())
      
      }
      const unsub = onSnapshot(x, (querySnapshot) => {
       
        //console.log(querySnapshot.docs[0]._document.data.value.mapValue.fields.name.stringValue)
        //querySnapshot.docs.map(d => setUserNames(UserNames.push(d._document.data.value.mapValue.fields.name.stringValue)))
        //console.log("Data", querySnapshot.docs.map(d => d._document.data.value.mapValue.fields));
        
        setQuizDataId(querySnapshot.docs.map(d => d.id))
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
  }, [CurrentQuizTopic, CurrentTest]); // empty dependencies array => useEffect only called once


  function UpdateQuizAnswers(QuizAnswersArr){
    try{
      
    
      var X = MakeCamelCase(CurrentQuizTopic.toString()).replaceAll(' ','').toString()
      if(CurrentTest == 'SAT'){
        var x = query(quizesRef, where("Topic", "==", X)); //, where("Topic", "==", CurrentQuizTopic.toString().toLowerCase())
      }else if(CurrentTest == 'ACT'){
        var x = query(quizesRefACT, where("Topic", "==", X)); //, where("Topic", "==", CurrentQuizTopic.toString().toLowerCase())
      }
      const QuizDef = doc(db, "Quizes", X);
      /*
      const unsub = onSnapshot(x, (querySnapshot) => {
      
     
        
        setQuizDataId(querySnapshot.docs.map(d => d.id))
        setQuizData( querySnapshot.docs.map(d => d._document.data.value.mapValue.fields));
      });
      */

      var docData={
        Answers: QuizAnswersArr,
        Topic: X
      }
    
      setTimeout(()=>{
        if(QuizAnswersArr.length==0){
         
        }
        else{
          setDoc(doc(db, "Quizes", X), docData)
        }
      }, 1000)
    }catch(e){

    }
  }

  const [NewQuizName, setNewQuizName] = useState()
  const [NewClassroomStudent, setNewClassroomStudent] = useState()

  function AddQuiz(){
    var docData={
      Answers: [''],
      Topic: NewQuizName.replaceAll(' ','')
    }
    setIsOpenTwo(false)
    setTimeout(()=>{
      
      setDoc(doc(db, "Quizes", NewQuizName.replaceAll(' ','')), docData);
    }, 1000)
  }

  

 

function PullAllDates(s = CurrentStudent){
    try{
    //NameId
    //CurrentStudent
  
    function FindMatchingUid(){
      //NameId
      //CurrentStudent
      
        for(var i = 0; i< NameId.length; i++){
        
          if(s.value == NameId[i][0]){
            return(NameId[i][2])
          }
        }
      }

    var EventBuilder = []

      for(var i = 0; i< NameId.length; i++){
      

          var CurrName = NameId[i][2]
          const x = query(usersRef, where("uid", "==", FindMatchingUid())) //query(usersRef, where("id", "==", FindMatchingUid()));
          var NewArr = []
          const unsub = onSnapshot(x, (querySnapshot) => {
          
            var MeetingDateString = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.HistMeetingTimes.arrayValue.values)
            var NameString = querySnapshot.docs.map(d=> d._document.data.value.mapValue.fields.name.stringValue)
            var TutorString = querySnapshot.docs.map(d=> d._document.data.value.mapValue.fields.Tutor.stringValue)
           
            //var DateX = new Date(MeetingDateString[0].toString())

            //var newDateObj = new Date(DateX.getTime() + 90*60000);
            var CombinedString = NameString + '-' + TutorString
       
            var Meetings = MeetingDateString[0]
            var DateSet = false
            function containsObject(obj, list) {
              var i;
              for (i = 0; i < list.length; i++) {
                  if (list[i] === obj) {
                      return true;
                  }
              }
          
              return false;
          }
   
            var TempDate = ''
            var TempDateX = ''
            try{
              console.log(Meetings[0].length)
            }catch(e){
              return(null)
            }
            if(Meetings[0].length==0){
       
              setEvents([])
              return(null)
            }
            for(var i = 0; i < Meetings.length; i++){

              var DateX = new Date(Meetings[i].timestampValue.toString())
              var newDateObj = new Date(DateX.getTime() + 90*60000);

              //Placeholder
              var today = new Date();
              
              TempDateX = DateX
              
              var IsInPast = dateInPast(DateX, today)
              
              if(IsInPast == false && DateSet == false){
                TempDate = TempDateX
                DateSet = true
              }
              else{
                //TempDate = today
              }
              
              //setNextCurrentStudentDate(DateX)
              
              var TempDict ={
                event_id: (CombinedString + '-' + (i+1).toString()),
                title: CombinedString,
                start: TempDateX,
                end: newDateObj
              }
        
              if(containsObject(TempDict, EventBuilder) == false){
                EventBuilder.push(TempDict)
              }
             
            }

            if(DateSet == true){
              setNextCurrentStudentDate(TempDate)
            }
          

            const uniqueArray = EventBuilder.filter((value, index) => {
              const _value = JSON.stringify(value);
              return index === EventBuilder.findIndex(EventBuilder => {
                return JSON.stringify(EventBuilder) === _value;
              });
            });
          
            setEvents(uniqueArray)
            //setNextCurrentStudentDate(DateX)
            
            
      });
      }
    }catch(e){

    }
}

function DeleteAllDates(s, num){
  function FindMatchingUid(){
    //NameId
    //CurrentStudent
    
      for(var i = 0; i< NameId.length; i++){
      
        if(s == NameId[i][0]){
          return(NameId[i][2])
        }
      }
    }


  function FindMatchingUidUpdate(){
    try{
      //NameId
      //CurrentStudent
      
        for(var i = 0; i< NameId.length; i++){
        
          if(s == NameId[i][0]){
            return(NameId[i][1])
          }
        }
      
  
      const x = query(usersRef, where("uid", "==", FindMatchingUid())) //query(usersRef, where("id", "==", FindMatchingUid()));
      const studentDef = doc(db, "users", FindMatchingUidUpdate());
      var NewArr = []
      var UpdatedArr = []
      const unsub = onSnapshot(x, (querySnapshot) => {
        var MeetingDateString = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.HistMeetingTimes.arrayValue.values)

        //console.log(new Date(AssignmentString[0]))
        
        var NewMeetingDateString = MeetingDateString[0]
        
        var UpdateArr = NewMeetingDateString.splice(num, 1)
  
        
      });
      setTimeout(()=>{
        
        updateDoc(studentDef, {
            HistMeetingTimes: UpdatedArr
              
            })
      }, 1000)
    }catch(e){

    }
  }
}
function AddNewDates(s, newTime){
  function FindMatchingUid(){
    //NameId
    //CurrentStudent
    
      for(var i = 0; i< NameId.length; i++){
      
        if(s == NameId[i][0]){
          return(NameId[i][2])
        }
      }
    }


  function FindMatchingUidUpdate(){
    try{
      //NameId
      //CurrentStudent
      
        for(var i = 0; i< NameId.length; i++){
        
          if(s == NameId[i][0]){
            return(NameId[i][1])
          }
        }
      
  
      const x = query(usersRef, where("uid", "==", FindMatchingUid())) //query(usersRef, where("id", "==", FindMatchingUid()));
      const studentDef = doc(db, "users", FindMatchingUidUpdate());
      var NewArr = []
      var UpdatedArr = []
      const unsub = onSnapshot(x, (querySnapshot) => {
        var MeetingDateString = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.HistMeetingTimes.arrayValue.values)


        
        var NewMeetingDateString = MeetingDateString[0]
        
        for(var i = 0; i< NewMeetingDateString.length; i++){
          var DateX = new Date(NewMeetingDateString[i].timestampValue.toString())
          UpdatedArr.push(new Date(DateX))
        }
        

        UpdatedArr.push(new Date(newTime))
       
        
      });
      
      setTimeout(()=>{
    
        updateDoc(studentDef, {
            HistMeetingTimes: UpdatedArr
              
            })
      }, 1000)
    }catch(e){

    }
  }
}

function SetAllMeetings(){
  
    const x = query(usersRef) //query(usersRef, where("id", "==", FindMatchingUid()));
    
      
      
      const unsub = onSnapshot(x, (querySnapshot) => {
        //var MeetingDateString = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.HistMeetingTimes.arrayValue.values)

       
        console.log(querySnapshot.docs.map(d => d._document.data.value.mapValue.fields))
       
        var Total = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields)
        var NewArr = []
        var NameArr = []
        var TutorArr = []
        //var NameString = querySnapshot.docs.map(d=> d._document.data.value.mapValue.fields.name.stringValue)
        //var TutorString = querySnapshot.docs.map(d=> d._document.data.value.mapValue.fields.Tutor.stringValue)
        for(var i = 0; i< Total.length; i++){
          if(Total[i].Type.stringValue == 'Student'){
 
            for(var y = 0; y< Total[i].HistMeetingTimes.arrayValue.values.length; y++){
              if(Total[i].HistMeetingTimes.arrayValue.values[y].stringValue != ''){
             
                NewArr.push(Total[i].HistMeetingTimes.arrayValue.values[y].timestampValue)
                NameArr.push(Total[i].name.stringValue)
                TutorArr.push(Total[i].Tutor.stringValue)
             
              }
            }
     
          }
        }
        var Meetings = NewArr
        var EventBuilder = []
        for(var i = 0; i < Meetings.length; i++){
            
            var DateX = new Date(Meetings[i].toString())
            var newDateObj = new Date(DateX.getTime() + 90*60000);

          
           
            //setNextCurrentStudentDate(DateX)
            var CombinedString = NameArr[i] + '-' + TutorArr[i]
            var TempDict ={
              event_id: (CombinedString + '-' + (i+1).toString()),
              title: CombinedString,
              start: DateX,
              end: newDateObj
            }
           
            EventBuilder.push(TempDict)
          }
          
          setEvents(EventBuilder)

     
        
      });
      
      
}
/*
function UpdateAllDates(s, newTime,num){
  
  //NameId
  //CurrentStudent

  var EventBuilder = []


  function FindMatchingUid(){
    //NameId
    //CurrentStudent
    
      for(var i = 0; i< NameId.length; i++){
      
        if(s == NameId[i][0]){
          return(NameId[i][2])
        }
      }
    }


  function FindMatchingUidUpdate(){
      //NameId
      //CurrentStudent
      
        for(var i = 0; i< NameId.length; i++){
        
          if(s == NameId[i][0]){
            return(NameId[i][1])
          }
        }
      }

      
      
      const x = query(usersRef, where("uid", "==", FindMatchingUid())) //query(usersRef, where("id", "==", FindMatchingUid()));
      const studentDef = doc(db, "users", FindMatchingUidUpdate());
      var NewArr = []
      var UpdatedArr = []
      const unsub = onSnapshot(x, (querySnapshot) => {
        var MeetingDateString = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.HistMeetingTimes.arrayValue.values)

      
        
        var NewMeetingDateString = MeetingDateString[0]
     
        NewMeetingDateString[num].timestampValue = newTime
       
        
        for(var i = 0; i < NewMeetingDateString.length; i++){
          UpdatedArr.push(new Date(NewMeetingDateString[i].timestampValue))
          
        }
        
          
        
      });
      setTimeout(()=>{
        console.log(UpdatedArr)
        updateDoc(studentDef, {
            HistMeetingTimes: UpdatedArr
              
            })
      }, 1000)
      

      
      
      
            
  }

 */

  const [PayrollSubmitted, setPayrollSubmitted] = useState(false)

  function UpdatePayroll(){
    setPayrollSubmitted(true)
    const VarsDef = doc(db, "GlobalVariables", "Payroll");
    var docData={
      PayrollSubmitted: false,
      SubmitPayroll: new Date()
    }
   
    setTimeout(()=>{
      updateDoc(VarsDef, {
        PayrollSubmitted: false,
        SubmitPayroll: new Date()
        })
      //setDoc(doc(db, "GlobalVariables", "Payroll", docData));
    }, 500)
  }
function PullTest(s){
  function FindMatchingUid(){
    //NameId
    //CurrentStudent
    
      for(var i = 0; i< NameId.length; i++){
      
        if(s.value == NameId[i][0]){
          return(NameId[i][2])
        }
      }
    }

      
      try{
      const x = query(usersRef, where("uid", "==", FindMatchingUid())) //query(usersRef, where("id", "==", FindMatchingUid()));
      var NewArr = []
      const unsub = onSnapshot(x, (querySnapshot) => {
        var TestString = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.Test.stringValue)

        //console.log(new Date(AssignmentString[0]))
        if(Array.isArray(TestString) ==true){
       
          setCurrentTest(TestString[0])
          return(TestString[0])
        }else{
          setCurrentTest(TestString)
          return(TestString)
        }
       
        //setNextCurrentStudentDate(DateX)
       
      });
    }catch(e){

    }
}


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

      
      try{
      const x = query(usersRef, where("uid", "==", FindMatchingUid())) //query(usersRef, where("id", "==", FindMatchingUid()));
      var NewArr = []
      const unsub = onSnapshot(x, (querySnapshot) => {
        var AssignmentString = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.NextMeetingDate.timestampValue)

 
        var DateX = new Date(AssignmentString[0].toString())
        var today = new Date();


        //setNextCurrentStudentDate(DateX)
        
      });

      

      if(Type == 'Student' || Type == 'Parent'){
      
      }else if(Type == 'Tutor'){

      }
    }catch(e){

    }
}

function UpdateDate(){
  // d could just feed in date
  if(CurrentStudent !== '' ){
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
    //Placeholder
    function FindMatchingUid(){
      //NameId
      //CurrentStudent
        
        for(var i = 0; i< NameId.length; i++){
        
          if(s.value == NameId[i][0]){
            return(NameId[i][2])
          }
        }
      }
  
        
        try{
        const x = query(usersRef, where("uid", "==", FindMatchingUid())) //query(usersRef, where("id", "==", FindMatchingUid()));
       
        const unsub = onSnapshot(x, (querySnapshot) => {
          var AssignmentString = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.Notepad.stringValue)
  
        
          
  
          setTextOutput(AssignmentString[0])
          
        });
  
        if(Type == 'Student' || Type == 'Parent'){
        
        }else if(Type == 'Tutor'){
  
        }
      }catch(e){

      }
  }

  function PullTutorNotes(s){
    //Placeholder
    function FindMatchingUid(){
      //NameId
      //CurrentStudent
    
        for(var i = 0; i< NameId.length; i++){
        
          if(s.value == NameId[i][0]){
            return(NameId[i][2])
          }
        }
      }
  
        
        try{
        const x = query(usersRef, where("uid", "==", FindMatchingUid())) //query(usersRef, where("id", "==", FindMatchingUid()));
       
        const unsub = onSnapshot(x, (querySnapshot) => {
          var AssignmentString = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.TutorNotes.stringValue)
  
       
          
  
          setTutorNotes(AssignmentString[0])
          
        });
  
        if(Type == 'Student' || Type == 'Parent'){
        
        }else if(Type == 'Tutor'){
  
        }
      }catch(e){

      }
  }

  function PullZoomLink(){
    function FindMatchingUid(){
      //NameId
      //CurrentStudent
        
        for(var i = 0; i< NameId.length; i++){
        
          if(Tutor == NameId[i][0]){
            return(NameId[i][2])
          }
        }
      }
  
        
        try{
        const x = query(usersRef, where("uid", "==", FindMatchingUid())) //query(usersRef, where("id", "==", FindMatchingUid()));
       
        const unsub = onSnapshot(x, (querySnapshot) => {
          var AssignmentString = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.ZoomLink.stringValue)
  
          
  
          setZoomLink(AssignmentString[0])
          
        });
  
        if(Type == 'Student' || Type == 'Parent'){
        
        }else if(Type == 'Tutor'){
  
        }
      }catch(e){

      }
  }

  function UpdateNotepad(t){
    // d could just feed in date
 
    if(CurrentStudent !== '' ){
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
              Notepad: t
            
              });
            }
  }

  function UpdateSVG(t){
    // d could just feed in date
 
    if(CurrentStudent !== '' ){
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
              SVG: t
            
              });
            }
  }

  function PullSVG(s){
    //Placeholder
    function FindMatchingUid(){
      //NameId
      //CurrentStudent
        
        for(var i = 0; i< NameId.length; i++){
        
          if(s.value == NameId[i][0]){
            return(NameId[i][2])
          }
        }
      }
  
        
        try{
        const x = query(usersRef, where("uid", "==", FindMatchingUid())) //query(usersRef, where("id", "==", FindMatchingUid()));
       
        const unsub = onSnapshot(x, (querySnapshot) => {
          var AssignmentString = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.SVG.stringValue)
  
        
          
          //console.log(querySnapshot.docs.map(d => d._document.data.value.mapValue))
          setSVG(AssignmentString[0])
          console.log("SVG: " + AssignmentString)
          
        });
  
        if(Type == 'Student' || Type == 'Parent'){
        
        }else if(Type == 'Tutor'){
  
        }
      }catch(e){

      }
  }

  function UpdateImprovement(t){
    // d could just feed in date
 
    if(CurrentStudent !== '' ){
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
              Improvement: t
            
              });
            }
  }

  function UpdateTutorNotes(t){
    // d could just feed in date
  
    if(CurrentStudent !== '' ){
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
              TutorNotes: t
            
              });
            }
  }

  function UpdateCurrentTest(test){

    if(CurrentStudent !== '' ){
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
              Test: test
            
              });
            }
  }

  function UpdateZoomLink(t){
    // d could just feed in date
  
    if(CurrentStudent !== '' ){
      function FindMatchingId(ID){
        //NameId
        //CurrentStudent
        
        for(var i = 0; i< NameId.length; i++){
        
          if(ID == NameId[i][2]){
            return(NameId[i][1])
          }
        }
      }
      
      
      //const x = query(usersRef, where("uid", "==", auth.currentUser.uid.toString()));
      var x = doc(db, "users", FindMatchingId(auth.currentUser.uid.toString()));
  
      updateDoc(x, {
              ZoomLink: t
            
              });
            }
  }

  function PullClassDate(s = null){
      function FindMatchingUid(){
        //NameId
        //CurrentStudent
        
          for(var i = 0; i< NameId.length; i++){
          
            if(s.value == NameId[i][0]){
              return(NameId[i][2])
            }
          }
        }
       
        try{
        if(Type == 'Student' || Type == 'Parent'){
          const x = query(usersRef, where("uid", "==", FindMatchingUid())) //query(usersRef, where("id", "==", FindMatchingUid()));
          var NewArr = []
          const unsub = onSnapshot(x, (querySnapshot) => {
          var AssignmentString = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.ClassDate.timestampValue)

          var DateX = new Date(AssignmentString[0].toString())
  
          setNextClassDate(DateX)
          
        });
        }else if(Type == 'Tutor'){
        
          const x = query(usersRef, where("uid", "==", auth.currentUser.uid.toString()));//query(usersRef, where("id", "==", FindMatchingUid()));
          var NewArr = []
          const unsub = onSnapshot(x, (querySnapshot) => {
          var AssignmentString = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.ClassDate.timestampValue)
  
        
          var DateX = new Date(AssignmentString[0].toString())
        
          setNextClassDate(DateX)
          
        });
        }
      }catch(e){

      }
  }

  useEffect(()=>{
    if(Type == 'Tutor'){
     
      PullClassDate()
    }
  },[auth.currentUser, Type])

  

  function UpdateClassDate(){
    // d could just feed in date
    //Placeholder
    //const x = query(usersRef, where("uid", "==", auth.currentUser.uid.toString()));
    if(auth.currentUser){


      function FindMatchingUid(student){
        //NameId
        //CurrentStudent
        
        for(var i = 0; i< NameId.length; i++){
        
          if(student == NameId[i][0]){
            return(NameId[i][1])
          }
        }
      }

      function FindMatchingId(ID){
        //NameId
        //CurrentStudent
        
        for(var i = 0; i< NameId.length; i++){
        
          if(ID == NameId[i][2]){
            return(NameId[i][1])
          }
        }
      }
      
      
      //const x = query(usersRef, where("uid", "==", auth.currentUser.uid.toString()));
      var x = doc(db, "users", FindMatchingId(auth.currentUser.uid.toString()));
      updateDoc(x, {
          ClassDate: NextClassDate
        
          });
     
      for(var i = 0; i < ClassroomStudentsClean.length; i++){

        var studentDef = doc(db, "users", FindMatchingUid(ClassroomStudentsClean[i]));
    
        updateDoc(studentDef, {
                ClassDate: NextClassDate
              
                });
        }

        for(var i = 0; i < ClassroomStudentsCleanACT.length; i++){

        var studentDef = doc(db, "users", FindMatchingUid(ClassroomStudentsCleanACT[i]));
      
        updateDoc(studentDef, {
                  ClassDate: NextClassDate
                
                  });
        }
      }
  }

  useEffect(()=>{
    if(Type == 'Tutor'){
      UpdateClassDate()
    }
  },[NextClassDate])

  function PullDoneAssignments(s){
    function FindMatchingUidQuery(){
      //NameId
      //CurrentStudent
      
        for(var i = 0; i< NameId.length; i++){
        
          if(s.value == NameId[i][0]){
            return(NameId[i][2])
          }
        }
      }
    function diffArray(arr1, arr2) {
        return arr1
          .concat(arr2)
          .filter(item => !arr1.includes(item) || !arr2.includes(item));
      }
    function diffSimilarArray(arr2, arr1){
      var TempArr = []
      for(var i = 0; i < arr1.length; i++){
        for(var y = 0; y<arr2.length; y++){
          if(arr1[i].replaceAll(' ', '').toLowerCase() == arr2[y].replaceAll(' ', '').toLowerCase()){
           
          }
          else{
            if(TempArr.includes(arr1[i])){
              
            }
            else{
              TempArr.push(arr1[i])
            }
          }

        }
      }
      return(TempArr)
    }
    try{
    const studentDef = query(usersRef, where("uid", "==", FindMatchingUidQuery()));

    const unsub = onSnapshot(studentDef, (querySnapshot) => {
      
      var AssignmentString2 = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.assignmentsDone.stringValue)
     
      var AS = AssignmentString2[0]
      var Arr = AS.split('%')
  
      setAssignmentsDoneGlobal(Arr.slice(1,Arr.length))

      if(CurrentTest == 'SAT'){
        var TopicsName = ''
        var ArrName = ''
        var TopicCopy = TopicsFull
       
        var ArrDone = []
        var Bools = TopicsBool
        var ArrX = Arr.slice(1,Arr.length)
        for(var i = 0; i< TopicsFull.length; i++){
          TopicsName = TopicsFull[i][0]

          for(var x = 0; x< ArrX.length; x++){
            ArrName = ArrX[i]
            if(TopicsName == ArrName){
              ArrDone.push(ArrName)
              TopicCopy[i][1] = true
              Bools[i] = true
            }
          }
        }
    

        var DiffArr = diffSimilarArray(ArrDone, ArrX)
       
        for(var y = 0; y<DiffArr.length; y++){
          var TempArr = [DiffArr[y], true, 101]
          TopicCopy.push(TempArr)
          Bools.push(true)
        }
      
        setTopicsFull(TopicCopy)
        setTopics(TopicCopy)
      
        setTopicsBool(Bools)
      }else if(CurrentTest == 'ACT'){
        var TopicsName = ''
        var ArrName = ''
        var TopicCopy = TopicsFullACT
 
        var ArrDone = []
        var Bools = TopicsBool
        var ArrX = Arr.slice(1,Arr.length)
        for(var i = 0; i< TopicsFullACT.length; i++){
          TopicsName = TopicsFullACT[i][0]

          for(var x = 0; x< ArrX.length; x++){
            ArrName = ArrX[i]
            if(TopicsName == ArrName){
              ArrDone.push(ArrName)
              TopicCopy[i][1] = true
              Bools[i] = true
            }
          }
        }
        

        var DiffArr = diffSimilarArray(ArrDone, ArrX)
    
        for(var y = 0; y<DiffArr.length; y++){
          var TempArr = [DiffArr[y], true, 101]
          TopicCopy.push(TempArr)
          Bools.push(true)
        }
    
        setTopicsFullACT(TopicCopy)
        setTopicsACT(TopicCopy)
       
        setTopicsBool(Bools)
      }
    });
  }catch(e){

  }
  }

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

    function FindMatchingUidQuery(){
      //NameId
      //CurrentStudent
      
        for(var i = 0; i< NameId.length; i++){
        
          if(CurrentStudent.value == NameId[i][0]){
            return(NameId[i][2])
          }
        }
      }

    const studentDef = doc(db, "users", FindMatchingUid());




    try{
    const X = query(usersRef, where("uid", "==", FindMatchingUidQuery())) //query(usersRef, where("id", "==", FindMatchingUid()));
    var AssignmentsArc = ''
    var AssignmentsDone = ''
   
    const unsub = onSnapshot(X, (querySnapshot) => {
          var AssignmentString = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.assignmentsArc.stringValue)
          var AssignmentString2 = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.assignmentsDone.stringValue)
       

          AssignmentsArc = AssignmentString[0]
          AssignmentsDone = AssignmentString2[0]
     
    });

    setTimeout(() => {
     var ArrString = ''
     var FinishedTopic = ''
    
      for(var i = 0; i < StudentAssignments.length; i++){
        for(var x = 0; x<3; x++){
      
          ArrString = ArrString + StudentAssignments[i][x].toString() + '+'
        }
        if(StudentAssignments[i][1] == true){

          FinishedTopic = FinishedTopic + StudentAssignments[i][0] + '+'
        }
        
        ArrString = ArrString.slice(0, -1)
        ArrString = ArrString + '%'
      }
    

      if(Type == 'Student' || Type == 'Parent'){

      }else if(Type == 'Tutor'){
        var FinishedTopicX = FinishedTopic.toString().replaceAll('+','%')
        updateDoc(studentDef, {
          assignmentsArc: AssignmentsArc.toString() + '%' + ArrString.slice(0, -1).toString()
          });
        updateDoc(studentDef, {
            assignments: ''
          });
        updateDoc(studentDef, {
            assignmentsDone: AssignmentsDone.toString() + '%' + FinishedTopicX.slice(0, -1) 
          });

      }



      }, 1000)

    }catch(e){

    }
    }

  
  


  function UpdateStudentAssignments(StudentAssignments){

    if(CurrentStudent !== '' ){
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
       
          ArrString = ArrString + StudentAssignments[i][x].toString() + '+'
        }
        ArrString = ArrString.slice(0, -1)
        ArrString = ArrString + '%'
      }
      

      if(Type == 'Student' || Type == 'Parent'){
        updateDoc(studentDef, {
          assignments: ArrString.slice(0, -1) 
          });
      }else if(Type == 'Tutor'){
        updateDoc(studentDef, {
          assignments: ArrString.slice(0, -1) 
          });
      }
    }
  }

  function DeleteFromPDFLinks(name,link){
    function FindMatchingUid(){
      //NameId
      //CurrentStudent
      
      for(var i = 0; i< NameId.length; i++){
      
        if(UserName.toString() == NameId[i][0]){
          return(NameId[i][2])
        }
      }
    }


    console.log("INNIT")
    const X = query(usersRef, where("uid", "==", FindMatchingUid())) //query(usersRef, where("id", "==", FindMatchingUid()));
    var AdditionalPDFUrl = ''
   
   
    const unsub = onSnapshot(X, (querySnapshot) => {
          var String = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.AdditionalPDFUrl.stringValue)
          AdditionalPDFUrl = String[0]
    });
  
    const tutorDef = doc(db, "users", FindMatchingUid());
    var StringToDelete = name + '%' + link 
    var NewString = AdditionalPDFUrl.replace(StringToDelete, '')
    console.log("NewString: " + NewString)
    updateDoc(tutorDef, {
      AdditionalPDFUrl: NewString //.slice(0, -1) 
      });

   


  }



  const [NewPDFLinks, setNewPDFLinks] = useState([])
  useEffect(()=>{
    try{
      function FindMatchingUid(){
        //NameId
        //CurrentStudent
        
        for(var i = 0; i< NameId.length; i++){
        
          if(UserName.toString() == NameId[i][0]){
            return(NameId[i][2])
          }
        }
      }
    console.log(FindMatchingUid())
    const X = query(usersRef, where("uid", "==", FindMatchingUid())) //query(usersRef, where("id", "==", FindMatchingUid()));
    var AdditionalPDFUrl = ''
   
   
    const unsub = onSnapshot(X, (querySnapshot) => {
          var String = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.AdditionalPDFUrl.stringValue)
          console.log("String")
          console.log(querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.AdditionalPDFUrl.stringValue))
          AdditionalPDFUrl = String[0]
    


    var FirstSplit = AdditionalPDFUrl.split('#')
    console.log("FirstSplit")
    console.log(FirstSplit)
    console.log(AdditionalPDFUrl)
    for(var i = 0; i<FirstSplit.length; i++){
      if(FirstSplit[i] == ''){
      
      }else{
        var SecondSplit = FirstSplit[i].split('%')
        NewPDFLinks.push(SecondSplit)
      }
     
    }
    console.log("NewPDFLinks")
    console.log(NewPDFLinks)
    setNewPDFLinks(NewPDFLinks)
  });
  }catch(e){
    console.log(e)
    console.log("Super error")
  }
  },[UserName])


  const [SwitchText, setSwitchText] = useState('Add')
  const [ButtonPressed, setButtonPressed] = useState(false)

  const [FirstStart, setFirstStart] = useState(true)
  useEffect(()=>{
    console.log('jlkdjfdlskjfdslkjfd')
    try{
    //PlaceholderURL
    console.log("klfsjlkdfsjkfdjs")
    function FindMatchingUid(){
      //NameId
      //CurrentStudent
      
      for(var i = 0; i< NameId.length; i++){
      
        if(UserName.toString() == NameId[i][0]){
          return(NameId[i][2])
        }
      }
    }

    
    console.log("INNIT")
    const X = query(usersRef, where("uid", "==", FindMatchingUid())) //query(usersRef, where("id", "==", FindMatchingUid()));
    var AdditionalPDFUrl = ''
   
   
    const unsub = onSnapshot(X, (querySnapshot) => {
          var String = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.AdditionalPDFUrl.stringValue)
          AdditionalPDFUrl = String[0]
    });
  
    const tutorDef = doc(db, "users", FindMatchingUid());
    
    var NewString = AdditionalPDFUrl + NewPDFName + '%' + NewPDFURL + '#'
    console.log("NewString: " + NewString)
    updateDoc(tutorDef, {
      AdditionalPDFUrl: NewString //.slice(0, -1) 
      });

    setTimeout(() => {

      if(SwitchText == 'Add'){
        setSwitchText('Added!')
      }else if(SwitchText == 'Added!'){
        setSwitchText('Add')
      }
    }, 1000);
    }catch(e){
      console.log(e)
      console.log("ERROR")
    }
  },[ButtonPressed])


  function UpdateStudentAssignmentsClassroom(StudentAssignments, Student){
 
    
    if(CurrentStudent !== '' ){
      function FindMatchingUid(){
        //NameId
        //CurrentStudent
        
        for(var i = 0; i< NameId.length; i++){
        
          if(Student == NameId[i][0]){
            return(NameId[i][1])
          }
        }
      }
    
      const studentDef = doc(db, "users", FindMatchingUid());
      var ArrString = ''
      
      for(var i = 0; i < StudentAssignments.length; i++){
        for(var x = 0; x<3; x++){
        
          ArrString = ArrString + StudentAssignments[i][x].toString() + '+'
        }
        ArrString = ArrString.slice(0, -1)
        ArrString = ArrString + '%'
      }
  

      if(Type == 'Student' || Type == 'Parent'){
        updateDoc(studentDef, {
          assignments: ArrString.slice(0, -1) 
          });
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

        try{
        const x = query(usersRef, where("uid", "==", FindMatchingUid())) //query(usersRef, where("id", "==", FindMatchingUid()));
        var NewArr = []
       
        const unsub = onSnapshot(x, (querySnapshot) => {
          var AssignmentString = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.assignments.stringValue)
         
          var AssignmentArr = AssignmentString[0].split('%')
          
         
         
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
          for( var i = 0; i < NewArr.length; i++){ 
    
            if ( NewArr[i][0] === '') { 
        
              NewArr.splice(i, 1); 
            }
        
        }
        
          setStudentAssignments(NewArr)
        });

        if(Type == 'Student' || Type == 'Parent'){

       
        
        }else if(Type == 'Tutor'){

        }
        }catch(e){

        }
  }
 
  
  
	const [selectedFile, setSelectedFile] = useState();
  const [selectedText, setSelectedText] = useState('N/A');
  const [selectedTitle, setSelectedTitle] = useState('');
	const [isFilePicked, setIsFilePicked] = useState(false);

  const [numProjectsLeft, setNumProjectsLeft] = useState(10)
  const [TitleOutput, setTitleOutput] = useState()
  
  const [Email, setEmail] = useState('N/A')
  const [EmailSubmitted, setEmailSubmitted] = useState(false)
  const [PageSwitch, setPageSwitch] = useState(10)
  //const [globalEmail, setGlobalEmail] = useGlobal('x');	
  //let Users = firebase.firestore().collection('users');
  const [UsersX, setUsersX] = useState([])
  const [CurrentQuizData, setCurrentQuizData] = useState(null)
  
	




  useEffect(()=>{
    //placeholder
    const delayDebounceFn = setTimeout(() => {
      UpdateNotepad(TextOutput)
    }, 5000)
    return () => clearTimeout(delayDebounceFn)
    //UpdateNotepad(TextOutput)
  },[TextOutput])

  useEffect(()=>{
    //placeholder
    const delayDebounceFn = setTimeout(() => {
      UpdateTutorNotes(TutorNotes)
    }, 5000)
    return () => clearTimeout(delayDebounceFn)
   
  },[TutorNotes])

  useEffect(()=>{
    //placeholder
    const delayDebounceFn = setTimeout(() => {
      UpdateZoomLink(ZoomLink)
    }, 5000)
    return () => clearTimeout(delayDebounceFn)
 
  },[ZoomLink])

  const handleTextChange = event => {
    // 👇️ update textarea value
  
    setTextOutput(event.target.value);
    
    //setSelectedText(event.target.value)
  };
  const handleTextChangeTutorNotes = event => {
    // 👇️ update textarea value
  
    setTutorNotes(event.target.value);
    
    //setSelectedText(event.target.value)
  };


  const [posts, setPosts] = useState([]);
  
  
  

  //useEffect(selectDashboard, [selectDashboard]);
  const Name = 'Joseph'
  const [name, setName] = useState()
  const [info , setInfo] = useState([]);
 


 

  
  const [errorCheck, setErrorCheck] = useState()
	//const alert = useAlert();
  //const alert = useAlert();


 



  const [QuizLoaded, setQuizLoaded] = useState(0)

 
  
 
  function QuizBuilder(){


    
    var CurNum = 0
    //var TotalNum = parseInt(QuizData[0]['nrOfQuestions'].stringValue)
      function camelcase(stringCurr){
    
        var StringArr= stringCurr.split('')
        var TempString = ''
        var TotalString = ''
        for(var i = 0; i < StringArr.length; i++){
            var character = StringArr[i]
            if (character == character.toUpperCase()) {
                if(i == 0){
                    TempString = character
                }
                else{
                  
                    TotalString = TotalString  + TempString + " "
                    TempString = character
                }
              
            }
            if (character == character.toLowerCase()){
                TempString = TempString + character
                if(i == StringArr.length-1){
                    TotalString = TotalString  + TempString
                }
            }
        }
        return(TotalString)
    }

    function GetUnqiueValues(Arr){
      var TempArr = []
      for(var i = 0; i<Arr.length;i++){
        if(!TempArr.includes(Arr[i].stringValue) ){
            TempArr.push(Arr[i].stringValue)
        }
      }
      return(TempArr)
    }

    function GetCorrectAnswers(Arr, char){
   
      var ArrX = Arr.filter(x => isNaN(x))
      for(var i = 1; i < ArrX.length+1; i++){
        if(ArrX[i-1] == char){
          return((i+1).toString())
        }
      }
      
    }

    function CheckValues(ValueDict){
      for(var propName in ValueDict){
        if(ValueDict.hasOwnProperty(propName)){
          var propValue = ValueDict[propName]
          return(propValue)
        }
      }
    }

   

    function CreateRandomAnswers( DecimalCorrectNumber, TotalArr){
      var FilterArr = [DecimalCorrectNumber]
      FilterArr = FilterArr.filter(x => isNaN(x))
   
  
      function GetUniqueValues(Arr){
          var TempArr = []
          for(var i = 0; i<Arr.length; i++){
              if(!TempArr.includes(CheckValues(Arr[i]))){
                  TempArr.push(CheckValues(Arr[i]))
              }
          }
          return(TempArr)
      }
  
      if(FilterArr.length == 1){
          return(GetUniqueValues(TotalArr))
      }else{
          //return('Hell Nah')
      }
  
      function afterDecimal(num) {
        if (Number.isInteger(num)) {
          return 0;
        }
     
        try{
          var Output = num.toString().split('.')[1].length
        }catch(err){
          var Output = 0
        }
        return Output;
      }
  
      const roundToHundredth = (value) => {
        return Number(value.toFixed(2));
      };
  
      function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
        // While there remain elements to shuffle.
        while (currentIndex != 0) {
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
        return array;
      }

          var TempArr = []
          for(var i =  DecimalCorrectNumber - DecimalCorrectNumber*2; i<DecimalCorrectNumber+ DecimalCorrectNumber*2; i= i+1/10**afterDecimal(DecimalCorrectNumber)){
              TempArr.push(roundToHundredth(i))
          }
  
          var AlmostDoneArr = shuffle(TempArr).splice(0,3)
          AlmostDoneArr.push(DecimalCorrectNumber)
          var DoneArr = shuffle(AlmostDoneArr)
          return(DoneArr)
  
      
  
    }
   
    //doubleValue
    //intengerValue
  
    var List = []
    if(QuizData){
      
      for(var x = 0; x < QuizData[0]['Answers'].arrayValue.values.length; x++){
      
        var RandomAnswers = CreateRandomAnswers( CheckValues(QuizData[0]['Answers'].arrayValue.values[x]),QuizData[0]['Answers'].arrayValue.values)

        var RandomAnswersIndex = 0
        for(var i = 0; i<RandomAnswers.length; i++){
          if(RandomAnswers[i] == CheckValues(QuizData[0]['Answers'].arrayValue.values[x])){
            RandomAnswersIndex = i + 1
          }
        }
        var Temp = {
          "question": "Answer the following question:",
          "questionType": "text",
          //"questionPic": ChangeImage(QuizData[0]['Topic'].stringValue,x, parseInt(QuizData[0]['nrOfQuestions'].stringValue)) , // if you need to display Picture in Question
          "answerSelectionType": "single",
          "answers": RandomAnswers,
          "correctAnswer": RandomAnswersIndex.toString(),
          "messageForCorrectAnswer": "Correct answer. Good job!",
          "messageForIncorrectAnswer": "Incorrect answer. Please try again!",
          //"explanation": QuizData[x]['Answers'].arrayValue.values[1].stringValue,
          "point": "20"
        }
       
        List.push(Temp)
      }

      //TopicsBookCapterConst
      //TopicsFull
      var Chapter = ''
      for(var j = 0; j<TopicsFull.length; j++){
        if(TopicsFull[j][0].replaceAll(' ','').toLowerCase() == QuizDataId[0].replaceAll(' ','').toLowerCase()){
          Chapter = TopicsBookCapterConst[j]
        }
      }
      var Header = {
        "quizTitle": camelcase(QuizDataId[0]) + " - Chapter "+ Chapter,
        "quizSynopsis":"Testing your ability to understand "+ camelcase(QuizDataId[0]) + '.',
        "nrOfQuestions": QuizData[0]['Answers'].arrayValue.values.length.toString(),
        "questions": List
      }
     
      setCurrentQuizData(Header)
    }
    
  }

  function PullQuizResult(s){
    function FindMatchingUid(){
      //NameId
      //CurrentStudent
      
        for(var i = 0; i< NameId.length; i++){
        
          if(s.value == NameId[i][0]){
            return(NameId[i][2])
          }
        }
      }

      function createData(Category, Chapter ,Right, Wrong, Percent) {
        return { Category, Chapter , Right,  Wrong,  Percent};
      }
  
        
        try{
        const x = query(usersRef, where("uid", "==", FindMatchingUid())) //query(usersRef, where("id", "==", FindMatchingUid()));
       
        const unsub = onSnapshot(x, (querySnapshot) => {
          var AssignmentString = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.QuizResults.stringValue)
         
          if(AssignmentString[0].length == 0){
         
            return(null)
          }
         
          
          //Breakingpoint
          setQuizResultsGlobal(AssignmentString[0])
          var TempArr = AssignmentString[0].split('%')
          var Pusher = []
       

       
          for(var i = 0; i < TempArr.length; i++){
            var InnerArr = TempArr[i].split('+')
            var InnerChapter = ''
           

            if(CurrentTest == 'SAT'){

              for(var x =0; x<TopicsFull.length; x++){
                var Camel = TopicsFull[x][0].toString().replaceAll(' ','').toLowerCase()
                
                if(Camel ==InnerArr[0].replaceAll(' ','').toLowerCase()){
                 
                  InnerChapter = TopicsBookCapterConst[x]
                  break
                }
              }
              var PushDict = createData(InnerArr[0], parseInt(InnerChapter), InnerArr[1], InnerArr[2], Math.round((parseInt(InnerArr[1])/(parseInt(InnerArr[1]) + parseInt(InnerArr[2])))*100).toString()+ '%')
              Pusher.push(PushDict)
              //createData
              //TopicsFull
            }else if(CurrentTest == 'ACT'){
              for(var x =0; x<TopicsFullACT.length; x++){
                var Camel = TopicsFullACT[x][0].toString().replaceAll(' ','').toLowerCase()
                
                if(Camel ==InnerArr[0].replaceAll(' ','').toLowerCase()){
               
                  InnerChapter = TopicsBookCapterConstACT[x]
                  break
                }
              }
              var PushDict = createData(InnerArr[0], parseInt(InnerChapter), InnerArr[1], InnerArr[2], Math.round((parseInt(InnerArr[1])/(parseInt(InnerArr[1]) + parseInt(InnerArr[2])))*100).toString()+ '%')
              Pusher.push(PushDict)
              //createData
              //TopicsFull
            }
          }
          setHWrowsGlobal(Pusher)
        });
        
        



        
  
        if(Type == 'Student' || Type == 'Parent'){
        
        }else if(Type == 'Tutor'){
  
        }
      }catch(e){

      }
  }


  function UpdateQuizResult(Data){
    // d could just feed in date
   
    if(CurrentStudent !== '' ){
      function FindMatchingUid(){
        //NameId
        //CurrentStudent
        
        for(var i = 0; i< NameId.length; i++){
        
          if(CurrentStudent.value == NameId[i][0]){
            return(NameId[i][1])
          }
        }
      }
      function FindMatchingUidQuery(){
        //NameId
        //CurrentStudent
        
          for(var i = 0; i< NameId.length; i++){
          
            if(CurrentStudent.value == NameId[i][0]){
              return(NameId[i][2])
            }
          }
        }
      function DoubleCheck(str){
        var arr  = str.split('+')
        if(parseInt(arr[1]) == 0 && parseInt(arr[2]) == 0){
          return('exit')
        }
        else{
          return('cont.')
        }
      }
      try{
      const X = query(usersRef, where("uid", "==", FindMatchingUidQuery())) //query(usersRef, where("id", "==", FindMatchingUid()));
      var QuizResultsString = ''
      try{
        const unsub = onSnapshot(X, (querySnapshot) => {
              QuizResultsString = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.QuizResults.stringValue)
            
              
                  
        }
        )
        }
      catch(err){
     
        QuizResultsString = ''
      }
      /*
      if(QuizResultsString.length >0){

      }else{
        return(null)
      }
      */
  
      var des = DoubleCheck(QuizResultsString)
      if(des == 'exit'){
        return(null)
      }
      const studentDef = doc(db, "users", FindMatchingUid());
      
      setTimeout(()=>{
    
               
        updateDoc(studentDef, {
                        QuizResults: Data + '%' + QuizResultsString
                      
                        });
      },500)
      
                    
    }catch(e){

    }   
      
    }
  }

  function setQuizResults(obj){
 
    var UserInput = obj.userInput
    if(UserInput.length !== 0){
      var numberOfCorrectAnswers = obj.numberOfCorrectAnswers
      var numberOfIncorrectAnswers = obj.numberOfIncorrectAnswers
      //CurrentQuizTopic
      var TempString = CurrentQuizTopic + '+' + numberOfCorrectAnswers.toString() + '+' + numberOfIncorrectAnswers.toString()
    
      UpdateQuizResult(TempString)
    }
  }

 


  useEffect(()=>{
    console.log("CurrentStudent changed")
  },[CurrentStudent])
  
  useEffect(()=>{
    if(QuizData){
      
      QuizBuilder()
    }
    
  },[QuizData])

  function SwitchQuiz(num){
    switch(num) {
      case 0:
        return(CurrentQuiz)
        break;
      case 1:
        return(CurrentQuiz2)
        break;
      case 2:
          return(CurrentQuiz3)
          break;
          case 3:
            return(CurrentQuiz4)
            break;
          case 4:
            return(CurrentQuiz5)
            break;
          case 5:
              return(CurrentQuiz6)
              break;
          
      case 6:
        return(CurrentQuiz7)
        break;
      case 7:
          return(CurrentQuiz8)
          break;
          
      case 8:
        return(CurrentQuiz9)
        break;
      case 9:
          return(CurrentQuiz10)
          break;
         
      case 10:
        return(CurrentQuiz11)
        break;
      case 11:
          return(CurrentQuiz12)
          break;
          
      case 12:
        return(CurrentQuiz13)
        break;
      case 13:
          return(CurrentQuiz14)
          break;
          case 14:
            return(CurrentQuiz15)
            break;
          case 15:
            return(CurrentQuiz16)
            break;
          case 16:
              return(CurrentQuiz17)
              break;
             
      case 17:
        return(CurrentQuiz18)
        break;
      case 18:
          return(CurrentQuiz19)
          break;
        
      default:
        // code block
    }
  }
  function LoopThruQuizes(){

  }

  useEffect(()=>{
    if(CurrentQuizData && CurrentTest){
  
      var Quizzer = <Quiz quiz={CurrentQuizData} onComplete={(obj)=>setQuizResults(obj)} showInstantFeedback={true}/>
     
      //CurrentQuiz.push(Quizzer)
     
      //setCurrentQuiz(A)
      /*
      if(CurrentQuizNum == -1){
        CurrentQuiz.push(Quizzer)
      }
      if(CurrentQuizNum == 0){
        setCurrentQuiz2(Quizzer)
      }
      if(CurrentQuizNum == 1){
        CurrentQuiz3.push(Quizzer)
      }
      */
      var A = CurrentQuizNum+1
      setCurrentQuizNum(A)


      switch(A) {
        case 0:
          CurrentQuiz.push(Quizzer)
          break;
        case 1:
          setCurrentQuiz2(Quizzer)
          break;
        case 2:
          CurrentQuiz3.push(Quizzer)
            break;
        case 3:
          setCurrentQuiz4(Quizzer)
              break;
        case 4:
          CurrentQuiz5.push(Quizzer)
                break;
        case 5:
          setCurrentQuiz6(Quizzer)
                  break;
        case 6:
          CurrentQuiz7.push(Quizzer)
                    break;
        case 7:
          setCurrentQuiz8(Quizzer)
          break;
        case 8:
          CurrentQuiz9.push(Quizzer)
            break;
        case 9:
          setCurrentQuiz10(Quizzer)
              break;
        case 10:
          CurrentQuiz11.push(Quizzer)
                break;
        case 11:
          setCurrentQuiz12(Quizzer)
                  break;
        case 12:
          CurrentQuiz13.push(Quizzer)
                    break;
        case 13:
          setCurrentQuiz14(Quizzer)
          break;
        case 14:
          CurrentQuiz15.push(Quizzer)
            break;
        case 15:
          setCurrentQuiz16(Quizzer)
              break;
        case 16:
          CurrentQuiz17.push(Quizzer)
                break;
        case 17:
          setCurrentQuiz18(Quizzer)
                  break;
        case 18:
          CurrentQuiz19.push(Quizzer)
                    break;
        default:
          // code block
      }
      
      
    }
  },[CurrentQuizData, CurrentStudent, CurrentTest])

  const segment = {
    basic: 'basic',
    medium: 'medium',
    advanced: 'advanced',
  };

  
  
  const [data, setData] = useState([
    [{ value: "Test" }, { value: "Section" },{ value: "Question" }, { value: "Subject" },{ value: "Detail" },{ value: "Student Answer" },{value:'Correct Answer'},{ value: "Outcome" }],
    
  ]);
  const [dataAssignments, setDataAssignments] = useState([
    
  ]);
  const [dataTotal, setDataTotal] = useState(null);
  const [DataTotalRaw, setDataTotalRaw] = useState([]);
  const [StandardizedTestsDone, setStandardizedTestsDone] = useState([])



  function UpdateStudentData(TempArr, index){
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
      
        if(index == 1){
          updateDoc(studentDef, {
            Test1: ArrString.slice(0, -1) 
            });
        }
        else if(index == 2){
         
          updateDoc(studentDef, {
            Test2: ArrString.slice(0, -1) 
            });
          
        }
        else if(index == 3){
          updateDoc(studentDef, {
            Test3: ArrString.slice(0, -1) 
            });
        }
        else if(index == 4){
          updateDoc(studentDef, {
            Test4: ArrString.slice(0, -1) 
            });
        }
        else if(index == 5){
          updateDoc(studentDef, {
            Test5: ArrString.slice(0, -1) 
            });
        }
        else if(index == 6){
          updateDoc(studentDef, {
            Test6: ArrString.slice(0, -1) 
            });
        }
        else if(index == 7){
          updateDoc(studentDef, {
            Test7: ArrString.slice(0, -1) 
            });
        }
        else if(index == 8){
          updateDoc(studentDef, {
            Test8: ArrString.slice(0, -1) 
            });
        }
        else if(index == 9){
          updateDoc(studentDef, {
            Test9: ArrString.slice(0, -1) 
            });
        }
        else if(index == 10){
          updateDoc(studentDef, {
            Test10: ArrString.slice(0, -1) 
            });
        }
      }
    }
  }

  function UpdateDiagnosticsTest(TempArr){
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
     
      
       
          updateDoc(studentDef, {
            DiagnosticsTestResults: ArrString.slice(0, -1) 
            });
      

    }
  }

  function DiagnosticsTestAnswerBank(){
    //var DiagnosticsDetails = "Punctuation#Transitions#Verb form#Repetition#Clause relationships#Verb form#Add, revise, or delete#Verb form#Punctuation#Verb form#Adjectives and adverbs#Punctuation#Introductions/conclusions#Add, revise, or delete#Evaluation of purpose#Clause relationships#Verb form#Repetition#Verb form#Clause relationships#Comparatives/superlatives#Verb form#Word choice#Punctuation#Punctuation#Add, revise, or delete#Transitions#Word choice#Add, revise, or delete#Evaluation of purpose#Punctuation#Punctuation#Punctuation#Introductions/conclusions#Verb form#Evaluation of purpose#Verb form#Word choice#Clause relationships#Repetition#Add, revise, or delete#Pronouns#Pronouns#Sentence/paragraph order#Evaluation of purpose#Pronouns#Punctuation#Transitions#Pronouns#Clause relationships#Add, revise, or delete#Clause relationships#Subject-verb agreement#Word choice#Add, revise, or delete#Transitions#Evaluation of purpose#Adjectives and adverbs#Clause relationships#Verb form#Clause relationships#Punctuation#Pronouns#Add, revise, or delete#Clause relationships#Add, revise, or delete#Add, revise, or delete#Transitions#Pronouns#Evaluation of purpose#Ratio and probability#Mean, median, mode#Ratio and probability#Substitution/simplification#Functions#Percents#Sequences and series#Algebraic equations#Operations#Mean, median, mode#Functions#Perimeter#Angles#Circles#Systems of equations#Operations#Angles#Operations#Operations#Angles#Percents#Exponents#Polynomials#Inequalities#Percents#Angles#Triangles#Polynomials#Complex numbers#Trigonometry#Ratio and probability#Operations#Ratio and probability#Area#Algebraic equations#Inequalities#Mean, median, mode#Functions#Coordinate geometry#Coordinate geometry#Coordinate geometry#Functions#Algebraic equations#Coordinate geometry#Operations#Algebraic equations#Ratio and probability#Operations#Inequalities#Volume#Ratio and probability#Inequalities#Algebraic equations#Operations#Tables and charts#Area#Trigonometry#Inequalities#Ratio and probability#Trigonometry#Prose Fiction#Prose Fiction#Prose Fiction#Prose Fiction#Prose Fiction#Prose Fiction#Prose Fiction#Prose Fiction#Prose Fiction#Prose Fiction#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Research Summaries#Research Summaries#Research Summaries#Research Summaries#Research Summaries#Research Summaries#Research Summaries#Conflicting Viewpoints#Conflicting Viewpoints#Conflicting Viewpoints#Conflicting Viewpoints#Conflicting Viewpoints#Conflicting Viewpoints#Conflicting Viewpoints#Data Representation#Data Representation#Data Representation#Data Representation#Data Representation#Data Representation#Research Summaries#Research Summaries#Research Summaries#Research Summaries#Research Summaries#Research Summaries#Data Representation#Data Representation#Data Representation#Data Representation#Data Representation#Data Representation#Data Representation#Data Representation#Data Representation#Data Representation#Data Representation#Data Representation#Data Representation#Data Representation#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Non-fiction#Non-fiction#Non-fiction#Non-fiction#Non-fiction#Non-fiction#Non-fiction#Non-fiction#Non-fiction#Non-fiction#Non-fiction#Non-fiction#Non-fiction#Non-fiction#Non-fiction#Non-fiction#Non-fiction#Non-fiction#Non-fiction#Non-fiction#Non-fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Non-fiction#Non-fiction#Non-fiction#Non-fiction#Non-fiction#Non-fiction#Non-fiction#Non-fiction#Non-fiction#Non-fiction#Non-fiction#Diction, idioms, and register#Add, revise, or delete#Verbs#Punctuation#Sentence and paragraph order#Add, revise, or delete#Diction, idioms, and register#Verbs#Transitions#Diction, idioms, and register#Punctuation#Infographics#Clause relationships#Transitions#Clause relationships#Punctuation#Pronouns#Verbs#Pronouns#Add, revise, or delete#Repetition#Sentence and paragraph order#Verbs#Clause relationships#Diction, idioms, and register#Punctuation#Transitions#Add, revise, or delete#Infographics#Verbs#Add, revise, or delete#Punctuation#Diction, idioms, and register#Transitions#Repetition#Verbs#Add, revise, or delete#Transitions#Clause relationships#Verbs#Verbs#Add, revise, or delete#Pronouns#Pronouns#Algebraic equations#Complex numbers#Operations#Functions#Polynomials#Functions#Algebraic equations#Algebraic manipulation#Systems of equations#Functions#Systems of equations#Coordinate geometry#Algebraic manipulation#Algebraic manipulation#Quadratics#Algebraic equations#Triangles#Systems of equations#Trigonometry#Algebraic equations#Coordinate geometry#Algebraic equations#Angles#Algebraic equations#Functions#Operations#Tables and charts#Absolute value#Functions#Functions#Inequalities#Mean, median, mode#Tables and charts#Mean, median, mode#Coordinate geometry#Coordinate geometry#Functions#Inequalities#Algebraic equations#Percents#Ratio and probability#Tables and charts#Ratio and probability#Circles#Functions#Percents#Tables and charts#Inequalities#Polynomials#Functions#Inequalities#Algebraic equations#Tables and charts#Operations#Volume#Functions#Functions#Algebraic equations"
      //var DiagnosticsDetailsArr = DiagnosticsDetails.split('#')
      var DiagnosticsTest = "ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT"
      var DiagnosticsTestArr = DiagnosticsTest.split('#')
      var DiagnosticsSubject = "English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Math (NC)#Math (NC)#Math (NC)#Math (NC)#Math (NC)#Math (NC)#Math (NC)#Math (NC)#Math (NC)#Math (NC)#Math (NC)#Math (NC)#Math (NC)#Math (NC)#Math (NC)#Math (NC)#Math (NC)#Math (NC)#Math (NC)#Math (NC)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)"
      var DiagnosticsSubjectArr = DiagnosticsSubject.split('#')
      var DiagnosticsQuestion = "1#2#3#4#5#6#7#8#9#10#11#12#13#14#15#16#17#18#19#20#21#22#23#24#25#26#27#28#29#30#31#32#33#34#35#36#37#38#39#40#41#42#43#44#45#46#47#48#49#50#51#52#53#54#55#56#57#58#59#60#61#62#63#64#65#66#67#68#69#70#71#72#73#74#75#1#2#3#4#5#6#7#8#9#10#11#12#13#14#15#16#17#18#19#20#21#22#23#24#25#26#27#28#29#30#31#32#33#34#35#36#37#38#39#40#41#42#43#44#45#46#47#48#49#50#51#52#53#54#55#56#57#58#59#60#1#2#3#4#5#6#7#8#9#10#11#12#13#14#15#16#17#18#19#20#21#22#23#24#25#26#27#28#29#30#31#32#33#34#35#36#37#38#39#40#1#2#3#4#5#6#7#8#9#10#11#12#13#14#15#16#17#18#19#20#21#22#23#24#25#26#27#28#29#30#31#32#33#34#35#36#37#38#39#40#1#2#3#4#5#6#7#8#9#10#11#12#13#14#15#16#17#18#19#20#21#22#23#24#25#26#27#28#29#30#31#32#33#34#35#36#37#38#39#40#41#42#43#44#45#46#47#48#49#50#51#52#1#2#3#4#5#6#7#8#9#10#11#12#13#14#15#16#17#18#19#20#21#22#23#24#25#26#27#28#29#30#31#32#33#34#35#36#37#38#39#40#41#42#43#44#1#2#3#4#5#6#7#8#9#10#11#12#13#14#15#16#17#18#19#20#1#2#3#4#5#6#7#8#9#10#11#12#13#14#15#16#17#18#19#20#21#22#23#24#25#26#27#28#29#30#31#32#33#34#35#36#37#38"
      var DiagnosticsQuestionArr = DiagnosticsQuestion.split('#')
      var DiagnosticsCorrectAnswers = "##################C#J#B#J#D#J#B#H#B#H#A#H#A#G#A#J#A#H#D#G#C#F#C#J#B#G#C#J#A#G#A#H#C#H#D#J#####################################K#D#J#A#F#E#G#E#H#D#G#E#H#C#H#B#K#D#F#E#J#C#F#D#K#A#J#D#G#E##########################D#F#B#G#D#G#C#H#B#J#B#F#C#J#A#J#B#G#C#F#########################B#G#A#H#D#J#A#G#C#J#B#J#A#F#B#G#C#J#B###################C#D#B#B#C#A#C#D#A#D#C#D#A#D#C#B#B#A#D#B#B################################B#D#C#A#D#A#D#B#B#A#B#D#A#C#C#D#C#A#D#A#C#B#################C#C#B#A#D#D#D#A#C#B#2#56#3####################D#A#A#D#C#A#B#C#C#B#D#A#C#80#10#0.8#863####"
      var DiagnosticsCorrectAnswersArr = DiagnosticsCorrectAnswers.split('#')

      var Arr = [[{ value: "Test" }, { value: "Question" }, { value: "Subject" },{ value: "Student answer" }]]

      var TempArr = []
      function CheckMark(i){
        
        if(DiagnosticsCorrectAnswersArr[i].length>0){
          return("")
        }
        else{
          return("-")
        }
      }
      for(var i =0; i<369; i++){
        TempArr = [{ value: DiagnosticsTestArr[i]}, { value: DiagnosticsQuestionArr[i] },{ value: DiagnosticsSubjectArr[i]},{ value: CheckMark(i) }]
        Arr.push(TempArr)
      }
      return(Arr)
  }

  function CHeckDiagnosticsAnswers(){
    var DiagnosticsCorrectAnswers = "##################C#J#B#J#D#J#B#H#B#H#A#H#A#G#A#J#A#H#D#G#C#F#C#J#B#G#C#J#A#G#A#H#C#H#D#J#####################################K#D#J#A#F#E#G#E#H#D#G#E#H#C#H#B#K#D#F#E#J#C#F#D#K#A#J#D#G#E##########################D#F#B#G#D#G#C#H#B#J#B#F#C#J#A#J#B#G#C#F#########################B#G#A#H#D#J#A#G#C#J#B#J#A#F#B#G#C#J#B###################C#D#B#B#C#A#C#D#A#D#C#D#A#D#C#B#B#A#D#B#B################################B#D#C#A#D#A#D#B#B#A#B#D#A#C#C#D#C#A#D#A#C#B#################C#C#B#A#D#D#D#A#C#B#2#56#3####################D#A#A#D#C#A#B#C#C#B#D#A#C#80#10#0.8#863####"
    var DiagnosticsCorrectAnswersArr = DiagnosticsCorrectAnswers.split('#')
  }
  
  function SATCorrectAnswerBank(num, CurrTest = 0){
   
    if(CurrTest == 0){
      CurrTest = CurrentTest
    }
    function Copies(arr, copies = 10){
        var TempARR = []
        for(var i = 0; i < copies; i++){
          TempARR.push(arr)
        }
        return([].concat.apply([], TempARR))
    }
    function NumToTestNum(i){
      if(i == 0 || i == 1){
          return(1)
      }
      var Mod = Math.ceil((i)/154)
      var ModBottom = Math.floor((i)/154)
      if(Mod == ModBottom){
        return(Mod + 1)
      }
      return(Mod)
    }
    function NumToTestNumACT(i){
      if(i == 0 || i == 1){
          return(1)
      }
      var Mod = Math.ceil((i)/215)
      var ModBottom = Math.floor((i)/215)
      if(Mod == ModBottom){
        return(Mod + 1)
      }
      return(Mod)
    }
    //Placeholder
    if(num == 99 || num == 100){
      var SATDetailsTotal = "Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Diction, idioms, and register (5)#Add, revise, or delete (1)#Apostrophes (13)#Punctuation (10,11,12)#Sentence and paragraph order (2)#Add, revise, or delete (1)#Diction, idioms, and register (5)#Verb agreement and tense (15)#Transitions (8)#Diction, idioms, and register (5)#Transitions (8)#Infographics (3)#Combining and separating sentences (7)#Transitions (8)#Non-essential and essential clauses (9)#Punctuation (10,11,12)#Sentences and fragments (6)#Verb agreement and tense (15)#Pronoun and noun agreement (14)#Add, revise, or delete (1)#Shorter is better (4)#Sentence and paragraph order (2)#Shorter is better (4)#Modification (18)#Diction, idioms, and register (5)#Punctuation (10,11,12)#Transitions (8)#Add, revise, or delete (1)#Infographics (3)#Pronoun and noun agreement (14)#Sentence and paragraph order (2)#Punctuation (10,11,12)#Diction, idioms, and register (5)#Transitions (8)#Shorter is better (4)#Verb agreement and tense (15)#Add, revise, or delete (1)#Transitions (8)#Shorter is better (4)#Verb agreement and tense (15)#Apostrophes (13)#Add, revise, or delete (1)#Pronoun and noun agreement (14)#Pronoun and noun agreement (14)#Solving algebraic equations (8)#Complex numbers (19)#Constructing models (7)#Lines (14)#Expressions (6)#Lines (14)#Expressions (6)#Expressions (6)#Systems of equations (10)#Quadratics (17)#Systems of equations (10)#Lines (14)#Expressions (6)#Exponents and radicals (1)#Matching coefficients (9)#Quadratics (17)#Triangles (22)#Systems of equations (10)#Trigonometry (24)#Systems of equations (10)#Reading data (25)#Ratio and proportion (5)#Angles (21)#Word problems (12)#Exponential and linear growth (3)#Ratio and proportion (5)#Reading data (25)#Absolute value (20)#Solving algebraic equations (8)#Solving algebraic equations (8)#Inequalities (11)#Mean, median, and mode (27)#Percents (2)#Mean, median, and mode (27)#Lines (14)#Lines (14)#Functions (16)#Inequalities (11)#Systems of equations (10)#Percents (2)#Probability (26)#Mean, median, and mode (27)#Ratio and proportion (5)#Circles (23)#Quadratics (17)#Percents (2)#Reading data (25)#Inequalities (11)#Synthetic division (18)#Quadratics (17)#Inequalities (11)#Inequalities (11)#Reading data (25)#Word problems (12)#Volume (29)#Functions (16)#Exponential and linear growth (3)#Exponential and linear growth (3)#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Diction, idioms, and register (5)#Transitions (8)#Verb agreement and tense (15)#Add, revise, or delete (1)#Shorter is better (4)#Parallel structure (17)#Shorter is better (4)#Sentences and fragments (6)#Add, revise, or delete (1)#Diction, idioms, and register (5)#Add, revise, or delete (1)#Transitions (8)#Non-essential and essential clauses (9)#Punctuation (10,11,12)#Add, revise, or delete (1)#Sentences and fragments (6)#Add, revise, or delete (1)#Combining and separating sentences (7)#Parallel structure (17)#Verb agreement and tense (15)#Add, revise, or delete (1)#Sentence and paragraph order (2)#Sentences and fragments (6)#Infographics (3)#Transitions (8)#Add, revise, or delete (1)#Punctuation (10,11,12)#Diction, idioms, and register (5)#Pronoun and noun agreement (14)#Pronoun and noun agreement (14)#Sentence and paragraph order (2)#Diction, idioms, and register (5)#Non-essential and essential clauses (9)#Pronoun and noun agreement (14)#Non-essential and essential clauses (9)#Diction, idioms, and register (5)#Add, revise, or delete (1)#Pronoun and noun agreement (14)#Pronoun and noun agreement (14)#Punctuation (10,11,12)#Modification (18)#Sentence and paragraph order (2)#Add, revise, or delete (1)#Shorter is better (4)#Solving algebraic equations (8)#Systems of equations (10)#Constructing models (7)#Expressions (6)#Solving algebraic equations (8)#Lines (14)#Exponents and radicals (1)#Angles (21)#Lines (14)#Quadratics (17)#Complex numbers (19)#Solving algebraic equations (8)#Quadratics (17)#Exponential and linear growth (3)#Expressions (6)#Systems of equations (10)#Matching coefficients (9)#Triangles (22)#Trigonometry (24)#Systems of equations (10)#Lines (14)#Ratio and proportion (5)#Solving algebraic equations (8)#Ratio and proportion (5)#Percents (2)#Word problems (12)#Quadratics (17)#Word problems (12)#Inequalities (11)#Functions (16)#Word problems (12)#Inequalities (11)#Experiment design (28)#Scatter plots (28)#Mean, median, and mode (27)#Probability (26)#Percents (2)#Mean, median, and mode (27)#Mean, median, and mode (27)#Ratio and proportion (5)#Inequalities (11)#Ratio and proportion (5)#Ratio and proportion (5)#Circles (23)#Lines (14)#Functions (16)#Constructing models (7)#Lines (14)#Quadratics (17)#Triangles (22)#Ratio and proportion (5)#Solving algebraic equations (8)#Quadratics (17)#Word problems (12)#Lines (14)#Circles (23)#Solving algebraic equations (8)#Solving algebraic equations (8)#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Parallel structure (17)#Add, revise, or delete (1)#Add, revise, or delete (1)#Apostrophes (13)#Verb agreement and tense (15)#Add, revise, or delete (1)#Shorter is better (4)#Shorter is better (4)#Transitions (8)#Combining and separating sentences (7)#Diction, idioms, and register (5)#Pronoun and noun agreement (14)#Add, revise, or delete (1)#Punctuation (10,11,12)#Verb agreement and tense (15)#Diction, idioms, and register (5)#Add, revise, or delete (1)#Shorter is better (4)#Word pairs and comparisons (16)#Add, revise, or delete (1)#Modification (18)#Add, revise, or delete (1)#Combining and separating sentences (7)#Combining and separating sentences (7)#Diction, idioms, and register (5)#Pronoun and noun agreement (14)#Pronoun and noun agreement (14)#Verb agreement and tense (15)#Punctuation (10,11,12)#Sentence and paragraph order (2)#Infographics (3)#Infographics (3)#Add, revise, or delete (1)#Sentences and fragments (6)#Non-essential and essential clauses (9)#Verb agreement and tense (15)#Add, revise, or delete (1)#Verb agreement and tense (15)#Sentence and paragraph order (2)#Diction, idioms, and register (5)#Non-essential and essential clauses (9)#Add, revise, or delete (1)#Add, revise, or delete (1)#Diction, idioms, and register (5)#Constructing models (7)#Solving algebraic equations (8)#Exponents and radicals (1)#Solving algebraic equations (8)#Solving algebraic equations (8)#Systems of equations (10)#Synthetic division (18)#Lines (14)#Systems of equations (10)#Quadratics (17)#Angles (21)#Quadratics (17)#Matching coefficients (9)#Quadratics (17)#Lines (14)#Solving algebraic equations (8)#Solving algebraic equations (8)#Angles (21)#Systems of equations (10)#Trigonometry (24)#Constructing models (7)#Probability (26)#Constructing models (7)#Functions (16)#Percents (2)#Expressions (6)#Solving algebraic equations (8)#Lines (14)#Ratio and proportion (5)#Solving algebraic equations (8)#Solving algebraic equations (8)#Functions (16)#Solving algebraic equations (8)#Lines (14)#Experiment design (28)#Quadratics (17)#Lines (14)#Lines (14)#Ratio and proportion (5)#Scatter plots (28)#Exponential and linear growth (3)#Percents (2)#Trigonometry (24)#Systems of equations (10)#Volume (29)#Lines (14)#Percents (2)#Exponential and linear growth (3)#Probability (26)#Systems of equations (10)#Systems of equations (10)#Mean, median, and mode (27)#Matching coefficients (9)#Circles (23)#Mean, median, and mode (27)#Inequalities (11)#Word problems (12)#Word problems (12)#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Sentences and fragments (6)#Transitions (8)#Non-essential and essential clauses (9)#Add, revise, or delete (1)#Diction, idioms, and register (5)#Verb agreement and tense (15)#Pronoun and noun agreement (14)#Shorter is better (4)#Parallel structure (17)#Add, revise, or delete (1)#Add, revise, or delete (1)#Word pairs and comparisons (16)#Pronoun and noun agreement (14)#Shorter is better (4)#Transitions (8)#Diction, idioms, and register (5)#Transitions (8)#Add, revise, or delete (1)#Verb agreement and tense (15)#Add, revise, or delete (1)#Pronoun and noun agreement (14)#Punctuation (10,11,12)#Diction, idioms, and register (5)#Word pairs and comparisons (16)#Add, revise, or delete (1)#Combining and separating sentences (7)#Sentence and paragraph order (2)#Verb agreement and tense (15)#Punctuation (10,11,12)#Diction, idioms, and register (5)#Infographics (3)#Pronoun and noun agreement (14)#Add, revise, or delete (1)#Verb agreement and tense (15)#Non-essential and essential clauses (9)#Combining and separating sentences (7)#Add, revise, or delete (1)#Add, revise, or delete (1)#Transitions (8)#Pronoun and noun agreement (14)#Shorter is better (4)#Diction, idioms, and register (5)#Modification (18)#Sentence and paragraph order (2)#Absolute value (20)#Functions (16)#Systems of equations (10)#Functions (16)#Expressions (6)#Solving algebraic equations (8)#Lines (14)#Lines (14)#Solving algebraic equations (8)#Solving algebraic equations (8)#Systems of equations (10)#Percents (2)#Functions (16)#Complex numbers (19)#Quadratics (17)#Triangles (22)#Trigonometry (24)#Solving algebraic equations (8)#Systems of equations (10)#Lines (14)#Solving algebraic equations (8)#Lines (14)#Circles (23)#Percents (2)#Solving algebraic equations (8)#Word problems (12)#Probability (26)#Lines (14)#Probability (26)#Reading data (25)#Reading data (25)#Functions (16)#Exponential and linear growth (3)#Exponential and linear growth (3)#Exponential and linear growth (3)#Inequalities (11)#Lines (14)#Volume (29)#Inequalities (11)#Exponential and linear growth (3)#Scatter plots (28)#Percents (2)#Mean, median, and mode (27)#Circles (23)#Synthetic division (18)#Inequalities (11)#Scatter plots (28)#Quadratics (17)#Mean, median, and mode (27)#Systems of equations (10)#Word problems (12)#Lines (14)#Ratio and proportion (5)#Ratio and proportion (5)#Ratio and proportion (5)#Circles (23)#Exponential and linear growth (3)#Exponential and linear growth (3)#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Add, revise, or delete (1)#Diction, idioms, and register (5)#Add, revise, or delete (1)#Pronoun and noun agreement (14)#Diction, idioms, and register (5)#Pronoun and noun agreement (14)#Sentence and paragraph order (2)#Transitions (8)#Verb agreement and tense (15)#Combining and separating sentences (7)#Pronoun and noun agreement (14)#Transitions (8)#Combining and separating sentences (7)#Punctuation (10,11,12)#Non-essential and essential clauses (9)#Add, revise, or delete (1)#Punctuation (10,11,12)#Shorter is better (4)#Diction, idioms, and register (5)#Diction, idioms, and register (5)#Verb agreement and tense (15)#Diction, idioms, and register (5)#Pronoun and noun agreement (14)#Combining and separating sentences (7)#Transitions (8)#Verb agreement and tense (15)#Add, revise, or delete (1)#Transitions (8)#Sentences and fragments (6)#Verb agreement and tense (15)#Pronoun and noun agreement (14)#Sentence and paragraph order (2)#Infographics (3)#Sentence and paragraph order (2)#Punctuation (10,11,12)#Diction, idioms, and register (5)#Shorter is better (4)#Add, revise, or delete (1)#Diction, idioms, and register (5)#Diction, idioms, and register (5)#Add, revise, or delete (1)#Punctuation (10,11,12)#Transitions (8)#Modification (18)#Lines (14)#Circles (23)#Quadratics (17)#Functions (16)#Solving algebraic equations (8)#Expressions (6)#Inequalities (11)#Lines (14)#Systems of equations (10)#Expressions (6)#Volume (29)#Exponents and radicals (1)#Lines (14)#Functions (16)#Word problems (12)#Inequalities (11)#Solving algebraic equations (8)#Systems of equations (10)#Matching coefficients (9)#Angles (21)#Reading data (25)#Functions (16)#Ratio and proportion (5)#Solving algebraic equations (8)#Ratio and proportion (5)#Word problems (12)#Lines (14)#Expressions (6)#Ratio and proportion (5)#Solving algebraic equations (8)#Lines (14)#Systems of equations (10)#Inequalities (11)#Probability (26)#Experiment design (28)#Solving algebraic equations (8)#Reading data (25)#Solving algebraic equations (8)#Triangles (22)#Reading data (25)#Expressions (6)#Percents (2)#Lines (14)#Percents (2)#Inequalities (11)#Expressions (6)#Mean, median, and mode (27)#Lines (14)#Circles (23)#Quadratics (17)#Ratio and proportion (5)#Ratio and proportion (5)#Solving algebraic equations (8)#Functions (16)#Word problems (12)#Angles (21)#Reading data (25)#Word problems (12)#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Combining and separating sentences (7)#Combining and separating sentences (7)#Shorter is better (4)#Punctuation (10,11,12)#Add, revise, or delete (1)#Shorter is better (4)#Verb agreement and tense (15)#Diction, idioms, and register (5)#Transitions (8)#Add, revise, or delete (1)#Add, revise, or delete (1)#Apostrophes (13)#Transitions (8)#Combining and separating sentences (7)#Diction, idioms, and register (5)#Add, revise, or delete (1)#Punctuation (10,11,12)#Add, revise, or delete (1)#Combining and separating sentences (7)#Non-essential and essential clauses (9)#Diction, idioms, and register (5)#Sentence and paragraph order (2)#Add, revise, or delete (1)#Diction, idioms, and register (5)#Diction, idioms, and register (5)#Add, revise, or delete (1)#Pronoun and noun agreement (14)#Punctuation (10,11,12)#Non-essential and essential clauses (9)#Word pairs and comparisons (16)#Transitions (8)#Add, revise, or delete (1)#Word pairs and comparisons (16)#Shorter is better (4)#Diction, idioms, and register (5)#Punctuation (10,11,12)#Add, revise, or delete (1)#Add, revise, or delete (1)#Non-essential and essential clauses (9)#Add, revise, or delete (1)#Verb agreement and tense (15)#Apostrophes (13)#Transitions (8)#Word pairs and comparisons (16)#Lines (14)#Lines (14)#Complex numbers (19)#Matching coefficients (9)#Lines (14)#Expressions (6)#Solving algebraic equations (8)#Functions (16)#Exponents and radicals (1)#Mean, median, and mode (27)#Quadratics (17)#Expressions (6)#Quadratics (17)#Inequalities (11)#Expressions (6)#Exponents and radicals (1)#Solving algebraic equations (8)#Triangles (22)#Word problems (12)#Circles (23)#Expressions (6)#Reading data (25)#Constructing models (7)#Lines (14)#Inequalities (11)#Percents (2)#Experiment design (28)#Probability (26)#Word problems (12)#Systems of equations (10)#Systems of equations (10)#Reading data (25)#Functions (16)#Lines (14)#Functions (16)#Triangles (22)#Lines (14)#Inequalities (11)#Word problems (12)#Quadratics (17)#Experiment design (28)#Mean, median, and mode (27)#Reading data (25)#Percents (2)#Functions (16)#Ratio and proportion (5)#Circles (23)#Absolute value (20)#Solving algebraic equations (8)#Quadratics (17)#Word problems (12)#Solving algebraic equations (8)#Volume (29)#Systems of equations (10)#Lines (14)#Mean, median, and mode (27)#Exponential and linear growth (3)#Percents (2)#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Shorter is better (4)#Diction, idioms, and register (5)#Verb agreement and tense (15)#Punctuation (10,11,12)#Add, revise, or delete (1)#Diction, idioms, and register (5)#Verb agreement and tense (15)#Verb agreement and tense (15)#Sentence and paragraph order (2)#Add, revise, or delete (1)#Transitions (8)#Parallel structure (17)#Non-essential and essential clauses (9)#Transitions (8)#Add, revise, or delete (1)#Non-essential and essential clauses (9)#Shorter is better (4)#Diction, idioms, and register (5)#Verb agreement and tense (15)#Transitions (8)#Infographics (3)#Punctuation (10,11,12)#Transitions (8)#Sentences and fragments (6)#Add, revise, or delete (1)#Verb agreement and tense (15)#Punctuation (10,11,12)#Add, revise, or delete (1)#Pronoun and noun agreement (14)#Shorter is better (4)#Diction, idioms, and register (5)#Punctuation (10,11,12)#Transitions (8)#Punctuation (10,11,12)#Add, revise, or delete (1)#Verb agreement and tense (15)#Diction, idioms, and register (5)#Transitions (8)#Shorter is better (4)#Add, revise, or delete (1)#Word pairs and comparisons (16)#Sentence and paragraph order (2)#Non-essential and essential clauses (9)#Add, revise, or delete (1)#Lines (14)#Expressions (6)#Systems of equations (10)#Complex numbers (19)#Functions (16)#Lines (14)#Expressions (6)#Inequalities (11)#Inequalities (11)#Synthetic division (18)#Exponents and radicals (1)#Quadratics (17)#Expressions (6)#Inequalities (11)#Expressions (6)#Solving algebraic equations (8)#Angles (21)#Angles (21)#Lines (14)#Matching coefficients (9)#Probability (26)#Expressions (6)#Word problems (12)#Experiment design (28)#Inequalities (11)#Quadratics (17)#Scatter plots (28)#Scatter plots (28)#Solving algebraic equations (8)#Percents (2)#Systems of equations (10)#Percents (2)#Reading data (25)#Angles (21)#Word problems (12)#Expressions (6)#Lines (14)#Solving algebraic equations (8)#Solving algebraic equations (8)#Solving algebraic equations (8)#Scatter plots (28)#Mean, median, and mode (27)#Volume (29)#Quadratics (17)#Functions (16)#Functions (16)#Exponential and linear growth (3)#Lines (14)#Circles (23)#Percents (2)#Ratio and proportion (5)#Lines (14)#Word problems (12)#Circles (23)#Systems of equations (10)#Triangles (22)#Mean, median, and mode (27)#Probability (26)#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Transitions (8)#Diction, idioms, and register (5)#Sentences and fragments (6)#Non-essential and essential clauses (9)#Add, revise, or delete (1)#Add, revise, or delete (1)#Word pairs and comparisons (16)#Verb agreement and tense (15)#Diction, idioms, and register (5)#Add, revise, or delete (1)#Word pairs and comparisons (16)#Shorter is better (4)#Punctuation (10,11,12)#Add, revise, or delete (1)#Add, revise, or delete (1)#Pronoun and noun agreement (14)#Word pairs and comparisons (16)#Add, revise, or delete (1)#Sentence and paragraph order (2)#Pronoun and noun agreement (14)#Modification (18)#Shorter is better (4)#Diction, idioms, and register (5)#Punctuation (10,11,12)#Add, revise, or delete (1)#Diction, idioms, and register (5)#Pronoun and noun agreement (14)#Sentence and paragraph order (2)#Shorter is better (4)#Sentences and fragments (6)#Transitions (8)#Shorter is better (4)#Add, revise, or delete (1)#Transitions (8)#Shorter is better (4)#Add, revise, or delete (1)#Verb agreement and tense (15)#Shorter is better (4)#Add, revise, or delete (1)#Non-essential and essential clauses (9)#Add, revise, or delete (1)#Verb agreement and tense (15)#Add, revise, or delete (1)#Punctuation (10,11,12)#Solving algebraic equations (8)#Lines (14)#Solving algebraic equations (8)#Angles (21)#Word problems (12)#Inequalities (11)#Solving algebraic equations (8)#Functions (16)#Circles (23)#Systems of equations (10)#Synthetic division (18)#Expressions (6)#Lines (14)#Quadratics (17)#Functions (16)#Quadratics (17)#Matching coefficients (9)#Systems of equations (10)#Lines (14)#Circles (23)#Word problems (12)#Reading data (25)#Ratio and proportion (5)#Scatter plots (28)#Angles (21)#Systems of equations (10)#Lines (14)#Solving algebraic equations (8)#Volume (29)#Constructing models (7)#Ratio and proportion (5)#Inequalities (11)#Exponents and radicals (1)#Functions (16)#Volume (29)#Probability (26)#Mean, median, and mode (27)#Scatter plots (28)#Quadratics (17)#Inequalities (11)#Scatter plots (28)#Percents (2)#Exponential and linear growth (3)#Experiment design (28)#Functions (16)#Experiment design (28)#Lines (14)#Mean, median, and mode (27)#Exponential and linear growth (3)#Functions (16)#Ratio and proportion (5)#Solving algebraic equations (8)#Lines (14)#Word problems (12)#Functions (16)#Trigonometry (24)#Reading data (25)#Exponential and linear growth (3)#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Diction, idioms, and register (5)#Sentence and paragraph order (2)#Transitions (8)#Pronoun and noun agreement (14)#Pronoun and noun agreement (14)#Non-essential and essential clauses (9)#Add, revise, or delete (1)#Shorter is better (4)#Word pairs and comparisons (16)#Apostrophes (13)#Add, revise, or delete (1)#Sentences and fragments (6)#Shorter is better (4)#Punctuation (10,11,12)#Pronoun and noun agreement (14)#Add, revise, or delete (1)#Combining and separating sentences (7)#Diction, idioms, and register (5)#Infographics (3)#Add, revise, or delete (1)#Verb agreement and tense (15)#Add, revise, or delete (1)#Pronoun and noun agreement (14)#Sentence and paragraph order (2)#Add, revise, or delete (1)#Pronoun and noun agreement (14)#Diction, idioms, and register (5)#Add, revise, or delete (1)#Transitions (8)#Punctuation (10,11,12)#Verb agreement and tense (15)#Shorter is better (4)#Add, revise, or delete (1)#Add, revise, or delete (1)#Verb agreement and tense (15)#Shorter is better (4)#Transitions (8)#Punctuation (10,11,12)#Parallel structure (17)#Sentences and fragments (6)#Add, revise, or delete (1)#Add, revise, or delete (1)#Pronoun and noun agreement (14)#Add, revise, or delete (1)#Systems of equations (10)#Expressions (6)#Lines (14)#Lines (14)#Solving algebraic equations (8)#Circles (23)#Solving algebraic equations (8)#Matching coefficients (9)#Systems of equations (10)#Matching coefficients (9)#Quadratics (17)#Expressions (6)#Quadratics (17)#Inequalities (11)#Solving algebraic equations (8)#Volume (29)#Solving algebraic equations (8)#Functions (16)#Triangles (22)#Lines (14)#Solving algebraic equations (8)#Ratio and proportion (5)#Solving algebraic equations (8)#Solving algebraic equations (8)#Reading data (25)#Reading data (25)#Angles (21)#Lines (14)#Probability (26)#Ratio and proportion (5)#Ratio and proportion (5)#Ratio and proportion (5)#Inequalities (11)#Lines (14)#Lines (14)#Matching coefficients (9)#Systems of equations (10)#Exponential and linear growth (3)#Solving algebraic equations (8)#Lines (14)#Functions (16)#Mean, median, and mode (27)#Experiment design (28)#Functions (16)#Trigonometry (24)#Quadratics (17)#Synthetic division (18)#Quadratics (17)#Scatter plots (28)#Scatter plots (28)#Circles (23)#Lines (14)#Probability (26)#Reading data (25)#Percents (2)#Systems of equations (10)#Mean, median, and mode (27)#Percents (2)#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Paired passages#Paired passages#Paired passages#Paired passages#Paired passages#Paired passages#Paired passages#Paired passages#Paired passages#Paired passages#Paired passages#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Shorter is better (4)#Add, revise, or delete (1)#Non-essential and essential clauses (9)#Add, revise, or delete (1)#Add, revise, or delete (1)#Transitions (8)#Modification (18)#Shorter is better (4)#Parallel structure (17)#Punctuation (10,11,12)#Add, revise, or delete (1)#Parallel structure (17)#Add, revise, or delete (1)#Apostrophes (13)#Shorter is better (4)#Parallel structure (17)#Diction, idioms, and register (5)#Diction, idioms, and register (5)#Combining and separating sentences (7)#Word pairs and comparisons (16)#Add, revise, or delete (1)#Add, revise, or delete (1)#Verb agreement and tense (15)#Shorter is better (4)#Punctuation (10,11,12)#Diction, idioms, and register (5)#Infographics (3)#Parallel structure (17)#Infographics (3)#Add, revise, or delete (1)#Add, revise, or delete (1)#Pronoun and noun agreement (14)#Add, revise, or delete (1)#Add, revise, or delete (1)#Add, revise, or delete (1)#Apostrophes (13)#Verb agreement and tense (15)#Shorter is better (4)#Punctuation (10,11,12)#Non-essential and essential clauses (9)#Diction, idioms, and register (5)#Shorter is better (4)#Diction, idioms, and register (5)#Sentence and paragraph order (2)#Solving algebraic equations (8)#Constructing models (7)#Functions (16)#Reading data (25)#Expressions (6)#Quadratics (17)#Functions (16)#Angles (21)#Lines (14)#Quadratics (17)#Circles (23)#Triangles (22)#Quadratics (17)#Solving algebraic equations (8)#Systems of equations (10)#Solving algebraic equations (8)#Absolute value (20)#Exponential and linear growth (3)#Systems of equations (10)#Systems of equations (10)#Constructing models (7)#Constructing models (7)#Constructing models (7)#Solving algebraic equations (8)#Functions (16)#Expressions (6)#Experiment design (28)#Reading data (25)#Functions (16)#Experiment design (28)#Mean, median, and mode (27)#Percents (2)#Reading data (25)#Reading data (25)#Volume (29)#Exponential and linear growth (3)#Volume (29)#Probability (26)#Quadratics (17)#Mean, median, and mode (27)#Solving algebraic equations (8)#Functions (16)#Functions (16)#Scatter plots (28)#Systems of equations (10)#Exponential and linear growth (3)#Solving algebraic equations (8)#Quadratics (17)#Lines (14)#Angles (21)#Word problems (12)#Triangles (22)#Mean, median, and mode (27)#Lines (14)#Matching coefficients (9)#Quadratics (17)#Ratio and proportion (5)#Word problems (12)"
      var SATDetailsArr = SATDetailsTotal.split('#')
      var SATCorrectAnswerTotal = "B-B-C-A-C-D-D-B-C-B-A-B-D-A-A-C-C-D-A-B-A-B-D-D-C-B-D-C-A-A-D-B-A-C-B-D-C-C-B-C-B-B-A-A-D-C-B-A-D-B-D-A-D-B-A-C-C-D-B-C-A-A-B-B-A-B-C-C-C-A-D-D-B-D-D-D-B-A-B-C-B-D-C-A-A-A-A-B-D-C-A-B-B-C-D-D-D-A-C-B-C-A-B-C-B-A-D-D-B-A-D-2-1600-7-0.8-100-B-C-D-C-D-D-C-D-A-B-A-C-C-C-A-C-B-A-B-D-C-B-B-A-D-B-C-C-D-D-4-107-0.625-96-6-3-1.02-6.11-A-B-C-A-D-B-D-D-B-D-D-D-A-B-C-A-C-C-A-B-C-C-A-B-C-B-D-D-D-B-C-B-B-A-D-B-B-D-C-A-B-D-C-B-D-C-A-B-D-D-D-A-B-B-A-A-D-D-B-D-B-B-C-B-D-C-C-C-B-B-A-D-D-B-A-B-B-A-D-A-C-C-D-B-D-D-A-D-A-B-C-D-D-C-C-D-C-B-A-A-C-D-A-C-B-C-C-B-D-A-D-3-19-12-6-0.25-C-B-A-C-C-B-D-D-A-B-B-D-D-C-A-B-C-C-B-C-D-B-A-A-A-D-D-B-B-A-14-7-11-105-15-32-3284-7500-B-C-A-A-C-A-A-B-B-D-A-C-D-B-B-C-B-B-A-A-D-A-A-B-C-C-B-B-D-D-B-C-C-D-C-A-D-C-A-D-A-C-C-D-D-C-B-B-A-B-D-D-A-B-C-C-A-B-A-D-C-C-B-A-C-D-B-C-C-B-D-C-D-A-A-D-B-A-D-B-B-B-D-B-C-D-B-C-D-C-C-B-D-A-D-D-C-D-D-B-C-C-C-A-A-A-B-A-B-A-D-1-2-105-370-0.6-C-B-C-C-B-A-D-C-B-D-B-D-D-A-A-B-B-B-C-B-C-B-C-D-D-C-C-D-A-A-4-58.6-9-0.625-50-750-7-60-C-D-D-C-A-A-B-D-D-A-C-D-A-B-A-C-C-A-B-A-D-A-C-C-B-C-A-B-B-D-D-D-D-A-D-B-D-D-D-A-B-C-B-A-D-A-D-C-D-C-B-A-B-B-B-A-D-B-D-B-C-A-C-D-B-D-C-C-A-C-A-C-B-D-C-C-B-D-C-A-D-B-C-B-A-C-C-B-D-A-C-B-D-D-A-B-A-A-A-B-C-B-D-A-D-D-C-C-B-A-B-9-0.6-5-0-25-B-C-C-B-B-A-A-D-B-A-A-C-C-D-B-A-D-C-A-C-C-B-B-C-B-C-D-D-B-D-1160-0.5-4.55-150-2.25-29-0.72-134-D-C-C-A-C-A-D-B-B-B-B-A-B-D-C-A-B-B-B-A-D-A-B-A-B-C-D-B-D-B-D-B-C-B-A-B-C-A-B-D-D-C-D-D-C-B-A-C-C-A-A-B-C-D-B-C-A-C-D-D-B-C-C-D-D-A-B-C-C-A-D-D-A-B-B-B-A-B-D-A-C-B-C-D-A-C-B-B-D-C-D-B-D-A-A-C-D-A-B-C-D-A-C-A-A-B-C-D-B-C-D-4-1.2-5.25-2-97-D-C-A-B-C-B-A-C-B-A-A-D-D-A-A-D-D-C-B-D-A-C-D-B-D-B-C-C-B-B-1492-9.66666666666667-7-9-13-80-43-6-C-B-D-A-C-D-B-B-A-D-B-D-C-C-B-A-D-A-A-C-C-B-A-D-C-A-D-A-A-B-B-D-B-A-D-D-A-D-C-C-B-D-C-A-C-D-B-B-D-B-D-B-D-A-D-B-C-B-A-C-D-B-C-D-A-B-C-B-A-C-D-D-A-A-B-A-B-B-C-D-B-C-A-C-D-B-B-D-A-D-D-C-A-D-A-C-B-B-C-A-D-A-C-B-C-D-B-D-A-A-D-1-3.75-30-1.5-0.166666666666667-A-C-A-D-B-C-D-D-B-B-B-D-A-B-D-B-B-C-C-C-D-B-C-D-B-C-A-A-B-D-10-31-97-5-1.25-2.6-30-8-D-A-A-B-D-B-C-B-D-D-D-A-A-D-D-C-D-B-D-C-B-C-A-D-C-A-C-B-C-D-B-D-B-C-B-B-C-A-C-A-A-C-D-D-C-A-C-A-A-B-A-D-D-A-B-A-C-C-B-D-A-D-A-D-C-A-C-D-B-C-B-D-C-C-C-A-C-D-B-D-C-B-C-C-C-A-B-C-D-C-D-B-A-D-C-A-C-C-B-D-A-C-B-C-B-B-D-B-D-A-D-8-30-4-8-6632-B-A-C-D-C-C-A-C-A-D-A-B-B-D-B-D-A-B-A-C-C-B-C-A-B-B-A-C-D-B-195-0.4-30-0.277777777777778-0-6-2.4-0.714285714285714-A-C-C-D-A-D-D-B-C-B-B-D-D-A-D-B-C-B-C-A-C-A-D-A-B-D-B-A-D-C-D-B-C-B-C-B-C-D-C-A-D-A-C-A-C-A-D-B-B-B-C-C-D-B-C-B-D-C-B-C-A-C-A-A-D-C-C-A-D-B-D-B-B-D-A-C-C-A-C-C-B-B-B-D-D-B-D-A-B-D-B-D-A-D-A-C-D-A-A-C-B-B-B-D-A-C-B-D-C-C-D-3-32-1.5-8-144-A-C-A-C-B-D-C-B-D-C-B-C-C-D-D-B-A-C-A-B-D-A-A-D-A-C-B-D-B-B-102-2-30-25.4-2-8-576-0.8-D-B-B-A-C-A-C-C-B-C-D-D-D-B-B-C-A-A-C-D-A-B-D-A-C-B-A-D-D-C-B-D-A-B-B-A-A-C-D-C-A-C-C-D-A-D-C-A-A-B-C-D-B-B-A-C-D-C-D-A-D-C-A-C-B-B-D-A-C-D-C-C-B-D-B-B-B-D-A-D-B-D-A-D-A-A-C-D-B-D-C-C-C-A-D-C-B-A-D-A-C-B-D-C-B-C-B-D-A-B-B-360-2-8-0.75-2.5-B-D-B-A-D-A-C-A-D-D-A-D-C-B-D-B-C-B-B-A-D-B-B-C-C-D-A-C-A-D-6-2-8-9-15-1.5-1.3-3-A-B-D-B-A-A-D-C-C-B-D-A-A-B-C-C-D-C-B-B-D-D-B-A-C-C-B-D-A-D-A-B-C-B-B-D-C-A-A-B-D-A-A-B-D-C-A-B-C-A-C-D-A-D-A-A-D-A-C-D-D-C-C-D-A-D-C-B-B-A-D-B-C-B-C-A-A-B-D-B-C-C-B-B-A-C-D-C-B-C-C-D-A-D-A-D-B-C-B-C-A-A-D-C-C-D-A-B-C-B-A-2200-5-1.21-2500-20-B-A-B-C-C-D-B-C-C-D-A-C-C-A-B-C-D-C-D-C-B-D-A-B-A-D-A-D-D-A-6-146-2500-34-2.5-6.25-293-9"
      var SATCorrectAnswerArr = SATCorrectAnswerTotal.split('-')


      var SATSections = "Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C"
      var SATSectionsArr = Copies(SATSections.split(','))
      var SATSectionNumber = "1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4"
      var SATSectionNumberArr = Copies(SATSectionNumber.split(','))
      var SATQuestion = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38"
      var SATQuestionArr = Copies(SATQuestion.split(','))

      var ACTDetailsTotalPart1 = "Joining and separating sentences (3)#Non-essential and essential clauses (4)#Non-essential and essential clauses (4)#Punctuation (5,6,7)#Add, revise, or delete (18)#Verbs (8)#Non-essential and essential clauses (4)#Sentence and paragraph order (19)#Add, revise, or delete (18)#Verbs (8)#Diction, idioms, and register (16)#Diction, idioms, and register (16)#Modification (12)#Add, revise, or delete (18)#Evaluation of purpose (20)#Sentences and fragments (2)#Non-essential and essential clauses (4)#Sentences and fragments (2)#Shorter is better (15)#Add, revise, or delete (18)#Verbs (8)#Shorter is better (15)#Non-essential and essential clauses (4)#Transitions (17)#Verbs (8)#Add, revise, or delete (18)#Verbs (8)#Add, revise, or delete (18)#Joining and separating sentences (3)#Evaluation of purpose (20)#Modification (12)#Punctuation (5,6,7)#Joining and separating sentences (3)#Diction, idioms, and register (16)#Add, revise, or delete (18)#Verbs (8)#Diction, idioms, and register (16)#Add, revise, or delete (18)#Verbs (8)#Punctuation (5,6,7)#Modification (12)#Sentence and paragraph order (19)#Joining and separating sentences (3)#Add, revise, or delete (18)#Evaluation of purpose (20)#Sentences and fragments (2)#Add, revise, or delete (18)#Punctuation (5,6,7)#Shorter is better (15)#Shorter is better (15)#Diction, idioms, and register (16)#Pronouns (9)#Add, revise, or delete (18)#Joining and separating sentences (3)#Transitions (17)#Shorter is better (15)#Add, revise, or delete (18)#Add, revise, or delete (18)#Add, revise, or delete (18)#Sentence and paragraph order (19)#Non-essential and essential clauses (4)#Verbs (8)#Shorter is better (15)#Non-essential and essential clauses (4)#Add, revise, or delete (18)#Modification (12)#Transitions (17)#Punctuation (5,6,7)#Verbs (8)#Add, revise, or delete (18)#Diction, idioms, and register (16)#Transitions (17)#Transitions (17)#Apostrophes (1)#Joining and separating sentences (3)#Functions (11)#Angles (15)#Expressions (4)#Ratio and proportion (9)#Expressions (4)#Solving equations (3)#Probability (23)#Numbers and Operations (5)#Solving equations (3)#Coordinate geometry (14)#Probability (23)#Inequalities (21)#Expressions (4)#Percents (10)#Properties of numbers (6)#Functions (11)#Coordinate geometry (14)#Quadratics (13)#Data and statistics (24)#Systems of equations (20)#Percents (10)#Area and perimeter (18)#Angles (15)#Trigonometry (22)#Trigonometry (22)#Numbers and Operations (5)#Area and perimeter (18)#Exponents and radicals (2)#Inequalities (21)#Volume (19)#Triangles (16)#Coordinate geometry (14)#Quadratics (13)#Area and perimeter (18)#Data and statistics (24)#Logarithms (25)#Expressions (4)#Numbers and Operations (5)#Properties of numbers (6)#Properties of numbers (6)#Percents (10)#Percents (10)#Matrices (28)#Functions (11)#Numbers and Operations (5)#Expressions (4)#Area and perimeter (18)#Coordinate geometry (14)#Sequences (27)#Probability (23)#Percents (10)#Trigonometry (22)#Ellipses (28)#Trigonometry (22)#Absolute value (1)#Probability (23)#Exponents and radicals (2)#Area and perimeter (18)#Complex numbers (7)#Volume (19)#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Data#Data#Data#Data#Data#Data#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Data#Data#Data#Data#Data#Data#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Non-essential and essential clauses (4)#Add, revise, or delete (18)#Verbs (8)#Add, revise, or delete (18)#Verbs (8)#Diction, idioms, and register (16)#Shorter is better (15)#Add, revise, or delete (18)#Add, revise, or delete (18)#Diction, idioms, and register (16)#Verbs (8)#Shorter is better (15)#Transitions (17)#Sentence and paragraph order (19)#Evaluation of purpose (20)#Punctuation (5,6,7)#Pronouns (9)#Transitions (17)#Punctuation (5,6,7)#Add, revise, or delete (18)#Modification (12)#Add, revise, or delete (18)#Sentences and fragments (2)#Verbs (8)#Pronouns (9)#Sentences and fragments (2)#Add, revise, or delete (18)#Diction, idioms, and register (16)#Transitions (17)#Shorter is better (15)#Non-essential and essential clauses (4)#Pronouns (9)#Apostrophes (1)#Transitions (17)#Verbs (8)#Sentences and fragments (2)#Shorter is better (15)#Punctuation (5,6,7)#Add, revise, or delete (18)#Sentences and fragments (2)#Pronouns (9)#Verbs (8)#Diction, idioms, and register (16)#Shorter is better (15)#Punctuation (5,6,7)#Verbs (8)#Non-essential and essential clauses (4)#Verbs (8)#Sentences and fragments (2)#Non-essential and essential clauses (4)#Sentence and paragraph order (19)#Transitions (17)#Verbs (8)#Pronouns (9)#Add, revise, or delete (18)#Adjectives and adverbs (10)#Diction, idioms, and register (16)#Apostrophes (1)#Add, revise, or delete (18)#Evaluation of purpose (20)#Sentences and fragments (2)#Non-essential and essential clauses (4)#Non-essential and essential clauses (4)#Add, revise, or delete (18)#Shorter is better (15)#Diction, idioms, and register (16)#Transitions (17)#Modification (12)#Non-essential and essential clauses (4)#Non-essential and essential clauses (4)#Shorter is better (15)#Diction, idioms, and register (16)#Diction, idioms, and register (16)#Add, revise, or delete (18)#Evaluation of purpose (20)#Absolute value (1)#Numbers and Operations (5)#Expressions (4)#Expressions (4)#Percents (10)#Triangles (16)#Triangles (16)#Systems of equations (20)#Triangles (16)#Numbers and Operations (5)#Systems of equations (20)#Functions (11)#Angles (15)#Probability (23)#Area and perimeter (18)#Area and perimeter (18)#Numbers and Operations (5)#Triangles (16)#Coordinate geometry (14)#Systems of equations (20)#Probability (23)#Data and statistics (24)#Quadratics (13)#Functions (11)#Probability (23)#Absolute value (1)#Matrices (28)#Area and perimeter (18)#Trigonometry (22)#Circles (17)#Circles (17)#Circles (17)#Angles (15)#Trigonometry (22)#Solving equations (3)#Exponents and radicals (2)#Properties of numbers (6)#Triangles (16)#Word problems (26)#Systems of equations (20)#Coordinate geometry (14)#Coordinate geometry (14)#Circles (17)#Circles (17)#Systems of equations (20)#Word problems (26)#Functions (11)#Area and perimeter (18)#Area and perimeter (18)#Sequences (27)#Trigonometry (22)#Volume (19)#Word problems (26)#Word problems (26)#Word problems (26)#Word problems (26)#Exponents and radicals (2)#Trigonometry (22)#Coordinate geometry (14)#Functions (11)#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Data#Data#Data#Data#Data#Data#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Data#Data#Data#Data#Data#Data#Shorter is better (15)#Add, revise, or delete (18)#Joining and separating sentences (3)#Add, revise, or delete (18)#Add, revise, or delete (18)#Parallel structure (13)#Pronouns (9)#Punctuation (5,6,7)#Diction, idioms, and register (16)#Verbs (8)#Punctuation (5,6,7)#Shorter is better (15)#Sentence and paragraph order (19)#Evaluation of purpose (20)#Transitions (17)#Punctuation (5,6,7)#Diction, idioms, and register (16)#Sentence and paragraph order (19)#Non-essential and essential clauses (4)#Add, revise, or delete (18)#Modification (12)#Add, revise, or delete (18)#Add, revise, or delete (18)#Add, revise, or delete (18)#Add, revise, or delete (18)#Diction, idioms, and register (16)#Non-essential and essential clauses (4)#Verbs (8)#Add, revise, or delete (18)#Joining and separating sentences (3)#Transitions (17)#Add, revise, or delete (18)#Pronouns (9)#Sentences and fragments (2)#Diction, idioms, and register (16)#Sentences and fragments (2)#Shorter is better (15)#Verbs (8)#Add, revise, or delete (18)#Parallel structure (13)#Punctuation (5,6,7)#Diction, idioms, and register (16)#Non-essential and essential clauses (4)#Add, revise, or delete (18)#Non-essential and essential clauses (4)#Joining and separating sentences (3)#Non-essential and essential clauses (4)#Apostrophes (1)#Joining and separating sentences (3)#Verbs (8)#Joining and separating sentences (3)#Transitions (17)#Punctuation (5,6,7)#Shorter is better (15)#Pronouns (9)#Verbs (8)#Shorter is better (15)#Pronouns (9)#Add, revise, or delete (18)#Diction, idioms, and register (16)#Transitions (17)#Add, revise, or delete (18)#Add, revise, or delete (18)#Diction, idioms, and register (16)#Joining and separating sentences (3)#Verbs (8)#Verbs (8)#Add, revise, or delete (18)#Diction, idioms, and register (16)#Modification (12)#Sentence and paragraph order (19)#Pronouns (9)#Punctuation (5,6,7)#Pronouns (9)#Sentence and paragraph order (19)#Area and perimeter (18)#Probability (23)#Probability (23)#Numbers and Operations (5)#Volume (19)#Triangles (16)#Expressions (4)#Functions (11)#Percents (10)#Absolute value (1)#Numbers and Operations (5)#Numbers and Operations (5)#Triangles (16)#Numbers and Operations (5)#Ratio and proportion (9)#Numbers and Operations (5)#Solving equations (3)#Area and perimeter (18)#Inequalities (21)#Trigonometry (22)#Functions (11)#Systems of equations (20)#Data and statistics (24)#Area and perimeter (18)#Area and perimeter (18)#Probability (23)#Expressions (4)#Triangles (16)#Area and perimeter (18)#Coordinate geometry (14)#Coordinate geometry (14)#Coordinate geometry (14)#Exponents and radicals (2)#Ratio and proportion (9)#Logarithms (25)#Circles (17)#Expressions (4)#Probability (23)#Probability (23)#Probability (23)#Data and statistics (24)#Trigonometry (22)#Volume (19)#Trigonometry (22)#Numbers and Operations (5)#Angles (15)#Properties of numbers (6)#Triangles (16)#Probability (23)#Functions (11)#Probability (23)#Coordinate geometry (14)#Systems of equations (20)#Data and statistics (24)#Word problems (26)#Inequalities (21)#Word problems (26)#Complex numbers (7)#Functions (11)#Matrices (28)#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Data#Data#Data#Data#Data#Data#Data#Data#Data#Data#Data#Data#Data#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Data#Data#Data#Data#Data#Data#Add, revise, or delete (18)#Punctuation (5,6,7)#Apostrophes (1)#Joining and separating sentences (3)#Add, revise, or delete (18)#Pronouns (9)#Shorter is better (15)#Transitions (17)#Diction, idioms, and register (16)#Diction, idioms, and register (16)#Sentences and fragments (2)#Word pairs and comparisons (11)#Add, revise, or delete (18)#Diction, idioms, and register (16)#Add, revise, or delete (18)#Shorter is better (15)#Add, revise, or delete (18)#Verbs (8)#Joining and separating sentences (3)#Shorter is better (15)#Diction, idioms, and register (16)#Joining and separating sentences (3)#Sentence and paragraph order (19)#Add, revise, or delete (18)#Non-essential and essential clauses (4)#Verbs (8)#Pronouns (9)#Verbs (8)#Transitions (17)#Evaluation of purpose (20)#Pronouns (9)#Verbs (8)#Transitions (17)#Non-essential and essential clauses (4)#Shorter is better (15)#Modification (12)#Diction, idioms, and register (16)#Add, revise, or delete (18)#Joining and separating sentences (3)#Transitions (17)#Non-essential and essential clauses (4)#Verbs (8)#Parallel structure (13)#Add, revise, or delete (18)#Sentence and paragraph order (19)#Verbs (8)#Add, revise, or delete (18)#Punctuation (5,6,7)#Shorter is better (15)#Shorter is better (15)#Diction, idioms, and register (16)#Verbs (8)#Verbs (8)#Sentence and paragraph order (19)#Sentences and fragments (2)#Punctuation (5,6,7)#Add, revise, or delete (18)#Non-essential and essential clauses (4)#Sentence and paragraph order (19)#Evaluation of purpose (20)#Parallel structure (13)#Apostrophes (1)#Add, revise, or delete (18)#Sentences and fragments (2)#Modification (12)#Verbs (8)#Add, revise, or delete (18)#Punctuation (5,6,7)#Sentences and fragments (2)#Parallel structure (13)#Pronouns (9)#Add, revise, or delete (18)#Transitions (17)#Add, revise, or delete (18)#Add, revise, or delete (18)#Probability (23)#Probability (23)#Solving equations (3)#Absolute value (1)#Numbers and Operations (5)#Numbers and Operations (5)#Area and perimeter (18)#Area and perimeter (18)#Coordinate geometry (14)#Functions (11)#Inequalities (21)#Coordinate geometry (14)#Systems of equations (20)#Ratio and proportion (9)#Matrices (28)#Trigonometry (22)#Ratio and proportion (9)#Functions (11)#Angles (15)#Expressions (4)#Numbers and Operations (5)#Data and statistics (24)#Area and perimeter (18)#Area and perimeter (18)#Data and statistics (24)#Area and perimeter (18)#Area and perimeter (18)#Numbers and Operations (5)#Ratio and proportion (9)#Trigonometry (22)#Functions (11)#Triangles (16)#Coordinate geometry (14)#Numbers and Operations (5)#Angles (15)#Area and perimeter (18)#Solving equations (3)#Area and perimeter (18)#Data and statistics (24)#Word problems (26)#Expressions (4)#Probability (23)#Expressions (4)#Probability (23)#Trigonometry (22)#Logarithms (25)#Numbers and Operations (5)#Inequalities (21)#Trigonometry (22)#Data and statistics (24)#Angles (15)#Sequences (27)#Expressions (4)#Probability (23)#Expressions (4)#Data and statistics (24)#Area and perimeter (18)#Circles (17)#Percents (10)#Functions (11)#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Data#Data#Data#Data#Data#Data#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Data#Data#Data#Data#Data#Data#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Verbs (8)#Add, revise, or delete (18)#Punctuation (5,6,7)#Verbs (8)#Shorter is better (15)#Verbs (8)#Transitions (17)#Non-essential and essential clauses (4)#Diction, idioms, and register (16)#Verbs (8)#Non-essential and essential clauses (4)#Sentence and paragraph order (19)#Sentences and fragments (2)#Add, revise, or delete (18)#Sentence and paragraph order (19)#Sentences and fragments (2)#Shorter is better (15)#Punctuation (5,6,7)#Diction, idioms, and register (16)#Parallel structure (13)#Joining and separating sentences (3)#Verbs (8)#Diction, idioms, and register (16)#Shorter is better (15)#Add, revise, or delete (18)#Modification (12)#Diction, idioms, and register (16)#Non-essential and essential clauses (4)#Sentence and paragraph order (19)#Evaluation of purpose (20)#Verbs (8)#Diction, idioms, and register (16)#Punctuation (5,6,7)#Add, revise, or delete (18)#Punctuation (5,6,7)#Add, revise, or delete (18)#Sentences and fragments (2)#Shorter is better (15)#Modification (12)#Add, revise, or delete (18)#Modification (12)#Add, revise, or delete (18)#Transitions (17)#Diction, idioms, and register (16)#Add, revise, or delete (18)#Add, revise, or delete (18)#Add, revise, or delete (18)#Punctuation (5,6,7)#Verbs (8)#Pronouns (9)#Pronouns (9)#Add, revise, or delete (18)#Joining and separating sentences (3)#Verbs (8)#Punctuation (5,6,7)#Add, revise, or delete (18)#Add, revise, or delete (18)#Shorter is better (15)#Sentence and paragraph order (19)#Evaluation of purpose (20)#Punctuation (5,6,7)#Shorter is better (15)#Pronouns (9)#Add, revise, or delete (18)#Add, revise, or delete (18)#Add, revise, or delete (18)#Joining and separating sentences (3)#Diction, idioms, and register (16)#Parallel structure (13)#Diction, idioms, and register (16)#Sentences and fragments (2)#Pronouns (9)#Shorter is better (15)#Add, revise, or delete (18)#Evaluation of purpose (20)#Numbers and Operations (5)#Coordinate geometry (14)#Numbers and Operations (5)#Word problems (26)#Matrices (28)#Functions (11)#Data and statistics (24)#Triangles (16)#Ratio and proportion (9)#Numbers and Operations (5)#Coordinate geometry (14)#Angles (15)#Quadratics (13)#Volume (19)#Numbers and Operations (5)#Properties of numbers (6)#Coordinate geometry (14)#Probability (23)#Ratio and proportion (9)#Systems of equations (20)#Area and perimeter (18)#Probability (23)#Percents (10)#Coordinate geometry (14)#Area and perimeter (18)#Area and perimeter (18)#Numbers and Operations (5)#Numbers and Operations (5)#Coordinate geometry (14)#Numbers and Operations (5)#Numbers and Operations (5)#Numbers and Operations (5)#Coordinate geometry (14)#Data and statistics (24)#Expressions (4)#Functions (11)#Properties of numbers (6)#Numbers and Operations (5)#Properties of numbers (6)#Trigonometry (22)#Vectors (28)#Expressions (4)#Functions (11)#Circles (17)#Data and statistics (24)#Trigonometry (22)#Circles (17)#Absolute value (1)#Inequalities (21)#Ratio and proportion (9)#Ellipses (28)#Data and statistics (24)#Properties of numbers (6)#Numbers and Operations (5)#Ratio and proportion (9)#Exponents and radicals (2)#Percents (10)#Probability (23)#Trigonometry (22)#Area and perimeter (18)#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Data#Data#Data#Data#Data#Data#Data#Data#Data#Data#Data#Data#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Diction, idioms, and register (16)#Verbs (8)#Diction, idioms, and register (16)#Non-essential and essential clauses (4)#Adjectives and adverbs (10)#Add, revise, or delete (18)#Transitions (17)#Pronouns (9)#Add, revise, or delete (18)#Sentences and fragments (2)#Pronouns (9)#Pronouns (9)#Diction, idioms, and register (16)#Verbs (8)#Add, revise, or delete (18)#Punctuation (5,6,7)#Parallel structure (13)#Add, revise, or delete (18)#Add, revise, or delete (18)#Add, revise, or delete (18)#Adjectives and adverbs (10)#Modification (12)#Diction, idioms, and register (16)#Verbs (8)#Transitions (17)#Pronouns (9)#Diction, idioms, and register (16)#Joining and separating sentences (3)#Shorter is better (15)#Evaluation of purpose (20)#Shorter is better (15)#Non-essential and essential clauses (4)#Non-essential and essential clauses (4)#Add, revise, or delete (18)#Transitions (17)#Transitions (17)#Add, revise, or delete (18)#Punctuation (5,6,7)#Pronouns (9)#Verbs (8)#Add, revise, or delete (18)#Non-essential and essential clauses (4)#Diction, idioms, and register (16)#Add, revise, or delete (18)#Evaluation of purpose (20)#Pronouns (9)#Shorter is better (15)#Add, revise, or delete (18)#Punctuation (5,6,7)#Joining and separating sentences (3)#Shorter is better (15)#Non-essential and essential clauses (4)#Verbs (8)#Add, revise, or delete (18)#Modification (12)#Add, revise, or delete (18)#Add, revise, or delete (18)#Joining and separating sentences (3)#Punctuation (5,6,7)#Sentence and paragraph order (19)#Word pairs and comparisons (11)#Joining and separating sentences (3)#Transitions (17)#Non-essential and essential clauses (4)#Pronouns (9)#Transitions (17)#Add, revise, or delete (18)#Shorter is better (15)#Modification (12)#Shorter is better (15)#Punctuation (5,6,7)#Sentences and fragments (2)#Joining and separating sentences (3)#Diction, idioms, and register (16)#Add, revise, or delete (18)#Angles (15)#Data and statistics (24)#Properties of numbers (6)#Solving equations (3)#Probability (23)#Ratio and proportion (9)#Word problems (26)#Word problems (26)#Quadratics (13)#Area and perimeter (18)#Numbers and Operations (5)#Numbers and Operations (5)#Triangles (16)#Functions (11)#Area and perimeter (18)#Numbers and Operations (5)#Word problems (26)#Functions (11)#Data and statistics (24)#Numbers and Operations (5)#Coordinate geometry (14)#Functions (11)#Triangles (16)#Coordinate geometry (14)#Area and perimeter (18)#Word problems (26)#Ratio and proportion (9)#Word problems (26)#Area and perimeter (18)#Matrices (28)#Numbers and Operations (5)#Probability (23)#Trigonometry (22)#Expressions (4)#Angles (15)#Solving equations (3)#Coordinate geometry (14)#Triangles (16)#Quadratics (13)#Circles (17)#Exponents and radicals (2)#Logarithms (25)#Coordinate geometry (14)#Word problems (26)#Quadratics (13)#Expressions (4)#Ratio and proportion (9)#Inequalities (21)#Ratio and proportion (9)#Volume (19)#Trigonometry (22)#Data and statistics (24)#Exponents and radicals (2)#Probability (23)#Word problems (26)#Probability (23)#Probability (23)#Properties of numbers (6)#Quadratics (13)#Trigonometry (22)#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Data#Data#Data#Data#Data#Data#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Data#Data#Data#Data#Data#Data#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Add, revise, or delete (18)#Verbs (8)#Transitions (17)#Pronouns (9)#Joining and separating sentences (3)#Shorter is better (15)#Adjectives and adverbs (10)#Transitions (17)#Sentence and paragraph order (19)#Punctuation (5,6,7)#Add, revise, or delete (18)#Non-essential and essential clauses (4)#Verbs (8)#Add, revise, or delete (18)#Non-essential and essential clauses (4)#Verbs (8)#Diction, idioms, and register (16)#Add, revise, or delete (18)#Add, revise, or delete (18)#Verbs (8)#Diction, idioms, and register (16)#Modification (12)#Shorter is better (15)#Joining and separating sentences (3)#Pronouns (9)#Diction, idioms, and register (16)#Verbs (8)#Add, revise, or delete (18)#Evaluation of purpose (20)#Shorter is better (15)#Joining and separating sentences (3)#Add, revise, or delete (18)#Punctuation (5,6,7)#Add, revise, or delete (18)#Diction, idioms, and register (16)#Diction, idioms, and register (16)#Joining and separating sentences (3)#Add, revise, or delete (18)#Non-essential and essential clauses (4)#Modification (12)#Pronouns (9)#Diction, idioms, and register (16)#Diction, idioms, and register (16)#Evaluation of purpose (20)#Diction, idioms, and register (16)#Sentence and paragraph order (19)#Non-essential and essential clauses (4)#Verbs (8)#Transitions (17)#Add, revise, or delete (18)#Modification (12)#Punctuation (5,6,7)#Joining and separating sentences (3)#Non-essential and essential clauses (4)#Shorter is better (15)#Diction, idioms, and register (16)#Diction, idioms, and register (16)#Transitions (17)#Punctuation (5,6,7)#Verbs (8)#Apostrophes (1)#Modification (12)#Non-essential and essential clauses (4)#Sentence and paragraph order (19)#Modification (12)#Add, revise, or delete (18)#Diction, idioms, and register (16)#Word pairs and comparisons (11)#Punctuation (5,6,7)#Diction, idioms, and register (16)#Add, revise, or delete (18)#Transitions (17)#Punctuation (5,6,7)#Evaluation of purpose (20)#Evaluation of purpose (20)#Percents (10)#Expressions (4)#Angles (15)#Solving equations (3)#Triangles (16)#Probability (23)#Word problems (26)#Probability (23)#Numbers and Operations (5)#Area and perimeter (18)#Solving equations (3)#Systems of equations (20)#Expressions (4)#Expressions (4)#Solving equations (3)#Data and statistics (24)#Probability (23)#Coordinate geometry (14)#Coordinate geometry (14)#Coordinate geometry (14)#Probability (23)#Data and statistics (24)#Functions (11)#Volume (19)#Functions (11)#Trigonometry (22)#Solving equations (3)#Expressions (4)#Circles (17)#Area and perimeter (18)#Coordinate geometry (14)#Trigonometry (22)#Area and perimeter (18)#Triangles (16)#Coordinate geometry (14)#Properties of numbers (6)#Data and statistics (24)#Numbers and Operations (5)#Word problems (26)#Solving equations (3)#Circles (17)#Circles (17)#Properties of numbers (6)#Exponents and radicals (2)#Area and perimeter (18)#Numbers and Operations (5)#Sequences (27)#Probability (23)#Quadratics (13)#Trigonometry (22)#Systems of equations (20)#Word problems (26)#Trigonometry (22)#Properties of numbers (6)#Inequalities (21)#Functions (11)#Expressions (4)#Data and statistics (24)#Functions (11)#Matrices (28)#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Data#Data#Data#Data#Data#Data#Data#Data#Data#Data#Data#Data#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Conflicting Viewpoints"
      var ACTDetailsTotalPart2 = "Conflicting Viewpoints#Conflicting Viewpoints#Conflicting Viewpoints#Conflicting Viewpoints#Conflicting Viewpoints#Conflicting Viewpoints#Non-essential and essential clauses (4)#Joining and separating sentences (3)#Punctuation (5,6,7)#Punctuation (5,6,7)#Shorter is better (15)#Shorter is better (15)#Non-essential and essential clauses (4)#Modification (12)#Diction, idioms, and register (16)#Verbs (8)#Verbs (8)#Joining and separating sentences (3)#Add, revise, or delete (18)#Verbs (8)#Sentence and paragraph order (19)#Transitions (17)#Pronouns (9)#Verbs (8)#Non-essential and essential clauses (4)#Add, revise, or delete (18)#Verbs (8)#Sentence and paragraph order (19)#Shorter is better (15)#Diction, idioms, and register (16)#Shorter is better (15)#Verbs (8)#Joining and separating sentences (3)#Transitions (17)#Diction, idioms, and register (16)#Sentence and paragraph order (19)#Diction, idioms, and register (16)#Non-essential and essential clauses (4)#Add, revise, or delete (18)#Punctuation (5,6,7)#Transitions (17)#Shorter is better (15)#Add, revise, or delete (18)#Shorter is better (15)#Transitions (17)#Pronouns (9)#Sentences and fragments (2)#Diction, idioms, and register (16)#Diction, idioms, and register (16)#Add, revise, or delete (18)#Evaluation of purpose (20)#Joining and separating sentences (3)#Diction, idioms, and register (16)#Verbs (8)#Add, revise, or delete (18)#Pronouns (9)#Add, revise, or delete (18)#Modification (12)#Add, revise, or delete (18)#Add, revise, or delete (18)#Punctuation (5,6,7)#Punctuation (5,6,7)#Joining and separating sentences (3)#Non-essential and essential clauses (4)#Pronouns (9)#Add, revise, or delete (18)#Verbs (8)#Add, revise, or delete (18)#Sentence and paragraph order (19)#Punctuation (5,6,7)#Add, revise, or delete (18)#Add, revise, or delete (18)#Non-essential and essential clauses (4)#Shorter is better (15)#Non-essential and essential clauses (4)#Transitions (17)#Pronouns (9)#Diction, idioms, and register (16)#Add, revise, or delete (18)#Sentence and paragraph order (19)#Evaluation of purpose (20)#Solving equations (3)#Numbers and Operations (5)#Word problems (26)#Expressions (4)#Sequences (27)#Numbers and Operations (5)#Numbers and Operations (5)#Triangles (16)#Numbers and Operations (5)#Sequences (27)#Expressions (4)#Properties of numbers (6)#Angles (15)#Area and perimeter (18)#Coordinate geometry (14)#Quadratics (13)#Area and perimeter (18)#Expressions (4)#Percents (10)#Trigonometry (22)#Numbers and Operations (5)#Angles (15)#Data and statistics (24)#Probability (23)#Trigonometry (22)#Data and statistics (24)#Probability (23)#Percents (10)#Systems of equations (20)#Matrices (28)#Numbers and Operations (5)#Expressions (4)#Vectors (28)#Numbers and Operations (5)#Quadratics (13)#Properties of numbers (6)#Data and statistics (24)#Quadratics (13)#Angles (15)#Functions (11)#Area and perimeter (18)#Logarithms (25)#Area and perimeter (18)#Trigonometry (22)#Percents (10)#Data and statistics (24)#Probability (23)#Area and perimeter (18)#Probability (23)#Probability (23)#Data and statistics (24)#Data and statistics (24)#Probability (23)#Word problems (26)#Properties of numbers (6)#Ellipses (28)#Properties of numbers (6)#Numbers and Operations (5)#Expressions (4)#Expressions (4)#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Data#Data#Data#Data#Data#Data#Data#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Data#Data#Data#Data#Data#Data#Data#Data#Data#Data#Data#Data#Data#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Data#Data#Data#Data#Data#Data#Shorter is better (15)#Pronouns (9)#Add, revise, or delete (18)#Non-essential and essential clauses (4)#Sentences and fragments (2)#Add, revise, or delete (18)#Non-essential and essential clauses (4)#Shorter is better (15)#Joining and separating sentences (3)#Sentences and fragments (2)#Diction, idioms, and register (16)#Add, revise, or delete (18)#Joining and separating sentences (3)#Apostrophes (1)#Sentence and paragraph order (19)#Add, revise, or delete (18)#Verbs (8)#Shorter is better (15)#Joining and separating sentences (3)#Diction, idioms, and register (16)#Transitions (17)#Add, revise, or delete (18)#Joining and separating sentences (3)#Add, revise, or delete (18)#Diction, idioms, and register (16)#Modification (12)#Punctuation (5,6,7)#Diction, idioms, and register (16)#Parallel structure (13)#Sentence and paragraph order (19)#Add, revise, or delete (18)#Non-essential and essential clauses (4)#Modification (12)#Joining and separating sentences (3)#Transitions (17)#Punctuation (5,6,7)#Punctuation (5,6,7)#Sentence and paragraph order (19)#Joining and separating sentences (3)#Add, revise, or delete (18)#Pronouns (9)#Verbs (8)#Joining and separating sentences (3)#Shorter is better (15)#Sentence and paragraph order (19)#Sentences and fragments (2)#Verbs (8)#Add, revise, or delete (18)#Apostrophes (1)#Transitions (17)#Non-essential and essential clauses (4)#Diction, idioms, and register (16)#Apostrophes (1)#Sentence and paragraph order (19)#Transitions (17)#Add, revise, or delete (18)#Joining and separating sentences (3)#Add, revise, or delete (18)#Transitions (17)#Evaluation of purpose (20)#Pronouns (9)#Shorter is better (15)#Non-essential and essential clauses (4)#Add, revise, or delete (18)#Verbs (8)#Add, revise, or delete (18)#Pronouns (9)#Diction, idioms, and register (16)#Modification (12)#Verbs (8)#Modification (12)#Verbs (8)#Punctuation (5,6,7)#Sentence and paragraph order (19)#Evaluation of purpose (20)#Ratio and proportion (9)#Probability (23)#Exponents and radicals (2)#Functions (11)#Probability (23)#Word problems (26)#Angles (15)#Solving equations (3)#Coordinate geometry (14)#Data and statistics (24)#Coordinate geometry (14)#Word problems (26)#Systems of equations (20)#Data and statistics (24)#Absolute value (1)#Exponents and radicals (2)#Coordinate geometry (14)#Properties of numbers (6)#Triangles (16)#Triangles (16)#Area and perimeter (18)#Area and perimeter (18)#Percents (10)#Word problems (26)#Numbers and Operations (5)#Coordinate geometry (14)#Expressions (4)#Data and statistics (24)#Numbers and Operations (5)#Word problems (26)#Properties of numbers (6)#Area and perimeter (18)#Area and perimeter (18)#Percents (10)#Word problems (26)#Word problems (26)#Probability (23)#Properties of numbers (6)#Trigonometry (22)#Absolute value (1)#Data and statistics (24)#Logarithms (25)#Percents (10)#Absolute value (1)#Volume (19)#Volume (19)#Area and perimeter (18)#Data and statistics (24)#Functions (11)#Systems of equations (20)#Data and statistics (24)#Systems of equations (20)#Sequences (27)#Trigonometry (22)#Trigonometry (22)#Probability (23)#Matrices (28)#Complex numbers (7)#Trigonometry (22)#Angles (15)#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Data#Data#Data#Data#Data#Data#Data#Data#Data#Data#Data#Data#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Verbs (8)#Non-essential and essential clauses (4)#Modification (12)#Diction, idioms, and register (16)#Punctuation (5,6,7)#Punctuation (5,6,7)#Non-essential and essential clauses (4)#Add, revise, or delete (18)#Modification (12)#Modification (12)#Pronouns (9)#Punctuation (5,6,7)#Shorter is better (15)#Add, revise, or delete (18)#Evaluation of purpose (20)#Add, revise, or delete (18)#Shorter is better (15)#Shorter is better (15)#Add, revise, or delete (18)#Shorter is better (15)#Pronouns (9)#Add, revise, or delete (18)#Punctuation (5,6,7)#Punctuation (5,6,7)#Verbs (8)#Transitions (17)#Punctuation (5,6,7)#Add, revise, or delete (18)#Punctuation (5,6,7)#Add, revise, or delete (18)#Modification (12)#Punctuation (5,6,7)#Add, revise, or delete (18)#Joining and separating sentences (3)#Add, revise, or delete (18)#Pronouns (9)#Verbs (8)#Punctuation (5,6,7)#Add, revise, or delete (18)#Sentence and paragraph order (19)#Shorter is better (15)#Transitions (17)#Transitions (17)#Add, revise, or delete (18)#Evaluation of purpose (20)#Shorter is better (15)#Add, revise, or delete (18)#Shorter is better (15)#Modification (12)#Verbs (8)#Diction, idioms, and register (16)#Verbs (8)#Punctuation (5,6,7)#Verbs (8)#Non-essential and essential clauses (4)#Shorter is better (15)#Shorter is better (15)#Transitions (17)#Shorter is better (15)#Add, revise, or delete (18)#Pronouns (9)#Punctuation (5,6,7)#Diction, idioms, and register (16)#Verbs (8)#Add, revise, or delete (18)#Sentence and paragraph order (19)#Pronouns (9)#Shorter is better (15)#Transitions (17)#Joining and separating sentences (3)#Add, revise, or delete (18)#Pronouns (9)#Non-essential and essential clauses (4)#Non-essential and essential clauses (4)#Evaluation of purpose (20)#Probability (23)#Triangles (16)#Angles (15)#Probability (23)#Absolute value (1)#Systems of equations (20)#Ratio and proportion (9)#Solving equations (3)#Numbers and Operations (5)#Ratio and proportion (9)#Solving equations (3)#Coordinate geometry (14)#Quadratics (13)#Trigonometry (22)#Area and perimeter (18)#Angles (15)#Sequences (27)#Coordinate geometry (14)#Area and perimeter (18)#Probability (23)#Coordinate geometry (14)#Exponents and radicals (2)#Coordinate geometry (14)#Solving equations (3)#Area and perimeter (18)#Angles (15)#Area and perimeter (18)#Numbers and Operations (5)#Solving equations (3)#Probability (23)#Numbers and Operations (5)#Exponents and radicals (2)#Triangles (16)#Trigonometry (22)#Angles (15)#Volume (19)#Solving equations (3)#Angles (15)#Area and perimeter (18)#Percents (10)#Sequences (27)#Trigonometry (22)#Exponents and radicals (2)#Data and statistics (24)#Absolute value (1)#Functions (11)#Circles (17)#Properties of numbers (6)#Area and perimeter (18)#Numbers and Operations (5)#Coordinate geometry (14)#Functions (11)#Probability (23)#Logarithms (25)#Matrices (28)#Ratio and proportion (9)#Coordinate geometry (14)#Absolute value (1)#Data and statistics (24)#Circles (17)#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Data#Data#Data#Data#Data#Data#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Conflicting Viewpoints#Conflicting Viewpoints#Conflicting Viewpoints#Conflicting Viewpoints#Conflicting Viewpoints#Conflicting Viewpoints#Conflicting Viewpoints#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Data#Data#Data#Data#Data#Data"
      var ACTDetails1 = ACTDetailsTotalPart1.split('#')
      var ACTDetails2 = ACTDetailsTotalPart2.split('#')
      var ACTDetailsArr = ACTDetails1.concat(ACTDetails2)
      var ACTCorrectAnswersTotal = "C#G#A#J#A#F#C#F#C#J#B#F#B#J#D#G#A#G#D#G#A#J#C#F#D#H#C#G#D#G#D#G#B#F#A#G#A#F#C#J#D#G#C#J#B#J#A#H#D#J#A#H#A#J#B#F#C#G#C#J#A#H#A#G#C#J#D#H#D#G#C#H#D#F#B#C#H#E#H#E#G#E#F#C#H#B#J#B#G#B#F#B#K#D#G#A#G#C#G#C#F#C#H#D#J#D#F#B#H#B#J#E#H#A#H#C#G#A#J#D#J#B#H#A#F#B#F#A#K#A#J#C#F#A#J#C#F#B#H#A#J#B#J#D#G#C#F#B#H#A#H#B#J#A#F#B#G#D#G#D#H#C#G#A#G#A#H#C#F#A#J#C#G#D#J#B#G#B#F#D#J#B#J#A#G#A#F#B#F#C#G#C#F#B#G#A#F#D#H#D#J#B#H#B#F#C#J#D#H#C#G#D#H#D#H#B#F#C#G#D#G#A#F#A#J#C#J#D#J#C#H#D#G#A#G#D#G#C#F#D#J#C#H#B#J#A#J#B#G#C#H#D#F#B#H#A#J#C#J#A#H#A#H#C#J#D#J#A#G#B#H#A#F#A#G#D#G#B#H#D#J#B#G#C#J#C#F#C#F#B#B#G#B#H#A#H#D#J#E#H#E#J#A#H#C#G#D#K#A#J#A#J#E#K#C#G#B#H#C#J#D#K#E#F#E#J#C#G#D#J#A#J#B#J#A#G#E#G#B#G#C#F#C#F#E#H#B#F#A#K#A#H#b#F#D#G#C#H#A#H#D#J#B#H#A#J#B#F#C#F#B#F#B#J#C#F#B#J#C#G#D#G#C#G#D#F#D#F#B#G#B#G#D#H#D#J#A#G#A#H#B#G#D#H#A#F#D#F#C#J#B#F#D#H#B#J#C#J#A#J#C#H#B#G#C#G#D#F#A#F#A#G#C#G#D#G#B#J#B#F#D#F#B#F#A#F#C#G#A#H#C#H#A#H#D#J#A#F#C#H#D#F#C#H#C#J#D#F#D#J#B#F#C#G#C#J#C#H#C#J#A#G#A#J#D#F#D#G#B#G#D#H#C#G#C#J#A#F#B#G#B#H#C#J#B#C#J#E#F#C#G#B#H#C#G#C#G#D#G#D#H#A#J#C#H#D#G#C#H#E#G#E#F#D#H#A#J#A#K#B#F#E#K#D#H#A#G#D#G#D#G#E#H#D#J#E#F#B#F#E#K#A#F#D#K#B#H#D#F#B#F#C#J#D#F#D#F#D#G#C#H#A#J#A#J#B#G#D#G#C#H#A#G#D#J#B#H#B#G#C#F#D#F#B#J#A#H#C#J#A#J#D#F#D#H#B#J#C#J#A#F#D#G#C#G#B#F#B#H#C#G#D#F#A#J#B#J#D#G#D#G#C#F#C#H#B#F#C#F#A#J#D#H#D#J#A#G#B#H#C#J#B#H#A#J#B#F#C#G#B#H#A#J#D#F#B#H#A#G#A#F#D#J#B#J#C#F#D#H#A#J#C#H#D#J#A#F#D#G#B#H#B#G#A#H#A#G#D#G#C#F#D#H#A#J#B#F#D#F#C#B#G#A#H#A#G#E#J#C#H#E#G#A#K#E#J#D#G#B#F#C#K#A#G#D#F#C#H#A#H#C#J#C#G#A#G#E#J#C#K#C#G#D#K#A#K#D#F#B#K#D#J#E#J#B#G#A#J#D#K#A#H#D#H#B#J#A#F#C#G#C#F#A#G#D#G#C#F#D#J#C#F#A#H#B#G#C#J#B#J#B#H#B#F#A#J#C#J#A#H#C#H#C#F#B#H#C#F#A#H#B#J#A#H#A#J#C#F#A#G#B#F#B#G#D#G#D#J#C#G#D#J#A#H#D#F#B#J#B#F#C#H#D#G#D#J#B#H#C#F#A#J#D#H#B#J#A#G#A#H#A#J#C#F#B#J#D#H#B#G#A#H#C#J#D#F#A#F#D#G#C#H#B#H#A#G#A#J#D#H#B#J#B#F#B#F#C#H#D#G#B#F#A#H#A#F#C#J#B#G#D#J#A#H#C#D#H#C#J#A#H#D#H#B#G#A#G#C#F#C#K#A#K#A#G#D#J#E#H#C#H#D#J#B#K#C#H#B#K#E#G#C#F#A#K#E#F#A#J#D#K#A#K#D#G#D#H#B#G#D#K#B#F#D#G#B#F#D#J#B#H#A#J#D#H#D#J#D#H#B#H#C#J#C#F#D#H#A#F#B#J#A#G#C#H#B#F#D#G#C#F#A#H#A#G#B#J#A#H#A#H#D#J#C#H#D#F#B#H#B#G#C#J#A#F#C#F#D#F#B#G#C#F#B#G#A#H#D#J#C#H#B#G#C#J#C#H#B#H#C#F#A#G#A#H#D#G#B#J#A#J#C#F#A#F#B#J#B#H#A#J#A#H#D#G#D#G#B#J#D#G#C#F#C#F#A#F#B#F#C#F#A#F#B#G#D#J#A#G#D#J#C#J#B#H#D#F#C#H#D#G#A#J#D#J#B#H#A#H#B#E#H#B#J#A#F#B#H#C#J#C#H#E#H#D#F#C#G#A#J#B#H#A#F#C#F#E#H#E#F#B#K#C#J#D#K#E#K#B#H#B#F#D#G#D#H#A#G#D#J#E#J#E#G#D#J#A#G#E#K#D#J#C#H#B#H#A#F#D#F#B#F#B#F#A#H#D#J#C#J#C#G#B#H#D#G#A#F#B#F#B#F#D#H#B#H#A#F#C#J#A#J#D#G#D#G#B#G#A#H#D#H#B#G#B#H#A#F#C#F#C#F#D#H#B#J#B#H#C#J#B#F#A#F#C#F#B#J#B#F#C#J#B#H#B#J#D#H#B#G#D#F#A#H#A#J#C#F#B#G#D#H#B#F#D#G#A#F#C#H#D#H#A#F#C#H#A#H#B#G#D#H#D#F#D#H#B#F#B#J#B#F#A#H#D#J#A#H#B#J#C#F#D#F#B#G#D#H#A#J#A#G#B#F#B#D#F#E#H#C#H#C#K#B#H#D#G#C#K#D#F#B#G#B#J#D#K#C#F#C#H#C#F#C#G#E#J#D#G#A#K#A#G#E#J#C#J#D#K#A#J#B#F#E#F#E#G#A#G#A#J#D#F#A#K#D#G#D#H#A#J#B#G#C#F#A#H#C#J#C#F#B#G#D#F#C#G#D#G#C#F#A#G#A#J#D#F#C#J#B#F#D#G#B#H#A#F#C#G#C#J#D#H#B#F#B#G#D#H#C#F#A#G#A#J#C#H#C#F#C#G#B#G#C#F#B#F#D#F#B#G#D#J#A#J#A#J#B#H#D#F#B#J#B#H#C#F#C#J#D#J#B#G#C#H#A#G#D#H#D#H#A#H#A#H#C#J#B#F#D#F#C#F#C#G#A#J#C#F#B#F#B#G#D#H#B#J#D#G#A#J#C#G#A#H#D#G#B#F#A#F#B#J#D#H#A#H#B#G#D#E#H#B#F#D#K#B#G#D#J#C#G#C#F#C#H#E#H#A#K#B#K#B#K#C#J#A#G#A#K#A#H#A#H#D#J#D#H#C#F#D#F#E#J#D#G#D#G#C#J#D#H#C#H#E#J#E#F#E#J#A#G#D#G#A#H#D#F#C#J#B#G#C#H#D#H#D#J#A#H#D#G#C#G#C#F#B#F#B#G#C#G#D#H#A#J#B#J#B#F#C#G#B#H#D#H#D#H#A#J#B#F#A#G#D#J#A#F#A#G#D#J#C#J#B#J#A#F#B#F#C#F#A#G#A#G#D#G#B#J#D#H#A#H#D#F#A#J#B#G#C#G#A#H#C#H#A#J#D#F#B#J#A#G#B#F#D#H#B#H#B#H#D#F#D#H#A#F#B#H#D#F#D#J#C#H#D#F#A#H#C#J#A#H#B#G#C#J#D#J#B#J#B#F#D#H#B#G#B#F#D#H#D#G#A#A#K#D#J#D#F#B#K#D#K#A#H#D#G#B#H#D#K#C#J#B#H#E#G#E#H#C#H#C#H#B#G#B#F#D#K#C#J#C#F#D#F#C#G#E#K#A#F#A#F#A#G#C#F#A#J#E#G#D#K#B#F#B#F#D#H#C#J#B#J#A#J#D#H#D#G#A#G#C#H#B#H#A#J#B#F#D#H#A#H#C#F#B#J#C#H#D#H#B#J#A#J#D#H#C#G#B#H#C#G#D#F#A#H#D#G#B#F#B#J#B#F#B#H#A#F#A#H#B#G#C#H#A#G#C#J#D#G#C#J#A#G#A#F#C#F#D#G#C#J#C#F#B#J#B#G#C#F#C#G#D#G#C#H#B#F#C#F#D#G#C#J#C#G#A#J#C#F#D#H#B#F#C#G#A#F#B#G#D#F#B#F#D#H#D#H#A#G#C#J#C#G#D#J#B#F#B#F#D#F#C#H#D#F#D#C#K#B#J#D#H#D#G#D#G#D#H#B#H#D#K#B#K#B#K#B#F#C#J#A#H#A#H#E#J#E#G#E#H#C#J#A#K#D#K#A#G#C#F#A#J#B#G#B#J#C#F#A#H#E#H#B#F#A#K#A#G#A#J#C#G#D#H#C#F#D#G#D#J#A#G#B#H#A#H#C#G#D#H#D#F#C#J#A#F#D#H#B#J#C#G#A#G#A#J#C#J#B#J#A#G#C#J#C#J#A#F#A#H#B#J#A#H#A#G#C#H#C#H#D#J#C#F#B#F#D#F#D#G#A#J#D#J#B#G"
      var ACTCorrectAnswerArr = ACTCorrectAnswersTotal.split('#')

      var ACTSections = "English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science"
      var ACTSectionsArr = Copies(ACTSections.split('#'))
      var ACTSectionNumberArr = []
      
      for(var u = 0; u<ACTSectionsArr.length; u++){
        var Curr = ACTSectionsArr[u]
        if(Curr == 'English'){
          ACTSectionNumberArr.push('1')
        }
        if(Curr == 'Math'){
          ACTSectionNumberArr.push('2')
        }
        if(Curr == 'Reading'){
          ACTSectionNumberArr.push('3')
        }
        if(Curr == 'Science'){
          ACTSectionNumberArr.push('4')
        }
      }
      var ACTQuestion = "1#2#3#4#5#6#7#8#9#10#11#12#13#14#15#16#17#18#19#20#21#22#23#24#25#26#27#28#29#30#31#32#33#34#35#36#37#38#39#40#41#42#43#44#45#46#47#48#49#50#51#52#53#54#55#56#57#58#59#60#61#62#63#64#65#66#67#68#69#70#71#72#73#74#75#1#2#3#4#5#6#7#8#9#10#11#12#13#14#15#16#17#18#19#20#21#22#23#24#25#26#27#28#29#30#31#32#33#34#35#36#37#38#39#40#41#42#43#44#45#46#47#48#49#50#51#52#53#54#55#56#57#58#59#60#1#2#3#4#5#6#7#8#9#10#11#12#13#14#15#16#17#18#19#20#21#22#23#24#25#26#27#28#29#30#31#32#33#34#35#36#37#38#39#40#1#2#3#4#5#6#7#8#9#10#11#12#13#14#15#16#17#18#19#20#21#22#23#24#25#26#27#28#29#30#31#32#33#34#35#36#37#38#39#40"
      var ACTQuestionArr = Copies(ACTQuestion.split('#'))


      //var DiagnosticsDetails = "Punctuation#Transitions#Verb form#Repetition#Clause relationships#Verb form#Add, revise, or delete#Verb form#Punctuation#Verb form#Adjectives and adverbs#Punctuation#Introductions/conclusions#Add, revise, or delete#Evaluation of purpose#Clause relationships#Verb form#Repetition#Verb form#Clause relationships#Comparatives/superlatives#Verb form#Word choice#Punctuation#Punctuation#Add, revise, or delete#Transitions#Word choice#Add, revise, or delete#Evaluation of purpose#Punctuation#Punctuation#Punctuation#Introductions/conclusions#Verb form#Evaluation of purpose#Verb form#Word choice#Clause relationships#Repetition#Add, revise, or delete#Pronouns#Pronouns#Sentence/paragraph order#Evaluation of purpose#Pronouns#Punctuation#Transitions#Pronouns#Clause relationships#Add, revise, or delete#Clause relationships#Subject-verb agreement#Word choice#Add, revise, or delete#Transitions#Evaluation of purpose#Adjectives and adverbs#Clause relationships#Verb form#Clause relationships#Punctuation#Pronouns#Add, revise, or delete#Clause relationships#Add, revise, or delete#Add, revise, or delete#Transitions#Pronouns#Evaluation of purpose#Ratio and probability#Mean, median, mode#Ratio and probability#Substitution/simplification#Functions#Percents#Sequences and series#Algebraic equations#Operations#Mean, median, mode#Functions#Perimeter#Angles#Circles#Systems of equations#Operations#Angles#Operations#Operations#Angles#Percents#Exponents#Polynomials#Inequalities#Percents#Angles#Triangles#Polynomials#Complex numbers#Trigonometry#Ratio and probability#Operations#Ratio and probability#Area#Algebraic equations#Inequalities#Mean, median, mode#Functions#Coordinate geometry#Coordinate geometry#Coordinate geometry#Functions#Algebraic equations#Coordinate geometry#Operations#Algebraic equations#Ratio and probability#Operations#Inequalities#Volume#Ratio and probability#Inequalities#Algebraic equations#Operations#Tables and charts#Area#Trigonometry#Inequalities#Ratio and probability#Trigonometry#Prose Fiction#Prose Fiction#Prose Fiction#Prose Fiction#Prose Fiction#Prose Fiction#Prose Fiction#Prose Fiction#Prose Fiction#Prose Fiction#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Research Summaries#Research Summaries#Research Summaries#Research Summaries#Research Summaries#Research Summaries#Research Summaries#Conflicting Viewpoints#Conflicting Viewpoints#Conflicting Viewpoints#Conflicting Viewpoints#Conflicting Viewpoints#Conflicting Viewpoints#Conflicting Viewpoints#Data Representation#Data Representation#Data Representation#Data Representation#Data Representation#Data Representation#Research Summaries#Research Summaries#Research Summaries#Research Summaries#Research Summaries#Research Summaries#Data Representation#Data Representation#Data Representation#Data Representation#Data Representation#Data Representation#Data Representation#Data Representation#Data Representation#Data Representation#Data Representation#Data Representation#Data Representation#Data Representation#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Non-fiction#Non-fiction#Non-fiction#Non-fiction#Non-fiction#Non-fiction#Non-fiction#Non-fiction#Non-fiction#Non-fiction#Non-fiction#Non-fiction#Non-fiction#Non-fiction#Non-fiction#Non-fiction#Non-fiction#Non-fiction#Non-fiction#Non-fiction#Non-fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Non-fiction#Non-fiction#Non-fiction#Non-fiction#Non-fiction#Non-fiction#Non-fiction#Non-fiction#Non-fiction#Non-fiction#Non-fiction#Diction, idioms, and register#Add, revise, or delete#Verbs#Punctuation#Sentence and paragraph order#Add, revise, or delete#Diction, idioms, and register#Verbs#Transitions#Diction, idioms, and register#Punctuation#Infographics#Clause relationships#Transitions#Clause relationships#Punctuation#Pronouns#Verbs#Pronouns#Add, revise, or delete#Repetition#Sentence and paragraph order#Verbs#Clause relationships#Diction, idioms, and register#Punctuation#Transitions#Add, revise, or delete#Infographics#Verbs#Add, revise, or delete#Punctuation#Diction, idioms, and register#Transitions#Repetition#Verbs#Add, revise, or delete#Transitions#Clause relationships#Verbs#Verbs#Add, revise, or delete#Pronouns#Pronouns#Algebraic equations#Complex numbers#Operations#Functions#Polynomials#Functions#Algebraic equations#Algebraic manipulation#Systems of equations#Functions#Systems of equations#Coordinate geometry#Algebraic manipulation#Algebraic manipulation#Quadratics#Algebraic equations#Triangles#Systems of equations#Trigonometry#Algebraic equations#Coordinate geometry#Algebraic equations#Angles#Algebraic equations#Functions#Operations#Tables and charts#Absolute value#Functions#Functions#Inequalities#Mean, median, mode#Tables and charts#Mean, median, mode#Coordinate geometry#Coordinate geometry#Functions#Inequalities#Algebraic equations#Percents#Ratio and probability#Tables and charts#Ratio and probability#Circles#Functions#Percents#Tables and charts#Inequalities#Polynomials#Functions#Inequalities#Algebraic equations#Tables and charts#Operations#Volume#Functions#Functions#Algebraic equations"
      //var DiagnosticsDetailsArr = DiagnosticsDetails.split('#')
      var DiagnosticsTest = "ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#ACT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT#SAT"
      var DiagnosticsTestArr = DiagnosticsTest.split('#')
      var DiagnosticsSubject = "English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Writing#Math (NC)#Math (NC)#Math (NC)#Math (NC)#Math (NC)#Math (NC)#Math (NC)#Math (NC)#Math (NC)#Math (NC)#Math (NC)#Math (NC)#Math (NC)#Math (NC)#Math (NC)#Math (NC)#Math (NC)#Math (NC)#Math (NC)#Math (NC)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)#Math (C)"
      var DiagnosticsSubjectArr = DiagnosticsSubject.split('#')
      var DiagnosticsQuestion = "1#2#3#4#5#6#7#8#9#10#11#12#13#14#15#16#17#18#19#20#21#22#23#24#25#26#27#28#29#30#31#32#33#34#35#36#37#38#39#40#41#42#43#44#45#46#47#48#49#50#51#52#53#54#55#56#57#58#59#60#61#62#63#64#65#66#67#68#69#70#71#72#73#74#75#1#2#3#4#5#6#7#8#9#10#11#12#13#14#15#16#17#18#19#20#21#22#23#24#25#26#27#28#29#30#31#32#33#34#35#36#37#38#39#40#41#42#43#44#45#46#47#48#49#50#51#52#53#54#55#56#57#58#59#60#1#2#3#4#5#6#7#8#9#10#11#12#13#14#15#16#17#18#19#20#21#22#23#24#25#26#27#28#29#30#31#32#33#34#35#36#37#38#39#40#1#2#3#4#5#6#7#8#9#10#11#12#13#14#15#16#17#18#19#20#21#22#23#24#25#26#27#28#29#30#31#32#33#34#35#36#37#38#39#40#1#2#3#4#5#6#7#8#9#10#11#12#13#14#15#16#17#18#19#20#21#22#23#24#25#26#27#28#29#30#31#32#33#34#35#36#37#38#39#40#41#42#43#44#45#46#47#48#49#50#51#52#1#2#3#4#5#6#7#8#9#10#11#12#13#14#15#16#17#18#19#20#21#22#23#24#25#26#27#28#29#30#31#32#33#34#35#36#37#38#39#40#41#42#43#44#1#2#3#4#5#6#7#8#9#10#11#12#13#14#15#16#17#18#19#20#1#2#3#4#5#6#7#8#9#10#11#12#13#14#15#16#17#18#19#20#21#22#23#24#25#26#27#28#29#30#31#32#33#34#35#36#37#38"
      var DiagnosticsQuestionArr = DiagnosticsQuestion.split('#')
      var DiagnosticsCorrectAnswers = "##################C#J#B#J#D#J#B#H#B#H#A#H#A#G#A#J#A#H#D#G#C#F#C#J#B#G#C#J#A#G#A#H#C#H#D#J#####################################K#D#J#A#F#E#G#E#H#D#G#E#H#C#H#B#K#D#F#E#J#C#F#D#K#A#J#D#G#E##########################D#F#B#G#D#G#C#H#B#J#B#F#C#J#A#J#B#G#C#F#########################B#G#A#H#D#J#A#G#C#J#B#J#A#F#B#G#C#J#B###################C#D#B#B#C#A#C#D#A#D#C#D#A#D#C#B#B#A#D#B#B################################B#D#C#A#D#A#D#B#B#A#B#D#A#C#C#D#C#A#D#A#C#B#################C#C#B#A#D#D#D#A#C#B#2#56#3####################D#A#A#D#C#A#B#C#C#B#D#A#C#80#10#0.8#863####"
      var DiagnosticsCorrectAnswersArr = DiagnosticsCorrectAnswers.split('#')




    }
    else{
      var SATDetailsTotal = "Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Diction, idioms, and register (5)#Add, revise, or delete (1)#Apostrophes (13)#Punctuation (10,11,12)#Sentence and paragraph order (2)#Add, revise, or delete (1)#Diction, idioms, and register (5)#Verb agreement and tense (15)#Transitions (8)#Diction, idioms, and register (5)#Transitions (8)#Infographics (3)#Combining and separating sentences (7)#Transitions (8)#Non-essential and essential clauses (9)#Punctuation (10,11,12)#Sentences and fragments (6)#Verb agreement and tense (15)#Pronoun and noun agreement (14)#Add, revise, or delete (1)#Shorter is better (4)#Sentence and paragraph order (2)#Shorter is better (4)#Modification (18)#Diction, idioms, and register (5)#Punctuation (10,11,12)#Transitions (8)#Add, revise, or delete (1)#Infographics (3)#Pronoun and noun agreement (14)#Sentence and paragraph order (2)#Punctuation (10,11,12)#Diction, idioms, and register (5)#Transitions (8)#Shorter is better (4)#Verb agreement and tense (15)#Add, revise, or delete (1)#Transitions (8)#Shorter is better (4)#Verb agreement and tense (15)#Apostrophes (13)#Add, revise, or delete (1)#Pronoun and noun agreement (14)#Pronoun and noun agreement (14)#Solving algebraic equations (8)#Complex numbers (19)#Constructing models (7)#Lines (14)#Expressions (6)#Lines (14)#Expressions (6)#Expressions (6)#Systems of equations (10)#Quadratics (17)#Systems of equations (10)#Lines (14)#Expressions (6)#Exponents and radicals (1)#Matching coefficients (9)#Quadratics (17)#Triangles (22)#Systems of equations (10)#Trigonometry (24)#Systems of equations (10)#Reading data (25)#Ratio and proportion (5)#Angles (21)#Word problems (12)#Exponential and linear growth (3)#Ratio and proportion (5)#Reading data (25)#Absolute value (20)#Solving algebraic equations (8)#Solving algebraic equations (8)#Inequalities (11)#Mean, median, and mode (27)#Percents (2)#Mean, median, and mode (27)#Lines (14)#Lines (14)#Functions (16)#Inequalities (11)#Systems of equations (10)#Percents (2)#Probability (26)#Mean, median, and mode (27)#Ratio and proportion (5)#Circles (23)#Quadratics (17)#Percents (2)#Reading data (25)#Inequalities (11)#Synthetic division (18)#Quadratics (17)#Inequalities (11)#Inequalities (11)#Reading data (25)#Word problems (12)#Volume (29)#Functions (16)#Exponential and linear growth (3)#Exponential and linear growth (3)#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Diction, idioms, and register (5)#Transitions (8)#Verb agreement and tense (15)#Add, revise, or delete (1)#Shorter is better (4)#Parallel structure (17)#Shorter is better (4)#Sentences and fragments (6)#Add, revise, or delete (1)#Diction, idioms, and register (5)#Add, revise, or delete (1)#Transitions (8)#Non-essential and essential clauses (9)#Punctuation (10,11,12)#Add, revise, or delete (1)#Sentences and fragments (6)#Add, revise, or delete (1)#Combining and separating sentences (7)#Parallel structure (17)#Verb agreement and tense (15)#Add, revise, or delete (1)#Sentence and paragraph order (2)#Sentences and fragments (6)#Infographics (3)#Transitions (8)#Add, revise, or delete (1)#Punctuation (10,11,12)#Diction, idioms, and register (5)#Pronoun and noun agreement (14)#Pronoun and noun agreement (14)#Sentence and paragraph order (2)#Diction, idioms, and register (5)#Non-essential and essential clauses (9)#Pronoun and noun agreement (14)#Non-essential and essential clauses (9)#Diction, idioms, and register (5)#Add, revise, or delete (1)#Pronoun and noun agreement (14)#Pronoun and noun agreement (14)#Punctuation (10,11,12)#Modification (18)#Sentence and paragraph order (2)#Add, revise, or delete (1)#Shorter is better (4)#Solving algebraic equations (8)#Systems of equations (10)#Constructing models (7)#Expressions (6)#Solving algebraic equations (8)#Lines (14)#Exponents and radicals (1)#Angles (21)#Lines (14)#Quadratics (17)#Complex numbers (19)#Solving algebraic equations (8)#Quadratics (17)#Exponential and linear growth (3)#Expressions (6)#Systems of equations (10)#Matching coefficients (9)#Triangles (22)#Trigonometry (24)#Systems of equations (10)#Lines (14)#Ratio and proportion (5)#Solving algebraic equations (8)#Ratio and proportion (5)#Percents (2)#Word problems (12)#Quadratics (17)#Word problems (12)#Inequalities (11)#Functions (16)#Word problems (12)#Inequalities (11)#Experiment design (28)#Scatter plots (28)#Mean, median, and mode (27)#Probability (26)#Percents (2)#Mean, median, and mode (27)#Mean, median, and mode (27)#Ratio and proportion (5)#Inequalities (11)#Ratio and proportion (5)#Ratio and proportion (5)#Circles (23)#Lines (14)#Functions (16)#Constructing models (7)#Lines (14)#Quadratics (17)#Triangles (22)#Ratio and proportion (5)#Solving algebraic equations (8)#Quadratics (17)#Word problems (12)#Lines (14)#Circles (23)#Solving algebraic equations (8)#Solving algebraic equations (8)#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Parallel structure (17)#Add, revise, or delete (1)#Add, revise, or delete (1)#Apostrophes (13)#Verb agreement and tense (15)#Add, revise, or delete (1)#Shorter is better (4)#Shorter is better (4)#Transitions (8)#Combining and separating sentences (7)#Diction, idioms, and register (5)#Pronoun and noun agreement (14)#Add, revise, or delete (1)#Punctuation (10,11,12)#Verb agreement and tense (15)#Diction, idioms, and register (5)#Add, revise, or delete (1)#Shorter is better (4)#Word pairs and comparisons (16)#Add, revise, or delete (1)#Modification (18)#Add, revise, or delete (1)#Combining and separating sentences (7)#Combining and separating sentences (7)#Diction, idioms, and register (5)#Pronoun and noun agreement (14)#Pronoun and noun agreement (14)#Verb agreement and tense (15)#Punctuation (10,11,12)#Sentence and paragraph order (2)#Infographics (3)#Infographics (3)#Add, revise, or delete (1)#Sentences and fragments (6)#Non-essential and essential clauses (9)#Verb agreement and tense (15)#Add, revise, or delete (1)#Verb agreement and tense (15)#Sentence and paragraph order (2)#Diction, idioms, and register (5)#Non-essential and essential clauses (9)#Add, revise, or delete (1)#Add, revise, or delete (1)#Diction, idioms, and register (5)#Constructing models (7)#Solving algebraic equations (8)#Exponents and radicals (1)#Solving algebraic equations (8)#Solving algebraic equations (8)#Systems of equations (10)#Synthetic division (18)#Lines (14)#Systems of equations (10)#Quadratics (17)#Angles (21)#Quadratics (17)#Matching coefficients (9)#Quadratics (17)#Lines (14)#Solving algebraic equations (8)#Solving algebraic equations (8)#Angles (21)#Systems of equations (10)#Trigonometry (24)#Constructing models (7)#Probability (26)#Constructing models (7)#Functions (16)#Percents (2)#Expressions (6)#Solving algebraic equations (8)#Lines (14)#Ratio and proportion (5)#Solving algebraic equations (8)#Solving algebraic equations (8)#Functions (16)#Solving algebraic equations (8)#Lines (14)#Experiment design (28)#Quadratics (17)#Lines (14)#Lines (14)#Ratio and proportion (5)#Scatter plots (28)#Exponential and linear growth (3)#Percents (2)#Trigonometry (24)#Systems of equations (10)#Volume (29)#Lines (14)#Percents (2)#Exponential and linear growth (3)#Probability (26)#Systems of equations (10)#Systems of equations (10)#Mean, median, and mode (27)#Matching coefficients (9)#Circles (23)#Mean, median, and mode (27)#Inequalities (11)#Word problems (12)#Word problems (12)#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Sentences and fragments (6)#Transitions (8)#Non-essential and essential clauses (9)#Add, revise, or delete (1)#Diction, idioms, and register (5)#Verb agreement and tense (15)#Pronoun and noun agreement (14)#Shorter is better (4)#Parallel structure (17)#Add, revise, or delete (1)#Add, revise, or delete (1)#Word pairs and comparisons (16)#Pronoun and noun agreement (14)#Shorter is better (4)#Transitions (8)#Diction, idioms, and register (5)#Transitions (8)#Add, revise, or delete (1)#Verb agreement and tense (15)#Add, revise, or delete (1)#Pronoun and noun agreement (14)#Punctuation (10,11,12)#Diction, idioms, and register (5)#Word pairs and comparisons (16)#Add, revise, or delete (1)#Combining and separating sentences (7)#Sentence and paragraph order (2)#Verb agreement and tense (15)#Punctuation (10,11,12)#Diction, idioms, and register (5)#Infographics (3)#Pronoun and noun agreement (14)#Add, revise, or delete (1)#Verb agreement and tense (15)#Non-essential and essential clauses (9)#Combining and separating sentences (7)#Add, revise, or delete (1)#Add, revise, or delete (1)#Transitions (8)#Pronoun and noun agreement (14)#Shorter is better (4)#Diction, idioms, and register (5)#Modification (18)#Sentence and paragraph order (2)#Absolute value (20)#Functions (16)#Systems of equations (10)#Functions (16)#Expressions (6)#Solving algebraic equations (8)#Lines (14)#Lines (14)#Solving algebraic equations (8)#Solving algebraic equations (8)#Systems of equations (10)#Percents (2)#Functions (16)#Complex numbers (19)#Quadratics (17)#Triangles (22)#Trigonometry (24)#Solving algebraic equations (8)#Systems of equations (10)#Lines (14)#Solving algebraic equations (8)#Lines (14)#Circles (23)#Percents (2)#Solving algebraic equations (8)#Word problems (12)#Probability (26)#Lines (14)#Probability (26)#Reading data (25)#Reading data (25)#Functions (16)#Exponential and linear growth (3)#Exponential and linear growth (3)#Exponential and linear growth (3)#Inequalities (11)#Lines (14)#Volume (29)#Inequalities (11)#Exponential and linear growth (3)#Scatter plots (28)#Percents (2)#Mean, median, and mode (27)#Circles (23)#Synthetic division (18)#Inequalities (11)#Scatter plots (28)#Quadratics (17)#Mean, median, and mode (27)#Systems of equations (10)#Word problems (12)#Lines (14)#Ratio and proportion (5)#Ratio and proportion (5)#Ratio and proportion (5)#Circles (23)#Exponential and linear growth (3)#Exponential and linear growth (3)#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Add, revise, or delete (1)#Diction, idioms, and register (5)#Add, revise, or delete (1)#Pronoun and noun agreement (14)#Diction, idioms, and register (5)#Pronoun and noun agreement (14)#Sentence and paragraph order (2)#Transitions (8)#Verb agreement and tense (15)#Combining and separating sentences (7)#Pronoun and noun agreement (14)#Transitions (8)#Combining and separating sentences (7)#Punctuation (10,11,12)#Non-essential and essential clauses (9)#Add, revise, or delete (1)#Punctuation (10,11,12)#Shorter is better (4)#Diction, idioms, and register (5)#Diction, idioms, and register (5)#Verb agreement and tense (15)#Diction, idioms, and register (5)#Pronoun and noun agreement (14)#Combining and separating sentences (7)#Transitions (8)#Verb agreement and tense (15)#Add, revise, or delete (1)#Transitions (8)#Sentences and fragments (6)#Verb agreement and tense (15)#Pronoun and noun agreement (14)#Sentence and paragraph order (2)#Infographics (3)#Sentence and paragraph order (2)#Punctuation (10,11,12)#Diction, idioms, and register (5)#Shorter is better (4)#Add, revise, or delete (1)#Diction, idioms, and register (5)#Diction, idioms, and register (5)#Add, revise, or delete (1)#Punctuation (10,11,12)#Transitions (8)#Modification (18)#Lines (14)#Circles (23)#Quadratics (17)#Functions (16)#Solving algebraic equations (8)#Expressions (6)#Inequalities (11)#Lines (14)#Systems of equations (10)#Expressions (6)#Volume (29)#Exponents and radicals (1)#Lines (14)#Functions (16)#Word problems (12)#Inequalities (11)#Solving algebraic equations (8)#Systems of equations (10)#Matching coefficients (9)#Angles (21)#Reading data (25)#Functions (16)#Ratio and proportion (5)#Solving algebraic equations (8)#Ratio and proportion (5)#Word problems (12)#Lines (14)#Expressions (6)#Ratio and proportion (5)#Solving algebraic equations (8)#Lines (14)#Systems of equations (10)#Inequalities (11)#Probability (26)#Experiment design (28)#Solving algebraic equations (8)#Reading data (25)#Solving algebraic equations (8)#Triangles (22)#Reading data (25)#Expressions (6)#Percents (2)#Lines (14)#Percents (2)#Inequalities (11)#Expressions (6)#Mean, median, and mode (27)#Lines (14)#Circles (23)#Quadratics (17)#Ratio and proportion (5)#Ratio and proportion (5)#Solving algebraic equations (8)#Functions (16)#Word problems (12)#Angles (21)#Reading data (25)#Word problems (12)#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Combining and separating sentences (7)#Combining and separating sentences (7)#Shorter is better (4)#Punctuation (10,11,12)#Add, revise, or delete (1)#Shorter is better (4)#Verb agreement and tense (15)#Diction, idioms, and register (5)#Transitions (8)#Add, revise, or delete (1)#Add, revise, or delete (1)#Apostrophes (13)#Transitions (8)#Combining and separating sentences (7)#Diction, idioms, and register (5)#Add, revise, or delete (1)#Punctuation (10,11,12)#Add, revise, or delete (1)#Combining and separating sentences (7)#Non-essential and essential clauses (9)#Diction, idioms, and register (5)#Sentence and paragraph order (2)#Add, revise, or delete (1)#Diction, idioms, and register (5)#Diction, idioms, and register (5)#Add, revise, or delete (1)#Pronoun and noun agreement (14)#Punctuation (10,11,12)#Non-essential and essential clauses (9)#Word pairs and comparisons (16)#Transitions (8)#Add, revise, or delete (1)#Word pairs and comparisons (16)#Shorter is better (4)#Diction, idioms, and register (5)#Punctuation (10,11,12)#Add, revise, or delete (1)#Add, revise, or delete (1)#Non-essential and essential clauses (9)#Add, revise, or delete (1)#Verb agreement and tense (15)#Apostrophes (13)#Transitions (8)#Word pairs and comparisons (16)#Lines (14)#Lines (14)#Complex numbers (19)#Matching coefficients (9)#Lines (14)#Expressions (6)#Solving algebraic equations (8)#Functions (16)#Exponents and radicals (1)#Mean, median, and mode (27)#Quadratics (17)#Expressions (6)#Quadratics (17)#Inequalities (11)#Expressions (6)#Exponents and radicals (1)#Solving algebraic equations (8)#Triangles (22)#Word problems (12)#Circles (23)#Expressions (6)#Reading data (25)#Constructing models (7)#Lines (14)#Inequalities (11)#Percents (2)#Experiment design (28)#Probability (26)#Word problems (12)#Systems of equations (10)#Systems of equations (10)#Reading data (25)#Functions (16)#Lines (14)#Functions (16)#Triangles (22)#Lines (14)#Inequalities (11)#Word problems (12)#Quadratics (17)#Experiment design (28)#Mean, median, and mode (27)#Reading data (25)#Percents (2)#Functions (16)#Ratio and proportion (5)#Circles (23)#Absolute value (20)#Solving algebraic equations (8)#Quadratics (17)#Word problems (12)#Solving algebraic equations (8)#Volume (29)#Systems of equations (10)#Lines (14)#Mean, median, and mode (27)#Exponential and linear growth (3)#Percents (2)#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Shorter is better (4)#Diction, idioms, and register (5)#Verb agreement and tense (15)#Punctuation (10,11,12)#Add, revise, or delete (1)#Diction, idioms, and register (5)#Verb agreement and tense (15)#Verb agreement and tense (15)#Sentence and paragraph order (2)#Add, revise, or delete (1)#Transitions (8)#Parallel structure (17)#Non-essential and essential clauses (9)#Transitions (8)#Add, revise, or delete (1)#Non-essential and essential clauses (9)#Shorter is better (4)#Diction, idioms, and register (5)#Verb agreement and tense (15)#Transitions (8)#Infographics (3)#Punctuation (10,11,12)#Transitions (8)#Sentences and fragments (6)#Add, revise, or delete (1)#Verb agreement and tense (15)#Punctuation (10,11,12)#Add, revise, or delete (1)#Pronoun and noun agreement (14)#Shorter is better (4)#Diction, idioms, and register (5)#Punctuation (10,11,12)#Transitions (8)#Punctuation (10,11,12)#Add, revise, or delete (1)#Verb agreement and tense (15)#Diction, idioms, and register (5)#Transitions (8)#Shorter is better (4)#Add, revise, or delete (1)#Word pairs and comparisons (16)#Sentence and paragraph order (2)#Non-essential and essential clauses (9)#Add, revise, or delete (1)#Lines (14)#Expressions (6)#Systems of equations (10)#Complex numbers (19)#Functions (16)#Lines (14)#Expressions (6)#Inequalities (11)#Inequalities (11)#Synthetic division (18)#Exponents and radicals (1)#Quadratics (17)#Expressions (6)#Inequalities (11)#Expressions (6)#Solving algebraic equations (8)#Angles (21)#Angles (21)#Lines (14)#Matching coefficients (9)#Probability (26)#Expressions (6)#Word problems (12)#Experiment design (28)#Inequalities (11)#Quadratics (17)#Scatter plots (28)#Scatter plots (28)#Solving algebraic equations (8)#Percents (2)#Systems of equations (10)#Percents (2)#Reading data (25)#Angles (21)#Word problems (12)#Expressions (6)#Lines (14)#Solving algebraic equations (8)#Solving algebraic equations (8)#Solving algebraic equations (8)#Scatter plots (28)#Mean, median, and mode (27)#Volume (29)#Quadratics (17)#Functions (16)#Functions (16)#Exponential and linear growth (3)#Lines (14)#Circles (23)#Percents (2)#Ratio and proportion (5)#Lines (14)#Word problems (12)#Circles (23)#Systems of equations (10)#Triangles (22)#Mean, median, and mode (27)#Probability (26)#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Transitions (8)#Diction, idioms, and register (5)#Sentences and fragments (6)#Non-essential and essential clauses (9)#Add, revise, or delete (1)#Add, revise, or delete (1)#Word pairs and comparisons (16)#Verb agreement and tense (15)#Diction, idioms, and register (5)#Add, revise, or delete (1)#Word pairs and comparisons (16)#Shorter is better (4)#Punctuation (10,11,12)#Add, revise, or delete (1)#Add, revise, or delete (1)#Pronoun and noun agreement (14)#Word pairs and comparisons (16)#Add, revise, or delete (1)#Sentence and paragraph order (2)#Pronoun and noun agreement (14)#Modification (18)#Shorter is better (4)#Diction, idioms, and register (5)#Punctuation (10,11,12)#Add, revise, or delete (1)#Diction, idioms, and register (5)#Pronoun and noun agreement (14)#Sentence and paragraph order (2)#Shorter is better (4)#Sentences and fragments (6)#Transitions (8)#Shorter is better (4)#Add, revise, or delete (1)#Transitions (8)#Shorter is better (4)#Add, revise, or delete (1)#Verb agreement and tense (15)#Shorter is better (4)#Add, revise, or delete (1)#Non-essential and essential clauses (9)#Add, revise, or delete (1)#Verb agreement and tense (15)#Add, revise, or delete (1)#Punctuation (10,11,12)#Solving algebraic equations (8)#Lines (14)#Solving algebraic equations (8)#Angles (21)#Word problems (12)#Inequalities (11)#Solving algebraic equations (8)#Functions (16)#Circles (23)#Systems of equations (10)#Synthetic division (18)#Expressions (6)#Lines (14)#Quadratics (17)#Functions (16)#Quadratics (17)#Matching coefficients (9)#Systems of equations (10)#Lines (14)#Circles (23)#Word problems (12)#Reading data (25)#Ratio and proportion (5)#Scatter plots (28)#Angles (21)#Systems of equations (10)#Lines (14)#Solving algebraic equations (8)#Volume (29)#Constructing models (7)#Ratio and proportion (5)#Inequalities (11)#Exponents and radicals (1)#Functions (16)#Volume (29)#Probability (26)#Mean, median, and mode (27)#Scatter plots (28)#Quadratics (17)#Inequalities (11)#Scatter plots (28)#Percents (2)#Exponential and linear growth (3)#Experiment design (28)#Functions (16)#Experiment design (28)#Lines (14)#Mean, median, and mode (27)#Exponential and linear growth (3)#Functions (16)#Ratio and proportion (5)#Solving algebraic equations (8)#Lines (14)#Word problems (12)#Functions (16)#Trigonometry (24)#Reading data (25)#Exponential and linear growth (3)#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Social Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Natural Science#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Historical Documents#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Diction, idioms, and register (5)#Sentence and paragraph order (2)#Transitions (8)#Pronoun and noun agreement (14)#Pronoun and noun agreement (14)#Non-essential and essential clauses (9)#Add, revise, or delete (1)#Shorter is better (4)#Word pairs and comparisons (16)#Apostrophes (13)#Add, revise, or delete (1)#Sentences and fragments (6)#Shorter is better (4)#Punctuation (10,11,12)#Pronoun and noun agreement (14)#Add, revise, or delete (1)#Combining and separating sentences (7)#Diction, idioms, and register (5)#Infographics (3)#Add, revise, or delete (1)#Verb agreement and tense (15)#Add, revise, or delete (1)#Pronoun and noun agreement (14)#Sentence and paragraph order (2)#Add, revise, or delete (1)#Pronoun and noun agreement (14)#Diction, idioms, and register (5)#Add, revise, or delete (1)#Transitions (8)#Punctuation (10,11,12)#Verb agreement and tense (15)#Shorter is better (4)#Add, revise, or delete (1)#Add, revise, or delete (1)#Verb agreement and tense (15)#Shorter is better (4)#Transitions (8)#Punctuation (10,11,12)#Parallel structure (17)#Sentences and fragments (6)#Add, revise, or delete (1)#Add, revise, or delete (1)#Pronoun and noun agreement (14)#Add, revise, or delete (1)#Systems of equations (10)#Expressions (6)#Lines (14)#Lines (14)#Solving algebraic equations (8)#Circles (23)#Solving algebraic equations (8)#Matching coefficients (9)#Systems of equations (10)#Matching coefficients (9)#Quadratics (17)#Expressions (6)#Quadratics (17)#Inequalities (11)#Solving algebraic equations (8)#Volume (29)#Solving algebraic equations (8)#Functions (16)#Triangles (22)#Lines (14)#Solving algebraic equations (8)#Ratio and proportion (5)#Solving algebraic equations (8)#Solving algebraic equations (8)#Reading data (25)#Reading data (25)#Angles (21)#Lines (14)#Probability (26)#Ratio and proportion (5)#Ratio and proportion (5)#Ratio and proportion (5)#Inequalities (11)#Lines (14)#Lines (14)#Matching coefficients (9)#Systems of equations (10)#Exponential and linear growth (3)#Solving algebraic equations (8)#Lines (14)#Functions (16)#Mean, median, and mode (27)#Experiment design (28)#Functions (16)#Trigonometry (24)#Quadratics (17)#Synthetic division (18)#Quadratics (17)#Scatter plots (28)#Scatter plots (28)#Circles (23)#Lines (14)#Probability (26)#Reading data (25)#Percents (2)#Systems of equations (10)#Mean, median, and mode (27)#Percents (2)#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Fiction#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Paired passages#Paired passages#Paired passages#Paired passages#Paired passages#Paired passages#Paired passages#Paired passages#Paired passages#Paired passages#Paired passages#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Shorter is better (4)#Add, revise, or delete (1)#Non-essential and essential clauses (9)#Add, revise, or delete (1)#Add, revise, or delete (1)#Transitions (8)#Modification (18)#Shorter is better (4)#Parallel structure (17)#Punctuation (10,11,12)#Add, revise, or delete (1)#Parallel structure (17)#Add, revise, or delete (1)#Apostrophes (13)#Shorter is better (4)#Parallel structure (17)#Diction, idioms, and register (5)#Diction, idioms, and register (5)#Combining and separating sentences (7)#Word pairs and comparisons (16)#Add, revise, or delete (1)#Add, revise, or delete (1)#Verb agreement and tense (15)#Shorter is better (4)#Punctuation (10,11,12)#Diction, idioms, and register (5)#Infographics (3)#Parallel structure (17)#Infographics (3)#Add, revise, or delete (1)#Add, revise, or delete (1)#Pronoun and noun agreement (14)#Add, revise, or delete (1)#Add, revise, or delete (1)#Add, revise, or delete (1)#Apostrophes (13)#Verb agreement and tense (15)#Shorter is better (4)#Punctuation (10,11,12)#Non-essential and essential clauses (9)#Diction, idioms, and register (5)#Shorter is better (4)#Diction, idioms, and register (5)#Sentence and paragraph order (2)#Solving algebraic equations (8)#Constructing models (7)#Functions (16)#Reading data (25)#Expressions (6)#Quadratics (17)#Functions (16)#Angles (21)#Lines (14)#Quadratics (17)#Circles (23)#Triangles (22)#Quadratics (17)#Solving algebraic equations (8)#Systems of equations (10)#Solving algebraic equations (8)#Absolute value (20)#Exponential and linear growth (3)#Systems of equations (10)#Systems of equations (10)#Constructing models (7)#Constructing models (7)#Constructing models (7)#Solving algebraic equations (8)#Functions (16)#Expressions (6)#Experiment design (28)#Reading data (25)#Functions (16)#Experiment design (28)#Mean, median, and mode (27)#Percents (2)#Reading data (25)#Reading data (25)#Volume (29)#Exponential and linear growth (3)#Volume (29)#Probability (26)#Quadratics (17)#Mean, median, and mode (27)#Solving algebraic equations (8)#Functions (16)#Functions (16)#Scatter plots (28)#Systems of equations (10)#Exponential and linear growth (3)#Solving algebraic equations (8)#Quadratics (17)#Lines (14)#Angles (21)#Word problems (12)#Triangles (22)#Mean, median, and mode (27)#Lines (14)#Matching coefficients (9)#Quadratics (17)#Ratio and proportion (5)#Word problems (12)"
      var SATDetailsArr = SATDetailsTotal.split('#').splice(((num-1)*154), ((num)*154))
      var SATCorrectAnswerTotal = "B-B-C-A-C-D-D-B-C-B-A-B-D-A-A-C-C-D-A-B-A-B-D-D-C-B-D-C-A-A-D-B-A-C-B-D-C-C-B-C-B-B-A-A-D-C-B-A-D-B-D-A-D-B-A-C-C-D-B-C-A-A-B-B-A-B-C-C-C-A-D-D-B-D-D-D-B-A-B-C-B-D-C-A-A-A-A-B-D-C-A-B-B-C-D-D-D-A-C-B-C-A-B-C-B-A-D-D-B-A-D-2-1600-7-0.8-100-B-C-D-C-D-D-C-D-A-B-A-C-C-C-A-C-B-A-B-D-C-B-B-A-D-B-C-C-D-D-4-107-0.625-96-6-3-1.02-6.11-A-B-C-A-D-B-D-D-B-D-D-D-A-B-C-A-C-C-A-B-C-C-A-B-C-B-D-D-D-B-C-B-B-A-D-B-B-D-C-A-B-D-C-B-D-C-A-B-D-D-D-A-B-B-A-A-D-D-B-D-B-B-C-B-D-C-C-C-B-B-A-D-D-B-A-B-B-A-D-A-C-C-D-B-D-D-A-D-A-B-C-D-D-C-C-D-C-B-A-A-C-D-A-C-B-C-C-B-D-A-D-3-19-12-6-0.25-C-B-A-C-C-B-D-D-A-B-B-D-D-C-A-B-C-C-B-C-D-B-A-A-A-D-D-B-B-A-14-7-11-105-15-32-3284-7500-B-C-A-A-C-A-A-B-B-D-A-C-D-B-B-C-B-B-A-A-D-A-A-B-C-C-B-B-D-D-B-C-C-D-C-A-D-C-A-D-A-C-C-D-D-C-B-B-A-B-D-D-A-B-C-C-A-B-A-D-C-C-B-A-C-D-B-C-C-B-D-C-D-A-A-D-B-A-D-B-B-B-D-B-C-D-B-C-D-C-C-B-D-A-D-D-C-D-D-B-C-C-C-A-A-A-B-A-B-A-D-1-2-105-370-0.6-C-B-C-C-B-A-D-C-B-D-B-D-D-A-A-B-B-B-C-B-C-B-C-D-D-C-C-D-A-A-4-58.6-9-0.625-50-750-7-60-C-D-D-C-A-A-B-D-D-A-C-D-A-B-A-C-C-A-B-A-D-A-C-C-B-C-A-B-B-D-D-D-D-A-D-B-D-D-D-A-B-C-B-A-D-A-D-C-D-C-B-A-B-B-B-A-D-B-D-B-C-A-C-D-B-D-C-C-A-C-A-C-B-D-C-C-B-D-C-A-D-B-C-B-A-C-C-B-D-A-C-B-D-D-A-B-A-A-A-B-C-B-D-A-D-D-C-C-B-A-B-9-0.6-5-0-25-B-C-C-B-B-A-A-D-B-A-A-C-C-D-B-A-D-C-A-C-C-B-B-C-B-C-D-D-B-D-1160-0.5-4.55-150-2.25-29-0.72-134-D-C-C-A-C-A-D-B-B-B-B-A-B-D-C-A-B-B-B-A-D-A-B-A-B-C-D-B-D-B-D-B-C-B-A-B-C-A-B-D-D-C-D-D-C-B-A-C-C-A-A-B-C-D-B-C-A-C-D-D-B-C-C-D-D-A-B-C-C-A-D-D-A-B-B-B-A-B-D-A-C-B-C-D-A-C-B-B-D-C-D-B-D-A-A-C-D-A-B-C-D-A-C-A-A-B-C-D-B-C-D-4-1.2-5.25-2-97-D-C-A-B-C-B-A-C-B-A-A-D-D-A-A-D-D-C-B-D-A-C-D-B-D-B-C-C-B-B-1492-9.66666666666667-7-9-13-80-43-6-C-B-D-A-C-D-B-B-A-D-B-D-C-C-B-A-D-A-A-C-C-B-A-D-C-A-D-A-A-B-B-D-B-A-D-D-A-D-C-C-B-D-C-A-C-D-B-B-D-B-D-B-D-A-D-B-C-B-A-C-D-B-C-D-A-B-C-B-A-C-D-D-A-A-B-A-B-B-C-D-B-C-A-C-D-B-B-D-A-D-D-C-A-D-A-C-B-B-C-A-D-A-C-B-C-D-B-D-A-A-D-1-3.75-30-1.5-0.166666666666667-A-C-A-D-B-C-D-D-B-B-B-D-A-B-D-B-B-C-C-C-D-B-C-D-B-C-A-A-B-D-10-31-97-5-1.25-2.6-30-8-D-A-A-B-D-B-C-B-D-D-D-A-A-D-D-C-D-B-D-C-B-C-A-D-C-A-C-B-C-D-B-D-B-C-B-B-C-A-C-A-A-C-D-D-C-A-C-A-A-B-A-D-D-A-B-A-C-C-B-D-A-D-A-D-C-A-C-D-B-C-B-D-C-C-C-A-C-D-B-D-C-B-C-C-C-A-B-C-D-C-D-B-A-D-C-A-C-C-B-D-A-C-B-C-B-B-D-B-D-A-D-8-30-4-8-6632-B-A-C-D-C-C-A-C-A-D-A-B-B-D-B-D-A-B-A-C-C-B-C-A-B-B-A-C-D-B-195-0.4-30-0.277777777777778-0-6-2.4-0.714285714285714-A-C-C-D-A-D-D-B-C-B-B-D-D-A-D-B-C-B-C-A-C-A-D-A-B-D-B-A-D-C-D-B-C-B-C-B-C-D-C-A-D-A-C-A-C-A-D-B-B-B-C-C-D-B-C-B-D-C-B-C-A-C-A-A-D-C-C-A-D-B-D-B-B-D-A-C-C-A-C-C-B-B-B-D-D-B-D-A-B-D-B-D-A-D-A-C-D-A-A-C-B-B-B-D-A-C-B-D-C-C-D-3-32-1.5-8-144-A-C-A-C-B-D-C-B-D-C-B-C-C-D-D-B-A-C-A-B-D-A-A-D-A-C-B-D-B-B-102-2-30-25.4-2-8-576-0.8-D-B-B-A-C-A-C-C-B-C-D-D-D-B-B-C-A-A-C-D-A-B-D-A-C-B-A-D-D-C-B-D-A-B-B-A-A-C-D-C-A-C-C-D-A-D-C-A-A-B-C-D-B-B-A-C-D-C-D-A-D-C-A-C-B-B-D-A-C-D-C-C-B-D-B-B-B-D-A-D-B-D-A-D-A-A-C-D-B-D-C-C-C-A-D-C-B-A-D-A-C-B-D-C-B-C-B-D-A-B-B-360-2-8-0.75-2.5-B-D-B-A-D-A-C-A-D-D-A-D-C-B-D-B-C-B-B-A-D-B-B-C-C-D-A-C-A-D-6-2-8-9-15-1.5-1.3-3-A-B-D-B-A-A-D-C-C-B-D-A-A-B-C-C-D-C-B-B-D-D-B-A-C-C-B-D-A-D-A-B-C-B-B-D-C-A-A-B-D-A-A-B-D-C-A-B-C-A-C-D-A-D-A-A-D-A-C-D-D-C-C-D-A-D-C-B-B-A-D-B-C-B-C-A-A-B-D-B-C-C-B-B-A-C-D-C-B-C-C-D-A-D-A-D-B-C-B-C-A-A-D-C-C-D-A-B-C-B-A-2200-5-1.21-2500-20-B-A-B-C-C-D-B-C-C-D-A-C-C-A-B-C-D-C-D-C-B-D-A-B-A-D-A-D-D-A-6-146-2500-34-2.5-6.25-293-9"
      var SATCorrectAnswerArr = SATCorrectAnswerTotal.split('-').splice(((num-1)*154), ((num)*154))


      var SATSections = "Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C"
      var SATSectionsArr = SATSections.split(',')
      var SATSectionNumber = "1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4"
      var SATSectionNumberArr = SATSectionNumber.split(',')
      var SATQuestion = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38"
      var SATQuestionArr = SATQuestion.split(',')



      var ACTDetailsTotalPart1 = "Joining and separating sentences (3)#Non-essential and essential clauses (4)#Non-essential and essential clauses (4)#Punctuation (5,6,7)#Add, revise, or delete (18)#Verbs (8)#Non-essential and essential clauses (4)#Sentence and paragraph order (19)#Add, revise, or delete (18)#Verbs (8)#Diction, idioms, and register (16)#Diction, idioms, and register (16)#Modification (12)#Add, revise, or delete (18)#Evaluation of purpose (20)#Sentences and fragments (2)#Non-essential and essential clauses (4)#Sentences and fragments (2)#Shorter is better (15)#Add, revise, or delete (18)#Verbs (8)#Shorter is better (15)#Non-essential and essential clauses (4)#Transitions (17)#Verbs (8)#Add, revise, or delete (18)#Verbs (8)#Add, revise, or delete (18)#Joining and separating sentences (3)#Evaluation of purpose (20)#Modification (12)#Punctuation (5,6,7)#Joining and separating sentences (3)#Diction, idioms, and register (16)#Add, revise, or delete (18)#Verbs (8)#Diction, idioms, and register (16)#Add, revise, or delete (18)#Verbs (8)#Punctuation (5,6,7)#Modification (12)#Sentence and paragraph order (19)#Joining and separating sentences (3)#Add, revise, or delete (18)#Evaluation of purpose (20)#Sentences and fragments (2)#Add, revise, or delete (18)#Punctuation (5,6,7)#Shorter is better (15)#Shorter is better (15)#Diction, idioms, and register (16)#Pronouns (9)#Add, revise, or delete (18)#Joining and separating sentences (3)#Transitions (17)#Shorter is better (15)#Add, revise, or delete (18)#Add, revise, or delete (18)#Add, revise, or delete (18)#Sentence and paragraph order (19)#Non-essential and essential clauses (4)#Verbs (8)#Shorter is better (15)#Non-essential and essential clauses (4)#Add, revise, or delete (18)#Modification (12)#Transitions (17)#Punctuation (5,6,7)#Verbs (8)#Add, revise, or delete (18)#Diction, idioms, and register (16)#Transitions (17)#Transitions (17)#Apostrophes (1)#Joining and separating sentences (3)#Functions (11)#Angles (15)#Expressions (4)#Ratio and proportion (9)#Expressions (4)#Solving equations (3)#Probability (23)#Numbers and Operations (5)#Solving equations (3)#Coordinate geometry (14)#Probability (23)#Inequalities (21)#Expressions (4)#Percents (10)#Properties of numbers (6)#Functions (11)#Coordinate geometry (14)#Quadratics (13)#Data and statistics (24)#Systems of equations (20)#Percents (10)#Area and perimeter (18)#Angles (15)#Trigonometry (22)#Trigonometry (22)#Numbers and Operations (5)#Area and perimeter (18)#Exponents and radicals (2)#Inequalities (21)#Volume (19)#Triangles (16)#Coordinate geometry (14)#Quadratics (13)#Area and perimeter (18)#Data and statistics (24)#Logarithms (25)#Expressions (4)#Numbers and Operations (5)#Properties of numbers (6)#Properties of numbers (6)#Percents (10)#Percents (10)#Matrices (28)#Functions (11)#Numbers and Operations (5)#Expressions (4)#Area and perimeter (18)#Coordinate geometry (14)#Sequences (27)#Probability (23)#Percents (10)#Trigonometry (22)#Ellipses (28)#Trigonometry (22)#Absolute value (1)#Probability (23)#Exponents and radicals (2)#Area and perimeter (18)#Complex numbers (7)#Volume (19)#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Data#Data#Data#Data#Data#Data#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Data#Data#Data#Data#Data#Data#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Non-essential and essential clauses (4)#Add, revise, or delete (18)#Verbs (8)#Add, revise, or delete (18)#Verbs (8)#Diction, idioms, and register (16)#Shorter is better (15)#Add, revise, or delete (18)#Add, revise, or delete (18)#Diction, idioms, and register (16)#Verbs (8)#Shorter is better (15)#Transitions (17)#Sentence and paragraph order (19)#Evaluation of purpose (20)#Punctuation (5,6,7)#Pronouns (9)#Transitions (17)#Punctuation (5,6,7)#Add, revise, or delete (18)#Modification (12)#Add, revise, or delete (18)#Sentences and fragments (2)#Verbs (8)#Pronouns (9)#Sentences and fragments (2)#Add, revise, or delete (18)#Diction, idioms, and register (16)#Transitions (17)#Shorter is better (15)#Non-essential and essential clauses (4)#Pronouns (9)#Apostrophes (1)#Transitions (17)#Verbs (8)#Sentences and fragments (2)#Shorter is better (15)#Punctuation (5,6,7)#Add, revise, or delete (18)#Sentences and fragments (2)#Pronouns (9)#Verbs (8)#Diction, idioms, and register (16)#Shorter is better (15)#Punctuation (5,6,7)#Verbs (8)#Non-essential and essential clauses (4)#Verbs (8)#Sentences and fragments (2)#Non-essential and essential clauses (4)#Sentence and paragraph order (19)#Transitions (17)#Verbs (8)#Pronouns (9)#Add, revise, or delete (18)#Adjectives and adverbs (10)#Diction, idioms, and register (16)#Apostrophes (1)#Add, revise, or delete (18)#Evaluation of purpose (20)#Sentences and fragments (2)#Non-essential and essential clauses (4)#Non-essential and essential clauses (4)#Add, revise, or delete (18)#Shorter is better (15)#Diction, idioms, and register (16)#Transitions (17)#Modification (12)#Non-essential and essential clauses (4)#Non-essential and essential clauses (4)#Shorter is better (15)#Diction, idioms, and register (16)#Diction, idioms, and register (16)#Add, revise, or delete (18)#Evaluation of purpose (20)#Absolute value (1)#Numbers and Operations (5)#Expressions (4)#Expressions (4)#Percents (10)#Triangles (16)#Triangles (16)#Systems of equations (20)#Triangles (16)#Numbers and Operations (5)#Systems of equations (20)#Functions (11)#Angles (15)#Probability (23)#Area and perimeter (18)#Area and perimeter (18)#Numbers and Operations (5)#Triangles (16)#Coordinate geometry (14)#Systems of equations (20)#Probability (23)#Data and statistics (24)#Quadratics (13)#Functions (11)#Probability (23)#Absolute value (1)#Matrices (28)#Area and perimeter (18)#Trigonometry (22)#Circles (17)#Circles (17)#Circles (17)#Angles (15)#Trigonometry (22)#Solving equations (3)#Exponents and radicals (2)#Properties of numbers (6)#Triangles (16)#Word problems (26)#Systems of equations (20)#Coordinate geometry (14)#Coordinate geometry (14)#Circles (17)#Circles (17)#Systems of equations (20)#Word problems (26)#Functions (11)#Area and perimeter (18)#Area and perimeter (18)#Sequences (27)#Trigonometry (22)#Volume (19)#Word problems (26)#Word problems (26)#Word problems (26)#Word problems (26)#Exponents and radicals (2)#Trigonometry (22)#Coordinate geometry (14)#Functions (11)#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Data#Data#Data#Data#Data#Data#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Data#Data#Data#Data#Data#Data#Shorter is better (15)#Add, revise, or delete (18)#Joining and separating sentences (3)#Add, revise, or delete (18)#Add, revise, or delete (18)#Parallel structure (13)#Pronouns (9)#Punctuation (5,6,7)#Diction, idioms, and register (16)#Verbs (8)#Punctuation (5,6,7)#Shorter is better (15)#Sentence and paragraph order (19)#Evaluation of purpose (20)#Transitions (17)#Punctuation (5,6,7)#Diction, idioms, and register (16)#Sentence and paragraph order (19)#Non-essential and essential clauses (4)#Add, revise, or delete (18)#Modification (12)#Add, revise, or delete (18)#Add, revise, or delete (18)#Add, revise, or delete (18)#Add, revise, or delete (18)#Diction, idioms, and register (16)#Non-essential and essential clauses (4)#Verbs (8)#Add, revise, or delete (18)#Joining and separating sentences (3)#Transitions (17)#Add, revise, or delete (18)#Pronouns (9)#Sentences and fragments (2)#Diction, idioms, and register (16)#Sentences and fragments (2)#Shorter is better (15)#Verbs (8)#Add, revise, or delete (18)#Parallel structure (13)#Punctuation (5,6,7)#Diction, idioms, and register (16)#Non-essential and essential clauses (4)#Add, revise, or delete (18)#Non-essential and essential clauses (4)#Joining and separating sentences (3)#Non-essential and essential clauses (4)#Apostrophes (1)#Joining and separating sentences (3)#Verbs (8)#Joining and separating sentences (3)#Transitions (17)#Punctuation (5,6,7)#Shorter is better (15)#Pronouns (9)#Verbs (8)#Shorter is better (15)#Pronouns (9)#Add, revise, or delete (18)#Diction, idioms, and register (16)#Transitions (17)#Add, revise, or delete (18)#Add, revise, or delete (18)#Diction, idioms, and register (16)#Joining and separating sentences (3)#Verbs (8)#Verbs (8)#Add, revise, or delete (18)#Diction, idioms, and register (16)#Modification (12)#Sentence and paragraph order (19)#Pronouns (9)#Punctuation (5,6,7)#Pronouns (9)#Sentence and paragraph order (19)#Area and perimeter (18)#Probability (23)#Probability (23)#Numbers and Operations (5)#Volume (19)#Triangles (16)#Expressions (4)#Functions (11)#Percents (10)#Absolute value (1)#Numbers and Operations (5)#Numbers and Operations (5)#Triangles (16)#Numbers and Operations (5)#Ratio and proportion (9)#Numbers and Operations (5)#Solving equations (3)#Area and perimeter (18)#Inequalities (21)#Trigonometry (22)#Functions (11)#Systems of equations (20)#Data and statistics (24)#Area and perimeter (18)#Area and perimeter (18)#Probability (23)#Expressions (4)#Triangles (16)#Area and perimeter (18)#Coordinate geometry (14)#Coordinate geometry (14)#Coordinate geometry (14)#Exponents and radicals (2)#Ratio and proportion (9)#Logarithms (25)#Circles (17)#Expressions (4)#Probability (23)#Probability (23)#Probability (23)#Data and statistics (24)#Trigonometry (22)#Volume (19)#Trigonometry (22)#Numbers and Operations (5)#Angles (15)#Properties of numbers (6)#Triangles (16)#Probability (23)#Functions (11)#Probability (23)#Coordinate geometry (14)#Systems of equations (20)#Data and statistics (24)#Word problems (26)#Inequalities (21)#Word problems (26)#Complex numbers (7)#Functions (11)#Matrices (28)#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Data#Data#Data#Data#Data#Data#Data#Data#Data#Data#Data#Data#Data#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Data#Data#Data#Data#Data#Data#Add, revise, or delete (18)#Punctuation (5,6,7)#Apostrophes (1)#Joining and separating sentences (3)#Add, revise, or delete (18)#Pronouns (9)#Shorter is better (15)#Transitions (17)#Diction, idioms, and register (16)#Diction, idioms, and register (16)#Sentences and fragments (2)#Word pairs and comparisons (11)#Add, revise, or delete (18)#Diction, idioms, and register (16)#Add, revise, or delete (18)#Shorter is better (15)#Add, revise, or delete (18)#Verbs (8)#Joining and separating sentences (3)#Shorter is better (15)#Diction, idioms, and register (16)#Joining and separating sentences (3)#Sentence and paragraph order (19)#Add, revise, or delete (18)#Non-essential and essential clauses (4)#Verbs (8)#Pronouns (9)#Verbs (8)#Transitions (17)#Evaluation of purpose (20)#Pronouns (9)#Verbs (8)#Transitions (17)#Non-essential and essential clauses (4)#Shorter is better (15)#Modification (12)#Diction, idioms, and register (16)#Add, revise, or delete (18)#Joining and separating sentences (3)#Transitions (17)#Non-essential and essential clauses (4)#Verbs (8)#Parallel structure (13)#Add, revise, or delete (18)#Sentence and paragraph order (19)#Verbs (8)#Add, revise, or delete (18)#Punctuation (5,6,7)#Shorter is better (15)#Shorter is better (15)#Diction, idioms, and register (16)#Verbs (8)#Verbs (8)#Sentence and paragraph order (19)#Sentences and fragments (2)#Punctuation (5,6,7)#Add, revise, or delete (18)#Non-essential and essential clauses (4)#Sentence and paragraph order (19)#Evaluation of purpose (20)#Parallel structure (13)#Apostrophes (1)#Add, revise, or delete (18)#Sentences and fragments (2)#Modification (12)#Verbs (8)#Add, revise, or delete (18)#Punctuation (5,6,7)#Sentences and fragments (2)#Parallel structure (13)#Pronouns (9)#Add, revise, or delete (18)#Transitions (17)#Add, revise, or delete (18)#Add, revise, or delete (18)#Probability (23)#Probability (23)#Solving equations (3)#Absolute value (1)#Numbers and Operations (5)#Numbers and Operations (5)#Area and perimeter (18)#Area and perimeter (18)#Coordinate geometry (14)#Functions (11)#Inequalities (21)#Coordinate geometry (14)#Systems of equations (20)#Ratio and proportion (9)#Matrices (28)#Trigonometry (22)#Ratio and proportion (9)#Functions (11)#Angles (15)#Expressions (4)#Numbers and Operations (5)#Data and statistics (24)#Area and perimeter (18)#Area and perimeter (18)#Data and statistics (24)#Area and perimeter (18)#Area and perimeter (18)#Numbers and Operations (5)#Ratio and proportion (9)#Trigonometry (22)#Functions (11)#Triangles (16)#Coordinate geometry (14)#Numbers and Operations (5)#Angles (15)#Area and perimeter (18)#Solving equations (3)#Area and perimeter (18)#Data and statistics (24)#Word problems (26)#Expressions (4)#Probability (23)#Expressions (4)#Probability (23)#Trigonometry (22)#Logarithms (25)#Numbers and Operations (5)#Inequalities (21)#Trigonometry (22)#Data and statistics (24)#Angles (15)#Sequences (27)#Expressions (4)#Probability (23)#Expressions (4)#Data and statistics (24)#Area and perimeter (18)#Circles (17)#Percents (10)#Functions (11)#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Data#Data#Data#Data#Data#Data#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Data#Data#Data#Data#Data#Data#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Verbs (8)#Add, revise, or delete (18)#Punctuation (5,6,7)#Verbs (8)#Shorter is better (15)#Verbs (8)#Transitions (17)#Non-essential and essential clauses (4)#Diction, idioms, and register (16)#Verbs (8)#Non-essential and essential clauses (4)#Sentence and paragraph order (19)#Sentences and fragments (2)#Add, revise, or delete (18)#Sentence and paragraph order (19)#Sentences and fragments (2)#Shorter is better (15)#Punctuation (5,6,7)#Diction, idioms, and register (16)#Parallel structure (13)#Joining and separating sentences (3)#Verbs (8)#Diction, idioms, and register (16)#Shorter is better (15)#Add, revise, or delete (18)#Modification (12)#Diction, idioms, and register (16)#Non-essential and essential clauses (4)#Sentence and paragraph order (19)#Evaluation of purpose (20)#Verbs (8)#Diction, idioms, and register (16)#Punctuation (5,6,7)#Add, revise, or delete (18)#Punctuation (5,6,7)#Add, revise, or delete (18)#Sentences and fragments (2)#Shorter is better (15)#Modification (12)#Add, revise, or delete (18)#Modification (12)#Add, revise, or delete (18)#Transitions (17)#Diction, idioms, and register (16)#Add, revise, or delete (18)#Add, revise, or delete (18)#Add, revise, or delete (18)#Punctuation (5,6,7)#Verbs (8)#Pronouns (9)#Pronouns (9)#Add, revise, or delete (18)#Joining and separating sentences (3)#Verbs (8)#Punctuation (5,6,7)#Add, revise, or delete (18)#Add, revise, or delete (18)#Shorter is better (15)#Sentence and paragraph order (19)#Evaluation of purpose (20)#Punctuation (5,6,7)#Shorter is better (15)#Pronouns (9)#Add, revise, or delete (18)#Add, revise, or delete (18)#Add, revise, or delete (18)#Joining and separating sentences (3)#Diction, idioms, and register (16)#Parallel structure (13)#Diction, idioms, and register (16)#Sentences and fragments (2)#Pronouns (9)#Shorter is better (15)#Add, revise, or delete (18)#Evaluation of purpose (20)#Numbers and Operations (5)#Coordinate geometry (14)#Numbers and Operations (5)#Word problems (26)#Matrices (28)#Functions (11)#Data and statistics (24)#Triangles (16)#Ratio and proportion (9)#Numbers and Operations (5)#Coordinate geometry (14)#Angles (15)#Quadratics (13)#Volume (19)#Numbers and Operations (5)#Properties of numbers (6)#Coordinate geometry (14)#Probability (23)#Ratio and proportion (9)#Systems of equations (20)#Area and perimeter (18)#Probability (23)#Percents (10)#Coordinate geometry (14)#Area and perimeter (18)#Area and perimeter (18)#Numbers and Operations (5)#Numbers and Operations (5)#Coordinate geometry (14)#Numbers and Operations (5)#Numbers and Operations (5)#Numbers and Operations (5)#Coordinate geometry (14)#Data and statistics (24)#Expressions (4)#Functions (11)#Properties of numbers (6)#Numbers and Operations (5)#Properties of numbers (6)#Trigonometry (22)#Vectors (28)#Expressions (4)#Functions (11)#Circles (17)#Data and statistics (24)#Trigonometry (22)#Circles (17)#Absolute value (1)#Inequalities (21)#Ratio and proportion (9)#Ellipses (28)#Data and statistics (24)#Properties of numbers (6)#Numbers and Operations (5)#Ratio and proportion (9)#Exponents and radicals (2)#Percents (10)#Probability (23)#Trigonometry (22)#Area and perimeter (18)#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Data#Data#Data#Data#Data#Data#Data#Data#Data#Data#Data#Data#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Diction, idioms, and register (16)#Verbs (8)#Diction, idioms, and register (16)#Non-essential and essential clauses (4)#Adjectives and adverbs (10)#Add, revise, or delete (18)#Transitions (17)#Pronouns (9)#Add, revise, or delete (18)#Sentences and fragments (2)#Pronouns (9)#Pronouns (9)#Diction, idioms, and register (16)#Verbs (8)#Add, revise, or delete (18)#Punctuation (5,6,7)#Parallel structure (13)#Add, revise, or delete (18)#Add, revise, or delete (18)#Add, revise, or delete (18)#Adjectives and adverbs (10)#Modification (12)#Diction, idioms, and register (16)#Verbs (8)#Transitions (17)#Pronouns (9)#Diction, idioms, and register (16)#Joining and separating sentences (3)#Shorter is better (15)#Evaluation of purpose (20)#Shorter is better (15)#Non-essential and essential clauses (4)#Non-essential and essential clauses (4)#Add, revise, or delete (18)#Transitions (17)#Transitions (17)#Add, revise, or delete (18)#Punctuation (5,6,7)#Pronouns (9)#Verbs (8)#Add, revise, or delete (18)#Non-essential and essential clauses (4)#Diction, idioms, and register (16)#Add, revise, or delete (18)#Evaluation of purpose (20)#Pronouns (9)#Shorter is better (15)#Add, revise, or delete (18)#Punctuation (5,6,7)#Joining and separating sentences (3)#Shorter is better (15)#Non-essential and essential clauses (4)#Verbs (8)#Add, revise, or delete (18)#Modification (12)#Add, revise, or delete (18)#Add, revise, or delete (18)#Joining and separating sentences (3)#Punctuation (5,6,7)#Sentence and paragraph order (19)#Word pairs and comparisons (11)#Joining and separating sentences (3)#Transitions (17)#Non-essential and essential clauses (4)#Pronouns (9)#Transitions (17)#Add, revise, or delete (18)#Shorter is better (15)#Modification (12)#Shorter is better (15)#Punctuation (5,6,7)#Sentences and fragments (2)#Joining and separating sentences (3)#Diction, idioms, and register (16)#Add, revise, or delete (18)#Angles (15)#Data and statistics (24)#Properties of numbers (6)#Solving equations (3)#Probability (23)#Ratio and proportion (9)#Word problems (26)#Word problems (26)#Quadratics (13)#Area and perimeter (18)#Numbers and Operations (5)#Numbers and Operations (5)#Triangles (16)#Functions (11)#Area and perimeter (18)#Numbers and Operations (5)#Word problems (26)#Functions (11)#Data and statistics (24)#Numbers and Operations (5)#Coordinate geometry (14)#Functions (11)#Triangles (16)#Coordinate geometry (14)#Area and perimeter (18)#Word problems (26)#Ratio and proportion (9)#Word problems (26)#Area and perimeter (18)#Matrices (28)#Numbers and Operations (5)#Probability (23)#Trigonometry (22)#Expressions (4)#Angles (15)#Solving equations (3)#Coordinate geometry (14)#Triangles (16)#Quadratics (13)#Circles (17)#Exponents and radicals (2)#Logarithms (25)#Coordinate geometry (14)#Word problems (26)#Quadratics (13)#Expressions (4)#Ratio and proportion (9)#Inequalities (21)#Ratio and proportion (9)#Volume (19)#Trigonometry (22)#Data and statistics (24)#Exponents and radicals (2)#Probability (23)#Word problems (26)#Probability (23)#Probability (23)#Properties of numbers (6)#Quadratics (13)#Trigonometry (22)#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Data#Data#Data#Data#Data#Data#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Data#Data#Data#Data#Data#Data#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Add, revise, or delete (18)#Verbs (8)#Transitions (17)#Pronouns (9)#Joining and separating sentences (3)#Shorter is better (15)#Adjectives and adverbs (10)#Transitions (17)#Sentence and paragraph order (19)#Punctuation (5,6,7)#Add, revise, or delete (18)#Non-essential and essential clauses (4)#Verbs (8)#Add, revise, or delete (18)#Non-essential and essential clauses (4)#Verbs (8)#Diction, idioms, and register (16)#Add, revise, or delete (18)#Add, revise, or delete (18)#Verbs (8)#Diction, idioms, and register (16)#Modification (12)#Shorter is better (15)#Joining and separating sentences (3)#Pronouns (9)#Diction, idioms, and register (16)#Verbs (8)#Add, revise, or delete (18)#Evaluation of purpose (20)#Shorter is better (15)#Joining and separating sentences (3)#Add, revise, or delete (18)#Punctuation (5,6,7)#Add, revise, or delete (18)#Diction, idioms, and register (16)#Diction, idioms, and register (16)#Joining and separating sentences (3)#Add, revise, or delete (18)#Non-essential and essential clauses (4)#Modification (12)#Pronouns (9)#Diction, idioms, and register (16)#Diction, idioms, and register (16)#Evaluation of purpose (20)#Diction, idioms, and register (16)#Sentence and paragraph order (19)#Non-essential and essential clauses (4)#Verbs (8)#Transitions (17)#Add, revise, or delete (18)#Modification (12)#Punctuation (5,6,7)#Joining and separating sentences (3)#Non-essential and essential clauses (4)#Shorter is better (15)#Diction, idioms, and register (16)#Diction, idioms, and register (16)#Transitions (17)#Punctuation (5,6,7)#Verbs (8)#Apostrophes (1)#Modification (12)#Non-essential and essential clauses (4)#Sentence and paragraph order (19)#Modification (12)#Add, revise, or delete (18)#Diction, idioms, and register (16)#Word pairs and comparisons (11)#Punctuation (5,6,7)#Diction, idioms, and register (16)#Add, revise, or delete (18)#Transitions (17)#Punctuation (5,6,7)#Evaluation of purpose (20)#Evaluation of purpose (20)#Percents (10)#Expressions (4)#Angles (15)#Solving equations (3)#Triangles (16)#Probability (23)#Word problems (26)#Probability (23)#Numbers and Operations (5)#Area and perimeter (18)#Solving equations (3)#Systems of equations (20)#Expressions (4)#Expressions (4)#Solving equations (3)#Data and statistics (24)#Probability (23)#Coordinate geometry (14)#Coordinate geometry (14)#Coordinate geometry (14)#Probability (23)#Data and statistics (24)#Functions (11)#Volume (19)#Functions (11)#Trigonometry (22)#Solving equations (3)#Expressions (4)#Circles (17)#Area and perimeter (18)#Coordinate geometry (14)#Trigonometry (22)#Area and perimeter (18)#Triangles (16)#Coordinate geometry (14)#Properties of numbers (6)#Data and statistics (24)#Numbers and Operations (5)#Word problems (26)#Solving equations (3)#Circles (17)#Circles (17)#Properties of numbers (6)#Exponents and radicals (2)#Area and perimeter (18)#Numbers and Operations (5)#Sequences (27)#Probability (23)#Quadratics (13)#Trigonometry (22)#Systems of equations (20)#Word problems (26)#Trigonometry (22)#Properties of numbers (6)#Inequalities (21)#Functions (11)#Expressions (4)#Data and statistics (24)#Functions (11)#Matrices (28)#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Data#Data#Data#Data#Data#Data#Data#Data#Data#Data#Data#Data#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Conflicting Viewpoints"
      var ACTDetailsTotalPart2 = "Conflicting Viewpoints#Conflicting Viewpoints#Conflicting Viewpoints#Conflicting Viewpoints#Conflicting Viewpoints#Conflicting Viewpoints#Non-essential and essential clauses (4)#Joining and separating sentences (3)#Punctuation (5,6,7)#Punctuation (5,6,7)#Shorter is better (15)#Shorter is better (15)#Non-essential and essential clauses (4)#Modification (12)#Diction, idioms, and register (16)#Verbs (8)#Verbs (8)#Joining and separating sentences (3)#Add, revise, or delete (18)#Verbs (8)#Sentence and paragraph order (19)#Transitions (17)#Pronouns (9)#Verbs (8)#Non-essential and essential clauses (4)#Add, revise, or delete (18)#Verbs (8)#Sentence and paragraph order (19)#Shorter is better (15)#Diction, idioms, and register (16)#Shorter is better (15)#Verbs (8)#Joining and separating sentences (3)#Transitions (17)#Diction, idioms, and register (16)#Sentence and paragraph order (19)#Diction, idioms, and register (16)#Non-essential and essential clauses (4)#Add, revise, or delete (18)#Punctuation (5,6,7)#Transitions (17)#Shorter is better (15)#Add, revise, or delete (18)#Shorter is better (15)#Transitions (17)#Pronouns (9)#Sentences and fragments (2)#Diction, idioms, and register (16)#Diction, idioms, and register (16)#Add, revise, or delete (18)#Evaluation of purpose (20)#Joining and separating sentences (3)#Diction, idioms, and register (16)#Verbs (8)#Add, revise, or delete (18)#Pronouns (9)#Add, revise, or delete (18)#Modification (12)#Add, revise, or delete (18)#Add, revise, or delete (18)#Punctuation (5,6,7)#Punctuation (5,6,7)#Joining and separating sentences (3)#Non-essential and essential clauses (4)#Pronouns (9)#Add, revise, or delete (18)#Verbs (8)#Add, revise, or delete (18)#Sentence and paragraph order (19)#Punctuation (5,6,7)#Add, revise, or delete (18)#Add, revise, or delete (18)#Non-essential and essential clauses (4)#Shorter is better (15)#Non-essential and essential clauses (4)#Transitions (17)#Pronouns (9)#Diction, idioms, and register (16)#Add, revise, or delete (18)#Sentence and paragraph order (19)#Evaluation of purpose (20)#Solving equations (3)#Numbers and Operations (5)#Word problems (26)#Expressions (4)#Sequences (27)#Numbers and Operations (5)#Numbers and Operations (5)#Triangles (16)#Numbers and Operations (5)#Sequences (27)#Expressions (4)#Properties of numbers (6)#Angles (15)#Area and perimeter (18)#Coordinate geometry (14)#Quadratics (13)#Area and perimeter (18)#Expressions (4)#Percents (10)#Trigonometry (22)#Numbers and Operations (5)#Angles (15)#Data and statistics (24)#Probability (23)#Trigonometry (22)#Data and statistics (24)#Probability (23)#Percents (10)#Systems of equations (20)#Matrices (28)#Numbers and Operations (5)#Expressions (4)#Vectors (28)#Numbers and Operations (5)#Quadratics (13)#Properties of numbers (6)#Data and statistics (24)#Quadratics (13)#Angles (15)#Functions (11)#Area and perimeter (18)#Logarithms (25)#Area and perimeter (18)#Trigonometry (22)#Percents (10)#Data and statistics (24)#Probability (23)#Area and perimeter (18)#Probability (23)#Probability (23)#Data and statistics (24)#Data and statistics (24)#Probability (23)#Word problems (26)#Properties of numbers (6)#Ellipses (28)#Properties of numbers (6)#Numbers and Operations (5)#Expressions (4)#Expressions (4)#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Data#Data#Data#Data#Data#Data#Data#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Data#Data#Data#Data#Data#Data#Data#Data#Data#Data#Data#Data#Data#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Data#Data#Data#Data#Data#Data#Shorter is better (15)#Pronouns (9)#Add, revise, or delete (18)#Non-essential and essential clauses (4)#Sentences and fragments (2)#Add, revise, or delete (18)#Non-essential and essential clauses (4)#Shorter is better (15)#Joining and separating sentences (3)#Sentences and fragments (2)#Diction, idioms, and register (16)#Add, revise, or delete (18)#Joining and separating sentences (3)#Apostrophes (1)#Sentence and paragraph order (19)#Add, revise, or delete (18)#Verbs (8)#Shorter is better (15)#Joining and separating sentences (3)#Diction, idioms, and register (16)#Transitions (17)#Add, revise, or delete (18)#Joining and separating sentences (3)#Add, revise, or delete (18)#Diction, idioms, and register (16)#Modification (12)#Punctuation (5,6,7)#Diction, idioms, and register (16)#Parallel structure (13)#Sentence and paragraph order (19)#Add, revise, or delete (18)#Non-essential and essential clauses (4)#Modification (12)#Joining and separating sentences (3)#Transitions (17)#Punctuation (5,6,7)#Punctuation (5,6,7)#Sentence and paragraph order (19)#Joining and separating sentences (3)#Add, revise, or delete (18)#Pronouns (9)#Verbs (8)#Joining and separating sentences (3)#Shorter is better (15)#Sentence and paragraph order (19)#Sentences and fragments (2)#Verbs (8)#Add, revise, or delete (18)#Apostrophes (1)#Transitions (17)#Non-essential and essential clauses (4)#Diction, idioms, and register (16)#Apostrophes (1)#Sentence and paragraph order (19)#Transitions (17)#Add, revise, or delete (18)#Joining and separating sentences (3)#Add, revise, or delete (18)#Transitions (17)#Evaluation of purpose (20)#Pronouns (9)#Shorter is better (15)#Non-essential and essential clauses (4)#Add, revise, or delete (18)#Verbs (8)#Add, revise, or delete (18)#Pronouns (9)#Diction, idioms, and register (16)#Modification (12)#Verbs (8)#Modification (12)#Verbs (8)#Punctuation (5,6,7)#Sentence and paragraph order (19)#Evaluation of purpose (20)#Ratio and proportion (9)#Probability (23)#Exponents and radicals (2)#Functions (11)#Probability (23)#Word problems (26)#Angles (15)#Solving equations (3)#Coordinate geometry (14)#Data and statistics (24)#Coordinate geometry (14)#Word problems (26)#Systems of equations (20)#Data and statistics (24)#Absolute value (1)#Exponents and radicals (2)#Coordinate geometry (14)#Properties of numbers (6)#Triangles (16)#Triangles (16)#Area and perimeter (18)#Area and perimeter (18)#Percents (10)#Word problems (26)#Numbers and Operations (5)#Coordinate geometry (14)#Expressions (4)#Data and statistics (24)#Numbers and Operations (5)#Word problems (26)#Properties of numbers (6)#Area and perimeter (18)#Area and perimeter (18)#Percents (10)#Word problems (26)#Word problems (26)#Probability (23)#Properties of numbers (6)#Trigonometry (22)#Absolute value (1)#Data and statistics (24)#Logarithms (25)#Percents (10)#Absolute value (1)#Volume (19)#Volume (19)#Area and perimeter (18)#Data and statistics (24)#Functions (11)#Systems of equations (20)#Data and statistics (24)#Systems of equations (20)#Sequences (27)#Trigonometry (22)#Trigonometry (22)#Probability (23)#Matrices (28)#Complex numbers (7)#Trigonometry (22)#Angles (15)#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Data#Data#Data#Data#Data#Data#Data#Data#Data#Data#Data#Data#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Conflicting viewpoints#Verbs (8)#Non-essential and essential clauses (4)#Modification (12)#Diction, idioms, and register (16)#Punctuation (5,6,7)#Punctuation (5,6,7)#Non-essential and essential clauses (4)#Add, revise, or delete (18)#Modification (12)#Modification (12)#Pronouns (9)#Punctuation (5,6,7)#Shorter is better (15)#Add, revise, or delete (18)#Evaluation of purpose (20)#Add, revise, or delete (18)#Shorter is better (15)#Shorter is better (15)#Add, revise, or delete (18)#Shorter is better (15)#Pronouns (9)#Add, revise, or delete (18)#Punctuation (5,6,7)#Punctuation (5,6,7)#Verbs (8)#Transitions (17)#Punctuation (5,6,7)#Add, revise, or delete (18)#Punctuation (5,6,7)#Add, revise, or delete (18)#Modification (12)#Punctuation (5,6,7)#Add, revise, or delete (18)#Joining and separating sentences (3)#Add, revise, or delete (18)#Pronouns (9)#Verbs (8)#Punctuation (5,6,7)#Add, revise, or delete (18)#Sentence and paragraph order (19)#Shorter is better (15)#Transitions (17)#Transitions (17)#Add, revise, or delete (18)#Evaluation of purpose (20)#Shorter is better (15)#Add, revise, or delete (18)#Shorter is better (15)#Modification (12)#Verbs (8)#Diction, idioms, and register (16)#Verbs (8)#Punctuation (5,6,7)#Verbs (8)#Non-essential and essential clauses (4)#Shorter is better (15)#Shorter is better (15)#Transitions (17)#Shorter is better (15)#Add, revise, or delete (18)#Pronouns (9)#Punctuation (5,6,7)#Diction, idioms, and register (16)#Verbs (8)#Add, revise, or delete (18)#Sentence and paragraph order (19)#Pronouns (9)#Shorter is better (15)#Transitions (17)#Joining and separating sentences (3)#Add, revise, or delete (18)#Pronouns (9)#Non-essential and essential clauses (4)#Non-essential and essential clauses (4)#Evaluation of purpose (20)#Probability (23)#Triangles (16)#Angles (15)#Probability (23)#Absolute value (1)#Systems of equations (20)#Ratio and proportion (9)#Solving equations (3)#Numbers and Operations (5)#Ratio and proportion (9)#Solving equations (3)#Coordinate geometry (14)#Quadratics (13)#Trigonometry (22)#Area and perimeter (18)#Angles (15)#Sequences (27)#Coordinate geometry (14)#Area and perimeter (18)#Probability (23)#Coordinate geometry (14)#Exponents and radicals (2)#Coordinate geometry (14)#Solving equations (3)#Area and perimeter (18)#Angles (15)#Area and perimeter (18)#Numbers and Operations (5)#Solving equations (3)#Probability (23)#Numbers and Operations (5)#Exponents and radicals (2)#Triangles (16)#Trigonometry (22)#Angles (15)#Volume (19)#Solving equations (3)#Angles (15)#Area and perimeter (18)#Percents (10)#Sequences (27)#Trigonometry (22)#Exponents and radicals (2)#Data and statistics (24)#Absolute value (1)#Functions (11)#Circles (17)#Properties of numbers (6)#Area and perimeter (18)#Numbers and Operations (5)#Coordinate geometry (14)#Functions (11)#Probability (23)#Logarithms (25)#Matrices (28)#Ratio and proportion (9)#Coordinate geometry (14)#Absolute value (1)#Data and statistics (24)#Circles (17)#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Literary narrative#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Humanities#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Data#Data#Data#Data#Data#Data#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Conflicting Viewpoints#Conflicting Viewpoints#Conflicting Viewpoints#Conflicting Viewpoints#Conflicting Viewpoints#Conflicting Viewpoints#Conflicting Viewpoints#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Experiments#Data#Data#Data#Data#Data#Data"
      var ACTDetails1 = ACTDetailsTotalPart1.split('#')
      var ACTDetails2 = ACTDetailsTotalPart2.split('#')
      var ACTDetailsArr = ACTDetails1.concat(ACTDetails2).splice(((num-1)*215), ((num)*215))
      var ACTCorrectAnswersTotal = "C#G#A#J#A#F#C#F#C#J#B#F#B#J#D#G#A#G#D#G#A#J#C#F#D#H#C#G#D#G#D#G#B#F#A#G#A#F#C#J#D#G#C#J#B#J#A#H#D#J#A#H#A#J#B#F#C#G#C#J#A#H#A#G#C#J#D#H#D#G#C#H#D#F#B#C#H#E#H#E#G#E#F#C#H#B#J#B#G#B#F#B#K#D#G#A#G#C#G#C#F#C#H#D#J#D#F#B#H#B#J#E#H#A#H#C#G#A#J#D#J#B#H#A#F#B#F#A#K#A#J#C#F#A#J#C#F#B#H#A#J#B#J#D#G#C#F#B#H#A#H#B#J#A#F#B#G#D#G#D#H#C#G#A#G#A#H#C#F#A#J#C#G#D#J#B#G#B#F#D#J#B#J#A#G#A#F#B#F#C#G#C#F#B#G#A#F#D#H#D#J#B#H#B#F#C#J#D#H#C#G#D#H#D#H#B#F#C#G#D#G#A#F#A#J#C#J#D#J#C#H#D#G#A#G#D#G#C#F#D#J#C#H#B#J#A#J#B#G#C#H#D#F#B#H#A#J#C#J#A#H#A#H#C#J#D#J#A#G#B#H#A#F#A#G#D#G#B#H#D#J#B#G#C#J#C#F#C#F#B#B#G#B#H#A#H#D#J#E#H#E#J#A#H#C#G#D#K#A#J#A#J#E#K#C#G#B#H#C#J#D#K#E#F#E#J#C#G#D#J#A#J#B#J#A#G#E#G#B#G#C#F#C#F#E#H#B#F#A#K#A#H#b#F#D#G#C#H#A#H#D#J#B#H#A#J#B#F#C#F#B#F#B#J#C#F#B#J#C#G#D#G#C#G#D#F#D#F#B#G#B#G#D#H#D#J#A#G#A#H#B#G#D#H#A#F#D#F#C#J#B#F#D#H#B#J#C#J#A#J#C#H#B#G#C#G#D#F#A#F#A#G#C#G#D#G#B#J#B#F#D#F#B#F#A#F#C#G#A#H#C#H#A#H#D#J#A#F#C#H#D#F#C#H#C#J#D#F#D#J#B#F#C#G#C#J#C#H#C#J#A#G#A#J#D#F#D#G#B#G#D#H#C#G#C#J#A#F#B#G#B#H#C#J#B#C#J#E#F#C#G#B#H#C#G#C#G#D#G#D#H#A#J#C#H#D#G#C#H#E#G#E#F#D#H#A#J#A#K#B#F#E#K#D#H#A#G#D#G#D#G#E#H#D#J#E#F#B#F#E#K#A#F#D#K#B#H#D#F#B#F#C#J#D#F#D#F#D#G#C#H#A#J#A#J#B#G#D#G#C#H#A#G#D#J#B#H#B#G#C#F#D#F#B#J#A#H#C#J#A#J#D#F#D#H#B#J#C#J#A#F#D#G#C#G#B#F#B#H#C#G#D#F#A#J#B#J#D#G#D#G#C#F#C#H#B#F#C#F#A#J#D#H#D#J#A#G#B#H#C#J#B#H#A#J#B#F#C#G#B#H#A#J#D#F#B#H#A#G#A#F#D#J#B#J#C#F#D#H#A#J#C#H#D#J#A#F#D#G#B#H#B#G#A#H#A#G#D#G#C#F#D#H#A#J#B#F#D#F#C#B#G#A#H#A#G#E#J#C#H#E#G#A#K#E#J#D#G#B#F#C#K#A#G#D#F#C#H#A#H#C#J#C#G#A#G#E#J#C#K#C#G#D#K#A#K#D#F#B#K#D#J#E#J#B#G#A#J#D#K#A#H#D#H#B#J#A#F#C#G#C#F#A#G#D#G#C#F#D#J#C#F#A#H#B#G#C#J#B#J#B#H#B#F#A#J#C#J#A#H#C#H#C#F#B#H#C#F#A#H#B#J#A#H#A#J#C#F#A#G#B#F#B#G#D#G#D#J#C#G#D#J#A#H#D#F#B#J#B#F#C#H#D#G#D#J#B#H#C#F#A#J#D#H#B#J#A#G#A#H#A#J#C#F#B#J#D#H#B#G#A#H#C#J#D#F#A#F#D#G#C#H#B#H#A#G#A#J#D#H#B#J#B#F#B#F#C#H#D#G#B#F#A#H#A#F#C#J#B#G#D#J#A#H#C#D#H#C#J#A#H#D#H#B#G#A#G#C#F#C#K#A#K#A#G#D#J#E#H#C#H#D#J#B#K#C#H#B#K#E#G#C#F#A#K#E#F#A#J#D#K#A#K#D#G#D#H#B#G#D#K#B#F#D#G#B#F#D#J#B#H#A#J#D#H#D#J#D#H#B#H#C#J#C#F#D#H#A#F#B#J#A#G#C#H#B#F#D#G#C#F#A#H#A#G#B#J#A#H#A#H#D#J#C#H#D#F#B#H#B#G#C#J#A#F#C#F#D#F#B#G#C#F#B#G#A#H#D#J#C#H#B#G#C#J#C#H#B#H#C#F#A#G#A#H#D#G#B#J#A#J#C#F#A#F#B#J#B#H#A#J#A#H#D#G#D#G#B#J#D#G#C#F#C#F#A#F#B#F#C#F#A#F#B#G#D#J#A#G#D#J#C#J#B#H#D#F#C#H#D#G#A#J#D#J#B#H#A#H#B#E#H#B#J#A#F#B#H#C#J#C#H#E#H#D#F#C#G#A#J#B#H#A#F#C#F#E#H#E#F#B#K#C#J#D#K#E#K#B#H#B#F#D#G#D#H#A#G#D#J#E#J#E#G#D#J#A#G#E#K#D#J#C#H#B#H#A#F#D#F#B#F#B#F#A#H#D#J#C#J#C#G#B#H#D#G#A#F#B#F#B#F#D#H#B#H#A#F#C#J#A#J#D#G#D#G#B#G#A#H#D#H#B#G#B#H#A#F#C#F#C#F#D#H#B#J#B#H#C#J#B#F#A#F#C#F#B#J#B#F#C#J#B#H#B#J#D#H#B#G#D#F#A#H#A#J#C#F#B#G#D#H#B#F#D#G#A#F#C#H#D#H#A#F#C#H#A#H#B#G#D#H#D#F#D#H#B#F#B#J#B#F#A#H#D#J#A#H#B#J#C#F#D#F#B#G#D#H#A#J#A#G#B#F#B#D#F#E#H#C#H#C#K#B#H#D#G#C#K#D#F#B#G#B#J#D#K#C#F#C#H#C#F#C#G#E#J#D#G#A#K#A#G#E#J#C#J#D#K#A#J#B#F#E#F#E#G#A#G#A#J#D#F#A#K#D#G#D#H#A#J#B#G#C#F#A#H#C#J#C#F#B#G#D#F#C#G#D#G#C#F#A#G#A#J#D#F#C#J#B#F#D#G#B#H#A#F#C#G#C#J#D#H#B#F#B#G#D#H#C#F#A#G#A#J#C#H#C#F#C#G#B#G#C#F#B#F#D#F#B#G#D#J#A#J#A#J#B#H#D#F#B#J#B#H#C#F#C#J#D#J#B#G#C#H#A#G#D#H#D#H#A#H#A#H#C#J#B#F#D#F#C#F#C#G#A#J#C#F#B#F#B#G#D#H#B#J#D#G#A#J#C#G#A#H#D#G#B#F#A#F#B#J#D#H#A#H#B#G#D#E#H#B#F#D#K#B#G#D#J#C#G#C#F#C#H#E#H#A#K#B#K#B#K#C#J#A#G#A#K#A#H#A#H#D#J#D#H#C#F#D#F#E#J#D#G#D#G#C#J#D#H#C#H#E#J#E#F#E#J#A#G#D#G#A#H#D#F#C#J#B#G#C#H#D#H#D#J#A#H#D#G#C#G#C#F#B#F#B#G#C#G#D#H#A#J#B#J#B#F#C#G#B#H#D#H#D#H#A#J#B#F#A#G#D#J#A#F#A#G#D#J#C#J#B#J#A#F#B#F#C#F#A#G#A#G#D#G#B#J#D#H#A#H#D#F#A#J#B#G#C#G#A#H#C#H#A#J#D#F#B#J#A#G#B#F#D#H#B#H#B#H#D#F#D#H#A#F#B#H#D#F#D#J#C#H#D#F#A#H#C#J#A#H#B#G#C#J#D#J#B#J#B#F#D#H#B#G#B#F#D#H#D#G#A#A#K#D#J#D#F#B#K#D#K#A#H#D#G#B#H#D#K#C#J#B#H#E#G#E#H#C#H#C#H#B#G#B#F#D#K#C#J#C#F#D#F#C#G#E#K#A#F#A#F#A#G#C#F#A#J#E#G#D#K#B#F#B#F#D#H#C#J#B#J#A#J#D#H#D#G#A#G#C#H#B#H#A#J#B#F#D#H#A#H#C#F#B#J#C#H#D#H#B#J#A#J#D#H#C#G#B#H#C#G#D#F#A#H#D#G#B#F#B#J#B#F#B#H#A#F#A#H#B#G#C#H#A#G#C#J#D#G#C#J#A#G#A#F#C#F#D#G#C#J#C#F#B#J#B#G#C#F#C#G#D#G#C#H#B#F#C#F#D#G#C#J#C#G#A#J#C#F#D#H#B#F#C#G#A#F#B#G#D#F#B#F#D#H#D#H#A#G#C#J#C#G#D#J#B#F#B#F#D#F#C#H#D#F#D#C#K#B#J#D#H#D#G#D#G#D#H#B#H#D#K#B#K#B#K#B#F#C#J#A#H#A#H#E#J#E#G#E#H#C#J#A#K#D#K#A#G#C#F#A#J#B#G#B#J#C#F#A#H#E#H#B#F#A#K#A#G#A#J#C#G#D#H#C#F#D#G#D#J#A#G#B#H#A#H#C#G#D#H#D#F#C#J#A#F#D#H#B#J#C#G#A#G#A#J#C#J#B#J#A#G#C#J#C#J#A#F#A#H#B#J#A#H#A#G#C#H#C#H#D#J#C#F#B#F#D#F#D#G#A#J#D#J#B#G"
      var ACTCorrectAnswerArr = ACTCorrectAnswersTotal.split('#').splice(((num-1)*215), ((num)*215))

      var ACTSections = "English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science"
      var ACTSectionsArr = Copies(ACTSections.split('#'))
      var ACTSectionNumberArr = []
      
      for(var u = 0; u<ACTSectionsArr.length; u++){
        var Curr = ACTSectionsArr[u]
        if(Curr == 'English'){
          ACTSectionNumberArr.push('1')
        }
        if(Curr == 'Math'){
          ACTSectionNumberArr.push('2')
        }
        if(Curr == 'Reading'){
          ACTSectionNumberArr.push('3')
        }
        if(Curr == 'Science'){
          ACTSectionNumberArr.push('4')
        }
      }
      var ACTQuestion = "1#2#3#4#5#6#7#8#9#10#11#12#13#14#15#16#17#18#19#20#21#22#23#24#25#26#27#28#29#30#31#32#33#34#35#36#37#38#39#40#41#42#43#44#45#46#47#48#49#50#51#52#53#54#55#56#57#58#59#60#61#62#63#64#65#66#67#68#69#70#71#72#73#74#75#1#2#3#4#5#6#7#8#9#10#11#12#13#14#15#16#17#18#19#20#21#22#23#24#25#26#27#28#29#30#31#32#33#34#35#36#37#38#39#40#41#42#43#44#45#46#47#48#49#50#51#52#53#54#55#56#57#58#59#60#1#2#3#4#5#6#7#8#9#10#11#12#13#14#15#16#17#18#19#20#21#22#23#24#25#26#27#28#29#30#31#32#33#34#35#36#37#38#39#40#1#2#3#4#5#6#7#8#9#10#11#12#13#14#15#16#17#18#19#20#21#22#23#24#25#26#27#28#29#30#31#32#33#34#35#36#37#38#39#40"
      var ACTQuestionArr = Copies(ACTQuestion.split('#'))

      }

    
    //var SATDetails1 = "Fiction,Fiction,Fiction,Fiction,Fiction,Fiction,Fiction,Fiction,Fiction,Fiction,Social Science,Social Science,Social Science,Social Science,Social Science,Social Science,Social Science,Social Science,Social Science,Social Science,Social Science,Natural Science,Natural Science,Natural Science,Natural Science,Natural Science,Natural Science,Natural Science,Natural Science,Natural Science,Natural Science,Historical Documents,Historical Documents,Historical Documents,Historical Documents,Historical Documents,Historical Documents,Historical Documents,Historical Documents,Historical Documents,Historical Documents,Paired Passages,Paired Passages,Paired Passages,Paired Passages,Paired Passages,Paired Passages,Paired Passages,Paired Passages,Paired Passages,Paired Passages,Paired Passages,Diction, idioms, and register (5),Add, revise, or delete (1),Apostrophes (13),Punctuation (10,11,12),Sentence and paragraph order (2),Add, revise, or delete (1),Diction, idioms, and register (5),Verb agreement and tense (15),Transitions (8),Diction, idioms, and register (5),Transitions (8),Infographics (3),Combining and separating sentences (7),Transitions (8),Non-essential and essential clauses (9),Punctuation (10,11,12),Sentences and fragments (6),Verb agreement and tense (15),Pronoun and noun agreement (14),Add, revise, or delete (1),Shorter is better (4),Sentence and paragraph order (2),Shorter is better (4),Modification (18),Diction, idioms, and register (5),Punctuation (10,11,12),Transitions (8),Add, revise, or delete (1),Infographics (3),Pronoun and noun agreement (14),Sentence and paragraph order (2),Punctuation (10,11,12),Diction, idioms, and register (5),Transitions (8),Shorter is better (4),Verb agreement and tense (15),Add, revise, or delete (1),Transitions (8),Shorter is better (4),Verb agreement and tense (15),Apostrophes (13),Add, revise, or delete (1),Pronoun and noun agreement (14),Pronoun and noun agreement (14),Solving algebraic equations (8),Complex numbers (19),Constructing models (7),Lines (14),Expressions (6),Lines (14),Expressions (6),Expressions (6),Systems of equations (10),Quadratics (17),Systems of equations (10),Lines (14),Expressions (6),Exponents and radicals (1),Matching coefficients (9),Quadratics (17),Triangles (22),Systems of equations (10),Trigonometry (24),Systems of equations (10),Reading data (25),Ratio and proportion (5),Angles (21),Word problems (12),Exponential and linear growth (3),Ratio and proportion (5),Reading data (25),Absolute value (20),Solving algebraic equations (8),Solving algebraic equations (8),Inequalities (11),Mean, median, and mode (27),Percents (2),Mean, median, and mode (27),Lines (14),Lines (14),Functions (16),Inequalities (11),Systems of equations (10),Percents (2),Probability (26),Mean, median, and mode (27),Ratio and proportion (5),Circles (23),Quadratics (17),Percents (2),Reading data (25),Inequalities (11),Synthetic division (18),Quadratics (17),Inequalities (11),Inequalities (11),Reading data (25),Word problems (12),Volume (29),Functions (16),Exponential and linear growth (3),Exponential and linear growth (3)"
    
    //var SATDetails1Arr = SATDetails1.split(',')
    //var SATCorrectAnswer = "B,B,C,A,C,D,D,B,C,B,A,B,D,A,A,C,C,D,A,B,A,B,D,D,C,B,D,C,A,A,D,B,A,C,B,D,C,C,B,C,B,B,A,A,D,C,B,A,D,B,D,A,D,B,A,C,C,D,B,C,A,A,B,B,A,B,C,C,C,A,D,D,B,D,D,D,B,A,B,C,B,D,C,A,A,A,A,B,D,C,A,B,B,C,D,D,D,A,C,B,C,A,B,C,B,A,D,D,B,A,D,2,1600,7,0.8,100,B,C,D,C,D,D,C,D,A,B,A,C,C,C,A,C,B,A,B,D,C,B,B,A,D,B,C,C,D,D,4,107,0.625,96,6,3,1.02,6.11"
    //var SATCorrectAnswerArr = SATCorrectAnswer.split(',')
    var Arr = [[{ value: "Test" }, { value: "Section" },{ value: "Question" }, { value: "Subject" },{ value: "Detail" },{ value: "Student answer" },{value:'Correct Answer'},{ value: "Outcome" }]]
 
    
    if(CurrTest == 'SAT'){
      var TempArr = []
      for(var i =0; i<SATDetailsArr.length; i++){
        TempArr = [{ value: NumToTestNum(i) }, { value: SATSectionNumberArr[i] },{ value: SATQuestionArr[i]}, { value: SATSectionsArr[i]},{ value: SATDetailsArr[i] },{ value: "" },{value: SATCorrectAnswerArr[i]},{ value: "=(F"+(i+2).toString()+" = G"+(i+2).toString()+ ")" }]
        Arr.push(TempArr)
      }
    }else if(CurrTest == 'ACT'){
      var TempArr = []
      for(var i =0; i<ACTDetailsArr.length; i++){
        TempArr = [{ value: NumToTestNumACT(i) }, { value: ACTSectionNumberArr[i] },{ value: ACTQuestionArr[i]}, { value: ACTSectionsArr[i]},{ value: ACTDetailsArr[i] },{ value: "" },{value: ACTCorrectAnswerArr[i]},{ value: "=(F"+(i+2).toString()+" = G"+(i+2).toString()+ ")" }]
        Arr.push(TempArr)
      }
    }
    
    return(Arr)

    return([SATDetailsArr,SATCorrectAnswerArr])
  }

  function PullDiagnosticsData(s){
    var TempD = DiagnosticsTestAnswerBank()
    function FindMatchingUid(){
      for(var i = 0; i< NameId.length; i++){
      
        if(s.value == NameId[i][0]){
          return(NameId[i][2])
        }
      }
    }

    function FindMatchingUid100(){
      for(var i = 0; i< NameId.length; i++){
      
        if(s == NameId[i][0]){
          return(NameId[i][2])
        }
      }
    }
    
    try{
    var FMUID = FindMatchingUid()
    const x = query(usersRef, where("uid", "==", FMUID))

    const unsub = onSnapshot(x, (querySnapshot) => { 

      var ArrString = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.DiagnosticsTestResults.stringValue)
      var Arr = ArrString[0].split('+')
    
     
      var TempData = TempD
      
      function CheckMark(arri, tempi){

        if(arri == '-' || tempi.value == '-'){
          return('-')
        }else{
          return(arri)
        }
      }
      for(var i = 0; i < TempData.length; i++){
        
          TempData[i][3] = {value: CheckMark(Arr[i],TempData[i][3])}
        }

      setTimeout(() => {
        setDiagnosticsTestData(TempData)
      }, 1000)

    })
  }catch(e){

  }
  }




  const[PullStudentDataDone, setPullStudentDataDone] = useState(false)

  function PullStudentData(s , index, num = 0, Test = 0){
   
    var TempD = SATCorrectAnswerBank(index, Test)
  
   
    function FindMatchingUid(){
      for(var i = 0; i< NameId.length; i++){
      
        if(s.value == NameId[i][0]){
          return(NameId[i][2])
        }
      }
    }

    function FindMatchingUid100(){
      for(var i = 0; i< NameId.length; i++){
      
        if(s == NameId[i][0]){
          return(NameId[i][2])
        }
      }
    }

    
    if(index==100){
      var FMUID = FindMatchingUid100()
    }
    else{
      var FMUID = FindMatchingUid()
    }
    const x = query(usersRef, where("uid", "==", FMUID))
    var ArrString = ''
    function CorrectTestLength(Arr, isFirst = false){
    
      var TempArr = Arr.split('+')
  
     if(isFirst){
      return(TempArr.slice(0, 155))
     }
     else{
      return(TempArr.slice(1, 155))
     }

    }

    function CorrectTestLengthACT(Arr, isFirst = false){
 
      var TempArr = Arr.split('+')
  
     if(isFirst){
      return(TempArr.slice(0, 216))
     }
     else{
      return(TempArr.slice(1, 216))
     }

    }


    const unsub = onSnapshot(x, (querySnapshot) => {
      
      switch(index) {
        case 1:
          // code block
          
          try{
            var ArrString = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.Test1.stringValue)
            // code block
          }catch(err){
            console.log("Super error")
            //GetDataToUpdateSpreadsheet(1)
          }
          break;
        case 2:
          try{
            var ArrString = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.Test2.stringValue)
            // code block
          }catch(err){
            console.log("Super error")
            //GetDataToUpdateSpreadsheet(2)
          }
          // code block
          break;
        case 3:
          try{
            var ArrString = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.Test3.stringValue)
            // code block
          }catch(err){
            console.log("Super error")
            //GetDataToUpdateSpreadsheet(3)
          }
            break;
        case 4:
          try{
            var ArrString = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.Test4.stringValue)
            // code block
          }catch(err){
            console.log("Super error")
            //GetDataToUpdateSpreadsheet(4)
          }
            // code block
            break;
        case 5:
          try{
            var ArrString = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.Test5.stringValue)
            // code block
          }catch(err){
            console.log("Super error")
            //GetDataToUpdateSpreadsheet(5)
          }
              // code block
              break;
        case 6:
          try{
            var ArrString = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.Test6.stringValue)
            // code block
          }catch(err){
            console.log("Super error")
            //GetDataToUpdateSpreadsheet(6)
          }
              // code block
              break;
        case 7:
          try{
            var ArrString = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.Test7.stringValue)
            // code block
          }catch(err){
            console.log("Super error")
            //GetDataToUpdateSpreadsheet(7)
          }
                // code block
                break;
        case 8:
          try{
            var ArrString = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.Test8.stringValue)
            // code block
          }catch(err){
            console.log("Super error")
            //GetDataToUpdateSpreadsheet(8)
          }
                // code block
                break;
        case 9:
          try{
            var ArrString = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.Test9.stringValue)
            // code block
          }catch(err){
            console.log("Super error")
            //GetDataToUpdateSpreadsheet(9)
          }
              // code block
              break;
        case 10:
          try{
            var ArrString = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.Test10.stringValue)
            // code block
          }catch(err){
            console.log("Super error")
            //GetDataToUpdateSpreadsheet(10)
          }
              // code block
              break;
        case 99: case 100:
          var ArrStringTotal = ['Student answer']
       
            try{
              
                var ArrString1 = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.Test1.stringValue)
                ArrStringTotal = ArrStringTotal.concat(CorrectTestLength(ArrString1[0]))
                ArrString1 = CorrectTestLength(ArrString1[0])

              // code block
            }catch(err){
              var ArrString1 = ''
            }
            try{
              var ArrString2 = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.Test2.stringValue)
              ArrStringTotal = ArrStringTotal.concat(CorrectTestLength(ArrString2[0]))
              ArrString2 = CorrectTestLength(ArrString2[0])
              // code block
            }catch(err){
              var ArrString2 = ''
            }
            try{
              var ArrString3 = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.Test3.stringValue)
              ArrStringTotal = ArrStringTotal.concat(CorrectTestLength(ArrString3[0]))
              ArrString3 = CorrectTestLength(ArrString3[0])
              // code block
            }catch(err){
              var ArrString3 = ''
            }
            try{
              var ArrString4 = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.Test4.stringValue)
              ArrStringTotal = ArrStringTotal.concat(CorrectTestLength(ArrString4[0]))
              ArrString4 = CorrectTestLength(ArrString4[0])
              // code block
            }catch(err){
              var ArrString4 = ''
            }
            try{
              var ArrString5 = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.Test5.stringValue)
              ArrStringTotal = ArrStringTotal.concat(CorrectTestLength(ArrString5[0]))
              ArrString5 = CorrectTestLength(ArrString5[0])
              // code block
            }catch(err){
              var ArrString5 = ''
            }
            try{
              var ArrString6 = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.Test6.stringValue)
              ArrStringTotal = ArrStringTotal.concat(CorrectTestLength(ArrString6[0]))
              ArrString6 = CorrectTestLength(ArrString6[0])
              // code block
            }catch(err){
              var ArrString6 = ''
            }
            try{
              var ArrString7 = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.Test7.stringValue)
              ArrStringTotal = ArrStringTotal.concat(CorrectTestLength(ArrString7[0]))
              ArrString7 = CorrectTestLength(ArrString7[0])
              // code block
            }catch(err){
              var ArrString7 = ''
            }
            try{
              var ArrString8 = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.Test8.stringValue)
              ArrStringTotal = ArrStringTotal.concat(CorrectTestLength(ArrString8[0]))
              ArrString8 = CorrectTestLength(ArrString8[0])
              // code block
            }catch(err){
              var ArrString8 = ''
            }
            try{
              var ArrString9 = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.Test9.stringValue)
              ArrStringTotal = ArrStringTotal.concat(CorrectTestLength(ArrString9[0]))
              ArrString9 = CorrectTestLength(ArrString9[0])
              // code block
            }catch(err){
              var ArrString9 = ''
            }
            try{
              var ArrString10 = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.Test10.stringValue)
              ArrStringTotal = ArrStringTotal.concat(CorrectTestLength(ArrString10[0]))
              ArrString10 = CorrectTestLength(ArrString10[0])
              // code block
            }catch(err){
              var ArrString10 = ''
            }
            
            setDataTotalRaw(ArrStringTotal)
            var IncludesAnswers = ['A', 'B','C','D','X','a','b','c','d','x']
            //setStandardizedTestsDone
           
          
            var TempPushArr = []
            //.some(r=> IncludesAnswers.includes(r))
            if(!(ArrString1.includes(''))){ //ArrString1[0].includes(IncludesAnswers)
              TempPushArr.push(true)
            }
            if(!(ArrString2.includes(''))){
              TempPushArr.push(true)
            }
            if(!(ArrString3.includes(''))){
              TempPushArr.push(true)
            }
            if(!(ArrString4.includes(''))){
              TempPushArr.push(true)
            }
            if(!(ArrString5.includes(''))){
              TempPushArr.push(true)
            }
            if(!(ArrString6.includes(''))){
              TempPushArr.push(true)
            }
            if(!(ArrString7.includes(''))){
              TempPushArr.push(true)
            }
            if(!(ArrString8.includes(''))){
              TempPushArr.push(true)
            }
            if(!(ArrString9.includes(''))){
              TempPushArr.push(true)
            }
            if(!(ArrString10.includes(''))){
              TempPushArr.push(true)
            }
           
          
            setStandardizedTestsDone(TempPushArr)
            
            break;
        default:
          // code block
          var ArrString = ''
      }
      //var ArrString = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.Test1.stringValue)
      
      
      //return(null)
      if(index == 99){
        var Arr = ArrStringTotal
     
     
        var TempData = TempD
    
        for(var i = 0; i < Arr.length; i++){
 
          TempData[i][5] = {value: Arr[i]}
        }
     
        setDataTotal(TempData)
        setPullStudentDataDone(true)
        setAtStart(AtStart + 1)

       
      }
      else if(index == 100){
       
        var Arr = ArrStringTotal
        
     
        var TempData = TempD
       
        for(var i = 0; i < Arr.length; i++){
         
          TempData[i][5] = {value: Arr[i]}
        }
       
        //setDataTotal(TempData)
        //setTimeout(() => {
          var PercentageCorrectRows = FindPercentageCorrectRows(TempData, index,Test)
       
          var Rows = CreateRows(TempData, 100,Test)
          
          ClassroomRows.push(Rows)
          
          if(ClassroomRows.length == num){
            for(var i = 1; i< ClassroomRows.length; i++){
              for(var y = 0; y < ClassroomRows[0][i].length; y++){
              
               
                for(var z = 0; z < 2; z++){
                  ClassroomRows[0][z][y].Right += ClassroomRows[i][z][y].Right
                  ClassroomRows[0][z][y].Wrong += ClassroomRows[i][z][y].Wrong
                  ClassroomRows[0][z][y].Blank += ClassroomRows[i][z][y].Blank
                }
              }
            }
           
          
          for(var i = 0; i < ClassroomRows.length; i++){
            for(var y = 0; y < ClassroomRows[0][i].length; y++){
              ClassroomRows[0][i][y].Percent = Math.round(ClassroomRows[0][i][y].Right / (ClassroomRows[0][i][y].Right+ClassroomRows[0][i][y].Wrong +ClassroomRows[0][i][y].Blank)*100)
            }
          }
         
         
          setMathrowsGlobalClassroom(ClassroomRows[0][0])
          setVerbalrowsGlobalClassroom(ClassroomRows[0][1])
          return(ClassroomRows)
        }
        //}, 1000)

       
      }
      else{

       
      }
      
    });
  
}
  //Placeholder Data
  

  /*
  Loop thorugh students
  */

  useEffect(()=>{
    if(PullStudentDataDone == true){
      FindPercentageCorrectRows(dataTotal)
          SetLineData(dataTotal)
          CreateRows(dataTotal)
          
    }
  },[PullStudentDataDone])

  
  useEffect(()=>{

    if(PullStudentDataDone == true){
    FindPercentageCorrectRows(dataTotal)
          SetLineData(dataTotal)
          CreateRows(dataTotal)
    }
  },[dataTotal])




  function LoopThroughStudents(studentsArr, Test = 'SAT'){
    var RowsTotal= []
    
    for(var i = 0; i<studentsArr.length; i++){
      var RowsTemp  =  PullStudentData(studentsArr[i] , 100,studentsArr.length, Test )
     
      RowsTotal.push(RowsTemp)
     
    }

    
    
  }
 
  //var LoopStudentsDone = false
 
  const [LoopStudentsDone, setLoopStudentsDone] =useState(false)
  
  const [NumUseEffect1, setNumUseEffect1] = useState(0)
 
  useEffect(()=>{
    
   
    
    if(ClassroomRows.length == 0){
      if(NumUseEffect1 > 0){
        if(ClassroomTest == 'SAT'){
          var Arr = []
         
          for(var i = 0; i<ClassroomStudents[0].length; i++){
            Arr.push(ClassroomStudents[0][i].stringValue)
  
          }
        

          LoopThroughStudents(Arr, ClassroomTest)
        }
        else if(ClassroomTest == 'ACT'){
          var Arr = []

          for(var i = 0; i<ClassroomStudentsACT[0].length; i++){
            Arr.push(ClassroomStudentsACT[0][i].stringValue)
            
          }
       

          LoopThroughStudents(Arr, ClassroomTest)
        }
      }
    }
    setNumUseEffect1(NumUseEffect1 + 1)
  },[ClassroomRows])

  function ClassroomTestChange(ClassroomTest){
    setClassroomRows([])
    setClassroomTest(ClassroomTest)
  
  }



  useEffect(()=>{
   
    if((ClassroomStudents !== [] && ClassroomStudentsACT !== [])  && (CurrentTest !== null) && (LoopStudentsDone == false) && (CurrentStudent !== '') ){
      var Arr = []

      try{
        if(ClassroomTest == 'SAT'){
          
          for(var i = 0; i<ClassroomStudents[0].length; i++){
            Arr.push(ClassroomStudents[0][i].stringValue)
         
          }
         

          LoopThroughStudents(Arr, ClassroomTest)
          setLoopStudentsDone(true)
        }
        else if(ClassroomTest == 'ACT'){
         
          for(var i = 0; i<ClassroomStudentsACT[0].length; i++){
            Arr.push(ClassroomStudentsACT[0][i].stringValue)
        
          }
          

          LoopThroughStudents(Arr, ClassroomTest)
          setLoopStudentsDone(true)
        }
      }catch(err){

      }
    }
  },[ClassroomStudents, CurrentTest, CurrentStudent, ClassroomStudentsACT])
























  
  useEffect(()=>{

      setTriSwitchSpreadSheetValues(TriSwitchSpreadSheetValues+1 )
      
      if(TriSwitchSpreadSheetValues>=1){
      
      const delayDebounceFn = setTimeout(() => {
        var TempArr = []
        for(var i = 0; i < data.length; i++){
          TempArr.push(data[i][5].value)
          
        }
        TempArr = TempArr.map(v => v === undefined ? '' : v);
        TempArr = Array.from(TempArr, v => v === undefined ? '' : v);
        //setStudentAnswerData(TempArr)
 
        //Probably want to change this
        var TempArrAddition = TempArr.slice(1,155)
        
        var dataTotalCopy = dataTotal
        var dataTotalLength = dataTotal.length
        var X = CurrentTestNumber-1
        var Tempper = []
        var j = 1
        for(var i= 0; i<dataTotalLength; i++){
          if(i >=1+154*X && i<(1+154*(X+1))){
            Tempper[i] = [
              {value: dataTotalCopy[i][0].value},
              {value: dataTotalCopy[i][1].value},
              {value: dataTotalCopy[i][2].value},
              {value: dataTotalCopy[i][3].value},
              {value: dataTotalCopy[i][4].value},
              {value: TempArr[j]},
              {value: dataTotalCopy[i][6].value},
              {value: dataTotalCopy[i][7].value},
            ]
            j = j+1
            
          }
          else{
            Tempper[i] = dataTotalCopy[i]
          }
        }
       
     
        setDataTotal(Tempper)
        UpdateStudentData(TempArr, CurrentTestNumber)
   
        
      }, 5000)
      return () => clearTimeout(delayDebounceFn)
      }
    
  },[data])

  var DiagnosticsCorrectAnswers = "##################C#J#B#J#D#J#B#H#B#H#A#H#A#G#A#J#A#H#D#G#C#F#C#J#B#G#C#J#A#G#A#H#C#H#D#J#####################################K#D#J#A#F#E#G#E#H#D#G#E#H#C#H#B#K#D#F#E#J#C#F#D#K#A#J#D#G#E##########################D#F#B#G#D#G#C#H#B#J#B#F#C#J#A#J#B#G#C#F#########################B#G#A#H#D#J#A#G#C#J#B#J#A#F#B#G#C#J#B###################C#D#B#B#C#A#C#D#A#D#C#D#A#D#C#B#B#A#D#B#B################################B#D#C#A#D#A#D#B#B#A#B#D#A#C#C#D#C#A#D#A#C#B#################C#C#B#A#D#D#D#A#C#B#2#56#3####################D#A#A#D#C#A#B#C#C#B#D#A#C#80#10#0.8#863####"
  var DiagnosticsCorrectAnswersArr = DiagnosticsCorrectAnswers.split('#')
  function CompareAnswers(a,b){
    if(a.toLowerCase() == b.toLowerCase()){
      return(1)
    }
    else{
      return(0)
    }
  }
  const [DiagnosticsNumCorrect, setDiagnosticsNumCorrect] = useState([])
  function DiagnosticsAnswersMultiplier(CorrectAnswersArr){
 
    CorrectAnswersArr[0] = Math.round(CorrectAnswersArr[0] * 2.08)
    CorrectAnswersArr[1] = Math.round(CorrectAnswersArr[1] * 2)
    CorrectAnswersArr[2] = Math.round(CorrectAnswersArr[2] * 2)
    CorrectAnswersArr[3] = Math.round(CorrectAnswersArr[3] * 2.1)
    CorrectAnswersArr[4] = Math.round(CorrectAnswersArr[4] * 2.363)
    CorrectAnswersArr[5] = Math.round(CorrectAnswersArr[5] * 2)
    CorrectAnswersArr[6] = Math.round(CorrectAnswersArr[6] * 1.5384)
    CorrectAnswersArr[7] = Math.round(CorrectAnswersArr[7] * 2.2359)
    CorrectAnswersArr[6] = CorrectAnswersArr[6] + CorrectAnswersArr[7]
 
    return(CorrectAnswersArr)
  }
  useEffect(()=>{

    setTriSwitchSpreadSheetValuesDiagnostics(TriSwitchSpreadSheetValuesDiagnostics+1 )
    
    
    if(TriSwitchSpreadSheetValuesDiagnostics>=1){
    
    const delayDebounceFn = setTimeout(() => {
      var TempArr = []
      for(var i = 0; i < DiagnosticsTestData.length; i++){
        TempArr.push(DiagnosticsTestData[i][3].value)
        
      }
      TempArr = TempArr.map(v => v === undefined ? '' : v);
      TempArr = Array.from(TempArr, v => v === undefined ? '' : v);
      //setStudentAnswerData(TempArr)
    
      //Probably want to change this

      var arr2 = ['a','b','c','d','e','f','g','h','A','B','C','D','E','F','G','H']
      var found = TempArr.some(r=> arr2.includes(r))

      
      var CorrectAnswersArr = [0,0,0,0,0,0,0,0]
      for(var a = 0; a<DiagnosticsCorrectAnswersArr.length; a++){
       if(DiagnosticsTestData[a+1][0].value=='ACT'){
        if(DiagnosticsTestData[a+1][2].value == 'English'){
          CorrectAnswersArr[0] =  CorrectAnswersArr[0] + CompareAnswers(DiagnosticsTestData[a+1][3].value, DiagnosticsCorrectAnswersArr[a])
        }
        else if(DiagnosticsTestData[a+1][2].value == 'Math'){
          CorrectAnswersArr[1] =  CorrectAnswersArr[1] + CompareAnswers(DiagnosticsTestData[a+1][3].value, DiagnosticsCorrectAnswersArr[a])
        }
        else if(DiagnosticsTestData[a+1][2].value == 'Reading'){
          CorrectAnswersArr[2] =  CorrectAnswersArr[2] + CompareAnswers(DiagnosticsTestData[a+1][3].value, DiagnosticsCorrectAnswersArr[a])
        }
        else if(DiagnosticsTestData[a+1][2].value == 'Science'){
          CorrectAnswersArr[3] =  CorrectAnswersArr[3] + CompareAnswers(DiagnosticsTestData[a+1][3].value, DiagnosticsCorrectAnswersArr[a])
        }
       }
       else if(DiagnosticsTestData[a+1][0].value=='SAT'){
        if(DiagnosticsTestData[a+1][2].value == 'Reading'){
          CorrectAnswersArr[4] =  CorrectAnswersArr[4] + CompareAnswers(DiagnosticsTestData[a+1][3].value, DiagnosticsCorrectAnswersArr[a])
        }
        else if(DiagnosticsTestData[a+1][2].value == 'Writing'){
          CorrectAnswersArr[5] =  CorrectAnswersArr[5] + CompareAnswers(DiagnosticsTestData[a+1][3].value, DiagnosticsCorrectAnswersArr[a])
        }
        else if(DiagnosticsTestData[a+1][2].value == 'Math (NC)'){
          CorrectAnswersArr[6] =  CorrectAnswersArr[6] + CompareAnswers(DiagnosticsTestData[a+1][3].value, DiagnosticsCorrectAnswersArr[a])
        }
        else if(DiagnosticsTestData[a+1][2].value == 'Math (C)'){
          CorrectAnswersArr[7] =  CorrectAnswersArr[7] + CompareAnswers(DiagnosticsTestData[a+1][3].value, DiagnosticsCorrectAnswersArr[a])
        }
      }
      
      }
    
      
      setDiagnosticsNumCorrect(DiagnosticsAnswersMultiplier(CorrectAnswersArr))
      if(found == true){
        UpdateDiagnosticsTest(TempArr)
      }
    }, 5000)
    return () => clearTimeout(delayDebounceFn)
    }
    //PlaceholderABC
},[DiagnosticsTestData])








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


      try{
      const x = query(usersRef, where("uid", "==", FindMatchingUid())) //query(usersRef, where("id", "==", FindMatchingUid()));
      var NewArr = []
      const unsub = onSnapshot(x, (querySnapshot) => {
        try{
          var AssignmentString = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.topics.stringValue)
          if(CurrentTest == 'SAT'){
            var AssignmentArr = AssignmentString[0].split('%')
            var NewTopics = TopicsFull
          
            var TopicBools = []
            for(var i = 0; i < TopicsFull.length; i++){
              //NewTopics[i][1] = AssignmentArr[i]
              if(AssignmentArr[i].split('+')[0] == 'true'){
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
            
            setTopicsFull(NewTopics)
          }else if(CurrentTest == 'ACT'){
            var AssignmentArr = AssignmentString[0].split('%')
            var NewTopics = TopicsFullACT
      
            var TopicBools = []
            for(var i = 0; i < TopicsFullACT.length; i++){
              //NewTopics[i][1] = AssignmentArr[i]
              if(AssignmentArr[i].split('+')[0] == 'true'){
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
      
            setTopicsFullACT(NewTopics)
          }
        }catch(err){

        }
     
      });

      if(Type == 'Student' || Type == 'Parent'){

     
      
      }else if(Type == 'Tutor'){

      }
      }catch(e){
        
      }
}
  const[StudentTestAnswers, setStudentTestAnswers] = useState();
  
  



  function ChangeSpreadsheetData(index){
  
    setTriSwitchSpreadSheetValues(0)
    if(CurrentStudent !== ''){
      PullStudentData(CurrentStudent, index)
   
    }
  }
 
  const [NewAssignment, setNewAssignment] = useState('')
  const [NewQuiz, setQuiz] = useState('')
  const [NewTutorURL, setNewTutorURL] = useState('')
  const [NewStudentURL, setNewStudentURL] = useState('')

  const [NewPDFName, setNewPDFName] = useState('')
  const [NewPDFURL, setNewPDFURL] = useState('')

  const handleTitleChange = event => {
    // 👇️ update textarea value
    setNewAssignment(event.target.value);
   
  };

  const handleQuizChange = event => {
    // 👇️ update textarea value
    setQuiz(event.target.value);
   
  };

  const handleTutorURLChange = event => {
    // 👇️ update textarea value
    setNewTutorURL(event.target.value);
   
  };

  const handleStudentURLChange = event => {
    // 👇️ update textarea value
    setNewStudentURL(event.target.value);
   
  };

  const handleZoomLinkChange = event => {
    // 👇️ update textarea value
    setZoomLink(event.target.value);
   
  };

  const handlePDFLinkChange = event => {
    // 👇️ update textarea value
    setNewPDFURL(event.target.value);
   
  };

  const handlePDFNameChange = event => {
    // 👇️ update textarea value
    setNewPDFName(event.target.value);
   
  };

  const handleQuizNameChange = event => {
    // 👇️ update textarea value
    setNewQuizName(event.target.value);
   
  };

  const handleNewClassroomStudent = event =>{
    setNewClassroomStudent(event.target.value)
  }

  function SubmitAssignment(){
    var NewArr = [NewAssignment,false, StudentAssignments.length]
  
    var StudentAssignmentCopy = StudentAssignments
    StudentAssignmentCopy[StudentAssignmentCopy.length] = []

 
    StudentAssignmentCopy[StudentAssignmentCopy.length-1] = NewArr
    

 
    //Placeholder
    UpdateStudentAssignments(StudentAssignmentCopy)
    setNewAssignment('')
  }
  function SubmitAssignmentClassroom(){
    var NewArr = [NewAssignment,false, StudentAssignments.length]
  
    var StudentAssignmentCopy = StudentAssignments
    StudentAssignmentCopy[StudentAssignmentCopy.length] = []

 
    StudentAssignmentCopy[StudentAssignmentCopy.length-1] = NewArr
    

 
    //Placeholder
    if(ClassroomTest == 'SAT'){
      for(var i = 0; i<ClassroomStudentsClean.length;i++){
        UpdateStudentAssignmentsClassroom(StudentAssignmentCopy, ClassroomStudentsClean[i])
      }
    }else if(ClassroomTest == 'ACT'){
      for(var i = 0; i<ClassroomStudentsCleanACT.length;i++){
        UpdateStudentAssignmentsClassroom(StudentAssignmentCopy, ClassroomStudentsCleanACT[i])
      }
    }
  
    setNewAssignment('')
  }
  function ChangeCheck(num){
    var CurrentCheck = StudentAssignments[num][1]
    var CurrentArr = StudentAssignments
 
    if(CurrentCheck == true){
      CurrentArr[num][1] = false
      setStudentAssignments(CurrentArr)
      UpdateStudentAssignments(CurrentArr)
    }else{
      CurrentArr[num][1] = true
     
      setStudentAssignments(CurrentArr)
      UpdateStudentAssignments(CurrentArr)
    }
  }
  
  function CheckBoxMaker(){
    var lengthCB = StudentAssignments.length
    for(var i = 0; i<lengthCB; i++){
      var CurrChecked = StudentAssignments[i][1]

    }
      
  }

  useEffect(()=>{
    
  
        
        try{
        const x = query(constantsRef, where("Type", "==", "Files")) 
       
        const unsub = onSnapshot(x, (querySnapshot) => {
          var StudentString = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.Student.stringValue)
          var TutorString = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.Tutor.stringValue)
          
  
          setNewStudentURL(StudentString[0])
          setNewTutorURL(TutorString[0])
        });
  
        if(Type == 'Student' || Type == 'Parent'){
        
        }else if(Type == 'Tutor'){
  
        }
      }catch(e){

      }
  },[])

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
  const [valueTabQuiz, setValueTabQuiz] = useState(0);
  const [BinaryBool, setBinaryBool] = useState(false)
  
  const handleChangeTab = (event, newValue) => {
   
    ChangeSpreadsheetData(newValue + 1)
    setValueTab(newValue);
    setCurrentTestNumber(newValue + 1)
  };
  
  const handleChangeTabQuiz = (event, newValue) => {
  
    
    setValueTabQuiz(newValue);

  };
  

function HandleChangeTabFunction(newValue){
   
    
    //setValueTab(newValue);
    setCurrentTestNumber(newValue)
  }

  useEffect(()=>{
   
    ChangeSpreadsheetData(CurrentTestNumber)
   
    
    try{
      if(CurrentTest == 'SAT'){
        var FirstBlock = [dataTotal[0]]
      
        var NewData = (dataTotal.slice((154*(CurrentTestNumber-1)+1),(154*(CurrentTestNumber)+1)))
        for(var t = 0; t <NewData.length; t++){
          FirstBlock.push(NewData[t])
        }
        
        setData(FirstBlock)
    }else if(CurrentTest == 'ACT'){
      var FirstBlock = [dataTotal[0]]
      
      var NewData = (dataTotal.slice((215*(CurrentTestNumber-1)+1),(215*(CurrentTestNumber)+1)))
      for(var t = 0; t <NewData.length; t++){
        FirstBlock.push(NewData[t])
      }
      
      setData(FirstBlock)
    }
    }catch(e){


    }
  },[CurrentTestNumber])

  useEffect(()=>{
    
    try{
      if(CurrentTest == 'SAT'){
        var FirstBlock = [dataTotal[0]]
        
        var NewData = (dataTotal.slice((154*(CurrentTestNumber-1)+1),(154*(CurrentTestNumber)+1)))
        for(var t = 0; t <154; t++){
          FirstBlock.push(NewData[t])
        }
        
        setData(FirstBlock)
      }
      else if(CurrentTest == 'ACT'){
        var FirstBlock = [dataTotal[0]]
        
        var NewData = (dataTotal.slice((215*(CurrentTestNumber-1)+1),(215*(CurrentTestNumber)+1)))
        for(var t = 0; t <215; t++){
          FirstBlock.push(NewData[t])
        }
        
        setData(FirstBlock)
      }
      
    }catch(e){

    }
  },[AtStart])
  /* This could be called multiple times when it shouldn't
  */
  function DropDownOnChange(s, index = 1){
     
      //Pull
      var LocalCurrTest = PullTest(s)
      setCurrentStudent(s)
      //setTimeout(() => {
      PullStudentAssignments(s)
      //}, 1000)
      
    
      PullDiagnosticsData(s)
      PullDate(s)
      PullNotepad(s)
      PullSVG(s)
      PullTutorNotes(s)
      PullDoneAssignments(s)
      //PullQuizResult(s)
      PullClassDate(s)
      
      PullAllDates(s)
      setBinaryBool(!(BinaryBool))
      setNewMeetingString(s.value+'-'+UserName.toString())
      
      
  }

  useEffect(()=>{
    if(Tutor){
      PullZoomLink()
      
    }
  },[Tutor])

  const [PageSwitchStart, setPageSwitchState] = useState(0)
  useEffect(()=>{
    if(Type && CurrentTest && PageSwitchStart==0){
    setTimeout(() => {
      if(Type=='Tutor'){
        //placeholder
        setPageSwitch(0)
      }
      else if(CurrentTest == 'Diagnostics'){
        setPageSwitch(5)
      }
      else{
        setPageSwitch(1)
        
      }

      setPageSwitchState(10)
    },10)
    }
  },[Type, CurrentTest])
  //const[PageSwitchDone, setPageSwitchDone] = useState(false)
  var PageSwitchDone = false
  useEffect(()=>{
    
    if((PageSwitch == 1 || PageSwitch == 0) && (CurrentTest !== null) && (PageSwitchDone == false) && (CurrentStudent !== '')) {
      PullStudentData(CurrentStudent , 99)
      PullQuizResult(CurrentStudent)
      PullTopics(CurrentStudent)
      PageSwitchDone = true
    }
  },[PageSwitch, CurrentTest, CurrentStudent])




  function CompleteData(){
    //PlaceholderData
    console.log("CompleteData")
    console.log(data)
    var TempData = data
    if(CurrentStudent !== ''){
      for(var i = 1; i < data.length; i++){
        var StudentAnswer = data[i][5].value
        if(StudentAnswer == ''){
          TempData[i][5] = {value:'No Answer'}
        }
      }
      console.log("TempData")
      console.log(TempData)
      setData(TempData)
    }
  }
  /*
  useEffect(()=>{
    CompleteData()
  },[data])
  */
  const [DropdownStudentName, setDropdownStudentName] = useState()

  function GetDropDownNames(){
    if(StudentsTotalBool){

      
      var NewArr = []
      var StudentLength = StudentsTotalBool.length
      
      for(var i = 0; i<StudentLength; i++){
        NewArr[NewArr.length] = StudentsTotalBool[i][0]
      }
   
      
        const options = NewArr
      
        const defaultOption = 'Please Choose Student';
       
        return(<Dropdown options={options} onChange={(s)=>{setDropdownStudentName(s)}} value={defaultOption} placeholder="Select an option" />)
      }
      else{
        return(null)
      }
    
    
  }

  function GetDropDown(index = 1){

    function Remove(name){

      return({value:name.value.replace(' (SAT Class)','').replace(' (ACT Class)','')})
    }
    if(Students){
      try{
    
      var NewArr = []
      var StudentLength = Students[0].length
   
      for(var i = 0; i<StudentLength; i++){
        NewArr[NewArr.length] = Students[0][i].stringValue
      }

      try{
      for(var y = 0; y<ClassroomStudents.length;y++){
        for(var x = 0; x < NewArr.length; x++){
         
        if(ClassroomStudents[y][0].stringValue == NewArr[x]){
          NewArr[x] = NewArr[x] + ' (SAT Class)'
        }
        }
      }
      }catch(e){

      }
      try{
      for(var y = 0; y<ClassroomStudentsACT.length;y++){
        for(var x = 0; x < NewArr.length; x++){
        
        if(ClassroomStudentsACT[y][0].stringValue == NewArr[x]){
          NewArr[x] = NewArr[x] + ' (ACT Class)'
        }
        }
      }
      }catch(e){

      }
     
      
        const options = NewArr
      
        const defaultOption = 'Please Choose Your Student';
        
        

        return(<Dropdown options={options} onChange={(s)=>{DropDownOnChange(Remove(s),index)}} value={defaultOption} placeholder="Select an option" />)
    
      }
      
    catch(e){
      return(null)
    }
      
      
    }else{
      return(null)
    }
  }
  
  
  

  function UpdateTopics(){
    if(CurrentStudent !== '') {
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
    
    if(CurrentTest == 'SAT'){
      for(var i = 0; i < TopicsFull.length; i++){
        ArrString = ArrString + TopicsFull[i][1] + '+' + (TopicsFull[i][2]) + '%'
      }
    }else if(CurrentTest == 'ACT'){
      for(var i = 0; i < TopicsFullACT.length; i++){
        ArrString = ArrString + TopicsFullACT[i][1] + '+' + (TopicsFullACT[i][2]) + '%'
      }
    }
    
    updateDoc(studentDef, {
            topics: ArrString.slice(0, -1) 
          
            });
  }
  }

  function UpdateTutor(name){
    
      function FindMatchingUid(){
        //NameId
        //CurrentStudent
        
        for(var i = 0; i< NameId.length; i++){
        
          if(name == NameId[i][0]){
            return(NameId[i][1])
          }
        }
      }

      function FindMatchingName(ID){
        //NameId
        //CurrentStudent
        
        for(var i = 0; i< NameId.length; i++){
        
          if(ID == NameId[i][2]){
            return(NameId[i][0])
          }
        }
      }

      const studentDef = doc(db, "users", FindMatchingUid());

      updateDoc(studentDef, {
        Tutor: FindMatchingName(auth.currentUser.uid.toString())
      
        });
  }

  function UpdateStudents(name, func){
    if(true){
      function FindMatchingId(ID){
        //NameId
        //CurrentStudent
        
        for(var i = 0; i< NameId.length; i++){
        
          if(ID == NameId[i][2]){
            return(NameId[i][1])
          }
        }
      }
      
      
      //const x = query(usersRef, where("uid", "==", auth.currentUser.uid.toString()));
      var studentDef = doc(db, "users", FindMatchingId(auth.currentUser.uid.toString()));

      if(func == 'add'){
        updateDoc(studentDef, {
          Students: arrayUnion(name)
        
          });
      }else if (func == 'remove'){
        updateDoc(studentDef, {
          Students: arrayRemove(name)
        
          });
      }
    
    
  }
  }

  

  function ChangeTopic(name){
 
    
    if(CurrentTest == 'SAT'){
      var NewTopics = TopicsFull
      var NewTopicsBool = TopicsBool
      for(var i = 0; i<TopicsFull.length; i++){
        if(TopicsFull[i][0] == name){
          NewTopics[i][1] = !(TopicsFull[i][1])
          NewTopicsBool[i] = !(NewTopicsBool[1])
        }
      }
      //setTopics(NewTopics)
      setTopicsFull(NewTopics)
      
    }else if(CurrentTest == 'ACT'){
      var NewTopics = TopicsFullACT
      var NewTopicsBool = TopicsBool
      for(var i = 0; i<TopicsFullACT.length; i++){
        if(TopicsFullACT[i][0] == name){
          NewTopics[i][1] = !(TopicsFullACT[i][1])
          NewTopicsBool[i] = !(NewTopicsBool[1])
        }
      }
      setTopicsACT(NewTopics)
      setTopicsFullACT(NewTopics)
    }
   
    UpdateTopics()
  }

  function ChangeTopicStudentChecklist(name){
   
    
    var NewTopicsBool = StudentsTotalBool
    var TempFunc = ''
    for(var i = 0; i<StudentsTotalBool.length; i++){
      if(StudentsTotalBool[i][0] == name){
      
        NewTopicsBool[i][1] = !(NewTopicsBool[i][1])
  
        if(!(NewTopicsBool[i][1]) == true){
          TempFunc = 'remove'
        }
        else{
          TempFunc = 'add'
        }
      }
    }

    setStudentsTotalBool(NewTopicsBool)
    setTimeout(() => {
      UpdateStudents(name, TempFunc)
      UpdateTutor(name)
    }, 100)
    
  }


  function Checked(name){
    if(CurrentTest == 'SAT'){
      for(var i = 0; i<TopicsFull.length; i++){
        if(TopicsFull[i][0] == name){
          
          //return(true)
          return(TopicsFull[i][1])

        }
      }
    }else if(CurrentTest == 'ACT'){
      for(var i = 0; i<TopicsFullACT.length; i++){
        if(TopicsFullACT[i][0] == name){
          
          //return(true)
          return(TopicsFullACT[i][1])

        }
      }
    }
  }

  function CheckedStudentChecklist(name){
    
    for(var i = 0; i<StudentsTotalBool.length; i++){
      if(StudentsTotalBool[i][0] == name){
        
        //return(true)
        return(StudentsTotalBool[i][1])

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
      width:'60%',
      backgroundColor:'#526572',
      borderRadius:10,
    },
  };
  let subtitle;
  

  function openModal() {
    setIsOpen(true);
  }

  function openModalTwo() {
    setIsOpenTwo(true);
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

  function afterOpenModalTwo() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = 'black';
    subtitle.style.fontWeight = '200';
    subtitle.style.fontSize = '40px';
  }

  function closeModalTwo() {
    setIsOpenTwo(false);
  }

  function closeModalThree() {
    setIsOpenThree(false);
  }
 
  const [TempA, setTempA] = useState([true,false])

  var MathConceptsString = 'Absolute value#Expressions#Inequalities#Lines#Solving algebraic equations#Systems of equations#Word problems#Complex numbers#Constructing models#Exponents and radicals#Exponential and linear growth#Functions#Matching coefficients#Quadratics#Synthetic division#Experiment design#Mean, median, and mode#Percents#Probability#Ratio and proportion#Reading data#Scatter plots#Angles#Circles#Triangles#Trigonometry#Volume'
  var MathChapterString = '20#6#11#14/15#null#10#12#19#7#1#3#16#9#17#18#28#27#2#26#5#25#28#21#23#22#24#29'
  var VerbalConceptsString = 'Add, revise, or delete#Apostrophes#Combining and separating sentences#Diction, idioms, and register#Modification#Non-essential and essential clauses#Parallel structure#Pronoun and noun agreement#Punctuation#Sentence and paragraph order#Sentences and fragments#Shorter is better#Infographics#Transitions#Verb agreement and tense#Word pairs and comparisons#Fiction#Social Science#Natural Science#Historical Documents#Paired Passages'
  var VerbalChapterString = '1#13#7#5#18#9#17#14#NA#2#6#4#3#8#15#16#NA#NA#NA#NA#NA'
  var MathConceptsArr = MathConceptsString.split('#')
  var MathChapterArr = MathChapterString.split('#')
  var VerbalConceptsArr = VerbalConceptsString.split('#')
  var VerbalChapterArr = VerbalChapterString.split('#')




  var MathConceptsStringACT = 'Word problems#Absolute value#Expressions#Inequalities#Solving algebraic equations#Systems of equations#Complex numbers#Exponents and radicals#Numbers and Operations#Properties of numbers#Functions#Coordinate Geometry#Quadratics#Logaritms#Matrices#Sequences#Percents#Probability#Ratio and proportion#Vectors#Area and Perimeter#Angles#Circles#Triangles#Trigonometry#Volume#Ellipses#Data and Statistics'
  var MathChapterStringACT = '26#1#4#21#3#20#7#2#5#6#11#14#13#25#28#27#10#23#9#28#18#15#17#16#22#19#28#24'
  var VerbalConceptsStringACT = 'Add, revise, or delete#Apostrophes#Joining and separating sentences#Diction, idioms, and register#Modification#Non-essential and essential clauses#Parallel structure#Pronoun and noun agreement#Punctuation#Sentence and paragraph order#Sentences and fragments#Shorter is better#Transitions#Verb agreement and tense#Word pairs and comparisons#Evaluation of Purpose#Adjectives and Adverbs'
  var VerbalChapterStringACT = '18#1#3#16#12#4#13#9#5,6,7#19#2#15#17#8#11#20#10'


  var MathConceptsArrACT = MathConceptsStringACT.split('#')
  var MathChapterArrACT = MathChapterStringACT.split('#')
  var VerbalConceptsArrACT = VerbalConceptsStringACT.split('#')
  var VerbalChapterArrACT = VerbalChapterStringACT.split('#')
 
  
  
  

 

  function GetDataFromSpreadsheet(data = null, CurrTest = 0 ){
    //DataTotal
    if(CurrTest == 0){
      CurrTest = CurrentTest
    }
  
    var dataTotal = data
    var MathConceptsString = 'Absolute value#Expressions#Inequalities#Lines#Solving algebraic equations#Systems of equations#Word problems#Complex numbers#Constructing models#Exponents and radicals#Exponential and linear growth#Functions#Matching coefficients#Quadratics#Synthetic division#Experiment design#Mean, median, and mode#Percents#Probability#Ratio and proportion#Reading data#Scatter plots#Angles#Circles#Triangles#Trigonometry#Volume'
    var MathChapterString = '20#6#11#14/15#NA#10#12#19#7#1#3#16#9#17#18#28#27#2#26#5#25#28#21#23#22#24#29'
    var VerbalConceptsString = 'Add, revise, or delete#Apostrophes#Combining and separating sentences#Diction, idioms, and register#Modification#Non-essential and essential clauses#Parallel structure#Pronoun and noun agreement#Punctuation#Sentence and paragraph order#Sentences and fragments#Shorter is better#Infographics#Transitions#Verb agreement and tense#Word pairs and comparisons#Fiction#Social Science#Natural Science#Historical Documents#Paired Passages'
    var VerbalChapterString = '1#13#7#5#18#9#17#14#NA#2#6#4#3#8#15#16#NA#NA#NA#NA#NA'
    
    var MathConceptsArr = MathConceptsString.split('#')
    var MathChapterArr = MathChapterString.split('#')
    var VerbalConceptsArr = VerbalConceptsString.split('#')
    var VerbalChapterArr = VerbalChapterString.split('#')


    var MathConceptsStringACT = 'Word problems#Absolute value#Expressions#Inequalities#Solving algebraic equations#Systems of equations#Complex numbers#Exponents and radicals#Numbers and Operations#Properties of numbers#Functions#Coordinate Geometry#Quadratics#Logaritms#Matrices#Sequences#Percents#Probability#Ratio and proportion#Vectors#Area and Perimeter#Angles#Circles#Triangles#Trigonometry#Volume#Ellipses#Data and Statistics'
    var MathChapterStringACT = '26#1#4#21#3#20#7#2#5#6#11#14#13#25#28#27#10#23#9#28#18#15#17#16#22#19#28#24'
    var VerbalConceptsStringACT = 'Add, revise, or delete#Apostrophes#Joining and separating sentences#Diction, idioms, and register#Modification#Non-essential and essential clauses#Parallel structure#Pronoun and noun agreement#Punctuation#Sentence and paragraph order#Sentences and fragments#Shorter is better#Transitions#Verb agreement and tense#Word pairs and comparisons#Evaluation of Purpose#Adjectives and Adverbs'
    var VerbalChapterStringACT = '18#1#3#16#12#4#13#9#5,6,7#19#2#15#17#8#11#20#10'
  
  
    var MathConceptsArrACT = MathConceptsStringACT.split('#')
    var MathChapterArrACT = MathChapterStringACT.split('#')
    var VerbalConceptsArrACT = VerbalConceptsStringACT.split('#')
    var VerbalChapterArrACT = VerbalChapterStringACT.split('#')

    
    if(CurrTest == 'SAT'){
        var MathArr = []
        var VerbalArr = []

        for(var i = 0; i < MathConceptsArr.length; i++){
          var TempArr = [MathConceptsArr[i], MathChapterArr[i], 0 , 0, 0, '0']
          MathArr.push(TempArr)
        }

        for(var i = 0; i < VerbalConceptsArr.length; i++){
          var TempArr = [VerbalConceptsArr[i], VerbalChapterArr[i], 0 , 0, 0, '0']
          VerbalArr.push(TempArr)
        }
      }
    else if(CurrTest == 'ACT'){
      var MathArr = []
      var VerbalArr = []
      
      for(var i = 0; i < MathConceptsArrACT.length; i++){
        var TempArr = [MathConceptsArrACT[i], MathChapterArrACT[i], 0 , 0, 0, '0']
        MathArr.push(TempArr)
      
      }

      for(var i = 0; i < VerbalConceptsArrACT.length; i++){
        var TempArr = [VerbalConceptsArrACT[i], VerbalChapterArrACT[i], 0 , 0, 0, '0']
        VerbalArr.push(TempArr)
      }
      
    }
 
    var TempDetailArr = []
    var TempOutcomeArr = []
    var TempStudentAnswersArr = []
    var TempCorrectAnswersArr = []
    function Multiplier(){
     
      if(StandardizedTestsDone.length == 0 ){
        return(0)
      }
      else{
        return(10/StandardizedTestsDone.length)
      }
    }
    function NoMoreThan100(num){
      if(num>100){
        return(100)
      }else{
        return(num)
      }
    }
    for(var i = 0; i < dataTotal.length; i++){
     
      TempDetailArr.push(dataTotal[i][4].value)
      TempStudentAnswersArr.push(dataTotal[i][5].value)
      TempCorrectAnswersArr.push(dataTotal[i][6].value)
      var TempOutcome = ''

      if(dataTotal[i][5].value.toString() == 'X' || dataTotal[i][5].value.toString() == 'x'){
        TempOutcomeArr.push('Blank')
        TempOutcome = 'Blank'
      }
      else if(dataTotal[i][5].value.toString().toLowerCase() == dataTotal[i][6].value.toString().toLowerCase()){
        TempOutcomeArr.push('Correct')
        TempOutcome = 'Correct'
      }
      else{
        TempOutcomeArr.push('Incorrect')
        TempOutcome = 'Incorrect'
      }
     
      for(var y = 0; y < MathArr.length; y++){
   
      
        if(dataTotal[i][4].value.toString().replaceAll(/ *\([^)]*\) */g, "").replaceAll(/[0-9]/g, '').replaceAll(' ','').toLowerCase() == MathArr[y][0].replaceAll(' ','').toLowerCase() ){
       
          if(TempOutcome == 'Blank'){
            MathArr[y][4] = MathArr[y][4] + 1
          }
          if(TempOutcome == 'Correct'){
            MathArr[y][2] = MathArr[y][2] + 1
          }
          if(TempOutcome == 'Incorrect'){
            MathArr[y][3] = MathArr[y][3] + 1
          }
          //Get percent correct
          MathArr[y][5] = NoMoreThan100(Math.round((MathArr[y][2] / ( MathArr[y][4] + MathArr[y][2] + MathArr[y][3])) *100 *Multiplier())).toString()

          
        
        }
      }

      for(var y = 0; y < VerbalArr.length; y++){
        if(dataTotal[i][4].value.toString().replaceAll(/ *\([^)]*\) */g, "").replaceAll(/[0-9]/g, '').replaceAll(' ','').toLowerCase() == VerbalArr[y][0].replaceAll(' ','').toLowerCase()){
       
          if(TempOutcome == 'Blank'){
            VerbalArr[y][4] = VerbalArr[y][4] + 1
          }
          if(TempOutcome == 'Correct'){
            VerbalArr[y][2] = VerbalArr[y][2] + 1
          }
          if(TempOutcome == 'Incorrect'){
            VerbalArr[y][3] = VerbalArr[y][3] + 1
          }
          //Get percent correct
          VerbalArr[y][5] = NoMoreThan100(Math.round((VerbalArr[y][2] / ( VerbalArr[y][4] + VerbalArr[y][2] + VerbalArr[y][3])) *100 * Multiplier())).toString()
     
        }
      }

      
    }
    
    //TempOutcomeArr
    var NumCorrect = 0
    var ArrCorrectTotal = []
    var ArrCorrect = []
    var TotalTestNumConst = 154
    if(CurrTest == 'ACT'){
      TotalTestNumConst = 215
    }

   
    if(CurrTest == 'SAT'){
    for(var i = 1; i< 11; i++){
      for(var x = (154*(i-1))-1; x<TempOutcomeArr.length; x++){
        if(TempOutcomeArr[x] == 'Correct'){
          NumCorrect = NumCorrect + 1
        }
        if(x == ((52)-1)+(154*(i-1))-1){
          ArrCorrect.push(NumCorrect)
          NumCorrect = 0
        }
        if(x == (((52+ 44))-1)+(154*(i-1))-1){
          ArrCorrect.push(NumCorrect)
          NumCorrect = 0
        }
        if(x == (154*i)-1){
          ArrCorrect.push(NumCorrect)
          NumCorrect = 0
          break
        }
      }
      ArrCorrectTotal.push(ArrCorrect)
      ArrCorrect = []
    }
    }else if (CurrTest == 'ACT'){
    for(var i = 1; i< 11; i++){
      for(var x = (215*(i-1))-1; x<TempOutcomeArr.length; x++){
        if(TempOutcomeArr[x] == 'Correct'){
          NumCorrect = NumCorrect + 1
        }
        if(x == ((75)-1)+(215*(i-1))-1){
          ArrCorrect.push(NumCorrect)
          NumCorrect = 0
        }
        if(x == (((75+ 60))-1)+(215*(i-1))-1){
          ArrCorrect.push(NumCorrect)
          NumCorrect = 0
        }
        if(x == (((75+ 60+40))-1)+(215*(i-1))-1){
          ArrCorrect.push(NumCorrect)
          NumCorrect = 0
        }
        if(x == (215*i)-1){
          ArrCorrect.push(NumCorrect)
          NumCorrect = 0
          break
        }
      }
      ArrCorrectTotal.push(ArrCorrect)
      ArrCorrect = []
      }
    }


    //if 1 then get the math details
    //if 2 then get the verbal details
    //if 3 then get the overall details
    return([MathArr, VerbalArr, ArrCorrectTotal])
  }

  function createData(Category, Chapter ,Right, Wrong, Blank, Percent) {
    return { Category,Chapter , Right,  Wrong, Blank, Percent};
  }

  function GetSATScores(data){
    //numCorrect = [ReadingScore, WritingScore, MathScore]
    var numCorrect = GetDataFromSpreadsheet(data)[2]
    var EnglishArr = []
    var MathArr = []
    var TotalArr = []
    for(var i = 0; i< numCorrect.length; i++){

      var readingRawScore = numCorrect[i][0]
      var writingRawScore = numCorrect[i][1]
      var mathRawScore = numCorrect[i][2]
              
      var readingSAT = [10,10,10,11,12,13,14,15,16,16,17,18,18,19,20,20,21,21,22,22,23,23,23,24,24,25,25,26,26,27,27,28,28,28,29,29,30,30,31,31,32,32,33,33,34,35,35,36,37,38,39,39,40,40]
                
      var writingSAT = [10,10,10,10,11,12,13,14,15,16,16,17,18,19,19,20,21,22,23,23,24,24,25,26,26,27,27,28,29,29,30,31,31,32,32,33,33,34,35,36,37,37,38,39,40,40]
      var mathSAT = [200,200,210,230,250,270,280,300,320,340,350,360,370,390,410,420,430,450,460,470,480,490,500,510,520,530,540,550,560,570,580,590,600,600,610,620,630,640,650,660,670,680,690,700,710,710,720,730,730,740,750,750,760,770,780,790,790,800,800,800]
                
      var english = (readingSAT[readingRawScore] + writingSAT[writingRawScore]) * 10
      var math = mathSAT[mathRawScore]
      var finalScore = english + math

      TotalArr.push(finalScore)
      MathArr.push(math)
      EnglishArr.push(english)
    }
    return([EnglishArr, MathArr, TotalArr])
  }

  function GetSATDiagnostics(numCorrect){

    var readingRawScore = numCorrect[4]
    var writingRawScore = numCorrect[5]
    var mathRawScore = numCorrect[6]


    var readingSAT = [10,10,10,11,12,13,14,15,16,16,17,18,18,19,20,20,21,21,22,22,23,23,23,24,24,25,25,26,26,27,27,28,28,28,29,29,30,30,31,31,32,32,33,33,34,35,35,36,37,38,39,39,40,40]
                
    var writingSAT = [10,10,10,10,11,12,13,14,15,16,16,17,18,19,19,20,21,22,23,23,24,24,25,26,26,27,27,28,29,29,30,31,31,32,32,33,33,34,35,36,37,37,38,39,40,40]
    var mathSAT = [200,200,210,230,250,270,280,300,320,340,350,360,370,390,410,420,430,450,460,470,480,490,500,510,520,530,540,550,560,570,580,590,600,600,610,620,630,640,650,660,670,680,690,700,710,710,720,730,730,740,750,750,760,770,780,790,790,800,800,800]
    
    var english = (readingSAT[readingRawScore] + writingSAT[writingRawScore]) * 10
    var math = mathSAT[mathRawScore]
    var finalScore = english + math

    return([english, math, finalScore])
  }

  function GetACTScores(data){
    //numCorrect = [ReadingScore, WritingScore, MathScore]
    var numCorrect = GetDataFromSpreadsheet(data)[2]
  
    var EnglishArr = []
    var MathArr = []
    var ReadingArr = []
    var ScienceArr = []
    var TotalArr = []
    for(var i = 0; i< numCorrect.length; i++){

      var readingRawScore = numCorrect[i][2]
      var englishRawScore = numCorrect[i][0]
      var mathRawScore = numCorrect[i][1]
      var scienceRawScore = numCorrect[i][3]
      var EnglishACT = [ 10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11,11,12,12,13,14,14,14,15,15,16,16,16,17,17,18,18,19,19,19,20,20,20,21,21,21,22,22,23,23,23,24,24,25,25,26,26,27,27,28,28,29,30,31,32,33,34,34,35,35,36,36]
      var MathACT = [10,10,10,10,10,11,11,12,12,13,13,14,14,14,15,15,15,15,16,16,16,16,16,17,17,17,18,18,19,19,20,20,21,22,22,23,23,24,24,24,25,25,26,26,27,27,28,28,29,30,30,31,32,33,34,34,35,35,36,36,36]
  
      var ReadingACT = [10,10,10,10,10,10,10,10,11,11,12,12,13,14,14,15,15,16,17,18,18,19,20,20,21,22,23,23,24,25,26,27,28,29,30,31,32,34,35,36,36]
      var ScienceACT = [10,10,10,10,10,10,10,11,12,13,14,15,16,17,17,18,19,19,20,20,21,21,22,23,23,24,24,25,25,26,27,27,28,29,30,31,33,34,35,36,36]

      var EnglishScore = EnglishACT[englishRawScore]
      var MathScore = MathACT[mathRawScore]
      var ReadingScore = ReadingACT[readingRawScore]
      var ScienceScore = ScienceACT[scienceRawScore]

      var TotalScore = Math.round((EnglishScore + MathScore + ReadingScore + ScienceScore)/4)
    
      EnglishArr.push(EnglishScore)
      MathArr.push(MathScore)
      ReadingArr.push(ReadingScore)
      ScienceArr.push(ScienceScore)
      TotalArr.push(TotalScore)
    }
    return([EnglishArr, MathArr, ReadingArr, ScienceArr, TotalArr])
  }

  function GetACTDiagnostics(numCorrect){

    var readingRawScore = numCorrect[2]
    var englishRawScore = numCorrect[0]
    var mathRawScore = numCorrect[1]
    var scienceRawScore = numCorrect[3]
    var EnglishACT = [ 10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,11,11,12,12,13,14,14,14,15,15,16,16,16,17,17,18,18,19,19,19,20,20,20,21,21,21,22,22,23,23,23,24,24,25,25,26,26,27,27,28,28,29,30,31,32,33,34,34,35,35,36,36]
    var MathACT = [10,10,10,10,10,11,11,12,12,13,13,14,14,14,15,15,15,15,16,16,16,16,16,17,17,17,18,18,19,19,20,20,21,22,22,23,23,24,24,24,25,25,26,26,27,27,28,28,29,30,30,31,32,33,34,34,35,35,36,36,36]
  
    var ReadingACT = [10,10,10,10,10,10,10,10,11,11,12,12,13,14,14,15,15,16,17,18,18,19,20,20,21,22,23,23,24,25,26,27,28,29,30,31,32,34,35,36,36]
    var ScienceACT = [10,10,10,10,10,10,10,11,12,13,14,15,16,17,17,18,19,19,20,20,21,21,22,23,23,24,24,25,25,26,27,27,28,29,30,31,33,34,35,36,36]

    var EnglishScore = EnglishACT[englishRawScore]
    var MathScore = MathACT[mathRawScore]
    var ReadingScore = ReadingACT[readingRawScore]
    var ScienceScore = ScienceACT[scienceRawScore]
    var TotalScore = Math.round((EnglishScore + MathScore + ReadingScore + ScienceScore)/4)

    return([EnglishScore, MathScore, ReadingScore,ScienceScore,TotalScore])
  }

  function FindPercentageCorrectRows(data = null, index = 0, CurrTest = 0 ){
    if(CurrTest == 0){
      CurrTest = CurrentTest
    }
   
    var Arrs = GetDataFromSpreadsheet(data, CurrTest)
   
    var Mathrows = []
    var Verbalrows = []
    if(CurrTest == 'SAT'){
      for(var i = 0; i < MathConceptsArr.length; i++){
        Mathrows.push(Arrs[0][i][5])
      }
      for(var i = 0; i < VerbalConceptsArr.length; i++){
        Verbalrows.push(Arrs[1][i][5])
      }
    
      setMathrowsGlobalPercent(Mathrows)
      setVerbalrowsGlobalPercent(Verbalrows)

      var TopicsMathX = TopicsMath
      var TopicsVerbalX = TopicsVerbal
      Mathrows.splice(4,1)
      
      
      for(var i = 0; i<Mathrows.length; i++){
        TopicsMathX[i][2] = parseInt(Mathrows[i])
      }
      for(var i = 0; i<Verbalrows.length; i++){
        TopicsVerbalX[i][2]= parseInt(Verbalrows[i])
      }
    }
    else if(CurrTest == 'ACT'){
      for(var i = 0; i < MathConceptsArrACT.length; i++){
        Mathrows.push(Arrs[0][i][5])
      }
      for(var i = 0; i < VerbalConceptsArrACT.length; i++){
        Verbalrows.push(Arrs[1][i][5])
      }

      setMathrowsGlobalPercent(Mathrows)
      setVerbalrowsGlobalPercent(Verbalrows)

      var TopicsMathX = TopicsMathACT
      var TopicsVerbalX = TopicsVerbalACT
      Mathrows.splice(4,1)
     
      
      for(var i = 0; i<Mathrows.length; i++){
        TopicsMathX[i][2] = parseInt(Mathrows[i])
      }
      for(var i = 0; i<Verbalrows.length; i++){
        TopicsVerbalX[i][2]= parseInt(Verbalrows[i])
      }
    }

    
  
    var ToSlice = []
    for(var i = 0; i<TopicsVerbalX.length; i++){
      if(TopicsVerbalX[i][2]>100){
        ToSlice.push(i)
      }
    }


    for(var i = 0; i<ToSlice.length; i++){
      TopicsVerbalX.splice(ToSlice[i]-i,1)
    }
    if(index == 100){
      return([TopicsMathX,TopicsVerbalX])
    }
    setTopicsMath(TopicsMathX)
    setTopicsVerbal(TopicsVerbalX)
    
  }

  function CreateRows(data = null, index= 0, CurrTest = 0){
    if(CurrTest == 0){
      CurrTest = CurrentTest
    }
    //const [DataRows, setDataRows] = useState()
 
    if(CurrTest == 'SAT'){
     
      var Arrs = GetDataFromSpreadsheet(data,CurrTest)
     
      var Mathrows = []
      var Verbalrows = []
      for(var i = 0; i < MathConceptsArr.length; i++){
        Mathrows.push(createData(Arrs[0][i][0], Arrs[0][i][1], Arrs[0][i][2], Arrs[0][i][3], Arrs[0][i][4], Arrs[0][i][5]))
      }
      for(var i = 0; i < VerbalConceptsArr.length; i++){
        Verbalrows.push(createData(Arrs[1][i][0], Arrs[1][i][1], Arrs[1][i][2], Arrs[1][i][3], Arrs[1][i][4], Arrs[1][i][5]))
      }

      

      if(index == 100){
        return([Mathrows,Verbalrows])
      }
      setMathrowsGlobal(Mathrows)
      setVerbalrowsGlobal(Verbalrows)
    }else if(CurrTest == 'ACT'){
  
      var Arrs = GetDataFromSpreadsheet(data,CurrTest)
    
      var Mathrows = []
      var Verbalrows = []
      for(var i = 0; i < MathConceptsArrACT.length; i++){
        Mathrows.push(createData(Arrs[0][i][0], Arrs[0][i][1], Arrs[0][i][2], Arrs[0][i][3], Arrs[0][i][4], Arrs[0][i][5]))
      }
      for(var i = 0; i < VerbalConceptsArrACT.length; i++){
        Verbalrows.push(createData(Arrs[1][i][0], Arrs[1][i][1], Arrs[1][i][2], Arrs[1][i][3], Arrs[1][i][4], Arrs[1][i][5]))
      }

      
    
      if(index == 100){
        return([Mathrows,Verbalrows])
      }
      setMathrowsGlobal(Mathrows)
      setVerbalrowsGlobal(Verbalrows)
    }
   
    
  }

  
 
 
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
  const[SATLineDataTotal, setSATLineDataTotal] = useState([
    { x: 1, y: 1},
    { x: 2, y: 1},
    { x: 3, y: 1},
    { x: 4, y: 1},
    { x: 5, y: 1},
    { x: 6, y: 1},
    { x: 7, y: 1},
    { x: 8, y: 1},
    { x: 9, y: 1},
    { x: 10, y: 1},
  ])
  const[SATLineDataMath, setSATLineDataMath] = useState([
    { x: 1, y: 1},
    { x: 2, y: 1},
    { x: 3, y: 1},
    { x: 4, y: 1},
    { x: 5, y: 1},
    { x: 6, y: 1},
    { x: 7, y: 1},
    { x: 8, y: 1},
    { x: 9, y: 1},
    { x: 10, y: 1},
  ])
  const[SATLineDataVerbal, setSATLineDataVarbal] = useState([
    { x: 1, y: 1},
    { x: 2, y: 1},
    { x: 3, y: 1},
    { x: 4, y: 1},
    { x: 5, y: 1},
    { x: 6, y: 1},
    { x: 7, y: 1},
    { x: 8, y: 1},
    { x: 9, y: 1},
    { x: 10, y: 1},
  ])


  const[ACTLineDataTotal, setACTLineDataTotal] = useState([
    { x: 1, y: 1},
    { x: 2, y: 1},
    { x: 3, y: 1},
    { x: 4, y: 1},
    { x: 5, y: 1},
    { x: 6, y: 1},
    { x: 7, y: 1},
    { x: 8, y: 1},
    { x: 9, y: 1},
    { x: 10, y: 1},
  ])
  const[ACTLineDataMath, setACTLineDataMath] = useState([
    { x: 1, y: 1},
    { x: 2, y: 1},
    { x: 3, y: 1},
    { x: 4, y: 1},
    { x: 5, y: 1},
    { x: 6, y: 1},
    { x: 7, y: 1},
    { x: 8, y: 1},
    { x: 9, y: 1},
    { x: 10, y: 1},
  ])
  const[ACTLineDataEnglish, setACTLineDataEnglish] = useState([
    { x: 1, y: 1},
    { x: 2, y: 1},
    { x: 3, y: 1},
    { x: 4, y: 1},
    { x: 5, y: 1},
    { x: 6, y: 1},
    { x: 7, y: 1},
    { x: 8, y: 1},
    { x: 9, y: 1},
    { x: 10, y: 1},
  ])
  const[ACTLineDataReading, setACTLineDataReading] = useState([
    { x: 1, y: 1},
    { x: 2, y: 1},
    { x: 3, y: 1},
    { x: 4, y: 1},
    { x: 5, y: 1},
    { x: 6, y: 1},
    { x: 7, y: 1},
    { x: 8, y: 1},
    { x: 9, y: 1},
    { x: 10, y: 1},
  ])
  const[ACTLineDataScience, setACTLineDataScience] = useState([
    { x: 1, y: 1},
    { x: 2, y: 1},
    { x: 3, y: 1},
    { x: 4, y: 1},
    { x: 5, y: 1},
    { x: 6, y: 1},
    { x: 7, y: 1},
    { x: 8, y: 1},
    { x: 9, y: 1},
    { x: 10, y: 1},
  ])

  useEffect(()=>{
    if(SATLineDataTotal){
    if(!(SATLineDataTotal.length == 0)){
      var Start = SATLineDataTotal[0].x
      var End = SATLineDataTotal.slice(0, ChangeTestLength(StandardizedTestsDone.length)).x
      var Improvement = End - Start
      //UpdateImprovement(Improvement)
    }
  }
  },[SATLineDataTotal])
  
  function SetLineData(data){
  
    if(CurrentTest == 'SAT'){
      var TempArr = GetSATScores(data)
     
      if(StandardizedTestsDone.length == 1 ){
        TempArr[0][1] = TempArr[0][0]
        TempArr[1][1] = TempArr[1][0]
        TempArr[2][1] = TempArr[2][0]
      }
      setSATLineDataTotal([
        { x: 1, y: TempArr[2][0]},
        { x: 2, y: TempArr[2][1]},
        { x: 3, y: TempArr[2][2]},
        { x: 4, y: TempArr[2][3]},
        { x: 5, y: TempArr[2][4]},
        { x: 6, y: TempArr[2][5]},
        { x: 7, y: TempArr[2][6]},
        { x: 8, y: TempArr[2][7]},
        { x: 9, y: TempArr[2][8]},
        { x: 10, y:TempArr[2][9]},
      ])
      setSATLineDataMath([
        { x: 1, y: TempArr[1][0]},
        { x: 2, y: TempArr[1][1]},
        { x: 3, y: TempArr[1][2]},
        { x: 4, y: TempArr[1][3]},
        { x: 5, y: TempArr[1][4]},
        { x: 6, y: TempArr[1][5]},
        { x: 7, y: TempArr[1][6]},
        { x: 8, y: TempArr[1][7]},
        { x: 9, y: TempArr[1][8]},
        { x: 10, y:TempArr[1][9]},
      ])
      setSATLineDataVarbal([
        { x: 1, y: TempArr[0][0]},
        { x: 2, y: TempArr[0][1]},
        { x: 3, y: TempArr[0][2]},
        { x: 4, y: TempArr[0][3]},
        { x: 5, y: TempArr[0][4]},
        { x: 6, y: TempArr[0][5]},
        { x: 7, y: TempArr[0][6]},
        { x: 8, y: TempArr[0][7]},
        { x: 9, y: TempArr[0][8]},
        { x: 10, y:TempArr[0][9]},
      ])
    }else if(CurrentTest == 'ACT'){
      var TempArr = GetACTScores(data)
  
      if(StandardizedTestsDone.length == 1 ){
        TempArr[0][1] = TempArr[0][0]
        TempArr[1][1] = TempArr[1][0]
        TempArr[2][1] = TempArr[2][0]
        TempArr[3][1] = TempArr[3][0]
        TempArr[4][1] = TempArr[4][0]

      }
     
      setACTLineDataTotal([
        { x: 1, y: TempArr[4][0]},
        { x: 2, y: TempArr[4][1]},
        { x: 3, y: TempArr[4][2]},
        { x: 4, y: TempArr[4][3]},
        { x: 5, y: TempArr[4][4]},
        { x: 6, y: TempArr[4][5]},
        { x: 7, y: TempArr[4][6]},
        { x: 8, y: TempArr[4][7]},
        { x: 9, y: TempArr[4][8]},
        { x: 10, y:TempArr[4][9]},
      ])
      setACTLineDataMath([
        { x: 1, y: TempArr[1][0]},
        { x: 2, y: TempArr[1][1]},
        { x: 3, y: TempArr[1][2]},
        { x: 4, y: TempArr[1][3]},
        { x: 5, y: TempArr[1][4]},
        { x: 6, y: TempArr[1][5]},
        { x: 7, y: TempArr[1][6]},
        { x: 8, y: TempArr[1][7]},
        { x: 9, y: TempArr[1][8]},
        { x: 10, y:TempArr[1][9]},
      ])
    
      
      setACTLineDataEnglish([
        { x: 1, y: TempArr[0][0]},
        { x: 2, y: TempArr[0][1]},
        { x: 3, y: TempArr[0][2]},
        { x: 4, y: TempArr[0][3]},
        { x: 5, y: TempArr[0][4]},
        { x: 6, y: TempArr[0][5]},
        { x: 7, y: TempArr[0][6]},
        { x: 8, y: TempArr[0][7]},
        { x: 9, y: TempArr[0][8]},
        { x: 10, y:TempArr[0][9]},
      ])
      setACTLineDataReading([
        { x: 1, y: TempArr[2][0]},
        { x: 2, y: TempArr[2][1]},
        { x: 3, y: TempArr[2][2]},
        { x: 4, y: TempArr[2][3]},
        { x: 5, y: TempArr[2][4]},
        { x: 6, y: TempArr[2][5]},
        { x: 7, y: TempArr[2][6]},
        { x: 8, y: TempArr[2][7]},
        { x: 9, y: TempArr[2][8]},
        { x: 10, y:TempArr[2][9]},
      ])
      setACTLineDataScience([
        { x: 1, y: TempArr[3][0]},
        { x: 2, y: TempArr[3][1]},
        { x: 3, y: TempArr[3][2]},
        { x: 4, y: TempArr[3][3]},
        { x: 5, y: TempArr[3][4]},
        { x: 6, y: TempArr[3][5]},
        { x: 7, y: TempArr[3][6]},
        { x: 8, y: TempArr[3][7]},
        { x: 9, y: TempArr[3][8]},
        { x: 10, y:TempArr[3][9]},
      ])
    }
    
 
    
  }
  const [DiagnosticsResults, setDiagnosticsResults] = useState([])
  
  useEffect(()=>{
    //DiagnosticsNumCorrect
  
    var Second = GetSATDiagnostics(DiagnosticsNumCorrect)
    var First = GetACTDiagnostics(DiagnosticsNumCorrect)
    var Combiend = First.concat(Second)
    
    setDiagnosticsResults(Combiend)
  },[DiagnosticsNumCorrect])

  function GetNavigation(){
    //return(null)
    function GetClassroomIcon(iconsize = 50){
      if(ClassroomStudentsClean.length >0 || ClassroomStudentsCleanACT.length > 0 ){
        return(
          <Button className={'IconDiv'} onClick={()=>setPageSwitch(3)} startIcon={<FaChalkboardTeacher size ={iconsize}/>}>
            
            <p>Classroom</p>
          </Button>
        )
      }
      else{
        return(null)
      }
    }
    if(Type == 'Tutor' && !(CurrentTest == 'Diagnostics')){
      var iconsize  = 25
      return(
        <><div className={'NavDiv'}>
          <Tooltip title="Dashboard">
            <Button className={'IconDiv'} onClick={() => {setPageSwitch(0);}} startIcon={<FaDesktop size={iconsize} />}>
              
  
              <p> Dashboard</p>
            </Button>
          </Tooltip>
          <Tooltip title="Profile">
          <Button className={'IconDiv'} onClick={() => { setPageSwitch(1); } } startIcon={<FaUser size={iconsize} />}>
            
            <p>Profile</p>
          </Button>
          </Tooltip>
          <Tooltip title="Quiz">
          <Button className={'IconDiv'} onClick={() => { setPageSwitch(2); } } startIcon ={<FaBook size={iconsize} />}>
            
            <p>Quiz</p>
          </Button>
          </Tooltip>
          <Tooltip title="Classroom">
          {GetClassroomIcon(iconsize)}
          
          </Tooltip>
          <Tooltip title="Calendar">
          <Button className={'IconDiv'} onClick={() => setPageSwitch(4)} startIcon={<FaCalendar size={iconsize} />}>
            
            <p>Calendar</p>
          </Button>
          </Tooltip>
          <Tooltip title="Whiteboard">
          <Button className={'IconDiv'} onClick={() => setPageSwitch(6)} startIcon={<FaChalkboard size={iconsize} />}>
            
            <p>Whiteboard</p>
          </Button>
          </Tooltip>


        </div><div className={'IconDivLogOffTutor'}>
            <Tooltip title = "">
            <Link
              to={menuItems[0].link}

              onClick={menuItems[0].onClick}
              key={0}
              ref={(node) => {
                links.current[0] = node;
              } }
            >
              <Button className={'IconDiv'} onClick={() => setPageSwitch(6)} startIcon={<FaPowerOff size={iconsize} color={'black'} />}>
              
              <p>Log Off</p>
              </Button>
            </Link>
            </Tooltip>
          </div></>
      )
    }
    else if(CurrentTest == 'Diagnostics' && Type == 'Tutor'){
      return(
        <><div className={'NavDiv'}>
        <Tooltip title="Dashboard">
            <Button className={'IconDiv'} onClick={() => { setPageSwitch(0); } } startIcon={<FaDesktop size={iconsize} />} >
              <p>Dashboard</p>
            </Button>
        </Tooltip>


      </div>
      
      <div className={'IconDivLogOffTutor'}>
          <Tooltip title = "">
          <Link
            to={menuItems[0].link}

            onClick={menuItems[0].onClick}
            key={0}
            ref={(node) => {
              links.current[0] = node;
            } }
          >
            <Button className={'IconDiv'} onClick={() => setPageSwitch(6)} startIcon={<FaPowerOff size={iconsize} color={'black'} />}>
              
              <p>Log Off</p>
              </Button>
          </Link>
          </Tooltip>
        </div></>
      )
    }
    else if(CurrentTest == 'Diagnostics'){
      return(
      <>
      <div  className={'NavDiv'}>
        <Tooltip title="Diagnostics">
          <Button className={'IconDiv'} onClick={() => { setPageSwitch(5); } } startIcon={<FaSchool size={iconsize} />}>
            
            <p>Diagnostics</p>
          </Button>
        </Tooltip>
          <p></p>

        </div>
        <div className={'IconDivLogOffTutor'}>
            <Tooltip title = "">
            <Link
              to={menuItems[0].link}

              onClick={menuItems[0].onClick}
              key={0}
              ref={(node) => {
                links.current[0] = node;
              } }
            >
              <Button className={'IconDiv'} onClick={() => setPageSwitch(6)} startIcon={<FaPowerOff size={iconsize} color={'black'} />}>
              
              <p>Log Off</p>
              </Button>
            </Link>
            </Tooltip>
          </div></>
      )
    }
    else{
      return(
      <><div className={'NavDiv'}>

        <Tooltip title="Profile">
          <Button className={'IconDiv'} onClick={() => { setPageSwitch(1); } } startIcon={<FaUser size={iconsize} />}>
            
            <p>Profile</p>
          </Button>
        </Tooltip>
          <p></p>
          <Tooltip title="Quiz">
          <Button className={'IconDiv'} onClick={() => { setPageSwitch(2); } } startIcon={<FaBook size={iconsize} />}>
            
            <p>Quiz</p>
          </Button>
          </Tooltip>
          <p></p>
          <Tooltip title="Diagnostics">
          <Button className={'IconDiv'} onClick={() => { setPageSwitch(5); } } startIcon ={ <FaSchool size={iconsize} />}>
           
            <p>Diagnostics</p>
          </Button>
          </Tooltip>
          <p></p>
          <Tooltip title="Whiteboard">
          <Button className={'IconDiv'} onClick={() => setPageSwitch(6)} startIcon={<FaChalkboard size={iconsize} />}>
            
            <p>Whiteboard</p>
          </Button>
          </Tooltip>

        </div><div className={'IconDivLogOffTutor'}>
            <Tooltip title = "">
            <Link
              to={menuItems[0].link}

              onClick={menuItems[0].onClick}
              key={0}
              ref={(node) => {
                links.current[0] = node;
              } }
            >
              <Button className={'IconDiv'} onClick={() => setPageSwitch(6)} startIcon={<FaPowerOff size={iconsize} color={'black'} />}>
              
              <p>Log Off</p>
              </Button>
            </Link>
            </Tooltip>
          </div></>
          
        
      )
    }
  }
  function AddErrorMessgae(){
    if(CurrentTest == 'Diagnostics'){
      return(
        <p className= "Error">Must select test before continuing.</p>
      )
    }
  }
  function AddWelcome(){
    if(Type == 'Student'){
      return(<>
      <p  className={'TitleTextStyle'}>Welcome to your Dashboard {UserName.toString().split(' ')[0]}</p>
     
      </>
      )
      
    }
    else if(Type == 'Parent'){
      //ParentStudentName
      return(
        <>
      <p  className={'TitleTextStyle'}>Welcome to {UserName.toString().split(' ')[0]}'s Dashboard {ParentStudentName.toString().split(' ')[0]}</p>
     
      </>
      )
    }
  }
  /*
  <Button className={'IconDivLogOff'}>
          <FaPowerOff size = {50}/>
        </Button>
  */
 
  /*
 <Button onClick={()=>{openModalTwo()}} className={''} title={'Files'}>
            <FaFileDownload size ={40}/>
          </Button>
  */
  const [ShowOrHideAnswers, setShowOrHideAnswers] = useState('Hide')
  const [SpreadsheetUpdate, setSpreadsheetUpdate] = useState()
  const [PlusButtonUpdate, setPlusButtonUpdate] = useState(<Button className="PlusDiv" onClick={()=>AddLine()}><p className='PlusStyle'>+</p></Button>)


  //Whiteboard Vals

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isEraser, setisEraser] = useState(false)
  const [penColor, setPenColor] = useState('black')
  const [penSize, setPenSize] = useState(5)
  const [currPDF, setcurrPDF] = useState('')
  const [showPDF, setshowPDF] = useState(false)
  const [whiteboardStyle, setwhiteboardStyle] = useState('sketchDivOutside')
  const [showCalculator, setshowCalculator] = useState(false)


  useEffect(()=>{
    if(FormatLink() == null){
      setwhiteboardStyle('sketchDivOutside')
      
      
    }
    else{
      setwhiteboardStyle('sketchDivOutsideSmall')
      
  }
  },[currPDF])

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }





  function OppositeShowOrHide(){
    if(ShowOrHideAnswers == 'Hide'){
      return('Show/Change')
    }
    else{
      return('Hide')
    }
  }

  function ShowOrHide(){
    if(ShowOrHideAnswers == 'Hide'){
      setShowOrHideAnswers('Show')
      setSpreadsheetUpdate(<Spreadsheet data={dataAssignments} onChange={setDataAssignments} darkMode= {false}/>)
    }
    else{
      setShowOrHideAnswers('Hide')
      setSpreadsheetUpdate(null)
    }
  }

  function ShowPlusButton(){
    if(ShowOrHideAnswers == 'Show' && Type=='Tutor'){
      return(<Button className="PlusDiv" onClick={()=>AddLine()}><p className='PlusStyle'>+</p></Button>)
    }else{
      return(null)
    }
  }


  var UpdateQuizSpreadsheetNum = 0
  useEffect(()=>{
    if(UpdateQuizSpreadsheetNum>0){
      setTimeout(()=>{
      
        if(Type=='Tutor'){
          setSpreadsheetUpdate(<Spreadsheet data={dataAssignments} onChange={setDataAssignments} darkMode= {false}/>)
          }
        var Arr = []
        var Dict = {}
        var Num = 0
        for(var i = 0; i< dataAssignments.length; i++){
          Dict = dataAssignments[i][0].value
        
          Arr.push(Dict)
          Num = Num + 1
        }

        
        UpdateQuizAnswers(Arr)
      }, 1000)
    }
    UpdateQuizSpreadsheetNum = UpdateQuizSpreadsheetNum +1
    },[dataAssignments])
  
  useEffect(()=>{
    if(QuizData ){
      
      
      var TotalData = []
 
      if(true){
 
        var NewData = []
        for(var i = 0; i< QuizData[0]['Answers'].arrayValue.values.length; i++){
          NewData = [{value:QuizData[0]['Answers'].arrayValue.values[i].stringValue}]
          TotalData.push(NewData)
        }
      
        setDataAssignments(TotalData)
      }
    }
  },[QuizData])
  
  function AddLine(){
    //setStudentAnswerData
  

    var NewLine = [{value:''}]
    var TempDA = dataAssignments

    var TD = dataAssignments.concat([NewLine])
  

    setDataAssignments(TD)
  }

 
  const [dropdownDone, setdropdownDone] = useState(false)
  useEffect(()=>{

    if(UserName && Type){
      if(Type == 'Student' || Type == 'Parent'){

        if(NewArrFinished == true && dropdownDone == false){
    
            //setPageSwitch(1)
            try{
              setTimeout(() => {
                DropDownOnChange({value:UserName.toString() })
                setdropdownDone(true)
              }, 1000)
            }catch(e){
              console.log("Student not found")
              setErrorScreenOn(true)
            }
          }
      }
    }
  },[UserName, Type,NewArrFinished])

  const [CurrentTestDone, setCurrentTestDone] = useState(0)
  useEffect(()=>{
    if(CurrentTestDone !== 0){
      setCurrentTest(UpdatedCurrentTest)
      UpdateCurrentTest(UpdatedCurrentTest)
    }
    setCurrentTestDone(10)
  },[UpdatedCurrentTest])
  
  
  
  function GetStudentChecklist(){

    function DoesStudentHaveTutor(student){
      //AdminInfo
      console.log('DoesStudentHaveTutor')
      
      for(var i = 0; i<AdminInfo.length; i++){
        
        if(AdminInfo[0][i] == student){
          if(AdminInfo[1][i] !== '' && AdminInfo[1][i] !== UserName.toString()){
            console.log(AdminInfo[1][i])
            
            console.log("Returiniong false")
            return(true)
          }
          else{
            return(false)
          }
        }
      }
    }
    if(AddStudentBinary){
      return(
        <FormGroup>
          
            {
              
              StudentsTotal.map(obj=>{
                return(
                <>
              

                <FormControlLabel control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} style={{color:"black"}} labelStyle={{color:"black"}} checked= {CheckedStudentChecklist(obj)}  onChange={()=>ChangeTopicStudentChecklist(obj)}/>} label={obj} disabled={DoesStudentHaveTutor(obj)} />

                </>
                )
              })
            }    
          
          </FormGroup>
      )
    }else{
      return(
        null
      )
    }
  }

  function SwitchButton(){
    if(AddStudentBinary){
      return("Done")
    }
    else{
      return("Add Student")
    }
  }
  
  function GetMasterStudentDropDown(index = 1){
    function Remove(name){

      return({value:name.value.replace(' (SAT Class)','').replace(' (ACT Class)','')})
    }
    if(Students && StudentsTotal){
     
      var NewArr = StudentsTotal
      

      for(var y = 0; y<ClassroomStudents.length;y++){
        for(var x = 0; x < NewArr.length; x++){
         
        if(ClassroomStudents[y][0].stringValue == NewArr[x]){
          NewArr[x] = NewArr[x] + ' (SAT Class)'
        }
        }
      }

      for(var y = 0; y<ClassroomStudentsACT.length;y++){
        for(var x = 0; x < NewArr.length; x++){
        
        if(ClassroomStudentsACT[y][0].stringValue == NewArr[x]){
          NewArr[x] = NewArr[x] + ' (ACT Class)'
        }
        }
      }


      
        const options = NewArr
      
        const defaultOption = 'Please Choose Student';
       
        

        return(<Dropdown options={options} onChange={(s)=>{DropDownOnChange(Remove(s),index)}} value={defaultOption} placeholder="Select an option" />)
      }
      else{
        return(null)
      }
    
  }
  const [DropdownSwitch, setDropdownSwitch] = useState(false)

  function GetMasterButton(){
    if(AdminBool == true){
      if(DropdownSwitch == false){
      return(<div className="MasterButton">
        <Button variant="outlined" color="black" onClick={()=>{setDropdownSwitch(!(DropdownSwitch))}}>
          Show All Students
        </Button>
        </div>
      )
      }else{
        return(
          <div className="MasterButton">
          <Button variant="outlined" color="black" onClick={()=>{setDropdownSwitch(!(DropdownSwitch))}}>
            Show Your Students
          </Button>
          </div>
        )
      }
    }
  }

  function SwitchDropdowns(){
    //Add CompanyCode's
    if(AdminBool == true && DropdownSwitch == true){
      
      return(
        GetMasterStudentDropDown()
      )
    }else{
      return(
        GetDropDown()
      )
    }
  }

  function DeleteRecordFromFirebase(userName){
    function FindMatchingUid(){
      //NameId
      //CurrentStudent
      
      for(var i = 0; i< NameId.length; i++){
      
        if(userName == NameId[i][0]){
          return(NameId[i][1])
        }
      }
    }

    const studentDef = doc(db, "users", FindMatchingUid());
    setTimeout(() => {
      deleteDoc(doc(db, "users", studentDef));
    }, 500);
  }

  function UpdateFilesStudent(url){

    const Def = doc(db, "GlobalVariables", "FilesUrl");
    updateDoc(Def, {
      Student: url
    
      });
  }

  function UpdateFilesTutor(url){

    const Def = doc(db, "GlobalVariables", "FilesUrl");
    updateDoc(Def, {
      Tutor: url
    
      });
  }

  function UpdateFiles(){
    UpdateFilesTutor(NewTutorURL)
    UpdateFilesStudent(NewStudentURL)
  }

  function FrontPageIsTutor(){
    
    function createData(Tutor, Student, NextMeeting, Email,ParentInfo, Phone) {
      return { Tutor, Student, NextMeeting, Email,ParentInfo,Phone };
    }

    function createParentData(Parent, Student,  Email, Phone) {
      return { Parent, Student, Email, Phone };
    }

    function createTutorData(Name, Email, Phone) {
      return { Name, Email, Phone };
    }
    function showAlert(CurrStudent) {
      if ( window.confirm("Are you sure you want to proceed with deleting?")) {
        // Your code to be executed after confirming
        DeleteRecordFromFirebase(CurrStudent);
      }
    }
    function getDotColor(dateString) {
      const date = new Date(dateString);
      const now = new Date();
      const twoWeeksAgo = new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000);
      
      let color;
      if (date > now) {
        color = "green";
      } else if (date > twoWeeksAgo) {
        color = "yellow";
      } else {
        color = "red";
      }
      
      return  color
    }

    function FindParents(StudentName){
   
      for(var x = 0; x < AdminInfoParent.length; x++){
        if(AdminInfoParent[x][0] == StudentName){
          return(createParentData(AdminInfoParent[2][x], AdminInfoParent[0][x], AdminInfoParent[1][x], AdminInfoParent[3][x]))
        }
      }
    }
    var rows = [
      
    ];

    var rowsTutor = [
      
    ];

    function humanReadableDate(datetime) {
      const date = new Date(datetime);
      const options = { year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "numeric" };
      return date.toLocaleDateString("en-US", options);
    }
    
    //AdminInfoParent


    if(AdminInfo !== null &&  AdminInfoParent !== null){
      for(var x = 0; x < AdminInfo.length; x++){
        rows.push(createData(AdminInfo[1][x], AdminInfo[0][x], humanReadableDate(AdminInfo[2][x]), AdminInfo[3][x], [FindParents(AdminInfo[0][x])], AdminInfo[4][x]))
      }
    }

    if(AdminInfoTutor !== null ){
      console.log("AdminInfoTutor", AdminInfoTutor)
      for(var x = 0; x < AdminInfoTutor.length-1; x++){
        rowsTutor.push(createTutorData(AdminInfoTutor[0][x], AdminInfoTutor[1][x], AdminInfoTutor[2][x]))
      }
    }
    
    function IsAdmin(){
    
    function ShowParent(row){

      if(row.ParentInfo[0] !== undefined){
   
        return(
          <Box sx={{ margin: 1 }}>
                  
                    <Table size="small"  aria-label="expand row">
                      <TableHead>
                        <TableRow>
                          <TableCell><b>Parent's Name</b></TableCell>
                          <TableCell><b>Email</b></TableCell>
                          <TableCell><b>Phone</b></TableCell>
                          
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {row.ParentInfo.map((parentInfo) => (
                          <TableRow key={parentInfo.Parent}>
                            <TableCell component="th" scope="row">
                              {parentInfo.Parent}
                            </TableCell>
                            <TableCell > {parentInfo.Email} <Button variant="text" color="black" onClick={()=>{window.open('mailto:'+parentInfo.Email)}}>  <FaEnvelope iconsize={35}/></Button></TableCell>
                            <TableCell > {parentInfo.Phone} <Button variant="text" color="black" onClick={()=>{window.open('tel:'+parentInfo.Phone)}}>  <FaPhone iconsize={35}/></Button></TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Box>
        )
      }
      else{
        return(null)
      }
    }
    function Row(props) {
    
        const { row } = props;
        const [open, setOpen] = React.useState(false);
      
        return (
          <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
              <TableCell>
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => setOpen(!open)}
                >
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </TableCell>
             
                
                  <TableCell component="th" scope="row">
                    {row.Student}
                  </TableCell>
                  <TableCell align="right">{row.Tutor}</TableCell>
                  <TableCell align="right">{row.NextMeeting} <span style={{display: "inline-block",width: "10px",height: "10px",borderRadius: "5px",backgroundColor: getDotColor()}}></span> </TableCell>
                 
                  <TableCell align="right"> {row.Email} <Button variant="text" color="black" onClick={()=>{window.open('mailto:'+row.Email)}}>  <FaEnvelope iconsize={35}/></Button></TableCell>
                  <TableCell align="right"> {row.Phone} <Button variant="text" color="black" onClick={()=>{window.open('tel:'+row.Phone)}}>  <FaPhone iconsize={35}/></Button></TableCell>
                  <TableCell> <Button variant="text" color="black" onClick={()=>{showAlert(row.Student)}}>  <FaTimes iconsize={35}/></Button></TableCell>
                </TableRow>
           
            <TableRow>
              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  {ShowParent(row)}
                </Collapse>
              </TableCell>
            </TableRow>
          </React.Fragment>
        );
      }

      if(AdminBool == true){
        return(
          <>
          <p className="TextStyleLight">Students/Parents:</p>
          <p className="TextStyleLight"> </p>
          <div className="MaxHeightDivLarge">
          <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell></TableCell>
                <TableCell>Student</TableCell>
                <TableCell align="right">Tutor</TableCell>
                <TableCell align="right">Next Meeting Time</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Phone</TableCell>
                <TableCell align="right">Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                
                <Row key={row.name} row={row} />
               
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        </div>
        <p className="TextStyleLight">Tutors:</p>
        <p className="TextStyleLight"> </p>
        <div className="MaxHeightDivLarge">
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowsTutor.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.Name}
                </TableCell>
                <TableCell align="right"> {row.Email} <Button variant="text" color="black" onClick={()=>{window.open('mailto:'+row.Email)}}>  <FaEnvelope iconsize={35}/></Button></TableCell>
                
                <TableCell align="right"> {row.Phone} <Button variant="text" color="black" onClick={()=>{window.open('tel:'+row.Phone)}}>  <FaPhone iconsize={35}/></Button></TableCell>
                <TableCell align="right"> <Button variant="text" color="black" onClick={()=>{showAlert(row.Name) }}>  <FaTimes iconsize={35}/></Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>


      <div>
        <p className="TextStyleLight">Files:</p>
        <p className="TextStyleLightInstructions">Tutor</p>
        <div className={'fieldSmall active false'}>
        <textarea
            id={2}
            type="text"
            value={NewTutorURL}
            placeholder={'Enter File URL For Tutors Here'}
            onChange={handleTutorURLChange}
            className='textareaTransparent'
            //onKeyPress={this.handleKeyPress.bind(this)}
            //onFocus={() => !locked && this.setState({ active: true })}
            // onBlur={() => !locked && this.setState({ active: true })}
          />
          </div>
          <div className ={'ButtonDivWaiting'} >
          
        </div>
        <p className="TextStyleLightInstructions">Student</p>
        <div className={'fieldSmall active false'}>
        <textarea
            id={2}
            type="text"
            value={NewStudentURL}
            placeholder={'Enter File URL For Students Here'}
            onChange={handleStudentURLChange}
            className='textareaTransparent'
            //onKeyPress={this.handleKeyPress.bind(this)}
            //onFocus={() => !locked && this.setState({ active: true })}
            // onBlur={() => !locked && this.setState({ active: true })}
          />
          </div>
          <div className ={'ButtonDivWaiting'} >
          <Button onClick={()=>{UpdateFiles()}} variant="outlined" color="black" >Update Files</Button>
        </div>
      </div>
        </>
        )
      }
    }
    //AdminInfo
    if(Type == 'Tutor'){
      return(
      <Fragment>
        <p className="TextStyleLight">{CompanyCode} Students:</p>
        <p className="TextStyleLight"> </p>
        <div className="FullScreen">
          {SwitchDropdowns()}
          <p className="TextStyleLight"> </p>
          <div className='AddStudentPadding'>

          </div>
          <Button variant="outlined" color="black" onClick={()=>{setAddStudentBinary(!(AddStudentBinary))}}>
          {SwitchButton()}
          </Button>
          
          <div className="MaxHeightDiv">
            {GetStudentChecklist()}
          </div>
          {GetMasterButton()}
          
          {IsAdmin()}

         
        </div>
      </Fragment>
      )
    }
    else{
      return(
      <Fragment>
        
       
        <div className="FullScreen">
          
        </div>
      </Fragment>
      )
    }
  }

  function PullTestGradeForTutor(num){
    if(CurrentTest == 'SAT'){
      return(
        <div className="ScoreDiv">

                <p className="TextStyleLight">Verbal - {SATLineDataVerbal[num].y} / Math - {SATLineDataMath[num].y} / Total - {SATLineDataTotal[num].y}</p>
        
              
              </div>

              
      )
    }
    else if(CurrentTest == 'ACT'){
      return(
        <div className="ScoreDiv">
                <p className="TextStyleLight">English - {ACTLineDataEnglish[num].y} / Math - {ACTLineDataMath[num].y} / Reading - {ACTLineDataReading[num].y} / Science - {ACTLineDataScience[num].y} / Total - {ACTLineDataTotal[num].y}</p>
        
              </div>
      )
    }
  }
  function ErrorScreen(){
    if(ErrorScreenOn == true){
      return(
        <p  className={'TitleTextStyleLight'}>There appears to be an error loading your information. If you're a new member, please reach out to joseph@measureupprep.com for assistance with setting up your account. Otherwise, please refresh the page.</p>
      )
    }
  }

  function ShowTopics(){
    if(CurrentTest == 'SAT'){
      return(
        TopicsFull.map(obj=>{
          return(
          <>
        

          <FormControlLabel control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} style={{color:"black"}} labelStyle={{color:"black"}} checked= {obj[1]}  onChange={()=>ChangeTopic(obj[0])}/>} label={obj[0]} />

          </>
          )
        })
      )
    }else if(CurrentTest == 'ACT'){
      return(
        TopicsFullACT.map(obj=>{
          return(
          <>
        

          <FormControlLabel control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} style={{color:"black"}} labelStyle={{color:"black"}} checked= {obj[1]}  onChange={()=>ChangeTopic(obj[0])}/>} label={obj[0]} />

          </>
          )
        })
      )
    }
  }
  function ShowAreasOfImprovement(){
    var MathList  = []
    var EnglishList = []
    try{
    for(var i = 0; i<MathrowsGlobal.length; i++){
      var Temp = [MathrowsGlobal[i].Category,MathrowsGlobal[i].Percent]
      MathList.push(Temp)
    }
    for(var i = 0; i<VerbalrowsGlobal.length; i++){
      var Temp = [VerbalrowsGlobal[i].Category,VerbalrowsGlobal[i].Percent]
      EnglishList.push(Temp)
    }

    MathList.sort(sortFunction);
    EnglishList.sort(sortFunction);
   
    function sortFunction(a, b) {
        if (a[1] === b[1]) {
            return 0;
        }
        else {
            return (a[1] < b[1]) ? -1 : 1;
        }
    }
    
    return([MathList[0][0],MathList[1][0],EnglishList[0][0],EnglishList[1][0]])
  }catch(e){
    return([])
  }
  }
  function ShowTopicsCovered(){
    function NewList(assignments){
      var List = []
    for(var i  = 0; i< assignments.length; i++){
      var Name = assignments[i][0]
      var IsCoverd = assignments[i][1]
      if(IsCoverd == true){
        List.push([Name,true])
      }
    }
    return(List)
    }
    if(CurrentTest == 'SAT'){
      return(
        NewList(TopicsFull).map(obj=>{
          return(
          <>
        
          <p className="TextStyleLight"><li>{obj[0]}</li></p>
          
          </>
          )
        })
      )
    }else if(CurrentTest == 'ACT'){
      return(
        NewList(TopicsFullACT).map(obj=>{
          return(
          <>
        

          <FormControlLabel control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} style={{color:"black"}} labelStyle={{color:"black"}} checked= {obj[1]}  />} label={obj[0]} />

          </>
          )
        })
      )
    }

    
  }
  if(PageSwitch == 10){
    
    return(
      <>
      {//GetNavigation()
      }
      {ErrorScreen()}
      {FrontPageIsTutor()}
      
      </>
    )
  }
  if(PageSwitch == 0){
    return(
      <>
      {GetNavigation()}
      <Fragment>
      <div >
      {AddErrorMessgae()}
        <p  className={'TitleTextStyle'}>Welcome to your Dashboard {UserName.toString().split(' ')[0]}</p>

        
        <div className={'NotepadButtonDiv'}>
          <Tooltip title="Notepad">
          <Button onClick={()=>{openModal()}} className={'NotepadButton'} title={'Notepad'}>
            <FaRegStickyNote size={40}/>
          </Button>
         </Tooltip>
        </div>

     
                
            

        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={ModalCustomStyles}
          contentLabel="Example Modal"
          overlayClassName="Overlay"
        >
          <h2 ref={(_subtitle) => (subtitle = _subtitle)} style={{marginTop:-5}}>Notebook</h2>
          <Button onClick={closeModal} className={'NotepadClose'} >
            {
            /*
            <FaTimes size ={40}/>
            */
            }
          </Button>
          
       
          <div className={'field active false'}>
          <textarea
              id={2}
              type="text"
              value={TextOutput}
              placeholder={'Enter Text Here'}
              onChange={handleTextChange}
              rows="6"
              //onChange={this.changeValue.bind(this)}
              //onChange={(text)=>{UpdateNotepad(text)}}
              //onKeyPress={this.handleKeyPress.bind(this)}
              //onFocus={() => !locked && this.setState({ active: true })}
              //onBlur={() => !locked && this.setState({ active: true })}
            />
          </div>
        </Modal>

        
        
        {//GetDropDown()
        }

        

        {
          /*
          onChange={(date:Date) => setNextCurrentStudentDate(date)}
          */
        }
        <div className='rowDiv'>
        <div className="columnDiv">
        <p className={'TitleTextStyleLight'}>Next Meeting:</p>
        <DateTimePicker value={NextCurrentStudentDate}  disableCalendar={true} disableClock={true}/>
        </div>
        <p></p>
        <div className="columnDivTest">
        <p  className={'TitleTextStyleLight'}>Test:</p>
        <div className="CurrentTest">
          <Dropdown options={['SAT','ACT']} onChange={(x)=>{setUpdatedCurrentTest(x.value)}} value={CurrentTest} placeholder="Select a test"  />
        </div>
        </div>
        </div>
        <p  className={'TitleTextStyleLight'}>Assignments:</p>
        <p  className={'TitleTextStyleLightTopic'}>Topics:</p>
        <div className={'fieldSmall active false'}>
        <textarea
            id={2}
            type="text"
            value={NewAssignment}
            placeholder={'Enter Assignment Here (same name as Topics)'}
            onChange={handleTitleChange}
            className='textareaTransparent'
            //onKeyPress={this.handleKeyPress.bind(this)}
            //onFocus={() => !locked && this.setState({ active: true })}
            // onBlur={() => !locked && this.setState({ active: true })}
          />
          </div>
          <div className ={'ButtonDivWaiting'} >
          <Button onClick={()=>{SubmitAssignment()}} variant="outlined" color="black" >Assign Task</Button>
        </div>
        <div className={'StudentAssignments'}>
        <FormGroup>

                 {
                    StudentAssignments.map(obj=>{
                      return(
                      <>
                      <FormControlLabel control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} style={{color:"black"}} labelStyle={{color:"black"}} checked={obj[1]}  onChange={()=>ChangeCheck(obj[2])}/>} label={obj[0]} />
                
                      </>
                      )
                    })
                 }    
        </FormGroup>
        </div>
        <div className ={'ButtonDivComplete'} >
        <Button onClick={()=>{RemoveAssignments()}} variant="outlined" color="black" >Complete Assignments</Button>
        </div>
        <div className={'TopicsDiv'}>
        
        <FormGroup>
         
          {
            
            ShowTopics()
          }    
         
        </FormGroup>
        </div>


       




        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={valueTab} onChange={handleChangeTab} aria-label="basic tabs example" variant="fullWidth">
              <Tab label="One" {...a11yProps(0)} />
              <Tab label="Two" {...a11yProps(1)} />
              <Tab label="Three" {...a11yProps(2)} />
              <Tab label="Four" {...a11yProps(3)} />
              <Tab label="Five" {...a11yProps(4)} />
              <Tab label="Six" {...a11yProps(5)} />
              <Tab label="Seven" {...a11yProps(6)} />
              <Tab label="Eight" {...a11yProps(7)} />
              <Tab label="Nine" {...a11yProps(8)} />
              <Tab label="Ten" {...a11yProps(9)} />
            </Tabs>
          </Box>
          <TabPanel value={valueTab} index={0}>
            {PullTestGradeForTutor(0)}
          </TabPanel>
          <TabPanel value={valueTab} index={1}>
          {PullTestGradeForTutor(1)}
          </TabPanel>
          <TabPanel value={valueTab} index={2}>
          {PullTestGradeForTutor(2)}
          </TabPanel>
          <TabPanel value={valueTab} index={3}>
          {PullTestGradeForTutor(3)}
          </TabPanel>
          <TabPanel value={valueTab} index={4}>
          {PullTestGradeForTutor(4)}
          </TabPanel>
          <TabPanel value={valueTab} index={5}>
          {PullTestGradeForTutor(5)}
          </TabPanel>
          <TabPanel value={valueTab} index={6}>
          {PullTestGradeForTutor(6)}
          </TabPanel>
          <TabPanel value={valueTab} index={7}>
          {PullTestGradeForTutor(7)}
          </TabPanel>
          <TabPanel value={valueTab} index={8}>
          {PullTestGradeForTutor(8)}
          </TabPanel>
          <TabPanel value={valueTab} index={9}>
          {PullTestGradeForTutor(9)}
          </TabPanel>
          
        </Box>
        <div className={'SpreadsheetDiv'}>
          <Spreadsheet data={data} onChange={setData} darkMode= {false} hideRowIndicators={true} hideColumnIndicators={true} />
        </div>
       
       
       
        </div>

        <div className="SubmitTest">
                <Button variant="outlined" onClick={()=>{CompleteData()}} className={'NotepadButton'} >
                  <p>Submit Test</p>
                </Button>
        </div>
        <div className="columnDivDiagnosticsTutor">
          <p className={'TitleTextStyleLight'}>Diagnostics Results: </p>
        
          <div>
              <div>
                <p className={'TitleTextStyleLight'}>SAT: {DiagnosticsResults[7]}</p>
              </div>
              <div className="rowDiv">
                <p className="TextStyleLight">Reading - {DiagnosticsResults[5]} / Math - {DiagnosticsResults[6]} / Total - {DiagnosticsResults[7]}</p>

              </div>
            
            <div>
              <p className={'TitleTextStyleLight'}>ACT: {Math.round((DiagnosticsResults[0]+DiagnosticsResults[1] + DiagnosticsResults[2]+DiagnosticsResults[3])/4)}</p>
              <div className="rowDiv">
                <p className="TextStyleLight">English - {DiagnosticsResults[0]} / Math - {DiagnosticsResults[1]} / Total - {Math.round((DiagnosticsResults[0]+DiagnosticsResults[1] + DiagnosticsResults[2]+DiagnosticsResults[3])/4)}</p>

              </div>
              <div className="rowDiv">
                <p className="TextStyleLight">Reading - {DiagnosticsResults[2]} / Science - {DiagnosticsResults[3]} / SAT Equivalent - {ACTtoSAT(Math.round((DiagnosticsResults[0]+DiagnosticsResults[1] + DiagnosticsResults[2]+DiagnosticsResults[3])/4)-1)}</p>

              </div>
            </div>
          </div>
          </div>
      </Fragment>
      
      </>
    )
  }



  function GetColorProgressBar(num){
    if(num<33){
      return('#DC143C')
    }
    else if(num<66){
      return('#FFEA00')
    }
    else{
      return('#50C878')
    }
    
  }

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  


  function ChangeEvent(eventDict){
    
    try{
      var Title = eventDict.event_id
      var TitleSplit = Title.split('-')
      var Tutor = TitleSplit[1]
      var Student = TitleSplit[0]
 
      var Num = parseInt(TitleSplit[2])-1

    
      //UpdateAllDates(Student, eventDict.start, Num)
    }catch(err){
   
      var Title = eventDict.title
      var TitleSplit = Title.split('-')
      var Tutor = TitleSplit[1]
      var Student = TitleSplit[0].trim()
    
      AddNewDates(Student, eventDict.startTime)

    }
   
  }

  function DeleteEvent(eventDict){

    var Title = eventDict.event_id
    var TitleSplit = Title.split('-')
    var Tutor = TitleSplit[1]
    var Student = TitleSplit[0]

    var Num = parseInt(TitleSplit[2])-1
  
   
    DeleteAllDates(Student, Num)
   
  }

  function GetChecks(name){
    //TopicsFull
 
 
    //Put intermediary for when you complete the section
    
    function CheckedHW(name){
      for(var i = 0; i<HWrowsGlobal.length; i++){
        if((HWrowsGlobal[i].Category).replace(/\s/g, '') == name.replace(/\s/g, '')){
          
          //return(true)
          return(true)
          
  
        }
      }
      return(false)
    }
      if(Checked(name)== true){
        return(
          <div className="Check">
            <FaCheck size = {25} color={'green'}/>
          </div>
        )
      }
      else if(CheckedHW(name)== true){
        return(
          <div className="Check">
            <FaCheck size = {25} color={'black'}/>
          </div>
        )
      }
      else{
        return(
          <div className="Check">
                <FaRegSquare size = {25} color={'black'}/>
          </div>
        )
      }
    }
    //{ Category, Chapter , Right,  Wrong,  Percent};
    const headCellsHW = [
      {
        id: 'Category',
        numeric: false,
        disablePadding: true,
        label: 'Category',
      },
      {
        id: 'Chapter',
        numeric: true,
        disablePadding: false,
        label: 'Chapter',
      },
      {
        id: 'Right',
        numeric: true,
        disablePadding: false,
        label: 'Right',
      },
      {
        id: 'Wrong',
        numeric: true,
        disablePadding: false,
        label: 'Wrong',
      },
     
      
      {
        id: 'Percent',
        numeric: true,
        disablePadding: false,
        label: 'Percent',
      },
    ];

    const headCells = [
      {
        id: 'Category',
        numeric: false,
        disablePadding: true,
        label: 'Category',
      },
      {
        id: 'Correct',
        numeric: true,
        disablePadding: false,
        label: 'Correct',
      },
      {
        id: 'Incorrect',
        numeric: true,
        disablePadding: false,
        label: 'Incorrect',
      },
      {
        id: 'Blank',
        numeric: true,
        disablePadding: false,
        label: 'Blank',
      },
      {
        id: 'Percent',
        numeric: true,
        disablePadding: false,
        label: 'Percent',
      },
      {
        id: 'Chapter',
        numeric: true,
        disablePadding: false,
        label: 'Chapter',
      },
    ];
      
    function descendingComparator(a, b, orderBy) {
      
      if (b[orderBy] < a[orderBy]) {
        return -1;
      }
      if (b[orderBy] > a[orderBy]) {
        return 1;
      }
      return 0;
    }
    
    function getComparator(order, orderBy) {
      return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
    }
    
    // This method is created for cross-browser compatibility, if you don't
    // need to support IE11, you can use Array.prototype.sort() directly
    function stableSort(array, comparator) {
    
      const stabilizedThis = array.map((el, index) => [el, index]);
      stabilizedThis.sort((a, b) => {
        const orderX = comparator(a[0], b[0]);
      
      
        if (orderX != 0) {
        
          return orderX;
        }
     
        return a[1] - b[1];
      });
      
      return stabilizedThis.map((el) => el[0]);
    }
  
    function EnhancedTableHead(props) {
      const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
      const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
      };
    
      return (
        <TableHead>
          <TableRow>
            
            {headCellsHW.map((headCell) => (
              <TableCell
                key={headCell.id}
                align={headCell.numeric ? 'right' : 'left'}
                padding={headCell.disablePadding ? 'none' : 'normal'}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
      );
    }
    
    EnhancedTableHead.propTypes = {
      numSelected: PropTypes.number.isRequired,
      onRequestSort: PropTypes.func.isRequired,
      onSelectAllClick: PropTypes.func.isRequired,
      order: PropTypes.oneOf(['asc', 'desc']).isRequired,
      orderBy: PropTypes.string.isRequired,
      rowCount: PropTypes.number.isRequired,
    };

    function EnhancedTableHeadMath(props) {
      const { onSelectAllClick, orderMath, orderByMath, numSelected, rowCount, onRequestSort } =
        props;
      const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
      };
    
      return (
        <TableHead>
          <TableRow>
            
            {headCells.map((headCell) => (
              <TableCell
                key={headCell.id}
                align={headCell.numeric ? 'right' : 'left'}
                padding={headCell.disablePadding ? 'none' : 'normal'}
                sortDirection={orderByMath === headCell.id ? orderMath : false}
              >
                <TableSortLabel
                  active={orderByMath === headCell.id}
                  direction={orderByMath === headCell.id ? orderMath : 'asc'}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderByMath === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {orderMath === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
      );
    }
    
    EnhancedTableHeadMath.propTypes = {
      numSelected: PropTypes.number.isRequired,
      onRequestSort: PropTypes.func.isRequired,
      onSelectAllClick: PropTypes.func.isRequired,
      orderMath: PropTypes.oneOf(['asc', 'desc']).isRequired,
      orderByMath: PropTypes.string.isRequired,
      rowCount: PropTypes.number.isRequired,
    };

    function EnhancedTableHeadVerbal(props) {
      const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
      const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
      };
    
      return (
        <TableHead>
          <TableRow>
            
            {headCells.map((headCell) => (
              <TableCell
                key={headCell.id}
                align={headCell.numeric ? 'right' : 'left'}
                padding={headCell.disablePadding ? 'none' : 'normal'}
                sortDirection={orderBy === headCell.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <Box component="span" sx={visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
      );
    }
    
    EnhancedTableHeadVerbal.propTypes = {
      numSelected: PropTypes.number.isRequired,
      onRequestSort: PropTypes.func.isRequired,
      onSelectAllClick: PropTypes.func.isRequired,
      order: PropTypes.oneOf(['asc', 'desc']).isRequired,
      orderBy: PropTypes.string.isRequired,
      rowCount: PropTypes.number.isRequired,
    };
    
    function EnhancedTableToolbar(props) {
      const { numSelected } = props;
    
      return (
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            ...(numSelected > 0 && {
              bgcolor: (theme) =>
                alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
            }),
          }}
        >
         
    
         
        </Toolbar>
      );
    }
    
    EnhancedTableToolbar.propTypes = {
      numSelected: PropTypes.number.isRequired,
    };
  
    

  const handleRequestSort = (event, property) => {
  
    
    const isAsc = orderBy === property && order === 'asc';
    
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleRequestSortMath = (event, property) => {
    
    
    const isAsc = orderByMath === property && orderMath === 'asc';
   
    setOrderMath(isAsc ? 'desc' : 'asc');
    setOrderByMath(property);
  };

  const handleRequestSortVerbal = (event, property) => {
   
    
    const isAsc = orderByVerbal === property && orderVerbal === 'asc';

    setOrderVerbal(isAsc ? 'desc' : 'asc');
    setOrderByVerbal(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.Category);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  const handleSelectAllClickMath = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.Category);
      setSelectedMath(newSelected);
      return;
    }
    setSelected([]);
  };
  const handleSelectAllClickVerbal = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.Category);
      setSelectedVerbal(newSelected);
      return;
    }
    setSelected([]);
  };
  


  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (Category) => selected.indexOf(Category) !== -1;
  const isSelectedMath = (Category) => selectedMath.indexOf(Category) !== -1;
  const isSelectedVerbal = (Category) => selectedVerbal.indexOf(Category) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  function GetChartData(){
    if(StandardizedTestsDone.length == 0 ){
      return(
        <VictoryAxis style={{ 
          axis: {stroke: "transparent"}, 
          
         
        }} />
      )
    }
    else{
      return(null)
    }
  }

  function formatDate(date) {
    var d = new Date(date);
    var hh = d.getHours();
    var m = d.getMinutes();
    var s = d.getSeconds();
    var dd = "AM";
    var h = hh;
    if (h >= 12) {
      h = hh - 12;
      dd = "PM";
    }
    if (h == 0) {
      h = 12;
    }
    m = m < 10 ? "0" + m : m;
  
    s = s < 10 ? "0" + s : s;
  
    /* if you want 2 digit hours:
    h = h<10?"0"+h:h; */
  
    var pattern = new RegExp("0?" + hh + ":" + m + ":" + s);
  
    var replacement = h + ":" + m;
    /* if you want to add seconds
    replacement += ":"+s;  */
    replacement += " " + dd;
  
    return date.replace(pattern, replacement);
  }

  function GetClassroomStudents(){
    
    if(ClassroomTest == 'SAT'){
      return(
        <>
        {ClassroomStudentsClean.map((obj)=>
          <p className="StudentsClassroom">{obj}</p>
             
         )}
         </>
      )
    }
    else if(ClassroomTest == 'ACT'){
      return(
      <>
        {ClassroomStudentsCleanACT.map((obj)=>
          <p className="StudentsClassroom">{obj}</p>
             
         )}
         </>
      )
    }
  }

  function GetShowAnswers(){
    if(Type == 'Tutor'){
      return(<div>
        <Button className="ShowOrHide" onClick={()=>ShowOrHide()}>
          <p>{OppositeShowOrHide()} Answers</p>
        </Button>
            {SpreadsheetUpdate}
            {ShowPlusButton()}
        
      </div>)
    }
    else{
      return(null)
    }
  }

  function EditZoomLink(){
    if(Type == 'Tutor'){
      return(
        <div className={'fieldSmall active false'}>
        <textarea
            id={2}
            type="text"
            value={ZoomLink}
            placeholder={'Enter Zoom Link Here'}
            onChange={handleZoomLinkChange}
            className='textareaTransparent'
            //onKeyPress={this.handleKeyPress.bind(this)}
            //onFocus={() => !locked && this.setState({ active: true })}
            // onBlur={() => !locked && this.setState({ active: true })}
          />
          </div>
      )
    }
    return(null)
  }
 
  function SwitchSATACTTopicsList(type){
    
    if(type == 'Verbal'){
      if(CurrentTest == 'SAT'){
        return(
          TopicsVerbal.map(obj=>{
            return(
              <div className ={'quizTopicsContainer'}>
          
              
              <Button className ={'quizTopics'}  onClick={()=>{setCurrentQuizTopic(obj[0])}}>
                <p className ={'quizTopicsP'}>{obj[0]}</p>
              </Button>
              <div style={{ width: 50, height: 50 }}>
                <CircularProgressbar value={obj[2]}
                text={`${obj[2]}`}
                styles={buildStyles({
                  // Rotation of path and trail, in number of turns (0-1)
                  rotation: 0.0,
              
                  // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                  strokeLinecap: 'butt',
              
                  // Text size
                  textSize: '35px',
              
                  // How long animation takes to go from one percentage to another, in seconds
                  pathTransitionDuration: 0.5,
              
                  // Can specify path transition in more detail, or remove it entirely
                  // pathTransition: 'none',
              
                  // Colors
                  pathColor: GetColorProgressBar(obj[2]),
                  textColor: 'black',
                  trailColor: '#d6d6d6',
                  backgroundColor: '#3e98c7',
        
                })}
                />
              </div>

                {GetChecks(obj[0])}
              </div>
              )
            })
        )
      }else if(CurrentTest == 'ACT'){
        return(
          TopicsVerbalACT.map(obj=>{
            return(
              <div className ={'quizTopicsContainer'}>
          
              
              <Button className ={'quizTopics'}  onClick={()=>{setCurrentQuizTopic(obj[0])}}>
                <p className ={'quizTopicsP'}>{obj[0]}</p>
              </Button>
              <div style={{ width: 50, height: 50 }}>
                <CircularProgressbar value={obj[2]}
                text={`${obj[2]}`}
                styles={buildStyles({
                  // Rotation of path and trail, in number of turns (0-1)
                  rotation: 0.0,
              
                  // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                  strokeLinecap: 'butt',
              
                  // Text size
                  textSize: '35px',
              
                  // How long animation takes to go from one percentage to another, in seconds
                  pathTransitionDuration: 0.5,
              
                  // Can specify path transition in more detail, or remove it entirely
                  // pathTransition: 'none',
              
                  // Colors
                  pathColor: GetColorProgressBar(obj[2]),
                  textColor: 'black',
                  trailColor: '#d6d6d6',
                  backgroundColor: '#3e98c7',
        
                })}
                />
              </div>

                {GetChecks(obj[0])}
              </div>
              )
            })
        )
      }
    }
    else if(type == 'Math'){
      if(CurrentTest == 'SAT'){
        return(
          TopicsMath.map(obj=>{
            return(
            <div className ={'quizTopicsContainer'}>
          
              
              <Button className ={'quizTopics'}  onClick={()=>{setCurrentQuizTopic(obj[0])}}>
                <p className ={'quizTopicsP'}>{obj[0]}</p>
              </Button>
              <div style={{ width: 50, height: 50 }}>
                <CircularProgressbar value={obj[2]}
                text={`${obj[2]}`}
                styles={buildStyles({
                  // Rotation of path and trail, in number of turns (0-1)
                  rotation: 0.0,
              
                  // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                  strokeLinecap: 'butt',
              
                  // Text size
                  textSize: '35px',
              
                  // How long animation takes to go from one percentage to another, in seconds
                  pathTransitionDuration: 0.5,
              
                  // Can specify path transition in more detail, or remove it entirely
                  // pathTransition: 'none',
              
                  // Colors
                  pathColor: GetColorProgressBar(obj[2]),
                  textColor: 'black',
                  trailColor: '#d6d6d6',
                  backgroundColor: '#3e98c7',
        
                })}
                />
              </div>
             
                {GetChecks(obj[0])}
            
              </div>
              )
            })
        )
      }else if(CurrentTest == 'ACT'){
        return(
          TopicsMathACT.map(obj=>{
            return(
            <div className ={'quizTopicsContainer'}>
          
              
              <Button className ={'quizTopics'}  onClick={()=>{setCurrentQuizTopic(obj[0])}}>
                <p className ={'quizTopicsP'}>{obj[0]}</p>
              </Button>
              <div style={{ width: 50, height: 50 }}>
                <CircularProgressbar value={obj[2]}
                text={`${obj[2]}`}
                styles={buildStyles({
                  // Rotation of path and trail, in number of turns (0-1)
                  rotation: 0.0,
              
                  // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                  strokeLinecap: 'butt',
              
                  // Text size
                  textSize: '35px',
              
                  // How long animation takes to go from one percentage to another, in seconds
                  pathTransitionDuration: 0.5,
              
                  // Can specify path transition in more detail, or remove it entirely
                  // pathTransition: 'none',
              
                  // Colors
                  pathColor: GetColorProgressBar(obj[2]),
                  textColor: 'black',
                  trailColor: '#d6d6d6',
                  backgroundColor: '#3e98c7',
        
                })}
                />
              </div>
             
                {GetChecks(obj[0])}
            
              </div>
              )
            })
        )
      }
    }
  }
  
  function CreateNewQuiz(QuizName){
    //Placeholder Quiz
    //When looking back at this in the future. You must change the Topics variable at the begining of the file to add new quiz name. Must also move it to database.
    
   
    
    console.log("Creating New Quiz: " + QuizName)
    if(QuizName.length == 0){
      return(null)
    }
    if(CurrentStudent !== '' ){
      
  
     
  
      setDoc(doc(db, "Quizes", QuizName), {
        Topic: MakeCamelCase(QuizName.toString()).replaceAll(' ','').toString(),
        Answers: []
      
      });
  }
}

function ShowCreateQuiz(){
  return(null)
  if(AdminBool ==true){
  return(
    <><p className={'TitleTextStyleLight'}>Create New Quiz:</p><div className="">
      <div className={'fieldSmall active false'}>
        <textarea
          id={2}
          type="text"
          value={NewQuiz}
          placeholder={'Enter New Quiz Name Here'}
          onChange={handleQuizChange}
          className='textareaTransparent' />
      </div>
      <div className={'ButtonDivNewQuiz'}>
        <Button onClick={() => { CreateNewQuiz(NewQuiz); } } variant="outlined" color="black">Create New Quiz</Button>
      </div>
    </div></>
  )
  }
  else{
    return(null)
  }
}

  if(PageSwitch == 2){
    return (
      <>
      {GetNavigation()}
      <Fragment>
        {//GetDropDown(99)
        }
            <div className ={'rowDiv'}>
             
            {SwitchQuiz(CurrentQuizNum)}
            
            <div className ={'columnDiv'}>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={valueTabQuiz} onChange={handleChangeTabQuiz} aria-label="basic tabs example" variant="fullWidth">
                
                  <Tab label="Math" {...a11yProps(0)} />
                  <Tab label="Reading and Writing" {...a11yProps(1)} />
                 
                
                </Tabs>
              </Box>
           
              <TabPanel value={valueTabQuiz} index={0}>
                {
                SwitchSATACTTopicsList('Math')
                }    
              </TabPanel>
              <TabPanel value={valueTabQuiz} index={1}>
                
                {
               SwitchSATACTTopicsList('Verbal')
                } 
              </TabPanel>
            

             


            </Box>
            
            
           
            </div>

            {GetShowAnswers()}
            
          </div>
          {/*
          <Button className ={'quizTopicsAddAssignment'} onClick={()=>{openModalTwo()}}>
            <p className="quizTopicsPAdd">
              Add Assignment
            </p>
          </Button>*/
          }
          <Modal
          isOpen={modalIsOpenTwo}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModalTwo}
          style={ModalCustomStyles}
          contentLabel="Example Modal"
          overlayClassName="Overlay"
          >
          <h2 ref={(_subtitle) => (subtitle = _subtitle)} style={{marginTop:-5}}>New Quiz Name</h2>
          
          
          <div className={'fieldBig active false'}>
          <textarea
              id={2}
              type="text"
              value={NewQuizName}
              placeholder={'Enter Quiz Name Here'}
              onChange={handleQuizNameChange}
              
              //onKeyPress={this.handleKeyPress.bind(this)}
              //onFocus={() => !locked && this.setState({ active: true })}
              // onBlur={() => !locked && this.setState({ active: true })}
            />
          </div>

          <Button className ={'quizTopicsAdd'} onClick={()=>{AddQuiz()}}>
            <p className="quizTopicsPAdd">
              Add
            </p>
          </Button>
         
          </Modal>

          {ShowCreateQuiz()}
         
          <p className={'TitleTextStyleLight'}>HW Synopsis:</p>
          <EnhancedTableToolbar numSelected={selected.length} />
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={HWrowsGlobal.length}
              />
                <TableBody>
                {stableSort(HWrowsGlobal, getComparator(order, orderBy))
                
                .map((row, index) => {
                  const isItemSelected = isSelected(row.Category);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      //onClick={(event) => handleClick(event, row.Category)}
                      //role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.Category}
                      selected={isItemSelected}
                    >
                      <StyledTableCell align="right">
                        {row.Category}
                      </StyledTableCell>
                      
                      <StyledTableCell align="right">{row.Chapter}</StyledTableCell>
                      <StyledTableCell align="right">{row.Right}</StyledTableCell>
                      <StyledTableCell align="right">{row.Wrong}</StyledTableCell>
                      <StyledTableCell align="right">{row.Percent}</StyledTableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
                </TableBody>
              </Table>
            </TableContainer>
        </Fragment>
        </>
        )
  }
 

  function ChangeTestLength(num){
    if(num == 1){
      return(2)
    }
    else{
      return(num)
    }
  }
  function GetChart(){
    if(CurrentTest == 'SAT'){
      return(
        <VictoryChart minDomain={{ y: 200 }}>
        {GetChartData()}
        <VictoryLine
            data={[
           
              { x: 1, y: 0},
              { x: 2, y: 0 },
              { x: 3, y: 0},
              { x: 4, y: 0},
              { x: 5, y: 0},
              { x: 6, y: 0},
              { x: 7, y: 0 },
              { x: 8, y: 0},
              { x: 9, y: 0},
              { x: 10, y: 0}
            ]}
          
            //style={{ data: { fill: "white" } }}
          />
           <VictoryLegend x={125} y={30}
          orientation="horizontal"
          symbolSpacer={5}
          gutter={20}
          colorScale={["black", "#ADD8E6", "#FFCCCB"]}
          data={[
            { name: "Total" }, { name: "Math" }, { name: "Verbal" }
          ]} /><VictoryLine
            data={SATLineDataTotal.slice(0, ChangeTestLength(StandardizedTestsDone.length))}

            animate={{
              duration: 8000,
              onLoad: { duration: 8000 }
            }} /><VictoryLine
            data={SATLineDataMath.slice(0, ChangeTestLength(StandardizedTestsDone.length))}
            animate={{
              duration: 8000,
              onLoad: { duration: 8000 }
            }}
            style={{
              data: { stroke: "#ADD8E6" },
              parent: { border: "1px solid #ccc" }
            }} /><VictoryLine
            data={SATLineDataVerbal.slice(0, ChangeTestLength(StandardizedTestsDone.length))}
            animate={{
              duration: 8000,
              onLoad: { duration: 8000 }
            }}
            style={{
              data: { stroke: "#FFCCCB" },
              parent: { border: "1px solid #ccc" }
            }} />
        </VictoryChart>
      )
    }
  
    else if(CurrentTest == 'ACT'){
      return(
        <VictoryChart>
          
          {GetChartData()}
          
          <VictoryLegend x={80} y={30}
          orientation="horizontal"
          symbolSpacer={5}
          gutter={20}
          colorScale={["black", "#ADD8E6", "#FFCCCB", "#00D100","#FFBF00"]}
          data={[
            { name: "Total" }, { name: "English" }, { name: "Math" }, {name: "Reading"}, {name: "Science"}
          ]} />
            <VictoryLine
            data={ACTLineDataEnglish.slice(0, ChangeTestLength(StandardizedTestsDone.length))}
            animate={{
              duration: 8000,
              onLoad: { duration: 8000 }
            }}
            style={{
              data: { stroke: "#ADD8E6" },
              parent: { border: "1px solid #ccc" }
            }} />
            <VictoryLine
            data={ACTLineDataMath.slice(0, ChangeTestLength(StandardizedTestsDone.length))}
            animate={{
              duration: 8000,
              onLoad: { duration: 8000 }
            }}
            style={{
              data: { stroke: "#FFCCCB" },
              parent: { border: "1px solid #ccc" }
            }} /><VictoryLine
            data={ACTLineDataReading.slice(0, ChangeTestLength(StandardizedTestsDone.length))}
            animate={{
              duration: 8000,
              onLoad: { duration: 8000 }
            }}
            style={{
              data: { stroke: "#00D100" },
              parent: { border: "1px solid #ccc" }
            }} />
            <VictoryLine
            data={ACTLineDataScience.slice(0, ChangeTestLength(StandardizedTestsDone.length))}
            animate={{
              duration: 8000,
              onLoad: { duration: 8000 }
            }}
            style={{
              data: { stroke: "#FFBF00" },
              parent: { border: "1px solid #ccc" }
            }} />
            <VictoryLine
            data={ACTLineDataTotal.slice(0, ChangeTestLength(StandardizedTestsDone.length))}

            animate={{
              duration: 8000,
              onLoad: { duration: 8000 }
            }} />
            <VictoryLine
            data={[
           
              { x: 1, y: 0},
              { x: 2, y: 0 },
              { x: 3, y: 0},
              { x: 4, y: 0},
              { x: 5, y: 0},
              { x: 6, y: 0},
              { x: 7, y: 0 },
              { x: 8, y: 0},
              { x: 9, y: 0},
              { x: 10, y: 0}
            ]}
          
            //style={{ data: { fill: "white" } }}
          />
          
          
           
            </VictoryChart>

      )
    }
  }
  function GetLinkGoogleDrive(){

    if(Type == 'Tutor'){
      return(NewTutorURL)
    }else{
      return(NewStudentURL)
    }
    /*
    if(Type == 'Tutor'){
      if(CurrentTest == 'SAT'){
        return("https://drive.google.com/drive/folders/1daoJfmxJujpIy4RHXtlH8WgXgmUDfKzD?usp=share_link")
      }
      else if(CurrentTest == 'ACT'){
        return('https://drive.google.com/drive/folders/1WbbmzPky7mPmnaY17r4XivQNgEsfPqhT?usp=share_link')
      }else{
        return('')
      }
    }
    if(CurrentTest == 'SAT'){
      return("https://drive.google.com/drive/folders/1RMdshcuXhmuj6VWznVg5k2jBnsgLpTfF?usp=share_link")
    }
    else if(CurrentTest == 'ACT'){
      return('https://drive.google.com/drive/folders/1JKYkicqWa5yqL5A8RP9FjFwWxt5N7HeH?usp=share_link')
    }else{
      return('')
    }
    */
  }

  function EditTutorNotes(){
    /*
    
          <div className={'NotepadButtonDiv'}>
          <Button onClick={() => { openModal(); } } className={'NotepadButton'} title={'Notepad'}>
            <FaRegStickyNote size={40} />
          </Button>
          </div>
    */
  
   if(Type=='Student'){
    return(null)
   }
   function ShowEditButton(){
    if(Type=='Tutor'){
      return(<div className={'NotepadButtonDiv2'}>
        <Tooltip title="Notepad">
      <Button onClick={() => { openModal(); } } className={'NotepadButton'} title={'Notepad'}>
        <FaRegStickyNote size={40} />
      </Button>
      </Tooltip>
      </div>)
    }
    else{
      return(null)
    }
   }
    return(
    <>
    <p className={'TitleTextStyleLight'}>Tutor Notes:</p>
    {ShowEditButton()}
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={ModalCustomStyles}
      contentLabel="Example Modal"
      overlayClassName="Overlay"
    >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)} style={{ marginTop: -5 }}>Tutor Notes</h2>
        <Button onClick={closeModal} className={'NotepadClose'}>
          {
            /*
            <FaTimes size ={40}/>
            */
          }
        </Button>


        <div className={'field active false'}>
          <textarea
            id={2}
            type="text"
            value={TutorNotes}
            placeholder={'Enter Text Here'}
            onChange={handleTextChangeTutorNotes}
            rows="6" />
        </div>
      </Modal></>
    )
  }

  if(PageSwitch == 1){
    return (
      <>
      {GetNavigation()}
      {AddWelcome()}
      <Fragment>
        <div>
          
          {//GetDropDown(99)
          }
        </div>
        <div className={'StudentAssignments'}>
        <p className={'TitleTextStyleLight'}>This weeks assignments:</p>
        <p></p>

        <FormGroup>

                 {
                    StudentAssignments.map(obj=>{
                      return(
                      <>
                      <FormControlLabel control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} checked={obj[1]} style={{color:"black"}} labelStyle={{color:"#ccc"}}   onChange={()=>ChangeCheck(obj[2])}/>} label={obj[0]} />
                
                      </>
                      )
                    })
                 }    
        </FormGroup>
        </div>
        <div className={'NextMeetingDiv'}>
          <p className={'TitleTextStyleLight'}>Next meeting:</p>
          <p className ={'DateText'}>{formatDate(NextCurrentStudentDate.toString().slice(0,24))}</p>
        </div>
        <p className={'TitleTextStyleLight'}>{CurrentTest} Progress:</p>
        <p  className={'TitleTextStyleLight'}> </p>
        <p  className={'TitleTextStyleLight'}> </p>
        <div className={'ChartDiv'}>
          {GetChart()}
        </div>
        <div className="rowDiv">
          <div className="columnDivImprovement">
          <div className='TopicsCoveredDiv'>
          <p  className={'TitleTextStyleLight'}>Topics Covered:</p>
          {ShowTopicsCovered()
          }
          </div>
          <p className="TitleTextStyleLight">Areas For Improvement:</p>
          {ShowAreasOfImprovement().map(obj=>{
            return(<p className="TextStyleLight"><li>{obj}</li></p>)
          })
          }
          </div>
          
        <div className="columnDivImprovement">
        
          
          {EditTutorNotes()}
          <div className="TutorNotes">
          <p className="TextStyleLight">{TutorNotes}</p>
         
          </div>
          </div>
          </div>
          
          
          
          <p className={'TitleTextStyleLight'}>Test Synopsis:</p>

          <EnhancedTableToolbar numSelected={selectedMath.length} />
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <EnhancedTableHeadMath
                numSelected={selectedMath.length}
                order={orderMath}
                orderBy={orderByMath}
                onSelectAllClick={handleSelectAllClickMath}
                onRequestSort={handleRequestSortMath}
                rowCount={MathrowsGlobal.length}
              />
                <TableBody>
                {stableSort(MathrowsGlobal, getComparator(orderMath, orderByMath))
                
                .map((row, index) => {
                  const isItemSelected = isSelectedMath(row.Category);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      //onClick={(event) => handleClick(event, row.Category)}
                      //role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.Category}
                      selected={isItemSelected}
                    >
                      <StyledTableCell align="right">
                        {row.Category}
                      </StyledTableCell>
                      
                      <StyledTableCell align="right">{row.Right}</StyledTableCell>
                      <StyledTableCell align="right">{row.Wrong}</StyledTableCell>
                      <StyledTableCell align="right">{row.Blank}</StyledTableCell>
                      <StyledTableCell align="right">{row.Percent}</StyledTableCell>
                      <StyledTableCell align="right">{row.Chapter}</StyledTableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
                </TableBody>
              </Table>
            </TableContainer>

            <p></p>
            <p></p>
            <p></p>


            <EnhancedTableToolbar numSelected={selectedVerbal.length} />
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <EnhancedTableHeadVerbal
                numSelected={selectedVerbal.length}
                order={orderVerbal}
                orderBy={orderByVerbal}
                onSelectAllClick={handleSelectAllClickVerbal}
                onRequestSort={handleRequestSortVerbal}
                rowCount={VerbalrowsGlobal.length}
              />
                <TableBody>
                {stableSort(VerbalrowsGlobal, getComparator(orderVerbal, orderByVerbal))
                
                .map((row, index) => {
                  const isItemSelected = isSelectedVerbal(row.Category);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      //onClick={(event) => handleClick(event, row.Category)}
                      //role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.Category}
                      selected={isItemSelected}
                    >
                      <StyledTableCell align="right">
                        {row.Category}
                      </StyledTableCell>
                      
                      <StyledTableCell align="right">{row.Right}</StyledTableCell>
                      <StyledTableCell align="right">{row.Wrong}</StyledTableCell>
                      <StyledTableCell align="right">{row.Blank}</StyledTableCell>
                      <StyledTableCell align="right">{row.Percent}</StyledTableCell>
                      <StyledTableCell align="right">{row.Chapter}</StyledTableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
                </TableBody>
              </Table>
            </TableContainer>
      </Fragment>

      <p className="TitleTextStyleLight">Files: </p>
      <Button target="_blank" href={GetLinkGoogleDrive()}>
        <FaGoogleDrive size ={50}/>
      </Button>

      <p className="TitleTextStyleLight">Book List: </p>
      <ul>
        <a target="_blank" href='https://www.amazon.com/College-Pandas-SAT-Math-Advanced-dp-1733192727/dp/1733192727/ref=dp_ob_title_bk'><li>Pandas Math book</li></a>
        <a target="_blank" href='https://www.amazon.com/Critical-Reader-Fourth-Complete-Reading/dp/173358952X/ref=sr_1_1?keywords=the+complete+guide+to+sat+reading&qid=1669648931&sprefix=the+complete+sat+%2Caps%2C150&sr=8-1'> <li>SAT Reading book</li></a>
        <a target="_blank" href='https://www.amazon.com/Fifth-Ultimate-Guide-SAT-Grammar/dp/1733589538/ref=pd_bxgy_img_sccl_1/133-1338560-8271728?pd_rd_w=BHZ3B&content-id=amzn1.sym.7f0cf323-50c6-49e3-b3f9-63546bb79c92&pf_rd_p=7f0cf323-50c6-49e3-b3f9-63546bb79c92&pf_rd_r=MB5RHPG85584KHDZBG3D&pd_rd_wg=KJpCB&pd_rd_r=9a83c4ee-bca2-481c-8578-cc2b38f98705&pd_rd_i=1733589538&psc=1'><li>SAT Grammar book</li></a>
      </ul>
      <p className="TitleTextStyleLight">Zoom Link: </p>
      <Button target="_blank" href={ZoomLink}>
        <FaVideo size={50} color={'black'} />
      </Button>
      <p className="TitleTextStyleLight"> </p>
      {EditZoomLink()}
      </>
      )
  }
 
  if(PageSwitch == 3){
    return (
      <>
      {GetNavigation()}
      <Fragment>
        <div className="ClassroomTest">
        
          <Dropdown options={['SAT','ACT']} onChange={(x)=>{ClassroomTestChange(x.value)}} value={ClassroomTest} placeholder="Select a test"  />
        
          
        </div>
        <div className={'StudentAssignments'}>
          <p className={'TitleTextStyleLight'}>Your {ClassroomTest} class students:</p>

          {GetClassroomStudents()}
        </div>
        <div className="AddStudentClassroom" >
        <Button variant="outlined" color="black" onClick={()=>setIsOpenThree(true)}>
          Add student
        </Button>
        </div>
        <p></p>

       
        
        <div className={'NextMeetingDivClass'}>
          <p className={'TitleTextStyleLight'}>Next group meeting:</p>
          <p></p>
          <DateTimePicker value={NextClassDate} onChange={(date:Date) => setNextClassDate(date)} />
        </div>

        <Modal
          isOpen={modalIsOpenThree}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModalThree}
          style={ModalCustomStyles}
          contentLabel="Example Modal"
          overlayClassName="Overlay"
          >
          <h2 ref={(_subtitle) => (subtitle = _subtitle)} style={{marginTop:-5}}>New Student</h2>
          
          
          {GetDropDownNames()}
          {
            //DropdownStudentName
          }
          <Button className ={'quizTopicsAdd'} onClick={()=>{AddQuiz()}}>
            <p className="quizTopicsPAdd">
              Add
            </p>
          </Button>
         
        </Modal>
          
        <p className={'TitleTextStyleLight2'}>Add Assignments To Class:</p>
        <p className={'TitleTextStyleLight'}></p>
        <div className={'fieldSmall active false'}>
          <textarea
              id={2}
              type="text"
              value={NewAssignment}
              placeholder={'Enter Assignment Here (same name as Topics)'}
              onChange={handleTitleChange}
              className='textareaTransparent'
              //onKeyPress={this.handleKeyPress.bind(this)}
              //onFocus={() => !locked && this.setState({ active: true })}
              // onBlur={() => !locked && this.setState({ active: true })}
            />
            </div>
            <div className ={'ButtonDivWaiting'} >
            <Button onClick={()=>{SubmitAssignmentClassroom()}} variant="outlined" color="black" >Assign Task</Button>
        </div>


        
          <p className={'TitleTextStyleLight3'}>Test Synopsis:</p>
          <EnhancedTableToolbar numSelected={selectedMath.length} />
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <EnhancedTableHeadMath
                numSelected={selectedMath.length}
                order={orderMath}
                orderBy={orderByMath}
                onSelectAllClick={handleSelectAllClickMath}
                onRequestSort={handleRequestSortMath}
                rowCount={MathrowsGlobalClassroom.length}
              />
                <TableBody>
                {stableSort(MathrowsGlobalClassroom, getComparator(orderMath, orderByMath))
                
                .map((row, index) => {
                  const isItemSelected = isSelectedMath(row.Category);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      //onClick={(event) => handleClick(event, row.Category)}
                      //role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.Category}
                      selected={isItemSelected}
                    >
                      <StyledTableCell align="right">
                        {row.Category}
                      </StyledTableCell>
                      
                      <StyledTableCell align="right">{row.Right}</StyledTableCell>
                      <StyledTableCell align="right">{row.Wrong}</StyledTableCell>
                      <StyledTableCell align="right">{row.Blank}</StyledTableCell>
                      <StyledTableCell align="right">{row.Percent}</StyledTableCell>
                      <StyledTableCell align="right">{row.Chapter}</StyledTableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
                </TableBody>
              </Table>
            </TableContainer>

            <p></p>
            <p></p>
            <p></p>


            <EnhancedTableToolbar numSelected={selectedVerbal.length} />
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <EnhancedTableHeadVerbal
                numSelected={selectedVerbal.length}
                order={orderVerbal}
                orderBy={orderByVerbal}
                onSelectAllClick={handleSelectAllClickVerbal}
                onRequestSort={handleRequestSortVerbal}
                rowCount={VerbalrowsGlobalClassroom.length}
              />
                <TableBody>
                {stableSort(VerbalrowsGlobalClassroom, getComparator(orderVerbal, orderByVerbal))
                
                .map((row, index) => {
                  const isItemSelected = isSelectedVerbal(row.Category);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      //onClick={(event) => handleClick(event, row.Category)}
                      //role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.Category}
                      selected={isItemSelected}
                    >
                      <StyledTableCell align="right">
                        {row.Category}
                      </StyledTableCell>
                      
                      <StyledTableCell align="right">{row.Right}</StyledTableCell>
                      <StyledTableCell align="right">{row.Wrong}</StyledTableCell>
                      <StyledTableCell align="right">{row.Blank}</StyledTableCell>
                      <StyledTableCell align="right">{row.Percent}</StyledTableCell>
                      <StyledTableCell align="right">{row.Chapter}</StyledTableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
                </TableBody>
              </Table>
            </TableContainer>
      </Fragment>
      </>
      )
  }





  const CustomEditor = ({ scheduler }) => {
    const event = scheduler.edited;

    // Make your own form/state
    const [state, setState] = useState({
      title: event?.title || NewMeetingString,
      description: event?.description || "",
      startTime: event?.startTime || (scheduler.state.start.value).toString(),
      length: event?.length || 90,
    });
    const [error, setError] = useState(null);
  
    const handleChange = (value, name) => {
      setState((prev) => {
        return {
          ...prev,
          [name]: value
        };
      });
    };

    function CloseSelf(){
      scheduler.close();
    }
    
    const handleSubmit = async () => {
      // Your own validation
      if (state.title.length < 3) {
        return setError({ ...error, title: "Min 3 letters" });
      }
  
      try {
        scheduler.loading(true);
  
        /**Simulate remote data saving */
        const added_updated_event = (await new Promise((res) => {
          /**
           * Make sure the event have 4 mandatory fields
           * event_id: string|number
           * title: string
           * start: Date|string
           * end: Date|string
           */
          setTimeout(() => {
            res({
              event_id: event?.event_id || Math.random(),
              title: state.title,
              start: scheduler.state.start.value,
              end: new Date(scheduler.state.start.value.getTime() + state.length*60000),
              
            });
          }, 3000);
        })) 
  
        scheduler.onConfirm(added_updated_event, event ? "edit" : "create");
        scheduler.close();
      } finally {
        scheduler.loading(false);
      }
    };
    return (
      <div>
        <div style={{ padding: "1rem" }}>
         
          <TextField
            label="Title"
            value={state.title}
            onChange={(e) => handleChange(e.target.value, "title")}
            error={!!error}
            helperText={!!error && error["title"]}
            fullWidth
          />
          <p></p>
          <TextField
            id="datetime-local"
            label="Next appointment"
            type="datetime-local"
            defaultValue={state.start}
            sx={{ width: 250 }}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => handleChange(e.target.value, "startTime")}
          />
          <p></p>
          <FormControl sx={{  minWidth: 250 }}>
        <InputLabel id="demo-simple-select-helper-label">Length</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={state.length}
            label="length"
            onChange={(e) => handleChange(e.target.value, "length")}
          >
         
          <MenuItem value={60}>1:00 Hour</MenuItem>
          <MenuItem value={90}>1:30 Hour</MenuItem>
          <MenuItem value={120}>2 Hour</MenuItem>
          <MenuItem value={150}>2:30 Hour</MenuItem>
          <MenuItem value={180}>3 Hour</MenuItem>


          </Select>


      </FormControl>
        </div>


        <DialogActions>
          <Button onClick={scheduler.close}>Cancel</Button>
          <Button onClick={(conf)=>{ChangeEvent(state);CloseSelf();} }>Confirm</Button>
        </DialogActions>
      </div>
    );
  };




  function CalendarSwitchFunc(){
    if(CalendarSwitch){
      return('Show Mine')
    }else{
      return('Show All')
    }
  }

  function SwitchCalendar(){
   
    var Switcher = !(CalendarSwitch)
    setCalendarSwitch(Switcher)
    
    setTimeout(() => {
      if(Switcher){
   
        SetAllMeetings()
      }else{
      
        PullAllDates()
      }
    }, 350)
  }

  function GetCheckmark(){
    if(PayrollSubmitted){
      return(
        <div className="PayrollCheck">
        <FaCheck size={25} style={{color: 'green'}}/>
      </div>
      )
    }
    else{
      return(null)
    }
  }
  function GetSubmitPayroll(){
    if(AdminBool){
      return(
        <div className="rowDiv">
      <Button variant="outlined" color="black" onClick={()=>{UpdatePayroll()}} >
          Submit Payroll
      </Button>
          {GetCheckmark()}
      </div>
      )
    }
    else{
      return(null)
    }
  }
  if(PageSwitch == 4){
    return (
      <>
      {GetNavigation()}
      <Fragment>
      <p className="Format">Format new sessions as "Full Student Name - Full Tutor Name"</p>
      <Scheduler
        customEditor={(scheduler) => <CustomEditor scheduler={scheduler}  />}
        view="month"
        editable={true}
        deletable={true}
        draggable={false}
        //onConfirm={(conf)=>ChangeEvent(conf)}
        onDelete={(conf)=>DeleteEvent(conf)}
        events={Events}
        dialogMaxWidth={'lg'}
        month={{weekDays: [0, 1, 2, 3, 4, 5, 6], 
          weekStartOn: 0, 
          startHour: 9, 
          endHour: 17,
        
          navigation: true}}
        week={{ 
          weekDays: [0, 1, 2, 3, 4, 5, 6], 
          weekStartOn: 0, 
          startHour: 9, 
          endHour: 17,
          step: 60,
          
          navigation: true
          }}
      />
       
      </Fragment>
      <p></p>
      <Button variant="outlined" color="black" onClick={()=>{SwitchCalendar()}} >
       {CalendarSwitchFunc()}
      </Button>
      <p></p>
      
      {GetSubmitPayroll()}

      <div>
        <p>Enter Availability</p>
      </div>
      </>
      )
  }

  const dataDiagnostics = [
    [{ value: "Vanilla" }, { value: "Chocolate" }],
    [{ value: "Strawberry" }, { value: "Cookies" }],
  ];
  /*
<div>
            <div>
              <p className={'TitleTextStyleLight'}>SAT: {DiagnosticsResults[7]}</p>
            </div>
            <div className="rowDiv">
              <p className="TextStyleLight">Reading - {DiagnosticsResults[5]} / Math - {DiagnosticsResults[6]} / Total - {DiagnosticsResults[7]}</p>

            </div>
          
          <div>
            <p className={'TitleTextStyleLight'}>ACT: {Math.round((DiagnosticsResults[0]+DiagnosticsResults[1] + DiagnosticsResults[2]+DiagnosticsResults[3])/4)}</p>
            <div className="rowDiv">
              <p className="TextStyleLight">English - {DiagnosticsResults[0]} / Math - {DiagnosticsResults[1]} / Total - {Math.round((DiagnosticsResults[0]+DiagnosticsResults[1] + DiagnosticsResults[2]+DiagnosticsResults[3])/4)}</p>

            </div>
            <div className="rowDiv">
              <p className="TextStyleLight">Reading - {DiagnosticsResults[2]} / Science - {DiagnosticsResults[3]} / SAT Equivalent - {ACTtoSAT(Math.round((DiagnosticsResults[0]+DiagnosticsResults[1] + DiagnosticsResults[2]+DiagnosticsResults[3])/4)-1)}</p>

            </div>
          </div>
        </div>
  */

  if(PageSwitch == 5){
    return(
      <>
      {GetNavigation()}
      <Fragment>
        <p className={'TitleTextStyleLight'}>Diagnostics Tests:</p>
        <p className={'TitleTextStyleLight'}></p>
        <div className="rowDiv">
        <Spreadsheet data={DiagnosticsTestData} onChange ={setDiagnosticsTestData} darkMode= {false}/>

        <div className="columnDivDiagnostics">

        
        
        <p className="TextStyleLight"> </p>
       
        <p className={'TitleTextStyleLight'}>Instructions:</p>
        <p className="TextStyleLightInstructions">Download the Diagnostics Tests and complete only the questions not yet marked on the answer sheet. Once complete, enter your answers here and email joseph@measureuprep.com to review your results and schedule your first session with a live tutor!</p>
       
        <div className=''>
        <p className="TitleTextStyleLight">Files: </p>
        <Button target="_blank" href="https://drive.google.com/drive/folders/1USBdffOfZFpc5sYlPL41u-7ihY3sNd4K?usp=share_link">
          
          <FaGoogleDrive size ={50}/>
        </Button>
        </div>
       </div>
        </div>
      </Fragment>
      
      </>
    )
  }

  const stylesSketch = {
    border: '0.0625rem solid #9c9c9c',
    borderRadius: '0.25rem',
  };
  
  

  /*

<div>
        <Document file= {urlPDF} onLoadSuccess={onDocumentLoadSuccess} onLoadError={console.error}>
          <Page pageNumber={pageNumber} />
        </Document>
        <p>
          Page {pageNumber} of {numPages}
        </p>
      </div>
*/




const eraserHandler = () => {
  const eraseMode = canvasRef.current?.eraseMode;
  //console.log(eraseMode)

  //if (eraseMode) {
    
    if(isEraser == false){
      setisEraser(true)
      eraseMode(true);
    }else{
      setisEraser(false)
      eraseMode(false);
    }
  //}
  
  
};





const clearHandler = () => {
  const clearCanvas = canvasRef.current?.clearCanvas;

  if (clearCanvas) {
    clearCanvas();
  }
};



function SwitchIcon(){
  

  if (isEraser == false) {
    return(
      <FaEraser size ={35} />
    )
  }else{
    return(
      <FaPen size ={35} />
    )
  }
}
function SwitchIconLabel(){
  

  if (isEraser == false) {
    return(
      "Eraser"
    )
  }else{
    return(
      "Pen"
    )
  }
}
function IncreaseStrokeWidth(){
  setPenSize(penSize+2)
}
function DecreaseStrokeWidth(){
  setPenSize(penSize-2)
}


var valueGroups = {
  title: 'Mr.',
  firstName: 'Micheal',
  secondName: 'Jordan'
}
var optionGroups = {
  title: [
    { value: 'mr', label: 'Mr.' },
    { value: 'ms', label: 'Ms.' },
    { value: 'dr', label: 'Dr.' },
  ],
  firstName: [
    { value: 'John', label: 'John' },
    { value: 'Micheal', label: 'Micheal' },
    { value: 'Elizabeth', label: 'Elizabeth' },
  ],
  secondName: [
    { value: 'Lennon', label: 'Lennon' },
    { value: 'Jackson', label: 'Jackson' },
    { value: 'Jordan', label: 'Jordan' },
    { value: 'Legend', label: 'Legend' },
    { value: 'Taylor', label: 'Taylor' }
  ],
}

var pdfLinksSAT = ['1m1ILrGW4PEbDVJ13fmcAxEZxyEO3WgBE','1vLyCwsfdCWPNzffJC2LCkJ9uFPlBz_oD','1PVRRrp4ixtsK-CEh3Ao-zulWmAxOdzhG','1Ow-Zfvrj7UrTT71ii8_Ivzi6wPPSTWEP','1LotFzgn8hOQTmrXIjryCibqxPHAGmPyH','1UwwQJsXnIN_XTDebuckYJB--K2p5w8Xx','1BF0EFI4fZuCHtw4N-DTflvD_mneNgNXg','1IG-9JUVlhw5fybYnkwlzcbVU6YgbmMAU','1L4Ix7aKsVrNnWsaGRU107bj_Flc4Dtmm','1Bm5WNRw4oICRpXpZhf0rV2vItQgRLLi7','1FKdqKsW87FmV1V8J7291lT7Jk_skrHHT','19LJgs1oPagA7pLSMDfCBUEodA_z7s5dM','17h5GjU7aEpZdTCmQViuK7JKKb-Eev6-a']
var pdfLinksACT = ['1tvIecv6wR8VF-UQt9RgfdcqcnYZ_9JAa','1ZMC5eZALFBGji3-T-otgCClQQp50zfPs','1aLikRZWW5GRzA4iMGjbBWqsnAoNOhvYW','19rNXL5DRIwwOSVaj_7J7gCoCYWByeDl6','13siuyTAB1KxZqkOvAPZ9_a72VO1_hNRd','1LZQswWfQjJ7Xc9Hu-MOvsbO-KmCMV-74','17JvXhik4czV_fTJaeaPUyZMs1bFeknNC','1IfAZJEJJGF4TNm5sQ1IlTp58NFJgd6X9','14khBy-ei1HDftExWwuYt96tgisXJKQci','1iV5TtPPJGxN0Z97iSsb7DPEOfAhdnlxO','1_ZNyYCkW1f3JC5ias8ZNfmVeVzDq4nh6','1RjOEeEmfmhmXdUjkeVDwXiCMYYV9V_bi','17h5GjU7aEpZdTCmQViuK7JKKb-Eev6-a']
//https://drive.google.com/file/d/1FKdqKsW87FmV1V8J7291lT7Jk_skrHHT/view?usp=sharing
function GetCorrectPDFLink(){
  //currPDF
  for(var i = 0; i < NewPDFLinks.length; i++){
    if(currPDF.includes(NewPDFLinks[i][0])){
      return(['',i])
    }
  }
  if(currPDF.includes('Grammar')){
    return([10])
  }
  else if(currPDF.includes('Math')){
    return([11])
  }
  else if(currPDF.includes('Reading')){
    return([12])
  }
  
  else if(currPDF.includes('2')){
    return([1])
  }
  else if(currPDF.includes('3')){
    return([2])
  }
  else if(currPDF.includes('4')){
    return([3])
  }
  else if(currPDF.includes('5')){
    return([4])
  }
  else if(currPDF.includes('6')){
    return([5])
  }
  else if(currPDF.includes('7')){
    return([6])
  }
  else if(currPDF.includes('8')){
    return([7])
  }
  else if(currPDF.includes('9')){
    return([8])
  }
  else if(currPDF.includes('10')){
    return([9])
  }
  else if(currPDF.includes('1')){
    return([0])
  }
  else{
    return(null)
  }
}
function FormatLink(){
  var num = GetCorrectPDFLink()
  if(num == null){
    return(null)
  }
  if(num.length>1){
    return('https://drive.google.com/file/d/'+NewPDFLinks[num[1]][1]+'/preview')
  }
  else if(num.length == 1 ){
    if(CurrentTest == 'ACT'){
      return('https://drive.google.com/file/d/'+pdfLinksACT[num[0]]+'/preview')
    }
    else if(CurrentTest == 'SAT'){
      return('https://drive.google.com/file/d/'+pdfLinksSAT[num[0]]+'/preview')
    }
  }
}

function GetPDF(){
  if(FormatLink() == null){

    return(null)
    
  }
  else{
   
    return(

      <div className="PDFViewer">
        <iframe src={FormatLink()} height="100%" width="100%" allow="autoplay"></iframe>
      </div>
    )
}
}
/*
useEffect(()=>{
  if(FormatLink() == null){
    setwhiteboardStyle('sketchDivOutside')
    return(null)
    
  }
  else{
    setwhiteboardStyle('sketchDivOutsideSmall')
    return(

      <div className="PDFViewer">
      <iframe src={FormatLink()} height="100%" width="100%" allow="autoplay"></iframe>
      </div>
    )
}
},[currPDF])
*/
//https://drive.google.com/file/d/1m1ILrGW4PEbDVJ13fmcAxEZxyEO3WgBE/view?usp=sharing
//hhttps://drive.google.com/file/d/19LJgs1oPagA7pLSMDfCBUEodA_z7s5dM/view?usp=sharing
//setshowPDF

function GetCalculator(){
  if(showCalculator){
    return(
      <div className="calculatorDiv">
        <iframe src="https://www.desmos.com/calculator/g7izucn6nn" width="100%" height="100%"></iframe>
      </div> 
    )
  }else{
    return(null)
  }
}

function GetPDFLink(){
  if(Type=='Tutor'){
    return(
      <div className="AddPDFDiv">
      <p className="TextStyleLight">Add PDF link</p>
      <p className="TextStyleLightInstructions">Nickname</p>
      <div className={'fieldSmall active false'}>
        
        <textarea
            id={2}
            type="text"
            value={NewPDFName}
            placeholder={'Enter PDF Name Here'}
            onChange={handlePDFNameChange}
            className='textareaTransparent'
            //onKeyPress={this.handleKeyPress.bind(this)}
            //onFocus={() => !locked && this.setState({ active: true })}
            // onBlur={() => !locked && this.setState({ active: true })}
          />
        </div>

        <p className="TextStyleLightInstructions">Link</p>
        <div className={'fieldSmall active false'}>
        
        <textarea
            id={2}
            type="text"
            value={NewPDFURL}
            placeholder={'Enter PDF Link Here'}
            onChange={handlePDFLinkChange}
            className='textareaTransparent'
            //onKeyPress={this.handleKeyPress.bind(this)}
            //onFocus={() => !locked && this.setState({ active: true })}
            // onBlur={() => !locked && this.setState({ active: true })}
          />
        </div>

        <div className ={'ButtonDivWaiting'} >
          <Button onClick={()=>{setButtonPressed(!(ButtonPressed))}} variant="outlined" color="black" >{SwitchText}</Button>
        </div>
        <div style={{width:600}}>
        <p className="TextStyleLightInstructions">Copy the sharable link from Google Drive into the textbox then press Add.</p>
        </div>
      </div>
      
    )
    
  }
  else{
    return(null)
  }
}

if(PageSwitch == 6){
    return(
      <>
      {GetNavigation()}
    
        <div className={whiteboardStyle}>
        <div className="sketchDiv">
          <ReactSketchCanvas
            style={stylesSketch}
            ref={canvasRef}
            strokeWidth={penSize}
            eraserWidth={20}
            strokeColor={penColor}
            onStroke={()=>{IncreaseSAVnum()}}
            
          />
      </div>
      </div>
      <div className="rowDivWhiteboard">
        <Tooltip title="Calculator">
        <Button onClick={()=>{setshowCalculator(!(showCalculator))}}>
          <FaCalculator size ={35} />
        </Button>
        </Tooltip>
        <Tooltip title={SwitchIconLabel()}>
        <Button onClick={eraserHandler}>
          
          {SwitchIcon()}
        </Button>
        </Tooltip>
       
        <Tooltip title="Increase Size">
        <Button onClick={()=>{IncreaseStrokeWidth()}}>
          <p className="TitleTextStyleBold">+</p>
        </Button>
        </Tooltip>
        <Tooltip title="Decrease Size">
        <Button onClick={()=>{DecreaseStrokeWidth()}}>
          <p  className="TitleTextStyleBold">-</p>
        </Button>
        </Tooltip>
        <Tooltip title="Clear">
        <Button onClick={clearHandler}>
          <FaTrash size ={35} />
        </Button>
        </Tooltip>
        
        <CirclePicker
        onChange={(color) => {setPenColor(color.hex)}}
        colors={['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#9900EF','#000000','#FFFFFF']}
        />
       <div style={{height:40, marginTop:33}}>
        <Button onClick={()=>{svgExportHandler()}} variant="outlined" color="black" >Share</Button>
       </div>
      </div>
      <div className="PDFDropdown">
        <Dropdown options={['Whiteboard','Practice Test 1','Practice Test 2','Practice Test 3','Practice Test 4','Practice Test 5','Practice Test 6','Practice Test 7','Practice Test 8','Practice Test 9','Practice Test 10', 'Grammar Book', 'Math Book','Reading Book']} onChange={(x)=>{setcurrPDF(x.value)}}  placeholder="Select a PDF"  />
       </div>
        {GetPDF()}

        {GetCalculator()}
        {GetPDFLink()}
      
      </>
    )
  }
}
//ACTtoSAT

Dashboard.propTypes = {
  CardChart: PropTypes.elementType,
  statistics: PropTypes.object.isRequired,
  toggleAccountActivation: PropTypes.func,
  pushMessageToSnackbar: PropTypes.func,
  targets: PropTypes.arrayOf(PropTypes.object).isRequired,
  setTargets: PropTypes.func.isRequired,
  isAccountActivated: PropTypes.bool.isRequired,
  //selectDashboard: PropTypes.func.isRequired,
};

export default Dashboard;
