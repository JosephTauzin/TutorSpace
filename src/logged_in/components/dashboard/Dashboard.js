import React, { Fragment, useEffect, useState, useRef, useCallback } from "react";
import PropTypes from "prop-types";
import { Typography, Box, Fade } from "@mui/material";
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
import {   Radio, RadioGroup, FormLabel } from '@mui/material';
import DateTimePicker from 'react-datetime-picker';
import ReactHover, { Trigger, Hover } from "react-hover";

import { CirclesWithBar } from 'react-loader-spinner'
import Collapse from '@mui/material/Collapse';
import { auth, getNames, db, storage, registerWithEmailAndPassword  } from "../../../firebase.client.js";


import { doc, onSnapshot, collection, query, where,updateDoc, arrayUnion, arrayRemove, setDoc , deleteDoc, getDoc} from "firebase/firestore";
import Spreadsheet from "react-spreadsheet";
import '@firebase/firestore';
import Quiz from './libQuiz/Quiz';
import Slider from '@mui/material/Slider';
import {  ref, getDownloadURL } from "firebase/storage";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Taskmanager from 'react-drag-taskmanager';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaRegStickyNote, FaSquare } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";
import { FaSchool } from "react-icons/fa";
import { FaRegSquare } from "react-icons/fa";
import {FaChalkboardTeacher} from "react-icons/fa";
import {FaChalkboard} from "react-icons/fa";
import {FaFileExport} from "react-icons/fa"
import {FaEraser} from "react-icons/fa";
import {FaPlay} from "react-icons/fa";
import {FaPen} from "react-icons/fa";
import {FaTrash} from "react-icons/fa";
import {FaCog} from "react-icons/fa";
import { FaFileDownload } from "react-icons/fa";
import { FaDesktop } from "react-icons/fa";
import { FaPowerOff } from "react-icons/fa";
import {FaPhone} from "react-icons/fa"
import { FaEquals } from "react-icons/fa";
import {FaUser} from "react-icons/fa"
import { FaScroll } from "react-icons/fa";
import {FaBook} from "react-icons/fa"
import { FaDownload } from "react-icons/fa";
import {FaCalendar} from "react-icons/fa"
import {FaCalculator} from "react-icons/fa"
import {FaEnvelope} from "react-icons/fa"
import {FaBriefcase} from "react-icons/fa"
import {FaInfo} from "react-icons/fa"
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
import { Chat, CheckBox, Class, ConnectedTvOutlined, ConstructionOutlined, ContactsOutlined, ElevatorSharp, RestaurantRounded, Topic, Update } from "@mui/icons-material";
import { Scheduler } from "@aldabil/react-scheduler";

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TutorSpaceLogo from "./images2/TutorSpaceNavLogo.png"
import { faCropSimple } from "@fortawesome/free-solid-svg-icons";

import { TextField,  DialogActions } from "@mui/material";
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';

import TablePagination from '@mui/material/TablePagination';
import Grid from '@mui/material/Grid';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import DayColumn from './DayColumn'
import LabelColumn from './LabelColumn'

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
//import DashboardScheduleSelector from "./DashboardScheduleSelector"
import TimeSelect from "./TimeSelect";
import { isAdmin } from "@firebase/util";
import e from "cors";

import Draggable from 'react-draggable';

import ReactDOM from 'react-dom';


import Canvas from "./canvas";


import SHA256 from 'crypto-js/sha256';
import axios from 'axios';

import ReactLoading from 'react-loading';
import CustomDropdown from './CustomDropdown';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';


import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import MediaQuery from 'react-responsive';
import WheelNumberSelector from './WheelNumberSelector';


import { set } from "date-fns";




//Modal.setAppElement(document.getElementById('root'));


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

	function GetAlert(message, functionToRun){
    
      if ( window.confirm(message)) {
        // Your code to be executed after confirming
        functionToRun();
      }
    
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

  var FreeTrialDays = 31;



  const [ErrorMessage, setErrorMessage] = useState('')
  const [UserName, setUserName] = useState([''])
  const [ParentStudentName, setParentStudentName] = useState('')
  const [Type, setType] = useState(['1'])

  const quizesRef = collection(db, "Quizes");
  const quizesRefACT = collection(db, "QuizesACT");
  const [CurrentQuizTopic, setCurrentQuizTopic] = useState('ComplexNumbers')
  //const storage = getStorage();

  const [Students, setStudents] = useState()
  const [AdminBool, setAdminBool] = useState(false)
  const [StudentsTotal, setStudentsTotal] = useState()
  const [StudentsTotalBool, setStudentsTotalBool] = useState()
  const [NameId, setNameId] = useState([])
  const [AdminInfoId, setAdminInfoId] = useState([])
  const usersRef = collection(db, "users");
  const constantsRef = collection(db, "GlobalVariables");
  const adminInfoRef = collection(db, "CompanyCodeAdminInfo");
  const [ErrorUpdate, setErrorUpdate] = useState(1)
  const [CurrentStudent, setCurrentStudent] = useState('')
  const [StudentAssignments, setStudentAssignments] = useState([])
  const [StudentAssignmentsClassroom, setStudentAssignmentsClassroom] = useState([])
  /*
  Unqiue Reading Values:
    'LiteralComprehension',
    'SupportingAndUndermining',
    'ReadingForFunction',
    'TheBigPicture',
    'GraphsAndCharts',
    'PairedPassages',

  */

  const [BluebookScore, setBluebookScore] = useState([200,200,200,200,200,200,200,200])
  
  const [IntensityOfStudying, setIntensityOfStudying] = useState(3);
  const [WeeklySchedule, setWeeklySchedule] = useState('');

  const [showBluebookTest, setShowBluebookTest] = useState(true);


  



  const [Topics, setTopics] = useState([['Absolute value', false, 50, 'Math'],
  ['Expressions', false, 50, 'Math'],
  ['Inequalities', false, 50, 'Math'],
  ['Lines', false, 50, 'Math'],
  ['Solving algebraic equations', false, 50, 'Math'],
  ['Systems of equations', false, 50, 'Math'],
  ['Word problems', false, 50, 'Math'],
  ['Complex numbers', false, 50, 'Math'],
  ['Constructing models', false, 50, 'Math'],
  ['Exponents and radicals', false, 50, 'Math'],
  ['Exponential and linear growth', false, 50, 'Math'],
  ['Functions', false, 50, 'Math'],
  ['Matching coefficients', false, 50, 'Math'],
  ['Quadratics', false, 50, 'Math'],
  ['Synthetic division', false, 50, 'Math'],
  //['Experiment design', false, 50, 'Math'],
  ['Mean, median and mode', false, 50, 'Math'],
  ['Percents', false, 50, 'Math'],
  ['Probability', false, 50, 'Math'],
  ['Ratio and proportion', false, 50, 'Math'],
  ['Reading data', false, 50, 'Math'],
  ['Scatter plots', false, 50, 'Math'],
  ['Angles', false, 50, 'Math'],
  ['Circles', false, 50, 'Math'],
  ['Triangles', false, 50, 'Math'],
  ['Trigonometry', false, 50, 'Math'],
  ['Volume', false, 50, 'Math'],
  ['Add, revise, or delete', false, 50, 'Verbal'],
  ['Apostrophes', false, 50, 'Verbal'],
  ['Combining and separating sentences', false, 50, 'Verbal'],
  ['Diction, idioms, and register', false, 50, 'Verbal'],
  ['Modification', false, 50, 'Verbal'],
  ['Non-essential and essential clauses', false, 50, 'Verbal'],
  ['Parallel structure', false, 50, 'Verbal'],
  ['Pronoun and noun agreement', false, 50, 'Verbal'],
  ['Punctuation', false, 50, 'Verbal'],
  ['Sentence and paragraph order', false, 50, 'Verbal'],
  ['Sentences and fragments', false, 50, 'Verbal'],
  ['Shorter is better', false, 50, 'Verbal'],
  ['Infographics', false, 50, 'Verbal'],
  ['Transitions', false, 50, 'Verbal'],
  ['Verb agreement and tense', false, 50, 'Verbal'],
  ['Word pairs and comparisons', false, 50, 'Verbal'],
  
  //Reading Additions
  ['Vocabulary in context', false, 50, 'Reading'],
  ['Literal Comprehension', false, 50, 'Reading'],
  ['Supporting And Undermining', false, 50, 'Reading'],
  ['Reading For Function', false, 50, 'Reading'],
  ['The Big Picture', false, 50, 'Reading'],
  ['Graphs And Charts', false, 50, 'Reading'],
  ['Paired Passages', false, 50, 'Reading'],
  ['Student notes', false, 50, 'Reading'],
  ['Text completions', false, 50, 'Reading'],
  

  ]
  );

  const [TopicsFull, setTopicsFull] = useState([['Absolute value', false, 50, 'Math'],
  ['Expressions', false, 50, 'Math'],
  ['Inequalities', false, 50, 'Math'],
  ['Lines', false, 50, 'Math'],
  ['Solving algebraic equations', false, 50, 'Math'],
  ['Systems of equations', false, 50, 'Math'],
  ['Word problems', false, 50, 'Math'],
  ['Complex numbers', false, 50, 'Math'],
  ['Constructing models', false, 50, 'Math'],
  ['Exponents and radicals', false, 50, 'Math'],
  ['Exponential and linear growth', false, 50, 'Math'],
  ['Functions', false, 50, 'Math'],
  ['Matching coefficients', false, 50, 'Math'],
  ['Quadratics', false, 50, 'Math'],
  ['Synthetic division', false, 50, 'Math'],
  //['Experiment design', false, 50, 'Math'],
  ['Mean, median and mode', false, 50, 'Math'],
  ['Percents', false, 50, 'Math'],
  ['Probability', false, 50, 'Math'],
  ['Ratio and proportion', false, 50, 'Math'],
  ['Reading data', false, 50, 'Math'],
  ['Scatter plots', false, 50, 'Math'],
  ['Angles', false, 50, 'Math'],
  ['Circles', false, 50, 'Math'],
  ['Triangles', false, 50, 'Math'],
  ['Trigonometry', false, 50, 'Math'],
  ['Volume', false, 50, 'Math'],

  ['Add, revise, or delete', false, 50, 'Verbal'],
  ['Apostrophes', false, 50, 'Verbal'],
  ['Combining and separating sentences', false, 50, 'Verbal'],
  ['Diction, idioms, and register', false, 50, 'Verbal'],
  ['Modification', false, 50, 'Verbal'],
  ['Non-essential and essential clauses', false, 50, 'Verbal'],
  ['Parallel structure', false, 50, 'Verbal'],
  ['Pronoun and noun agreement', false, 50, 'Verbal'],
  ['Punctuation', false, 50, 'Verbal'],
  ['Sentence and paragraph order', false, 50, 'Verbal'],
  ['Sentences and fragments', false, 50, 'Verbal'],
  ['Shorter is better', false, 50, 'Verbal'],
  ['Infographics', false, 50, 'Verbal'],
  ['Transitions', false, 50, 'Verbal'],
  ['Verb agreement and tense', false, 50, 'Verbal'],
  ['Word pairs and comparisons', false, 50, 'Verbal'],
  //Reading Additions
  ['Vocabulary in context', false, 50, 'Reading'],
  ['Literal Comprehension', false, 50, 'Reading'],
  ['Supporting And Undermining', false, 50, 'Reading'],
  ['Reading For Function', false, 50, 'Reading'],
  ['The Big Picture', false, 50, 'Reading'],
  ['Graphs And Charts', false, 50, 'Reading'],
  ['Paired Passages', false, 50, 'Reading'],
  ['Student notes', false, 50, 'Reading'],
  ['Text completions', false, 50, 'Reading'],

  ]);

  /*
  //Bluebook Additions
  ['Vocabulary in context', false, 50, 'Reading and Writing'],
  ['Reading for function', false, 50, 'Reading and Writing'],
  ['Text completions', false, 50, 'Reading and Writing'],
  ['Joining and separating sentences', false, 50, 'Reading and Writing'], //Combining and separating sentences (Done)
  ['Commas', false, 50, 'Reading and Writing'], //Non-essential and essential clauses (Done)
  ['Pronouns', false, 50, 'Reading and Writing'], // Pronoun and Noun Agreement (Done)
  ['Student notes', false, 50, 'Reading and Writing'],
  ['Word pairs and comparisons', false, 50, 'Reading and Writing'],
  ['Transitions', false, 50, 'Reading and Writing'],
  
  //Math Bluebook Additions
  ['Histograms', false, 50, 'Math'], //Statistics 1 (Done)
  ['Linear equation word problems', false, 50, 'Math'],// Manipulating and solving equations (Done)
  ['Sample data', false, 50, 'Math'], //Reading Data (Done)
  ['Mean, median, mode, standard deviation', false, 50, 'Math'], //Statistics 1 (Done)
  ['Area', false, 50, 'Math'], //Word problems (Done)
  ['Combining and factoring like terms', false, 50, 'Math'], // expressions (Done)
  ['Rational expressions', false, 50, 'Math'], //expressions (Done)
  ['Rearranging variables', false, 50, 'Math'] // More equation solving strategies (Done)

  */


  const FullBluebookTopicsMath = [
    "Histograms",
    "Quadratics",
    "Linear equation word problems",
    "Triangles",
    "Lines",
    "Probability",
    "Sample data",
    "Linear and exponential growth",
    "Circles",
    "Systems of equations",
    "Volume",
    "Trigonometry",
    "Mean, median, mode, standard deviation",
    "Solving linear equations",
    "Area",
    "Combining and factoring like terms",
    "Rational expressions",
    "Percent",
    "Non-linear functions",
    "Angles",
    "Ratio, proportion, rate",
    "Rearranging variables",
    "Scatter plots",
    "Linear inequality word problems",
    "Exponents and radicals",
    "Absolute value"
];

  const FullBluebookTopicsVerbal = ['Vocabulary in context','Reading for function','Text completions','Joining and separating sentences','Commas','Pronouns','Student notes','Word pairs and comparisons','Transitions'];
  //We should probably remove these soon
  const [TopicsBookCapter, setTopicsBookCapter] = useState(['20','6','11','14/15','8','10','12','19','7','1','3','16','9','17','18','28','27','2','26','5','25','28','1','13','7','5','18','9','17','14','','2','6','4','3','8','15','16','','','','','',''])
  const [TopicsBookCapterConst, setTopicsBookCapterConst] = useState(['20','6','11','14/15','8','10','12','19','7','1','3','16','9','17','18','28','27','2','26','5','25','28','1','13','7','5','18','9','17','14','','2','6','4','3','8','15','16','','','','','',''])
  
  const [TopicsACT, setTopicsACT] = useState([
    ['Word problems', false, 50, 'Math'],
    ['Absolute value', false, 50, 'Math'],
    ['Expressions', false, 50, 'Math'],
    ['Inequalities', false, 50, 'Math'],
    ['Solving equations', false, 50, 'Math'],
    ['Systems of equations', false, 50, 'Math'],
    ['Complex numbers', false, 50, 'Math'],
    ['Exponents and radicals', false, 50, 'Math'],
    ['Numbers and Operations', false, 50, 'Math'],
    ['Properties of numbers', false, 50, 'Math'],
    ['Functions', false, 50, 'Math'],
    ['Coordinate Geometry', false, 50, 'Math'],
    ['Quadratics', false, 50, 'Math'],
    ['Logaritms', false, 50, 'Math'],
    ['Matrices', false, 50, 'Math'],
    ['Sequences', false, 50, 'Math'],
    ['Percents', false, 50, 'Math'],
    ['Probability', false, 50, 'Math'],
    ['Ratio and proportion', false, 50, 'Math'],
    ['Vectors', false, 50, 'Math'],
    ['Area and Perimeter', false, 50, 'Math'],
    ['Angles', false, 50, 'Math'],
    ['Circles', false, 50, 'Math'],
    ['Triangles', false, 50, 'Math'],
    ['Trigonometry', false, 50, 'Math'],
    ['Volume', false, 50, 'Math'],
    ['Ellipses', false, 50, 'Math'],
    ['Data and Statistics', false, 50, 'Math'],
    ['Add, revise, or delete', false, 50, 'Verbal'],
    ['Apostrophes', false, 50, 'Verbal'],
    ['Joining and separating sentences', false, 50, 'Verbal'],
    ['Diction, idioms, and register', false, 50, 'Verbal'],
    ['Modification', false, 50, 'Verbal'],
    ['Non-essential and essential clauses', false, 50, 'Verbal'],
    ['Parallel structure', false, 50, 'Verbal'],
    ['Pronouns', false, 50, 'Verbal'],
    ['Punctuation', false, 50, 'Verbal'],
    ['Sentence and paragraph order', false, 50, 'Verbal'],
    ['Sentences and fragments', false, 50, 'Verbal'],
    ['Shorter is better', false, 50, 'Verbal'],
    ['Transitions', false, 50, 'Verbal'],
    ['Verbs', false, 50, 'Verbal'],
    ['Word pairs and comparisons', false, 50, 'Verbal'],
    ['Evaluation of Purpose', false, 50, 'Verbal'],
    ['Adjectives and Adverbs', false, 50, 'Verbal'],
    //Reading Additions
    ['Literal Comprehension', false, 50, 'Reading'],
    ['Supporting And Undermining', false, 50, 'Reading'],
    ['Reading For Function', false, 50, 'Reading'],
    ['The Big Picture', false, 50, 'Reading'],
    ['Graphs And Charts', false, 50, 'Reading'],
    ['Paired Passages', false, 50, 'Reading'],
    //Science Additions
    ["Locators", false, 50, 'Science'],
    ["Trends In Tables And Figures", false, 50, 'Science'],
    ["Extrapolation And Estimation", false, 50, 'Science'],
    ["Data Bridge", false, 50, 'Science'],
    ["Data Full Sentence", false, 50, 'Science'],
    ["Cannot Be Determined", false, 50, 'Science'],
    ["Equations", false, 50, 'Science'],
    ["Mixing", false, 50, 'Science'],
    ["Scatter Plot", false, 50, 'Science'],
    ["Inference Question", false, 50, 'Science'],
    ["Method Table", false, 50, 'Science'],
    ["Method Figures", false, 50, 'Science'],
    ["Generic Labels", false, 50, 'Science'],
    ["Inverse Trends", false, 50, 'Science'],
    ["Outside Knowledge", false, 50, 'Science']
  ]);
  
  const [TopicsFullACT, setTopicsFullACT] = useState([
    ['Word problems', false, 50, 'Math'],
    ['Absolute value', false, 50, 'Math'],
    ['Expressions', false, 50, 'Math'],
    ['Inequalities', false, 50, 'Math'],
    ['Solving equations', false, 50, 'Math'],
    ['Systems of equations', false, 50, 'Math'],
    ['Complex numbers', false, 50, 'Math'],
    ['Exponents and radicals', false, 50, 'Math'],
    ['Numbers and Operations', false, 50, 'Math'],
    ['Properties of numbers', false, 50, 'Math'],
    ['Functions', false, 50, 'Math'],
    ['Coordinate Geometry', false, 50, 'Math'],
    ['Quadratics', false, 50, 'Math'],
    ['Logaritms', false, 50, 'Math'],
    ['Matrices', false, 50, 'Math'],
    ['Sequences', false, 50, 'Math'],
    ['Percents', false, 50, 'Math'],
    ['Probability', false, 50, 'Math'],
    ['Ratio and proportion', false, 50, 'Math'],
    ['Vectors', false, 50, 'Math'],
    ['Area and Perimeter', false, 50, 'Math'],
    ['Angles', false, 50, 'Math'],
    ['Circles', false, 50, 'Math'],
    ['Triangles', false, 50, 'Math'],
    ['Trigonometry', false, 50, 'Math'],
    ['Volume', false, 50, 'Math'],
    ['Ellipses', false, 50, 'Math'],
    ['Data and Statistics', false, 50, 'Math'],
    ['Add, revise, or delete', false, 50, 'Verbal'],
    ['Apostrophes', false, 50, 'Verbal'],
    ['Joining and separating sentences', false, 50, 'Verbal'],
    ['Diction, idioms, and register', false, 50, 'Verbal'],
    ['Modification', false, 50, 'Verbal'],
    ['Non-essential and essential clauses', false, 50, 'Verbal'],
    ['Parallel structure', false, 50, 'Verbal'],
    ['Pronouns', false, 50, 'Verbal'],
    ['Punctuation', false, 50, 'Verbal'],
    ['Sentence and paragraph order', false, 50, 'Verbal'],
    ['Sentences and fragments', false, 50, 'Verbal'],
    ['Shorter is better', false, 50, 'Verbal'],
    ['Transitions', false, 50, 'Verbal'],
    ['Verbs', false, 50, 'Verbal'],
    ['Word pairs and comparisons', false, 50, 'Verbal'],
    ['Evaluation of Purpose', false, 50, 'Verbal'],
    ['Adjectives and Adverbs', false, 50, 'Verbal'],
    //Reading Additions
    ['Literal Comprehension', false, 50, 'Reading'],
    ['Supporting And Undermining', false, 50, 'Reading'],
    ['Reading For Function', false, 50, 'Reading'],
    ['The Big Picture', false, 50, 'Reading'],
    ['Graphs And Charts', false, 50, 'Reading'],
    ['Paired Passages', false, 50, 'Reading'],
    //Science Additions
    ["Locators", false, 50, 'Science'],
    ["Trends In Tables And Figures", false, 50, 'Science'],
    ["Extrapolation And Estimation", false, 50, 'Science'],
    ["Data Bridge", false, 50, 'Science'],
    ["Data Full Sentence", false, 50, 'Science'],
    ["Cannot Be Determined", false, 50, 'Science'],
    ["Equations", false, 50, 'Science'],
    ["Mixing", false, 50, 'Science'],
    ["Scatter Plot", false, 50, 'Science'],
    ["Inference Question", false, 50, 'Science'],
    ["Method Table", false, 50, 'Science'],
    ["Method Figures", false, 50, 'Science'],
    ["Generic Labels", false, 50, 'Science'],
    ["Inverse Trends", false, 50, 'Science'],
    ["Outside Knowledge", false, 50, 'Science']
  ]);

  const [TopicsBookCapterACT, setTopicsBookCapterACT] = useState(['26','1','4','21','3','20','7','2','5','6','11','14','13','25','28','27','10','23','9','28','18','15','17','16','22','19','28','24','18','1','3','16','12','4','13','9','5,6,7','19','2','15','17','8','11','20','10'])
  const [TopicsBookCapterConstACT, setTopicsBookCapterConstACT] = useState(['26','1','4','21','3','20','7','2','5','6','11','14','13','25','28','27','10','23','9','28','18','15','17','16','22','19','28','24','18','1','3','16','12','4','13','9','5,6,7','19','2','15','17','8','11','20','10'])
  const [DiagnosticsTestData, setDiagnosticsTestData] = useState([])

//Ended updates at chapter 12
  //const [TopicCat, setTopicCat] = useState([['Math','0:27'],['Verbal', '28:46']])
  const [TopicsBool, setTopicsBool]= useState([])
  const [NextCurrentStudentDate, setNextCurrentStudentDate] = useState('');
  const [NextClassDate, setNextClassDate] = useState('');
  const [TextOutput, setTextOutput] = useState('')
  const [TutorNotes, setTutorNotes] = useState('')
  const [CurrentStudentTestDate, setCurrentStudentTestDate] = useState(new Date());

  

  const [TopicsMath, setTopicsMath] = useState([])
  const [TopicsVerbal, setTopicsVerbal] = useState([])
  const [TopicsMathACT, setTopicsMathACT] = useState([])
  const [TopicsVerbalACT, setTopicsVerbalACT] = useState([])
  const [TopicsReading, setTopicsReading] = useState([])
  const [TopicsScience, setTopicsScience] = useState([])


  const [CurrentTestNumber, setCurrentTestNumber] = useState(1)
  const [ZoomLink, setZoomLink] = useState('')

  const [StudentAnswerData, setStudentAnswerData] = useState()

  const [MathrowsGlobal, setMathrowsGlobal] = useState([])
  const [VerbalrowsGlobal, setVerbalrowsGlobal] = useState([])
  const [ReadingrowsGlobal, setReadingrowsGlobal] = useState([])
  const [SciencerowsGlobal, setSciencerowsGlobal] = useState([])
  const [MathrowsGlobalClassroom, setMathrowsGlobalClassroom] = useState([])
  const [VerbalrowsGlobalClassroom, setVerbalrowsGlobalClassroom] = useState([])
  const [ReadingrowsGlobalClassroom, setReadingrowsGlobalClassroom] = useState([])
  const [SciencerowsGlobalClassroom, setSciencerowsGlobalClassroom] = useState([])
  
  const [HWrowsGlobal, setHWrowsGlobal] = useState([])
 

  const [AssignmentsDoneGlobal, setAssignmentsDoneGlobal] = useState([])
  const [QuizResultsGlobal, setQuizResultsGlobal] = useState('')

  const [ClassroomStudents, setClassroomStudents] = useState([])
  const [ClassroomStudentsClean, setClassroomStudentsClean] = useState([])
  const [ClassroomStudentsACT, setClassroomStudentsACT] = useState([])
  const [ClassroomStudentsCleanACT, setClassroomStudentsCleanACT] = useState([])
  const [ClassroomRows, setClassroomRows] = useState([])

  const links = useRef([]);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);
 
  const [Events, setEvents] = useState([]);

  const [AddStudentBinary, setAddStudentBinary] = useState(false)
  const [NewMeetingString, setNewMeetingString] = useState()
  const[CalendarSwitch, setCalendarSwitch] = useState(false)

  const [ChangeAvailabilityObject, setChangeAvailabilityObject] = useState(null)
  const [ShowAvailabilityObject, setShowAvailabilityObject] = useState(false)
  const [ShowAvailabilityObjectName, setShowAvailabilityObjectName] = useState('false')


  const [order, setOrder] = React.useState('desc');
  const [orderBy, setOrderBy] = React.useState('Category');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [orderMath, setOrderMath] = React.useState('desc');
  const [orderByMath, setOrderByMath] = React.useState('Category');
  const [selectedMath, setSelectedMath] = React.useState([]);
  

  const [orderVerbal, setOrderVerbal] = React.useState('desc');
  const [orderByVerbal, setOrderByVerbal] = React.useState('Category');
  const [selectedVerbal, setSelectedVerbal] = React.useState([]);

  const [orderReading, setOrderReading] = React.useState('desc');
  const [orderByReading, setOrderByReading] = React.useState('Category');
  const [selectedReading, setSelectedReading] = React.useState([]);

  const [orderScience, setOrderScience] = React.useState('desc');
  const [orderByScience, setOrderByScience] = React.useState('Category');
  const [selectedScience, setSelectedScience] = React.useState([]);


  const [TriSwitchSpreadSheetValues, setTriSwitchSpreadSheetValues] = useState(0)
  const [TriSwitchSpreadSheetValuesDiagnostics, setTriSwitchSpreadSheetValuesDiagnostics] = useState(0)


  const [DisableService, setDisableService] = useState(true)
  const [DisableBilling, setDisableBilling] = useState(true)

  const [TestSVG, setTestSVG] = useState(0)

  const [CurrentAIQuestionInPacket, setCurrentAIQuestionInPacket] = useState(1)
  const [CurrentPhaseInQuestion, setCurrentPhaseInQuestion] = useState(0)

  const [correctAnswerChoicePractice, setCorrectAnswerChoicePractice] = useState('');
  const [showAI, setShowAI] = useState(false);

  const [CurrentPracticeQuestion, setCurrentPracticeQuestion] = useState('Random')
  const [PossibleCurrentPracticeQuestion, setPossibleCurrentPracticeQuestion] = useState(['Random'])
  const [CurrentQuizQuestion, setCurrentQuizQuestion] = useState(1)
  const [PosibleCurrentQuizQuestion, setPosibleCurrentQuizQuestion] = useState(['1'])


  const canvasRefCustomImage = useRef();
  const [imageDataUrl, setImageDataUrl] = useState(null);
  
  const [CurrentLocalTopicForQuestions, setCurrentLocalTopicForQuestions] = useState('')
  const [refreshKey, setRefreshKey] = useState(0);
 
  const [isIpad, setIsIpad] = useState(false);

  const [newStudentEmail, setNewStudentEmail] = useState('');
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentPhoneNumber, setNewStudentPhoneNumber] = useState('');
  const [newStudentPassword, setNewStudentPassword] = useState('');
  const [newStudentPasswordConfirm, setNewStudentPasswordConfirm] = useState(0);
  const [newUserError, setNewUserError] = useState('');
  const [newStudentTest, setNewStudentTest] = useState('SAT');
  const [newStudentType, setNewStudentType] = useState('Student');
  const [isHovered, setIsHovered] = useState(false);
  /*
  const lockedDiv = document.querySelector('.NavDiv');
  const lockedLogOff = document.querySelector('.IconDivLogOff2');

  function updatePosition() {
    // Convert window scroll position to vh and vw
    const yPositionVh = window.scrollY / (window.innerHeight / 100);
    const xPositionVw = window.scrollX / (window.innerWidth / 100);



    // Update the style to "lock" the position using CSS transforms
    lockedDiv.style.transform = `translate(${xPositionVw}vw, ${yPositionVh}vh)`;
    lockedLogOff.style.transform = `translate(${xPositionVw}vw, ${yPositionVh}vh)`;
  }

  // Listen for scroll events
  window.addEventListener('scroll', updatePosition);

  // Update position on resize to adjust for changes in VH/VW
  window.addEventListener('resize', updatePosition);

  // Initial update in case of any initial scroll
  //updatePosition();
  */
  function resetAllStatesToOriginal(){

    setDiagnosticsTestData([]);
    // setTopicCat([['Math','0:27'],['Verbal', '28:46']]); // Commented out as per your note
    setTopicsBool([]);
    setNextCurrentStudentDate('');
    setNextClassDate('');
    setTextOutput('');
    setTutorNotes('');
    setCurrentStudentTestDate(new Date());
  
    setTopicsMath([]);
    setTopicsVerbal([]);
    setTopicsMathACT([]);
    setTopicsVerbalACT([]);
    setTopicsReading([]);
    setTopicsScience([]);
  
    setCurrentTestNumber(1);
    setZoomLink('');
  
    setStudentAnswerData(undefined); // Assuming original is undefined due to lack of initial value
  
    setMathrowsGlobal([]);
    setVerbalrowsGlobal([]);
    setReadingrowsGlobal([]);
    setSciencerowsGlobal([]);
    setMathrowsGlobalClassroom([]);
    setVerbalrowsGlobalClassroom([]);
    setReadingrowsGlobalClassroom([]);
    setSciencerowsGlobalClassroom([]);
  
    setHWrowsGlobal([]);
   
    setAssignmentsDoneGlobal([]);
    setQuizResultsGlobal('');
  
    setClassroomStudents([]);
    setClassroomStudentsClean([]);
    setClassroomStudentsACT([]);
    setClassroomStudentsCleanACT([]);
    setClassroomRows([]);
  
    // Assuming links is a ref, its current value can be reset like this

    setIsMobileOpen(false);
    setIsSideDrawerOpen(false);
  
    setEvents([]);
  
    setAddStudentBinary(false);
    setNewMeetingString(undefined); // Assuming original is undefined due to lack of initial value
    setCalendarSwitch(false);
  
    setChangeAvailabilityObject(null);
    setShowAvailabilityObject(false);
    setShowAvailabilityObjectName('false');
     
    setOrder('desc');
    setOrderBy('Category');
    setSelected([]);
    setPage(0);
    setDense(false);
    setRowsPerPage(5);
  
    setOrderMath('desc');
    setOrderByMath('Category');
    setSelectedMath([]);
  
    setOrderVerbal('desc');
    setOrderByVerbal('Category');
    setSelectedVerbal([]);
  
    setOrderReading('desc');
    setOrderByReading('Category');
    setSelectedReading([]);
  
    setOrderScience('desc');
    setOrderByScience('Category');
    setSelectedScience([]);
  
    setTriSwitchSpreadSheetValues(0);
    setTriSwitchSpreadSheetValuesDiagnostics(0);
  
    setDisableService(true);
    setDisableBilling(true);
  
    setTestSVG(0);
  
    setCurrentAIQuestionInPacket(1);
    setCurrentPhaseInQuestion(0);
  
    setCorrectAnswerChoicePractice('');
    setShowAI(false);
    
    setCurrentPracticeQuestion('Random');
    setPossibleCurrentPracticeQuestion(['Random']);
    setCurrentQuizQuestion(1);
    setPosibleCurrentQuizQuestion(['1']);
  
    // Assuming imageDataUrl and canvasRefCustomImage are managed differently since one is a state and the other is a ref
    setImageDataUrl(null);
  
    setCurrentLocalTopicForQuestions('');
    setRefreshKey(0);
  


 
  
    setNewStudentEmail('');
    setNewStudentName('');
    setNewStudentPhoneNumber('');
    setNewStudentPassword('');
    setNewStudentPasswordConfirm(0);
    setNewUserError('');
    setNewStudentTest('SAT');
    setNewStudentType('Student');
    setIsHovered(false);



    //setBluebookScore([200, 200, 200, 200, 200, 200, 200, 200]);
    setIntensityOfStudying(3);
    setWeeklySchedule('');
    setShowBluebookTest(true);
   

    setErrorMessage('');
    
    setUserName(['']);
    
    setParentStudentName('');
    //setType(['1']);
    
    // Note: Firebase collections (quizesRef, quizesRefACT, usersRef, constantsRef, adminInfoRef) are not states and cannot be reset in this manner
    
    setCurrentQuizTopic('ComplexNumbers');
    
    //setStudents(undefined); // Assuming original is undefined due to lack of initial value
    //setAdminBool(false);
    //setStudentsTotal(undefined); // Assuming original is undefined due to lack of initial value
    //setStudentsTotalBool(undefined); // Assuming original is undefined due to lack of initial value
    //setNameId([]);
    //setAdminInfoId([]);
  

    setErrorUpdate(1);
    setCurrentStudent('');
    setStudentAssignments([]);
    setStudentAssignmentsClassroom([]);

    setSwitchText('Add');

    setButtonPressed(false);
    setData([
      [{ value: "Test" }, { value: "Section" },{ value: "Question" }, { value: "Subject" },{ value: "Question Subject" },{ value: "Student Answer" },{value:'Correct Answer'},{ value: "Match" }],
    ]);



    setDataAssignments([]);
    //setDataTotal(null);
    setDataTotalRaw([]);
    setStandardizedTestsDone([true,true,true,true,true,true,true,true,true,true]);
    setStandardizedTestDoneConst([true,true,true,true,true,true,true,true,true,true]);
   
    setNewAssignmentsViewed(true);
    setLatestPopupViewed(true);
    setSuggestedAssignments([]);
    setPullStudentDataDone(false);
    //setUpdateData(0);
    setDiagnosticsNumCorrect([]);
    setStudentTestAnswers(undefined); // Assuming original is undefined due to lack of initial value
    setNewAssignment('');
    setQuiz('');
    setNewTutorURL('');
    setNewStudentURL('');
 

    setNewPDFName('');
    setNewPDFURL('');
    setValueTab(0);
    setValueTabQuiz(0);
    setBinaryBool(false);
    setShowCorrectAnswers(true);
    setShowTable(true);
    setTempA([true,false]);
    setDiagnosticsResults([]);
    setShowOrHideAnswers('Hide');
    setSpreadsheetUpdate(undefined); // Assuming original is undefined due to lack of initial value
    // PlusButtonUpdate state reset may not be necessary if it's a static value; handle accordingly if it's dynamic

    // Whiteboard values
    setNumPages(null);
    setPageNumber(1);
    setisEraser(false);
    setPenColor('black');
    setPenSize(4);
    setcurrPDF('');
    setshowPDF(false);
    setwhiteboardStyle('sketchDivOutside');
    setshowCalculator(false);
    setAddOrRemoveStudent('add');
    setCurrentTestDone(0);
    


   
  }

  function generatePassword() {
    const words = [
        "apple", "banana", "carrot", "dog", "egg", "fish", "grape", "hand", "ant", "bear", 
        "cat", "deer", "eel", "bird", "frog", "horse", "iguana", "jelly", "kiwi", "lion", 
        "mouse", "nut", "ostrich", "pig", "quail", "rabbit", "snail", "tiger", "urchin", 
        "vole", "whale", "xray", "yak", "zebra", "bee", "cow", "duck", "elephant", "flamingo",
        "goat", "hawk", "insect", "jay", "kangaroo", "leopard", "monkey", "newt", "octopus",
        "panther", "quokka", "raccoon", "sheep", "turkey", "unicorn", "vulture", "walrus",
        "xenops", "yarn", "zeppelin", "bat", "chipmunk", "dolphin", "ferret", "gorilla", 
        "heron", "ibis", "jaguar", "koala", "llama", "meerkat", "narwhal", "otter", "penguin",
        "quartz", "rhino", "salamander", "toucan", "uakari", "viper", "wombat", "xerus",
        "yeti", "zucchini"
    ];

    const numWords = 3;
    let password = "";

    for (let i = 0; i < numWords; i++) {
        const randomIndex = Math.floor(Math.random() * words.length);
        let word = words[randomIndex];
        
        // Convert the first letter to uppercase
        password += word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }

    return password;
}

function removeTextWithinParentheses(arr) {
  // Regular expression to match text within parentheses (not accounting for nested parentheses)
  const regex = /\([^)]*\)/g;

  // Map through the array and replace instances of text within parentheses with an empty string
  return arr.map(item => item.replace(regex, ''));
}

function isValidEmail(email) {
  // This pattern checks for the general form of an email address
  // (local part, "@" symbol, domain).
  // Please note that no regular expression can match all valid email addresses
  // due to the complexities of the official specification. However, this pattern
  // should suffice for most use cases.
  const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  return pattern.test(email);
}
function isValidPhoneNumber(phone) {
// This pattern checks for phone numbers in various formats:
// (123) 456-7890, 123-456-7890, 123.456.7890, 1234567890, +31636363634, +911234567890
const pattern = /^(\+\d{1,2}\s?)?1?\-?\.?\(?\d{3}\)?[\-\.]?\d{3}[\-\.]?\d{4}$/;

return pattern.test(phone);
}



  useEffect(() => {
    var TempPassword = generatePassword()
    setNewStudentPassword(TempPassword)
  }, []);

  useEffect(() => {
    if(newStudentPasswordConfirm>0 && newUserError == ''){
      console.log("Registering")
      console.log(newStudentName)
      console.log(newStudentEmail)
      console.log(newStudentPassword)
      console.log(newStudentType.value)
      console.log(newStudentTest.value)
      console.log(newStudentPhoneNumber)
      console.log(CompanyCode)
      
      /*
      registerWithEmailAndPasswordAdmin( newStudentName, newStudentEmail, newStudentPassword, newStudentType.student, newStudentTest.value,'', newStudentPhoneNumber, CompanyCode, false).then((userCredential) => {
        setNewStudentEmail('')
        setNewStudentName('')
        setNewStudentPhoneNumber('')
        setNewStudentPassword(generatePassword())
    
        setNewStudentTest('SAT')
      
      });
      */
    }
    
  }, [newStudentPasswordConfirm]);

  useEffect(() => {
    if(isValidEmail(newStudentEmail) && isValidPhoneNumber(newStudentPhoneNumber)){
      setNewUserError('')
    }
    else if(!isValidEmail(newStudentEmail)){
      setNewUserError('Invalid Email')
    }
    else if(!isValidPhoneNumber(newStudentPhoneNumber)){
      setNewUserError('Invalid Phone Number')
    }
    
  }, [newStudentEmail, newStudentPhoneNumber ]);
    



    useEffect(() => {
       
        setIsIpad(/iPad/.test(navigator.userAgent));
    }, []);

    useEffect(() => {
      if (isIpad) {
        window.document.body.style.zoom = "90%";  // 50% zoom out
      }
    }, [isIpad]);

  const refresh = () => {
   
    setRefreshKey( refreshKey + 1);
  };

  function sendShaCodeToFirebase(shaCode, sentiment) {
    function FindMatchingId(ID){
      //NameId
      //CurrentStudent
      
      for(var i = 0; i< NameId.length; i++){
      
        if(ID == NameId[i][2]){
          return(NameId[i][1])
        }
      }
    }

    //string of current time
    var today = new Date();
    today = today.toString();

    
    
    //const x = query(usersRef, where("uid", "==", auth.currentUser.uid.toString()));
    var studentDef = doc(db, "users", FindMatchingId(auth.currentUser.uid.toString()));

    if(true){
      updateDoc(studentDef, {
        Students: arrayUnion((shaCode+ "-" + sentiment + "-" + today).toString())
      
        });
    }
  }


  function convertUnixToDateTimeString(unixTimestamp) {
    // Ensure the timestamp is in milliseconds for the JavaScript Date object.
    const date = new Date(unixTimestamp * 1000);
  
    // Extract the date and time parts.
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
  
    // Construct the date and time string.
    const dateTimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  
    return dateTimeString;
}


  const [CurrentShaCode, setCurrentShaCode] = useState('')
  const [CurrentQuestionInfo, setCurrentQuestionInfo] = useState('')
  const [QuizSwitch, setQuizSwitch] = useState(false)
  const [SurveySentiment, setSurveySentiment] = useState('')
  const [QuestionNeedsReview, setQuestionNeedsReview] = useState(false)
 
  const [ServeyAnswers, setServeyAnswers] = useState('')
  const [ServeyDifficulty, setServeyDifficulty] = useState('')
  const [QuizProblemNumber, setQuizProblemNumber] = useState(0)
  var QuizQuestionLengths =  [['ACT_NumbersAndOpperationsValues', 11], ['ACT_PropertiesOfNumbersValues', 15], ['ACT_LinesValues', 12], ['ACT_CordinateGeometryValues', 9], ['ACT_ProbabilityValues', 10], ['ACT_PassagesAndQuestionsModifications', 3], ['Locators', 2], ['TrendsInTablesAndFigures', 2], ['ExtrapolationAndEstimation', 1], ['DataBridge', 2], ['DataFullSentence', 1], ['CannotBeDetermined', 1], ['Equations', 1], ['Mixing', 1], ['ScatterPlot', 1], ['InferenceQuestion', 1], ['MethodTable', 1], ['MethodFigures', 1], ['GenericLabels', 1], ['InverseTrends', 1], ['OutsideKnowledge', 7], ['SAT_ExponentsAndRadicals', 16], ['SAT_Percent', 20], ['SAT_ExponentialGrowth', 17], ['SAT_Rates', 21], ['SAT_RatioAndProportion', 15], ['SAT_Expressions', 15], ['SAT_ConstructingModels', 14], ['SAT_ManipulatingSolvingEquations', 32], ['SAT_MoreEquationSolvingStrategies', 18], ['SAT_Inequalities', 16], ['SAT_WordProblems', 23], ['SAT_MinimumAndMaximumWordProblems', 17], ['SAT_LinesQuestions', 15], ['SAT_InterpretingLinearModels', 16], ['SAT_Functions', 32], ['SAT_Quadratics', 19], ['SAT_SyntheticDivision', 14], ['SAT_ComplexNumbers', 15], ['SAT_AbsoluteValue', 15], ['SAT_SystemsOfEquations', 24], ['SAT_Angles', 14], ['SAT_Triangle', 29], ['SAT_Circle', 14], ['SAT_Trig', 15], ['SAT_ReadingData', 13], ['SAT_Probability', 15], ['SAT_Statistics1', 15], ['SAT_Statistics2', 15], ['SAT_Volume', 14], ['SAT_AddingDeletingRevising', 8], ['SAT_SentenceAndParagraphOrder', 5], ['SAT_lnfographics', 2], ['SAT_ShorterIsBetter', 5], ['SAT_DictionIdiomsAndRegister', 5], ['SAT_CombiningSeparatingSentences', 10], ['SAT_Transitions', 10], ['SAT_NonEssentialAndEssentialClauses', 9], ['SAT_ColonsAndDashes', 5], ['SAT_ApostrophesPluralVsPossessive', 15], ['SAT_PronounAndNounAgreement', 10], ['SAT_VerbsAgreementAndTense', 8], ['SAT_WordPairsAndComparisons', 5], ['SAT_ParallelStructure', 10], ['SAT_DanglingAndMisplacedModifiers', 5], ['SAT_RelativePronouns', 5], ['SAT_VocabularyInContext', 15], ['SAT_PronounsAndCompressionNouns', 11], ['SAT_TheBigPicture', 5], ['SAT_LiteralComprehension', 7], ['SAT_ReadingForFunction', 7], ['SAT_TextCompletion', 6], ['SAT_SupportingAndUndermining', 8], ['SAT_GraphsAndCharts', 4], ['SAT_PairedPassages', 4]]
  const [CurrentQuizResults, setCurrentQuizResults] = useState([])
  const [QuizQuestionsDone, setQuizQuestionsDone] = useState(false);
  const [ShowIntro, setShowIntro] = useState(false);
  const [IntroInformation, setIntroInformation] = useState('');

  const PracticeDivRef = useRef(null);
  const handleChangeSurveyAnswers = (event) => {
    setServeyAnswers(event.target.value);
  };
  const handleChangeSurveyDifficulty = (event) => {
    setServeyDifficulty(event.target.value);
  };
  function resetChangeSurvey() {
    setServeyAnswers('');
    setServeyDifficulty('');
  };

const BASE85_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!#$%&()*+-;<=>?@^_`{|}~";
const BASE = 85;

function encodeBase85(input) {
    let buffer = 0;
    let count = 0;
    let output = '';

    for (let i = 0; i < input.length; i++) {
        buffer = (buffer * 256) + input.charCodeAt(i);
        count++;

        if (count === 4) {
            let quotient = buffer;
            for (let j = 0; j < 5; j++) {
                output = BASE85_CHARS[quotient % BASE] + output;
                quotient = Math.floor(quotient / BASE);
            }

            buffer = 0;
            count = 0;
        }
    }

    if (count > 0) {
        for (let j = count; j < 4; j++) {
            buffer *= 256;
        }
        let quotient = buffer;
        for (let j = 0; j < count + 1; j++) {
            output = BASE85_CHARS[quotient % BASE] + output;
            quotient = Math.floor(quotient / BASE);
        }
    }

    return output;
}

function formatDateString(dateString) {
  // Parse the date string to a Date object
  if(dateString == ''){
    return('No meeting scheduled yet')
  }

  var date = new Date(dateString);

  // Format the date
  var formattedDate = date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      // second: '2-digit',
      //timeZoneName: 'short'
  });

  return formattedDate;
}



const [modalAIIsOpen, setModalAIIsOpen] = useState(false);
const [modalType, setModalType] = useState('Assignments');

  function openModalAI() {
    setModalAIIsOpen(true);
  }

  function closeModalAI() {
    setModalAIIsOpen(false);
  }



function toPascalCase(str) {
  // split the string into words
  let words = str.toLowerCase().split(' ');

  // capitalize the first letter of each word
  for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }

  // join the words back together
  return words.join('');
}


function FindVideoURLData(arr){
  var Data = ''
  for(var i = 0; i<arr.length; i++){
    Data = Data + arr[i].Category.toString() + '-'+ arr[i].Percent.toString() + '_'
  }
  return(Data)
}
const [CurrentTutorVideoURL, setCurrentTutorVideoURL] = useState('')
  function EncodeVideoURL(){
    var key = 'TutorSpace' 
    var Data = CurrentTest + '%' + FindVideoURLData(MathrowsGlobal) + '%' + FindVideoURLData(VerbalrowsGlobal) + '%' + FindVideoURLData(ReadingrowsGlobal) + '%' + FindVideoURLData(SciencerowsGlobal) + '%' + key

    
    Data = encodeBase85(Data)
   
    setCurrentTutorVideoURL(Data)
    return(Data)
  }


  /*
    Picture Logic: Fetch the image, allow user to answer question, user selects a answer choice/free response, user selects positive or negative feelings about the question, the correct or incorrect answer pops up, the user can close out of the popup and move onto the next question
  */
   
    function base64toBlobURL(base64Data, contentType='', sliceSize=512) {
      const byteCharacters = atob(base64Data);
      const byteArrays = [];
  
      for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          const slice = byteCharacters.slice(offset, offset + sliceSize);
  
          const byteNumbers = new Array(slice.length);
          for (let i = 0; i < slice.length; i++) {
              byteNumbers[i] = slice.charCodeAt(i);
          }
  
          const byteArray = new Uint8Array(byteNumbers);
          byteArrays.push(byteArray);
      }
  
      const blob = new Blob(byteArrays, {type: contentType});
      return URL.createObjectURL(blob);
  }


  function fetchImageData() {
      

    if(QuizSwitch == true){
      var uid = "4GuW9UcMzSYdJ6TfLPzhmhyxZ2i2";
     
      var urlTopic = toPascalCase(CurrentLocalTopicForQuestions).replaceAll(' ', '').replaceAll(',','').replaceAll('-','');
      var newURL = (CurrentTest)+'_'+(urlTopic)
    
      var url = `https://josephtauzin.pythonanywhere.com/usr/${uid}&${newURL}&${true}&${QuizProblemNumber}`;
      var localURL = `https://192.168.1.152:5005/usr/${uid}&${newURL}&${true}&${QuizProblemNumber}`;
      //var url = localURL

      console.log('url',url)

      
    if(CurrentLocalTopicForQuestions != ''){
      //var uid = auth.currentUser.uid.toString();


      
    
      

      return fetch(url)
          .then(response => response.json())
          .then(data => {
              // Create an image from the base64 string
              let img = new Image();
              img.src = `data:image/jpeg;base64,${data.image_data}`;
              console.log('data',data)
           
              const blobUrl = base64toBlobURL(data.image_data, 'image/jpeg');
             
              setImageDataUrl(blobUrl);
              //setImageDataUrl
             
              setCurrentQuestionInfo(data.question_data)
              setIntroInformation(data.intro_data)

              var PossibleQuestions = []
              for (var i = 0; i < parseInt(data.number_of_questions); i++) {
                PossibleQuestions.push(i+1)
              }
              setPosibleCurrentQuizQuestion(PossibleQuestions)

              //setCurrentShaCode(data.question_data.sha_code)
              // Log the additional data or do something with it
           
              setCorrectAnswerChoicePractice('')
              setCurrentChoiceSelected('')
              setShowExplanation(false)
              setSurveySentiment('')
              setServeyAnswers('')
              setServeyDifficulty('')
              
              setQuestionNeedsReview(false)
              clearHandler()

              return img;
          })
          .catch(error => {
              console.error("Error fetching image:", error);
          });
        
      }


    }else{
      var uid = "4GuW9UcMzSYdJ6TfLPzhmhyxZ2i2";

      var urlTopic = toPascalCase(CurrentLocalTopicForQuestions).replaceAll(' ', '').replaceAll(',','').replaceAll('-','');
      var newURL = (CurrentTest)+'_'+(urlTopic)
    
      var url = `https://josephtauzin.pythonanywhere.com/usr/${uid}&${newURL}&${CurrentPracticeQuestion}`;



      if(CurrentPracticeQuestion != 'Random'){
        var urlLocal = `https://192.168.1.152:5005/usr/${uid}&${newURL}&${CurrentPracticeQuestion}`;
      }else{
        var urlLocal = `https://192.168.1.152:5005/usr/${uid}&${newURL}&${CurrentPracticeQuestion}`;
      }
      //var url = urlLocal;

    
    console.log('url',url)

    if(CurrentLocalTopicForQuestions != ''){
      //var uid = auth.currentUser.uid.toString();


      
 
      

      return fetch(url)
          .then(response => response.json())
          .then(data => {
              // Create an image from the base64 string
              let img = new Image();
              img.src = `data:image/jpeg;base64,${data.image_data}`;
            
              const blobUrl = base64toBlobURL(data.image_data, 'image/jpeg');
             
              setImageDataUrl(blobUrl);
              //setImageDataUrl
             
              setCurrentQuestionInfo(data.question_data)
              setCurrentShaCode(data.question_data.encoded)
              setIntroInformation(data.intro_data)
             
              var PossibleQuestions = ['Random']
              for (var i = 0; i < parseInt(data.number_of_questions); i++) {
                PossibleQuestions.push(i+1)
              }
              setPossibleCurrentPracticeQuestion(PossibleQuestions)
              // Log the additional data or do something with it
           
              setCorrectAnswerChoicePractice('')
              setCurrentChoiceSelected('')
              setShowExplanation(false)
              setSurveySentiment('')
              setServeyAnswers('')
              clearHandler()

              return img;
          })
          .catch(error => {
              console.error("Error fetching image:", error);
          });
        
      }
}
    }

useEffect(()=>{
  if(QuizSwitch == true && correctAnswerChoicePractice == 'correct'){
    setCurrentQuizResults(prevResults => [...prevResults, 'correct']);
    
  }
  if(QuizSwitch == true && correctAnswerChoicePractice == 'incorrect'){
    setCurrentQuizResults(prevResults => [...prevResults, 'incorrect']);
  }
  
},[correctAnswerChoicePractice])

function toCamelCase(str) {
  // Split the string into words
  var words = str.split(' ');
  
  // Map through each word and capitalize the first letter of 
  // every word except the first one
  var result = words.map(function(word, index) {
      // If it is the first word, convert to lowercase
   
      // Otherwise, capitalize the first letter of the word
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join('');
  
  return result;
}
function GetCurrentQuizLength(quiz){
  var Newstring =toCamelCase(quiz)
  var lengthLocal = 0;

  var tempQuizQuestionLengths = []
  for (var i = 0; i < QuizQuestionLengths.length; i++) {
    var tempvar = [QuizQuestionLengths[i][0].replaceAll('SAT_','').replaceAll('ACT_',''), QuizQuestionLengths[i][1]]
    tempQuizQuestionLengths.push(tempvar)
  }


  for(var i = 0; i < tempQuizQuestionLengths.length; i++){
    if(tempQuizQuestionLengths[i][0] == Newstring){
      lengthLocal = tempQuizQuestionLengths[i][1]
      break;
    }
  }
  return(lengthLocal)
}

useEffect(()=>{
  //Find CurrentLocalTopicForQuestions in QuizQuestionLengths
  //camelcase
  try{
    var lengthLocal = 0;
  
    
    lengthLocal = GetCurrentQuizLength(CurrentLocalTopicForQuestions)
   
   
    if(CurrentQuizResults.length == lengthLocal){
      setQuizQuestionsDone(true)
      UpdateQuizResult((CurrentLocalTopicForQuestions + '+' + (CurrentQuizResults.filter(x => x == 'correct')).length +'+'+ CurrentQuizResults.length).toString())
    }
    setQuizProblemNumber(CurrentQuizResults.length)
  }catch(e){


  }

},[CurrentQuizResults])

function UpdateQuestionNeedsReview(SHA256Code){

  console.log("innit")
  const Def = doc(db, "GlobalVariables", 'FlaggedAIQuestions');
  //UpdateArray
//arrayunion
  console.log("innit2")
  console.log(Def)
  console.log(SHA256Code)

  updateDoc(Def, {
    SHACodes: arrayUnion((SHA256Code).toString())
  });
}

useEffect(() => {
  if(CurrentLocalTopicForQuestions != ''){
 
    //PracticeDivRef.current.scrollTop = 0;
    //Use this for the when the user is done with the quiz

    if(QuizSwitch == true){
        var lengthLocal = 0;
        for(var i = 0; i < QuizQuestionLengths.length; i++){
          if(QuizQuestionLengths[i][0] == CurrentLocalTopicForQuestions){
            lengthLocal = QuizQuestionLengths[i][1]
            break;
          }
        }
        if(CurrentQuizResults.length == lengthLocal){
          setQuizProblemNumber(0)
          setCurrentQuizResults([])
        }
        
    }
    if(QuestionNeedsReview == true){
      UpdateQuestionNeedsReview(CurrentShaCode)
    }
    fetchImageData()
  }
}, [CurrentPhaseInQuestion,CurrentLocalTopicForQuestions, QuizSwitch, CurrentPracticeQuestion]);

useEffect(() => {
  setCurrentPracticeQuestion('Random')
}, [CurrentLocalTopicForQuestions]);

useEffect(() => {
 
  //increase the phase in question
  try{
    PracticeDivRef.current.scrollTop = 0;
  }catch(e){
  }
}, [CurrentPhaseInQuestion]);

useEffect(() => {
  if(QuizSwitch == true){
    setShowAI(false)
  }
}, [QuizSwitch]);

//PosibleCurrentQuizQuestion
useEffect(() => {
  if(CurrentLocalTopicForQuestions != ''){
     setQuizProblemNumber(parseInt(CurrentQuizQuestion)-1)

     setCurrentPhaseInQuestion(CurrentPhaseInQuestion + 1)
  }
}, [CurrentQuizQuestion]);


useEffect(() => {
  if(CurrentLocalTopicForQuestions != '' && CurrentShaCode != ''){
    //sendShaCodeToFirebase(CurrentShaCode, CurrentLocalQuestionSentiment)
  }
}, [CurrentShaCode]);


const [windowWidth, setWindowWidth] = useState(window.innerWidth);
const [lastPageView, setLastPageView] = useState(0);
const [PageSwitch, setPageSwitch] = useState(10);
const [IsIndividual, setIsIndividual] = useState(false);

const PROPORTION = 0.5; // Set this value as per your requirement



useEffect(() => {
  const handleResize = () => {
      setWindowWidth(window.innerWidth);
  };

  window.addEventListener('resize', handleResize);

  // Cleanup: remove the event listener on component unmount
  return () => {
      window.removeEventListener('resize', handleResize);
  };
}, []);  // Empty dependency array means this useEffect runs on mount and unmount


useEffect(() => {
  
  
  var total = window.screen.width 


  if (((windowWidth/total < 0.79) ) && PageSwitch !== 11) {
      setLastPageView(PageSwitch);
      setTimeout(() => {
        setPageSwitch(11);
      }, 100);
  } 
  else if ((windowWidth/total >= 0.79 ) && PageSwitch === 11) {
      setPageSwitch(lastPageView);
  }
}, [windowWidth,PageSwitch, lastPageView]);

/*
function checkJsonKey(jsonData, key) {
  // Check if the key exists
  if (key in jsonData) {
      // Perform some action
      console.log("Key found, value:", jsonData[key]);
      // Insert any other action you want to perform here.
  } else {
      console.log("Key not found");
      // Ignore or perform some other action
  }
}
*/

function encodeText(text) {
  return SHA256(text).toString();
}

const ChatBot = () => {
  //IntroInformation
  const SERVER_URL = 'https://josephtauzin.pythonanywhere.com/chatgpt/';
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const CHARACTER_LIMIT = 1000; // Adjust this as needed
  var CurrentQuestion = 'Question: ' + CurrentQuestionInfo.question + ',Options: '+ CurrentQuestionInfo.options;
  
  
  const sendMessage = async () => {
   
    var urlTopic = toPascalCase(CurrentLocalTopicForQuestions).replaceAll(' ', '');
    if (message.trim() === '') return;

    // Add the user's message to the chat log
    const updatedChatLog = [...chatLog, { sender: 'user', text: message }];
    setChatLog(updatedChatLog);
    setMessage('');
    setIsLoading(true);

    // Convert chat log to string format
    let chatString = updatedChatLog.map(entry => {
      return `${entry.sender === 'user' ? 'Human' : 'You'}: ${entry.text}`;
    }).join('\n');

    // Trim chat log based on character limit
    while (chatString.length > CHARACTER_LIMIT) {
        // Remove the first message entirely
        const firstNewlineIndex = chatString.indexOf('\n');
        chatString = chatString.substring(firstNewlineIndex + 1);
    }

    // Make sure the chat doesn't start in the middle of a message by removing a potentially half-started message
    if (!chatString.startsWith('Student: ') && !chatString.startsWith('You: ')) {
        const nextNewlineIndex = chatString.indexOf('\n');
        chatString = chatString.substring(nextNewlineIndex + 1);
    }

    try {
  
      if(ShowIntro == true ){
        CurrentQuestion = ''
      }
      const dataToSend = {
        user_text: chatString.replace('You: ', '').replace('?', ''),
        quiz_name: urlTopic,
        current_question: CurrentQuestion.replace('?', '')
        };

        const response = await fetch('https://josephtauzin.pythonanywhere.com/chatgpt/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend)
        });

        if (!response.ok) {
            throw new Error(`Server responded with ${response.status}`);
        }

        const data = await response.json();
        const chatResponse = data.response;
        

        setChatLog([...updatedChatLog, { sender: 'bot', text: chatResponse }]);
    } catch (error) {
        console.error('Error:', error);
        setChatLog([...updatedChatLog, { sender: 'bot', text: 'Sorry, an error occurred.' }]);
    } finally {
        setIsLoading(false);
    }
};
  function ShowLog(){
    if(chatLog.length > 0){
      return(
        <div className="chat-log">
        {chatLog.map((entry, index) => (
          <div key={index} className={`chat-entry ${entry.sender}`}>
            <span>{entry.text}</span>
          </div>
        ))}
        {isLoading && <div className="loading-animation">Loading...</div>}
      </div>
      )
  }
  else{
    return(
      null)
    }
  }
  function SendPrewrittenMessage(message){
    setMessage(message)
    setTimeout(() => {
      sendMessage()
    }, 100);
  }
  return (
    <div className="chatbot">
      {chatLog.length === 0 && (
        <div className="chat-header">
          <h2>Chat with your virtual tutor!</h2>
          <p>Type your message below to start a conversation.</p>
        </div>
      )}
      {ShowLog()}
      
      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} >Send</button>
      </div>
      <div>

        <button className="messageButton" onClick={() => SendPrewrittenMessage("Give me a hint please")}>Give me a hint!</button>

      </div>
    </div>
  );
};






  //const images = [SAT_one_1, SAT_one_2, SAT_one_3, SAT_one_4, SAT_one_5, SAT_one_6, SAT_one_7, SAT_one_8, SAT_one_9, SAT_one_10, SAT_one_11, SAT_one_12, SAT_one_13, SAT_one_14, SAT_one_15, SAT_one_16, SAT_one_17, SAT_one_18, SAT_one_19, SAT_one_20, SAT_one_21, SAT_one_22, SAT_one_23, SAT_one_24, SAT_one_25, SAT_one_26, SAT_one_27, SAT_one_28, SAT_one_29, SAT_one_30, SAT_one_31, SAT_one_32, SAT_one_33, SAT_one_34, SAT_one_35, SAT_one_36, SAT_one_37, SAT_one_38, SAT_one_39, SAT_one_40, SAT_one_41, SAT_one_42, SAT_one_43, SAT_one_44, SAT_one_45, SAT_one_46, SAT_one_47, SAT_one_48, SAT_one_49, SAT_one_50, SAT_one_51, SAT_one_52, SAT_one_53, SAT_one_54, SAT_one_55, SAT_one_56, SAT_one_57, SAT_one_58, SAT_one_59, SAT_one_60, SAT_one_61, SAT_one_62, SAT_one_63, SAT_one_64];
  /*
  const [imageNumber, setImageNumber] = useState(1);

  const handleNextImage = () => {
    setImageNumber((prevNumber) => Math.min(prevNumber + 1, images.length));
  };

  const handlePreviousImage = () => {
    setImageNumber((prevNumber) => Math.max(prevNumber - 1, 1));
  };

  const handleInputChangeImage = (e) => {
    const inputNumber = parseInt(e.target.value, 10);
    if (inputNumber >= 1 && inputNumber <= images.length) {
      setImageNumber(inputNumber);
    }
  };
  const handleSliderChange = (e) => {
    setImageNumber(parseInt(e.target.value, 10));
  };

  const ImageSelector = () => {
    
  
    
  
    return (
      <div >
        <img className="pdfImage" src={images[imageNumber - 1]} alt={`SAT Practice Test Image ${imageNumber}`} />
        <div className="ImageButtons">
          <Button onClick={handlePreviousImage} disabled={imageNumber === 1}>
            Previous
          </Button>
          
          <Slider
            value={imageNumber}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            className="slider"
            max={images.length}
          />
          



          <input
            type="number"
            min="1"
            max={images.length}
            value={imageNumber}
            onChange={handleInputChangeImage}
          />
          <Button onClick={handleNextImage} disabled={imageNumber === images.length}>
            Next
          </Button>
        </div>

       
      </div>
    );
  };

  */


 function PullBluebook(){
  var testlength = 147;
  var subjects = 'Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math';
  var details = 'Vocabulary in context#Vocabulary in context#Reading for function#Reading for function#Paired passages#Literal comprehension#Literal comprehension#The big picture#Supporting and undermining#Graphs and charts#Graphs and charts#Graphs and charts#Graphs and charts#Text completions#Non-essential and essential clauses#Pronoun and Noun Agreement#Combining and separating sentences#Verbs#Non-essential and essential clauses#Pronoun and Noun Agreement#Combining and separating sentences#Transitions#Transitions#Transitions#Transitions#Student notes#Student notes#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Literal comprehension#Supporting and undermining#Supporting and undermining#Supporting and undermining#Text completions#Text completions#Text completions#Text completions#Pronoun and Noun Agreement#Verbs#Combining and separating sentences#Pronoun and Noun Agreement#Verbs#Question marks#Verbs#Transitions#Transitions#Transitions#Student notes#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Literal comprehension#Supporting and undermining#Supporting and undermining#Supporting and undermining#Supporting and undermining#Text completions#Non-essential clauses#Text completions#Non-essential and essential clauses#Verbs#Non-essential and essential clauses#Combining and separating sentences#Verbs#Combining and separating sentences#Transitions#Transitions#Transitions#Student notes#Student notes#Statistics 1#Quadratics#Manipulating and solving equations#Triangles#Lines#Probability#Reading Data#Quadratics#Linear and exponential growth#Linear and exponential growth#Circles#Quadratics#Linear and exponential growth#Systems of equations#Manipulating and solving equations#Linear and exponential growth#Volume#Systems of equations#Trigonometry#Quadratics#Lines#Systems of equations#Statistics 1#Solving linear equations#Word problems#expressions#Manipulating and solving equations#expressions#Percent#Manipulating and solving equations#Solving linear equations#Non-linear functions#Manipulating and solving equations#Lines#Angles#Lines#Ratio, proportion, rate#Manipulating and solving equations#Lines#Quadratics#Quadratics#Quadratics#More equation solving strategies#Triangles#expressions#Percent#Solving linear equations#Solving linear equations#Manipulating and solving equations#Ratio, proportion, rate#More equation solving strategies#expressions#Circles#Linear inequality word problems#Systems of equations#Solving linear equations#Quadratics#Lines#Quadratics#Lines#Systems of equations#Triangles#Lines#Statistics 1#Lines#Triangles#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#The big picture#Reading for function#The big picture#The big picture#The big picture#Reading for function#Supporting and undermining#Graphs and charts#Graphs and charts#Text completions#Text completions#Combining and separating sentences#Text completions#Text completions#Parallel structure#Text completions#Text completions#Transitions#Student notes#Student notes#Student notes#Student notes#Student notes#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Paired passages#Literal comprehension#Supporting and undermining#Graphs and charts#Supporting and undermining#Supporting and undermining#Text completions#Text completions#Verbs#Verbs#Verbs#Verbs#Verbs#Apostrophes#Verbs#Verbs#Transitions#Transitions#Transitions#Transitions#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Paired passages#The big picture#Literal comprehension#Literal comprehension#Supporting and undermining#Graphs and charts#Supporting and undermining#Supporting and undermining#Text completions#Text completions#Text completions#Apostrophes#Joining sentences and fragments#Modification#Joining sentences and fragments#Modification#Verbs#Combining and separating sentences#Transitions#Transitions#Transitions#Student notes#Student notes#Solving linear equations#Angles#Statistics 1#Manipulating and solving equations#Volume#Percent#Linear and exponential growth#Quadratics#Statistics 1#Non-linear functions#Linear and exponential growth#Systems of equations#Trigonometry#Linear and exponential growth#More equation solving strategies#Lines#Circles#Non-linear functions#Linear and exponential growth#Quadratics#Reading Data#Systems of equations#Solving linear equations#Interpreting graphs#Linear and exponential growth#Ratio, proportion, rate#Trigonometry#Solving linear equations#Manipulating and solving equations#Manipulating and solving equations#Absolute value#Manipulating and solving equations#expressions#expressions#Systems of equations#Lines#Triangles#Word problems#Lines#Non-linear functions#Lines#Linear inequality word problems#Systems of equations#Triangles#Systems of equations#expressions#Solving linear equations#Systems of equations#Lines#Trigonometry#Systems of equations#Trigonometry#Statistics 1#Triangles#Manipulating and solving equations#Quadratics#Quadratics#Manipulating and solving equations#Lines#Non-linear functions#Lines#Ratio, proportion, rate#Manipulating and solving equations#Systems of equations#expressions#Quadratics#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#The big picture#Literal comprehension#Literal comprehension#The big picture#Supporting and undermining#Text completions#Text completions#Text completions#Joining sentences and fragments#Modification#Modification#Verbs#Joining sentences and fragments#Modification#Combining and separating sentences#Transitions#Transitions#Transitions#Student notes#Student notes#Student notes#Student notes#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Reading for function#Reading for function#Paired passages#Literal comprehension#Graphs and charts#Supporting and undermining#Supporting and undermining#Graphs and charts#Graphs and charts#Supporting and undermining#Literal comprehension#Verbs#Combining and separating sentences#Verbs#Verbs#Joining sentences and fragments#Verbs#Transitions#Transitions#Student notes#Student notes#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Reading for function#Reading for function#Reading for function#Paired passages#Graphs and charts#Supporting and undermining#Supporting and undermining#Graphs and charts#Supporting and undermining#Graphs and charts#Literal comprehension#Text completions#Non-essential and essential clauses#Non-essential and essential clauses#Combining and separating sentences#Verbs#Joining sentences and fragments#Transitions#Student notes#Student notes#Student notes#Student notes#Ratio, proportion, rate#Lines#Solving linear equations#Triangles#Exponents and radicals#Box plots#Systems of equations#Reading Data#Systems of equations#Lines#Ratio, proportion, rate#Manipulating and solving equations#Linear and exponential growth#Systems of equations#Quadratics#Lines#Word problems#Scatter plots#Trigonometry#Linear and exponential growth#Exponents and radicals#Quadratics#Percent#Statistics 1#Solving linear equations#Ratio, proportion, rate#Lines#Non-linear functions#Linear and exponential growth#Manipulating and solving equations#expressions#Lines#Angles#Word problems#More equation solving strategies#Systems of inequalities#Scatter plots#Linear and exponential growth#Absolute value#expressions#Quadratics#Lines#Non-linear functions#Circles#Lines#Angles#Percent#Lines#Linear and exponential growth#Trigonometry#Linear and exponential growth#expressions#Non-linear functions#Volume#Linear and exponential growth#Lines#Quadratics#Systems of equations#Absolute value#Linear inequality word problems#Linear and exponential growth#Linear and exponential growth#Quadratics#Quadratics#Manipulating and solving equations#Statistics 1#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Literal comprehension#The big picture#The big picture#Supporting and undermining#Graphs and charts#Text completions#Text completions#Non-essential and essential clauses#Combining and separating sentences#Apostrophes#Combining and separating sentences#Verbs#Non-essential and essential clauses#Verbs#Transitions#Student notes#Student notes#Student notes#Student notes#Student notes#Student notes#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Reading for function#Reading for function#Paired passages#Graphs and charts#Supporting and undermining#Supporting and undermining#Graphs and charts#Supporting and undermining#Text completions#Text completions#Verbs#Non-essential and essential clauses#Verbs#Verbs#Apostrophes#Combining and separating sentences#Pronoun and Noun Agreement#Transitions#Transitions#Transitions#Student notes#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Reading for function#Reading for function#The big picture#Reading for function#Paired passages#Graphs and charts#Supporting and undermining#Graphs and charts#Supporting and undermining#Supporting and undermining#Text completions#Text completions#Combining and separating sentences#Verbs#Combining and separating sentences#Verbs#Combining and separating sentences#Non-essential and essential clauses#Parallel structure#Transitions#Transitions#Transitions#Student notes#Solving linear equations#Statistics 1#Triangles#Manipulating and solving equations#Systems of equations#Manipulating and solving equations#Word problems#Manipulating and solving equations#Absolute value#More equation solving strategies#Lines#expressions#Systems of inequalities#Linear and exponential growth#Linear and exponential growth#Exponents and radicals#Percent#Systems of equations#Linear and exponential growth#Linear inequality word problems#Triangles#Lines#Solving linear equations#Percent#Ratio, proportion, rate#Statistics 1#Quadratics#Lines#Word problems#Lines#expressions#Non-linear functions#Angles#Probability#Scatter plots#Statistics 1#Manipulating and solving equations#Systems of equations#Non-linear functions#Non-linear functions#Lines#Systems of equations#Quadratics#Circles#Reading Data#Manipulating and solving equations#Scatter plots#Lines#Quadratics#Lines#Angles#Lines#Ratio, proportion, rate#Linear and exponential growth#Solving linear equations#Percent#Quadratics#Statistics 1#Quadratics#Systems of equations#Statistics 1#Non-linear functions#Quadratics#Circles#Word problems#Quadratics'
  var correctAnswers = 'A,C,C,B,C,D,D,D,B,C,D,C,A,D,B,B,D,A,C,D,C,D,A,D,C,B,A,C,D,B,D,A,A,C,D,B,C,C,B,B,A,A,D,A,A,A,C,B,D,A,C,A,A,D,B,A,B,C,D,B,D,C,D,A,A,D,D,D,B,D,D,D,C,A,B,A,A,B,D,C,A,A,B,A,D,A,0.3,C,5,B,A,B,B,C,B,40,D,C,A,0.882352941176471,6.25,24,20.25,B,55,C,B,D,A,240,B,27,C,C,D,47,D,A,C,D,D,B,D,A,D,D,D,60,C,A,B,D,A,16,B,A,C,B,A,A,D,8,C,D,52,A,D,A,C,B,C,A,B,A,D,D,A,A,B,B,A,C,B,D,A,C,D,A,B,C,C,C,D,C,B,B,D,D,A,B,C,D,C,A,D,B,B,A,B,B,C,C,D,C,A,B,A,A,B,A,D,A,B,D,C,B,A,D,C,B,C,C,C,B,C,C,C,B,B,B,D,D,A,B,D,A,C,A,C,D,9,A,D,52,D,B,B,C,11875,C,B,410,A,0.5,100,B,D,A,B,C,B,B,B,C,192,50,D,10,15,D,A,D,A,A,D,986,C,A,D,A,D,C,B,B,C,A,C,192,D,113,A,C,C,9.66666666666667,A,A,33,8,D,B,A,-34,D,D,B,D,C,B,A,D,A,A,A,D,A,B,A,C,A,D,D,D,C,C,B,D,C,A,D,D,C,B,B,C,B,D,A,D,A,A,C,C,C,B,D,A,D,A,B,B,A,D,D,D,A,C,B,D,D,D,C,A,A,A,D,D,A,A,A,C,B,C,A,A,C,C,C,A,A,B,B,A,D,B,B,C,D,0.2,B,B,C,B,A,A,C,24,D,C,80,7,A,27556,C,C,B,-3,C,B,B,40,9,2,A,D,C,D,D,70,D,D,A,B,A,9,6,D,D,B,A,A,D,A,9,D,B,A,D,76,36504,C,C,B,D,9,182,C,B,B,50,A,B,B,B,A,B,A,D,A,A,D,B,C,B,B,D,D,B,C,A,D,D,D,C,D,A,C,D,C,D,D,A,A,B,C,C,A,C,A,C,A,D,A,D,C,B,A,A,D,C,D,B,D,D,A,B,B,B,C,C,D,A,A,C,B,C,C,D,C,B,D,A,D,D,B,A,A,C,B,C,D,A,D,C,B,B,A,C,5,D,A,28,C,11,9,A,D,D,B,C,C,D,B,B,6.55555555555556,B,B,2520,40,7,30,180,C,A,D,D,A,A,C,A,D,D,C,D,C,D,A,A,B,B,C,D,C,C,C,A,C,-0.9333,4.06,289,44,D,14.5,C,C,A,10,B,D'; 
  var test = '1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4'
  var section = '1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2'
  var module = 'Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard'
  var question = '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22'

  //return([testlength,subjects.split(','),details.split('#'),correctAnswers.split(','), test.split(','), section.split(','), module.split(','), question.split(',')]);
  return([test.split(','), section.split(','),  question.split(','),subjects.split(','),details.split('#'),correctAnswers.split(','),module.split(','),testlength ]);
}

 function PullNewLinearTests(){
  var testlength = 119;
  var subjects = 'Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing'
  var details = 'Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#The big picture#Reading for function#Reading for function#Supporting and undermining#The big picture#Reading for function#Supporting and undermining#Graphs and charts#Graphs and charts#Supporting and undermining#Text completions#Text completions#Pronoun and Noun Agreement#Joining sentences and fragments#Pronoun and Noun Agreement#Non-essential and essential clauses#Verbs#Combining and separating sentences#Pronoun and Noun Agreement#Verbs#Combining and separating sentences#Modification#Transitions#Transitions#Transitions#Student notes#Student notes#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#The big picture#Paired passages#The big picture#Literal comprehension#Supporting and undermining#Graphs and charts#Supporting and undermining#Graphs and charts#Supporting and undermining#Text completions#Text completions#Verbs#Combining and separating sentences#Verbs#Joining sentences and fragments#Verbs#Combining and separating sentences#Verbs#Modification#Non-essential and essential clauses#Transitions#Transitions#Transitions#Student notes#Student notes#Student notes#Percent#Solving linear equations#Linear inequality word problems#Non-linear functions#Probability#Ratio, proportion, rate#Lines#Manipulating and solving equations#Triangles#Systems of equations#Scatter plots#Non-linear functions#Manipulating and solving equations#Quadratics#Linear and exponential growth#expressions#Manipulating and solving equations#Lines#Circles#Statistics 1#Circles#Trigonometry#Word problems#Lines#Systems of equations#Systems of equations#Triangles#Manipulating and solving equations#Ratio, proportion, rate#Systems of equations#Solving linear equations#Triangles#Solving linear equations#Quadratics#Lines#Non-linear functions#Systems of equations#expressions#Non-linear functions#Angles#Statistics 1#Linear and exponential growth#Quadratics#Linear and exponential growth#Percent#Exponents and radicals#Linear inequality word problems#Absolute value#Volume#Circles#Linear and exponential growth#Linear and exponential growth#Systems of equations#Quadratics#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#The big picture#Reading for function#Paired passages#Literal comprehension#The big picture#The big picture#Graphs and charts#Supporting and undermining#Text completions#Text completions#Text completions#Text completions#Verbs#Verbs#Combining and separating sentences#Verbs#Apostrophes#Joining sentences and fragments#Combining and separating sentences#Apostrophes#Non-essential and essential clauses#Student notes#Student notes#Student notes#Student notes#Student notes#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#The big picture#Reading for function#Reading for function#Literal comprehension#Graphs and charts#Graphs and charts#Supporting and undermining#Supporting and undermining#Supporting and undermining#Supporting and undermining#Graphs and charts#Supporting and undermining#Verbs#Joining sentences and fragments#Verbs#Joining sentences and fragments#Modification#Joining sentences and fragments#Non-essential and essential clauses#Combining and separating sentences#Joining sentences and fragments#Transitions#Transitions#Transitions#Transitions#Student notes#Student notes#Student notes#Interpreting graphs#Probability#Angles#Non-linear functions#Lines#Word problems#Quadratics#Ratio, proportion, rate#Statistics 1#Manipulating and solving equations#Solving linear equations#Quadratics#Quadratics#Linear inequality word problems#Lines#Word problems#Circles#Systems of equations#Lines#Non-linear functions#Systems of equations#Non-linear functions#Linear and exponential growth#Lines#Trigonometry#Word problems#Percent#Reading Data#Ratio, proportion, rate#Scatter plots#Non-linear functions#Exponents and radicals#Statistics 1#Solving linear equations#Systems of equations#Lines#More equation solving strategies#Systems of equations#Systems of inequalities#Percent#Lines#expressions#Lines#Linear and exponential growth#Triangles#Systems of equations#Word problems#Systems of equations#Quadratics#Ratio, proportion, rate#Circles#Triangles#Statistics 1#Triangles#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#The big picture#Reading for function#Literal comprehension#The big picture#Supporting and undermining#Graphs and charts#Supporting and undermining#Supporting and undermining#Text completions#Text completions#Text completions#Verbs#Combining and separating sentences#Combining and separating sentences#Joining sentences and fragments#Verbs#Joining sentences and fragments#Joining sentences and fragments#Transitions#Student notes#Student notes#Student notes#Student notes#Student notes#Student notes#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#The big picture#Reading for function#The big picture#Paired passages#Literal comprehension#Literal comprehension#Supporting and undermining#Supporting and undermining#Graphs and charts#Graphs and charts#Graphs and charts#Text completions#Text completions#Verbs#Verbs#Verbs#Joining sentences and fragments#Transitions#Modification#Combining and separating sentences#Verbs#Modification#Combining and separating sentences#Non-essential and essential clauses#Transitions#Transitions#Transitions#Student notes#Student notes#Solving linear equations#Non-linear functions#Manipulating and solving equations#Angles#Manipulating and solving equations#Lines#Statistics 1#Probability#Lines#Word problems#Lines#Lines#Linear and exponential growth#Non-linear functions#Ratio, proportion, rate#More equation solving strategies#Trigonometry#Systems of equations#Systems of inequalities#Exponents and radicals#Percent#Volume#Linear and exponential growth#Non-linear functions#expressions#Reading Data#Circles#Percent#Non-linear functions#Ratio, proportion, rate#Ratio, proportion, rate#expressions#Solving linear equations#Quadratics#expressions#Triangles#Systems of equations#Scatter plots#Non-linear functions#Circles#Quadratics#Systems of equations#Volume#Linear and exponential growth#Systems of equations#Linear inequality word problems#Statistics 1#Lines#Linear and exponential growth#Quadratics#Statistics 1#Triangles#Quadratics#Systems of equations#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#The big picture#The big picture#The big picture#Reading for function#Paired passages#The big picture#Literal comprehension#The big picture#Graphs and charts#Supporting and undermining#Graphs and charts#Supporting and undermining#Graphs and charts#Text completions#Apostrophes#Verbs#Combining and separating sentences#Verbs#Combining and separating sentences#Modification#Joining sentences and fragments#Combining and separating sentences#Transitions#Transitions#Transitions#Transitions#Student notes#Student notes#Student notes#Statistics 1#Percent#Quadratics#Manipulating and solving equations#Lines#Ratio, proportion, rate#Manipulating and solving equations#Lines#Triangles#Scatter plots#Lines#Lines#Solving linear equations#Systems of equations#Lines#Linear and exponential growth#Word problems#Word problems#More equation solving strategies#Circles#Exponents and radicals#Triangles#Non-linear functions#Systems of equations#Triangles#Quadratics#Linear and exponential growth#Interpreting graphs#Ratio, proportion, rate#Exponents and radicals#Systems of equations#Systems of inequalities#Absolute value#Lines#Non-linear functions#Linear and exponential growth#Reading Data#Linear inequality word problems#Quadratics#Probability#Lines#Systems of equations#Angles#Lines#Quadratics#Quadratics#Trigonometry#Quadratics#Systems of equations#Linear and exponential growth#Statistics 1#Circles#Word problems#Percent#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Reading for function#Literal comprehension#Supporting and undermining#Supporting and undermining#Graphs and charts#Supporting and undermining#Supporting and undermining#Text completions#Text completions#Text completions#Apostrophes#Non-essential and essential clauses#Non-essential and essential clauses#Non-essential and essential clauses#Combining and separating sentences#Verbs#Modification#Joining sentences and fragments#Transitions#Transitions#Student notes#Student notes#Student notes#Student notes#Student notes'
  var correctAnswers = 'B,C,D,A,B,A,A,D,C,C,A,A,A,C,D,C,B,B,A,A,C,C,B,A,B,A,A,A,D,C,D,D,C,B,D,A,D,D,B,D,A,B,D,D,A,B,A,A,C,A,D,C,B,C,D,D,C,B,D,C,D,A,C,B,B,D,B,C,D,A,A,2520,30,D,B,C,B,C,41,2,D,C,A,B,D,14,5,C,D,D,C,B,104,A,D,B,D,D,40,7,B,D,A,A,A,70,10,A,B,C,C,B,16,28,A,B,C,B,B,289,B,C,C,B,D,C,B,D,D,A,A,A,A,D,C,B,B,A,A,A,B,A,C,C,C,D,C,C,B,C,C,D,D,C,B,D,B,C,C,A,D,B,A,B,A,C,D,C,B,B,B,C,A,D,A,C,C,A,B,A,B,D,D,A,C,B,C,C,D,D,C,180,5,A,B,A,B,D,6.25,182,D,A,B,C,A,8,14.5,B,C,A,B,A,9.87,A,A,A,D,B,79,55,C,A,C,B,A,240,2,B,C,D,C,B,986,35,D,B,C,C,B,113,A,A,A,D,B,A,C,B,D,C,D,D,C,C,C,D,A,B,C,A,A,C,D,A,C,B,A,A,C,C,B,C,A,D,B,D,B,A,A,A,C,A,D,A,A,C,A,C,C,C,B,A,C,D,C,D,A,A,A,D,A,D,D,A,D,A,B,C,C,D,C,50,40,C,A,D,B,A,410,76,D,A,B,B,D,-3,1.8,A,D,C,C,B,10,B,B,C,C,B,27,7,A,D,D,B,C,46,9.66666666666667,C,D,D,A,B,44,6.55555555555556,D,B,A,B,C,6,B,A,A,C,A,B,D,B,B,D,C,D,A,B,C,A,A,A,A,D,D,D,B,C,B,A,C,D,A,A,D,D,C,B,A,B,D,A,9,10,A,B,D,A,C,0.2,80,D,B,B,A,C,100,45.125,B,D,C,C,D,5,B,B,C,A,A,15,50,B,D,A,A,B,0.3,2,A,C,B,D,A,0.882352941176471,51,A,C,C,D,B,600,D,D,B,B,B,B,A,C,C,A,A,B,D,C,C,A,B,D,C,A,B,D,D,A,B,B,A,A,C,C,A,A,B'
  var test = '5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8'
  var section = '1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1'
  var module = 'Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2'
  var question = '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,21,22,23,24,25,26,27,28,29,30,32,33,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33'

  return([test.split(','), section.split(','), question.split(','),subjects.split(','),details.split('#'),correctAnswers.split(','),module.split(','),testlength ])
  //return([testlength,subjects.split(','),details.split('#'),correctAnswers.split(','), test.split(','), section.split(','), module.split(','), question.split(',')]);
 }



 function PullBluebookOld(){
  var testlength = 147;
  var subjects = 'Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math';
  var details = 'Vocabulary in context#Vocabulary in context#Reading for function#Reading for function#Paired passages#Literal comprehension#Literal comprehension#The big picture#Supporting and undermining#Graphs and charts#Graphs and charts#Graphs and charts#Graphs and charts#Text completions#Non-essential and essential clauses#Pronouns#Joining and separating sentences#Verbs#Commas#Pronouns#Joining and separating sentences#Transitions#Transitions#Transitions#Transitions#Student notes#Student notes#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Literal comprehension#Supporting and undermining#Supporting and undermining#Supporting and undermining#Text completions#Text completions#Text completions#Text completions#Pronouns#Verbs#Joining and separating sentences#Pronouns#Verbs#Question marks#Verbs#Transitions#Transitions#Transitions#Student notes#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Literal comprehension#Supporting and undermining#Supporting and undermining#Supporting and undermining#Supporting and undermining#Text completions#Non-essential clauses#Text completions#Non-essential and essential clauses#Verbs#Non-essential and essential clauses#Joining and separating sentences#Verbs#Joining and separating sentences#Transitions#Transitions#Transitions#Student notes#Student notes#Histograms#Quadratics#Linear equation word problems#Triangles#Lines#Probability#Sample data#Quadratics#Linear and exponential growth#Linear and exponential growth#Circles#Quadratics#Linear and exponential growth#Systems of equations#Linear equation word problems#Linear and exponential growth#Volume#Systems of equations#Trigonometry#Quadratics#Lines#Systems of equations#Mean, median, mode, standard deviation#Solving linear equations#Area#Combining and factoring like terms#Linear equation word problems#Rational expressions#Percent#Linear equation word problems#Solving linear equations#Non-linear functions#Linear equation word problems#Lines#Angles#Lines#Ratio, proportion, rate#Linear equation word problems#Lines#Quadratics#Quadratics#Quadratics#Rearranging variables#Triangles#Combining and factoring like terms#Percent#Solving linear equations#Solving linear equations#Linear equation word problems#Ratio, proportion, rate#Rearranging variables#Rational expressions#Circles#Linear inequality word problems#Systems of equations#Solving linear equations#Quadratics#Lines#Quadratics#Lines#Systems of equations#Triangles#Lines#Mean, median, mode, standard deviation#Lines#Triangles#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#The big picture#Reading for function#The big picture#The big picture#The big picture#Reading for function#Supporting and undermining#Graphs and charts#Graphs and charts#Text completions#Text completions#Joining and separating sentences#Text completions#Text completions#Parallel structure#Text completions#Text completions#Transitions#Student notes#Student notes#Student notes#Student notes#Student notes#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Paired passages#Literal comprehension#Supporting and undermining#Graphs and charts#Supporting and undermining#Supporting and undermining#Text completions#Text completions#Verbs#Verbs#Verbs#Verbs#Verbs#Apostrophes#Verbs#Verbs#Transitions#Transitions#Transitions#Transitions#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Paired passages#The big picture#Literal comprehension#Literal comprehension#Supporting and undermining#Graphs and charts#Supporting and undermining#Supporting and undermining#Text completions#Text completions#Text completions#Apostrophes#Joining sentences and fragments#Modification#Joining sentences and fragments#Modification#Verbs#Joining and separating sentences#Transitions#Transitions#Transitions#Student notes#Student notes#Solving linear equations#Angles#Mean, median, mode, standard deviation#Linear equation word problems#Volume#Percent#Linear and exponential growth#Quadratics#Mean, median, mode, standard deviation#Non-linear functions#Linear and exponential growth#Systems of equations#Trigonometry#Linear and exponential growth#Rearranging variables#Lines#Circles#Non-linear functions#Linear and exponential growth#Quadratics#Sample data#Systems of equations#Solving linear equations#Interpreting graphs#Linear and exponential growth#Ratio, proportion, rate#Trigonometry#Solving linear equations#Linear equation word problems#Linear equation word problems#Absolute value#Linear equation word problems#Combining and factoring like terms#Combining and factoring like terms#Systems of equations#Lines#Triangles#Area#Lines#Non-linear functions#Lines#Linear inequality word problems#Systems of equations#Triangles#Systems of equations#Combining and factoring like terms#Solving linear equations#Systems of equations#Lines#Trigonometry#Systems of equations#Trigonometry#Mean, median, mode, standard deviation#Triangles#Linear equation word problems#Quadratics#Quadratics#Linear equation word problems#Lines#Non-linear functions#Lines#Ratio, proportion, rate#Linear equation word problems#Systems of equations#Rational expressions#Quadratics#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#The big picture#Literal comprehension#Literal comprehension#The big picture#Supporting and undermining#Text completions#Text completions#Text completions#Joining sentences and fragments#Modification#Modification#Verbs#Joining sentences and fragments#Modification#Joining and separating sentences#Transitions#Transitions#Transitions#Student notes#Student notes#Student notes#Student notes#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Reading for function#Reading for function#Paired passages#Literal comprehension#Graphs and charts#Supporting and undermining#Supporting and undermining#Graphs and charts#Graphs and charts#Supporting and undermining#Literal comprehension#Verbs#Joining and separating sentences#Verbs#Verbs#Joining sentences and fragments#Verbs#Transitions#Transitions#Student notes#Student notes#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Reading for function#Reading for function#Reading for function#Paired passages#Graphs and charts#Supporting and undermining#Supporting and undermining#Graphs and charts#Supporting and undermining#Graphs and charts#Literal comprehension#Text completions#Non-essential and essential clauses#Non-essential and essential clauses#Joining and separating sentences#Verbs#Joining sentences and fragments#Transitions#Student notes#Student notes#Student notes#Student notes#Ratio, proportion, rate#Lines#Solving linear equations#Triangles#Exponents and radicals#Box plots#Systems of equations#Sample data#Systems of equations#Lines#Ratio, proportion, rate#Linear equation word problems#Linear and exponential growth#Systems of equations#Quadratics#Lines#Area#Scatter plots#Trigonometry#Linear and exponential growth#Exponents and radicals#Quadratics#Percent#Histograms#Solving linear equations#Ratio, proportion, rate#Lines#Non-linear functions#Linear and exponential growth#Linear equation word problems#Rational expressions#Lines#Angles#Area#Rearranging variables#Systems of inequalities#Scatter plots#Linear and exponential growth#Absolute value#Combining and factoring like terms#Quadratics#Lines#Non-linear functions#Circles#Lines#Angles#Percent#Lines#Linear and exponential growth#Trigonometry#Linear and exponential growth#Rational expressions#Non-linear functions#Volume#Linear and exponential growth#Lines#Quadratics#Systems of equations#Absolute value#Linear inequality word problems#Linear and exponential growth#Linear and exponential growth#Quadratics#Quadratics#Linear equation word problems#Mean, median, mode, standard deviation#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Literal comprehension#The big picture#The big picture#Supporting and undermining#Graphs and charts#Text completions#Text completions#Commas#Joining and separating sentences#Apostrophes#Joining and separating sentences#Verbs#Non-essential and essential clauses#Verbs#Transitions#Student notes#Student notes#Student notes#Student notes#Student notes#Student notes#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Reading for function#Reading for function#Paired passages#Graphs and charts#Supporting and undermining#Supporting and undermining#Graphs and charts#Supporting and undermining#Text completions#Text completions#Verbs#Commas#Verbs#Verbs#Apostrophes#Joining and separating sentences#Pronouns#Transitions#Transitions#Transitions#Student notes#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Reading for function#Reading for function#The big picture#Reading for function#Paired passages#Graphs and charts#Supporting and undermining#Graphs and charts#Supporting and undermining#Supporting and undermining#Text completions#Text completions#Joining and separating sentences#Verbs#Joining and separating sentences#Verbs#Joining and separating sentences#Non-essential and essential clauses#Parallel structure#Transitions#Transitions#Transitions#Student notes#Solving linear equations#Mean, median, mode, standard deviation#Triangles#Linear equation word problems#Systems of equations#Linear equation word problems#Area#Linear equation word problems#Absolute value#Rearranging variables#Lines#Combining and factoring like terms#Systems of inequalities#Linear and exponential growth#Linear and exponential growth#Exponents and radicals#Percent#Systems of equations#Linear and exponential growth#Linear inequality word problems#Triangles#Lines#Solving linear equations#Percent#Ratio, proportion, rate#Histograms#Quadratics#Lines#Area#Lines#Combining and factoring like terms#Non-linear functions#Angles#Probability#Scatter plots#Mean, median, mode, standard deviation#Linear equation word problems#Systems of equations#Non-linear functions#Non-linear functions#Lines#Systems of equations#Quadratics#Circles#Sample data#Linear equation word problems#Scatter plots#Lines#Quadratics#Lines#Angles#Lines#Ratio, proportion, rate#Linear and exponential growth#Solving linear equations#Percent#Quadratics#Mean, median, mode, standard deviation#Quadratics#Systems of equations#Mean, median, mode, standard deviation#Non-linear functions#Quadratics#Circles#Area#Quadratics'
  var correctAnswers = 'A,C,C,B,C,D,D,D,B,C,D,C,A,D,B,B,D,A,C,D,C,D,A,D,C,B,A,C,D,B,D,A,A,C,D,B,C,C,B,B,A,A,D,A,A,A,C,B,D,A,C,A,A,D,B,A,B,C,D,B,D,C,D,A,A,D,D,D,B,D,D,D,C,A,B,A,A,B,D,C,A,A,B,A,D,A,0.3,C,5,B,A,B,B,C,B,40,D,C,A,0.882352941176471,6.25,24,20.25,B,55,C,B,D,A,240,B,27,C,C,D,47,D,A,C,D,D,B,D,A,D,D,D,60,C,A,B,D,A,16,B,A,C,B,A,A,D,8,C,D,52,A,D,A,C,B,C,A,B,A,D,D,A,A,B,B,A,C,B,D,A,C,D,A,B,C,C,C,D,C,B,B,D,D,A,B,C,D,C,A,D,B,B,A,B,B,C,C,D,C,A,B,A,A,B,A,D,A,B,D,C,B,A,D,C,B,C,C,C,B,C,C,C,B,B,B,D,D,A,B,D,A,C,A,C,D,9,A,D,52,D,B,B,C,11875,C,B,410,A,0.5,100,B,D,A,B,C,B,B,B,C,192,50,D,10,15,D,A,D,A,A,D,986,C,A,D,A,D,C,B,B,C,A,C,192,D,113,A,C,C,9.66666666666667,A,A,33,8,D,B,A,-34,D,D,B,D,C,B,A,D,A,A,A,D,A,B,A,C,A,D,D,D,C,C,B,D,C,A,D,D,C,B,B,C,B,D,A,D,A,A,C,C,C,B,D,A,D,A,B,B,A,D,D,D,A,C,B,D,D,D,C,A,A,A,D,D,A,A,A,C,B,C,A,A,C,C,C,A,A,B,B,A,D,B,B,C,D,0.2,B,B,C,B,A,A,C,24,D,C,80,7,A,27556,C,C,B,-3,C,B,B,40,9,2,A,D,C,D,D,70,D,D,A,B,A,9,6,D,D,B,A,A,D,A,9,D,B,A,D,76,36504,C,C,B,D,9,182,C,B,B,50,A,B,B,B,A,B,A,D,A,A,D,B,C,B,B,D,D,B,C,A,D,D,D,C,D,A,C,D,C,D,D,A,A,B,C,C,A,C,A,C,A,D,A,D,C,B,A,A,D,C,D,B,D,D,A,B,B,B,C,C,D,A,A,C,B,C,C,D,C,B,D,A,D,D,B,A,A,C,B,C,D,A,D,C,B,B,A,C,5,D,A,28,C,11,9,A,D,D,B,C,C,D,B,B,6.55555555555556,B,B,2520,40,7,30,180,C,A,D,D,A,A,C,A,D,D,C,D,C,D,A,A,B,B,C,D,C,C,C,A,C,-0.9333,4.06,289,44,D,14.5,C,C,A,10,B,D'; 
  var test = '1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4'
  var section = '1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2'
  var module = 'Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Easy,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard,Module 2 Hard'
  var question = '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22'

  //return([testlength,subjects.split(','),details.split('#'),correctAnswers.split(','), test.split(','), section.split(','), module.split(','), question.split(',')]);
  return([test.split(','), section.split(','),  question.split(','),subjects.split(','),details.split('#'),correctAnswers.split(','),module.split(','),testlength ]);
}

 function PullNewLinearTestsOld(){
  var testlength = 119;
  var subjects = 'Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Math,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing,Reading and Writing'
  var details = 'Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#The big picture#Reading for function#Reading for function#Supporting and undermining#The big picture#Reading for function#Supporting and undermining#Graphs and charts#Graphs and charts#Supporting and undermining#Text completions#Text completions#Pronouns#Joining sentences and fragments#Pronouns#Non-essential and essential clauses#Verbs#Joining and separating sentences#Pronouns#Verbs#Joining and separating sentences#Modification#Transitions#Transitions#Transitions#Student notes#Student notes#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#The big picture#Paired passages#The big picture#Literal comprehension#Supporting and undermining#Graphs and charts#Supporting and undermining#Graphs and charts#Supporting and undermining#Text completions#Text completions#Verbs#Joining and separating sentences#Verbs#Joining sentences and fragments#Verbs#Joining and separating sentences#Verbs#Modification#Non-essential and essential clauses#Transitions#Transitions#Transitions#Student notes#Student notes#Student notes#Percent#Solving linear equations#Linear inequality word problems#Non-linear functions#Probability#Ratio, proportion, rate#Lines#Linear equation word problems#Triangles#Systems of equations#Scatter plots#Non-linear functions#Linear equation word problems#Quadratics#Linear and exponential growth#Combining and factoring like terms#Linear equation word problems#Lines#Circles#Mean, median, mode, standard deviation#Circles#Trigonometry#Area#Lines#Systems of equations#Systems of equations#Triangles#Linear equation word problems#Ratio, proportion, rate#Systems of equations#Solving linear equations#Triangles#Solving linear equations#Quadratics#Lines#Non-linear functions#Systems of equations#Combining and factoring like terms#Non-linear functions#Angles#Mean, median, mode, standard deviation#Linear and exponential growth#Quadratics#Linear and exponential growth#Percent#Exponents and radicals#Linear inequality word problems#Absolute value#Volume#Circles#Linear and exponential growth#Linear and exponential growth#Systems of equations#Quadratics#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#The big picture#Reading for function#Paired passages#Literal comprehension#The big picture#The big picture#Graphs and charts#Supporting and undermining#Text completions#Text completions#Text completions#Text completions#Verbs#Verbs#Joining and separating sentences#Verbs#Apostrophes#Joining sentences and fragments#Joining and separating sentences#Apostrophes#Non-essential and essential clauses#Student notes#Student notes#Student notes#Student notes#Student notes#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#The big picture#Reading for function#Reading for function#Literal comprehension#Graphs and charts#Graphs and charts#Supporting and undermining#Supporting and undermining#Supporting and undermining#Supporting and undermining#Graphs and charts#Supporting and undermining#Verbs#Joining sentences and fragments#Verbs#Joining sentences and fragments#Modification#Joining sentences and fragments#Non-essential and essential clauses#Joining and separating sentences#Joining sentences and fragments#Transitions#Transitions#Transitions#Transitions#Student notes#Student notes#Student notes#Interpreting graphs#Probability#Angles#Non-linear functions#Lines#Area#Quadratics#Ratio, proportion, rate#Mean, median, mode, standard deviation#Linear equation word problems#Solving linear equations#Quadratics#Quadratics#Linear inequality word problems#Lines#Area#Circles#Systems of equations#Lines#Non-linear functions#Systems of equations#Non-linear functions#Linear and exponential growth#Lines#Trigonometry#Area#Percent#Sample data#Ratio, proportion, rate#Scatter plots#Non-linear functions#Exponents and radicals#Mean, median, mode, standard deviation#Solving linear equations#Systems of equations#Lines#Rearranging variables#Systems of equations#Systems of inequalities#Percent#Lines#Rational expressions#Lines#Linear and exponential growth#Triangles#Systems of equations#Area#Systems of equations#Quadratics#Ratio, proportion, rate#Circles#Triangles#Histograms#Triangles#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#The big picture#Reading for function#Literal comprehension#The big picture#Supporting and undermining#Graphs and charts#Supporting and undermining#Supporting and undermining#Text completions#Text completions#Text completions#Verbs#Joining and separating sentences#Joining and separating sentences#Joining sentences and fragments#Verbs#Joining sentences and fragments#Joining sentences and fragments#Transitions#Student notes#Student notes#Student notes#Student notes#Student notes#Student notes#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#The big picture#Reading for function#The big picture#Paired passages#Literal comprehension#Literal comprehension#Supporting and undermining#Supporting and undermining#Graphs and charts#Graphs and charts#Graphs and charts#Text completions#Text completions#Verbs#Verbs#Verbs#Joining sentences and fragments#Transitions#Modification#Joining and separating sentences#Verbs#Modification#Joining and separating sentences#Commas#Transitions#Transitions#Transitions#Student notes#Student notes#Solving linear equations#Non-linear functions#Linear equation word problems#Angles#Linear equation word problems#Lines#Histograms#Probability#Lines#Area#Lines#Lines#Linear and exponential growth#Non-linear functions#Ratio, proportion, rate#Rearranging variables#Trigonometry#Systems of equations#Systems of inequalities#Exponents and radicals#Percent#Volume#Linear and exponential growth#Non-linear functions#Rational expressions#Sample data#Circles#Percent#Non-linear functions#Ratio, proportion, rate#Ratio, proportion, rate#Combining and factoring like terms#Solving linear equations#Quadratics#Combining and factoring like terms#Triangles#Systems of equations#Scatter plots#Non-linear functions#Circles#Quadratics#Systems of equations#Volume#Linear and exponential growth#Systems of equations#Linear inequality word problems#Mean, median, mode, standard deviation#Lines#Linear and exponential growth#Quadratics#Mean, median, mode, standard deviation#Triangles#Quadratics#Systems of equations#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#The big picture#The big picture#The big picture#Reading for function#Paired passages#The big picture#Literal comprehension#The big picture#Graphs and charts#Supporting and undermining#Graphs and charts#Supporting and undermining#Graphs and charts#Text completions#Apostrophes#Verbs#Joining and separating sentences#Verbs#Joining and separating sentences#Modification#Joining sentences and fragments#Joining and separating sentences#Transitions#Transitions#Transitions#Transitions#Student notes#Student notes#Student notes#Histograms#Percent#Quadratics#Linear equation word problems#Lines#Ratio, proportion, rate#Linear equation word problems#Lines#Triangles#Scatter plots#Lines#Lines#Solving linear equations#Systems of equations#Lines#Linear and exponential growth#Area#Area#Rearranging variables#Circles#Exponents and radicals#Triangles#Non-linear functions#Systems of equations#Triangles#Quadratics#Linear and exponential growth#Interpreting graphs#Ratio, proportion, rate#Exponents and radicals#Systems of equations#Systems of inequalities#Absolute value#Lines#Non-linear functions#Linear and exponential growth#Sample data#Linear inequality word problems#Quadratics#Probability#Lines#Systems of equations#Angles#Lines#Quadratics#Quadratics#Trigonometry#Quadratics#Systems of equations#Linear and exponential growth#Mean, median, mode, standard deviation#Circles#Area#Percent#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Vocabulary in context#Reading for function#Literal comprehension#Supporting and undermining#Supporting and undermining#Graphs and charts#Supporting and undermining#Supporting and undermining#Text completions#Text completions#Text completions#Apostrophes#Commas#Non-essential and essential clauses#Non-essential and essential clauses#Joining and separating sentences#Verbs#Modification#Joining sentences and fragments#Transitions#Transitions#Student notes#Student notes#Student notes#Student notes#Student notes'
  var correctAnswers = 'B,C,D,A,B,A,A,D,C,C,A,A,A,C,D,C,B,B,A,A,C,C,B,A,B,A,A,A,D,C,D,D,C,B,D,A,D,D,B,D,A,B,D,D,A,B,A,A,C,A,D,C,B,C,D,D,C,B,D,C,D,A,C,B,B,D,B,C,D,A,A,2520,30,D,B,C,B,C,41,2,D,C,A,B,D,14,5,C,D,D,C,B,104,A,D,B,D,D,40,7,B,D,A,A,A,70,10,A,B,C,C,B,16,28,A,B,C,B,B,289,B,C,C,B,D,C,B,D,D,A,A,A,A,D,C,B,B,A,A,A,B,A,C,C,C,D,C,C,B,C,C,D,D,C,B,D,B,C,C,A,D,B,A,B,A,C,D,C,B,B,B,C,A,D,A,C,C,A,B,A,B,D,D,A,C,B,C,C,D,D,C,180,5,A,B,A,B,D,6.25,182,D,A,B,C,A,8,14.5,B,C,A,B,A,9.87,A,A,A,D,B,79,55,C,A,C,B,A,240,2,B,C,D,C,B,986,35,D,B,C,C,B,113,A,A,A,D,B,A,C,B,D,C,D,D,C,C,C,D,A,B,C,A,A,C,D,A,C,B,A,A,C,C,B,C,A,D,B,D,B,A,A,A,C,A,D,A,A,C,A,C,C,C,B,A,C,D,C,D,A,A,A,D,A,D,D,A,D,A,B,C,C,D,C,50,40,C,A,D,B,A,410,76,D,A,B,B,D,-3,1.8,A,D,C,C,B,10,B,B,C,C,B,27,7,A,D,D,B,C,46,9.66666666666667,C,D,D,A,B,44,6.55555555555556,D,B,A,B,C,6,B,A,A,C,A,B,D,B,B,D,C,D,A,B,C,A,A,A,A,D,D,D,B,C,B,A,C,D,A,A,D,D,C,B,A,B,D,A,9,10,A,B,D,A,C,0.2,80,D,B,B,A,C,100,45.125,B,D,C,C,D,5,B,B,C,A,A,15,50,B,D,A,A,B,0.3,2,A,C,B,D,A,0.882352941176471,51,A,C,C,D,B,600,D,D,B,B,B,B,A,C,C,A,A,B,D,C,C,A,B,D,C,A,B,D,D,A,B,B,A,A,C,C,A,A,B'
  var test = '5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,7,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8,8'
  var section = '1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1'
  var module = 'Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 1,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2,Module 2'
  var question = '1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,21,22,23,24,25,26,27,28,29,30,32,33,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33'

  return([test.split(','), section.split(','), question.split(','),subjects.split(','),details.split('#'),correctAnswers.split(','),module.split(','),testlength ])
  //return([testlength,subjects.split(','),details.split('#'),correctAnswers.split(','), test.split(','), section.split(','), module.split(','), question.split(',')]);
 }


 function BreakPoints(num){
  let breakpoints = [];
  let lastValue = 0; // Variable to store the last number of the previous array

  for (let i = 0; i <= num; i++) {
      if (showBluebookTest == true) {
          if (i < 4) {
              breakpoints = [0 + lastValue, 81 + lastValue, 147 + lastValue];
          } else if (i < 8) {
              breakpoints = [0 + lastValue, 66 + lastValue, 120 + lastValue];
          } else {
              breakpoints = [0 + lastValue, 52 + lastValue, 96 + lastValue, 154 + lastValue];
          }
      } else {
          if (i < 4) {
              breakpoints = [0 + lastValue, 66 + lastValue, 120 + lastValue];
          } else {
              breakpoints = [0 + lastValue, 52 + lastValue, 96 + lastValue, 154 + lastValue];
          }
      }
      // Update lastValue for the next iteration
      lastValue = breakpoints[breakpoints.length - 1];
  }
  return(breakpoints)
}

function BreakPointsACT(num){
  //var breakpoints = [75, 135, 175, 215];
  var breakpoints = [0,75,135,175,215];
  let lastValue = 0; // Variable to store the last number of the previous array

  for (let i = 1; i <= num; i++) {
      if (true) {
          for (let j = 0; j < breakpoints.length; j++) {
              breakpoints[j] += 215; // Increment each breakpoint by 215 each time after the first iteration
          }
      }
      lastValue = breakpoints[breakpoints.length - 1]; // Update lastValue for the next iteration
  }

  return breakpoints;
}
 
 function ConstantSATTestLenghts(num){
  if(showBluebookTest == true){
    var arr = [0,147,294, 441, 588, 708,828, 948,1035,1222,1375]
    return(arr[num])
    //return([147,294, 441, 588, 707,826, 945,1064,1218,1372  ])
  }
  else{
    var arr = [0,119, 238, 357, 476, 633, 787, 941, 1095, 1249, 1403]
    return(arr[num])
    //return([119, 238, 357, 476, 633, 787, 941, 1095, 1249, 1403])
  }
 }

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
  const[SATLineDataVerbal, setSATLineDataVerbal] = useState([
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
  const [CurrChart, setCurrChart] = useState(null)
  
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

function GetDownloadLink(testNum){
  testNum = testNum + 1

  if(showBluebookTest == true && testNum <=4 && CurrentTest == 'SAT'){
    
    return(
      <p className="TextStyleLightInstructions">Download the Bluebook App to take practice test.</p>
    )
  }
  if(showBluebookTest == true && CurrentTest == 'SAT'){

    testNum = testNum - 4
  }
  var urlName = '/Practice_Tests/'+ CurrentTest.toUpperCase().toString() +'_'+ testNum.toString() +'.pdf'

  return(
    <Button   href={urlName} download sx={{marginLeft:1}}>
      <FaDownload size={25}/>

    </Button>
  )
}

const [SubmitTestDone, setSubmitTestDone] = useState(false)


  useEffect(()=>{
    if(CurrentTest == 'SAT'){
      setCurrChart(
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
          colorScale={["black", "#1ab5e8", "#fa9d9b"]}
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
              data: { stroke: "#1ab5e8" },
              parent: { border: "1px solid #ccc" }
            }} /><VictoryLine
            data={SATLineDataVerbal.slice(0, ChangeTestLength(StandardizedTestsDone.length))}
            animate={{
              duration: 8000,
              onLoad: { duration: 8000 }
            }}
            style={{
              data: { stroke: "#fa9d9b" },
              parent: { border: "1px solid #ccc" }
            }} />
        </VictoryChart>
      )
    }
    else if(CurrentTest == 'ACT'){
     
      
   
      setCurrChart(
      
        <VictoryChart>
          
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
        
        <VictoryLegend x={80} y={30}
        orientation="horizontal"
        symbolSpacer={5}
        gutter={20}
        colorScale={["black", "#1ab5e8", "#fa9d9b", "#800080","#00D100"]}
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
            data: { stroke: "#1ab5e8" },
            parent: { border: "1px solid #ccc" }
          }} />
          <VictoryLine
          data={ACTLineDataMath.slice(0, ChangeTestLength(StandardizedTestsDone.length))}
          animate={{
            duration: 8000,
            onLoad: { duration: 8000 }
          }}
          style={{
            data: { stroke: "#fa9d9b" },
            parent: { border: "1px solid #ccc" }
          }} /><VictoryLine
          data={ACTLineDataReading.slice(0, ChangeTestLength(StandardizedTestsDone.length))}
          animate={{
            duration: 8000,
            onLoad: { duration: 8000 }
          }}
          style={{
            data: { stroke: "#800080" },
            parent: { border: "1px solid #ccc" }
          }} />
          <VictoryLine
          data={ACTLineDataScience.slice(0, ChangeTestLength(StandardizedTestsDone.length))}
          animate={{
            duration: 8000,
            onLoad: { duration: 8000 }
          }}
          style={{
            data: { stroke: "#00D100" },
            parent: { border: "1px solid #ccc" }
          }} />
          <VictoryLine
          data={ACTLineDataTotal.slice(0, ChangeTestLength(StandardizedTestsDone.length))}

          animate={{
            duration: 8000,
            onLoad: { duration: 8000 }
          }} />
        
        
        
         
          </VictoryChart>
      )
    }
  },[SATLineDataTotal,ACTLineDataTotal,SubmitTestDone])



  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalIsOpenTwo, setIsOpenTwo] = React.useState(false);
  const [modalIsOpenThree, setIsOpenThree] = React.useState(false);

  const [CurrentTest, setCurrentTest] = useState()

  const [ClassroomTest,setClassroomTest] = useState('SAT')
  const [CurrentClassroomNumber, setCurrentClassroomNumber] = useState(1)
  const [UpdatedCurrentTest, setUpdatedCurrentTest] = useState()
  const [Tutor, setTutor] = useState("Joseph")
  const [ErrorScreenOn, setErrorScreenOn] = useState(false)

  const [AdminInfo, setAdminInfo] = useState(null)
  const [AdminInfoParent, setAdminInfoParent] = useState(null)
  const [AdminInfoTutor, setAdminInfoTutor] = useState(null)
  const [dataURI, setDataURI] = React.useState("");
  const [exportImageType, setexportImageType] = React.useState("png");

  const imageExportHandler = async () => {
    const exportImage = canvasRef.current?.exportImage;

    if (exportImage) {
      const exportedDataURI = await exportImage(exportImageType);
      setDataURI(exportedDataURI);
      const link = document.createElement("a");
      link.download = exportedDataURI;
      link.href = exportedDataURI;
      link.click();
    }
  };

  const imageExportHandlerImageWithBackground = async () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
  
    // Assuming your canvas has predefined dimensions
    canvas.width = 1000;
    canvas.height = 500;
    //imageDataUrl
  
    const backgroundImage = new Image();
    backgroundImage.src = imageDataUrl;
    await new Promise((resolve) => {
      backgroundImage.onload = () => {
        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        resolve();
      };
    });
  
    // Assuming you have a method to get the foreground image as a Blob URL or base64
    const exportImage = canvasRefImage.current?.exportImage;
    if (exportImage) {
      const foregroundData = await exportImage(exportImageType); // This should give you a Blob URL or base64
      const foregroundImage = new Image();
      foregroundImage.src = foregroundData;
      await new Promise((resolve) => {
        foregroundImage.onload = () => {
          ctx.drawImage(foregroundImage, 0, 0, canvas.width, canvas.height);
          resolve();
        };
      });
  
      // Export the combined image
      const exportedDataURI = canvas.toDataURL(exportImageType);
      const link = document.createElement("a");
      link.download = "image.png"; // Customize the filename as needed
      link.href = exportedDataURI;
      link.click();
    }
  };

  
  const imageExportHandlerImage = async () => {
    const exportImage = canvasRefImage.current?.exportImage;

    if (exportImage) {
      const exportedDataURI = await exportImage(exportImageType);
      setDataURI(exportedDataURI);
      const link = document.createElement("a");
      link.download = exportedDataURI;
      link.href = exportedDataURI;
      link.click();
    }
  };
 

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
  const canvasRefImage = useRef(null);


  function IncreaseSAVnum(){
    setSAVnum(SAVnum + 1)
  }
  const parse = require('html-react-parser');
  const loadSVGHandler = () => {
    
    try{
    var svg = TestSVG

    
    const loadPaths = canvasRef.current?.loadPaths(svg);
   
    if (loadPaths) {
      
      loadPaths();
    }
  
    }catch{
      
    }
 
  
  

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
  
  const [TopicsNamesFull, setTopicsNamesFull] = useState([])

  useEffect(()=>{
    var LocalTopics = []
    if(CurrentTest == 'SAT'){
      for(var i = 0; i < Topics.length; i++){
        LocalTopics.push(Topics[i][0])
      }
    }else if(CurrentTest == 'ACT'){
      for(var i = 0; i < TopicsACT.length; i++){
        LocalTopics.push(TopicsACT[i][0])
      }
    }
    setTopicsNamesFull(LocalTopics)
  },[Topics, TopicsACT, CurrentTest])

  useEffect(()=>{
    var LocalTopics = []
    if(CurrentTest == 'SAT'){
      LocalTopics = Topics
    }else if(CurrentTest == 'ACT'){
      LocalTopics = TopicsACT
    }
    var MathTopics = []
    var VerbalTopics = []
    var ReadingTopics = []
    var ScienceTopics = []
    for (var i = 0; i < LocalTopics.length; i++) {
      if (LocalTopics[i][3] == 'Math') {
        MathTopics.push(LocalTopics[i])
      } else if (LocalTopics[i][3] == 'Reading') {
        ReadingTopics.push(LocalTopics[i])
      } else if (LocalTopics[i][3] == 'Verbal') {
        VerbalTopics.push(LocalTopics[i])
      } else if (LocalTopics[i][3] == 'Science') {
        ScienceTopics.push(LocalTopics[i])
      }
    }
    setTopicsMath(MathTopics)
    setTopicsVerbal(VerbalTopics)
    setTopicsReading(ReadingTopics)
    setTopicsScience(ScienceTopics)

  },[CurrentTest])

  
  const [FreeResponsePractice, setFreeResponsePractice] = useState('');
  const [currentChoiceSelected, setCurrentChoiceSelected] = useState('');
  const [showExplanation, setShowExplanation] = useState(false);

  const handleButtonClickPracticeAnswer = (selectedAnswer) => {
 
    setCurrentChoiceSelected(selectedAnswer);
    //setCurrentPhaseInQuestion(CurrentPhaseInQuestion + 1)
    setShowExplanation(true)
    if (selectedAnswer === CurrentQuestionInfo.answer.charAt(0)) {
      setCorrectAnswerChoicePractice('correct');
    } else {
      setCorrectAnswerChoicePractice('incorrect');
    }
  };

  const handleFreeResponse = (selectedAnswer) => {
    setFreeResponsePractice(selectedAnswer);
  };
  

  const submitFreeResponse= () => {
  
    setCurrentChoiceSelected(FreeResponsePractice);
    //setCurrentPhaseInQuestion(CurrentPhaseInQuestion + 1)
    setShowExplanation(true)
    if (FreeResponsePractice.toString() == CurrentQuestionInfo.answer) {
      setCorrectAnswerChoicePractice('correct');
    } else {
      setCorrectAnswerChoicePractice('incorrect');
    }
  };

  function PullAvailability(){
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
          //var AssignmentString = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.ZoomLink.stringValue)
          var AvailabilityString = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.Availability.arrayValue.values)

          //setChangeAvailabilityObject(AvailabilityString[0])
          /*
          ['9-Monday', '10-Monday', '11-Monday', '12-Monday', '13-Monday', '10-Wednesday', '11-Wednesday', '12-Wednesday', '13-Friday', '14-Friday', '15-Friday', '17-Friday']
          */
         var TempArr = []
         for (var i = 0; i < AvailabilityString[0].length; i++) {
            TempArr.push(AvailabilityString[0][i].stringValue)
         }
       
          if(Type == 'Student' || Type == 'Parent'){
            setTimeout(() => {
              setChangeAvailabilityObject(TempArr)
            }, 5000)
          }
        });
  
        if(Type == 'Student' || Type == 'Parent'){
        
        }else if(Type == 'Tutor'){
  
        }
      }catch(e){

      }
  }




  /*
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
  */
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
  const [PrivatePrice, setPrivatePrice] = useState('')
  const [ClassroomPrice, setClassroomPrice] = useState('')
  const [PrivatePriceTutor, setPrivatePriceTutor] = useState('')
  const [ClassroomPriceTutor, setClassroomPriceTutor] = useState('')
  const [AllCompanyCodeMembers, setAllCompanyCodeMembers] = useState([])
  const [SATCLassroomNumbers, setSATCLassroomNumbers] = useState([])
  const [ACTClassroomNumbers, setACTClassroomNumbers] = useState([])



  useEffect(() => {
    try{
      const x = query(usersRef, where("uid", "==", auth.currentUser.uid.toString()));
      
      //const q = query(collection(db, "users"))
      const unsub = onSnapshot(x, (querySnapshot) => {
     
      //querySnapshot.docs.map(d => setUserNames(UserNames.push(d._document.data.value.mapValue.fields.name.stringValue)))
      var name = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.name.stringValue)
      setUserName(name);
      
      var UserType = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.Type.stringValue)
      
      setType(UserType[0]);
      if(UserType[0] == 'Individual'){
      
        setIsIndividual(true)
        setPageSwitch(1)
      }
      setCompanyCode(querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.CompanyCode.stringValue)[0])
      if(UserType == 'Parent'){
        setParentStudentName(querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.ParentName.stringValue))
       
      }
      if(UserType == 'Tutor'){
        
        setStudents(querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.Students.arrayValue.values))

        setClassroomStudents(querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.Class.arrayValue.values))
        setClassroomStudentsACT(querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.ClassACT.arrayValue.values))
        setSATCLassroomNumbers(querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.ClassNumbersSAT.arrayValue.values))
        setACTClassroomNumbers(querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.ClassNumbersACT.arrayValue.values))
        setTutor(querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.name.stringValue))
        setAdminBool(querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.Admin.booleanValue)[0])
     
      
        
        PullDaysPastStart()
      }
      else{
        setTutor(querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.Tutor.stringValue))
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
  }, [ErrorUpdate, auth.currentUser]); // empty dependencies array => useEffect only called once

  console.log('Students', Students)
  useEffect(()=>{
    if(CompanyCode !== ''){
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
          //var StudentProgress = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.StudentProgress.stringValue)
          var StudentProgress = querySnapshot.docs.map(d => {
            let data = d.data(); // Extract data from the document
        
            // Check if 'StudentProgress' field exists
            if (data && data.StudentProgress) {
                return data.StudentProgress; // Return its value if it exists
            } else {
                return 0; // Return null (or any default value) if it doesn't
            }
        });

     

          var StudentsTemp = []
          try{
            for(var i = 0; i < Students[0].length; i++){
              StudentsTemp.push(Students[0][i].stringValue)
            }
          }catch(e){
            
          }

          console.log('StudentsTemp',StudentsTemp)
          console.log('TempStudentsTotal',TempStudentsTotal)

          setStudentsTotalBool(AddBoolToArr(TempStudentsTotal, StudentsTemp))
          setStudentsTotal(TempStudentsTotal)
          setAdminInfo([TempStudentsTotal, TempTutorsTotal, MeetingDateTotal,TempEmailTotal,TempPhonelTotal, StudentProgress])
          
        }

      });  
      }, 100)

      setTimeout(() => {

        

        const x = query(adminInfoRef ,where("CompanyCode", "==", CompanyCode));
      
        //const q = query(collection(db, "users"))
        const unsub = onSnapshot(x, (querySnapshot) => {
        
        //querySnapshot.docs.map(d => setUserNames(UserNames.push(d._document.data.value.mapValue.fields.name.stringValue)))
 
        //setUserName( querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.name.stringValue));

       
          
        //setStudentsTotal(querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.Students.arrayValue.values))
        
        if(Type == 'Tutor'){
         
        
          var TempPrivatelTotal = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.CostPerHour.stringValue)
          var TempClassroomTotal = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.CostPerHourClassroom.stringValue)
          
          setPrivatePrice(TempPrivatelTotal[0])
          setClassroomPrice(TempClassroomTotal[0])

          var TempPrivatelTotalTutor = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.CostPerHourTutor.stringValue)
          var TempClassroomTotalTutor = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.CostPerHourClassroomTutor.stringValue)
          
          setPrivatePriceTutor(TempPrivatelTotalTutor[0])
          setClassroomPriceTutor(TempClassroomTotalTutor[0])
        }

      });  

      }, 100)

      setTimeout(() => {

        

        const x = query(usersRef, where("Type", "==", "Parent"),where("CompanyCode", "==", CompanyCode));
      
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
          
          setAdminInfoParent([TempStudentsTotal, TempEmailTotal,TempParentTotal,TempPhonelTotal])
      
        }

      });  
      }, 100)

      setTimeout(() => {

        

        const x = query(usersRef, where("Type", "==", "Tutor"),where("CompanyCode", "==", CompanyCode));
      
        //const q = query(collection(db, "users"))
        const unsub = onSnapshot(x, (querySnapshot) => {
        
        //querySnapshot.docs.map(d => setUserNames(UserNames.push(d._document.data.value.mapValue.fields.name.stringValue)))
 
        //setUserName( querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.name.stringValue));

        
      
          
        //setStudentsTotal(querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.Students.arrayValue.values))
        
        if(Type == 'Tutor'){
         
          var TempStudentsTotal = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.name.stringValue)
       
          var TempEmailTotal = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.email.stringValue)
        
          var TempPhonelTotal = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.PhoneNumber.stringValue)
          var AvailabilityTotal = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.Availability.arrayValue.values.map(x => x.stringValue))
          
          
          setAdminInfoTutor([TempStudentsTotal, TempEmailTotal,TempPhonelTotal,AvailabilityTotal])
          
        }

      });  
      }, 100)
    }
  },[CompanyCode, Students])

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

  useEffect(()=>{
    if(ClassroomTest == 'SAT'){
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
    }else if(ClassroomTest == 'ACT'){
      if(ClassroomStudentsACT){
        try{
          var CS = ClassroomStudentsACT[0]
        
          var TempArr = []
          for(var i = 0; i< CS.length; i++){
            TempArr.push(CS[i].stringValue)
          }
          setClassroomStudentsClean(TempArr)
        }catch(err){
  
        }
      }
    }
  },[ClassroomTest])

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
      
       
       
        let NewArr = []; // Use camelCase for variable naming

          querySnapshot.docs.forEach(doc => {
            const data = doc.data();
            
            if (data && data.name && data.uid && data.Type) { // Ensure all fields are present
           
              NewArr.push([
                data.name, // Assuming 'name' is a top-level field
                doc.id,    // The document ID
                data.uid,  // Assuming 'uid' is a top-level field
                data.Type  // Assuming 'Type' is a top-level field
              ]);
          
            } else {
              console.error('Document is missing one or more required fields:', doc.id);
            }
          });
         
        
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
   
      console.log('err', err)
    }
  }, []); // empty dependencies array => useEffect only called once



  useEffect(() => {
    try{
      const z = query(adminInfoRef);
  
     //const q = query(collection(db, "users"))
     var NewwerArr  = []
     var NewArr = AdminInfoId
    const unsub = onSnapshot(z, (querySnapshot) => {
      
      
  
      if(AdminInfoId){
      
        
        querySnapshot.docs.map(d => NewArr[NewArr.length] = ([d._document.data.value.mapValue.fields.CompanyCode.stringValue, d.id]) )
    
       
        for(var t = 0; t<NewArr.length; t++){
          
            NewwerArr.push(NewArr[t])
          
        }
   
        setAdminInfoId(NewwerArr)
        //setNewArrFinished(true)
       
      }
      
      
      
      
  });
  
 
}
     
     //setErrorMessage(unsub())
    // return cleanup function
    //return () => subscriber();
    catch(err){
   
      console.log('err', err)
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
/*
  useEffect(() => {
    try{
      if(CurrentQuizTopic != '' && CurrentQuizTopic != undefined){
        var X = MakeCamelCase(CurrentQuizTopic.toString()).replaceAll(' ','').toString()
        if(CurrentTest == 'SAT'){
          var x = query(quizesRef, where("Topic", "==", X)); //, where("Topic", "==", CurrentQuizTopic.toString().toLowerCase())
        }else if(CurrentTest == 'ACT'){
          var x = query(quizesRefACT, where("Topic", "==", X)); //, where("Topic", "==", CurrentQuizTopic.toString().toLowerCase())
        
        }
        const unsub = onSnapshot(x, (querySnapshot) => {
        
      
          
          setQuizDataId(querySnapshot.docs.map(d => d.id))
          setQuizData( querySnapshot.docs.map(d => d._document.data.value.mapValue.fields));
        
        });
      }
  
     //setErrorMessage(unsub())
    // return cleanup function
    //return () => subscriber();
    //unsub()
    }catch(err){
      console.log("Error")
      console.log(err)
      
    }
  }, [CurrentQuizTopic, CurrentTest]); // empty dependencies array => useEffect only called once
  */

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
      console.log('err', e)
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


  function AddOrRemoveStudentToClass(name,func){

    function FindMatchingId(ID){
      //NameId
      //CurrentStudent
      
      for(var i = 0; i< NameId.length; i++){
      
        if(ID == NameId[i][2]){
          return(NameId[i][1])
        }
      }
    }

    /* Function to find the max number in an array*/
    if(ClassroomTest == 'SAT'){
      var SATClassroomNumbers = []
      for(var i = 0; i < SATCLassroomNumbers[0].length; i++){
        if(SATClassroomNumbers.includes(SATCLassroomNumbers[0][i].integerValue) == false){
          SATClassroomNumbers.push(SATCLassroomNumbers[0][i].integerValue)
        }
      }
    }
    else if(ClassroomTest == 'ACT'){
      var SATClassroomNumbers = []
      for(var i = 0; i < ACTClassroomNumbers[0].length; i++){

        if(SATClassroomNumbers.includes(ACTClassroomNumbers[0][i].integerValue) == false){
          SATClassroomNumbers.push(ACTClassroomNumbers[0][i].integerValue)
        }
      }
    }
    //Find index to be removed

    //Function to pop the a given index out of an array
   

    //FUnction to find the index of someone in an array
    function FindIndexInArray(array, name){
      for(var i = 0; i< array.length; i++){
        if(array[i] == name){
          return(i)
        }

      }
    }

    if(ClassroomTest == 'SAT'){
      var IndexOfPerson = FindIndexInArray(ClassroomStudentsClean, name)
      var RemovedPersonIndex = FindIndexInArray(SATClassroomNumbers, IndexOfPerson)
    }else if(ClassroomTest == 'ACT'){
      var IndexOfPerson = FindIndexInArray(ClassroomStudentsCleanACT, name)
      var RemovedPersonIndex = FindIndexInArray(SATClassroomNumbers, IndexOfPerson)
    }

  

    async function addToArray(firestoreRef, fieldName, newValue) {
      try {
        // Get the current document
        const docSnap =  await getDoc(firestoreRef);
    
        // Check if the document exists
        if (!docSnap.exists()) {
          console.error("Document does not exist!");
          return;
        }
    
        // Retrieve the current array or default to an empty array if it doesn't exist
        const currentArray = docSnap.data()[fieldName] || [];
    
        // Add the new value to the array
        currentArray.push(newValue);
    
        // Update the document with the new array
         updateDoc(firestoreRef, { [fieldName]: currentArray });
        console.log("Document updated successfully!");
    
      } catch (error) {
        console.error("Error updating document:", error);
      }
    }

     async function removeAtIndex(firestoreRef, fieldName, indexToRemove) {
      try {
        // Get the current document
        const docSnap =  await getDoc(firestoreRef);
    
        // Check if the document exists
        if (!docSnap.exists()) {
          console.error("Document does not exist!");
          return;
        }
        
        indexToRemove = indexToRemove + 1
    
        // Retrieve the current array or default to an empty array if it doesn't exist
        const currentArray = docSnap.data()[fieldName] || [];
    
        // Check if index is valid
        if (indexToRemove < 0 || indexToRemove >= currentArray.length) {
          console.error("Index out of bounds!");
          return;
        }
    
        // Remove the value at the specified index
        currentArray.splice(indexToRemove, 1);
    
        // Update the document with the modified array
        updateDoc(firestoreRef, { [fieldName]: currentArray });
        console.log("Document updated successfully!");
    
      } catch (error) {
        console.error("Error updating document:", error);
      }
    }

    function ChangeToGoodArray(){
      if(ClassroomTest == 'SAT'){
        var TempArray = []
        for(var i = 0; i< SATCLassroomNumbers[0].length; i++){
         
          TempArray.push(SATCLassroomNumbers[0][i].integerValue)
        }
        return(TempArray)
      }
      else if(ClassroomTest == 'ACT'){
        var TempArray = []
        for(var i = 0; i< ACTClassroomNumbers[0].length; i++){
         
          TempArray.push(ACTClassroomNumbers[0][i].integerValue)

        }
        return(TempArray)
      }
    }

    function getMaxOfArray(numArray) {
      return Math.max.apply(null, numArray);
    }


    var NextNumber = getMaxOfArray( ChangeToGoodArray() ) + 1
    var IndexToRemove = 0
    if(func == 'remove'){
      if(ClassroomTest == 'SAT'){
        for(var i = 0; i< ClassroomStudentsClean.length; i++){
          if(ClassroomStudentsClean[i][0] == name){
            IndexToRemove = i
          }
        }
      }else if(ClassroomTest == 'ACT'){
        for(var i = 0; i< ClassroomStudentsCleanACT.length; i++){
          if(ClassroomStudentsCleanACT[i][0] == name){
            IndexToRemove = i
          }
        }
      }
    }
  
      var studentDef = doc(db, "users", FindMatchingId(auth.currentUser.uid.toString()));
      if(ClassroomTest == 'SAT'){

  
      if(func == 'add'){
     
          addToArray(studentDef, "ClassNumbersSAT", parseInt(CurrentClassroomNumber));

        
         
        updateDoc(studentDef, {
          Class: arrayUnion(name)
        
          });
       
      }else if (func == 'remove'){
        updateDoc(studentDef, {
          Class: arrayRemove(name)
        
          });

          removeAtIndex(studentDef, "ClassNumbersSAT", RemovedPersonIndex);

      };
    }else if(ClassroomTest == 'ACT'){
      updateDoc(studentDef, {
        ClassACT: arrayUnion(name)
      
        });
        addToArray(studentDef, "ClassNumbersACT", parseInt(CurrentClassroomNumber));
    }else if (func == 'remove'){
      updateDoc(studentDef, {
        ClassACT: arrayRemove(name)
      
        });

        removeAtIndex(studentDef, "ClassNumbersACT", RemovedPersonIndex);
        }

    
  }
  

 

  const PullAllDates = async (s = CurrentStudent) => { 
    try{
    //NameId
    //CurrentStudent
  
    function FindMatchingUid(){
      //NameId
      //CurrentStudent
      
        for(var i = 0; i< NameId.length; i++){
        
          if(s.value == NameId[i][0]){
            return(NameId[i][1])
          }
        }
      }

    var EventBuilder = []

    const pastelColors = [
        "#FFD1DC",  // Pastel Pink
        "#A2CFFE",  // Pastel Blue
        "#FFFFD1",  // Pastel Yellow
        "#BFFCC6",  // Pastel Green
        "#CABBE9",  // Pastel Purple
        "#FFDAC1",  // Pastel Orange
        "#B2EFEF",  // Pastel Mint
        "#E6CCEC",  // Pastel Lavender
        "#FFEBB7",  // Pastel Peach
        "#FFB3BA"   // Pastel Rose
    ];
    function convertUnixToDateTimeString(unixTimestamp) {
      // Ensure the timestamp is in milliseconds for the JavaScript Date object.
      const date = new Date(unixTimestamp * 1000);
    
      // Extract the date and time parts.
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
      const day = date.getDate().toString().padStart(2, '0');
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');
    
      // Construct the date and time string.
      const dateTimeString = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    
      return dateTimeString;
  }
    function extractTimestamps(data) {
        //use 
        return data.map(item => item.timestampValue);
    }  


      //for(var i = 0; i< NameId.length; i++){

 
         
          const x = doc(db, 'users', FindMatchingUid()); //query(usersRef, where("uid", "==", FindMatchingUid())) //query(usersRef, where("id", "==", FindMatchingUid()));
          var NewArr = []
          const docSnapshot = await getDoc(x);
          if (docSnapshot.exists()) {
           
            var MeetingDateString = docSnapshot.get('HistMeetingTimes');//querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.HistMeetingTimes.arrayValue.values)
            var MeetingDateStringEnd = docSnapshot.get('HistMeetingTimesEnd');//querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.HistMeetingTimesEnd.arrayValue.values)
            var NameString = docSnapshot.get('name');//querySnapshot.docs.map(d=> d._document.data.value.mapValue.fields.name.stringValue)
            var TutorString = docSnapshot.get('Tutor');//querySnapshot.docs.map(d=> d._document.data.value.mapValue.fields.Tutor.stringValue)
           
            //var DateX = new Date(MeetingDateString[0].toString())

            //var newDateObj = new Date(DateX.getTime() + 90*60000);
            var CombinedString = NameString + '-' + TutorString

       
       
            var Meetings = MeetingDateString
            var MeetingsEnd = MeetingDateStringEnd
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
          
              if(Meetings[0].length==0){
                console.log("hello")
              }
            }catch(e){
              console.log('err', e)
              return(null)
            }
            if(Meetings[0].length==0){
       
              setEvents([])
              return(null)
            }
            for(var i = 0; i < Meetings.length; i++){

              var DateX = new Date (convertUnixToDateTimeString((Meetings[i].seconds)).toString())
              var newDateObj = new Date (convertUnixToDateTimeString((MeetingsEnd[i].seconds)).toString());
         

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
                end: newDateObj,
                color:'#aebff5',
                editable: false,
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
            
            
      };
      //}
    }catch(e){
      console.log('err', e)
    }
}

const DeleteAllDates = async (s, num) => { //function DeleteAllDates(s, num){
 
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
    function extractTimestamps(data) {
        return data.map(item => item.timestampValue);
    }
    function removeDuplicates(arr) {
      return [...new Set(arr)];
    }

    

    try{
      //NameId
      //CurrentStudent
    
  
      const x = query(usersRef, where("uid", "==", FindMatchingUid())) //query(usersRef, where("id", "==", FindMatchingUid()));
      const studentDef = doc(db, "users", FindMatchingUidUpdate());
      var NewArr = []
      var UpdatedArr = []
      var UpdatedArrEnd = []
      var UpdatedArr2 = []
      var UpdatedArrEnd2 = []
      var EventBuilder = []
      const docSnapshot = await getDoc(studentDef);
        if (docSnapshot.exists()) {
        var MeetingDateString = docSnapshot.get('HistMeetingTimes');//querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.HistMeetingTimes.arrayValue.values)
        var MeetingDateStringEnd = docSnapshot.get('HistMeetingTimesEnd');//querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.HistMeetingTimesEnd.arrayValue.values)
        var NameString = docSnapshot.get('name');//querySnapshot.docs.map(d=> d._document.data.value.mapValue.fields.name.stringValue)
        var TutorString = docSnapshot.get('Tutor');//querySnapshot.docs.map(d=> d._document.data.value.mapValue.fields.Tutor.stringValue)
           
            //var DateX = new Date(MeetingDateString[0].toString())

            //var newDateObj = new Date(DateX.getTime() + 90*60000);
            var CombinedString = NameString + '-' + TutorString

       
            var Meetings = MeetingDateString
            var MeetingsEnd = MeetingDateStringEnd
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
        
        var NewMeetingDateString = MeetingDateString
        var NewMeetingDateStringEnd = MeetingDateStringEnd
        
        var UpdatedArr = (NewMeetingDateString.splice(num, 1))

        var UpdatedArrEnd = (NewMeetingDateStringEnd.splice(num, 1))
       
    
        for(var i = 0; i< NewMeetingDateString.length; i++){
          var DateX = new Date(NewMeetingDateString[i].seconds * 1000);
          var DateY = new Date(NewMeetingDateStringEnd[i].seconds * 1000);
          UpdatedArr2.push(DateX);
          UpdatedArrEnd2.push(DateY);
        }
        UpdatedArr2 = removeDuplicates(UpdatedArr2)
        UpdatedArrEnd2 = removeDuplicates(UpdatedArrEnd2)
   

        for(var i = 0; i < UpdatedArr2.length; i++){

          var DateX = UpdatedArr2[i]
          var newDateObj = UpdatedArrEnd2[i]
      

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
            end: newDateObj,
            color:'#aebff5',
            editable: false,
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

    
            updateDoc(studentDef, {
                HistMeetingTimes: UpdatedArr2
                  
                })
     
    
      
          

            updateDoc(studentDef, {
                HistMeetingTimesEnd: UpdatedArrEnd2
    
                })

      };

     
    }catch(e){
      console.log("ERROR in DeleteAllDates")
      console.log(e)
    }
  
}
const AddNewDates = async (s, newTime, endTime) => { //function AddNewDates(s, newTime, endTime){

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
    for(var i = 0; i< NameId.length; i++){
        
      if(s == NameId[i][0]){
        return(NameId[i][1])
      }
    }
  }
    try{
      //NameId
      //CurrentStudent
      
        
    
  
      const x = query(usersRef, where("uid", "==", FindMatchingUid())) //query(usersRef, where("id", "==", FindMatchingUid()));
      const studentDef = doc(db, "users", FindMatchingUidUpdate());
      var NewArr = []
      var UpdatedArr = []
      var UpdatedArrEnd = []

      const docSnapshot = await getDoc(studentDef);
      var EventBuilder = []
        if (docSnapshot.exists()) {
       
       
        var MeetingDateString = docSnapshot.get('HistMeetingTimes');//querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.HistMeetingTimes.arrayValue.values)
        var MeetingDateStringEnd = docSnapshot.get('HistMeetingTimesEnd');//querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.HistMeetingTimesEnd.arrayValue.values)
        var NameString = docSnapshot.get('name');//querySnapshot.docs.map(d=> d._document.data.value.mapValue.fields.name.stringValue)
        var TutorString = docSnapshot.get('Tutor');//querySnapshot.docs.map(d=> d._document.data.value.mapValue.fields.Tutor.stringValue)
           
            //var DateX = new Date(MeetingDateString[0].toString())

            //var newDateObj = new Date(DateX.getTime() + 90*60000);
            var CombinedString = NameString + '-' + TutorString

          
       
            var Meetings = MeetingDateString
            var MeetingsEnd = MeetingDateStringEnd
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
            
        
        var NewMeetingDateString = MeetingDateString
        var NewMeetingDateStringEnd = MeetingDateStringEnd
   
        //var DateX = new Date(convertUnixToDateTimeString(NewMeetingDateString[i].seconds).toString())
        //var DateY = new Date(convertUnixToDateTimeString(NewMeetingDateStringEnd[i].seconds).toString())
        for(var i = 0; i< NewMeetingDateString.length; i++){
          var DateX = new Date(NewMeetingDateString[i].seconds * 1000);
          UpdatedArr.push(DateX);
        }
        
        for(var i = 0; i< NewMeetingDateStringEnd.length; i++){
          var DateX = new Date(NewMeetingDateStringEnd[i].seconds * 1000);
          UpdatedArrEnd.push(DateX);
        }


        UpdatedArr.push(new Date(newTime))
        UpdatedArrEnd.push(new Date(endTime))


        for(var i = 0; i < UpdatedArr.length; i++){

          var DateX = UpdatedArr[i]
          var newDateObj = UpdatedArrEnd[i]
     

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
            end: newDateObj,
            color:'#aebff5',
            editable: false,
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
        

        setTimeout(()=>{
         
          updateDoc(studentDef, {
              HistMeetingTimes: UpdatedArr
                
              })
        }, 10)
  
        setTimeout(()=>{
          
          updateDoc(studentDef, {
              HistMeetingTimesEnd: UpdatedArrEnd
  
  
              })
        }, 10)

       


        

      };
      
      

    }catch(e){
      console.log("ERROR in AddNewDates")
      console.log(e)
    }
  }


function SetAllMeetings(){
  
    const x = query(usersRef) //query(usersRef, where("id", "==", FindMatchingUid()));
    

      
      const unsub = onSnapshot(x, (querySnapshot) => {
        //var MeetingDateString = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.HistMeetingTimes.arrayValue.values)

     
        var Total = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields)

        var NewArr = []
        var NameArr = []
        var TutorArr = []
        //var NameString = querySnapshot.docs.map(d=> d._document.data.value.mapValue.fields.name.stringValue)
        //var TutorString = querySnapshot.docs.map(d=> d._document.data.value.mapValue.fields.Tutor.stringValue)
     
        for(var i = 0; i< Total.length; i++){
       
          if(Total[i].Type.stringValue == 'Student' && Total[i].Tutor.stringValue == Tutor && Total[i].CompanyCode.stringValue == CompanyCode){
           
            try{
              for(var y = 0; y< Total[i].HistMeetingTimes.arrayValue.values.length; y++){
                if(Total[i].HistMeetingTimes.arrayValue.values[y].stringValue != ''){
              
                  NewArr.push(Total[i].HistMeetingTimes.arrayValue.values[y].timestampValue)
                  NameArr.push(Total[i].name.stringValue)
                  TutorArr.push(Total[i].Tutor.stringValue)
              
                }
              }
            }catch(e){
              console.log('err', e)
            }
     
          }
        }
     
        var Meetings = NewArr
        var EventBuilder = []
        const pastelColors = [
          "#B06573",  // Even Darker Pink
          "#506799",  // Even Darker Blue
          "#A3A357",  // Even Darker Yellow
          "#6C946E",  // Even Darker Green
          "#7F6CA5",  // Even Darker Purple
          "#B47A5C",  // Even Darker Orange
          "#648F8F",  // Even Darker Mint
          "#A57AA3",  // Even Darker Lavender
          "#B49546",  // Even Darker Peach
          "#B4565B"   // Even Darker Rose
      ];
      function assignColors(strings) {
        // Sort the strings alphabetically
          const sortedStrings = strings.sort();
      
          // Assign colors from the pastel colors list to the sorted strings
          const result = sortedStrings.map((string, index) => {
              return [string, pastelColors[index % pastelColors.length]];
          });
      
          return result;
      }
      
      function getColorForString(targetString, assignedArray) {
          for (let pair of assignedArray) {
              if (pair[0] === targetString) {
                  return pair[1];
              }
          }
          return null; // Return null if the string is not found
      }
      var TempNames = []
      for (i  = 0 ; i < Meetings.length; i++) {
        TempNames.push(NameArr[i] + '-' + TutorArr[i])
      }
      var assignedArray = assignColors(TempNames);


        for(var i = 0; i < Meetings.length; i++){
            
            var DateX = new Date(Meetings[i].toString())
            var newDateObj = new Date(DateX.getTime() + 90*60000);

          

           
            //setNextCurrentStudentDate(DateX)
            var CombinedString = NameArr[i] + '-' + TutorArr[i]
            var TempDict ={
              event_id: (CombinedString + '-' + (i+1).toString()),
              title: CombinedString,
              start: DateX,
              end: newDateObj,
              color: getColorForString(CombinedString, assignedArray),
              editable: false,

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
      console.log('err', e)
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
      console.log('err', e)
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

  const [CurrentDaysPastStart, setCurrentDaysPastStart] = useState(new Date())
  const [InFreeTrial, setInFreeTrial] = useState(false)
  const [FreeTrialEndingDay, setFreeTrialEndingDay] = useState(30)
  //Create a function that returns true if the date string is less than a set under of days old
  function CheckIfInFreeTrial(){
    var today = new Date();
    var date = new Date(CurrentDaysPastStart);
    var DifferenceInTime = today.getTime() - date.getTime();
    var DifferenceInDays = DifferenceInTime / (1000 * 3600 * 24);
    if(DifferenceInDays < FreeTrialDays){
      setInFreeTrial(true)
    }else{
      setInFreeTrial(false)
    }
  }

   //Add 30 days to datetime string 
    function AddDaysToDate(date, days) {
      var result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    }



  function PullDaysPastStart(){
    //Placeholder
    
    function FindMatchingUid(){
      //NameId
      //CurrentStudent
      
      for(var i = 0; i< NameId.length; i++){
      
        if(UserName.toString() == NameId[i][0]){
          return(NameId[i][2])
        }
      }
    }

   

  
        
        try{
        const x = query(usersRef, where("uid", "==", FindMatchingUid())) //query(usersRef, where("id", "==", FindMatchingUid()));
       
        const unsub = onSnapshot(x, (querySnapshot) => {
          var AssignmentString = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.StartTime.timestampValue)
  
    
  
          setCurrentDaysPastStart(AssignmentString[0].toString())
          setFreeTrialEndingDay(AddDaysToDate(AssignmentString[0].toString(), 30))
          var today = new Date();
          var date = new Date(AssignmentString[0]);
          var DifferenceInTime = today.getTime() - date.getTime();
          var DifferenceInDays = DifferenceInTime / (1000 * 3600 * 24);
          if(DifferenceInDays < FreeTrialDays){
            setInFreeTrial(true)
          }else{
            setInFreeTrial(false)
          }
        });
  
        if(Type == 'Student' || Type == 'Parent'){
        
        }else if(Type == 'Tutor'){
  
        }
      }catch(e){
        console.log('err', e)
      }
  }

  function PullDisabled(){
    function FindMatchingUid(){
      //NameId
      //CurrentStudent

      for(var i = 0; i< NameId.length; i++){

        if(UserName.toString() == NameId[i][0]){
          return(NameId[i][2])
        }
      }
    }

    try{
      const x = query(usersRef, where("uid", "==", FindMatchingUid())) //query(usersRef, where("id", "==", FindMatchingUid()));
     
      const unsub = onSnapshot(x, (querySnapshot) => {
        var AssignmentString = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.DisableService.booleanValue)
        var DisableBilling = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.DisableBilling.booleanValue)
      
        

        setDisableService(AssignmentString[0])
        setDisableBilling(DisableBilling[0])
        
      });

      if(Type == 'Student' || Type == 'Parent'){
      
      }else if(Type == 'Tutor'){

      }
    }catch(e){
      console.log('err', e)
    }
  }

  useEffect(()=>{
    if(UserName !== '' && UserName !== undefined){
      PullDisabled()
    }
  },[UserName])

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
        console.log('err', e)
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
  
      }catch(e){
        console.log('err', e)
      }
  }

  function PullIsIndividual(s){
  

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
          //var AssignmentString = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.ZoomLink.stringValue)

          


          var CombinedString = 'https://tutorvideo-0e8671c59a9a.herokuapp.com/join/' + CompanyCode.replace(' ','') + '-' + Tutor[0].replace(' ','')

          setZoomLink(CombinedString)
   
        });
  
        if(Type == 'Student' || Type == 'Parent'){
        
        }else if(Type == 'Tutor'){
  
        }
      }catch(e){
        console.log('err', e)
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
  
  function PulllAllMemebersWithCompanyCode(){
   
    try{
      const x = query(usersRef, where("CompanyCode", "==", CompanyCode)) //query(usersRef, where("id", "==", FindMatchingUid()));

      const unsub = onSnapshot(x, (querySnapshot) => {
        var AssignmentString = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.name.stringValue)
      
        setAllCompanyCodeMembers(AssignmentString)

      });
    }catch(e){
      console.log('err', e)
    }
  }

  useEffect(()=>{
    if(CompanyCode !== ''){
      PulllAllMemebersWithCompanyCode()
    }
  },[CompanyCode])


  function updateDisabled(t, name){
    // d could just feed in date
    //setDisableService
    if(true){
      function FindMatchingUid(){
        //NameId
        //CurrentStudent

        for(var i = 0; i< NameId.length; i++){

          if(name.toString() == NameId[i][0]){
            return(NameId[i][1])
          }
        }
      }

      const studentDef = doc(db, "users", FindMatchingUid());

      updateDoc(studentDef, {
              DisableService: t

              });

            }
  }

  function updateDisabledBilling(t, name){
    // d could just feed in date
    //setDisableService
    if(true){
      function FindMatchingUid(){
        //NameId
        //CurrentStudent

        for(var i = 0; i< NameId.length; i++){

          if(name.toString() == NameId[i][0]){
            return(NameId[i][1])
          }
        }
      }

      const studentDef = doc(db, "users", FindMatchingUid());

      updateDoc(studentDef, {
              DisableBilling: t

              });

            }
  }

  const handleChangeDisabled = (event) => {
   
    setDisableService(event.target.checked);
    for(var i = 0; i< AllCompanyCodeMembers.length; i++){
      updateDisabled(event.target.checked, AllCompanyCodeMembers[i])
    }
  };

  const handleChangeDisabledBilling = (event) => {
    
    setDisableBilling(event.target.checked);
    for(var i = 0; i< AllCompanyCodeMembers.length; i++){
      updateDisabledBilling(event.target.checked, AllCompanyCodeMembers[i])
    }
  };

  //PlaceholderFinancials
  function UpdateFinancials(amount, type){
    // d could just feed in date
 
    if(CompanyCode !== '' ){
      function FindMatchingUid(){
        //NameId
        //CurrentStudent
        
        for(var i = 0; i< AdminInfoId.length; i++){
        
          if(CompanyCode == AdminInfoId[i][0]){
            return(AdminInfoId[i][1])
          }
        }
      }
  
      const adminDef = doc(db, "CompanyCodeAdminInfo", FindMatchingUid());
      //const x = query(adminInfoRef, where("CompanyCode", "==", CompanyCode))
      //adminInfoRef
      
      if(type == 'Private'){
        setPrivatePrice(amount.value)
        updateDoc(adminDef, {
          CostPerHour: amount.value
              
                });
              }
      else if(type == 'PrivateTutor'){
        setPrivatePriceTutor(amount.value)
        updateDoc(adminDef, {
          CostPerHourTutor: amount.value
          
                });
      
      }
      else if(type == 'ClassroomTutor'){


        setClassroomPriceTutor(amount.value)
        updateDoc(adminDef, {
          CostPerHourClassroomTutor: amount.value

                });
      }
      else{
        setClassroomPrice(amount)
        updateDoc(adminDef, {
          CostPerHourClassroom: amount
              
                });
      }
          
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
  
        
          setSVG(AssignmentString[0])
        
          
        });
  
        if(Type == 'Student' || Type == 'Parent'){
        
        }else if(Type == 'Tutor'){
  
        }
      }catch(e){
        console.log('err', e)
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
        console.log('err', e)
      }
  }

  useEffect(()=>{
    if(Type == 'Tutor'){
     
      PullClassDate()
    }
  },[auth.currentUser, Type])

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
    function convertToLocalISOFormat(dateStr) {
      // Parse the given string into a Date object
      let dateParts = dateStr.split(' ');
      let mainDatePart = dateParts.slice(1, 5).join(' ');
      
      let dt = new Date(mainDatePart);
      
      // Convert to the desired local format
      let year = dt.getFullYear();
      let month = String(dt.getMonth() + 1).padStart(2, '0');
      let day = String(dt.getDate()).padStart(2, '0');
      let hours = String(dt.getHours()).padStart(2, '0');
      let minutes = String(dt.getMinutes()).padStart(2, '0');
      
      return `${year}-${month}-${day}T${hours}:${minutes}`;
  }
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
            defaultValue={convertToLocalISOFormat((state.startTime).toString())}

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
          <MenuItem value={30}>30 Minutes</MenuItem>
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
  const [CurrCalendar, setCurrCalendar] = useState()
 
  const [key, setKey] = useState(Date.now());

  const forceRender = () => setKey(Date.now());

  useEffect(()=>{
   
    if(CurrentStudent !== '' && CurrentStudent !== undefined){
  
    

      setCurrCalendar(<Scheduler
        customEditor={(scheduler) => <CustomEditor scheduler={scheduler}  />}
        view="month"
        editable={true}
        deletable={true}
        draggable={false}
      
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
      />)

    }
  },[Events,CurrentStudent])

  useEffect(()=>{
    forceRender()
  },[CurrCalendar])


  //Check if we can release new assignments:

  const [CanReleaseNewAssignments, setCanReleaseNewAssignments] = useState(false)

useEffect(() => {
  if (CurrentStudent !== '' && CurrentStudent !== undefined) {
    // Check if all student assignments are done
    for (var i = 0; i < StudentAssignments.length; i++) {
      if (StudentAssignments[i][1] == false) {
        // If any assignment is not done, set CanReleaseNewAssignments to false and break out of the loop
        setCanReleaseNewAssignments(false);
        break;
      } else {
        // If all assignments are done, set CanReleaseNewAssignments to true
        setCanReleaseNewAssignments(true);
      }
    }
    if(StudentAssignments.length == 0){

      setCanReleaseNewAssignments(true);
    }
    // Set the CanReleaseNewAssignments state based on the result
   
  }
}, [CurrentStudent, StudentAssignments]);
    


  

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

  const [AssignmentsDoneClassroom, setAssignmentsDoneClassroom] = useState([])
  

  const PullDoneAssignmentsForClassroom = async (s) => { 
   
    function FindMatchingUid(){
      //NameId
      //CurrentStudent
      
        for(var i = 0; i< NameId.length; i++){
        
          if(s == NameId[i][0]){
            return(NameId[i][1])
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
    const studentDef = doc(db, 'users', FindMatchingUid()); 

    const docSnapshot = await getDoc(studentDef);
    if (docSnapshot.exists()) {
      
      var AssignmentString2 = docSnapshot.get('assignmentsDone');//querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.assignmentsDone.stringValue)
     
      var AS = AssignmentString2
      var Arr = AS.split('%')
   
  
      setAssignmentsDoneClassroom(Arr.slice(1,Arr.length))

   

    
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
      
    };
    
  }catch(e){
    console.log('error')
    console.log(e)
  }
  }

  const PullDoneAssignments = async (s) => { 


    function FindMatchingUid(){
      //NameId
      //CurrentStudent
      
        for(var i = 0; i< NameId.length; i++){
        
          if(s.value == NameId[i][0]){
            return(NameId[i][1])
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
    const studentDef = doc(db, 'users', FindMatchingUid()); 

    const docSnapshot = await getDoc(studentDef);
    if (docSnapshot.exists()) {
      
      var AssignmentString2 = docSnapshot.get('assignmentsDone');//querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.assignmentsDone.stringValue)
     
      var AS = AssignmentString2
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
    };
  }catch(e){
    console.log('error')
    console.log(e)
  }
  }



  const RemoveAssignments = async (s = null) => {
    
    function FindMatchingUid(){
      //NameId
      //CurrentStudent
      if(s == null){
        for(var i = 0; i< NameId.length; i++){
        
          if(CurrentStudent.value == NameId[i][0]){
            return(NameId[i][1])
          }
        }
      }else{
        for(var i = 0; i< NameId.length; i++){

          if(s == NameId[i][0]){
            return(NameId[i][1])
          }
        }
    }
  }




    const studentDef = doc(db, "users", FindMatchingUid());

    function CheckIfStudentDidTopic(topic){
      var Arr = StudentAssignments
      var Bool = false
      for(var i = 0; i < Arr.length; i++){
        if(Arr[i][0].toString() == topic.toString()){
          return true
        }
      }
      return false
    }



    try{

    //const X = query(usersRef, where("uid", "==", FindMatchingUidQuery())) //query(usersRef, where("id", "==", FindMatchingUid()));
    const docSnapshot = await getDoc(studentDef);

    var AssignmentsArc = ''
    var AssignmentsDone = ''
      
     if (docSnapshot.exists()) {
          var AssignmentString = docSnapshot.get('assignmentsArc');//querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.assignmentsArc.stringValue)
          var AssignmentString2 = docSnapshot.get('assignmentsDone');//querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.assignmentsDone.stringValue)
       

          AssignmentsArc = AssignmentString
          AssignmentsDone = AssignmentString2
     
   


    setTimeout(() => {
     var ArrString = ''
     var FinishedTopic = ''
      if(s == null){
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
      }else{
        for(var i = 0; i < StudentAssignmentsClassroom.length; i++){
          for(var x = 0; x<3; x++){
        
            ArrString = ArrString + StudentAssignmentsClassroom[i][x].toString() + '+'
          }
          if(StudentAssignmentsClassroom[i][1] == true){

            FinishedTopic = FinishedTopic + StudentAssignmentsClassroom[i][0] + '+'
          }
          
          ArrString = ArrString.slice(0, -1)
          ArrString = ArrString + '%'
        }
      }
      //Add Student assignments to topics



      var buildTopics = ''
      if(CurrentTest == 'SAT'){
        for(var i = 0; i< TopicsFull.length; i++){
          if(TopicsFull[i][1] == true || CheckIfStudentDidTopic(TopicsFull[i][0])){
            
            buildTopics = buildTopics +'true' +'+' + TopicsFull[i][2] + '%'
          }
          else{
            buildTopics = buildTopics +'false' +'+' + TopicsFull[i][2] + '%'
          }
        }
      }else if(CurrentTest == 'ACT'){


        for(var i = 0; i< TopicsFullACT.length; i++){
         
         
          if(TopicsFullACT[i][1] == true || CheckIfStudentDidTopic(TopicsFullACT[i][0])){
            
            buildTopics = buildTopics +'true' +'+' + TopicsFullACT[i][2] + '%'
          }
          else{
            buildTopics = buildTopics +'false' +'+' + TopicsFullACT[i][2] + '%'
          }
          
        }
 
      }
      //ArrString = ArrString.slice(0, -1)

      buildTopics = buildTopics.slice(0, -1)
      /*
      if(buildTopics == ''){
        buildTopics = ArrString
      }
      else{
        if(buildTopics.includes(ArrString)){
        }else{
          buildTopics = buildTopics + '%' + ArrString
        }
      }
      console.log('buildTopics')
      console.log(buildTopics)
      */
      var FinishedTopicX = FinishedTopic.toString().replaceAll('+','%')
      var AS = (AssignmentsDone.toString() + '%' + FinishedTopicX.slice(0, -1)).toString()

      var Arr = AS.split('%')
   

      if(s == null){
        setAssignmentsDoneGlobal(Arr.slice(1,Arr.length))
      }else{
        setAssignmentsDoneClassroom(Arr.slice(1,Arr.length))
      }

      if(Type == 'Student' || Type == 'Parent'){

      }else if(Type == 'Tutor' || Type == 'Individual'){
        var FinishedTopicX = FinishedTopic.toString().replaceAll('+','%')
        updateDoc(studentDef, {
          topics: buildTopics.toString()
          });
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


      setStudentAssignments([])
      setStudentAssignmentsClassroom([])
      }, 50)
    }


    }catch(e){
      console.log('error')
      console.log(e)
    }
    }

  
  function RemoveAssignmentsClassroom(){
    for(var i = 0; i < PullCorrespondingStudentsFromClassroomNumber().length; i++){
   
      RemoveAssignments(PullCorrespondingStudentsFromClassroomNumber()[i])
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
      }else if(Type == 'Tutor' || Type == 'Individual'){
        updateDoc(studentDef, {
          assignments: ArrString.slice(0, -1) 
          });
      }
    }
  }

  function DeleteFromPDFLinks(name){
    function FindMatchingUid(){
      //NameId
      //CurrentStudent
      
      for(var i = 0; i< NameId.length; i++){
      
        if(UserName.toString() == NameId[i][0]){
          return(NameId[i][2])
        }
      }
    }

    function removeSubstringFromString(str, subStr) {
      const segments = str.split('~');
      const filteredSegments = segments.filter(segment => !segment.includes(subStr));
      return filteredSegments.join('~');
    }

    
    const X = query(usersRef, where("uid", "==", FindMatchingUid())) //query(usersRef, where("id", "==", FindMatchingUid()));
    var AdditionalPDFUrl = ''
   
   
    const unsub = onSnapshot(X, (querySnapshot) => {
          var String = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.AdditionalPDFUrl.stringValue)
          AdditionalPDFUrl = String[0]
    });
  
    const tutorDef = doc(db, "users", FindMatchingUid());
 
    var NewString = removeSubstringFromString(AdditionalPDFUrl, name )
  
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

      

      function removeEmptyStrings(arr) {
        return arr.filter(str => str !== "");
      }
 
    const X = query(usersRef, where("uid", "==", FindMatchingUid())) //query(usersRef, where("id", "==", FindMatchingUid()));
    var AdditionalPDFUrl = ''
   
   
    const unsub = onSnapshot(X, (querySnapshot) => {
          var String = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.AdditionalPDFUrl.stringValue)
         
          AdditionalPDFUrl = String[0]
    

    var FirstSplit = removeEmptyStrings( AdditionalPDFUrl.split('~'))
 
    var NewPDFLinksLocal = []
    for(var i = 0; i<FirstSplit.length; i++){
      var SecondSplit = FirstSplit[i].split('%')
      NewPDFLinksLocal.push(SecondSplit)
     
    }
    setNewPDFLinks(NewPDFLinksLocal)
 
    
  });
  }catch(e){
    console.log('err', e)
  }
  },[UserName])

  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` points to the mounted text input element
   
  };

  const [SwitchText, setSwitchText] = useState('Add')
  const [ButtonPressed, setButtonPressed] = useState(false)




  useEffect(()=>{
  
    try{
    //PlaceholderURL

    function FindMatchingUid(){
      //NameId
      //CurrentStudent
      
      for(var i = 0; i< NameId.length; i++){
      
        if(UserName.toString() == NameId[i][0]){
          return(NameId[i][2])
        }
      }
    }
    function FindMatchingUidUpdate(){
      //NameId
      //CurrentStudent
      
      for(var i = 0; i< NameId.length; i++){
      
        if(UserName.toString() == NameId[i][0]){
          return(NameId[i][1])
        }
      }
    }

    
   
    const X = query(usersRef, where("uid", "==", FindMatchingUid())) //query(usersRef, where("id", "==", FindMatchingUid()));
    var AdditionalPDFUrl = ''
   
   
    const unsub = onSnapshot(X, (querySnapshot) => {
          var String = querySnapshot.docs.map(d => d._document.data.value.mapValue.fields.AdditionalPDFUrl.stringValue)
          AdditionalPDFUrl = String[0]
    });
  

   
    const tutorDef = doc(db, "users", FindMatchingUidUpdate());
    
    var NewString = AdditionalPDFUrl + NewPDFName + '%' + NewPDFURL + '~'
  
    if(NewString == '%~'){
     
    }else{
    updateDoc(tutorDef, {
      AdditionalPDFUrl: NewString //.slice(0, -1) 
      });
    }
    setTimeout(() => {

      if(SwitchText == 'Add'){
        setSwitchText('Added!')
      }else if(SwitchText == 'Added!'){
        setSwitchText('Add')
      }
    }, 1000);
    }catch(e){
      console.log('err', e)
    }
  },[ButtonPressed])


  function UpdateStudentAssignmentsClassroom(StudentAssignments, Student, setNew = true){
 
    

    if(CurrentStudent !== '' ){

      //StudentAssignmentsClassroom
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

    


            const AssignmentArr = ArrString.split('%');
            const NewArr = AssignmentArr.map((assignment) => {
              const [name, isTrue, number] = assignment.split('+');
              return [
                name,
                isTrue === 'true',
                parseInt(number, 10)
              ];
            }).filter((assignment) => assignment[0] !== '');
      
            // Assuming setStudentAssignments is a function that updates state or does something with the transformed data.
            var Temp = []
            for(var i = 0; i<StudentAssignmentsClassroom.length; i++){
              Temp.push(StudentAssignmentsClassroom[i])
            }
            if(setNew == true){
      
              Temp.push(NewArr[0])
           
              setStudentAssignmentsClassroom(Temp);
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



  const PullStudentAssignments = async (s) => {
 
    function FindMatchingUid(){
      //NameId
      //CurrentStudent
      
        for(var i = 0; i< NameId.length; i++){
        
          if(s.value == NameId[i][0]){
            return(NameId[i][1])
          }
        }
      }

        try{
        const x = doc(db, "users", FindMatchingUid());//query(usersRef, where("uid", "==", FindMatchingUid())) //query(usersRef, where("id", "==", FindMatchingUid()));
        var NewArr = []
        //const docRef = doc(db, "users", "SF");

        const docSnapshot =  await getDoc(x);
          if (docSnapshot.exists()) {
          
            // Assuming assignments is a string with a specific format to split and manipulate.
            const AssignmentString = docSnapshot.get('assignments');
      
            // ... rest of your code logic ...
      
            const AssignmentArr = AssignmentString.split('%');
            const NewArr = AssignmentArr.map((assignment) => {
              const [name, isTrue, number] = assignment.split('+');
              return [
                name,
                isTrue === 'true',
                parseInt(number, 10)
              ];
            }).filter((assignment) => assignment[0] !== '');
      
            // Assuming setStudentAssignments is a function that updates state or does something with the transformed data.
            setStudentAssignments(NewArr);
          } else {
            console.log('No document found!');
          }
        
      

        if(Type == 'Student' || Type == 'Parent'){

       
        
        }else if(Type == 'Tutor'){

        }
        }catch(e){
          console.log('err', e)
        }
  }


  const PullStudentAssignmentsClassroom = async (Student) => {
 
    function FindMatchingUid(){
      //NameId
      //CurrentStudent
      
      for(var i = 0; i< NameId.length; i++){
      
        if(Student == NameId[i][0]){
          return(NameId[i][1])
        }
      }
    }

        try{
        const x = doc(db, "users", FindMatchingUid());//query(usersRef, where("uid", "==", FindMatchingUid())) //query(usersRef, where("id", "==", FindMatchingUid()));
        var NewArr = []
        //const docRef = doc(db, "users", "SF");

        const docSnapshot =  await getDoc(x);
          if (docSnapshot.exists()) {
          
            // Assuming assignments is a string with a specific format to split and manipulate.
            const AssignmentString = docSnapshot.get('assignments');
      
            // ... rest of your code logic ...
      
            const AssignmentArr = AssignmentString.split('%');
            const NewArr = AssignmentArr.map((assignment) => {
              const [name, isTrue, number] = assignment.split('+');
              return [
                name,
                isTrue === 'true',
                parseInt(number, 10)
              ];
            }).filter((assignment) => assignment[0] !== '');

            
            // Assuming setStudentAssignments is a function that updates state or does something with the transformed data.
            setStudentAssignmentsClassroom(NewArr);
          } else {
            console.log('No document found!');
          }
        
      

        if(Type == 'Student' || Type == 'Parent'){

       
        
        }else if(Type == 'Tutor'){

        }
        }catch(e){
          console.log('err', e)
        }
  }
 
  
  

  
	




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



 
  
 /*
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
*/
  const PullQuizResult = async (s) => {
    function FindMatchingUid(){
      //NameId
      //CurrentStudent
      
        for(var i = 0; i< NameId.length; i++){
        
          if(s.value == NameId[i][0]){
            return(NameId[i][1])
          }
        }
      }

      function createData(Category, Chapter ,Right, Wrong, Percent) {
        return { Category, Chapter , Right,  Wrong,  Percent};
      }
  
        
        try{
        //const x = query(usersRef, where("uid", "==", FindMatchingUid())) //query(usersRef, where("id", "==", FindMatchingUid()));
        const t = doc(db, 'users', FindMatchingUid());
        const docSnapshot = await getDoc(t);


        if (docSnapshot.exists()) {
          const AssignmentString = [docSnapshot.get('QuizResults')];
         
          if(AssignmentString[0].length == 0){
         
            return(null)
          }
         
          
          //Breakingpoint
          setQuizResultsGlobal(AssignmentString[0])
          var TempArr = AssignmentString[0].split('%')
          var Pusher = []

          var NewTempArr = []
          for(var i = 0; i < TempArr.length; i++){
            if(TempArr[i].includes('++0')){
            }else{
              NewTempArr.push(TempArr[i])
            }
          }
          TempArr = NewTempArr
       
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
              var PushDict = createData(InnerArr[0], parseInt(InnerChapter), InnerArr[1], InnerArr[2], Math.round((parseInt(InnerArr[1])/(parseInt(InnerArr[2])))*100).toString()+ '%')
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
              var PushDict = createData(InnerArr[0], parseInt(InnerChapter), InnerArr[1], InnerArr[2], Math.round((parseInt(InnerArr[1])/( parseInt(InnerArr[2])))*100).toString()+ '%')
              Pusher.push(PushDict)
              //createData
              //TopicsFull
            }
          }
          setHWrowsGlobal(Pusher)
        };
        
        



        
  
        if(Type == 'Student' || Type == 'Parent'){
        
        }else if(Type == 'Tutor'){
  
        }
      }catch(e){
        console.log('err', e)
      }
  }


  const UpdateQuizResult = async (Data) => {
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
      const X = doc(db, 'users', FindMatchingUid());  //query(usersRef, where("id", "==", FindMatchingUid()));
      var QuizResultsString = ''
      try{
        const docSnapshot = await getDoc(X);
        if (docSnapshot.exists()) {
              QuizResultsString = docSnapshot.get('QuizResults');
              
                  
        }
        
        }
      catch(err){
        console.log('err', e)
        QuizResultsString = ''
      }
      /*
      if(QuizResultsString.length >0){

      }else{
        return(null)
      }
      */
  
      var des = DoubleCheck(Data)

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
      console.log('err', e)
    }   
      
    }
  }






 
  
  
  const [data, setData] = useState([
    [{ value: "Test" }, { value: "Section" },{ value: "Question" }, { value: "Subject" },{ value: "Question Subject" },{ value: "Student Answer" },{value:'Correct Answer'},{ value: "Match" }],
    
  ]);
  const [dataAssignments, setDataAssignments] = useState([
    
  ]);
  const [dataTotal, setDataTotal] = useState(null);
  const [DataTotalRaw, setDataTotalRaw] = useState([]);
  const [StandardizedTestsDone, setStandardizedTestsDone] = useState([true,true,true,true,true,true,true,true,true,true]);
  const [StandardizedTestDoneConst, setStandardizedTestDoneConst] = useState([true,true,true,true,true,true,true,true,true,true]);

  const [NewAssignmentsViewed, setNewAssignmentsViewed] = useState(true);
  const [LatestPopupViewed, setLatestPopupViewed] = useState(true);

  async function updateOrCreateDoc(db, docRef, data) {
    const document = doc(db, docRef);
    
    const docSnap = await getDoc(document);
  
    if (!docSnap.exists()) {
  
      // Document doesn't exist, create it
      try {
        await setDoc(document, data);
   
      } catch (error) {
        console.error('Error creating document: ', error);
      }
    } else {

      // Document exists, update it
      try {
        await updateDoc(document, data);
       
      } catch (error) {
        console.error('Error updating document: ', error);
      }
    }
  }


  async function PullStudentAssignmentsViewed(s){
    if(true){
      function FindMatchingUid(){
        for(var i = 0; i< NameId.length; i++){
          if(s == NameId[i][0]){
            return(NameId[i][1])
          }
        }
      }
      const studentDef = doc(db, "users", FindMatchingUid());
      const docSnap = await getDoc(studentDef);
     
      if (docSnap.exists()) {
        const data = docSnap.data();
      

        setNewAssignmentsViewed(data.StudentAssignmentViewed);
      } else {
        console.log("No such document in student assignments!");
      }
    }
  } 
  
  async function PullPopupViewed(s){
    if(true){
      function FindMatchingUid(){
        for(var i = 0; i< NameId.length; i++){
          if(s == NameId[i][0]){
            return(NameId[i][1])
          }
        }
      }
      const studentDef = doc(db, "users", FindMatchingUid());
      const docSnap = await getDoc(studentDef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setLatestPopupViewed(data.LatestPopupViewed);
      } else {
        console.log("No such document!");
      }
    }
  }
  
  async function PullWeeklyPracticeDay(s){
    if(true){
      function FindMatchingUid(){
        for(var i = 0; i< NameId.length; i++){
          if(s == NameId[i][0]){
            return(NameId[i][1])
          }
        }
      }
      const studentDef = doc(db, "users", FindMatchingUid());
      const docSnap = await getDoc(studentDef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setWeeklySchedule(data.WeeklySchedule);
      } else {
        console.log("No such document!");
      }
    }
  }

  async function PullBluebookGrade(s) {
    if (true) {
      function FindMatchingUid() {
        for (var i = 0; i < NameId.length; i++) {
          if (s == NameId[i][0]) {
            return (NameId[i][1]);
          }
        }
      }
      const studentDef = doc(db, "users", FindMatchingUid());
      const docSnap = await getDoc(studentDef);
      if (docSnap.exists()) {
        try {
          const data = docSnap.data();
          var bluebookGrade = data.BluebookGrade.split('%');
          while (bluebookGrade.length < 8) {
            bluebookGrade.push('400');
          }
          setBluebookScore(bluebookGrade);
        } catch (e) {
          console.log('err', e);
        }
      } else {
        console.log("No such document!");
      }
    }
  }




  function UpdateStudentAssignmentsViewed(){
    if(CurrentStudent !== ''){
      function FindMatchingUid(){
        for(var i = 0; i< NameId.length; i++){
        
          if(CurrentStudent.value == NameId[i][0]){
            return(NameId[i][1])
          }
        }
      }
      const studentDef = doc(db, "users", FindMatchingUid());
      
      const dataToUpdate = { 'StudentAssignmentViewed': true };
      if(true){
          
          updateOrCreateDoc(db, `users/${FindMatchingUid()}`, dataToUpdate)
            .then(() => {
              console.log('Data set successfully!');
            })
            .catch((error) => {
              console.error('Error setting data: ', error);
            });
              }
    }   
  }

  function UpdateLatestPopupViewed(){
    if(CurrentStudent !== ''){
      function FindMatchingUid(){
        for(var i = 0; i< NameId.length; i++){

          if(CurrentStudent.value == NameId[i][0]){
            return(NameId[i][1])
          }
        }
      }
      const studentDef = doc(db, "users", FindMatchingUid());

      const dataToUpdate = { 'LatestPopupViewed': true };
      if(true){
        updateOrCreateDoc(db, `users/${FindMatchingUid()}`, dataToUpdate)
            .then(() => {
              console.log('Data set successfully!');
            })
            .catch((error) => {
              console.error('Error setting data: ', error);
            });
              }
    }   
  }

  function UpdateBluebookScore(BluebookScore){
    if(CurrentStudent !== ''){
   
      function FindMatchingUid(){
        for(var i = 0; i< NameId.length; i++){

          if(CurrentStudent.value == NameId[i][0]){
            return(NameId[i][1])
          }
        }
      }
      const studentDef = doc(db, "users", FindMatchingUid());
      const BluebookScoreStr = BluebookScore.join('%')
      const dataToUpdate = { 'BluebookGrade': BluebookScoreStr };
      if(true){
        updateOrCreateDoc(db, `users/${FindMatchingUid()}`, dataToUpdate)
            .then(() => {
              console.log('Data set successfully!');
            })
            .catch((error) => {
              console.error('Error setting data: ', error);
            });

          }
        }
      }
  
  useEffect(()=>{
   
    if(CurrentStudent !== ''){
      UpdateBluebookScore(BluebookScore)
    }
  },[BluebookScore])
  
  const [LatestPopup, setLatestPopup] = useState(false)
  async function PullLatestestPopupViewed(){
    if(CurrentStudent !== ''){
      function FindMatchingUid(){
        for(var i = 0; i< NameId.length; i++){
          if(CurrentStudent.value == NameId[i][0]){
            return(NameId[i][1])
          }
        }
      }
      const studentDef = doc(db, "users", FindMatchingUid());
      const docSnap = await getDoc(studentDef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setLatestPopup(data.LatestPopup);
      } else {
        console.log("No such document!");
      }
    }
  }


  useEffect(()=>{

    if(CanReleaseNewAssignments == true){
      if(Type=='Student' || Type == 'Parent'){

      }
      else if(NewAssignmentsViewed == false){
       
        setModalAIIsOpen(true)
      }
      else if(LatestPopupViewed == false && false){
        console.log('Last Popup')
        PullLatestestPopupViewed()
        setModalType('AI')
        setModalAIIsOpen(true)
      }
    }

  },[LatestPopupViewed, NewAssignmentsViewed, CanReleaseNewAssignments])

  useEffect(()=>{
    if(CurrentStudent !== ''){
      function FindMatchingUid(){
        for(var i = 0; i< NameId.length; i++){
        
          if(CurrentStudent.value == NameId[i][0]){
            return(NameId[i][1])
          }
        }
      }
      const studentDef = doc(db, "users", FindMatchingUid());
      
      const dataToUpdate = { 'Intensity': IntensityOfStudying };
      if(true){
       
          
         
          
          updateOrCreateDoc(db, `users/${FindMatchingUid()}`, dataToUpdate)
            .then(() => {
              console.log('Data set successfully!');
            })
            .catch((error) => {
              console.error('Error setting data: ', error);
            });
              }
    
    }
      
  },[IntensityOfStudying])

  useEffect(()=>{
    if(CurrentStudent !== ''){
      function FindMatchingUid(){
        for(var i = 0; i< NameId.length; i++){
        
          if(CurrentStudent.value == NameId[i][0]){
            return(NameId[i][1])
          }
        }
      }
      const studentDef = doc(db, "users", FindMatchingUid());
      
      const dataToUpdate = { 'WeeklySchedule': WeeklySchedule };
      if(true){
       
          
         
          
          updateOrCreateDoc(db, `users/${FindMatchingUid()}`, dataToUpdate)
            .then(() => {
              console.log('Data set successfully!');
            })
            .catch((error) => {
              console.error('Error setting data: ', error);
            });
              }
    
    }
  },[WeeklySchedule])

  function UpdateStudentProgress(Progress){
    if(CurrentStudent !== ''){
      function FindMatchingUid(){
        for(var i = 0; i< NameId.length; i++){
        
          if(CurrentStudent.value == NameId[i][0]){
            return(NameId[i][1])
          }
        }
      }
      const studentDef = doc(db, "users", FindMatchingUid());
      
      const dataToUpdate = { 'StudentProgress': Progress };
      if(true){
       
          
         
          
          updateOrCreateDoc(db, `users/${FindMatchingUid()}`, dataToUpdate)
            .then(() => {
              console.log('Data set successfully!');
            })
            .catch((error) => {
              console.error('Error setting data: ', error);
            });
              }
    
    }

  }

  

  function UpdateStudentTestDate(TestDate){
    if(CurrentStudent !== ''){
      function FindMatchingUid(){
        for(var i = 0; i< NameId.length; i++){
        
          if(CurrentStudent.value == NameId[i][0]){
            return(NameId[i][1])
          }
        }
      }
      const studentDef = doc(db, "users", FindMatchingUid());
      
      const dataToUpdate = { 'TestDate': TestDate };
      if(true){

          updateOrCreateDoc(db, `users/${FindMatchingUid()}`, dataToUpdate)
            .then(() => {
              console.log('Data set successfully!');
            })
            .catch((error) => {
              console.error('Error setting data: ', error);
            });
              }
    
    }
  }

  function UpdateStudentNeedsImprovement(NeedsImprovement){
    if(CurrentStudent !== ''){
      function FindMatchingUid(){
        for(var i = 0; i< NameId.length; i++){
        
          if(CurrentStudent.value == NameId[i][0]){
            return(NameId[i][1])
          }
        }
      }
      const studentDef = doc(db, "users", FindMatchingUid());
      var NeedsImprovementStr = ''
      for(var i = 0; i < NeedsImprovement.length; i++){
        NeedsImprovementStr = NeedsImprovementStr + NeedsImprovement[i].toString() + '+'
      }


      const dataToUpdate = { 'NeedsImprovement': NeedsImprovementStr };

      if(true){

          updateOrCreateDoc(db, `users/${FindMatchingUid()}`, dataToUpdate)
            .then(() => {
              console.log('Data set successfully!');
            })
            .catch((error) => {
              console.error('Error setting data: ', error);
            });
              }
    
    }
  }

  function UpdateStudentTestsDone(TestsDone){
    if(CurrentStudent !== ''){
      function FindMatchingUid(){
        for(var i = 0; i< NameId.length; i++){
        
          if(CurrentStudent.value == NameId[i][0]){
            return(NameId[i][1])
          }
        }
      }
      const studentDef = doc(db, "users", FindMatchingUid());
      


      const dataToUpdate = { 'TestsDone': parseInt(TestsDone) };

      if(true){

          updateOrCreateDoc(db, `users/${FindMatchingUid()}`, dataToUpdate)
            .then(() => {
              console.log('Data set successfully!');
            })
            .catch((error) => {
              console.error('Error setting data: ', error);
            });
              }
    
    }
  }
  /*
  Check if a student has completed a test



  */
  useEffect(()=>{
    //AssignmentsDoneGlobal
  
    var Full_Test_Names = ["Reading","Writing","Math (No Calculator)","Math (Calculator)"]
    var Full_Test_ACT_Names = ["English","Math","Reading","Science"]
    var Find_Last_Test = []
    if(CurrentTest == 'SAT'){
      for (var i = 0; i < 10; i++) {
        for (var j = 0; j < Full_Test_Names.length; j++) {
          Find_Last_Test.push(Full_Test_Names[j] + ' '+ CurrentTest+ ' ' + (i + 1).toString());

        }
      }
    }
    else if(CurrentTest == 'ACT'){
      for (var i = 0; i < 10; i++) {
        for (var j = 0; j < Full_Test_ACT_Names.length; j++) {
          Find_Last_Test.push(Full_Test_ACT_Names[j] + ' '+ CurrentTest+ ' ' + (i + 1).toString());

        }
      }
    }
  
    var TestsDone = 0
    for(var i = 0; i < Find_Last_Test.length; i++){
      if(AssignmentsDoneGlobal.includes(Find_Last_Test[i])){
        TestsDone = TestsDone + 1
      }
    }


    var TestDone = Math.floor(TestsDone / 4)
   
    var ToUpdateStudentTestsDone = 0
    if(TestDone > StandardizedTestDoneConst.length){
      ToUpdateStudentTestsDone = TestDone
    }
    else{
      ToUpdateStudentTestsDone = StandardizedTestDoneConst.length
    }
    
    UpdateStudentTestsDone(ToUpdateStudentTestsDone)
   
  },[StandardizedTestDoneConst])

  async function PullStudentTestDate(s){
        
        function FindMatchingUid(){
          //NameId
          //CurrentStudent
          
            for(var i = 0; i< NameId.length; i++){
            
              if(s.value == NameId[i][0]){
                return(NameId[i][1])
              }
            }
          }



        try{
        const x = doc(db, "users", FindMatchingUid());//query(usersRef, where("uid", "==", FindMatchingUid())) //query(usersRef, where("id", "==", FindMatchingUid()));
        var NewArr = []
        //const docRef = doc(db, "users", "SF");
    
        const docSnapshot =  await getDoc(x);
          if (docSnapshot.exists()) {
            
            // Assuming assignments is a string with a specific format to split and manipulate.
            var TestDate = docSnapshot.get('TestDate');
            TestDate = new Date(TestDate.seconds * 1000);
      
            setCurrentStudentTestDate(TestDate)
          } else {
            console.log('No document found!');
          }
        
      

        if(Type == 'Student' || Type == 'Parent'){

       
        
        }else if(Type == 'Tutor'){

        }
        }catch(e){
          console.log('Super error', e)
        }
      }



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
      if(false){

      }else if(true){
        if (index >= 1 && index <= 10) {
          const testName = CurrentTest === 'SAT' ? `Test${index}` : `Test${index}ACT`;
          const dataToUpdate = { [testName]: ArrString.slice(0, -1) };
         
          
          updateOrCreateDoc(db, `users/${FindMatchingUid()}`, dataToUpdate)
            .then(() => {
              console.log('Data set successfully!');
            })
            .catch((error) => {
              console.error('Error setting data: ', error);
            });
              }
    }
    }
  }
  const [SuggestedAssignments, setSuggestedAssignments] = useState([])
 

  async function PullSuggestedAssignments(s){
   
    function FindMatchingUid(){
      //NameId
      //CurrentStudent
      
        for(var i = 0; i< NameId.length; i++){
        
          if(s.value == NameId[i][0]){
            return(NameId[i][1])
          }
        }
      }
 


    try{
    const x = doc(db, "users", FindMatchingUid());//query(usersRef, where("uid", "==", FindMatchingUid())) //query(usersRef, where("id", "==", FindMatchingUid()));
    var NewArr = []
    //const docRef = doc(db, "users", "SF");

    const docSnapshot =  await getDoc(x);
      if (docSnapshot.exists()) {
        
        // Assuming assignments is a string with a specific format to split and manipulate.
        var SuggestedAssignments = docSnapshot.get('SuggestedAssignments');
        setSuggestedAssignments(SuggestedAssignments)
  
        
      } else {
        console.log('No document found!');
      }
    
  

    if(Type == 'Student' || Type == 'Parent'){

   
    
    }else if(Type == 'Tutor'){

    }
    }catch(e){
      console.log('No Suggested Assignements Yet', e)
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
   
      var SATDetailsTotal = "The Big Picture#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Literal Comprehension#The Big Picture#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Reading For Function#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Reading For Function#Graphs And Charts#Graphs And Charts#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Reading For Function#Literal Comprehension#Reading For Function#Graphs And Charts#Graphs And Charts#Graphs And Charts#Graphs And Charts#The Big Picture#The Big Picture#Reading For Function#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Reading For Function#Reading For Function#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Reading For Function#The Big Picture#Literal Comprehension#Paired Passages#Paired Passages#Supporting And Undermining#Paired Passages#Paired Passages#Diction, idioms, and register (5)#Add, revise, or delete (1)#Apostrophes (13)#Punctuation (10,11,12)#Sentence and paragraph order (2)#Add, revise, or delete (1)#Diction, idioms, and register (5)#Verb agreement and tense (15)#Transitions (8)#Diction, idioms, and register (5)#Transitions (8)#Infographics (3)#Combining and separating sentences (7)#Transitions (8)#Non-essential and essential clauses (9)#Punctuation (10,11,12)#Sentences and fragments (6)#Verb agreement and tense (15)#Pronoun and noun agreement (14)#Add, revise, or delete (1)#Shorter is better (4)#Sentence and paragraph order (2)#Shorter is better (4)#Modification (18)#Diction, idioms, and register (5)#Punctuation (10,11,12)#Transitions (8)#Add, revise, or delete (1)#Infographics (3)#Pronoun and noun agreement (14)#Sentence and paragraph order (2)#Punctuation (10,11,12)#Diction, idioms, and register (5)#Transitions (8)#Shorter is better (4)#Verb agreement and tense (15)#Add, revise, or delete (1)#Transitions (8)#Shorter is better (4)#Verb agreement and tense (15)#Apostrophes (13)#Add, revise, or delete (1)#Pronoun and noun agreement (14)#Pronoun and noun agreement (14)#Solving algebraic equations (8)#Complex numbers (19)#Constructing models (7)#Lines (14)#Expressions (6)#Lines (14)#Expressions (6)#Expressions (6)#Systems of equations (10)#Quadratics (17)#Systems of equations (10)#Lines (14)#Expressions (6)#Exponents and radicals (1)#Matching coefficients (9)#Quadratics (17)#Triangles (22)#Systems of equations (10)#Trigonometry (24)#Systems of equations (10)#Reading data (25)#Ratio and proportion (5)#Angles (21)#Word problems (12)#Exponential and linear growth (3)#Ratio and proportion (5)#Reading data (25)#Absolute value (20)#Solving algebraic equations (8)#Solving algebraic equations (8)#Inequalities (11)#Mean, median, and mode (27)#Percents (2)#Mean, median, and mode (27)#Lines (14)#Lines (14)#Functions (16)#Inequalities (11)#Systems of equations (10)#Percents (2)#Probability (26)#Mean, median, and mode (27)#Ratio and proportion (5)#Circles (23)#Quadratics (17)#Percents (2)#Reading data (25)#Inequalities (11)#Synthetic division (18)#Quadratics (17)#Inequalities (11)#Inequalities (11)#Reading data (25)#Word problems (12)#Volume (29)#Functions (16)#Exponential and linear growth (3)#The Big Picture#Reading For Function#The Big Picture#Reading For Function#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Literal Comprehension#Supporting And Undermining#The Big Picture#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Reading For Function#Literal Comprehension#Supporting And Undermining#The Big Picture#Graphs And Charts#Graphs And Charts#Graphs And Charts#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Literal Comprehension#Reading For Function#Literal Comprehension#Reading For Function#The Big Picture#Paired Passages#Paired Passages#Paired Passages#The Big Picture#Reading For Function#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Reading For Function#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Reading For Function#Reading For Function#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Graphs And Charts#Graphs And Charts#Natural Science#Natural Science#Diction, idioms, and register (5)#Transitions (8)#Verb agreement and tense (15)#Add, revise, or delete (1)#Shorter is better (4)#Parallel structure (17)#Shorter is better (4)#Sentences and fragments (6)#Add, revise, or delete (1)#Diction, idioms, and register (5)#Add, revise, or delete (1)#Transitions (8)#Non-essential and essential clauses (9)#Punctuation (10,11,12)#Add, revise, or delete (1)#Sentences and fragments (6)#Add, revise, or delete (1)#Combining and separating sentences (7)#Parallel structure (17)#Verb agreement and tense (15)#Add, revise, or delete (1)#Sentence and paragraph order (2)#Sentences and fragments (6)#Infographics (3)#Transitions (8)#Add, revise, or delete (1)#Punctuation (10,11,12)#Diction, idioms, and register (5)#Pronoun and noun agreement (14)#Pronoun and noun agreement (14)#Sentence and paragraph order (2)#Diction, idioms, and register (5)#Non-essential and essential clauses (9)#Pronoun and noun agreement (14)#Non-essential and essential clauses (9)#Diction, idioms, and register (5)#Add, revise, or delete (1)#Pronoun and noun agreement (14)#Pronoun and noun agreement (14)#Punctuation (10,11,12)#Modification (18)#Sentence and paragraph order (2)#Add, revise, or delete (1)#Shorter is better (4)#Solving algebraic equations (8)#Systems of equations (10)#Constructing models (7)#Expressions (6)#Solving algebraic equations (8)#Lines (14)#Exponents and radicals (1)#Angles (21)#Lines (14)#Quadratics (17)#Complex numbers (19)#Solving algebraic equations (8)#Quadratics (17)#Exponential and linear growth (3)#Expressions (6)#Systems of equations (10)#Matching coefficients (9)#Triangles (22)#Trigonometry (24)#Systems of equations (10)#Lines (14)#Ratio and proportion (5)#Solving algebraic equations (8)#Ratio and proportion (5)#Percents (2)#Word problems (12)#Quadratics (17)#Word problems (12)#Inequalities (11)#Functions (16)#Word problems (12)#Inequalities (11)#Experiment design (28)#Scatter plots (28)#Mean, median, and mode (27)#Probability (26)#Percents (2)#Mean, median, and mode (27)#Mean, median, and mode (27)#Ratio and proportion (5)#Inequalities (11)#Ratio and proportion (5)#Ratio and proportion (5)#Circles (23)#Lines (14)#Functions (16)#Constructing models (7)#Lines (14)#Quadratics (17)#Triangles (22)#Ratio and proportion (5)#Solving algebraic equations (8)#Quadratics (17)#Word problems (12)#Lines (14)#Circles (23)#Solving algebraic equations (8)#The Big Picture#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Reading For Function#Literal Comprehension#Literal Comprehension#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Reading For Function#Literal Comprehension#Supporting And Undermining#The Big Picture#Supporting And Undermining#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Graphs And Charts#Graphs And Charts#Literal Comprehension#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Reading For Function#Literal Comprehension#Literal Comprehension#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Paired Passages#Paired Passages#The Big Picture#Paired Passages#Reading For Function#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Reading For Function#Literal Comprehension#Graphs And Charts#Graphs And Charts#Natural Science#Natural Science#Parallel structure (17)#Add, revise, or delete (1)#Add, revise, or delete (1)#Apostrophes (13)#Verb agreement and tense (15)#Add, revise, or delete (1)#Shorter is better (4)#Shorter is better (4)#Transitions (8)#Combining and separating sentences (7)#Diction, idioms, and register (5)#Pronoun and noun agreement (14)#Add, revise, or delete (1)#Punctuation (10,11,12)#Verb agreement and tense (15)#Diction, idioms, and register (5)#Add, revise, or delete (1)#Shorter is better (4)#Word pairs and comparisons (16)#Add, revise, or delete (1)#Modification (18)#Add, revise, or delete (1)#Combining and separating sentences (7)#Combining and separating sentences (7)#Diction, idioms, and register (5)#Pronoun and noun agreement (14)#Pronoun and noun agreement (14)#Verb agreement and tense (15)#Punctuation (10,11,12)#Sentence and paragraph order (2)#Infographics (3)#Infographics (3)#Add, revise, or delete (1)#Sentences and fragments (6)#Non-essential and essential clauses (9)#Verb agreement and tense (15)#Add, revise, or delete (1)#Verb agreement and tense (15)#Sentence and paragraph order (2)#Diction, idioms, and register (5)#Non-essential and essential clauses (9)#Add, revise, or delete (1)#Add, revise, or delete (1)#Diction, idioms, and register (5)#Constructing models (7)#Solving algebraic equations (8)#Exponents and radicals (1)#Solving algebraic equations (8)#Solving algebraic equations (8)#Systems of equations (10)#Synthetic division (18)#Lines (14)#Systems of equations (10)#Quadratics (17)#Angles (21)#Quadratics (17)#Matching coefficients (9)#Quadratics (17)#Lines (14)#Solving algebraic equations (8)#Solving algebraic equations (8)#Angles (21)#Systems of equations (10)#Trigonometry (24)#Constructing models (7)#Probability (26)#Constructing models (7)#Functions (16)#Percents (2)#Expressions (6)#Solving algebraic equations (8)#Lines (14)#Ratio and proportion (5)#Solving algebraic equations (8)#Solving algebraic equations (8)#Functions (16)#Solving algebraic equations (8)#Lines (14)#Experiment design (28)#Quadratics (17)#Lines (14)#Lines (14)#Ratio and proportion (5)#Scatter plots (28)#Exponential and linear growth (3)#Percents (2)#Trigonometry (24)#Systems of equations (10)#Volume (29)#Lines (14)#Percents (2)#Exponential and linear growth (3)#Probability (26)#Systems of equations (10)#Systems of equations (10)#Mean, median, and mode (27)#Matching coefficients (9)#Circles (23)#Mean, median, and mode (27)#Inequalities (11)#Word problems (12)#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Reading For Function#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Literal Comprehension#Literal Comprehension#Literal Comprehension#The Big Picture#Literal Comprehension#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Graphs And Charts#Graphs And Charts#Graphs And Charts#Literal Comprehension#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Reading For Function#Literal Comprehension#Literal Comprehension#Literal Comprehension#Literal Comprehension#Literal Comprehension#Paired Passages#Supporting And Undermining#Paired Passages#Supporting And Undermining#Paired Passages#The Big Picture#The Big Picture#The Big Picture#Supporting And Undermining#Reading For Function#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Supporting And Undermining#Graphs And Charts#Graphs And Charts#Graphs And Charts#Natural Science#Natural Science#Sentences and fragments (6)#Transitions (8)#Non-essential and essential clauses (9)#Add, revise, or delete (1)#Diction, idioms, and register (5)#Verb agreement and tense (15)#Pronoun and noun agreement (14)#Shorter is better (4)#Parallel structure (17)#Add, revise, or delete (1)#Add, revise, or delete (1)#Word pairs and comparisons (16)#Pronoun and noun agreement (14)#Shorter is better (4)#Transitions (8)#Diction, idioms, and register (5)#Transitions (8)#Add, revise, or delete (1)#Verb agreement and tense (15)#Add, revise, or delete (1)#Pronoun and noun agreement (14)#Punctuation (10,11,12)#Diction, idioms, and register (5)#Word pairs and comparisons (16)#Add, revise, or delete (1)#Combining and separating sentences (7)#Sentence and paragraph order (2)#Verb agreement and tense (15)#Punctuation (10,11,12)#Diction, idioms, and register (5)#Infographics (3)#Pronoun and noun agreement (14)#Add, revise, or delete (1)#Verb agreement and tense (15)#Non-essential and essential clauses (9)#Combining and separating sentences (7)#Add, revise, or delete (1)#Add, revise, or delete (1)#Transitions (8)#Pronoun and noun agreement (14)#Shorter is better (4)#Diction, idioms, and register (5)#Modification (18)#Sentence and paragraph order (2)#Absolute value (20)#Functions (16)#Systems of equations (10)#Functions (16)#Expressions (6)#Solving algebraic equations (8)#Lines (14)#Lines (14)#Solving algebraic equations (8)#Solving algebraic equations (8)#Systems of equations (10)#Percents (2)#Functions (16)#Complex numbers (19)#Quadratics (17)#Triangles (22)#Trigonometry (24)#Solving algebraic equations (8)#Systems of equations (10)#Lines (14)#Solving algebraic equations (8)#Lines (14)#Circles (23)#Percents (2)#Solving algebraic equations (8)#Word problems (12)#Probability (26)#Lines (14)#Probability (26)#Reading data (25)#Reading data (25)#Functions (16)#Exponential and linear growth (3)#Exponential and linear growth (3)#Exponential and linear growth (3)#Inequalities (11)#Lines (14)#Volume (29)#Inequalities (11)#Exponential and linear growth (3)#Scatter plots (28)#Percents (2)#Mean, median, and mode (27)#Circles (23)#Synthetic division (18)#Inequalities (11)#Scatter plots (28)#Quadratics (17)#Mean, median, and mode (27)#Systems of equations (10)#Word problems (12)#Lines (14)#Ratio and proportion (5)#Ratio and proportion (5)#Ratio and proportion (5)#Circles (23)#Exponential and linear growth (3)#The Big Picture#The Big Picture#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Literal Comprehension#The Big Picture#Supporting And Undermining#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Literal Comprehension#Literal Comprehension#The Big Picture#Literal Comprehension#Supporting And Undermining#Paired Passages#Paired Passages#Paired Passages#Literal Comprehension#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Literal Comprehension#Graphs And Charts#Graphs And Charts#The Big Picture#Literal Comprehension#Supporting And Undermining#Supporting And Undermining#Reading For Function#Literal Comprehension#Literal Comprehension#Graphs And Charts#Graphs And Charts#Graphs And Charts#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Literal Comprehension#The Big Picture#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Social Science#Social Science#Add, revise, or delete (1)#Diction, idioms, and register (5)#Add, revise, or delete (1)#Pronoun and noun agreement (14)#Diction, idioms, and register (5)#Pronoun and noun agreement (14)#Sentence and paragraph order (2)#Transitions (8)#Verb agreement and tense (15)#Combining and separating sentences (7)#Pronoun and noun agreement (14)#Transitions (8)#Combining and separating sentences (7)#Punctuation (10,11,12)#Non-essential and essential clauses (9)#Add, revise, or delete (1)#Punctuation (10,11,12)#Shorter is better (4)#Diction, idioms, and register (5)#Diction, idioms, and register (5)#Verb agreement and tense (15)#Diction, idioms, and register (5)#Pronoun and noun agreement (14)#Combining and separating sentences (7)#Transitions (8)#Verb agreement and tense (15)#Add, revise, or delete (1)#Transitions (8)#Sentences and fragments (6)#Verb agreement and tense (15)#Pronoun and noun agreement (14)#Sentence and paragraph order (2)#Infographics (3)#Sentence and paragraph order (2)#Punctuation (10,11,12)#Diction, idioms, and register (5)#Shorter is better (4)#Add, revise, or delete (1)#Diction, idioms, and register (5)#Diction, idioms, and register (5)#Add, revise, or delete (1)#Punctuation (10,11,12)#Transitions (8)#Modification (18)#Lines (14)#Circles (23)#Quadratics (17)#Functions (16)#Solving algebraic equations (8)#Expressions (6)#Inequalities (11)#Lines (14)#Systems of equations (10)#Expressions (6)#Volume (29)#Exponents and radicals (1)#Lines (14)#Functions (16)#Word problems (12)#Inequalities (11)#Solving algebraic equations (8)#Systems of equations (10)#Matching coefficients (9)#Angles (21)#Reading data (25)#Functions (16)#Ratio and proportion (5)#Solving algebraic equations (8)#Ratio and proportion (5)#Word problems (12)#Lines (14)#Expressions (6)#Ratio and proportion (5)#Solving algebraic equations (8)#Lines (14)#Systems of equations (10)#Inequalities (11)#Probability (26)#Experiment design (28)#Solving algebraic equations (8)#Reading data (25)#Solving algebraic equations (8)#Triangles (22)#Reading data (25)#Expressions (6)#Percents (2)#Lines (14)#Percents (2)#Inequalities (11)#Expressions (6)#Mean, median, and mode (27)#Lines (14)#Circles (23)#Quadratics (17)#Ratio and proportion (5)#Ratio and proportion (5)#Solving algebraic equations (8)#Functions (16)#Word problems (12)#Angles (21)#Reading data (25)#The Big Picture#Literal Comprehension#Reading For Function#Supporting And Undermining#Reading For Function#Reading For Function#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Literal Comprehension#The Big Picture#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Reading For Function#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Graphs And Charts#Graphs And Charts#Graphs And Charts#The Big Picture#Literal Comprehension#Literal Comprehension#Literal Comprehension#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Reading For Function#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Reading For Function#Literal Comprehension#Literal Comprehension#Supporting And Undermining#The Big Picture#Paired Passages#The Big Picture#Literal Comprehension#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Graphs And Charts#Supporting And Undermining#Literal Comprehension#Reading For Function#Graphs And Charts#Natural Science#Natural Science#Combining and separating sentences (7)#Combining and separating sentences (7)#Shorter is better (4)#Punctuation (10,11,12)#Add, revise, or delete (1)#Shorter is better (4)#Verb agreement and tense (15)#Diction, idioms, and register (5)#Transitions (8)#Add, revise, or delete (1)#Add, revise, or delete (1)#Apostrophes (13)#Transitions (8)#Combining and separating sentences (7)#Diction, idioms, and register (5)#Add, revise, or delete (1)#Punctuation (10,11,12)#Add, revise, or delete (1)#Combining and separating sentences (7)#Non-essential and essential clauses (9)#Diction, idioms, and register (5)#Sentence and paragraph order (2)#Add, revise, or delete (1)#Diction, idioms, and register (5)#Diction, idioms, and register (5)#Add, revise, or delete (1)#Pronoun and noun agreement (14)#Punctuation (10,11,12)#Non-essential and essential clauses (9)#Word pairs and comparisons (16)#Transitions (8)#Add, revise, or delete (1)#Word pairs and comparisons (16)#Shorter is better (4)#Diction, idioms, and register (5)#Punctuation (10,11,12)#Add, revise, or delete (1)#Add, revise, or delete (1)#Non-essential and essential clauses (9)#Add, revise, or delete (1)#Verb agreement and tense (15)#Apostrophes (13)#Transitions (8)#Word pairs and comparisons (16)#Lines (14)#Lines (14)#Complex numbers (19)#Matching coefficients (9)#Lines (14)#Expressions (6)#Solving algebraic equations (8)#Functions (16)#Exponents and radicals (1)#Mean, median, and mode (27)#Quadratics (17)#Expressions (6)#Quadratics (17)#Inequalities (11)#Expressions (6)#Exponents and radicals (1)#Solving algebraic equations (8)#Triangles (22)#Word problems (12)#Circles (23)#Expressions (6)#Reading data (25)#Constructing models (7)#Lines (14)#Inequalities (11)#Percents (2)#Experiment design (28)#Probability (26)#Word problems (12)#Systems of equations (10)#Systems of equations (10)#Reading data (25)#Functions (16)#Lines (14)#Functions (16)#Triangles (22)#Lines (14)#Inequalities (11)#Word problems (12)#Quadratics (17)#Experiment design (28)#Mean, median, and mode (27)#Reading data (25)#Percents (2)#Functions (16)#Ratio and proportion (5)#Circles (23)#Absolute value (20)#Solving algebraic equations (8)#Quadratics (17)#Word problems (12)#Solving algebraic equations (8)#Volume (29)#Systems of equations (10)#Lines (14)#Mean, median, and mode (27)#Exponential and linear growth (3)#The Big Picture#Literal Comprehension#Literal Comprehension#Reading For Function#Literal Comprehension#Supporting And Undermining#Reading For Function#Literal Comprehension#Supporting And Undermining#Literal Comprehension#The Big Picture#Literal Comprehension#Supporting And Undermining#Reading For Function#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Graphs And Charts#Graphs And Charts#Supporting And Undermining#The Big Picture#Reading For Function#Literal Comprehension#Supporting And Undermining#Reading For Function#Literal Comprehension#Supporting And Undermining#The Big Picture#Reading For Function#Literal Comprehension#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Paired Passages#Paired Passages#Paired Passages#Paired Passages#The Big Picture#Reading For Function#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Literal Comprehension#Graphs And Charts#Graphs And Charts#Natural Science#Natural Science#Shorter is better (4)#Diction, idioms, and register (5)#Verb agreement and tense (15)#Punctuation (10,11,12)#Add, revise, or delete (1)#Diction, idioms, and register (5)#Verb agreement and tense (15)#Verb agreement and tense (15)#Sentence and paragraph order (2)#Add, revise, or delete (1)#Transitions (8)#Parallel structure (17)#Non-essential and essential clauses (9)#Transitions (8)#Add, revise, or delete (1)#Non-essential and essential clauses (9)#Shorter is better (4)#Diction, idioms, and register (5)#Verb agreement and tense (15)#Transitions (8)#Infographics (3)#Punctuation (10,11,12)#Transitions (8)#Sentences and fragments (6)#Add, revise, or delete (1)#Verb agreement and tense (15)#Punctuation (10,11,12)#Add, revise, or delete (1)#Pronoun and noun agreement (14)#Shorter is better (4)#Diction, idioms, and register (5)#Punctuation (10,11,12)#Transitions (8)#Punctuation (10,11,12)#Add, revise, or delete (1)#Verb agreement and tense (15)#Diction, idioms, and register (5)#Transitions (8)#Shorter is better (4)#Add, revise, or delete (1)#Word pairs and comparisons (16)#Sentence and paragraph order (2)#Non-essential and essential clauses (9)#Add, revise, or delete (1)#Lines (14)#Expressions (6)#Systems of equations (10)#Complex numbers (19)#Functions (16)#Lines (14)#Expressions (6)#Inequalities (11)#Inequalities (11)#Synthetic division (18)#Exponents and radicals (1)#Quadratics (17)#Expressions (6)#Inequalities (11)#Expressions (6)#Solving algebraic equations (8)#Angles (21)#Angles (21)#Lines (14)#Matching coefficients (9)#Probability (26)#Expressions (6)#Word problems (12)#Experiment design (28)#Inequalities (11)#Quadratics (17)#Scatter plots (28)#Scatter plots (28)#Solving algebraic equations (8)#Percents (2)#Systems of equations (10)#Percents (2)#Reading data (25)#Angles (21)#Word problems (12)#Expressions (6)#Lines (14)#Solving algebraic equations (8)#Solving algebraic equations (8)#Solving algebraic equations (8)#Scatter plots (28)#Mean, median, and mode (27)#Volume (29)#Quadratics (17)#Functions (16)#Functions (16)#Exponential and linear growth (3)#Lines (14)#Circles (23)#Percents (2)#Ratio and proportion (5)#Lines (14)#Word problems (12)#Circles (23)#Systems of equations (10)#Triangles (22)#Mean, median, and mode (27)#The Big Picture#Reading For Function#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Literal Comprehension#Reading For Function#Literal Comprehension#The Big Picture#Literal Comprehension#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Supporting And Undermining#The Big Picture#Graphs And Charts#Graphs And Charts#Graphs And Charts#The Big Picture#The Big Picture#Supporting And Undermining#Literal Comprehension#Literal Comprehension#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Graphs And Charts#Graphs And Charts#The Big Picture#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Paired Passages#Paired Passages#Paired Passages#The Big Picture#Literal Comprehension#Supporting And Undermining#Reading For Function#Reading For Function#Literal Comprehension#Literal Comprehension#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Natural Science#Natural Science#Transitions (8)#Diction, idioms, and register (5)#Sentences and fragments (6)#Non-essential and essential clauses (9)#Add, revise, or delete (1)#Add, revise, or delete (1)#Word pairs and comparisons (16)#Verb agreement and tense (15)#Diction, idioms, and register (5)#Add, revise, or delete (1)#Word pairs and comparisons (16)#Shorter is better (4)#Punctuation (10,11,12)#Add, revise, or delete (1)#Add, revise, or delete (1)#Pronoun and noun agreement (14)#Word pairs and comparisons (16)#Add, revise, or delete (1)#Sentence and paragraph order (2)#Pronoun and noun agreement (14)#Modification (18)#Shorter is better (4)#Diction, idioms, and register (5)#Punctuation (10,11,12)#Add, revise, or delete (1)#Diction, idioms, and register (5)#Pronoun and noun agreement (14)#Sentence and paragraph order (2)#Shorter is better (4)#Sentences and fragments (6)#Transitions (8)#Shorter is better (4)#Add, revise, or delete (1)#Transitions (8)#Shorter is better (4)#Add, revise, or delete (1)#Verb agreement and tense (15)#Shorter is better (4)#Add, revise, or delete (1)#Non-essential and essential clauses (9)#Add, revise, or delete (1)#Verb agreement and tense (15)#Add, revise, or delete (1)#Punctuation (10,11,12)#Solving algebraic equations (8)#Lines (14)#Solving algebraic equations (8)#Angles (21)#Word problems (12)#Inequalities (11)#Solving algebraic equations (8)#Functions (16)#Circles (23)#Systems of equations (10)#Synthetic division (18)#Expressions (6)#Lines (14)#Quadratics (17)#Functions (16)#Quadratics (17)#Matching coefficients (9)#Systems of equations (10)#Lines (14)#Circles (23)#Word problems (12)#Reading data (25)#Ratio and proportion (5)#Scatter plots (28)#Angles (21)#Systems of equations (10)#Lines (14)#Solving algebraic equations (8)#Volume (29)#Constructing models (7)#Ratio and proportion (5)#Inequalities (11)#Exponents and radicals (1)#Functions (16)#Volume (29)#Probability (26)#Mean, median, and mode (27)#Scatter plots (28)#Quadratics (17)#Inequalities (11)#Scatter plots (28)#Percents (2)#Exponential and linear growth (3)#Experiment design (28)#Functions (16)#Experiment design (28)#Lines (14)#Mean, median, and mode (27)#Exponential and linear growth (3)#Functions (16)#Ratio and proportion (5)#Solving algebraic equations (8)#Lines (14)#Word problems (12)#Functions (16)#Trigonometry (24)#Reading data (25)#The Big Picture#The Big Picture#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Reading For Function#Supporting And Undermining#Literal Comprehension#Literal Comprehension#The Big Picture#Supporting And Undermining#Reading For Function#Literal Comprehension#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Graphs And Charts#Graphs And Charts#Reading For Function#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Supporting And Undermining#Graphs And Charts#Graphs And Charts#Graphs And Charts#The Big Picture#Literal Comprehension#Literal Comprehension#The Big Picture#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Reading For Function#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Reading For Function#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Literal Comprehension#Reading For Function#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Diction, idioms, and register (5)#Sentence and paragraph order (2)#Transitions (8)#Pronoun and noun agreement (14)#Pronoun and noun agreement (14)#Non-essential and essential clauses (9)#Add, revise, or delete (1)#Shorter is better (4)#Word pairs and comparisons (16)#Apostrophes (13)#Add, revise, or delete (1)#Sentences and fragments (6)#Shorter is better (4)#Punctuation (10,11,12)#Pronoun and noun agreement (14)#Add, revise, or delete (1)#Combining and separating sentences (7)#Diction, idioms, and register (5)#Infographics (3)#Add, revise, or delete (1)#Verb agreement and tense (15)#Add, revise, or delete (1)#Pronoun and noun agreement (14)#Sentence and paragraph order (2)#Add, revise, or delete (1)#Pronoun and noun agreement (14)#Diction, idioms, and register (5)#Add, revise, or delete (1)#Transitions (8)#Punctuation (10,11,12)#Verb agreement and tense (15)#Shorter is better (4)#Add, revise, or delete (1)#Add, revise, or delete (1)#Verb agreement and tense (15)#Shorter is better (4)#Transitions (8)#Punctuation (10,11,12)#Parallel structure (17)#Sentences and fragments (6)#Add, revise, or delete (1)#Add, revise, or delete (1)#Pronoun and noun agreement (14)#Add, revise, or delete (1)#Systems of equations (10)#Expressions (6)#Lines (14)#Lines (14)#Solving algebraic equations (8)#Circles (23)#Solving algebraic equations (8)#Matching coefficients (9)#Systems of equations (10)#Matching coefficients (9)#Quadratics (17)#Expressions (6)#Quadratics (17)#Inequalities (11)#Solving algebraic equations (8)#Volume (29)#Solving algebraic equations (8)#Functions (16)#Triangles (22)#Lines (14)#Solving algebraic equations (8)#Ratio and proportion (5)#Solving algebraic equations (8)#Solving algebraic equations (8)#Reading data (25)#Reading data (25)#Angles (21)#Lines (14)#Probability (26)#Ratio and proportion (5)#Ratio and proportion (5)#Ratio and proportion (5)#Inequalities (11)#Lines (14)#Lines (14)#Matching coefficients (9)#Systems of equations (10)#Exponential and linear growth (3)#Solving algebraic equations (8)#Lines (14)#Functions (16)#Mean, median, and mode (27)#Experiment design (28)#Functions (16)#Trigonometry (24)#Quadratics (17)#Synthetic division (18)#Quadratics (17)#Scatter plots (28)#Scatter plots (28)#Circles (23)#Lines (14)#Probability (26)#Reading data (25)#Percents (2)#Systems of equations (10)#Mean, median, and mode (27)#Literal Comprehension#Literal Comprehension#Literal Comprehension#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Reading For Function#Reading For Function#Reading For Function#Fiction#Fiction#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Paired passages#Paired passages#Paired passages#Paired passages#Paired passages#Paired passages#Paired passages#Paired passages#Paired passages#Paired passages#Paired passages#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Shorter is better (4)#Add, revise, or delete (1)#Non-essential and essential clauses (9)#Add, revise, or delete (1)#Add, revise, or delete (1)#Transitions (8)#Modification (18)#Shorter is better (4)#Parallel structure (17)#Punctuation (10,11,12)#Add, revise, or delete (1)#Parallel structure (17)#Add, revise, or delete (1)#Apostrophes (13)#Shorter is better (4)#Parallel structure (17)#Diction, idioms, and register (5)#Diction, idioms, and register (5)#Combining and separating sentences (7)#Word pairs and comparisons (16)#Add, revise, or delete (1)#Add, revise, or delete (1)#Verb agreement and tense (15)#Shorter is better (4)#Punctuation (10,11,12)#Diction, idioms, and register (5)#Infographics (3)#Parallel structure (17)#Infographics (3)#Add, revise, or delete (1)#Add, revise, or delete (1)#Pronoun and noun agreement (14)#Add, revise, or delete (1)#Add, revise, or delete (1)#Add, revise, or delete (1)#Apostrophes (13)#Verb agreement and tense (15)#Shorter is better (4)#Punctuation (10,11,12)#Non-essential and essential clauses (9)#Diction, idioms, and register (5)#Shorter is better (4)#Diction, idioms, and register (5)#Sentence and paragraph order (2)#Solving algebraic equations (8)#Constructing models (7)#Functions (16)#Reading data (25)#Expressions (6)#Quadratics (17)#Functions (16)#Angles (21)#Lines (14)#Quadratics (17)#Circles (23)#Triangles (22)#Quadratics (17)#Solving algebraic equations (8)#Systems of equations (10)#Solving algebraic equations (8)#Absolute value (20)#Exponential and linear growth (3)#Systems of equations (10)#Systems of equations (10)#Constructing models (7)#Constructing models (7)#Constructing models (7)#Solving algebraic equations (8)#Functions (16)#Expressions (6)#Experiment design (28)#Reading data (25)#Functions (16)#Experiment design (28)#Mean, median, and mode (27)#Percents (2)#Reading data (25)#Reading data (25)#Volume (29)#Exponential and linear growth (3)#Volume (29)#Probability (26)#Quadratics (17)#Mean, median, and mode (27)#Solving algebraic equations (8)#Functions (16)#Functions (16)#Scatter plots (28)#Systems of equations (10)#Exponential and linear growth (3)#Solving algebraic equations (8)#Quadratics (17)#Lines (14)#Angles (21)#Word problems (12)#Triangles (22)#Mean, median, and mode (27)#Lines (14)#Matching coefficients (9)#Quadratics (17)#Ratio and proportion (5)#Literal Comprehension"
      
      var SATDetailsArr = SATDetailsTotal.split('#')
      var SATCorrectAnswerTotal = "B-B-C-A-C-D-D-B-C-B-A-B-D-A-A-C-C-D-A-B-A-B-D-D-C-B-D-C-A-A-D-B-A-C-B-D-C-C-B-C-B-B-A-A-D-C-B-A-D-B-D-A-D-B-A-C-C-D-B-C-A-A-B-B-A-B-C-C-C-A-D-D-B-D-D-D-B-A-B-C-B-D-C-A-A-A-A-B-D-C-A-B-B-C-D-D-D-A-C-B-C-A-B-C-B-A-D-D-B-A-D-2-1600-7-0.8-100-B-C-D-C-D-D-C-D-A-B-A-C-C-C-A-C-B-A-B-D-C-B-B-A-D-B-C-C-D-D-4-107-0.625-96-6-3-1.02-6.11-A-B-C-A-D-B-D-D-B-D-D-D-A-B-C-A-C-C-A-B-C-C-A-B-C-B-D-D-D-B-C-B-B-A-D-B-B-D-C-A-B-D-C-B-D-C-A-B-D-D-D-A-B-B-A-A-D-D-B-D-B-B-C-B-D-C-C-C-B-B-A-D-D-B-A-B-B-A-D-A-C-C-D-B-D-D-A-D-A-B-C-D-D-C-C-D-C-B-A-A-C-D-A-C-B-C-C-B-D-A-D-3-19-12-6-0.25-C-B-A-C-C-B-D-D-A-B-B-D-D-C-A-B-C-C-B-C-D-B-A-A-A-D-D-B-B-A-14-7-11-105-15-32-3284-7500-B-C-A-A-C-A-A-B-B-D-A-C-D-B-B-C-B-B-A-A-D-A-A-B-C-C-B-B-D-D-B-C-C-D-C-A-D-C-A-D-A-C-C-D-D-C-B-B-A-B-D-D-A-B-C-C-A-B-A-D-C-C-B-A-C-D-B-C-C-B-D-C-D-A-A-D-B-A-D-B-B-B-D-B-C-D-B-C-D-C-C-B-D-A-D-D-C-D-D-B-C-C-C-A-A-A-B-A-B-A-D-1-2-105-370-0.6-C-B-C-C-B-A-D-C-B-D-B-D-D-A-A-B-B-B-C-B-C-B-C-D-D-C-C-D-A-A-4-58.6-9-0.625-50-750-7-60-C-D-D-C-A-A-B-D-D-A-C-D-A-B-A-C-C-A-B-A-D-A-C-C-B-C-A-B-B-D-D-D-D-A-D-B-D-D-D-A-B-C-B-A-D-A-D-C-D-C-B-A-B-B-B-A-D-B-D-B-C-A-C-D-B-D-C-C-A-C-A-C-B-D-C-C-B-D-C-A-D-B-C-B-A-C-C-B-D-A-C-B-D-D-A-B-A-A-A-B-C-B-D-A-D-D-C-C-B-A-B-9-0.6-5-0-25-B-C-C-B-B-A-A-D-B-A-A-C-C-D-B-A-D-C-A-C-C-B-B-C-B-C-D-D-B-D-1160-0.5-4.55-150-2.25-29-0.72-134-D-C-C-A-C-A-D-B-B-B-B-A-B-D-C-A-B-B-B-A-D-A-B-A-B-C-D-B-D-B-D-B-C-B-A-B-C-A-B-D-D-C-D-D-C-B-A-C-C-A-A-B-C-D-B-C-A-C-D-D-B-C-C-D-D-A-B-C-C-A-D-D-A-B-B-B-A-B-D-A-C-B-C-D-A-C-B-B-D-C-D-B-D-A-A-C-D-A-B-C-D-A-C-A-A-B-C-D-B-C-D-4-1.2-5.25-2-97-D-C-A-B-C-B-A-C-B-A-A-D-D-A-A-D-D-C-B-D-A-C-D-B-D-B-C-C-B-B-1492-9.66666666666667-7-9-13-80-43-6-C-B-D-A-C-D-B-B-A-D-B-D-C-C-B-A-D-A-A-C-C-B-A-D-C-A-D-A-A-B-B-D-B-A-D-D-A-D-C-C-B-D-C-A-C-D-B-B-D-B-D-B-D-A-D-B-C-B-A-C-D-B-C-D-A-B-C-B-A-C-D-D-A-A-B-A-B-B-C-D-B-C-A-C-D-B-B-D-A-D-D-C-A-D-A-C-B-B-C-A-D-A-C-B-C-D-B-D-A-A-D-1-3.75-30-1.5-0.166666666666667-A-C-A-D-B-C-D-D-B-B-B-D-A-B-D-B-B-C-C-C-D-B-C-D-B-C-A-A-B-D-10-31-97-5-1.25-2.6-30-8-D-A-A-B-D-B-C-B-D-D-D-A-A-D-D-C-D-B-D-C-B-C-A-D-C-A-C-B-C-D-B-D-B-C-B-B-C-A-C-A-A-C-D-D-C-A-C-A-A-B-A-D-D-A-B-A-C-C-B-D-A-D-A-D-C-A-C-D-B-C-B-D-C-C-C-A-C-D-B-D-C-B-C-C-C-A-B-C-D-C-D-B-A-D-C-A-C-C-B-D-A-C-B-C-B-B-D-B-D-A-D-8-30-4-8-6632-B-A-C-D-C-C-A-C-A-D-A-B-B-D-B-D-A-B-A-C-C-B-C-A-B-B-A-C-D-B-195-0.4-30-0.277777777777778-0-6-2.4-0.714285714285714-A-C-C-D-A-D-D-B-C-B-B-D-D-A-D-B-C-B-C-A-C-A-D-A-B-D-B-A-D-C-D-B-C-B-C-B-C-D-C-A-D-A-C-A-C-A-D-B-B-B-C-C-D-B-C-B-D-C-B-C-A-C-A-A-D-C-C-A-D-B-D-B-B-D-A-C-C-A-C-C-B-B-B-D-D-B-D-A-B-D-B-D-A-D-A-C-D-A-A-C-B-B-B-D-A-C-B-D-C-C-D-3-32-1.5-8-144-A-C-A-C-B-D-C-B-D-C-B-C-C-D-D-B-A-C-A-B-D-A-A-D-A-C-B-D-B-B-102-2-30-25.4-2-8-576-0.8-D-B-B-A-C-A-C-C-B-C-D-D-D-B-B-C-A-A-C-D-A-B-D-A-C-B-A-D-D-C-B-D-A-B-B-A-A-C-D-C-A-C-C-D-A-D-C-A-A-B-C-D-B-B-A-C-D-C-D-A-D-C-A-C-B-B-D-A-C-D-C-C-B-D-B-B-B-D-A-D-B-D-A-D-A-A-C-D-B-D-C-C-C-A-D-C-B-A-D-A-C-B-D-C-B-C-B-D-A-B-B-360-2-8-0.75-2.5-B-D-B-A-D-A-C-A-D-D-A-D-C-B-D-B-C-B-B-A-D-B-B-C-C-D-A-C-A-D-6-2-8-9-15-1.5-1.3-3-A-B-D-B-A-A-D-C-C-B-D-A-A-B-C-C-D-C-B-B-D-D-B-A-C-C-B-D-A-D-A-B-C-B-B-D-C-A-A-B-D-A-A-B-D-C-A-B-C-A-C-D-A-D-A-A-D-A-C-D-D-C-C-D-A-D-C-B-B-A-D-B-C-B-C-A-A-B-D-B-C-C-B-B-A-C-D-C-B-C-C-D-A-D-A-D-B-C-B-C-A-A-D-C-C-D-A-B-C-B-A-2200-5-1.21-2500-20-B-A-B-C-C-D-B-C-C-D-A-C-C-A-B-C-D-C-D-C-B-D-A-B-A-D-A-D-D-A-6-146-2500-34-2.5-6.25-293-9"
      var SATCorrectAnswerArr = SATCorrectAnswerTotal.split('-')


      var SATSections = "Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C"
      var SATSectionsArr = Copies(SATSections.split(','))
      var SATSectionNumber = "1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4"
      var SATSectionNumberArr = Copies(SATSectionNumber.split(','))
      var SATQuestion = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38"
      var SATQuestionArr = Copies(SATQuestion.split(','))

      var ACTDetailsTotalPart1 = "Joining and separating sentences (3)# Non-essential and essential clauses (4)# Non-essential and essential clauses (4)# Punctuation (5,6,7)# Add, revise, or delete (18)# Verbs (8)# Non-essential and essential clauses (4)# Sentence and paragraph order (19)# Add, revise, or delete (18)# Verbs (8)# Diction, idioms, and register (16)# Diction, idioms, and register (16)# Modification (12)# Add, revise, or delete (18)# Evaluation of purpose (20)# Sentences and fragments (2)# Non-essential and essential clauses (4)# Sentences and fragments (2)# Shorter is better (15)# Add, revise, or delete (18)# Verbs (8)# Shorter is better (15)# Non-essential and essential clauses (4)# Transitions (17)# Verbs (8)# Add, revise, or delete (18)# Verbs (8)# Add, revise, or delete (18)# Joining and separating sentences (3)# Evaluation of purpose (20)# Modification (12)# Punctuation (5,6,7)# Joining and separating sentences (3)# Diction, idioms, and register (16)# Add, revise, or delete (18)# Verbs (8)# Diction, idioms, and register (16)# Add, revise, or delete (18)# Verbs (8)# Punctuation (5,6,7)# Modification (12)# Sentence and paragraph order (19)# Joining and separating sentences (3)# Add, revise, or delete (18)# Evaluation of purpose (20)# Sentences and fragments (2)# Add, revise, or delete (18)# Punctuation (5,6,7)# Shorter is better (15)# Shorter is better (15)# Diction, idioms, and register (16)# Pronouns (9)# Add, revise, or delete (18)# Joining and separating sentences (3)# Transitions (17)# Shorter is better (15)# Add, revise, or delete (18)# Add, revise, or delete (18)# Add, revise, or delete (18)# Sentence and paragraph order (19)# Non-essential and essential clauses (4)# Verbs (8)# Shorter is better (15)# Non-essential and essential clauses (4)# Add, revise, or delete (18)# Modification (12)# Transitions (17)# Punctuation (5,6,7)# Verbs (8)# Add, revise, or delete (18)# Diction, idioms, and register (16)# Transitions (17)# Transitions (17)# Apostrophes (1)# Joining and separating sentences (3)# Functions (11)# Angles (15)# Expressions (4)# Ratio and proportion (9)# Expressions (4)# Solving equations (3)# Probability (23)# Numbers and Operations (5)# Solving equations (3)# Coordinate geometry (14)# Probability (23)# Inequalities (21)# Expressions (4)# Percents (10)# Properties of numbers (6)# Functions (11)# Coordinate geometry (14)# Quadratics (13)# Data and statistics (24)# Systems of equations (20)# Percents (10)# Area and perimeter (18)# Angles (15)# Trigonometry (22)# Trigonometry (22)# Numbers and Operations (5)# Area and perimeter (18)# Exponents and radicals (2)# Inequalities (21)# Volume (19)# Triangles (16)# Coordinate geometry (14)# Quadratics (13)# Area and perimeter (18)# Data and statistics (24)# Logarithms (25)# Expressions (4)# Numbers and Operations (5)# Properties of numbers (6)# Properties of numbers (6)# Percents (10)# Percents (10)# Matrices (28)# Functions (11)# Numbers and Operations (5)# Expressions (4)# Area and perimeter (18)# Coordinate geometry (14)# Sequences (27)# Probability (23)# Percents (10)# Trigonometry (22)# Ellipses (28)# Trigonometry (22)# Absolute value (1)# Probability (23)# Exponents and radicals (2)# Area and perimeter (18)# Complex numbers (7)# Volume (19)# Reading For Function# Literal Comprehension# Literal Comprehension# Reading For Function# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# The Big Picture# Paired Passages# Literal Comprehension# Paired Passages# Reading For Function# Paired Passages# Literal Comprehension# Paired Passages# Paired Passages# Paired Passages# The Big Picture# The Big Picture# Literal Comprehension# The Big Picture# Pronouns And Compression Nouns# Literal Comprehension# Supporting And Undermining# Reading For Function# Literal Comprehension# Reading For Function# Reading For Function# Literal Comprehension# Literal Comprehension# Literal Comprehension# Graphs And Charts# Literal Comprehension# Reading For Function# Literal Comprehension# Literal Comprehension# Literal Comprehension# Equations# Generic Labels# Outside Knowledge# Generic Labels# Inference Question# Generic Labels# Inference Question# Cannot Be Determined# Inference Question# Inference Question# Inference Question# Cannot Be Determined# Inference Question# Outside Knowledge# Inference Question# Inference Question# Locators# Locators# Trends In Tables And Figures# Inference Question# Inference Question# Cannot Be Determined# Cannot Be Determined# Inference Question# Inference Question# Cannot Be Determined# Data Bridge# Cannot Be Determined# Data Full Sentence# Generic Labels# Data Full Sentence# Locators# Inference Question# Locators# Data Bridge# Outside Knowledge# Cannot Be Determined# Equations# Outside Knowledge# Inverse Trends# Non-essential and essential clauses (4)# Add, revise, or delete (18)# Verbs (8)# Add, revise, or delete (18)# Verbs (8)# Diction, idioms, and register (16)# Shorter is better (15)# Add, revise, or delete (18)# Add, revise, or delete (18)# Diction, idioms, and register (16)# Verbs (8)# Shorter is better (15)# Transitions (17)# Sentence and paragraph order (19)# Evaluation of purpose (20)# Punctuation (5,6,7)# Pronouns (9)# Transitions (17)# Punctuation (5,6,7)# Add, revise, or delete (18)# Modification (12)# Add, revise, or delete (18)# Sentences and fragments (2)# Verbs (8)# Pronouns (9)# Sentences and fragments (2)# Add, revise, or delete (18)# Diction, idioms, and register (16)# Transitions (17)# Shorter is better (15)# Non-essential and essential clauses (4)# Pronouns (9)# Apostrophes (1)# Transitions (17)# Verbs (8)# Sentences and fragments (2)# Shorter is better (15)# Punctuation (5,6,7)# Add, revise, or delete (18)# Sentences and fragments (2)# Pronouns (9)# Verbs (8)# Diction, idioms, and register (16)# Shorter is better (15)# Punctuation (5,6,7)# Verbs (8)# Non-essential and essential clauses (4)# Verbs (8)# Sentences and fragments (2)# Non-essential and essential clauses (4)# Sentence and paragraph order (19)# Transitions (17)# Verbs (8)# Pronouns (9)# Add, revise, or delete (18)# Adjectives and adverbs (10)# Diction, idioms, and register (16)# Apostrophes (1)# Add, revise, or delete (18)# Evaluation of purpose (20)# Sentences and fragments (2)# Non-essential and essential clauses (4)# Non-essential and essential clauses (4)# Add, revise, or delete (18)# Shorter is better (15)# Diction, idioms, and register (16)# Transitions (17)# Modification (12)# Non-essential and essential clauses (4)# Non-essential and essential clauses (4)# Shorter is better (15)# Diction, idioms, and register (16)# Diction, idioms, and register (16)# Add, revise, or delete (18)# Evaluation of purpose (20)# Absolute value (1)# Numbers and Operations (5)# Expressions (4)# Expressions (4)# Percents (10)# Triangles (16)# Triangles (16)# Systems of equations (20)# Triangles (16)# Numbers and Operations (5)# Systems of equations (20)# Functions (11)# Angles (15)# Probability (23)# Area and perimeter (18)# Area and perimeter (18)# Numbers and Operations (5)# Triangles (16)# Coordinate geometry (14)# Systems of equations (20)# Probability (23)# Data and statistics (24)# Quadratics (13)# Functions (11)# Probability (23)# Absolute value (1)# Matrices (28)# Area and perimeter (18)# Trigonometry (22)# Circles (17)# Circles (17)# Circles (17)# Angles (15)# Trigonometry (22)# Solving equations (3)# Exponents and radicals (2)# Properties of numbers (6)# Triangles (16)# Word problems (26)# Systems of equations (20)# Coordinate geometry (14)# Coordinate geometry (14)# Circles (17)# Circles (17)# Systems of equations (20)# Word problems (26)# Functions (11)# Area and perimeter (18)# Area and perimeter (18)# Sequences (27)# Trigonometry (22)# Volume (19)# Word problems (26)# Word problems (26)# Word problems (26)# Word problems (26)# Exponents and radicals (2)# Trigonometry (22)# Coordinate geometry (14)# Functions (11)# Supporting And Undermining# Reading For Function# Literal Comprehension# Reading For Function# Literal Comprehension# Literal Comprehension# Reading For Function# Literal Comprehension# The Big Picture# Literal Comprehension# Literal Comprehension# Literal Comprehension# Reading For Function# Reading For Function# Literal Comprehension# Literal Comprehension# Reading For Function# Graphs And Charts# Literal Comprehension# Literal Comprehension# The Big Picture# Paired Passages# Paired Passages# Literal Comprehension# Literal Comprehension# Paired Passages# Supporting And Undermining# Paired Passages# Paired Passages# Paired Passages# The Big Picture# Reading For Function# Literal Comprehension# Reading For Function# Supporting And Undermining# Graphs And Charts# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# Cannot Be Determined# Locators# Generic Labels# Locators# Cannot Be Determined# Inference Question# Data Bridge# Inference Question# Inference Question# Equations# Inference Question# Inference Question# Cannot Be Determined# Inference Question# Inverse Trends# Inference Question# Inference Question# Cannot Be Determined# Data Bridge# Inference Question# Cannot Be Determined# Cannot Be Determined# Generic Labels# Inference Question# Method Table# Cannot Be Determined# Data Bridge# Inference Question# Inference Question# Inference Question# Inference Question# Outside Knowledge# Inference Question# Inference Question# Method Table# Generic Labels# Cannot Be Determined# Data Bridge# Data Bridge# Outside Knowledge# Shorter is better (15)# Add, revise, or delete (18)# Joining and separating sentences (3)# Add, revise, or delete (18)# Add, revise, or delete (18)# Parallel structure (13)# Pronouns (9)# Punctuation (5,6,7)# Diction, idioms, and register (16)# Verbs (8)# Punctuation (5,6,7)# Shorter is better (15)# Sentence and paragraph order (19)# Evaluation of purpose (20)# Transitions (17)# Punctuation (5,6,7)# Diction, idioms, and register (16)# Sentence and paragraph order (19)# Non-essential and essential clauses (4)# Add, revise, or delete (18)# Modification (12)# Add, revise, or delete (18)# Add, revise, or delete (18)# Add, revise, or delete (18)# Add, revise, or delete (18)# Diction, idioms, and register (16)# Non-essential and essential clauses (4)# Verbs (8)# Add, revise, or delete (18)# Joining and separating sentences (3)# Transitions (17)# Add, revise, or delete (18)# Pronouns (9)# Sentences and fragments (2)# Diction, idioms, and register (16)# Sentences and fragments (2)# Shorter is better (15)# Verbs (8)# Add, revise, or delete (18)# Parallel structure (13)# Punctuation (5,6,7)# Diction, idioms, and register (16)# Non-essential and essential clauses (4)# Add, revise, or delete (18)# Non-essential and essential clauses (4)# Joining and separating sentences (3)# Non-essential and essential clauses (4)# Apostrophes (1)# Joining and separating sentences (3)# Verbs (8)# Joining and separating sentences (3)# Transitions (17)# Punctuation (5,6,7)# Shorter is better (15)# Pronouns (9)# Verbs (8)# Shorter is better (15)# Pronouns (9)# Add, revise, or delete (18)# Diction, idioms, and register (16)# Transitions (17)# Add, revise, or delete (18)# Add, revise, or delete (18)# Diction, idioms, and register (16)# Joining and separating sentences (3)# Verbs (8)# Verbs (8)# Add, revise, or delete (18)# Diction, idioms, and register (16)# Modification (12)# Sentence and paragraph order (19)# Pronouns (9)# Punctuation (5,6,7)# Pronouns (9)# Sentence and paragraph order (19)# Area and perimeter (18)# Probability (23)# Probability (23)# Numbers and Operations (5)# Volume (19)# Triangles (16)# Expressions (4)# Functions (11)# Percents (10)# Absolute value (1)# Numbers and Operations (5)# Numbers and Operations (5)# Triangles (16)# Numbers and Operations (5)# Ratio and proportion (9)# Numbers and Operations (5)# Solving equations (3)# Area and perimeter (18)# Inequalities (21)# Trigonometry (22)# Functions (11)# Systems of equations (20)# Data and statistics (24)# Area and perimeter (18)# Area and perimeter (18)# Probability (23)# Expressions (4)# Triangles (16)# Area and perimeter (18)# Coordinate geometry (14)# Coordinate geometry (14)# Coordinate geometry (14)# Exponents and radicals (2)# Ratio and proportion (9)# Logarithms (25)# Circles (17)# Expressions (4)# Probability (23)# Probability (23)# Probability (23)# Data and statistics (24)# Trigonometry (22)# Volume (19)# Trigonometry (22)# Numbers and Operations (5)# Angles (15)# Properties of numbers (6)# Triangles (16)# Probability (23)# Functions (11)# Probability (23)# Coordinate geometry (14)# Systems of equations (20)# Data and statistics (24)# Word problems (26)# Inequalities (21)# Word problems (26)# Complex numbers (7)# Functions (11)# Matrices (28)# Paired Passages# Pronouns And Compression Nouns# Reading For Function# Literal Comprehension# Paired Passages# Literal Comprehension# Paired Passages# Paired Passages# Paired Passages# Paired Passages# Pronouns And Compression Nouns# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# Reading For Function# Pronouns And Compression Nouns# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# Reading For Function# Reading For Function# Reading For Function# Supporting And Undermining# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# The Big Picture# Reading For Function# Literal Comprehension# Supporting And Undermining# Pronouns And Compression Nouns# Paired Passages# Literal Comprehension# Literal Comprehension# Reading For Function# Literal Comprehension# Inverse Trends# Data Full Sentence# Cannot Be Determined# Cannot Be Determined# Cannot Be Determined# Inference Question# Cannot Be Determined# Cannot Be Determined# Cannot Be Determined# Data Bridge# Cannot Be Determined# Inference Question# Inference Question# Method Table# Data Full Sentence# Locators# Cannot Be Determined# Inference Question# Inference Question# Inference Question# Method Table# Trends In Tables And Figures# Inference Question# Trends In Tables And Figures# Generic Labels# Data Full Sentence# Inference Question# Scatter Plot# Inference Question# Inference Question# Data Full Sentence# Trends In Tables And Figures# Locators# Data Bridge# Locators# Generic Labels# Inference Question# Data Bridge# Inference Question# Data Bridge# Add, revise, or delete (18)# Punctuation (5,6,7)# Apostrophes (1)# Joining and separating sentences (3)# Add, revise, or delete (18)# Pronouns (9)# Shorter is better (15)# Transitions (17)# Diction, idioms, and register (16)# Diction, idioms, and register (16)# Sentences and fragments (2)# Word pairs and comparisons (11)# Add, revise, or delete (18)# Diction, idioms, and register (16)# Add, revise, or delete (18)# Shorter is better (15)# Add, revise, or delete (18)# Verbs (8)# Joining and separating sentences (3)# Shorter is better (15)# Diction, idioms, and register (16)# Joining and separating sentences (3)# Sentence and paragraph order (19)# Add, revise, or delete (18)# Non-essential and essential clauses (4)# Verbs (8)# Pronouns (9)# Verbs (8)# Transitions (17)# Evaluation of purpose (20)# Pronouns (9)# Verbs (8)# Transitions (17)# Non-essential and essential clauses (4)# Shorter is better (15)# Modification (12)# Diction, idioms, and register (16)# Add, revise, or delete (18)# Joining and separating sentences (3)# Transitions (17)# Non-essential and essential clauses (4)# Verbs (8)# Parallel structure (13)# Add, revise, or delete (18)# Sentence and paragraph order (19)# Verbs (8)# Add, revise, or delete (18)# Punctuation (5,6,7)# Shorter is better (15)# Shorter is better (15)# Diction, idioms, and register (16)# Verbs (8)# Verbs (8)# Sentence and paragraph order (19)# Sentences and fragments (2)# Punctuation (5,6,7)# Add, revise, or delete (18)# Non-essential and essential clauses (4)# Sentence and paragraph order (19)# Evaluation of purpose (20)# Parallel structure (13)# Apostrophes (1)# Add, revise, or delete (18)# Sentences and fragments (2)# Modification (12)# Verbs (8)# Add, revise, or delete (18)# Punctuation (5,6,7)# Sentences and fragments (2)# Parallel structure (13)# Pronouns (9)# Add, revise, or delete (18)# Transitions (17)# Add, revise, or delete (18)# Add, revise, or delete (18)# Probability (23)# Probability (23)# Solving equations (3)# Absolute value (1)# Numbers and Operations (5)# Numbers and Operations (5)# Area and perimeter (18)# Area and perimeter (18)# Coordinate geometry (14)# Functions (11)# Inequalities (21)# Coordinate geometry (14)# Systems of equations (20)# Ratio and proportion (9)# Matrices (28)# Trigonometry (22)# Ratio and proportion (9)# Functions (11)# Angles (15)# Expressions (4)# Numbers and Operations (5)# Data and statistics (24)# Area and perimeter (18)# Area and perimeter (18)# Data and statistics (24)# Area and perimeter (18)# Area and perimeter (18)# Numbers and Operations (5)# Ratio and proportion (9)# Trigonometry (22)# Functions (11)# Triangles (16)# Coordinate geometry (14)# Numbers and Operations (5)# Angles (15)# Area and perimeter (18)# Solving equations (3)# Area and perimeter (18)# Data and statistics (24)# Word problems (26)# Expressions (4)# Probability (23)# Expressions (4)# Probability (23)# Trigonometry (22)# Logarithms (25)# Numbers and Operations (5)# Inequalities (21)# Trigonometry (22)# Data and statistics (24)# Angles (15)# Sequences (27)# Expressions (4)# Probability (23)# Expressions (4)# Data and statistics (24)# Area and perimeter (18)# Circles (17)# Percents (10)# Functions (11)# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# Reading For Function# Literal Comprehension# Literal Comprehension# Literal Comprehension# Graphs And Charts# Literal Comprehension# Reading For Function# Literal Comprehension# Literal Comprehension# Literal Comprehension# Pronouns And Compression Nouns# Reading For Function# Supporting And Undermining# Supporting And Undermining# Supporting And Undermining# Paired Passages# Reading For Function# Literal Comprehension# Pronouns And Compression Nouns# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# Pronouns And Compression Nouns# Pronouns And Compression Nouns# The Big Picture# Reading For Function# Literal Comprehension# The Big Picture# Literal Comprehension# Graphs And Charts# Graphs And Charts# Literal Comprehension# Literal Comprehension# Reading For Function# Locators# Locators# Scatter Plot# Data Bridge# Locators# Data Bridge# Extrapolation And Estimation# Trends In Tables And Figures# Locators# Equations# Generic Labels# Generic Labels# Data Bridge# Generic Labels# Generic Labels# Outside Knowledge# Extrapolation And Estimation# Inference Question# Generic Labels# Cannot Be Determined# Data Full Sentence# Outside Knowledge# Inference Question# Cannot Be Determined# Inference Question# Inference Question# Data Bridge# Data Bridge# Cannot Be Determined# Method Table# Cannot Be Determined# Cannot Be Determined# Data Full Sentence# Cannot Be Determined# Generic Labels# Inference Question# Inference Question# Cannot Be Determined# Cannot Be Determined# Method Table# Verbs (8)# Add, revise, or delete (18)# Punctuation (5,6,7)# Verbs (8)# Shorter is better (15)# Verbs (8)# Transitions (17)# Non-essential and essential clauses (4)# Diction, idioms, and register (16)# Verbs (8)# Non-essential and essential clauses (4)# Sentence and paragraph order (19)# Sentences and fragments (2)# Add, revise, or delete (18)# Sentence and paragraph order (19)# Sentences and fragments (2)# Shorter is better (15)# Punctuation (5,6,7)# Diction, idioms, and register (16)# Parallel structure (13)# Joining and separating sentences (3)# Verbs (8)# Diction, idioms, and register (16)# Shorter is better (15)# Add, revise, or delete (18)# Modification (12)# Diction, idioms, and register (16)# Non-essential and essential clauses (4)# Sentence and paragraph order (19)# Evaluation of purpose (20)# Verbs (8)# Diction, idioms, and register (16)# Punctuation (5,6,7)# Add, revise, or delete (18)# Punctuation (5,6,7)# Add, revise, or delete (18)# Sentences and fragments (2)# Shorter is better (15)# Modification (12)# Add, revise, or delete (18)# Modification (12)# Add, revise, or delete (18)# Transitions (17)# Diction, idioms, and register (16)# Add, revise, or delete (18)# Add, revise, or delete (18)# Add, revise, or delete (18)# Punctuation (5,6,7)# Verbs (8)# Pronouns (9)# Pronouns (9)# Add, revise, or delete (18)# Joining and separating sentences (3)# Verbs (8)# Punctuation (5,6,7)# Add, revise, or delete (18)# Add, revise, or delete (18)# Shorter is better (15)# Sentence and paragraph order (19)# Evaluation of purpose (20)# Punctuation (5,6,7)# Shorter is better (15)# Pronouns (9)# Add, revise, or delete (18)# Add, revise, or delete (18)# Add, revise, or delete (18)# Joining and separating sentences (3)# Diction, idioms, and register (16)# Parallel structure (13)# Diction, idioms, and register (16)# Sentences and fragments (2)# Pronouns (9)# Shorter is better (15)# Add, revise, or delete (18)# Evaluation of purpose (20)# Numbers and Operations (5)# Coordinate geometry (14)# Numbers and Operations (5)# Word problems (26)# Matrices (28)# Functions (11)# Data and statistics (24)# Triangles (16)# Ratio and proportion (9)# Numbers and Operations (5)# Coordinate geometry (14)# Angles (15)# Quadratics (13)# Volume (19)# Numbers and Operations (5)# Properties of numbers (6)# Coordinate geometry (14)# Probability (23)# Ratio and proportion (9)# Systems of equations (20)# Area and perimeter (18)# Probability (23)# Percents (10)# Coordinate geometry (14)# Area and perimeter (18)# Area and perimeter (18)# Numbers and Operations (5)# Numbers and Operations (5)# Coordinate geometry (14)# Numbers and Operations (5)# Numbers and Operations (5)# Numbers and Operations (5)# Coordinate geometry (14)# Data and statistics (24)# Expressions (4)# Functions (11)# Properties of numbers (6)# Numbers and Operations (5)# Properties of numbers (6)# Trigonometry (22)# Vectors (28)# Expressions (4)# Functions (11)# Circles (17)# Data and statistics (24)# Trigonometry (22)# Circles (17)# Absolute value (1)# Inequalities (21)# Ratio and proportion (9)# Ellipses (28)# Data and statistics (24)# Properties of numbers (6)# Numbers and Operations (5)# Ratio and proportion (9)# Exponents and radicals (2)# Percents (10)# Probability (23)# Trigonometry (22)# Area and perimeter (18)# The Big Picture# Literal Comprehension# Pronouns And Compression Nouns# Literal Comprehension# Literal Comprehension# Literal Comprehension# Reading For Function# Literal Comprehension# Reading For Function# Literal Comprehension# Literal Comprehension# Paired Passages# Paired Passages# Paired Passages# Reading For Function# Literal Comprehension# Paired Passages# Paired Passages# Paired Passages# Paired Passages# Reading For Function# Reading For Function# Reading For Function# Reading For Function# Pronouns And Compression Nouns# Pronouns And Compression Nouns# Reading For Function# Literal Comprehension# Reading For Function# Reading For Function# The Big Picture# Paired Passages# Supporting And Undermining# Literal Comprehension# Literal Comprehension# Reading For Function# Supporting And Undermining# Supporting And Undermining# Supporting And Undermining# Reading For Function# Data Full Sentence# Generic Labels# Generic Labels# Extrapolation And Estimation# Data Bridge# Outside Knowledge# Trends In Tables And Figures# Inference Question# Generic Labels# Trends In Tables And Figures# Locators# Generic Labels# Locators# Data Bridge# Locators# Data Bridge# Locators# Generic Labels# Equations# Cannot Be Determined# Generic Labels# Cannot Be Determined# Cannot Be Determined# Inference Question# Inverse Trends# Locators# Generic Labels# Cannot Be Determined# Outside Knowledge# Inference Question# Cannot Be Determined# Cannot Be Determined# Inference Question# Locators# Locators# Generic Labels# Locators# Inference Question# Inference Question# Inference Question# Diction, idioms, and register (16)# Verbs (8)# Diction, idioms, and register (16)# Non-essential and essential clauses (4)# Adjectives and adverbs (10)# Add, revise, or delete (18)# Transitions (17)# Pronouns (9)# Add, revise, or delete (18)# Sentences and fragments (2)# Pronouns (9)# Pronouns (9)# Diction, idioms, and register (16)# Verbs (8)# Add, revise, or delete (18)# Punctuation (5,6,7)# Parallel structure (13)# Add, revise, or delete (18)# Add, revise, or delete (18)# Add, revise, or delete (18)# Adjectives and adverbs (10)# Modification (12)# Diction, idioms, and register (16)# Verbs (8)# Transitions (17)# Pronouns (9)# Diction, idioms, and register (16)# Joining and separating sentences (3)# Shorter is better (15)# Evaluation of purpose (20)# Shorter is better (15)# Non-essential and essential clauses (4)# Non-essential and essential clauses (4)# Add, revise, or delete (18)# Transitions (17)# Transitions (17)# Add, revise, or delete (18)# Punctuation (5,6,7)# Pronouns (9)# Verbs (8)# Add, revise, or delete (18)# Non-essential and essential clauses (4)# Diction, idioms, and register (16)# Add, revise, or delete (18)# Evaluation of purpose (20)# Pronouns (9)# Shorter is better (15)# Add, revise, or delete (18)# Punctuation (5,6,7)# Joining and separating sentences (3)# Shorter is better (15)# Non-essential and essential clauses (4)# Verbs (8)# Add, revise, or delete (18)# Modification (12)# Add, revise, or delete (18)# Add, revise, or delete (18)# Joining and separating sentences (3)# Punctuation (5,6,7)# Sentence and paragraph order (19)# Word pairs and comparisons (11)# Joining and separating sentences (3)# Transitions (17)# Non-essential and essential clauses (4)# Pronouns (9)# Transitions (17)# Add, revise, or delete (18)# Shorter is better (15)# Modification (12)# Shorter is better (15)# Punctuation (5,6,7)# Sentences and fragments (2)# Joining and separating sentences (3)# Diction, idioms, and register (16)# Add, revise, or delete (18)# Angles (15)# Data and statistics (24)# Properties of numbers (6)# Solving equations (3)# Probability (23)# Ratio and proportion (9)# Word problems (26)# Word problems (26)# Quadratics (13)# Area and perimeter (18)# Numbers and Operations (5)# Numbers and Operations (5)# Triangles (16)# Functions (11)# Area and perimeter (18)# Numbers and Operations (5)# Word problems (26)# Functions (11)# Data and statistics (24)# Numbers and Operations (5)# Coordinate geometry (14)# Functions (11)# Triangles (16)# Coordinate geometry (14)# Area and perimeter (18)# Word problems (26)# Ratio and proportion (9)# Word problems (26)# Area and perimeter (18)# Matrices (28)# Numbers and Operations (5)# Probability (23)# Trigonometry (22)# Expressions (4)# Angles (15)# Solving equations (3)# Coordinate geometry (14)# Triangles (16)# Quadratics (13)# Circles (17)# Exponents and radicals (2)# Logarithms (25)# Coordinate geometry (14)# Word problems (26)# Quadratics (13)# Expressions (4)# Ratio and proportion (9)# Inequalities (21)# Ratio and proportion (9)# Volume (19)# Trigonometry (22)# Data and statistics (24)# Exponents and radicals (2)# Probability (23)# Word problems (26)# Probability (23)# Probability (23)# Properties of numbers (6)# Quadratics (13)# Trigonometry (22)# Literal Comprehension# Literal Comprehension# Literal Comprehension# Paired Passages# Literal Comprehension# Literal Comprehension# Reading For Function# Paired Passages# Paired Passages# Paired Passages# Literal Comprehension# Literal Comprehension# Pronouns And Compression Nouns# Literal Comprehension# Literal Comprehension# Literal Comprehension# Supporting And Undermining# Graphs And Charts# Literal Comprehension# Literal Comprehension# Reading For Function# Paired Passages# Reading For Function# Literal Comprehension# Supporting And Undermining# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# Reading For Function# The Big Picture# Reading For Function# Supporting And Undermining# Literal Comprehension# Reading For Function# Literal Comprehension# The Big Picture# The Big Picture# Literal Comprehension# Literal Comprehension# Cannot Be Determined# Trends In Tables And Figures# Inference Question# Inference Question# Inference Question# Data Full Sentence# Data Full Sentence# Cannot Be Determined# Locators# Cannot Be Determined# Cannot Be Determined# Data Bridge# Method Table# Trends In Tables And Figures# Method Table# Method Table# Cannot Be Determined# Extrapolation And Estimation# Extrapolation And Estimation# Generic Labels# Mixing# Locators# Data Full Sentence# Data Bridge# Mixing# Generic Labels# Inference Question# Extrapolation And Estimation# Extrapolation And Estimation# Extrapolation And Estimation# Extrapolation And Estimation# Inference Question# Data Bridge# Inference Question# Generic Labels# Inference Question# Locators# Inference Question# Inference Question# Inference Question# Add, revise, or delete (18)# Verbs (8)# Transitions (17)# Pronouns (9)# Joining and separating sentences (3)# Shorter is better (15)# Adjectives and adverbs (10)# Transitions (17)# Sentence and paragraph order (19)# Punctuation (5,6,7)# Add, revise, or delete (18)# Non-essential and essential clauses (4)# Verbs (8)# Add, revise, or delete (18)# Non-essential and essential clauses (4)# Verbs (8)# Diction, idioms, and register (16)# Add, revise, or delete (18)# Add, revise, or delete (18)# Verbs (8)# Diction, idioms, and register (16)# Modification (12)# Shorter is better (15)# Joining and separating sentences (3)# Pronouns (9)# Diction, idioms, and register (16)# Verbs (8)# Add, revise, or delete (18)# Evaluation of purpose (20)# Shorter is better (15)# Joining and separating sentences (3)# Add, revise, or delete (18)# Punctuation (5,6,7)# Add, revise, or delete (18)# Diction, idioms, and register (16)# Diction, idioms, and register (16)# Joining and separating sentences (3)# Add, revise, or delete (18)# Non-essential and essential clauses (4)# Modification (12)# Pronouns (9)# Diction, idioms, and register (16)# Diction, idioms, and register (16)# Evaluation of purpose (20)# Diction, idioms, and register (16)# Sentence and paragraph order (19)# Non-essential and essential clauses (4)# Verbs (8)# Transitions (17)# Add, revise, or delete (18)# Modification (12)# Punctuation (5,6,7)# Joining and separating sentences (3)# Non-essential and essential clauses (4)# Shorter is better (15)# Diction, idioms, and register (16)# Diction, idioms, and register (16)# Transitions (17)# Punctuation (5,6,7)# Verbs (8)# Apostrophes (1)# Modification (12)# Non-essential and essential clauses (4)# Sentence and paragraph order (19)# Modification (12)# Add, revise, or delete (18)# Diction, idioms, and register (16)# Word pairs and comparisons (11)# Punctuation (5,6,7)# Diction, idioms, and register (16)# Add, revise, or delete (18)# Transitions (17)# Punctuation (5,6,7)# Evaluation of purpose (20)# Evaluation of purpose (20)# Percents (10)# Expressions (4)# Angles (15)# Solving equations (3)# Triangles (16)# Probability (23)# Word problems (26)# Probability (23)# Numbers and Operations (5)# Area and perimeter (18)# Solving equations (3)# Systems of equations (20)# Expressions (4)# Expressions (4)# Solving equations (3)# Data and statistics (24)# Probability (23)# Coordinate geometry (14)# Coordinate geometry (14)# Coordinate geometry (14)# Probability (23)# Data and statistics (24)# Functions (11)# Volume (19)# Functions (11)"
      var ACTDetailsTotalPart2 = "Trigonometry (22)# Solving equations (3)# Expressions (4)# Circles (17)# Area and perimeter (18)# Coordinate geometry (14)# Trigonometry (22)# Area and perimeter (18)# Triangles (16)# Coordinate geometry (14)# Properties of numbers (6)# Data and statistics (24)# Numbers and Operations (5)# Word problems (26)# Solving equations (3)# Circles (17)# Circles (17)# Properties of numbers (6)# Exponents and radicals (2)# Area and perimeter (18)# Numbers and Operations (5)# Sequences (27)# Probability (23)# Quadratics (13)# Trigonometry (22)# Systems of equations (20)# Word problems (26)# Trigonometry (22)# Properties of numbers (6)# Inequalities (21)# Functions (11)# Expressions (4)# Data and statistics (24)# Functions (11)# Matrices (28)# Literal Comprehension# Literal Comprehension# Paired Passages# Literal Comprehension# Reading For Function# Literal Comprehension# Literal Comprehension# Literal Comprehension# Supporting And Undermining# Reading For Function# The Big Picture# Graphs And Charts# Literal Comprehension# The Big Picture# Reading For Function# Supporting And Undermining# Literal Comprehension# Literal Comprehension# Literal Comprehension# Supporting And Undermining# The Big Picture# Reading For Function# Reading For Function# Paired Passages# Paired Passages# Paired Passages# Paired Passages# Paired Passages# Paired Passages# Paired Passages# Literal Comprehension# Literal Comprehension# Literal Comprehension# Graphs And Charts# Literal Comprehension# Graphs And Charts# Literal Comprehension# Literal Comprehension# Pronouns And Compression Nouns# Reading For Function# Inference Question# Inference Question# Generic Labels# Generic Labels# Cannot Be Determined# Cannot Be Determined# Scatter Plot# Inference Question# Scatter Plot# Data Full Sentence# Cannot Be Determined# Inference Question# Data Full Sentence# Extrapolation And Estimation# Extrapolation And Estimation# Inference Question# Cannot Be Determined# Trends In Tables And Figures# Inference Question# Generic Labels# Data Full Sentence# Cannot Be Determined# Inference Question# Inference Question# Outside Knowledge# Cannot Be Determined# Trends In Tables And Figures# Cannot Be Determined# Outside Knowledge# Inference Question# Extrapolation And Estimation# Cannot Be Determined# Equations# Inference Question# Outside Knowledge# Inference Question# Inference Question# Inference Question# Cannot Be Determined# Inference Question# Non-essential and essential clauses (4)# Joining and separating sentences (3)# Punctuation (5,6,7)# Punctuation (5,6,7)# Shorter is better (15)# Shorter is better (15)# Non-essential and essential clauses (4)# Modification (12)# Diction, idioms, and register (16)# Verbs (8)# Verbs (8)# Joining and separating sentences (3)# Add, revise, or delete (18)# Verbs (8)# Sentence and paragraph order (19)# Transitions (17)# Pronouns (9)# Verbs (8)# Non-essential and essential clauses (4)# Add, revise, or delete (18)# Verbs (8)# Sentence and paragraph order (19)# Shorter is better (15)# Diction, idioms, and register (16)# Shorter is better (15)# Verbs (8)# Joining and separating sentences (3)# Transitions (17)# Diction, idioms, and register (16)# Sentence and paragraph order (19)# Diction, idioms, and register (16)# Non-essential and essential clauses (4)# Add, revise, or delete (18)# Punctuation (5,6,7)# Transitions (17)# Shorter is better (15)# Add, revise, or delete (18)# Shorter is better (15)# Transitions (17)# Pronouns (9)# Sentences and fragments (2)# Diction, idioms, and register (16)# Diction, idioms, and register (16)# Add, revise, or delete (18)# Evaluation of purpose (20)# Joining and separating sentences (3)# Diction, idioms, and register (16)# Verbs (8)# Add, revise, or delete (18)# Pronouns (9)# Add, revise, or delete (18)# Modification (12)# Add, revise, or delete (18)# Add, revise, or delete (18)# Punctuation (5,6,7)# Punctuation (5,6,7)# Joining and separating sentences (3)# Non-essential and essential clauses (4)# Pronouns (9)# Add, revise, or delete (18)# Verbs (8)# Add, revise, or delete (18)# Sentence and paragraph order (19)# Punctuation (5,6,7)# Add, revise, or delete (18)# Add, revise, or delete (18)# Non-essential and essential clauses (4)# Shorter is better (15)# Non-essential and essential clauses (4)# Transitions (17)# Pronouns (9)# Diction, idioms, and register (16)# Add, revise, or delete (18)# Sentence and paragraph order (19)# Evaluation of purpose (20)# Solving equations (3)# Numbers and Operations (5)# Word problems (26)# Expressions (4)# Sequences (27)# Numbers and Operations (5)# Numbers and Operations (5)# Triangles (16)# Numbers and Operations (5)# Sequences (27)# Expressions (4)# Properties of numbers (6)# Angles (15)# Area and perimeter (18)# Coordinate geometry (14)# Quadratics (13)# Area and perimeter (18)# Expressions (4)# Percents (10)# Trigonometry (22)# Numbers and Operations (5)# Angles (15)# Data and statistics (24)# Probability (23)# Trigonometry (22)# Data and statistics (24)# Probability (23)# Percents (10)# Systems of equations (20)# Matrices (28)# Numbers and Operations (5)# Expressions (4)# Vectors (28)# Numbers and Operations (5)# Quadratics (13)# Properties of numbers (6)# Data and statistics (24)# Quadratics (13)# Angles (15)# Functions (11)# Area and perimeter (18)# Logarithms (25)# Area and perimeter (18)# Trigonometry (22)# Percents (10)# Data and statistics (24)# Probability (23)# Area and perimeter (18)# Probability (23)# Probability (23)# Data and statistics (24)# Data and statistics (24)# Probability (23)# Word problems (26)# Properties of numbers (6)# Ellipses (28)# Properties of numbers (6)# Numbers and Operations (5)# Expressions (4)# Expressions (4)# Literal Comprehension# The Big Picture# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# Reading For Function# Reading For Function# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# Reading For Function# Literal Comprehension# Literal Comprehension# Supporting And Undermining# Paired Passages# The Big Picture# The Big Picture# Literal Comprehension# Paired Passages# Paired Passages# Reading For Function# The Big Picture# Literal Comprehension# Paired Passages# The Big Picture# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# Inference Question# Inference Question# Cannot Be Determined# Inference Question# Equations# Inference Question# Inference Question# Inference Question# Locators# Trends In Tables And Figures# Equations# Generic Labels# Trends In Tables And Figures# Data Full Sentence# Cannot Be Determined# Trends In Tables And Figures# Trends In Tables And Figures# Generic Labels# Generic Labels# Inverse Trends# Cannot Be Determined# Generic Labels# Extrapolation And Estimation# Inference Question# Data Full Sentence# Generic Labels# Outside Knowledge# Cannot Be Determined# Outside Knowledge# Inference Question# Generic Labels# Cannot Be Determined# Inference Question# Inference Question# Trends In Tables And Figures# Data Bridge# Locators# Inference Question# Data Bridge# Data Bridge# Shorter is better (15)# Pronouns (9)# Add, revise, or delete (18)# Non-essential and essential clauses (4)# Sentences and fragments (2)# Add, revise, or delete (18)# Non-essential and essential clauses (4)# Shorter is better (15)# Joining and separating sentences (3)# Sentences and fragments (2)# Diction, idioms, and register (16)# Add, revise, or delete (18)# Joining and separating sentences (3)# Apostrophes (1)# Sentence and paragraph order (19)# Add, revise, or delete (18)# Verbs (8)# Shorter is better (15)# Joining and separating sentences (3)# Diction, idioms, and register (16)# Transitions (17)# Add, revise, or delete (18)# Joining and separating sentences (3)# Add, revise, or delete (18)# Diction, idioms, and register (16)# Modification (12)# Punctuation (5,6,7)# Diction, idioms, and register (16)# Parallel structure (13)# Sentence and paragraph order (19)# Add, revise, or delete (18)# Non-essential and essential clauses (4)# Modification (12)# Joining and separating sentences (3)# Transitions (17)# Punctuation (5,6,7)# Punctuation (5,6,7)# Sentence and paragraph order (19)# Joining and separating sentences (3)# Add, revise, or delete (18)# Pronouns (9)# Verbs (8)# Joining and separating sentences (3)# Shorter is better (15)# Sentence and paragraph order (19)# Sentences and fragments (2)# Verbs (8)# Add, revise, or delete (18)# Apostrophes (1)# Transitions (17)# Non-essential and essential clauses (4)# Diction, idioms, and register (16)# Apostrophes (1)# Sentence and paragraph order (19)# Transitions (17)# Add, revise, or delete (18)# Joining and separating sentences (3)# Add, revise, or delete (18)# Transitions (17)# Evaluation of purpose (20)# Pronouns (9)# Shorter is better (15)# Non-essential and essential clauses (4)# Add, revise, or delete (18)# Verbs (8)# Add, revise, or delete (18)# Pronouns (9)# Diction, idioms, and register (16)# Modification (12)# Verbs (8)# Modification (12)# Verbs (8)# Punctuation (5,6,7)# Sentence and paragraph order (19)# Evaluation of purpose (20)# Ratio and proportion (9)# Probability (23)# Exponents and radicals (2)# Functions (11)# Probability (23)# Word problems (26)# Angles (15)# Solving equations (3)# Coordinate geometry (14)# Data and statistics (24)# Coordinate geometry (14)# Word problems (26)# Systems of equations (20)# Data and statistics (24)# Absolute value (1)# Exponents and radicals (2)# Coordinate geometry (14)# Properties of numbers (6)# Triangles (16)# Triangles (16)# Area and perimeter (18)# Area and perimeter (18)# Percents (10)# Word problems (26)# Numbers and Operations (5)# Coordinate geometry (14)# Expressions (4)# Data and statistics (24)# Numbers and Operations (5)# Word problems (26)# Properties of numbers (6)# Area and perimeter (18)# Area and perimeter (18)# Percents (10)# Word problems (26)# Word problems (26)# Probability (23)# Properties of numbers (6)# Trigonometry (22)# Absolute value (1)# Data and statistics (24)# Logarithms (25)# Percents (10)# Absolute value (1)# Volume (19)# Volume (19)# Area and perimeter (18)# Data and statistics (24)# Functions (11)# Systems of equations (20)# Data and statistics (24)# Systems of equations (20)# Sequences (27)# Trigonometry (22)# Trigonometry (22)# Probability (23)# Matrices (28)# Complex numbers (7)# Trigonometry (22)# Angles (15)# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# Pronouns And Compression Nouns# Reading For Function# Literal Comprehension# Literal Comprehension# Literal Comprehension# Reading For Function# The Big Picture# Literal Comprehension# Pronouns And Compression Nouns# The Big Picture# Literal Comprehension# Literal Comprehension# Literal Comprehension# Supporting And Undermining# Literal Comprehension# Literal Comprehension# Literal Comprehension# Reading For Function# Paired Passages# Paired Passages# Paired Passages# Paired Passages# Paired Passages# Paired Passages# Paired Passages# Paired Passages# The Big Picture# Supporting And Undermining# Literal Comprehension# Supporting And Undermining# Graphs And Charts# The Big Picture# Literal Comprehension# The Big Picture# Literal Comprehension# Literal Comprehension# Scatter Plot# Inference Question# Inference Question# Extrapolation And Estimation# Locators# Inference Question# Trends In Tables And Figures# Data Bridge# Locators# Locators# Data Bridge# Generic Labels# Cannot Be Determined# Inference Question# Generic Labels# Outside Knowledge# Cannot Be Determined# Trends In Tables And Figures# Mixing# Data Bridge# Trends In Tables And Figures# Inference Question# Data Bridge# Extrapolation And Estimation# Cannot Be Determined# Inference Question# Locators# Trends In Tables And Figures# Cannot Be Determined# Cannot Be Determined# Extrapolation And Estimation# Cannot Be Determined# Cannot Be Determined# Cannot Be Determined# Inference Question# Inference Question# Trends In Tables And Figures# Generic Labels# Inverse Trends# Data Bridge# Verbs (8)# Non-essential and essential clauses (4)# Modification (12)# Diction, idioms, and register (16)# Punctuation (5,6,7)# Punctuation (5,6,7)# Non-essential and essential clauses (4)# Add, revise, or delete (18)# Modification (12)# Modification (12)# Pronouns (9)# Punctuation (5,6,7)# Shorter is better (15)# Add, revise, or delete (18)# Evaluation of purpose (20)# Add, revise, or delete (18)# Shorter is better (15)# Shorter is better (15)# Add, revise, or delete (18)# Shorter is better (15)# Pronouns (9)# Add, revise, or delete (18)# Punctuation (5,6,7)# Punctuation (5,6,7)# Verbs (8)# Transitions (17)# Punctuation (5,6,7)# Add, revise, or delete (18)# Punctuation (5,6,7)# Add, revise, or delete (18)# Modification (12)# Punctuation (5,6,7)# Add, revise, or delete (18)# Joining and separating sentences (3)# Add, revise, or delete (18)# Pronouns (9)# Verbs (8)# Punctuation (5,6,7)# Add, revise, or delete (18)# Sentence and paragraph order (19)# Shorter is better (15)# Transitions (17)# Transitions (17)# Add, revise, or delete (18)# Evaluation of purpose (20)# Shorter is better (15)# Add, revise, or delete (18)# Shorter is better (15)# Modification (12)# Verbs (8)# Diction, idioms, and register (16)# Verbs (8)# Punctuation (5,6,7)# Verbs (8)# Non-essential and essential clauses (4)# Shorter is better (15)# Shorter is better (15)# Transitions (17)# Shorter is better (15)# Add, revise, or delete (18)# Pronouns (9)# Punctuation (5,6,7)# Diction, idioms, and register (16)# Verbs (8)# Add, revise, or delete (18)# Sentence and paragraph order (19)# Pronouns (9)# Shorter is better (15)# Transitions (17)# Joining and separating sentences (3)# Add, revise, or delete (18)# Pronouns (9)# Non-essential and essential clauses (4)# Non-essential and essential clauses (4)# Evaluation of purpose (20)# Probability (23)# Triangles (16)# Angles (15)# Probability (23)# Absolute value (1)# Systems of equations (20)# Ratio and proportion (9)# Solving equations (3)# Numbers and Operations (5)# Ratio and proportion (9)# Solving equations (3)# Coordinate geometry (14)# Quadratics (13)# Trigonometry (22)# Area and perimeter (18)# Angles (15)# Sequences (27)# Coordinate geometry (14)# Area and perimeter (18)# Probability (23)# Coordinate geometry (14)# Exponents and radicals (2)# Coordinate geometry (14)# Solving equations (3)# Area and perimeter (18)# Angles (15)# Area and perimeter (18)# Numbers and Operations (5)# Solving equations (3)# Probability (23)# Numbers and Operations (5)# Exponents and radicals (2)# Triangles (16)# Trigonometry (22)# Angles (15)# Volume (19)# Solving equations (3)# Angles (15)# Area and perimeter (18)# Percents (10)# Sequences (27)# Trigonometry (22)# Exponents and radicals (2)# Data and statistics (24)# Absolute value (1)# Functions (11)# Circles (17)# Properties of numbers (6)# Area and perimeter (18)# Numbers and Operations (5)# Coordinate geometry (14)# Functions (11)# Probability (23)# Logarithms (25)# Matrices (28)# Ratio and proportion (9)# Coordinate geometry (14)# Absolute value (1)# Data and statistics (24)# Circles (17)# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# Reading For Function# Literal Comprehension# Literal Comprehension# Literal Comprehension# Paired Passages# Literal Comprehension# Literal Comprehension# Pronouns And Compression Nouns# Literal Comprehension# Paired Passages# Paired Passages# Paired Passages# Supporting And Undermining# Literal Comprehension# Reading For Function# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# Reading For Function# Literal Comprehension# Literal Comprehension# Reading For Function# The Big Picture# Pronouns And Compression Nouns# Pronouns And Compression Nouns# Supporting And Undermining# Graphs And Charts# Graphs And Charts# Reading For Function# Graphs And Charts# Graphs And Charts# Literal Comprehension# Scatter Plot# Data Bridge# Trends In Tables And Figures# Generic Labels# Inference Question# Trends In Tables And Figures# Generic Labels# Generic Labels# Extrapolation And Estimation# Cannot Be Determined# Cannot Be Determined# Inference Question# Inverse Trends# Data Bridge# Locators# Data Full Sentence# Generic Labels# Extrapolation And Estimation# Outside Knowledge# Extrapolation And Estimation# Data Bridge# Data Full Sentence# Data Bridge# Generic Labels# Scatter Plot# Trends In Tables And Figures# Data Bridge# Inference Question# Inference Question# Method Table# Outside Knowledge# Inference Question# Outside Knowledge# Inference Question# Extrapolation And Estimation# Generic Labels# Trends In Tables And Figures# Scatter Plot# Method Table# Locators"
      var ACTDetails1 = ACTDetailsTotalPart1.split('#')
      var ACTDetails2 = ACTDetailsTotalPart2.split('#')
      var ACTDetailsArr = ACTDetails1.concat(ACTDetails2)
      var ACTCorrectAnswersTotal = "C#G#A#J#A#F#C#F#C#J#B#F#B#J#D#G#A#G#D#G#A#J#C#F#D#H#C#G#D#G#D#G#B#F#A#G#A#F#C#J#D#G#C#J#B#J#A#H#D#J#A#H#A#J#B#F#C#G#C#J#A#H#A#G#C#J#D#H#D#G#C#H#D#F#B#C#H#E#H#E#G#E#F#C#H#B#J#B#G#B#F#B#K#D#G#A#G#C#G#C#F#C#H#D#J#D#F#B#H#B#J#E#H#A#H#C#G#A#J#D#J#B#H#A#F#B#F#A#K#A#J#C#F#A#J#C#F#B#H#A#J#B#J#D#G#C#F#B#H#A#H#B#J#A#F#B#G#D#G#D#H#C#G#A#G#A#H#C#F#A#J#C#G#D#J#B#G#B#F#D#J#B#J#A#G#A#F#B#F#C#G#C#F#B#G#A#F#D#H#D#J#B#H#B#F#C#J#D#H#C#G#D#H#D#H#B#F#C#G#D#G#A#F#A#J#C#J#D#J#C#H#D#G#A#G#D#G#C#F#D#J#C#H#B#J#A#J#B#G#C#H#D#F#B#H#A#J#C#J#A#H#A#H#C#J#D#J#A#G#B#H#A#F#A#G#D#G#B#H#D#J#B#G#C#J#C#F#C#F#B#B#G#B#H#A#H#D#J#E#H#E#J#A#H#C#G#D#K#A#J#A#J#E#K#C#G#B#H#C#J#D#K#E#F#E#J#C#G#D#J#A#J#B#J#A#G#E#G#B#G#C#F#C#F#E#H#B#F#A#K#A#H#b#F#D#G#C#H#A#H#D#J#B#H#A#J#B#F#C#F#B#F#B#J#C#F#B#J#C#G#D#G#C#G#D#F#D#F#B#G#B#G#D#H#D#J#A#G#A#H#B#G#D#H#A#F#D#F#C#J#B#F#D#H#B#J#C#J#A#J#C#H#B#G#C#G#D#F#A#F#A#G#C#G#D#G#B#J#B#F#D#F#B#F#A#F#C#G#A#H#C#H#A#H#D#J#A#F#C#H#D#F#C#H#C#J#D#F#D#J#B#F#C#G#C#J#C#H#C#J#A#G#A#J#D#F#D#G#B#G#D#H#C#G#C#J#A#F#B#G#B#H#C#J#B#C#J#E#F#C#G#B#H#C#G#C#G#D#G#D#H#A#J#C#H#D#G#C#H#E#G#E#F#D#H#A#J#A#K#B#F#E#K#D#H#A#G#D#G#D#G#E#H#D#J#E#F#B#F#E#K#A#F#D#K#B#H#D#F#B#F#C#J#D#F#D#F#D#G#C#H#A#J#A#J#B#G#D#G#C#H#A#G#D#J#B#H#B#G#C#F#D#F#B#J#A#H#C#J#A#J#D#F#D#H#B#J#C#J#A#F#D#G#C#G#B#F#B#H#C#G#D#F#A#J#B#J#D#G#D#G#C#F#C#H#B#F#C#F#A#J#D#H#D#J#A#G#B#H#C#J#B#H#A#J#B#F#C#G#B#H#A#J#D#F#B#H#A#G#A#F#D#J#B#J#C#F#D#H#A#J#C#H#D#J#A#F#D#G#B#H#B#G#A#H#A#G#D#G#C#F#D#H#A#J#B#F#D#F#C#B#G#A#H#A#G#E#J#C#H#E#G#A#K#E#J#D#G#B#F#C#K#A#G#D#F#C#H#A#H#C#J#C#G#A#G#E#J#C#K#C#G#D#K#A#K#D#F#B#K#D#J#E#J#B#G#A#J#D#K#A#H#D#H#B#J#A#F#C#G#C#F#A#G#D#G#C#F#D#J#C#F#A#H#B#G#C#J#B#J#B#H#B#F#A#J#C#J#A#H#C#H#C#F#B#H#C#F#A#H#B#J#A#H#A#J#C#F#A#G#B#F#B#G#D#G#D#J#C#G#D#J#A#H#D#F#B#J#B#F#C#H#D#G#D#J#B#H#C#F#A#J#D#H#B#J#A#G#A#H#A#J#C#F#B#J#D#H#B#G#A#H#C#J#D#F#A#F#D#G#C#H#B#H#A#G#A#J#D#H#B#J#B#F#B#F#C#H#D#G#B#F#A#H#A#F#C#J#B#G#D#J#A#H#C#D#H#C#J#A#H#D#H#B#G#A#G#C#F#C#K#A#K#A#G#D#J#E#H#C#H#D#J#B#K#C#H#B#K#E#G#C#F#A#K#E#F#A#J#D#K#A#K#D#G#D#H#B#G#D#K#B#F#D#G#B#F#D#J#B#H#A#J#D#H#D#J#D#H#B#H#C#J#C#F#D#H#A#F#B#J#A#G#C#H#B#F#D#G#C#F#A#H#A#G#B#J#A#H#A#H#D#J#C#H#D#F#B#H#B#G#C#J#A#F#C#F#D#F#B#G#C#F#B#G#A#H#D#J#C#H#B#G#C#J#C#H#B#H#C#F#A#G#A#H#D#G#B#J#A#J#C#F#A#F#B#J#B#H#A#J#A#H#D#G#D#G#B#J#D#G#C#F#C#F#A#F#B#F#C#F#A#F#B#G#D#J#A#G#D#J#C#J#B#H#D#F#C#H#D#G#A#J#D#J#B#H#A#H#B#E#H#B#J#A#F#B#H#C#J#C#H#E#H#D#F#C#G#A#J#B#H#A#F#C#F#E#H#E#F#B#K#C#J#D#K#E#K#B#H#B#F#D#G#D#H#A#G#D#J#E#J#E#G#D#J#A#G#E#K#D#J#C#H#B#H#A#F#D#F#B#F#B#F#A#H#D#J#C#J#C#G#B#H#D#G#A#F#B#F#B#F#D#H#B#H#A#F#C#J#A#J#D#G#D#G#B#G#A#H#D#H#B#G#B#H#A#F#C#F#C#F#D#H#B#J#B#H#C#J#B#F#A#F#C#F#B#J#B#F#C#J#B#H#B#J#D#H#B#G#D#F#A#H#A#J#C#F#B#G#D#H#B#F#D#G#A#F#C#H#D#H#A#F#C#H#A#H#B#G#D#H#D#F#D#H#B#F#B#J#B#F#A#H#D#J#A#H#B#J#C#F#D#F#B#G#D#H#A#J#A#G#B#F#B#D#F#E#H#C#H#C#K#B#H#D#G#C#K#D#F#B#G#B#J#D#K#C#F#C#H#C#F#C#G#E#J#D#G#A#K#A#G#E#J#C#J#D#K#A#J#B#F#E#F#E#G#A#G#A#J#D#F#A#K#D#G#D#H#A#J#B#G#C#F#A#H#C#J#C#F#B#G#D#F#C#G#D#G#C#F#A#G#A#J#D#F#C#J#B#F#D#G#B#H#A#F#C#G#C#J#D#H#B#F#B#G#D#H#C#F#A#G#A#J#C#H#C#F#C#G#B#G#C#F#B#F#D#F#B#G#D#J#A#J#A#J#B#H#D#F#B#J#B#H#C#F#C#J#D#J#B#G#C#H#A#G#D#H#D#H#A#H#A#H#C#J#B#F#D#F#C#F#C#G#A#J#C#F#B#F#B#G#D#H#B#J#D#G#A#J#C#G#A#H#D#G#B#F#A#F#B#J#D#H#A#H#B#G#D#E#H#B#F#D#K#B#G#D#J#C#G#C#F#C#H#E#H#A#K#B#K#B#K#C#J#A#G#A#K#A#H#A#H#D#J#D#H#C#F#D#F#E#J#D#G#D#G#C#J#D#H#C#H#E#J#E#F#E#J#A#G#D#G#A#H#D#F#C#J#B#G#C#H#D#H#D#J#A#H#D#G#C#G#C#F#B#F#B#G#C#G#D#H#A#J#B#J#B#F#C#G#B#H#D#H#D#H#A#J#B#F#A#G#D#J#A#F#A#G#D#J#C#J#B#J#A#F#B#F#C#F#A#G#A#G#D#G#B#J#D#H#A#H#D#F#A#J#B#G#C#G#A#H#C#H#A#J#D#F#B#J#A#G#B#F#D#H#B#H#B#H#D#F#D#H#A#F#B#H#D#F#D#J#C#H#D#F#A#H#C#J#A#H#B#G#C#J#D#J#B#J#B#F#D#H#B#G#B#F#D#H#D#G#A#A#K#D#J#D#F#B#K#D#K#A#H#D#G#B#H#D#K#C#J#B#H#E#G#E#H#C#H#C#H#B#G#B#F#D#K#C#J#C#F#D#F#C#G#E#K#A#F#A#F#A#G#C#F#A#J#E#G#D#K#B#F#B#F#D#H#C#J#B#J#A#J#D#H#D#G#A#G#C#H#B#H#A#J#B#F#D#H#A#H#C#F#B#J#C#H#D#H#B#J#A#J#D#H#C#G#B#H#C#G#D#F#A#H#D#G#B#F#B#J#B#F#B#H#A#F#A#H#B#G#C#H#A#G#C#J#D#G#C#J#A#G#A#F#C#F#D#G#C#J#C#F#B#J#B#G#C#F#C#G#D#G#C#H#B#F#C#F#D#G#C#J#C#G#A#J#C#F#D#H#B#F#C#G#A#F#B#G#D#F#B#F#D#H#D#H#A#G#C#J#C#G#D#J#B#F#B#F#D#F#C#H#D#F#D#C#K#B#J#D#H#D#G#D#G#D#H#B#H#D#K#B#K#B#K#B#F#C#J#A#H#A#H#E#J#E#G#E#H#C#J#A#K#D#K#A#G#C#F#A#J#B#G#B#J#C#F#A#H#E#H#B#F#A#K#A#G#A#J#C#G#D#H#C#F#D#G#D#J#A#G#B#H#A#H#C#G#D#H#D#F#C#J#A#F#D#H#B#J#C#G#A#G#A#J#C#J#B#J#A#G#C#J#C#J#A#F#A#H#B#J#A#H#A#G#C#H#C#H#D#J#C#F#B#F#D#F#D#G#A#J#D#J#B#G"
      var ACTCorrectAnswerArr = ACTCorrectAnswersTotal.split('#')

      var ACTSections = "English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#English#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Math#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Reading#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science#Science"
      var ACTSectionsArr = Copies(ACTSections.split('#'))
      var ACTDetailsArr = removeTextWithinParentheses(ACTDetailsArr)
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
      var SATDetailsTotal = "The Big Picture#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Literal Comprehension#The Big Picture#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Reading For Function#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Reading For Function#Graphs And Charts#Graphs And Charts#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Reading For Function#Literal Comprehension#Reading For Function#Graphs And Charts#Graphs And Charts#Graphs And Charts#Graphs And Charts#The Big Picture#The Big Picture#Reading For Function#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Reading For Function#Reading For Function#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Reading For Function#The Big Picture#Literal Comprehension#Paired Passages#Paired Passages#Supporting And Undermining#Paired Passages#Paired Passages#Diction, idioms, and register (5)#Add, revise, or delete (1)#Apostrophes (13)#Punctuation (10,11,12)#Sentence and paragraph order (2)#Add, revise, or delete (1)#Diction, idioms, and register (5)#Verb agreement and tense (15)#Transitions (8)#Diction, idioms, and register (5)#Transitions (8)#Infographics (3)#Combining and separating sentences (7)#Transitions (8)#Non-essential and essential clauses (9)#Punctuation (10,11,12)#Sentences and fragments (6)#Verb agreement and tense (15)#Pronoun and noun agreement (14)#Add, revise, or delete (1)#Shorter is better (4)#Sentence and paragraph order (2)#Shorter is better (4)#Modification (18)#Diction, idioms, and register (5)#Punctuation (10,11,12)#Transitions (8)#Add, revise, or delete (1)#Infographics (3)#Pronoun and noun agreement (14)#Sentence and paragraph order (2)#Punctuation (10,11,12)#Diction, idioms, and register (5)#Transitions (8)#Shorter is better (4)#Verb agreement and tense (15)#Add, revise, or delete (1)#Transitions (8)#Shorter is better (4)#Verb agreement and tense (15)#Apostrophes (13)#Add, revise, or delete (1)#Pronoun and noun agreement (14)#Pronoun and noun agreement (14)#Solving algebraic equations (8)#Complex numbers (19)#Constructing models (7)#Lines (14)#Expressions (6)#Lines (14)#Expressions (6)#Expressions (6)#Systems of equations (10)#Quadratics (17)#Systems of equations (10)#Lines (14)#Expressions (6)#Exponents and radicals (1)#Matching coefficients (9)#Quadratics (17)#Triangles (22)#Systems of equations (10)#Trigonometry (24)#Systems of equations (10)#Reading data (25)#Ratio and proportion (5)#Angles (21)#Word problems (12)#Exponential and linear growth (3)#Ratio and proportion (5)#Reading data (25)#Absolute value (20)#Solving algebraic equations (8)#Solving algebraic equations (8)#Inequalities (11)#Mean, median, and mode (27)#Percents (2)#Mean, median, and mode (27)#Lines (14)#Lines (14)#Functions (16)#Inequalities (11)#Systems of equations (10)#Percents (2)#Probability (26)#Mean, median, and mode (27)#Ratio and proportion (5)#Circles (23)#Quadratics (17)#Percents (2)#Reading data (25)#Inequalities (11)#Synthetic division (18)#Quadratics (17)#Inequalities (11)#Inequalities (11)#Reading data (25)#Word problems (12)#Volume (29)#Functions (16)#Exponential and linear growth (3)#The Big Picture#Reading For Function#The Big Picture#Reading For Function#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Literal Comprehension#Supporting And Undermining#The Big Picture#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Reading For Function#Literal Comprehension#Supporting And Undermining#The Big Picture#Graphs And Charts#Graphs And Charts#Graphs And Charts#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Literal Comprehension#Reading For Function#Literal Comprehension#Reading For Function#The Big Picture#Paired Passages#Paired Passages#Paired Passages#The Big Picture#Reading For Function#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Reading For Function#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Reading For Function#Reading For Function#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Graphs And Charts#Graphs And Charts#Natural Science#Natural Science#Diction, idioms, and register (5)#Transitions (8)#Verb agreement and tense (15)#Add, revise, or delete (1)#Shorter is better (4)#Parallel structure (17)#Shorter is better (4)#Sentences and fragments (6)#Add, revise, or delete (1)#Diction, idioms, and register (5)#Add, revise, or delete (1)#Transitions (8)#Non-essential and essential clauses (9)#Punctuation (10,11,12)#Add, revise, or delete (1)#Sentences and fragments (6)#Add, revise, or delete (1)#Combining and separating sentences (7)#Parallel structure (17)#Verb agreement and tense (15)#Add, revise, or delete (1)#Sentence and paragraph order (2)#Sentences and fragments (6)#Infographics (3)#Transitions (8)#Add, revise, or delete (1)#Punctuation (10,11,12)#Diction, idioms, and register (5)#Pronoun and noun agreement (14)#Pronoun and noun agreement (14)#Sentence and paragraph order (2)#Diction, idioms, and register (5)#Non-essential and essential clauses (9)#Pronoun and noun agreement (14)#Non-essential and essential clauses (9)#Diction, idioms, and register (5)#Add, revise, or delete (1)#Pronoun and noun agreement (14)#Pronoun and noun agreement (14)#Punctuation (10,11,12)#Modification (18)#Sentence and paragraph order (2)#Add, revise, or delete (1)#Shorter is better (4)#Solving algebraic equations (8)#Systems of equations (10)#Constructing models (7)#Expressions (6)#Solving algebraic equations (8)#Lines (14)#Exponents and radicals (1)#Angles (21)#Lines (14)#Quadratics (17)#Complex numbers (19)#Solving algebraic equations (8)#Quadratics (17)#Exponential and linear growth (3)#Expressions (6)#Systems of equations (10)#Matching coefficients (9)#Triangles (22)#Trigonometry (24)#Systems of equations (10)#Lines (14)#Ratio and proportion (5)#Solving algebraic equations (8)#Ratio and proportion (5)#Percents (2)#Word problems (12)#Quadratics (17)#Word problems (12)#Inequalities (11)#Functions (16)#Word problems (12)#Inequalities (11)#Experiment design (28)#Scatter plots (28)#Mean, median, and mode (27)#Probability (26)#Percents (2)#Mean, median, and mode (27)#Mean, median, and mode (27)#Ratio and proportion (5)#Inequalities (11)#Ratio and proportion (5)#Ratio and proportion (5)#Circles (23)#Lines (14)#Functions (16)#Constructing models (7)#Lines (14)#Quadratics (17)#Triangles (22)#Ratio and proportion (5)#Solving algebraic equations (8)#Quadratics (17)#Word problems (12)#Lines (14)#Circles (23)#Solving algebraic equations (8)#The Big Picture#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Reading For Function#Literal Comprehension#Literal Comprehension#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Reading For Function#Literal Comprehension#Supporting And Undermining#The Big Picture#Supporting And Undermining#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Graphs And Charts#Graphs And Charts#Literal Comprehension#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Reading For Function#Literal Comprehension#Literal Comprehension#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Paired Passages#Paired Passages#The Big Picture#Paired Passages#Reading For Function#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Reading For Function#Literal Comprehension#Graphs And Charts#Graphs And Charts#Natural Science#Natural Science#Parallel structure (17)#Add, revise, or delete (1)#Add, revise, or delete (1)#Apostrophes (13)#Verb agreement and tense (15)#Add, revise, or delete (1)#Shorter is better (4)#Shorter is better (4)#Transitions (8)#Combining and separating sentences (7)#Diction, idioms, and register (5)#Pronoun and noun agreement (14)#Add, revise, or delete (1)#Punctuation (10,11,12)#Verb agreement and tense (15)#Diction, idioms, and register (5)#Add, revise, or delete (1)#Shorter is better (4)#Word pairs and comparisons (16)#Add, revise, or delete (1)#Modification (18)#Add, revise, or delete (1)#Combining and separating sentences (7)#Combining and separating sentences (7)#Diction, idioms, and register (5)#Pronoun and noun agreement (14)#Pronoun and noun agreement (14)#Verb agreement and tense (15)#Punctuation (10,11,12)#Sentence and paragraph order (2)#Infographics (3)#Infographics (3)#Add, revise, or delete (1)#Sentences and fragments (6)#Non-essential and essential clauses (9)#Verb agreement and tense (15)#Add, revise, or delete (1)#Verb agreement and tense (15)#Sentence and paragraph order (2)#Diction, idioms, and register (5)#Non-essential and essential clauses (9)#Add, revise, or delete (1)#Add, revise, or delete (1)#Diction, idioms, and register (5)#Constructing models (7)#Solving algebraic equations (8)#Exponents and radicals (1)#Solving algebraic equations (8)#Solving algebraic equations (8)#Systems of equations (10)#Synthetic division (18)#Lines (14)#Systems of equations (10)#Quadratics (17)#Angles (21)#Quadratics (17)#Matching coefficients (9)#Quadratics (17)#Lines (14)#Solving algebraic equations (8)#Solving algebraic equations (8)#Angles (21)#Systems of equations (10)#Trigonometry (24)#Constructing models (7)#Probability (26)#Constructing models (7)#Functions (16)#Percents (2)#Expressions (6)#Solving algebraic equations (8)#Lines (14)#Ratio and proportion (5)#Solving algebraic equations (8)#Solving algebraic equations (8)#Functions (16)#Solving algebraic equations (8)#Lines (14)#Experiment design (28)#Quadratics (17)#Lines (14)#Lines (14)#Ratio and proportion (5)#Scatter plots (28)#Exponential and linear growth (3)#Percents (2)#Trigonometry (24)#Systems of equations (10)#Volume (29)#Lines (14)#Percents (2)#Exponential and linear growth (3)#Probability (26)#Systems of equations (10)#Systems of equations (10)#Mean, median, and mode (27)#Matching coefficients (9)#Circles (23)#Mean, median, and mode (27)#Inequalities (11)#Word problems (12)#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Reading For Function#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Literal Comprehension#Literal Comprehension#Literal Comprehension#The Big Picture#Literal Comprehension#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Graphs And Charts#Graphs And Charts#Graphs And Charts#Literal Comprehension#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Reading For Function#Literal Comprehension#Literal Comprehension#Literal Comprehension#Literal Comprehension#Literal Comprehension#Paired Passages#Supporting And Undermining#Paired Passages#Supporting And Undermining#Paired Passages#The Big Picture#The Big Picture#The Big Picture#Supporting And Undermining#Reading For Function#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Supporting And Undermining#Graphs And Charts#Graphs And Charts#Graphs And Charts#Natural Science#Natural Science#Sentences and fragments (6)#Transitions (8)#Non-essential and essential clauses (9)#Add, revise, or delete (1)#Diction, idioms, and register (5)#Verb agreement and tense (15)#Pronoun and noun agreement (14)#Shorter is better (4)#Parallel structure (17)#Add, revise, or delete (1)#Add, revise, or delete (1)#Word pairs and comparisons (16)#Pronoun and noun agreement (14)#Shorter is better (4)#Transitions (8)#Diction, idioms, and register (5)#Transitions (8)#Add, revise, or delete (1)#Verb agreement and tense (15)#Add, revise, or delete (1)#Pronoun and noun agreement (14)#Punctuation (10,11,12)#Diction, idioms, and register (5)#Word pairs and comparisons (16)#Add, revise, or delete (1)#Combining and separating sentences (7)#Sentence and paragraph order (2)#Verb agreement and tense (15)#Punctuation (10,11,12)#Diction, idioms, and register (5)#Infographics (3)#Pronoun and noun agreement (14)#Add, revise, or delete (1)#Verb agreement and tense (15)#Non-essential and essential clauses (9)#Combining and separating sentences (7)#Add, revise, or delete (1)#Add, revise, or delete (1)#Transitions (8)#Pronoun and noun agreement (14)#Shorter is better (4)#Diction, idioms, and register (5)#Modification (18)#Sentence and paragraph order (2)#Absolute value (20)#Functions (16)#Systems of equations (10)#Functions (16)#Expressions (6)#Solving algebraic equations (8)#Lines (14)#Lines (14)#Solving algebraic equations (8)#Solving algebraic equations (8)#Systems of equations (10)#Percents (2)#Functions (16)#Complex numbers (19)#Quadratics (17)#Triangles (22)#Trigonometry (24)#Solving algebraic equations (8)#Systems of equations (10)#Lines (14)#Solving algebraic equations (8)#Lines (14)#Circles (23)#Percents (2)#Solving algebraic equations (8)#Word problems (12)#Probability (26)#Lines (14)#Probability (26)#Reading data (25)#Reading data (25)#Functions (16)#Exponential and linear growth (3)#Exponential and linear growth (3)#Exponential and linear growth (3)#Inequalities (11)#Lines (14)#Volume (29)#Inequalities (11)#Exponential and linear growth (3)#Scatter plots (28)#Percents (2)#Mean, median, and mode (27)#Circles (23)#Synthetic division (18)#Inequalities (11)#Scatter plots (28)#Quadratics (17)#Mean, median, and mode (27)#Systems of equations (10)#Word problems (12)#Lines (14)#Ratio and proportion (5)#Ratio and proportion (5)#Ratio and proportion (5)#Circles (23)#Exponential and linear growth (3)#The Big Picture#The Big Picture#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Literal Comprehension#The Big Picture#Supporting And Undermining#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Literal Comprehension#Literal Comprehension#The Big Picture#Literal Comprehension#Supporting And Undermining#Paired Passages#Paired Passages#Paired Passages#Literal Comprehension#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Literal Comprehension#Graphs And Charts#Graphs And Charts#The Big Picture#Literal Comprehension#Supporting And Undermining#Supporting And Undermining#Reading For Function#Literal Comprehension#Literal Comprehension#Graphs And Charts#Graphs And Charts#Graphs And Charts#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Literal Comprehension#The Big Picture#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Social Science#Social Science#Add, revise, or delete (1)#Diction, idioms, and register (5)#Add, revise, or delete (1)#Pronoun and noun agreement (14)#Diction, idioms, and register (5)#Pronoun and noun agreement (14)#Sentence and paragraph order (2)#Transitions (8)#Verb agreement and tense (15)#Combining and separating sentences (7)#Pronoun and noun agreement (14)#Transitions (8)#Combining and separating sentences (7)#Punctuation (10,11,12)#Non-essential and essential clauses (9)#Add, revise, or delete (1)#Punctuation (10,11,12)#Shorter is better (4)#Diction, idioms, and register (5)#Diction, idioms, and register (5)#Verb agreement and tense (15)#Diction, idioms, and register (5)#Pronoun and noun agreement (14)#Combining and separating sentences (7)#Transitions (8)#Verb agreement and tense (15)#Add, revise, or delete (1)#Transitions (8)#Sentences and fragments (6)#Verb agreement and tense (15)#Pronoun and noun agreement (14)#Sentence and paragraph order (2)#Infographics (3)#Sentence and paragraph order (2)#Punctuation (10,11,12)#Diction, idioms, and register (5)#Shorter is better (4)#Add, revise, or delete (1)#Diction, idioms, and register (5)#Diction, idioms, and register (5)#Add, revise, or delete (1)#Punctuation (10,11,12)#Transitions (8)#Modification (18)#Lines (14)#Circles (23)#Quadratics (17)#Functions (16)#Solving algebraic equations (8)#Expressions (6)#Inequalities (11)#Lines (14)#Systems of equations (10)#Expressions (6)#Volume (29)#Exponents and radicals (1)#Lines (14)#Functions (16)#Word problems (12)#Inequalities (11)#Solving algebraic equations (8)#Systems of equations (10)#Matching coefficients (9)#Angles (21)#Reading data (25)#Functions (16)#Ratio and proportion (5)#Solving algebraic equations (8)#Ratio and proportion (5)#Word problems (12)#Lines (14)#Expressions (6)#Ratio and proportion (5)#Solving algebraic equations (8)#Lines (14)#Systems of equations (10)#Inequalities (11)#Probability (26)#Experiment design (28)#Solving algebraic equations (8)#Reading data (25)#Solving algebraic equations (8)#Triangles (22)#Reading data (25)#Expressions (6)#Percents (2)#Lines (14)#Percents (2)#Inequalities (11)#Expressions (6)#Mean, median, and mode (27)#Lines (14)#Circles (23)#Quadratics (17)#Ratio and proportion (5)#Ratio and proportion (5)#Solving algebraic equations (8)#Functions (16)#Word problems (12)#Angles (21)#Reading data (25)#The Big Picture#Literal Comprehension#Reading For Function#Supporting And Undermining#Reading For Function#Reading For Function#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Literal Comprehension#The Big Picture#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Reading For Function#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Graphs And Charts#Graphs And Charts#Graphs And Charts#The Big Picture#Literal Comprehension#Literal Comprehension#Literal Comprehension#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Reading For Function#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Reading For Function#Literal Comprehension#Literal Comprehension#Supporting And Undermining#The Big Picture#Paired Passages#The Big Picture#Literal Comprehension#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Graphs And Charts#Supporting And Undermining#Literal Comprehension#Reading For Function#Graphs And Charts#Natural Science#Natural Science#Combining and separating sentences (7)#Combining and separating sentences (7)#Shorter is better (4)#Punctuation (10,11,12)#Add, revise, or delete (1)#Shorter is better (4)#Verb agreement and tense (15)#Diction, idioms, and register (5)#Transitions (8)#Add, revise, or delete (1)#Add, revise, or delete (1)#Apostrophes (13)#Transitions (8)#Combining and separating sentences (7)#Diction, idioms, and register (5)#Add, revise, or delete (1)#Punctuation (10,11,12)#Add, revise, or delete (1)#Combining and separating sentences (7)#Non-essential and essential clauses (9)#Diction, idioms, and register (5)#Sentence and paragraph order (2)#Add, revise, or delete (1)#Diction, idioms, and register (5)#Diction, idioms, and register (5)#Add, revise, or delete (1)#Pronoun and noun agreement (14)#Punctuation (10,11,12)#Non-essential and essential clauses (9)#Word pairs and comparisons (16)#Transitions (8)#Add, revise, or delete (1)#Word pairs and comparisons (16)#Shorter is better (4)#Diction, idioms, and register (5)#Punctuation (10,11,12)#Add, revise, or delete (1)#Add, revise, or delete (1)#Non-essential and essential clauses (9)#Add, revise, or delete (1)#Verb agreement and tense (15)#Apostrophes (13)#Transitions (8)#Word pairs and comparisons (16)#Lines (14)#Lines (14)#Complex numbers (19)#Matching coefficients (9)#Lines (14)#Expressions (6)#Solving algebraic equations (8)#Functions (16)#Exponents and radicals (1)#Mean, median, and mode (27)#Quadratics (17)#Expressions (6)#Quadratics (17)#Inequalities (11)#Expressions (6)#Exponents and radicals (1)#Solving algebraic equations (8)#Triangles (22)#Word problems (12)#Circles (23)#Expressions (6)#Reading data (25)#Constructing models (7)#Lines (14)#Inequalities (11)#Percents (2)#Experiment design (28)#Probability (26)#Word problems (12)#Systems of equations (10)#Systems of equations (10)#Reading data (25)#Functions (16)#Lines (14)#Functions (16)#Triangles (22)#Lines (14)#Inequalities (11)#Word problems (12)#Quadratics (17)#Experiment design (28)#Mean, median, and mode (27)#Reading data (25)#Percents (2)#Functions (16)#Ratio and proportion (5)#Circles (23)#Absolute value (20)#Solving algebraic equations (8)#Quadratics (17)#Word problems (12)#Solving algebraic equations (8)#Volume (29)#Systems of equations (10)#Lines (14)#Mean, median, and mode (27)#Exponential and linear growth (3)#The Big Picture#Literal Comprehension#Literal Comprehension#Reading For Function#Literal Comprehension#Supporting And Undermining#Reading For Function#Literal Comprehension#Supporting And Undermining#Literal Comprehension#The Big Picture#Literal Comprehension#Supporting And Undermining#Reading For Function#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Graphs And Charts#Graphs And Charts#Supporting And Undermining#The Big Picture#Reading For Function#Literal Comprehension#Supporting And Undermining#Reading For Function#Literal Comprehension#Supporting And Undermining#The Big Picture#Reading For Function#Literal Comprehension#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Paired Passages#Paired Passages#Paired Passages#Paired Passages#The Big Picture#Reading For Function#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Literal Comprehension#Graphs And Charts#Graphs And Charts#Natural Science#Natural Science#Shorter is better (4)#Diction, idioms, and register (5)#Verb agreement and tense (15)#Punctuation (10,11,12)#Add, revise, or delete (1)#Diction, idioms, and register (5)#Verb agreement and tense (15)#Verb agreement and tense (15)#Sentence and paragraph order (2)#Add, revise, or delete (1)#Transitions (8)#Parallel structure (17)#Non-essential and essential clauses (9)#Transitions (8)#Add, revise, or delete (1)#Non-essential and essential clauses (9)#Shorter is better (4)#Diction, idioms, and register (5)#Verb agreement and tense (15)#Transitions (8)#Infographics (3)#Punctuation (10,11,12)#Transitions (8)#Sentences and fragments (6)#Add, revise, or delete (1)#Verb agreement and tense (15)#Punctuation (10,11,12)#Add, revise, or delete (1)#Pronoun and noun agreement (14)#Shorter is better (4)#Diction, idioms, and register (5)#Punctuation (10,11,12)#Transitions (8)#Punctuation (10,11,12)#Add, revise, or delete (1)#Verb agreement and tense (15)#Diction, idioms, and register (5)#Transitions (8)#Shorter is better (4)#Add, revise, or delete (1)#Word pairs and comparisons (16)#Sentence and paragraph order (2)#Non-essential and essential clauses (9)#Add, revise, or delete (1)#Lines (14)#Expressions (6)#Systems of equations (10)#Complex numbers (19)#Functions (16)#Lines (14)#Expressions (6)#Inequalities (11)#Inequalities (11)#Synthetic division (18)#Exponents and radicals (1)#Quadratics (17)#Expressions (6)#Inequalities (11)#Expressions (6)#Solving algebraic equations (8)#Angles (21)#Angles (21)#Lines (14)#Matching coefficients (9)#Probability (26)#Expressions (6)#Word problems (12)#Experiment design (28)#Inequalities (11)#Quadratics (17)#Scatter plots (28)#Scatter plots (28)#Solving algebraic equations (8)#Percents (2)#Systems of equations (10)#Percents (2)#Reading data (25)#Angles (21)#Word problems (12)#Expressions (6)#Lines (14)#Solving algebraic equations (8)#Solving algebraic equations (8)#Solving algebraic equations (8)#Scatter plots (28)#Mean, median, and mode (27)#Volume (29)#Quadratics (17)#Functions (16)#Functions (16)#Exponential and linear growth (3)#Lines (14)#Circles (23)#Percents (2)#Ratio and proportion (5)#Lines (14)#Word problems (12)#Circles (23)#Systems of equations (10)#Triangles (22)#Mean, median, and mode (27)#The Big Picture#Reading For Function#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Literal Comprehension#Reading For Function#Literal Comprehension#The Big Picture#Literal Comprehension#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Supporting And Undermining#The Big Picture#Graphs And Charts#Graphs And Charts#Graphs And Charts#The Big Picture#The Big Picture#Supporting And Undermining#Literal Comprehension#Literal Comprehension#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Graphs And Charts#Graphs And Charts#The Big Picture#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Paired Passages#Paired Passages#Paired Passages#The Big Picture#Literal Comprehension#Supporting And Undermining#Reading For Function#Reading For Function#Literal Comprehension#Literal Comprehension#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Natural Science#Natural Science#Transitions (8)#Diction, idioms, and register (5)#Sentences and fragments (6)#Non-essential and essential clauses (9)#Add, revise, or delete (1)#Add, revise, or delete (1)#Word pairs and comparisons (16)#Verb agreement and tense (15)#Diction, idioms, and register (5)#Add, revise, or delete (1)#Word pairs and comparisons (16)#Shorter is better (4)#Punctuation (10,11,12)#Add, revise, or delete (1)#Add, revise, or delete (1)#Pronoun and noun agreement (14)#Word pairs and comparisons (16)#Add, revise, or delete (1)#Sentence and paragraph order (2)#Pronoun and noun agreement (14)#Modification (18)#Shorter is better (4)#Diction, idioms, and register (5)#Punctuation (10,11,12)#Add, revise, or delete (1)#Diction, idioms, and register (5)#Pronoun and noun agreement (14)#Sentence and paragraph order (2)#Shorter is better (4)#Sentences and fragments (6)#Transitions (8)#Shorter is better (4)#Add, revise, or delete (1)#Transitions (8)#Shorter is better (4)#Add, revise, or delete (1)#Verb agreement and tense (15)#Shorter is better (4)#Add, revise, or delete (1)#Non-essential and essential clauses (9)#Add, revise, or delete (1)#Verb agreement and tense (15)#Add, revise, or delete (1)#Punctuation (10,11,12)#Solving algebraic equations (8)#Lines (14)#Solving algebraic equations (8)#Angles (21)#Word problems (12)#Inequalities (11)#Solving algebraic equations (8)#Functions (16)#Circles (23)#Systems of equations (10)#Synthetic division (18)#Expressions (6)#Lines (14)#Quadratics (17)#Functions (16)#Quadratics (17)#Matching coefficients (9)#Systems of equations (10)#Lines (14)#Circles (23)#Word problems (12)#Reading data (25)#Ratio and proportion (5)#Scatter plots (28)#Angles (21)#Systems of equations (10)#Lines (14)#Solving algebraic equations (8)#Volume (29)#Constructing models (7)#Ratio and proportion (5)#Inequalities (11)#Exponents and radicals (1)#Functions (16)#Volume (29)#Probability (26)#Mean, median, and mode (27)#Scatter plots (28)#Quadratics (17)#Inequalities (11)#Scatter plots (28)#Percents (2)#Exponential and linear growth (3)#Experiment design (28)#Functions (16)#Experiment design (28)#Lines (14)#Mean, median, and mode (27)#Exponential and linear growth (3)#Functions (16)#Ratio and proportion (5)#Solving algebraic equations (8)#Lines (14)#Word problems (12)#Functions (16)#Trigonometry (24)#Reading data (25)#The Big Picture#The Big Picture#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Reading For Function#Supporting And Undermining#Literal Comprehension#Literal Comprehension#The Big Picture#Supporting And Undermining#Reading For Function#Literal Comprehension#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Graphs And Charts#Graphs And Charts#Reading For Function#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Supporting And Undermining#Graphs And Charts#Graphs And Charts#Graphs And Charts#The Big Picture#Literal Comprehension#Literal Comprehension#The Big Picture#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Reading For Function#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Reading For Function#Literal Comprehension#Supporting And Undermining#Literal Comprehension#Literal Comprehension#Reading For Function#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Paired Passages#Diction, idioms, and register (5)#Sentence and paragraph order (2)#Transitions (8)#Pronoun and noun agreement (14)#Pronoun and noun agreement (14)#Non-essential and essential clauses (9)#Add, revise, or delete (1)#Shorter is better (4)#Word pairs and comparisons (16)#Apostrophes (13)#Add, revise, or delete (1)#Sentences and fragments (6)#Shorter is better (4)#Punctuation (10,11,12)#Pronoun and noun agreement (14)#Add, revise, or delete (1)#Combining and separating sentences (7)#Diction, idioms, and register (5)#Infographics (3)#Add, revise, or delete (1)#Verb agreement and tense (15)#Add, revise, or delete (1)#Pronoun and noun agreement (14)#Sentence and paragraph order (2)#Add, revise, or delete (1)#Pronoun and noun agreement (14)#Diction, idioms, and register (5)#Add, revise, or delete (1)#Transitions (8)#Punctuation (10,11,12)#Verb agreement and tense (15)#Shorter is better (4)#Add, revise, or delete (1)#Add, revise, or delete (1)#Verb agreement and tense (15)#Shorter is better (4)#Transitions (8)#Punctuation (10,11,12)#Parallel structure (17)#Sentences and fragments (6)#Add, revise, or delete (1)#Add, revise, or delete (1)#Pronoun and noun agreement (14)#Add, revise, or delete (1)#Systems of equations (10)#Expressions (6)#Lines (14)#Lines (14)#Solving algebraic equations (8)#Circles (23)#Solving algebraic equations (8)#Matching coefficients (9)#Systems of equations (10)#Matching coefficients (9)#Quadratics (17)#Expressions (6)#Quadratics (17)#Inequalities (11)#Solving algebraic equations (8)#Volume (29)#Solving algebraic equations (8)#Functions (16)#Triangles (22)#Lines (14)#Solving algebraic equations (8)#Ratio and proportion (5)#Solving algebraic equations (8)#Solving algebraic equations (8)#Reading data (25)#Reading data (25)#Angles (21)#Lines (14)#Probability (26)#Ratio and proportion (5)#Ratio and proportion (5)#Ratio and proportion (5)#Inequalities (11)#Lines (14)#Lines (14)#Matching coefficients (9)#Systems of equations (10)#Exponential and linear growth (3)#Solving algebraic equations (8)#Lines (14)#Functions (16)#Mean, median, and mode (27)#Experiment design (28)#Functions (16)#Trigonometry (24)#Quadratics (17)#Synthetic division (18)#Quadratics (17)#Scatter plots (28)#Scatter plots (28)#Circles (23)#Lines (14)#Probability (26)#Reading data (25)#Percents (2)#Systems of equations (10)#Mean, median, and mode (27)#Literal Comprehension#Literal Comprehension#Literal Comprehension#Literal Comprehension#Literal Comprehension#Supporting And Undermining#Reading For Function#Reading For Function#Reading For Function#Fiction#Fiction#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Social science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Paired passages#Paired passages#Paired passages#Paired passages#Paired passages#Paired passages#Paired passages#Paired passages#Paired passages#Paired passages#Paired passages#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Natural science#Shorter is better (4)#Add, revise, or delete (1)#Non-essential and essential clauses (9)#Add, revise, or delete (1)#Add, revise, or delete (1)#Transitions (8)#Modification (18)#Shorter is better (4)#Parallel structure (17)#Punctuation (10,11,12)#Add, revise, or delete (1)#Parallel structure (17)#Add, revise, or delete (1)#Apostrophes (13)#Shorter is better (4)#Parallel structure (17)#Diction, idioms, and register (5)#Diction, idioms, and register (5)#Combining and separating sentences (7)#Word pairs and comparisons (16)#Add, revise, or delete (1)#Add, revise, or delete (1)#Verb agreement and tense (15)#Shorter is better (4)#Punctuation (10,11,12)#Diction, idioms, and register (5)#Infographics (3)#Parallel structure (17)#Infographics (3)#Add, revise, or delete (1)#Add, revise, or delete (1)#Pronoun and noun agreement (14)#Add, revise, or delete (1)#Add, revise, or delete (1)#Add, revise, or delete (1)#Apostrophes (13)#Verb agreement and tense (15)#Shorter is better (4)#Punctuation (10,11,12)#Non-essential and essential clauses (9)#Diction, idioms, and register (5)#Shorter is better (4)#Diction, idioms, and register (5)#Sentence and paragraph order (2)#Solving algebraic equations (8)#Constructing models (7)#Functions (16)#Reading data (25)#Expressions (6)#Quadratics (17)#Functions (16)#Angles (21)#Lines (14)#Quadratics (17)#Circles (23)#Triangles (22)#Quadratics (17)#Solving algebraic equations (8)#Systems of equations (10)#Solving algebraic equations (8)#Absolute value (20)#Exponential and linear growth (3)#Systems of equations (10)#Systems of equations (10)#Constructing models (7)#Constructing models (7)#Constructing models (7)#Solving algebraic equations (8)#Functions (16)#Expressions (6)#Experiment design (28)#Reading data (25)#Functions (16)#Experiment design (28)#Mean, median, and mode (27)#Percents (2)#Reading data (25)#Reading data (25)#Volume (29)#Exponential and linear growth (3)#Volume (29)#Probability (26)#Quadratics (17)#Mean, median, and mode (27)#Solving algebraic equations (8)#Functions (16)#Functions (16)#Scatter plots (28)#Systems of equations (10)#Exponential and linear growth (3)#Solving algebraic equations (8)#Quadratics (17)#Lines (14)#Angles (21)#Word problems (12)#Triangles (22)#Mean, median, and mode (27)#Lines (14)#Matching coefficients (9)#Quadratics (17)#Ratio and proportion (5)#Literal Comprehension"
      var SATDetailsArr = SATDetailsTotal.split('#').splice(((num-1)*154), ((num)*154))
      var SATCorrectAnswerTotal = "B-B-C-A-C-D-D-B-C-B-A-B-D-A-A-C-C-D-A-B-A-B-D-D-C-B-D-C-A-A-D-B-A-C-B-D-C-C-B-C-B-B-A-A-D-C-B-A-D-B-D-A-D-B-A-C-C-D-B-C-A-A-B-B-A-B-C-C-C-A-D-D-B-D-D-D-B-A-B-C-B-D-C-A-A-A-A-B-D-C-A-B-B-C-D-D-D-A-C-B-C-A-B-C-B-A-D-D-B-A-D-2-1600-7-0.8-100-B-C-D-C-D-D-C-D-A-B-A-C-C-C-A-C-B-A-B-D-C-B-B-A-D-B-C-C-D-D-4-107-0.625-96-6-3-1.02-6.11-A-B-C-A-D-B-D-D-B-D-D-D-A-B-C-A-C-C-A-B-C-C-A-B-C-B-D-D-D-B-C-B-B-A-D-B-B-D-C-A-B-D-C-B-D-C-A-B-D-D-D-A-B-B-A-A-D-D-B-D-B-B-C-B-D-C-C-C-B-B-A-D-D-B-A-B-B-A-D-A-C-C-D-B-D-D-A-D-A-B-C-D-D-C-C-D-C-B-A-A-C-D-A-C-B-C-C-B-D-A-D-3-19-12-6-0.25-C-B-A-C-C-B-D-D-A-B-B-D-D-C-A-B-C-C-B-C-D-B-A-A-A-D-D-B-B-A-14-7-11-105-15-32-3284-7500-B-C-A-A-C-A-A-B-B-D-A-C-D-B-B-C-B-B-A-A-D-A-A-B-C-C-B-B-D-D-B-C-C-D-C-A-D-C-A-D-A-C-C-D-D-C-B-B-A-B-D-D-A-B-C-C-A-B-A-D-C-C-B-A-C-D-B-C-C-B-D-C-D-A-A-D-B-A-D-B-B-B-D-B-C-D-B-C-D-C-C-B-D-A-D-D-C-D-D-B-C-C-C-A-A-A-B-A-B-A-D-1-2-105-370-0.6-C-B-C-C-B-A-D-C-B-D-B-D-D-A-A-B-B-B-C-B-C-B-C-D-D-C-C-D-A-A-4-58.6-9-0.625-50-750-7-60-C-D-D-C-A-A-B-D-D-A-C-D-A-B-A-C-C-A-B-A-D-A-C-C-B-C-A-B-B-D-D-D-D-A-D-B-D-D-D-A-B-C-B-A-D-A-D-C-D-C-B-A-B-B-B-A-D-B-D-B-C-A-C-D-B-D-C-C-A-C-A-C-B-D-C-C-B-D-C-A-D-B-C-B-A-C-C-B-D-A-C-B-D-D-A-B-A-A-A-B-C-B-D-A-D-D-C-C-B-A-B-9-0.6-5-0-25-B-C-C-B-B-A-A-D-B-A-A-C-C-D-B-A-D-C-A-C-C-B-B-C-B-C-D-D-B-D-1160-0.5-4.55-150-2.25-29-0.72-134-D-C-C-A-C-A-D-B-B-B-B-A-B-D-C-A-B-B-B-A-D-A-B-A-B-C-D-B-D-B-D-B-C-B-A-B-C-A-B-D-D-C-D-D-C-B-A-C-C-A-A-B-C-D-B-C-A-C-D-D-B-C-C-D-D-A-B-C-C-A-D-D-A-B-B-B-A-B-D-A-C-B-C-D-A-C-B-B-D-C-D-B-D-A-A-C-D-A-B-C-D-A-C-A-A-B-C-D-B-C-D-4-1.2-5.25-2-97-D-C-A-B-C-B-A-C-B-A-A-D-D-A-A-D-D-C-B-D-A-C-D-B-D-B-C-C-B-B-1492-9.66666666666667-7-9-13-80-43-6-C-B-D-A-C-D-B-B-A-D-B-D-C-C-B-A-D-A-A-C-C-B-A-D-C-A-D-A-A-B-B-D-B-A-D-D-A-D-C-C-B-D-C-A-C-D-B-B-D-B-D-B-D-A-D-B-C-B-A-C-D-B-C-D-A-B-C-B-A-C-D-D-A-A-B-A-B-B-C-D-B-C-A-C-D-B-B-D-A-D-D-C-A-D-A-C-B-B-C-A-D-A-C-B-C-D-B-D-A-A-D-1-3.75-30-1.5-0.166666666666667-A-C-A-D-B-C-D-D-B-B-B-D-A-B-D-B-B-C-C-C-D-B-C-D-B-C-A-A-B-D-10-31-97-5-1.25-2.6-30-8-D-A-A-B-D-B-C-B-D-D-D-A-A-D-D-C-D-B-D-C-B-C-A-D-C-A-C-B-C-D-B-D-B-C-B-B-C-A-C-A-A-C-D-D-C-A-C-A-A-B-A-D-D-A-B-A-C-C-B-D-A-D-A-D-C-A-C-D-B-C-B-D-C-C-C-A-C-D-B-D-C-B-C-C-C-A-B-C-D-C-D-B-A-D-C-A-C-C-B-D-A-C-B-C-B-B-D-B-D-A-D-8-30-4-8-6632-B-A-C-D-C-C-A-C-A-D-A-B-B-D-B-D-A-B-A-C-C-B-C-A-B-B-A-C-D-B-195-0.4-30-0.277777777777778-0-6-2.4-0.714285714285714-A-C-C-D-A-D-D-B-C-B-B-D-D-A-D-B-C-B-C-A-C-A-D-A-B-D-B-A-D-C-D-B-C-B-C-B-C-D-C-A-D-A-C-A-C-A-D-B-B-B-C-C-D-B-C-B-D-C-B-C-A-C-A-A-D-C-C-A-D-B-D-B-B-D-A-C-C-A-C-C-B-B-B-D-D-B-D-A-B-D-B-D-A-D-A-C-D-A-A-C-B-B-B-D-A-C-B-D-C-C-D-3-32-1.5-8-144-A-C-A-C-B-D-C-B-D-C-B-C-C-D-D-B-A-C-A-B-D-A-A-D-A-C-B-D-B-B-102-2-30-25.4-2-8-576-0.8-D-B-B-A-C-A-C-C-B-C-D-D-D-B-B-C-A-A-C-D-A-B-D-A-C-B-A-D-D-C-B-D-A-B-B-A-A-C-D-C-A-C-C-D-A-D-C-A-A-B-C-D-B-B-A-C-D-C-D-A-D-C-A-C-B-B-D-A-C-D-C-C-B-D-B-B-B-D-A-D-B-D-A-D-A-A-C-D-B-D-C-C-C-A-D-C-B-A-D-A-C-B-D-C-B-C-B-D-A-B-B-360-2-8-0.75-2.5-B-D-B-A-D-A-C-A-D-D-A-D-C-B-D-B-C-B-B-A-D-B-B-C-C-D-A-C-A-D-6-2-8-9-15-1.5-1.3-3-A-B-D-B-A-A-D-C-C-B-D-A-A-B-C-C-D-C-B-B-D-D-B-A-C-C-B-D-A-D-A-B-C-B-B-D-C-A-A-B-D-A-A-B-D-C-A-B-C-A-C-D-A-D-A-A-D-A-C-D-D-C-C-D-A-D-C-B-B-A-D-B-C-B-C-A-A-B-D-B-C-C-B-B-A-C-D-C-B-C-C-D-A-D-A-D-B-C-B-C-A-A-D-C-C-D-A-B-C-B-A-2200-5-1.21-2500-20-B-A-B-C-C-D-B-C-C-D-A-C-C-A-B-C-D-C-D-C-B-D-A-B-A-D-A-D-D-A-6-146-2500-34-2.5-6.25-293-9"
      var SATCorrectAnswerArr = SATCorrectAnswerTotal.split('-').splice(((num-1)*154), ((num)*154))


      var SATSections = "Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Reading,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Writing and Language,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math NC,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C,Math C"
      var SATSectionsArr = SATSections.split(',')
      var SATSectionNumber = "1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4"
      var SATSectionNumberArr = SATSectionNumber.split(',')
      var SATQuestion = "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38"
      var SATQuestionArr = SATQuestion.split(',')



     var ACTDetailsTotalPart1 = "Joining and separating sentences (3)# Non-essential and essential clauses (4)# Non-essential and essential clauses (4)# Punctuation (5,6,7)# Add, revise, or delete (18)# Verbs (8)# Non-essential and essential clauses (4)# Sentence and paragraph order (19)# Add, revise, or delete (18)# Verbs (8)# Diction, idioms, and register (16)# Diction, idioms, and register (16)# Modification (12)# Add, revise, or delete (18)# Evaluation of purpose (20)# Sentences and fragments (2)# Non-essential and essential clauses (4)# Sentences and fragments (2)# Shorter is better (15)# Add, revise, or delete (18)# Verbs (8)# Shorter is better (15)# Non-essential and essential clauses (4)# Transitions (17)# Verbs (8)# Add, revise, or delete (18)# Verbs (8)# Add, revise, or delete (18)# Joining and separating sentences (3)# Evaluation of purpose (20)# Modification (12)# Punctuation (5,6,7)# Joining and separating sentences (3)# Diction, idioms, and register (16)# Add, revise, or delete (18)# Verbs (8)# Diction, idioms, and register (16)# Add, revise, or delete (18)# Verbs (8)# Punctuation (5,6,7)# Modification (12)# Sentence and paragraph order (19)# Joining and separating sentences (3)# Add, revise, or delete (18)# Evaluation of purpose (20)# Sentences and fragments (2)# Add, revise, or delete (18)# Punctuation (5,6,7)# Shorter is better (15)# Shorter is better (15)# Diction, idioms, and register (16)# Pronouns (9)# Add, revise, or delete (18)# Joining and separating sentences (3)# Transitions (17)# Shorter is better (15)# Add, revise, or delete (18)# Add, revise, or delete (18)# Add, revise, or delete (18)# Sentence and paragraph order (19)# Non-essential and essential clauses (4)# Verbs (8)# Shorter is better (15)# Non-essential and essential clauses (4)# Add, revise, or delete (18)# Modification (12)# Transitions (17)# Punctuation (5,6,7)# Verbs (8)# Add, revise, or delete (18)# Diction, idioms, and register (16)# Transitions (17)# Transitions (17)# Apostrophes (1)# Joining and separating sentences (3)# Functions (11)# Angles (15)# Expressions (4)# Ratio and proportion (9)# Expressions (4)# Solving equations (3)# Probability (23)# Numbers and Operations (5)# Solving equations (3)# Coordinate geometry (14)# Probability (23)# Inequalities (21)# Expressions (4)# Percents (10)# Properties of numbers (6)# Functions (11)# Coordinate geometry (14)# Quadratics (13)# Data and statistics (24)# Systems of equations (20)# Percents (10)# Area and perimeter (18)# Angles (15)# Trigonometry (22)# Trigonometry (22)# Numbers and Operations (5)# Area and perimeter (18)# Exponents and radicals (2)# Inequalities (21)# Volume (19)# Triangles (16)# Coordinate geometry (14)# Quadratics (13)# Area and perimeter (18)# Data and statistics (24)# Logarithms (25)# Expressions (4)# Numbers and Operations (5)# Properties of numbers (6)# Properties of numbers (6)# Percents (10)# Percents (10)# Matrices (28)# Functions (11)# Numbers and Operations (5)# Expressions (4)# Area and perimeter (18)# Coordinate geometry (14)# Sequences (27)# Probability (23)# Percents (10)# Trigonometry (22)# Ellipses (28)# Trigonometry (22)# Absolute value (1)# Probability (23)# Exponents and radicals (2)# Area and perimeter (18)# Complex numbers (7)# Volume (19)# Reading For Function# Literal Comprehension# Literal Comprehension# Reading For Function# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# The Big Picture# Paired Passages# Literal Comprehension# Paired Passages# Reading For Function# Paired Passages# Literal Comprehension# Paired Passages# Paired Passages# Paired Passages# The Big Picture# The Big Picture# Literal Comprehension# The Big Picture# Pronouns And Compression Nouns# Literal Comprehension# Supporting And Undermining# Reading For Function# Literal Comprehension# Reading For Function# Reading For Function# Literal Comprehension# Literal Comprehension# Literal Comprehension# Graphs And Charts# Literal Comprehension# Reading For Function# Literal Comprehension# Literal Comprehension# Literal Comprehension# Equations# Generic Labels# Outside Knowledge# Generic Labels# Inference Question# Generic Labels# Inference Question# Cannot Be Determined# Inference Question# Inference Question# Inference Question# Cannot Be Determined# Inference Question# Outside Knowledge# Inference Question# Inference Question# Locators# Locators# Trends In Tables And Figures# Inference Question# Inference Question# Cannot Be Determined# Cannot Be Determined# Inference Question# Inference Question# Cannot Be Determined# Data Bridge# Cannot Be Determined# Data Full Sentence# Generic Labels# Data Full Sentence# Locators# Inference Question# Locators# Data Bridge# Outside Knowledge# Cannot Be Determined# Equations# Outside Knowledge# Inverse Trends# Non-essential and essential clauses (4)# Add, revise, or delete (18)# Verbs (8)# Add, revise, or delete (18)# Verbs (8)# Diction, idioms, and register (16)# Shorter is better (15)# Add, revise, or delete (18)# Add, revise, or delete (18)# Diction, idioms, and register (16)# Verbs (8)# Shorter is better (15)# Transitions (17)# Sentence and paragraph order (19)# Evaluation of purpose (20)# Punctuation (5,6,7)# Pronouns (9)# Transitions (17)# Punctuation (5,6,7)# Add, revise, or delete (18)# Modification (12)# Add, revise, or delete (18)# Sentences and fragments (2)# Verbs (8)# Pronouns (9)# Sentences and fragments (2)# Add, revise, or delete (18)# Diction, idioms, and register (16)# Transitions (17)# Shorter is better (15)# Non-essential and essential clauses (4)# Pronouns (9)# Apostrophes (1)# Transitions (17)# Verbs (8)# Sentences and fragments (2)# Shorter is better (15)# Punctuation (5,6,7)# Add, revise, or delete (18)# Sentences and fragments (2)# Pronouns (9)# Verbs (8)# Diction, idioms, and register (16)# Shorter is better (15)# Punctuation (5,6,7)# Verbs (8)# Non-essential and essential clauses (4)# Verbs (8)# Sentences and fragments (2)# Non-essential and essential clauses (4)# Sentence and paragraph order (19)# Transitions (17)# Verbs (8)# Pronouns (9)# Add, revise, or delete (18)# Adjectives and adverbs (10)# Diction, idioms, and register (16)# Apostrophes (1)# Add, revise, or delete (18)# Evaluation of purpose (20)# Sentences and fragments (2)# Non-essential and essential clauses (4)# Non-essential and essential clauses (4)# Add, revise, or delete (18)# Shorter is better (15)# Diction, idioms, and register (16)# Transitions (17)# Modification (12)# Non-essential and essential clauses (4)# Non-essential and essential clauses (4)# Shorter is better (15)# Diction, idioms, and register (16)# Diction, idioms, and register (16)# Add, revise, or delete (18)# Evaluation of purpose (20)# Absolute value (1)# Numbers and Operations (5)# Expressions (4)# Expressions (4)# Percents (10)# Triangles (16)# Triangles (16)# Systems of equations (20)# Triangles (16)# Numbers and Operations (5)# Systems of equations (20)# Functions (11)# Angles (15)# Probability (23)# Area and perimeter (18)# Area and perimeter (18)# Numbers and Operations (5)# Triangles (16)# Coordinate geometry (14)# Systems of equations (20)# Probability (23)# Data and statistics (24)# Quadratics (13)# Functions (11)# Probability (23)# Absolute value (1)# Matrices (28)# Area and perimeter (18)# Trigonometry (22)# Circles (17)# Circles (17)# Circles (17)# Angles (15)# Trigonometry (22)# Solving equations (3)# Exponents and radicals (2)# Properties of numbers (6)# Triangles (16)# Word problems (26)# Systems of equations (20)# Coordinate geometry (14)# Coordinate geometry (14)# Circles (17)# Circles (17)# Systems of equations (20)# Word problems (26)# Functions (11)# Area and perimeter (18)# Area and perimeter (18)# Sequences (27)# Trigonometry (22)# Volume (19)# Word problems (26)# Word problems (26)# Word problems (26)# Word problems (26)# Exponents and radicals (2)# Trigonometry (22)# Coordinate geometry (14)# Functions (11)# Supporting And Undermining# Reading For Function# Literal Comprehension# Reading For Function# Literal Comprehension# Literal Comprehension# Reading For Function# Literal Comprehension# The Big Picture# Literal Comprehension# Literal Comprehension# Literal Comprehension# Reading For Function# Reading For Function# Literal Comprehension# Literal Comprehension# Reading For Function# Graphs And Charts# Literal Comprehension# Literal Comprehension# The Big Picture# Paired Passages# Paired Passages# Literal Comprehension# Literal Comprehension# Paired Passages# Supporting And Undermining# Paired Passages# Paired Passages# Paired Passages# The Big Picture# Reading For Function# Literal Comprehension# Reading For Function# Supporting And Undermining# Graphs And Charts# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# Cannot Be Determined# Locators# Generic Labels# Locators# Cannot Be Determined# Inference Question# Data Bridge# Inference Question# Inference Question# Equations# Inference Question# Inference Question# Cannot Be Determined# Inference Question# Inverse Trends# Inference Question# Inference Question# Cannot Be Determined# Data Bridge# Inference Question# Cannot Be Determined# Cannot Be Determined# Generic Labels# Inference Question# Method Table# Cannot Be Determined# Data Bridge# Inference Question# Inference Question# Inference Question# Inference Question# Outside Knowledge# Inference Question# Inference Question# Method Table# Generic Labels# Cannot Be Determined# Data Bridge# Data Bridge# Outside Knowledge# Shorter is better (15)# Add, revise, or delete (18)# Joining and separating sentences (3)# Add, revise, or delete (18)# Add, revise, or delete (18)# Parallel structure (13)# Pronouns (9)# Punctuation (5,6,7)# Diction, idioms, and register (16)# Verbs (8)# Punctuation (5,6,7)# Shorter is better (15)# Sentence and paragraph order (19)# Evaluation of purpose (20)# Transitions (17)# Punctuation (5,6,7)# Diction, idioms, and register (16)# Sentence and paragraph order (19)# Non-essential and essential clauses (4)# Add, revise, or delete (18)# Modification (12)# Add, revise, or delete (18)# Add, revise, or delete (18)# Add, revise, or delete (18)# Add, revise, or delete (18)# Diction, idioms, and register (16)# Non-essential and essential clauses (4)# Verbs (8)# Add, revise, or delete (18)# Joining and separating sentences (3)# Transitions (17)# Add, revise, or delete (18)# Pronouns (9)# Sentences and fragments (2)# Diction, idioms, and register (16)# Sentences and fragments (2)# Shorter is better (15)# Verbs (8)# Add, revise, or delete (18)# Parallel structure (13)# Punctuation (5,6,7)# Diction, idioms, and register (16)# Non-essential and essential clauses (4)# Add, revise, or delete (18)# Non-essential and essential clauses (4)# Joining and separating sentences (3)# Non-essential and essential clauses (4)# Apostrophes (1)# Joining and separating sentences (3)# Verbs (8)# Joining and separating sentences (3)# Transitions (17)# Punctuation (5,6,7)# Shorter is better (15)# Pronouns (9)# Verbs (8)# Shorter is better (15)# Pronouns (9)# Add, revise, or delete (18)# Diction, idioms, and register (16)# Transitions (17)# Add, revise, or delete (18)# Add, revise, or delete (18)# Diction, idioms, and register (16)# Joining and separating sentences (3)# Verbs (8)# Verbs (8)# Add, revise, or delete (18)# Diction, idioms, and register (16)# Modification (12)# Sentence and paragraph order (19)# Pronouns (9)# Punctuation (5,6,7)# Pronouns (9)# Sentence and paragraph order (19)# Area and perimeter (18)# Probability (23)# Probability (23)# Numbers and Operations (5)# Volume (19)# Triangles (16)# Expressions (4)# Functions (11)# Percents (10)# Absolute value (1)# Numbers and Operations (5)# Numbers and Operations (5)# Triangles (16)# Numbers and Operations (5)# Ratio and proportion (9)# Numbers and Operations (5)# Solving equations (3)# Area and perimeter (18)# Inequalities (21)# Trigonometry (22)# Functions (11)# Systems of equations (20)# Data and statistics (24)# Area and perimeter (18)# Area and perimeter (18)# Probability (23)# Expressions (4)# Triangles (16)# Area and perimeter (18)# Coordinate geometry (14)# Coordinate geometry (14)# Coordinate geometry (14)# Exponents and radicals (2)# Ratio and proportion (9)# Logarithms (25)# Circles (17)# Expressions (4)# Probability (23)# Probability (23)# Probability (23)# Data and statistics (24)# Trigonometry (22)# Volume (19)# Trigonometry (22)# Numbers and Operations (5)# Angles (15)# Properties of numbers (6)# Triangles (16)# Probability (23)# Functions (11)# Probability (23)# Coordinate geometry (14)# Systems of equations (20)# Data and statistics (24)# Word problems (26)# Inequalities (21)# Word problems (26)# Complex numbers (7)# Functions (11)# Matrices (28)# Paired Passages# Pronouns And Compression Nouns# Reading For Function# Literal Comprehension# Paired Passages# Literal Comprehension# Paired Passages# Paired Passages# Paired Passages# Paired Passages# Pronouns And Compression Nouns# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# Reading For Function# Pronouns And Compression Nouns# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# Reading For Function# Reading For Function# Reading For Function# Supporting And Undermining# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# The Big Picture# Reading For Function# Literal Comprehension# Supporting And Undermining# Pronouns And Compression Nouns# Paired Passages# Literal Comprehension# Literal Comprehension# Reading For Function# Literal Comprehension# Inverse Trends# Data Full Sentence# Cannot Be Determined# Cannot Be Determined# Cannot Be Determined# Inference Question# Cannot Be Determined# Cannot Be Determined# Cannot Be Determined# Data Bridge# Cannot Be Determined# Inference Question# Inference Question# Method Table# Data Full Sentence# Locators# Cannot Be Determined# Inference Question# Inference Question# Inference Question# Method Table# Trends In Tables And Figures# Inference Question# Trends In Tables And Figures# Generic Labels# Data Full Sentence# Inference Question# Scatter Plot# Inference Question# Inference Question# Data Full Sentence# Trends In Tables And Figures# Locators# Data Bridge# Locators# Generic Labels# Inference Question# Data Bridge# Inference Question# Data Bridge# Add, revise, or delete (18)# Punctuation (5,6,7)# Apostrophes (1)# Joining and separating sentences (3)# Add, revise, or delete (18)# Pronouns (9)# Shorter is better (15)# Transitions (17)# Diction, idioms, and register (16)# Diction, idioms, and register (16)# Sentences and fragments (2)# Word pairs and comparisons (11)# Add, revise, or delete (18)# Diction, idioms, and register (16)# Add, revise, or delete (18)# Shorter is better (15)# Add, revise, or delete (18)# Verbs (8)# Joining and separating sentences (3)# Shorter is better (15)# Diction, idioms, and register (16)# Joining and separating sentences (3)# Sentence and paragraph order (19)# Add, revise, or delete (18)# Non-essential and essential clauses (4)# Verbs (8)# Pronouns (9)# Verbs (8)# Transitions (17)# Evaluation of purpose (20)# Pronouns (9)# Verbs (8)# Transitions (17)# Non-essential and essential clauses (4)# Shorter is better (15)# Modification (12)# Diction, idioms, and register (16)# Add, revise, or delete (18)# Joining and separating sentences (3)# Transitions (17)# Non-essential and essential clauses (4)# Verbs (8)# Parallel structure (13)# Add, revise, or delete (18)# Sentence and paragraph order (19)# Verbs (8)# Add, revise, or delete (18)# Punctuation (5,6,7)# Shorter is better (15)# Shorter is better (15)# Diction, idioms, and register (16)# Verbs (8)# Verbs (8)# Sentence and paragraph order (19)# Sentences and fragments (2)# Punctuation (5,6,7)# Add, revise, or delete (18)# Non-essential and essential clauses (4)# Sentence and paragraph order (19)# Evaluation of purpose (20)# Parallel structure (13)# Apostrophes (1)# Add, revise, or delete (18)# Sentences and fragments (2)# Modification (12)# Verbs (8)# Add, revise, or delete (18)# Punctuation (5,6,7)# Sentences and fragments (2)# Parallel structure (13)# Pronouns (9)# Add, revise, or delete (18)# Transitions (17)# Add, revise, or delete (18)# Add, revise, or delete (18)# Probability (23)# Probability (23)# Solving equations (3)# Absolute value (1)# Numbers and Operations (5)# Numbers and Operations (5)# Area and perimeter (18)# Area and perimeter (18)# Coordinate geometry (14)# Functions (11)# Inequalities (21)# Coordinate geometry (14)# Systems of equations (20)# Ratio and proportion (9)# Matrices (28)# Trigonometry (22)# Ratio and proportion (9)# Functions (11)# Angles (15)# Expressions (4)# Numbers and Operations (5)# Data and statistics (24)# Area and perimeter (18)# Area and perimeter (18)# Data and statistics (24)# Area and perimeter (18)# Area and perimeter (18)# Numbers and Operations (5)# Ratio and proportion (9)# Trigonometry (22)# Functions (11)# Triangles (16)# Coordinate geometry (14)# Numbers and Operations (5)# Angles (15)# Area and perimeter (18)# Solving equations (3)# Area and perimeter (18)# Data and statistics (24)# Word problems (26)# Expressions (4)# Probability (23)# Expressions (4)# Probability (23)# Trigonometry (22)# Logarithms (25)# Numbers and Operations (5)# Inequalities (21)# Trigonometry (22)# Data and statistics (24)# Angles (15)# Sequences (27)# Expressions (4)# Probability (23)# Expressions (4)# Data and statistics (24)# Area and perimeter (18)# Circles (17)# Percents (10)# Functions (11)# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# Reading For Function# Literal Comprehension# Literal Comprehension# Literal Comprehension# Graphs And Charts# Literal Comprehension# Reading For Function# Literal Comprehension# Literal Comprehension# Literal Comprehension# Pronouns And Compression Nouns# Reading For Function# Supporting And Undermining# Supporting And Undermining# Supporting And Undermining# Paired Passages# Reading For Function# Literal Comprehension# Pronouns And Compression Nouns# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# Pronouns And Compression Nouns# Pronouns And Compression Nouns# The Big Picture# Reading For Function# Literal Comprehension# The Big Picture# Literal Comprehension# Graphs And Charts# Graphs And Charts# Literal Comprehension# Literal Comprehension# Reading For Function# Locators# Locators# Scatter Plot# Data Bridge# Locators# Data Bridge# Extrapolation And Estimation# Trends In Tables And Figures# Locators# Equations# Generic Labels# Generic Labels# Data Bridge# Generic Labels# Generic Labels# Outside Knowledge# Extrapolation And Estimation# Inference Question# Generic Labels# Cannot Be Determined# Data Full Sentence# Outside Knowledge# Inference Question# Cannot Be Determined# Inference Question# Inference Question# Data Bridge# Data Bridge# Cannot Be Determined# Method Table# Cannot Be Determined# Cannot Be Determined# Data Full Sentence# Cannot Be Determined# Generic Labels# Inference Question# Inference Question# Cannot Be Determined# Cannot Be Determined# Method Table# Verbs (8)# Add, revise, or delete (18)# Punctuation (5,6,7)# Verbs (8)# Shorter is better (15)# Verbs (8)# Transitions (17)# Non-essential and essential clauses (4)# Diction, idioms, and register (16)# Verbs (8)# Non-essential and essential clauses (4)# Sentence and paragraph order (19)# Sentences and fragments (2)# Add, revise, or delete (18)# Sentence and paragraph order (19)# Sentences and fragments (2)# Shorter is better (15)# Punctuation (5,6,7)# Diction, idioms, and register (16)# Parallel structure (13)# Joining and separating sentences (3)# Verbs (8)# Diction, idioms, and register (16)# Shorter is better (15)# Add, revise, or delete (18)# Modification (12)# Diction, idioms, and register (16)# Non-essential and essential clauses (4)# Sentence and paragraph order (19)# Evaluation of purpose (20)# Verbs (8)# Diction, idioms, and register (16)# Punctuation (5,6,7)# Add, revise, or delete (18)# Punctuation (5,6,7)# Add, revise, or delete (18)# Sentences and fragments (2)# Shorter is better (15)# Modification (12)# Add, revise, or delete (18)# Modification (12)# Add, revise, or delete (18)# Transitions (17)# Diction, idioms, and register (16)# Add, revise, or delete (18)# Add, revise, or delete (18)# Add, revise, or delete (18)# Punctuation (5,6,7)# Verbs (8)# Pronouns (9)# Pronouns (9)# Add, revise, or delete (18)# Joining and separating sentences (3)# Verbs (8)# Punctuation (5,6,7)# Add, revise, or delete (18)# Add, revise, or delete (18)# Shorter is better (15)# Sentence and paragraph order (19)# Evaluation of purpose (20)# Punctuation (5,6,7)# Shorter is better (15)# Pronouns (9)# Add, revise, or delete (18)# Add, revise, or delete (18)# Add, revise, or delete (18)# Joining and separating sentences (3)# Diction, idioms, and register (16)# Parallel structure (13)# Diction, idioms, and register (16)# Sentences and fragments (2)# Pronouns (9)# Shorter is better (15)# Add, revise, or delete (18)# Evaluation of purpose (20)# Numbers and Operations (5)# Coordinate geometry (14)# Numbers and Operations (5)# Word problems (26)# Matrices (28)# Functions (11)# Data and statistics (24)# Triangles (16)# Ratio and proportion (9)# Numbers and Operations (5)# Coordinate geometry (14)# Angles (15)# Quadratics (13)# Volume (19)# Numbers and Operations (5)# Properties of numbers (6)# Coordinate geometry (14)# Probability (23)# Ratio and proportion (9)# Systems of equations (20)# Area and perimeter (18)# Probability (23)# Percents (10)# Coordinate geometry (14)# Area and perimeter (18)# Area and perimeter (18)# Numbers and Operations (5)# Numbers and Operations (5)# Coordinate geometry (14)# Numbers and Operations (5)# Numbers and Operations (5)# Numbers and Operations (5)# Coordinate geometry (14)# Data and statistics (24)# Expressions (4)# Functions (11)# Properties of numbers (6)# Numbers and Operations (5)# Properties of numbers (6)# Trigonometry (22)# Vectors (28)# Expressions (4)# Functions (11)# Circles (17)# Data and statistics (24)# Trigonometry (22)# Circles (17)# Absolute value (1)# Inequalities (21)# Ratio and proportion (9)# Ellipses (28)# Data and statistics (24)# Properties of numbers (6)# Numbers and Operations (5)# Ratio and proportion (9)# Exponents and radicals (2)# Percents (10)# Probability (23)# Trigonometry (22)# Area and perimeter (18)# The Big Picture# Literal Comprehension# Pronouns And Compression Nouns# Literal Comprehension# Literal Comprehension# Literal Comprehension# Reading For Function# Literal Comprehension# Reading For Function# Literal Comprehension# Literal Comprehension# Paired Passages# Paired Passages# Paired Passages# Reading For Function# Literal Comprehension# Paired Passages# Paired Passages# Paired Passages# Paired Passages# Reading For Function# Reading For Function# Reading For Function# Reading For Function# Pronouns And Compression Nouns# Pronouns And Compression Nouns# Reading For Function# Literal Comprehension# Reading For Function# Reading For Function# The Big Picture# Paired Passages# Supporting And Undermining# Literal Comprehension# Literal Comprehension# Reading For Function# Supporting And Undermining# Supporting And Undermining# Supporting And Undermining# Reading For Function# Data Full Sentence# Generic Labels# Generic Labels# Extrapolation And Estimation# Data Bridge# Outside Knowledge# Trends In Tables And Figures# Inference Question# Generic Labels# Trends In Tables And Figures# Locators# Generic Labels# Locators# Data Bridge# Locators# Data Bridge# Locators# Generic Labels# Equations# Cannot Be Determined# Generic Labels# Cannot Be Determined# Cannot Be Determined# Inference Question# Inverse Trends# Locators# Generic Labels# Cannot Be Determined# Outside Knowledge# Inference Question# Cannot Be Determined# Cannot Be Determined# Inference Question# Locators# Locators# Generic Labels# Locators# Inference Question# Inference Question# Inference Question# Diction, idioms, and register (16)# Verbs (8)# Diction, idioms, and register (16)# Non-essential and essential clauses (4)# Adjectives and adverbs (10)# Add, revise, or delete (18)# Transitions (17)# Pronouns (9)# Add, revise, or delete (18)# Sentences and fragments (2)# Pronouns (9)# Pronouns (9)# Diction, idioms, and register (16)# Verbs (8)# Add, revise, or delete (18)# Punctuation (5,6,7)# Parallel structure (13)# Add, revise, or delete (18)# Add, revise, or delete (18)# Add, revise, or delete (18)# Adjectives and adverbs (10)# Modification (12)# Diction, idioms, and register (16)# Verbs (8)# Transitions (17)# Pronouns (9)# Diction, idioms, and register (16)# Joining and separating sentences (3)# Shorter is better (15)# Evaluation of purpose (20)# Shorter is better (15)# Non-essential and essential clauses (4)# Non-essential and essential clauses (4)# Add, revise, or delete (18)# Transitions (17)# Transitions (17)# Add, revise, or delete (18)# Punctuation (5,6,7)# Pronouns (9)# Verbs (8)# Add, revise, or delete (18)# Non-essential and essential clauses (4)# Diction, idioms, and register (16)# Add, revise, or delete (18)# Evaluation of purpose (20)# Pronouns (9)# Shorter is better (15)# Add, revise, or delete (18)# Punctuation (5,6,7)# Joining and separating sentences (3)# Shorter is better (15)# Non-essential and essential clauses (4)# Verbs (8)# Add, revise, or delete (18)# Modification (12)# Add, revise, or delete (18)# Add, revise, or delete (18)# Joining and separating sentences (3)# Punctuation (5,6,7)# Sentence and paragraph order (19)# Word pairs and comparisons (11)# Joining and separating sentences (3)# Transitions (17)# Non-essential and essential clauses (4)# Pronouns (9)# Transitions (17)# Add, revise, or delete (18)# Shorter is better (15)# Modification (12)# Shorter is better (15)# Punctuation (5,6,7)# Sentences and fragments (2)# Joining and separating sentences (3)# Diction, idioms, and register (16)# Add, revise, or delete (18)# Angles (15)# Data and statistics (24)# Properties of numbers (6)# Solving equations (3)# Probability (23)# Ratio and proportion (9)# Word problems (26)# Word problems (26)# Quadratics (13)# Area and perimeter (18)# Numbers and Operations (5)# Numbers and Operations (5)# Triangles (16)# Functions (11)# Area and perimeter (18)# Numbers and Operations (5)# Word problems (26)# Functions (11)# Data and statistics (24)# Numbers and Operations (5)# Coordinate geometry (14)# Functions (11)# Triangles (16)# Coordinate geometry (14)# Area and perimeter (18)# Word problems (26)# Ratio and proportion (9)# Word problems (26)# Area and perimeter (18)# Matrices (28)# Numbers and Operations (5)# Probability (23)# Trigonometry (22)# Expressions (4)# Angles (15)# Solving equations (3)# Coordinate geometry (14)# Triangles (16)# Quadratics (13)# Circles (17)# Exponents and radicals (2)# Logarithms (25)# Coordinate geometry (14)# Word problems (26)# Quadratics (13)# Expressions (4)# Ratio and proportion (9)# Inequalities (21)# Ratio and proportion (9)# Volume (19)# Trigonometry (22)# Data and statistics (24)# Exponents and radicals (2)# Probability (23)# Word problems (26)# Probability (23)# Probability (23)# Properties of numbers (6)# Quadratics (13)# Trigonometry (22)# Literal Comprehension# Literal Comprehension# Literal Comprehension# Paired Passages# Literal Comprehension# Literal Comprehension# Reading For Function# Paired Passages# Paired Passages# Paired Passages# Literal Comprehension# Literal Comprehension# Pronouns And Compression Nouns# Literal Comprehension# Literal Comprehension# Literal Comprehension# Supporting And Undermining# Graphs And Charts# Literal Comprehension# Literal Comprehension# Reading For Function# Paired Passages# Reading For Function# Literal Comprehension# Supporting And Undermining# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# Reading For Function# The Big Picture# Reading For Function# Supporting And Undermining# Literal Comprehension# Reading For Function# Literal Comprehension# The Big Picture# The Big Picture# Literal Comprehension# Literal Comprehension# Cannot Be Determined# Trends In Tables And Figures# Inference Question# Inference Question# Inference Question# Data Full Sentence# Data Full Sentence# Cannot Be Determined# Locators# Cannot Be Determined# Cannot Be Determined# Data Bridge# Method Table# Trends In Tables And Figures# Method Table# Method Table# Cannot Be Determined# Extrapolation And Estimation# Extrapolation And Estimation# Generic Labels# Mixing# Locators# Data Full Sentence# Data Bridge# Mixing# Generic Labels# Inference Question# Extrapolation And Estimation# Extrapolation And Estimation# Extrapolation And Estimation# Extrapolation And Estimation# Inference Question# Data Bridge# Inference Question# Generic Labels# Inference Question# Locators# Inference Question# Inference Question# Inference Question# Add, revise, or delete (18)# Verbs (8)# Transitions (17)# Pronouns (9)# Joining and separating sentences (3)# Shorter is better (15)# Adjectives and adverbs (10)# Transitions (17)# Sentence and paragraph order (19)# Punctuation (5,6,7)# Add, revise, or delete (18)# Non-essential and essential clauses (4)# Verbs (8)# Add, revise, or delete (18)# Non-essential and essential clauses (4)# Verbs (8)# Diction, idioms, and register (16)# Add, revise, or delete (18)# Add, revise, or delete (18)# Verbs (8)# Diction, idioms, and register (16)# Modification (12)# Shorter is better (15)# Joining and separating sentences (3)# Pronouns (9)# Diction, idioms, and register (16)# Verbs (8)# Add, revise, or delete (18)# Evaluation of purpose (20)# Shorter is better (15)# Joining and separating sentences (3)# Add, revise, or delete (18)# Punctuation (5,6,7)# Add, revise, or delete (18)# Diction, idioms, and register (16)# Diction, idioms, and register (16)# Joining and separating sentences (3)# Add, revise, or delete (18)# Non-essential and essential clauses (4)# Modification (12)# Pronouns (9)# Diction, idioms, and register (16)# Diction, idioms, and register (16)# Evaluation of purpose (20)# Diction, idioms, and register (16)# Sentence and paragraph order (19)# Non-essential and essential clauses (4)# Verbs (8)# Transitions (17)# Add, revise, or delete (18)# Modification (12)# Punctuation (5,6,7)# Joining and separating sentences (3)# Non-essential and essential clauses (4)# Shorter is better (15)# Diction, idioms, and register (16)# Diction, idioms, and register (16)# Transitions (17)# Punctuation (5,6,7)# Verbs (8)# Apostrophes (1)# Modification (12)# Non-essential and essential clauses (4)# Sentence and paragraph order (19)# Modification (12)# Add, revise, or delete (18)# Diction, idioms, and register (16)# Word pairs and comparisons (11)# Punctuation (5,6,7)# Diction, idioms, and register (16)# Add, revise, or delete (18)# Transitions (17)# Punctuation (5,6,7)# Evaluation of purpose (20)# Evaluation of purpose (20)# Percents (10)# Expressions (4)# Angles (15)# Solving equations (3)# Triangles (16)# Probability (23)# Word problems (26)# Probability (23)# Numbers and Operations (5)# Area and perimeter (18)# Solving equations (3)# Systems of equations (20)# Expressions (4)# Expressions (4)# Solving equations (3)# Data and statistics (24)# Probability (23)# Coordinate geometry (14)# Coordinate geometry (14)# Coordinate geometry (14)# Probability (23)# Data and statistics (24)# Functions (11)# Volume (19)# Functions (11)"
      var ACTDetailsTotalPart2 = "Trigonometry (22)# Solving equations (3)# Expressions (4)# Circles (17)# Area and perimeter (18)# Coordinate geometry (14)# Trigonometry (22)# Area and perimeter (18)# Triangles (16)# Coordinate geometry (14)# Properties of numbers (6)# Data and statistics (24)# Numbers and Operations (5)# Word problems (26)# Solving equations (3)# Circles (17)# Circles (17)# Properties of numbers (6)# Exponents and radicals (2)# Area and perimeter (18)# Numbers and Operations (5)# Sequences (27)# Probability (23)# Quadratics (13)# Trigonometry (22)# Systems of equations (20)# Word problems (26)# Trigonometry (22)# Properties of numbers (6)# Inequalities (21)# Functions (11)# Expressions (4)# Data and statistics (24)# Functions (11)# Matrices (28)# Literal Comprehension# Literal Comprehension# Paired Passages# Literal Comprehension# Reading For Function# Literal Comprehension# Literal Comprehension# Literal Comprehension# Supporting And Undermining# Reading For Function# The Big Picture# Graphs And Charts# Literal Comprehension# The Big Picture# Reading For Function# Supporting And Undermining# Literal Comprehension# Literal Comprehension# Literal Comprehension# Supporting And Undermining# The Big Picture# Reading For Function# Reading For Function# Paired Passages# Paired Passages# Paired Passages# Paired Passages# Paired Passages# Paired Passages# Paired Passages# Literal Comprehension# Literal Comprehension# Literal Comprehension# Graphs And Charts# Literal Comprehension# Graphs And Charts# Literal Comprehension# Literal Comprehension# Pronouns And Compression Nouns# Reading For Function# Inference Question# Inference Question# Generic Labels# Generic Labels# Cannot Be Determined# Cannot Be Determined# Scatter Plot# Inference Question# Scatter Plot# Data Full Sentence# Cannot Be Determined# Inference Question# Data Full Sentence# Extrapolation And Estimation# Extrapolation And Estimation# Inference Question# Cannot Be Determined# Trends In Tables And Figures# Inference Question# Generic Labels# Data Full Sentence# Cannot Be Determined# Inference Question# Inference Question# Outside Knowledge# Cannot Be Determined# Trends In Tables And Figures# Cannot Be Determined# Outside Knowledge# Inference Question# Extrapolation And Estimation# Cannot Be Determined# Equations# Inference Question# Outside Knowledge# Inference Question# Inference Question# Inference Question# Cannot Be Determined# Inference Question# Non-essential and essential clauses (4)# Joining and separating sentences (3)# Punctuation (5,6,7)# Punctuation (5,6,7)# Shorter is better (15)# Shorter is better (15)# Non-essential and essential clauses (4)# Modification (12)# Diction, idioms, and register (16)# Verbs (8)# Verbs (8)# Joining and separating sentences (3)# Add, revise, or delete (18)# Verbs (8)# Sentence and paragraph order (19)# Transitions (17)# Pronouns (9)# Verbs (8)# Non-essential and essential clauses (4)# Add, revise, or delete (18)# Verbs (8)# Sentence and paragraph order (19)# Shorter is better (15)# Diction, idioms, and register (16)# Shorter is better (15)# Verbs (8)# Joining and separating sentences (3)# Transitions (17)# Diction, idioms, and register (16)# Sentence and paragraph order (19)# Diction, idioms, and register (16)# Non-essential and essential clauses (4)# Add, revise, or delete (18)# Punctuation (5,6,7)# Transitions (17)# Shorter is better (15)# Add, revise, or delete (18)# Shorter is better (15)# Transitions (17)# Pronouns (9)# Sentences and fragments (2)# Diction, idioms, and register (16)# Diction, idioms, and register (16)# Add, revise, or delete (18)# Evaluation of purpose (20)# Joining and separating sentences (3)# Diction, idioms, and register (16)# Verbs (8)# Add, revise, or delete (18)# Pronouns (9)# Add, revise, or delete (18)# Modification (12)# Add, revise, or delete (18)# Add, revise, or delete (18)# Punctuation (5,6,7)# Punctuation (5,6,7)# Joining and separating sentences (3)# Non-essential and essential clauses (4)# Pronouns (9)# Add, revise, or delete (18)# Verbs (8)# Add, revise, or delete (18)# Sentence and paragraph order (19)# Punctuation (5,6,7)# Add, revise, or delete (18)# Add, revise, or delete (18)# Non-essential and essential clauses (4)# Shorter is better (15)# Non-essential and essential clauses (4)# Transitions (17)# Pronouns (9)# Diction, idioms, and register (16)# Add, revise, or delete (18)# Sentence and paragraph order (19)# Evaluation of purpose (20)# Solving equations (3)# Numbers and Operations (5)# Word problems (26)# Expressions (4)# Sequences (27)# Numbers and Operations (5)# Numbers and Operations (5)# Triangles (16)# Numbers and Operations (5)# Sequences (27)# Expressions (4)# Properties of numbers (6)# Angles (15)# Area and perimeter (18)# Coordinate geometry (14)# Quadratics (13)# Area and perimeter (18)# Expressions (4)# Percents (10)# Trigonometry (22)# Numbers and Operations (5)# Angles (15)# Data and statistics (24)# Probability (23)# Trigonometry (22)# Data and statistics (24)# Probability (23)# Percents (10)# Systems of equations (20)# Matrices (28)# Numbers and Operations (5)# Expressions (4)# Vectors (28)# Numbers and Operations (5)# Quadratics (13)# Properties of numbers (6)# Data and statistics (24)# Quadratics (13)# Angles (15)# Functions (11)# Area and perimeter (18)# Logarithms (25)# Area and perimeter (18)# Trigonometry (22)# Percents (10)# Data and statistics (24)# Probability (23)# Area and perimeter (18)# Probability (23)# Probability (23)# Data and statistics (24)# Data and statistics (24)# Probability (23)# Word problems (26)# Properties of numbers (6)# Ellipses (28)# Properties of numbers (6)# Numbers and Operations (5)# Expressions (4)# Expressions (4)# Literal Comprehension# The Big Picture# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# Reading For Function# Reading For Function# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# Reading For Function# Literal Comprehension# Literal Comprehension# Supporting And Undermining# Paired Passages# The Big Picture# The Big Picture# Literal Comprehension# Paired Passages# Paired Passages# Reading For Function# The Big Picture# Literal Comprehension# Paired Passages# The Big Picture# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# Inference Question# Inference Question# Cannot Be Determined# Inference Question# Equations# Inference Question# Inference Question# Inference Question# Locators# Trends In Tables And Figures# Equations# Generic Labels# Trends In Tables And Figures# Data Full Sentence# Cannot Be Determined# Trends In Tables And Figures# Trends In Tables And Figures# Generic Labels# Generic Labels# Inverse Trends# Cannot Be Determined# Generic Labels# Extrapolation And Estimation# Inference Question# Data Full Sentence# Generic Labels# Outside Knowledge# Cannot Be Determined# Outside Knowledge# Inference Question# Generic Labels# Cannot Be Determined# Inference Question# Inference Question# Trends In Tables And Figures# Data Bridge# Locators# Inference Question# Data Bridge# Data Bridge# Shorter is better (15)# Pronouns (9)# Add, revise, or delete (18)# Non-essential and essential clauses (4)# Sentences and fragments (2)# Add, revise, or delete (18)# Non-essential and essential clauses (4)# Shorter is better (15)# Joining and separating sentences (3)# Sentences and fragments (2)# Diction, idioms, and register (16)# Add, revise, or delete (18)# Joining and separating sentences (3)# Apostrophes (1)# Sentence and paragraph order (19)# Add, revise, or delete (18)# Verbs (8)# Shorter is better (15)# Joining and separating sentences (3)# Diction, idioms, and register (16)# Transitions (17)# Add, revise, or delete (18)# Joining and separating sentences (3)# Add, revise, or delete (18)# Diction, idioms, and register (16)# Modification (12)# Punctuation (5,6,7)# Diction, idioms, and register (16)# Parallel structure (13)# Sentence and paragraph order (19)# Add, revise, or delete (18)# Non-essential and essential clauses (4)# Modification (12)# Joining and separating sentences (3)# Transitions (17)# Punctuation (5,6,7)# Punctuation (5,6,7)# Sentence and paragraph order (19)# Joining and separating sentences (3)# Add, revise, or delete (18)# Pronouns (9)# Verbs (8)# Joining and separating sentences (3)# Shorter is better (15)# Sentence and paragraph order (19)# Sentences and fragments (2)# Verbs (8)# Add, revise, or delete (18)# Apostrophes (1)# Transitions (17)# Non-essential and essential clauses (4)# Diction, idioms, and register (16)# Apostrophes (1)# Sentence and paragraph order (19)# Transitions (17)# Add, revise, or delete (18)# Joining and separating sentences (3)# Add, revise, or delete (18)# Transitions (17)# Evaluation of purpose (20)# Pronouns (9)# Shorter is better (15)# Non-essential and essential clauses (4)# Add, revise, or delete (18)# Verbs (8)# Add, revise, or delete (18)# Pronouns (9)# Diction, idioms, and register (16)# Modification (12)# Verbs (8)# Modification (12)# Verbs (8)# Punctuation (5,6,7)# Sentence and paragraph order (19)# Evaluation of purpose (20)# Ratio and proportion (9)# Probability (23)# Exponents and radicals (2)# Functions (11)# Probability (23)# Word problems (26)# Angles (15)# Solving equations (3)# Coordinate geometry (14)# Data and statistics (24)# Coordinate geometry (14)# Word problems (26)# Systems of equations (20)# Data and statistics (24)# Absolute value (1)# Exponents and radicals (2)# Coordinate geometry (14)# Properties of numbers (6)# Triangles (16)# Triangles (16)# Area and perimeter (18)# Area and perimeter (18)# Percents (10)# Word problems (26)# Numbers and Operations (5)# Coordinate geometry (14)# Expressions (4)# Data and statistics (24)# Numbers and Operations (5)# Word problems (26)# Properties of numbers (6)# Area and perimeter (18)# Area and perimeter (18)# Percents (10)# Word problems (26)# Word problems (26)# Probability (23)# Properties of numbers (6)# Trigonometry (22)# Absolute value (1)# Data and statistics (24)# Logarithms (25)# Percents (10)# Absolute value (1)# Volume (19)# Volume (19)# Area and perimeter (18)# Data and statistics (24)# Functions (11)# Systems of equations (20)# Data and statistics (24)# Systems of equations (20)# Sequences (27)# Trigonometry (22)# Trigonometry (22)# Probability (23)# Matrices (28)# Complex numbers (7)# Trigonometry (22)# Angles (15)# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# Pronouns And Compression Nouns# Reading For Function# Literal Comprehension# Literal Comprehension# Literal Comprehension# Reading For Function# The Big Picture# Literal Comprehension# Pronouns And Compression Nouns# The Big Picture# Literal Comprehension# Literal Comprehension# Literal Comprehension# Supporting And Undermining# Literal Comprehension# Literal Comprehension# Literal Comprehension# Reading For Function# Paired Passages# Paired Passages# Paired Passages# Paired Passages# Paired Passages# Paired Passages# Paired Passages# Paired Passages# The Big Picture# Supporting And Undermining# Literal Comprehension# Supporting And Undermining# Graphs And Charts# The Big Picture# Literal Comprehension# The Big Picture# Literal Comprehension# Literal Comprehension# Scatter Plot# Inference Question# Inference Question# Extrapolation And Estimation# Locators# Inference Question# Trends In Tables And Figures# Data Bridge# Locators# Locators# Data Bridge# Generic Labels# Cannot Be Determined# Inference Question# Generic Labels# Outside Knowledge# Cannot Be Determined# Trends In Tables And Figures# Mixing# Data Bridge# Trends In Tables And Figures# Inference Question# Data Bridge# Extrapolation And Estimation# Cannot Be Determined# Inference Question# Locators# Trends In Tables And Figures# Cannot Be Determined# Cannot Be Determined# Extrapolation And Estimation# Cannot Be Determined# Cannot Be Determined# Cannot Be Determined# Inference Question# Inference Question# Trends In Tables And Figures# Generic Labels# Inverse Trends# Data Bridge# Verbs (8)# Non-essential and essential clauses (4)# Modification (12)# Diction, idioms, and register (16)# Punctuation (5,6,7)# Punctuation (5,6,7)# Non-essential and essential clauses (4)# Add, revise, or delete (18)# Modification (12)# Modification (12)# Pronouns (9)# Punctuation (5,6,7)# Shorter is better (15)# Add, revise, or delete (18)# Evaluation of purpose (20)# Add, revise, or delete (18)# Shorter is better (15)# Shorter is better (15)# Add, revise, or delete (18)# Shorter is better (15)# Pronouns (9)# Add, revise, or delete (18)# Punctuation (5,6,7)# Punctuation (5,6,7)# Verbs (8)# Transitions (17)# Punctuation (5,6,7)# Add, revise, or delete (18)# Punctuation (5,6,7)# Add, revise, or delete (18)# Modification (12)# Punctuation (5,6,7)# Add, revise, or delete (18)# Joining and separating sentences (3)# Add, revise, or delete (18)# Pronouns (9)# Verbs (8)# Punctuation (5,6,7)# Add, revise, or delete (18)# Sentence and paragraph order (19)# Shorter is better (15)# Transitions (17)# Transitions (17)# Add, revise, or delete (18)# Evaluation of purpose (20)# Shorter is better (15)# Add, revise, or delete (18)# Shorter is better (15)# Modification (12)# Verbs (8)# Diction, idioms, and register (16)# Verbs (8)# Punctuation (5,6,7)# Verbs (8)# Non-essential and essential clauses (4)# Shorter is better (15)# Shorter is better (15)# Transitions (17)# Shorter is better (15)# Add, revise, or delete (18)# Pronouns (9)# Punctuation (5,6,7)# Diction, idioms, and register (16)# Verbs (8)# Add, revise, or delete (18)# Sentence and paragraph order (19)# Pronouns (9)# Shorter is better (15)# Transitions (17)# Joining and separating sentences (3)# Add, revise, or delete (18)# Pronouns (9)# Non-essential and essential clauses (4)# Non-essential and essential clauses (4)# Evaluation of purpose (20)# Probability (23)# Triangles (16)# Angles (15)# Probability (23)# Absolute value (1)# Systems of equations (20)# Ratio and proportion (9)# Solving equations (3)# Numbers and Operations (5)# Ratio and proportion (9)# Solving equations (3)# Coordinate geometry (14)# Quadratics (13)# Trigonometry (22)# Area and perimeter (18)# Angles (15)# Sequences (27)# Coordinate geometry (14)# Area and perimeter (18)# Probability (23)# Coordinate geometry (14)# Exponents and radicals (2)# Coordinate geometry (14)# Solving equations (3)# Area and perimeter (18)# Angles (15)# Area and perimeter (18)# Numbers and Operations (5)# Solving equations (3)# Probability (23)# Numbers and Operations (5)# Exponents and radicals (2)# Triangles (16)# Trigonometry (22)# Angles (15)# Volume (19)# Solving equations (3)# Angles (15)# Area and perimeter (18)# Percents (10)# Sequences (27)# Trigonometry (22)# Exponents and radicals (2)# Data and statistics (24)# Absolute value (1)# Functions (11)# Circles (17)# Properties of numbers (6)# Area and perimeter (18)# Numbers and Operations (5)# Coordinate geometry (14)# Functions (11)# Probability (23)# Logarithms (25)# Matrices (28)# Ratio and proportion (9)# Coordinate geometry (14)# Absolute value (1)# Data and statistics (24)# Circles (17)# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# Reading For Function# Literal Comprehension# Literal Comprehension# Literal Comprehension# Paired Passages# Literal Comprehension# Literal Comprehension# Pronouns And Compression Nouns# Literal Comprehension# Paired Passages# Paired Passages# Paired Passages# Supporting And Undermining# Literal Comprehension# Reading For Function# Literal Comprehension# Literal Comprehension# Literal Comprehension# Literal Comprehension# Reading For Function# Literal Comprehension# Literal Comprehension# Reading For Function# The Big Picture# Pronouns And Compression Nouns# Pronouns And Compression Nouns# Supporting And Undermining# Graphs And Charts# Graphs And Charts# Reading For Function# Graphs And Charts# Graphs And Charts# Literal Comprehension# Scatter Plot# Data Bridge# Trends In Tables And Figures# Generic Labels# Inference Question# Trends In Tables And Figures# Generic Labels# Generic Labels# Extrapolation And Estimation# Cannot Be Determined# Cannot Be Determined# Inference Question# Inverse Trends# Data Bridge# Locators# Data Full Sentence# Generic Labels# Extrapolation And Estimation# Outside Knowledge# Extrapolation And Estimation# Data Bridge# Data Full Sentence# Data Bridge# Generic Labels# Scatter Plot# Trends In Tables And Figures# Data Bridge# Inference Question# Inference Question# Method Table# Outside Knowledge# Inference Question# Outside Knowledge# Inference Question# Extrapolation And Estimation# Generic Labels# Trends In Tables And Figures# Scatter Plot# Method Table# Locators"
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
    
  
      var Arr = [[{ value: "Test" }, { value: "Section" },{ value: "Question" }, { value: "Subject" },{ value: "Question Subject" },{ value: "Student answer" },{value:'Correct Answer'},{ value: "Match" }]]
      var NumberOfOldTests = 10;
      if(CurrTest == 'SAT'){  
        if(showBluebookTest){
          NumberOfOldTests = 2;
          var BluebookDetails = PullBluebook()
          var TempArr = []
          for(var i =0; i<BluebookDetails[0].length; i++){
            TempArr = [{ value: BluebookDetails[0][i]  }, { value: BluebookDetails[6][i] },{ value: BluebookDetails[2][i]}, { value: BluebookDetails[3][i]},{ value: BluebookDetails[4][i] },{ value: "" },{value: BluebookDetails[5][i]},{ value: "=(F"+(i+2).toString()+" = G"+(i+2).toString()+ ")" }]
            Arr.push(TempArr)
          }
          var LinearDetails = PullNewLinearTests()
          var TempArr = []
          for(var i =0; i<LinearDetails[0].length-33; i++){
            TempArr = [{ value: BluebookDetails[0][i]  }, { value: LinearDetails[6][i] },{ value: LinearDetails[2][i]}, { value: LinearDetails[3][i]},{ value: LinearDetails[4][i] },{ value: "" },{value: LinearDetails[5][i]},{ value: "=(F"+(i+2).toString()+" = G"+(i+2).toString()+ ")" }]
            Arr.push(TempArr)
          }
        }
        else{
          NumberOfOldTests = 6
          var LinearDetails = PullNewLinearTests()
          var TempArr = []
          for(var i =0; i<LinearDetails[0].length-33; i++){
            TempArr = [{ value: BluebookDetails[0][i]  }, { value: LinearDetails[1][i] },{ value: LinearDetails[2][i]}, { value: LinearDetails[3][i]},{ value: LinearDetails[4][i] },{ value: "" },{value: LinearDetails[5][i]},{ value: "=(F"+(i+2).toString()+" = G"+(i+2).toString()+ ")" }]
            Arr.push(TempArr)
          }
        }
      }
    
      if(CurrTest == 'SAT'){
        var TempArr = []
        for(var i =0; i<SATDetailsArr.length - (10-NumberOfOldTests); i++){
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
    console.log('err', e)
  }
  }




  const[PullStudentDataDone, setPullStudentDataDone] = useState(false)

  function PullStudentData(s , index, num = 0, Test = 0){
   
    var TempD = SATCorrectAnswerBank(index, Test)
  


    if(Test == 0){
      Test = CurrentTest
    }

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

    console.log("pre 99")

    const unsub = onSnapshot(x, (querySnapshot) => {
      

      console.log('In xxx')
      switch(index) {
       
        case 99: case 100:
 
          var ArrStringTotal = ['Student answer']
       
          let ArrStrings = []; // to store the ArrStrings for use in the second part

          for(let i = 1; i <= 10; i++){
              try{
                  let fieldName = 'Test' + i;
                  let arrString;
          
                  if(Test == 'SAT'){
                      arrString = querySnapshot.docs.map(d => 
                          d._document.data.value.mapValue.fields[fieldName].stringValue);
                          ArrStringTotal = ArrStringTotal.concat(CorrectTestLength(arrString[0]));
                          arrString = CorrectTestLength(arrString[0]);
                  }
                  else if(Test == 'ACT'){
                      arrString = querySnapshot.docs.map(d => 
                          d._document.data.value.mapValue.fields[fieldName + 'ACT'].stringValue);
                          ArrStringTotal = ArrStringTotal.concat(CorrectTestLengthACT(arrString[0]));
                          arrString = CorrectTestLengthACT(arrString[0]);
                  }
          
                 
          
                  ArrStrings.push(arrString); // Store the arrString for later use
          
                  // Further code block processing using arrString if needed
          
              } catch(err) {
                  console.error(`Error processing }:`, err);
                  // handle error e.g., logging, setting a default value, etc.
              }
          }
  
          if(index == 99){
            function removeFalseValuesAfterFirstTrue(arr) {
              let trueFound = false;
              // Check if the array contains any true values
              const containsTrue = arr.includes(true);
          
              // If the array contains only false, return an empty array
              if (!containsTrue) {
                  return [];
              }
          
              return arr.filter(value => {
                  if (value === true) trueFound = true;
                  return trueFound ? value !== false : true;
              });
              }
              setDataTotalRaw(ArrStringTotal)
              var IncludesAnswers = ['A', 'B','C','D','X','a','b','c','d','x']
              //setStandardizedTestsDone
            
              var TempPushArr = [];
              
              ArrStrings.forEach(arrStringArray => {
                // Flag to indicate if an exact answer is found in this arrStringArray
                let containsExactAnswer = false;
            
                // Iterate over each element in the arrStringArray
                arrStringArray.forEach(arrString => {
                    var tempArrString = arrString; // Adjust for case sensitivity
            
                    // Check if the cleaned string is in IncludesAnswers
           
                    if (IncludesAnswers.includes(tempArrString)) {
                        containsExactAnswer = true;
                    }
                });
            
                // Push true if an exact match is found in any element of the arrStringArray, otherwise false
                TempPushArr.push(containsExactAnswer);
              });
              //setStandardizedTestsDone(removeFalseValuesAfterFirstTrue(TempPushArr));
              setStandardizedTestDoneConst(removeFalseValuesAfterFirstTrue(TempPushArr))

        
            }
            break;
        default:
          // code block
          var ArrString = ''
      }

      
  
      //return(null)
      if(index == 99){
       
        var Arr = ArrStringTotal
     
     
        var TempData = TempD
    
        for(var i = 0; i < Arr.length; i++){
 
          TempData[i][5] = {value: Arr[i]}
        }
      
        console.log('In 99')
        setDataTotal(TempData)
        setPullStudentDataDone(true)
        setAtStart(AtStart + 1)
        
 
        unsub(); // Unsubscribe here if you only need to process this once
      }
      else if(index == 100){

        var Arr = ArrStringTotal
   
        
     
        var TempData = TempD
       
        for(var i = 0; i < Arr.length; i++){
         
          TempData[i][5] = {value: Arr[i]}
        }
        
        

       
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
           
          
          for(var i = 0; i <= ClassroomRows.length; i++){
            for(var y = 0; y < ClassroomRows[0][i].length; y++){
              ClassroomRows[0][i][y].Percent = Math.round(ClassroomRows[0][i][y].Right / (ClassroomRows[0][i][y].Right+ClassroomRows[0][i][y].Wrong +ClassroomRows[0][i][y].Blank)*100)
            }
          }
          
          setMathrowsGlobalClassroom(ClassroomRows[0][0])
          setVerbalrowsGlobalClassroom(ClassroomRows[0][1])
          setReadingrowsGlobalClassroom(ClassroomRows[0][2])
          setSciencerowsGlobalClassroom(ClassroomRows[0][3])
         
          return(ClassroomRows)
          unsub(); // Unsubscribe here if you only need to process this once
        }
        //}, 1000)

       
      }
      else{

       
      }
      
    });
  
}
  //Placeholder Data
  



function SetLineData(data){
  
  if(CurrentTest == 'SAT'){
    var TempArr = GetSATScores(data)

   

    if(showBluebookTest == true){
      TempArr[1][0] = Math.max(parseInt(BluebookScore[0]), 200);
      TempArr[0][0] = Math.max(parseInt(BluebookScore[1]), 200);

      TempArr[1][1] = Math.max(parseInt(BluebookScore[2]), 200);
      TempArr[0][1] = Math.max(parseInt(BluebookScore[3]), 200);
      TempArr[1][2] = Math.max(parseInt(BluebookScore[4]), 200);
      TempArr[0][2] = Math.max(parseInt(BluebookScore[5]), 200);
      TempArr[1][3] = Math.max(parseInt(BluebookScore[6]), 200);
      TempArr[0][3] = Math.max(parseInt(BluebookScore[7]), 200);
      TempArr[2][0] = Math.max(parseInt(BluebookScore[0]) + parseInt(BluebookScore[1]), 400);
      TempArr[2][1] = Math.max(parseInt(BluebookScore[2]) + parseInt(BluebookScore[3]), 400);
      TempArr[2][2] = Math.max(parseInt(BluebookScore[4]) + parseInt(BluebookScore[5]), 400);
      TempArr[2][3] = Math.max(parseInt(BluebookScore[6]) + parseInt(BluebookScore[7]), 400);
    }
  
    setSATLineDataTotal([
      { x: 1, y: Math.max(TempArr[2][0], 400)},
      { x: 2, y: Math.max(TempArr[2][1], 400)},
      { x: 3, y: Math.max(TempArr[2][2], 400)},
      { x: 4, y: Math.max(TempArr[2][3], 400)},
      { x: 5, y: Math.max(TempArr[2][4], 400)},
      { x: 6, y: Math.max(TempArr[2][5], 400)},
      { x: 7, y: Math.max(TempArr[2][6], 400)},
      { x: 8, y: Math.max(TempArr[2][7], 400)},
      { x: 9, y: Math.max(TempArr[2][8], 400)},
      { x: 10, y: Math.max(TempArr[2][9], 400)},
    ])
    setSATLineDataMath([
      { x: 1, y: Math.max(TempArr[1][0], 200)},
      { x: 2, y: Math.max(TempArr[1][1], 200)},
      { x: 3, y: Math.max(TempArr[1][2], 200)},
      { x: 4, y: Math.max(TempArr[1][3], 200)},
      { x: 5, y: Math.max(TempArr[1][4], 200)},
      { x: 6, y: Math.max(TempArr[1][5], 200)},
      { x: 7, y: Math.max(TempArr[1][6], 200)},
      { x: 8, y: Math.max(TempArr[1][7], 200)},
      { x: 9, y: Math.max(TempArr[1][8], 200)},
      { x: 10, y: Math.max(TempArr[1][9], 200)},
    ])
    setSATLineDataVerbal([
      { x: 1, y: Math.max(TempArr[0][0], 200)},
      { x: 2, y: Math.max(TempArr[0][1], 200)},
      { x: 3, y: Math.max(TempArr[0][2], 200)},
      { x: 4, y: Math.max(TempArr[0][3], 200)},
      { x: 5, y: Math.max(TempArr[0][4], 200)},
      { x: 6, y: Math.max(TempArr[0][5], 200)},
      { x: 7, y: Math.max(TempArr[0][6], 200)},
      { x: 8, y: Math.max(TempArr[0][7], 200)},
      { x: 9, y: Math.max(TempArr[0][8], 200)},
      { x: 10, y: Math.max(TempArr[0][9], 200)},
    ])
      
    } else if(CurrentTest == 'ACT'){
   
      var TempArr = GetACTScores(data)

     
    
      setACTLineDataTotal([
        { x: 1, y: Math.max(TempArr[4][0], 0)},
        { x: 2, y: Math.max(TempArr[4][1], 0)},
        { x: 3, y: Math.max(TempArr[4][2], 0)},
        { x: 4, y: Math.max(TempArr[4][3], 0)},
        { x: 5, y: Math.max(TempArr[4][4], 0)},
        { x: 6, y: Math.max(TempArr[4][5], 0)},
        { x: 7, y: Math.max(TempArr[4][6], 0)},
        { x: 8, y: Math.max(TempArr[4][7], 0)},
        { x: 9, y: Math.max(TempArr[4][8], 0)},
        { x: 10, y: Math.max(TempArr[4][9], 0)},
      ])
      setACTLineDataMath([
        { x: 1, y: Math.max(TempArr[1][0], 0)},
        { x: 2, y: Math.max(TempArr[1][1], 0)},
        { x: 3, y: Math.max(TempArr[1][2], 0)},
        { x: 4, y: Math.max(TempArr[1][3], 0)},
        { x: 5, y: Math.max(TempArr[1][4], 0)},
        { x: 6, y: Math.max(TempArr[1][5], 0)},
        { x: 7, y: Math.max(TempArr[1][6], 0)},
        { x: 8, y: Math.max(TempArr[1][7], 0)},
        { x: 9, y: Math.max(TempArr[1][8], 0)},
        { x: 10, y: Math.max(TempArr[1][9], 0)},
      ])
    
      setACTLineDataEnglish([
        { x: 1, y: Math.max(TempArr[0][0], 0)},
        { x: 2, y: Math.max(TempArr[0][1], 0)},
        { x: 3, y: Math.max(TempArr[0][2], 0)},
        { x: 4, y: Math.max(TempArr[0][3], 0)},
        { x: 5, y: Math.max(TempArr[0][4], 0)},
        { x: 6, y: Math.max(TempArr[0][5], 0)},
        { x: 7, y: Math.max(TempArr[0][6], 0)},
        { x: 8, y: Math.max(TempArr[0][7], 0)},
        { x: 9, y: Math.max(TempArr[0][8], 0)},
        { x: 10, y: Math.max(TempArr[0][9], 0)},
      ])
      setACTLineDataReading([
        { x: 1, y: Math.max(TempArr[2][0], 0)},
        { x: 2, y: Math.max(TempArr[2][1], 0)},
        { x: 3, y: Math.max(TempArr[2][2], 0)},
        { x: 4, y: Math.max(TempArr[2][3], 0)},
        { x: 5, y: Math.max(TempArr[2][4], 0)},
        { x: 6, y: Math.max(TempArr[2][5], 0)},
        { x: 7, y: Math.max(TempArr[2][6], 0)},
        { x: 8, y: Math.max(TempArr[2][7], 0)},
        { x: 9, y: Math.max(TempArr[2][8], 0)},
        { x: 10, y: Math.max(TempArr[2][9], 0)},
      ])
      setACTLineDataScience([
        { x: 1, y: Math.max(TempArr[3][0], 0)},
        { x: 2, y: Math.max(TempArr[3][1], 0)},
        { x: 3, y: Math.max(TempArr[3][2], 0)},
        { x: 4, y: Math.max(TempArr[3][3], 0)},
        { x: 5, y: Math.max(TempArr[3][4], 0)},
        { x: 6, y: Math.max(TempArr[3][5], 0)},
        { x: 7, y: Math.max(TempArr[3][6], 0)},
        { x: 8, y: Math.max(TempArr[3][7], 0)},
        { x: 9, y: Math.max(TempArr[3][8], 0)},
      { x: 10, y:TempArr[3][9]},
    ])
  }
  

  
}

  useEffect(()=>{

    if(PullStudentDataDone == true){
     
          FindPercentageCorrectRows(dataTotal)
          SetLineData(dataTotal)
          CreateRows(dataTotal)

    }
  },[dataTotal, PullStudentDataDone])




  function LoopThroughStudents(studentsArr, Test = 'SAT'){
    console.log('Looping Through Students')
    var RowsTotal= []
    //setClassroomRows([])
    setTimeout(() => {
      for(var i = 0; i<studentsArr.length; i++){
      
        var RowsTemp  =  PullStudentData(studentsArr[i] , 100,studentsArr.length, Test )
      
        RowsTotal.push(RowsTemp)
      }



    }, 1000);
    
    
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

    function addMinutesToDateTimeString(datetimeString, minutes) {
      const date = new Date(datetimeString);
      
      date.setMinutes(date.getMinutes() + minutes);
      
      return date.toString().slice(0, 24).replace('T', ' ');
    }
    
    try{
      var Title = eventDict.event_id
      var TitleSplit = Title.split('-')
      var Tutor = TitleSplit[1]
      var Student = TitleSplit[0]
 
      var Num = parseInt(TitleSplit[2])-1

    
      //UpdateAllDates(Student, eventDict.start, Num)
    }catch(err){
      console.log('err', err)
      var Title = eventDict.title
      var TitleSplit = Title.split('-')
      var Tutor = TitleSplit[1]
      var Student = TitleSplit[0].trim()
    
      AddNewDates(Student, eventDict.startTime, addMinutesToDateTimeString(eventDict.startTime, eventDict.length))

    }
   
  }

  function DeleteEvent(eventDict){
  
    var Title = eventDict
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
        id: 'Quiz Results',
        numeric: true,
        disablePadding: false,
        label: 'Quiz Results',
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

  const handleRequestSortReading = (event, property) => {


    const isAsc = orderByReading === property && orderReading === 'asc';

    setOrderReading(isAsc ? 'desc' : 'asc');
    setOrderByReading(property);
  };

  const handleRequestSortScience = (event, property) => {


    const isAsc = orderByScience === property && orderScience === 'asc';

    setOrderScience(isAsc ? 'desc' : 'asc');
    setOrderByScience(property);
  };

  const handleSelectAllClick = (event,rows) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.Category);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };
  const handleSelectAllClickMath = (event,rows) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.Category);
      setSelectedMath(newSelected);
      return;
    }
    setSelectedMath([]);
  };
  const handleSelectAllClickVerbal = (event,rows) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.Category);
      setSelectedVerbal(newSelected);
      return;
    }
    setSelectedVerbal([]);
  };
  const handleSelectAllClickReading = (event,rows) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.Category);
      setSelectedReading(newSelected);
      return;
    }
    setSelectedReading([]);
  };
  const handleSelectAllClickScience = (event,rows) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.Category);
      setSelectedScience(newSelected);
      return;
    }
    setSelectedScience([]);
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
  const isSelectedReading = (Category) => selectedReading.indexOf(Category) !== -1;
  const isSelectedScience = (Category) => selectedScience.indexOf(Category) !== -1;


  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = 0 //page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;


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
 
  //var LoopStudentsDone = false
 

  const [CurrentClassroomStudents, setCurrentClassroomStudents] = useState([])
  
  function PullCorrespondingStudentsFromClassroomNumber(){


    var ClassroomNumber = CurrentClassroomNumber
   
    function ClassroomNumbersIndexes(ClassroomNumber){
      var ClassroomNumbersIndexes = []
      if(ClassroomTest == 'SAT'){
        for(var i = 0; i < SATCLassroomNumbers[0].length; i++){
       
          if(parseInt(SATCLassroomNumbers[0][i].integerValue) == ClassroomNumber.toString().replace('Class ', '')){
            
            ClassroomNumbersIndexes.push(i)
          }
        }
      }
      else if(ClassroomTest == 'ACT'){
        for(var i = 0; i < ACTClassroomNumbers[0].length; i++){
    
          if(parseInt(ACTClassroomNumbers[0][i].integerValue) == ClassroomNumber.toString().replace('Class ', '')){

            ClassroomNumbersIndexes.push(i)
          }
        }
      }
      return(ClassroomNumbersIndexes)
    }
    

    if(ClassroomTest == 'SAT'){

      var ClassroomNumbersIndexes = ClassroomNumbersIndexes(ClassroomNumber)

      var CorrespondingStudents = []
      for(var i = 0; i < ClassroomStudentsClean.length; i++){
        if(ClassroomNumbersIndexes.includes(i)){
          CorrespondingStudents.push(ClassroomStudentsClean[i])
        }
      }
    }
    else if(ClassroomTest == 'ACT'){
      var ClassroomNumbersIndexes = ClassroomNumbersIndexes(ClassroomNumber)

      var CorrespondingStudents = []
      for(var i = 0; i < ClassroomStudentsCleanACT.length; i++){
        if(ClassroomNumbersIndexes.includes(i)){
          CorrespondingStudents.push(ClassroomStudentsCleanACT[i])
        }
      }
    }

 
    return(CorrespondingStudents)
  }
  
  useEffect(()=>{

    try{
      if(PullCorrespondingStudentsFromClassroomNumber().length == 0){
        setAssignmentsDoneClassroom([])
      }
    }catch(e){
      console.log('err', e)
    }
    if( ClassroomTest == 'SAT'){
      if(CurrentClassroomNumber !== null && SATCLassroomNumbers.length > 0 && PullCorrespondingStudentsFromClassroomNumber().length > 0){
     
        
        setClassroomRows([])
        setCurrentClassroomStudents(PullCorrespondingStudentsFromClassroomNumber())
        PullDoneAssignmentsForClassroom(PullCorrespondingStudentsFromClassroomNumber()[0])
        PullStudentAssignmentsClassroom(PullCorrespondingStudentsFromClassroomNumber()[0])
        LoopThroughStudents(PullCorrespondingStudentsFromClassroomNumber(), ClassroomTest)
      }
    }
    else if(ClassroomTest == 'ACT'){
      if(CurrentClassroomNumber !== null && ACTClassroomNumbers.length > 0 && PullCorrespondingStudentsFromClassroomNumber().length > 0){
      
     
        setClassroomRows([])
        setCurrentClassroomStudents(PullCorrespondingStudentsFromClassroomNumber())
        PullDoneAssignmentsForClassroom(PullCorrespondingStudentsFromClassroomNumber()[0])
        PullStudentAssignmentsClassroom(PullCorrespondingStudentsFromClassroomNumber()[0])
        LoopThroughStudents(PullCorrespondingStudentsFromClassroomNumber(), ClassroomTest)
      }
    }
    
    refresh()
  },[CurrentClassroomNumber,SATCLassroomNumbers, ACTClassroomNumbers,ClassroomTest ])





  function ClassroomTestChange(ClassroomTest){
    setClassroomRows([])
    setClassroomTest(ClassroomTest)
  
  }


  const [UpdateData, setUpdateData] = useState(0)
  useEffect(()=>{
      if(UpdateData > 0){
   
   
      setTriSwitchSpreadSheetValues(TriSwitchSpreadSheetValues+1 )
      //Make sure you have to submit test before you can push  data
      
      if(true){
      
     
        //215
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
        if(CurrentTest == 'SAT'){
          for(var i= 0; i<dataTotalLength; i++){
            //ConstantSATTestLenghts()
            if(i >=1+ConstantSATTestLenghts(X) && i<(1+ConstantSATTestLenghts(X+1))){
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
        }else if(CurrentTest == 'ACT'){
          for(var i= 0; i<dataTotalLength; i++){
            if(i >=1+215*X && i<(1+215*(X+1))){
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
        }

       
     
        setDataTotal(Tempper)
      
        UpdateStudentData(TempArr, CurrentTestNumber)
   
  
      }
    }
  },[UpdateData])


  useEffect(()=>{
  
    if(CurrentTest == 'SAT' && SATLineDataTotal.length > 0 && StandardizedTestsDone.length > 0){
      //Find student progress
 
      var TempArr = [SATLineDataTotal[0], SATLineDataTotal[StandardizedTestsDone.length-1]]
      var progress = (TempArr[1].y - TempArr[0].y)
     
      UpdateStudentProgress(progress)
    }else if(CurrentTest == 'ACT' && ACTLineDataTotal.length > 0 && StandardizedTestsDone.length > 0){
      var TempArr = [ACTLineDataTotal[0], ACTLineDataTotal[StandardizedTestsDone.length-1]]
      var progress = (TempArr[1].y - TempArr[0].y)



      UpdateStudentProgress(progress)
    }
    

  },[SATLineDataTotal,ACTLineDataTotal])

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
     
     
      });

      if(Type == 'Student' || Type == 'Parent'){

     
      
      }else if(Type == 'Tutor'){

      }
      }catch(e){
        console.log('err', e)
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

  async function SubmitMultipleAssignments(Arr){
   
      for (var i = 0; i<Arr.length; i++){
        
        var NewArr = [Arr[i],false, StudentAssignments.length]
        var StudentAssignmentCopy = StudentAssignments
        StudentAssignmentCopy[StudentAssignmentCopy.length] = []

    
        StudentAssignmentCopy[StudentAssignmentCopy.length-1] = NewArr
        

        //Placeholder
        await UpdateStudentAssignments(StudentAssignmentCopy)
      }
  }


  function SubmitAssignmentClassroom(){
    
    var NewArr = [NewAssignment, false, StudentAssignments.length]
  
    var StudentAssignmentCopy = StudentAssignments
    StudentAssignmentCopy[StudentAssignmentCopy.length] = []

 
    StudentAssignmentCopy[StudentAssignmentCopy.length-1] = NewArr
    

 
    //Placeholder
    if(ClassroomTest == 'SAT'){
      for(var i = 0; i<PullCorrespondingStudentsFromClassroomNumber().length;i++){
        UpdateStudentAssignmentsClassroom(StudentAssignmentCopy, PullCorrespondingStudentsFromClassroomNumber()[i])
      }
    }else if(ClassroomTest == 'ACT'){
      for(var i = 0; i<PullCorrespondingStudentsFromClassroomNumber().length;i++){
        UpdateStudentAssignmentsClassroom(StudentAssignmentCopy, PullCorrespondingStudentsFromClassroomNumber()[i])
      }
    }
  
    setNewAssignment('')
    refresh()
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
  
  function ChangeCheckClassroom(num){
    var CurrentCheck = StudentAssignmentsClassroom[num][1]
    var CurrentArr = StudentAssignmentsClassroom
 


  

    if(CurrentCheck == true){
      CurrentArr[num][1] = false
    
      setStudentAssignmentsClassroom(CurrentArr)
      
      if(ClassroomTest == 'SAT'){
        for(var i = 0; i<PullCorrespondingStudentsFromClassroomNumber().length;i++){
          UpdateStudentAssignmentsClassroom(CurrentArr, PullCorrespondingStudentsFromClassroomNumber()[i], false)
        }
      }else if(ClassroomTest == 'ACT'){
        for(var i = 0; i<PullCorrespondingStudentsFromClassroomNumber().length;i++){
          UpdateStudentAssignmentsClassroom(CurrentArr, PullCorrespondingStudentsFromClassroomNumber()[i],false)
        }
      }
      
    }else{
      CurrentArr[num][1] = true
    
      setStudentAssignmentsClassroom(CurrentArr)
      if(ClassroomTest == 'SAT'){
        for(var i = 0; i<PullCorrespondingStudentsFromClassroomNumber().length;i++){
          UpdateStudentAssignmentsClassroom(CurrentArr, PullCorrespondingStudentsFromClassroomNumber()[i],false)
        }
      }else if(ClassroomTest == 'ACT'){
        for(var i = 0; i<PullCorrespondingStudentsFromClassroomNumber().length;i++){
          UpdateStudentAssignmentsClassroom(CurrentArr, PullCorrespondingStudentsFromClassroomNumber()[i],false)
        }
      }
    }
    setTimeout(()=>{
      refresh()
    }, [1000])
  
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
        console.log('err', e)
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
  const [BinaryBool, setBinaryBool] = useState(false);
  



  const handleChangeTab = (event, newValue) => {
    newValue = parseInt(newValue)+1
    ChangeSpreadsheetData(newValue)
    setValueTab(newValue-1);
    setCurrentTestNumber(newValue )

    try{
      if(CurrentTest == 'SAT'){
        var FirstBlock = [dataTotal[0]]
        var X = newValue-1
        var NewData = (dataTotal.slice((ConstantSATTestLenghts(X)+1),(ConstantSATTestLenghts(X+1)+1)))

        for(var t = 0; t <NewData.length; t++){
  

          var LocalData = JSON.parse(JSON.stringify(NewData[t]));
        
   
   
          if(LocalData[6].value != "Correct Answer" && (ShowCorrectAnswers == false)){
            LocalData[6] = {value:'    '}
          }
          if(LocalData[7].value != "Match" ){
      
            LocalData[7] = {value:"=(F"+(t+2).toString()+" = G"+(t+2).toString()+ ")"}
          }
          
          FirstBlock.push(LocalData)
    
        }
        
        setData(FirstBlock)
    }else if(CurrentTest == 'ACT'){
      var FirstBlock = [dataTotal[0]]
      
      var NewData = (dataTotal.slice((215*(newValue-1)+1),(215*(newValue)+1)))
      for(var t = 0; t <NewData.length; t++){
        var LocalData = JSON.parse(JSON.stringify(NewData[t]));
      
     
        if(LocalData[6].value != "Correct Answer" && (ShowCorrectAnswers == false)){
          LocalData[6] = {value:'    '}
        }
        if(LocalData[7].value != "Match" ){
          LocalData[7] = {value:"=(F"+(t+2).toString()+" = G"+(t+2).toString()+ ")"}
        }
        FirstBlock.push(LocalData)
      }
      
      setData(FirstBlock)
    }
    }catch(e){
      console.log('error')
      console.log(e)

    }

  };
  
  const handleChangeTabQuiz = (event, newValue) => {
  
    if(QuizSwitch == true){
      if(QuizSwitch == true){
        setCurrentQuizResults([])
      }
    }
    setValueTabQuiz(newValue);

  };
  


function HandleChangeTabFunction(newValue){
   
    
    //setValueTab(newValue);
    setCurrentTestNumber(newValue)
  }

  const [ShowCorrectAnswers, setShowCorrectAnswers] = useState(true)

  useEffect(()=>{
    if(Type == 'Student' || Type == 'Parent'){
      setShowCorrectAnswers(false)
    }

  },[Type])



  useEffect(()=>{
   

   
    
    try{
      if(CurrentTest == 'SAT'){
        var FirstBlock = [dataTotal[0]]
        var X = CurrentTestNumber-1
        var NewData = (dataTotal.slice((ConstantSATTestLenghts(X)+1),(ConstantSATTestLenghts(X+1)+1)))
        for(var t = 0; t <NewData.length; t++){
          var LocalData = JSON.parse(JSON.stringify(NewData[t]));
        
       
          if(LocalData[6].value != "Correct Answer" && (ShowCorrectAnswers == false)){
            LocalData[6] = {value:'    '}
          }
          if(LocalData[7].value != "Match" ){
            LocalData[7] = {value:"=(F"+(t+2).toString()+" = G"+(t+2).toString()+ ")"}
          }
          FirstBlock.push(LocalData)
        }
        
        setData(FirstBlock)
    }else if(CurrentTest == 'ACT'){
      var FirstBlock = [dataTotal[0]]
      
      var NewData = (dataTotal.slice((215*(CurrentTestNumber-1)+1),(215*(CurrentTestNumber)+1)))
      for(var t = 0; t <NewData.length; t++){
        var LocalData = JSON.parse(JSON.stringify(NewData[t]));
      
     
        if(LocalData[6].value != "Correct Answer" && (ShowCorrectAnswers == false)){
          LocalData[6] = {value:'    '}
        }
        if(LocalData[7].value != "Match" ){
          LocalData[7] = {value:"=(F"+(t+2).toString()+" = G"+(t+2).toString()+ ")"}
        }
        FirstBlock.push(LocalData)
      }
      
      setData(FirstBlock)
    }
    }catch(e){
      console.log('err', e)

    }
  },[ ShowCorrectAnswers])


  useEffect(()=>{
    
    try{
      if(CurrentTest == 'SAT'){
      
        var FirstBlock = [dataTotal[0]]
        var X = CurrentTestNumber-1 
        var NewData = (dataTotal.slice((ConstantSATTestLenghts(X)+1),(ConstantSATTestLenghts(X+1)+1)))
      
        for(var t = 0; t <NewData.length; t++){
          var LocalData = JSON.parse(JSON.stringify(NewData[t]));
     
          if(LocalData[6].value != "Correct Answer" && (Type == 'Parent' || Type == 'Student') ){
            LocalData[6] = {value:'    '}
          }
          if(LocalData[7].value != "Match" ){
            LocalData[7] = {value:"=(F"+(t+2).toString()+" = G"+(t+2).toString()+ ")"}
          }
          FirstBlock.push(LocalData)
        }
       
    
        setData(FirstBlock)
      
      }
      else if(CurrentTest == 'ACT'){
        var FirstBlock = [dataTotal[0]]
        
        var NewData = (dataTotal.slice((215*(CurrentTestNumber-1)+1),(215*(CurrentTestNumber)+1)))
        for(var t = 0; t <NewData.length; t++){
          var LocalData = JSON.parse(JSON.stringify(NewData[t]));
        
       
          if(LocalData[6].value != "Correct Answer" && (Type == 'Parent' || Type == 'Student')){
            LocalData[6] = {value:'    '}
          }
          if(LocalData[7].value != "Match" ){
            LocalData[7] = {value:"=(F"+(t+2).toString()+" = G"+(t+2).toString()+ ")"}
          }
          FirstBlock.push(LocalData)
        }
        
        setData(FirstBlock)
      }
      
    }catch(e){
      console.log('err', e)
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
      PullStudentTestDate(s)
      //PullQuizResult(s)
      PullSuggestedAssignments(s)
      PullClassDate(s)
      PullIsIndividual(s)
      
      PullAllDates(s)
      setBinaryBool(!(BinaryBool))
      setNewMeetingString(s.value+'-'+UserName.toString())
      
      PullWeeklyPracticeDay(s.value)
      PullPopupViewed(s.value)
      PullStudentAssignmentsViewed(s.value)
      PullBluebookGrade(s.value)
      //BluebookScore

      setPageSwitch(0)
      
  }

  useEffect(()=>{
    if(Tutor){
      PullZoomLink()
      PullAvailability()
      
    }
  },[Tutor,CompanyCode])

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
      else if(IsIndividual == true){
        setPageSwitch(1)
      }
      else{
        setPageSwitch(0)
        
      }

      setPageSwitchState(10)
    },10)
    }
  },[Type, CurrentTest])
  //const[PageSwitchDone, setPageSwitchDone] = useState(false)
  var PageSwitchDone = false
  useEffect(()=>{
    console.log('PullStudentData')
    if((PageSwitch == 1 || PageSwitch == 0 || PageSwitch == 8) && (CurrentTest !== null) && (PageSwitchDone == false) && (CurrentStudent !== '')) {
      console.log('DOing student data')
      PullStudentData(CurrentStudent , 99)
      PullQuizResult(CurrentStudent)
      PullTopics(CurrentStudent)

      PageSwitchDone = true
    }
  },[PageSwitch, CurrentTest, CurrentStudent])

  useEffect(()=>{
    window.scrollTo(0, 0);
  },[PageSwitch])
  const [ShowTable, setShowTable] = useState(true)

  function CompleteData(){

    //PlaceholderData

    setSubmitTestDone(SubmitTestDone+1)
    var TempData = data
    if(CurrentStudent !== ''){
    
  
      setShowCorrectAnswers(true)

      setTimeout(()=>{
        setUpdateData(parseInt(UpdateData)+10)

      },[500])
    }
  }


  


  const [DropdownStudentName, setDropdownStudentName] = useState()

  function GetDropDownNames(names){
    if(StudentsTotalBool){

      
      var NewArr = []
      var StudentLength = StudentsTotalBool.length
      
      for(var i = 0; i<StudentLength; i++){
        NewArr[NewArr.length] = StudentsTotalBool[i][0]
      }
   
      
        const options = names
      
        const defaultOption = 'Please Choose Student';
       
        return(
          <div style={{height:100, marginBottom:50}}>
            <Dropdown options={options} onChange={(s)=>{setDropdownStudentName(s)}} value={defaultOption} placeholder="Select an option" />
          </div>
        )
      }
      else{
        return(null)
      }
    
    
  }

  function GetCheckboxNames(names, checkedNamesArray,allClaimedStudents = []) {
    //placeholder add
    var TempNames= []
    for(var i = 0; i<names.length; i++){
      TempNames[i] = names[i][0]
    // Initialize state with names that should be pre-checked
    }

    var TempNames = [...new Set(TempNames)];

    function IsInAllClaimedStudents(name){
      for(var i = 0; i<allClaimedStudents.length; i++){
        if(name == allClaimedStudents[i] && !(checkedNamesArray.includes(name)) ){
          return(true)
        }
      }
    }
    const handleCheckboxChange = (name) => (event) => {
      //onCheckboxChange && onCheckboxChange(name, event.target.checked);
    
      if(event.target.checked == true){
   
        AddOrRemoveStudentToClass(name, 'add')
      }else{
        AddOrRemoveStudentToClass(name, 'remove')
      }
    };
  
    if (TempNames && TempNames.length > 0) {
      return (
        <div style={{ marginBottom: 50 }}>
          {TempNames.map((name) => (
            <FormControlLabel
              control={
                <Checkbox
                  checked={checkedNamesArray.includes(name)}
                  onChange={handleCheckboxChange(name)}
                  disabled={IsInAllClaimedStudents(name)}
                />
              }
              label={name}
              key={name}
            />
          ))}
        </div>
      );
    } else {
      return null;
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
        console.log('err', e)
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
        console.log('err', e)
      }
     
      
        const options = NewArr
      
        const defaultOption = 'Please Choose Your Student';
        
        

        return(<Dropdown options={options} onChange={(s)=>{DropDownOnChange(Remove(s),index)}} value={defaultOption} placeholder="Select an option" />)
    
      }
      
    catch(e){
      console.log('err', e)
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

  
  function MoveReadingAndWritingIntoReadingOrWriting(ReadingAndWritingArr, ReadingConceptsArr, VerbalConceptsArr){
    var NewReadingConceptsArr = ReadingConceptsArr
    var NewVerbalConceptsArr = VerbalConceptsArr
    function FindInTopics(Concept){
      for(var i = 0; i<Topics.length; i++){
        if(Topics[i][0] == Concept){
          return(Topics[i])
        }
      }
    }
 
    
    for(var i = 0; i<ReadingAndWritingArr.length; i++){
      var CurrentConcept = FindInTopics(ReadingAndWritingArr[i])

      if(CurrentConcept[3] == 'Reading'){
        NewReadingConceptsArr[NewReadingConceptsArr.length] = ReadingAndWritingArr[i]
      }else if(CurrentConcept[3] == 'Verbal'){
        NewVerbalConceptsArr[NewVerbalConceptsArr.length] = ReadingAndWritingArr[i]
      }
    }
    return([NewReadingConceptsArr, NewVerbalConceptsArr])


  
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

    //setStudentsTotalBool(NewTopicsBool)
    //setTimeout(() => {
      UpdateStudents(name, TempFunc)
      UpdateTutor(name)
    //}, 100)
    
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
      width:'30%',
      backgroundColor:'#969696',
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


  function RefreshPage(){
    window.scrollTo(0, 0);
    //setPageSwitch(10)
    window.location.reload();
  }

  useEffect(()=>{
    EncodeVideoURL()
  },[MathrowsGlobal, VerbalrowsGlobal, ReadingrowsGlobal, SciencerowsGlobal])
 
  const [TempA, setTempA] = useState([true,false])
  /*
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
  */
  var MathConceptsArr = []
  var VerbalConceptsArr = []
  var ReadingConceptsArr = []
  var ScienceConceptsArr = []
  var ReadingAndWritingConceptsArr = []
  //PullTopicsFrom TopicsSAt

  var CurrentTestTopics = ''
  if(CurrentTest == 'SAT'){
    CurrentTestTopics = Topics
  }else if(CurrentTest == 'ACT'){
    CurrentTestTopics = TopicsACT
  }
  function removeEmptyElements(arr) {
      return arr.filter(Boolean);
  }

  for(var i = 0; i < CurrentTestTopics.length; i++){
    if(CurrentTestTopics[i][3] == 'Math'){
      MathConceptsArr[i] = CurrentTestTopics[i][0]
    }else if(CurrentTestTopics[i][3] == 'Verbal'|| CurrentTestTopics[i][3] == 'English'){
      VerbalConceptsArr[i] = CurrentTestTopics[i][0]
    }
    else if(CurrentTestTopics[i][3] == 'Reading'){
      ReadingConceptsArr[i] = CurrentTestTopics[i][0]
    }
    else if(CurrentTestTopics[i][3] == 'Science'){
      ScienceConceptsArr[i] = CurrentTestTopics[i][0]
    }
    else if(CurrentTestTopics[i][3] == 'Reading and Writing'){
      ReadingAndWritingConceptsArr[i] = CurrentTestTopics[i][0]
    }
  }

  MathConceptsArr = removeEmptyElements(MathConceptsArr)
  VerbalConceptsArr = removeEmptyElements(VerbalConceptsArr)
  ReadingConceptsArr = removeEmptyElements(ReadingConceptsArr)
  ScienceConceptsArr = removeEmptyElements(ScienceConceptsArr)
  ReadingAndWritingConceptsArr = removeEmptyElements(ReadingAndWritingConceptsArr)


  var temparr = MoveReadingAndWritingIntoReadingOrWriting(ReadingAndWritingConceptsArr, ReadingConceptsArr, VerbalConceptsArr)
  ReadingConceptsArr = temparr[0]
  VerbalConceptsArr = temparr[1]
  
  
  
 

  function GetDataFromSpreadsheet(data = null, CurrTest = 0 ){
    //DataTotal
    if(CurrTest == 0){
      CurrTest = CurrentTest
    }
    var dataTotal = data
    var MathConceptsArr = []
    var VerbalConceptsArr = []
    var ReadingConceptsArr = []
    var ScienceConceptsArr = []
    var ReadingAndWritingArr = []
    //PullTopicsFrom TopicsSAt
   
    var CurrentTestTopics = ''
    if(CurrTest == 'SAT'){
      CurrentTestTopics = Topics
    }else if(CurrTest == 'ACT'){
      CurrentTestTopics = TopicsACT
    }
    function removeEmptyElements(arr) {
        return arr.filter(Boolean);
    }

    for(var i = 0; i < CurrentTestTopics.length; i++){
      if(CurrentTestTopics[i][3] == 'Math'){
        MathConceptsArr[i] = CurrentTestTopics[i][0]
      }else if(CurrentTestTopics[i][3] == 'Verbal' || CurrentTestTopics[i][3] == 'English'){
        VerbalConceptsArr[i] = CurrentTestTopics[i][0]
      }
      else if(CurrentTestTopics[i][3] == 'Reading'){
        ReadingConceptsArr[i] = CurrentTestTopics[i][0]
      }
      else if(CurrentTestTopics[i][3] == 'Science'){
        ScienceConceptsArr[i] = CurrentTestTopics[i][0]
      }
      else if(CurrentTestTopics[i][3] == 'Reading and Writing'){ 
        ReadingAndWritingArr[i] = CurrentTestTopics[i][0]
      }
    }

    MathConceptsArr = removeEmptyElements(MathConceptsArr)
    VerbalConceptsArr = removeEmptyElements(VerbalConceptsArr)
    ReadingConceptsArr = removeEmptyElements(ReadingConceptsArr)
    ScienceConceptsArr = removeEmptyElements(ScienceConceptsArr)
    var ReadingAndWritingConceptsArr = removeEmptyElements(ReadingAndWritingArr)


    var temparr = MoveReadingAndWritingIntoReadingOrWriting(ReadingAndWritingConceptsArr, ReadingConceptsArr, VerbalConceptsArr)
    ReadingConceptsArr = temparr[0]
    VerbalConceptsArr = temparr[1]

  
    /*
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
    */
    
   
        var MathArr = []
        var VerbalArr = []
        var ReadingArr = []
        var ScienceArr = []
        var ReadingAndWritingArr = []

        

        for(var i = 0; i < MathConceptsArr.length; i++){
          var TempArr = [MathConceptsArr[i],  0 , 0, 0, '0']
          MathArr.push(TempArr)
        }
        
        for(var i = 0; i < VerbalConceptsArr.length; i++){
          var TempArr = [VerbalConceptsArr[i],  0 , 0, 0, '0']
          VerbalArr.push(TempArr)
        }

        for(var i = 0; i < ReadingConceptsArr.length; i++){
          var TempArr = [ReadingConceptsArr[i],  0 , 0, 0, '0']
          ReadingArr.push(TempArr)
        }

        for(var i = 0; i < ScienceConceptsArr.length; i++){
          var TempArr = [ScienceConceptsArr[i],  0 , 0, 0, '0']
          ScienceArr.push(TempArr)
        }
      

      
      
 
    
     
    //[VerbalConceptsArr[i], VerbalChapterArrACT[i], 0 , 0, 0, '0']
    var TempDetailArr = []
    var TempOutcomeArr = []
    var TempStudentAnswersArr = []
    var TempCorrectAnswersArr = []
    function Multiplier(){
     
      if(StandardizedTestDoneConst.length == 0 ){
        return(0)
      }
      else{
        return(10/StandardizedTestDoneConst.length)
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
            MathArr[y][3] = MathArr[y][3] + 1
          }
          if(TempOutcome == 'Correct'){
            MathArr[y][1] = MathArr[y][1] + 1
          }
          if(TempOutcome == 'Incorrect'){
            MathArr[y][2] = MathArr[y][2] + 1
          }
          //Get percent correct
          MathArr[y][4] = NoMoreThan100(Math.round((MathArr[y][1] / ( MathArr[y][3] + MathArr[y][1] + MathArr[y][2])) *100 *Multiplier())).toString()

          
        
        }
      }
      
      for(var y = 0; y < VerbalArr.length; y++){
        if(dataTotal[i][4].value.toString().replaceAll(/ *\([^)]*\) */g, "").replaceAll(/[0-9]/g, '').replaceAll(' ','').toLowerCase() == VerbalArr[y][0].replaceAll(' ','').toLowerCase()){
       
          if(TempOutcome == 'Blank'){
            VerbalArr[y][3] = VerbalArr[y][3] + 1
          }
          if(TempOutcome == 'Correct'){
            VerbalArr[y][1] = VerbalArr[y][1] + 1
          }
          if(TempOutcome == 'Incorrect'){
            VerbalArr[y][2] = VerbalArr[y][2] + 1
          }
          //Get percent correct
          VerbalArr[y][4] = NoMoreThan100(Math.round((VerbalArr[y][1] / ( VerbalArr[y][3] + VerbalArr[y][1] + VerbalArr[y][2])) *100 * Multiplier())).toString()
     
        }
      }

      for(var y = 0; y < ReadingArr.length; y++){
        if(dataTotal[i][4].value.toString().replaceAll(/ *\([^)]*\) */g, "").replaceAll(/[0-9]/g, '').replaceAll(' ','').toLowerCase() == ReadingArr[y][0].replaceAll(' ','').toLowerCase()){

          if(TempOutcome == 'Blank'){
            ReadingArr[y][3] = ReadingArr[y][3] + 1
          }
          if(TempOutcome == 'Correct'){
            ReadingArr[y][1] = ReadingArr[y][1] + 1
          }
          if(TempOutcome == 'Incorrect'){
            ReadingArr[y][2] = ReadingArr[y][2] + 1
          }
          //Get percent correct
          ReadingArr[y][4] = NoMoreThan100(Math.round((ReadingArr[y][1] / ( ReadingArr[y][3] + ReadingArr[y][1] + ReadingArr[y][2])) *100 * Multiplier())).toString()
        }
      }

      for(var y = 0; y < ScienceArr.length; y++){
        if(dataTotal[i][4].value.toString().replaceAll(/ *\([^)]*\) */g, "").replaceAll(/[0-9]/g, '').replaceAll(' ','').toLowerCase() == ScienceArr[y][0].replaceAll(' ','').toLowerCase()){
          if(TempOutcome == 'Blank'){
            ScienceArr[y][3] = ScienceArr[y][3] + 1
          }
          if(TempOutcome == 'Correct'){
            ScienceArr[y][1] = ScienceArr[y][1] + 1
          }
          if(TempOutcome == 'Incorrect'){
            ScienceArr[y][2] = ScienceArr[y][2] + 1
          }
          //Get percent correct
          ScienceArr[y][4] = NoMoreThan100(Math.round((ScienceArr[y][1] / ( ScienceArr[y][3] + ScienceArr[y][1] + ScienceArr[y][2])) *100 * Multiplier())).toString()
        }
      }


      
    }
   
    
    let NumCorrect = 0;
    let ArrCorrectTotal = [];
    let ArrCorrect = [];
  

    /*
    function pushAndReset () {
        if(NumCorrect <= breaking){
          ArrCorrect.push(NumCorrect);
          NumCorrect = 0;
        }
        else{
          ArrCorrect.push(breaking)
        }
    };
    */
  /*
  This part is broken
  */
  if (CurrTest === 'SAT' || CurrTest === 'ACT') {
    for (let i = 0; i < 10; i++) {
        var breakpointsACTConst = [0,75,135,175,215];
        let breakPoints = (CurrTest === 'SAT') ? BreakPoints(i) : BreakPointsACT(i);
     
        let breakpointIndex = 0;
        
        for (let x = breakPoints[0]; x < TempOutcomeArr.length; x++) {
            
            if (TempOutcomeArr[x] === 'Correct') {
     
                NumCorrect++;
            }


            // Check if the current index is a breakpoint
            if (x === breakPoints[breakpointIndex+1]) {
             
                if(NumCorrect <= breakpointsACTConst[breakpointIndex+1]){
                  ArrCorrect.push(NumCorrect);
                  NumCorrect = 0;
                }
                else{
                  ArrCorrect.push(breakpointsACTConst[breakpointIndex+1])
                }
                breakpointIndex++;
                NumCorrect = 0;
              
                
                

            }
            if(x == breakPoints[breakPoints.length-1]){
              //pushAndReset();
              NumCorrect = 0;
              break;
            }
        }

        ArrCorrectTotal.push([...ArrCorrect]);
        ArrCorrect = [];
    }

}



    //if 1 then get the math details
    //if 2 then get the verbal details
    //if 3 then get the overall details
    //console.log('AllTheArrs', [MathArr, VerbalArr,ReadingArr, ScienceArr, ArrCorrectTotal])
    return([MathArr, VerbalArr,ReadingArr, ScienceArr, ArrCorrectTotal])
  }

  function createData(Category, Right, Wrong, Blank, Percent) {
    return { Category, Right,  Wrong, Blank, Percent};
  }

  function GetSATScoresOld(data){
    //numCorrect = [ReadingScore, WritingScore, MathScore]
    var numCorrect = GetDataFromSpreadsheet(data)[4]
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


  function GetSATScores(data, testNumber) {
    
    var numCorrect = GetDataFromSpreadsheet(data)[4]; // Data format assumed as [[Reading, Writing, Math], [Reading, Writing, Math], ...]


   
    // Initialize arrays to hold the SAT scores. These should be populated with your data.
    var readingSAT = []; // Fill with reading scores from Excel
    var writingSAT = []; // Fill with writing scores from Excel
    var mathSAT = []; // Fill with math scores from Excel
    var verbalSAT = []; // Fill with verbal scores from Excel

    // Populate the arrays based on testNumber (for the first 4 or 8 tests)

    if(showBluebookTest){

    
      
      if (testNumber >= 0 && testNumber < 4) {
          // Use data specific to the first four tests
          readingSAT = [0,100,100,110,120,130,140,150,150,160,170,170,180,190,190,200,200,210,210,220,220,230,230,240,240,250,250,260,260,270,280,280,290,290,300,300,310,310,320,320,330,330,340,350,350,360,370,370,380,380,390,400,400];
          writingSAT = [0,100,100,100,110,120,130,130,140,150,160,160,170,180,190,190,200,210,210,220,230,230,240,250,250,260,260,270,280,280,290,300,300,310,320,320,330,340,340,350,360,370,380,390,400];
          verbalSAT = [200,210,230,250,260,270,290,300,320,330,340,360,370,390,400,410,420,430,440,450,460,470,480,490,500,510,520,520,530,540,550,560,560,570,580,590,600,600,610,620,630,640,650,660,660,670,680,690,700,710,710,720,730,750,760,770,790,800];
          mathSAT = [0,200,210,230,240,260,280,290,310,320,330,340,360,370,380,390,510,420,430,440,450,460,470,480,480,490,500,510,520,520,530,540,550,560,560,570,580,590,600,600,610,620,630,640,650,660,670,670,680,690,700,710,730,740,750,760,780,790,800];
      } else if (testNumber < 8) {
          // Use data specific to the next four tests
          readingSAT = [0,100,100,100,110,110,120,130,140,140,150,160,160,170,170,180,180,190,200,200,210,210,220,230,230,240,240,250,250,260,260,270,280,280,290,290,290,300,300,310,310,320,320,330,330,340,350,350,360,370,370,390,400];
          writingSAT = [0,100,100,100,110,120,130,130,140,150,160,160,170,180,180,190,190,200,210,220,230,230,240,250,250,260,270,280,280,290,300,300,310,320,320,330,340,340,350,360,370,380,390,400,400];
          verbalSAT = [200,210,230,250,260,270,290,300,320,330,340,360,370,390,400,410,420,430,440,450,460,470,480,490,500,510,520,520,530,540,550,560,560,570,580,590,600,600,610,620,630,640,650,660,660,670,680,690,700,710,710,720,730,750,760,770,790,800];
          mathSAT = [0,200,210,230,250,260,270,290,300,320,330,340,360,370,390,400,410,420,430,440,450,460,470,480,490,500,510,510,520,530,540,540,550,560,570,580,590,600,600,610,620,630,640,650,660,660,670,680,690,700,710,710,720,730,750,760,770,790,800];
      } else {
          // Use data for the regular tests
          readingSAT = [100, 100, 100, 110, 120, 130, 140, 150, 160, 160, 170, 180, 180, 190, 200, 200, 210, 210, 220, 220, 230, 230, 230, 240, 240, 250, 250, 260, 260, 270, 270, 280, 280, 280, 290, 290, 300, 300, 310, 310, 320, 320, 330, 330, 340, 350, 350, 360, 370, 380, 390, 390, 400, 400]          
          writingSAT = [100, 100, 100, 100, 110, 120, 130, 140, 150, 160, 160, 170, 180, 190, 190, 200, 210, 220, 230, 230, 240, 240, 250, 260, 260, 270, 270, 280, 290, 290, 300, 310, 310, 320, 320, 330, 330, 340, 350, 360, 370, 370, 380, 390, 400, 400]
          mathSAT = [200,200,210,230,250,270,280,300,320,340,350,360,370,390,410,420,430,450,460,470,480,490,500,510,520,530,540,550,560,570,580,590,600,600,610,620,630,640,650,660,670,680,690,700,710,710,720,730,730,740,750,750,760,770,780,790,790,800,800,800]
          verbalSAT = [200,210,230,250,260,270,290,300,320,330,340,360,370,390,400,410,420,430,440,450,460,470,480,490,500,510,520,520,530,540,550,560,560,570,580,590,600,600,610,620,630,640,650,660,660,670,680,690,700,710,710,720,730,750,760,770,790,800];
      }
    } else {
      if (testNumber < 4) {
        // Use data specific to the next four tests
        readingSAT = [0,100,100,100,110,110,120,130,140,140,150,160,160,170,170,180,180,190,200,200,210,210,220,230,230,240,240,250,250,260,260,270,280,280,290,290,290,300,300,310,310,320,320,330,330,340,350,350,360,370,370,390,400];
        writingSAT = [0,100,100,100,110,120,130,130,140,150,160,160,170,180,180,190,190,200,210,220,230,230,240,250,250,260,270,280,280,290,300,300,310,320,320,330,340,340,350,360,370,380,390,400,400];
        verbalSAT = [200,210,230,250,260,270,290,300,320,330,340,360,370,390,400,410,420,430,440,450,460,470,480,490,500,510,520,520,530,540,550,560,560,570,580,590,600,600,610,620,630,640,650,660,660,670,680,690,700,710,710,720,730,750,760,770,790,800];
        mathSAT = [0,200,210,230,250,260,270,290,300,320,330,340,360,370,390,400,410,420,430,440,450,460,470,480,490,500,510,510,520,530,540,540,550,560,570,580,590,600,600,610,620,630,640,650,660,660,670,680,690,700,710,710,720,730,750,760,770,790,800];
    } else {
        // Use data for the regular tests
        readingSAT = [100, 100, 100, 110, 120, 130, 140, 150, 160, 160, 170, 180, 180, 190, 200, 200, 210, 210, 220, 220, 230, 230, 230, 240, 240, 250, 250, 260, 260, 270, 270, 280, 280, 280, 290, 290, 300, 300, 310, 310, 320, 320, 330, 330, 340, 350, 350, 360, 370, 380, 390, 390, 400, 400]          
        writingSAT = [100, 100, 100, 100, 110, 120, 130, 140, 150, 160, 160, 170, 180, 190, 190, 200, 210, 220, 230, 230, 240, 240, 250, 260, 260, 270, 270, 280, 290, 290, 300, 310, 310, 320, 320, 330, 330, 340, 350, 360, 370, 370, 380, 390, 400, 400]
        mathSAT = [200,200,210,230,250,270,280,300,320,340,350,360,370,390,410,420,430,450,460,470,480,490,500,510,520,530,540,550,560,570,580,590,600,600,610,620,630,640,650,660,670,680,690,700,710,710,720,730,730,740,750,750,760,770,780,790,790,800,800,800]
        verbalSAT = [200,210,230,250,260,270,290,300,320,330,340,360,370,390,400,410,420,430,440,450,460,470,480,490,500,510,520,520,530,540,550,560,560,570,580,590,600,600,610,620,630,640,650,660,660,670,680,690,700,710,710,720,730,750,760,770,790,800];
    }
  }

    var EnglishArr = [];
    var MathArr = [];
    var TotalArr = [];


    for (var i = 0; i < 10; i++) {
    if(showBluebookTest){
      if(i < 8){
        
          
          var mathRawScore = Math.min(numCorrect[i][1], mathSAT.length - 1);
  
          var englishRAWScore = Math.min(numCorrect[i][0], verbalSAT.length - 1)
          
          var englishScore = verbalSAT[englishRAWScore]
       

          var mathScore = mathSAT[mathRawScore];
        
          var totalScore = englishScore + mathScore;
       
          TotalArr.push(totalScore);
          MathArr.push(mathScore);
          EnglishArr.push(englishScore);
      
      }
      else{
        
          var readingRawScore = Math.min(numCorrect[i][0], readingSAT.length - 1);
          var writingRawScore = Math.min(numCorrect[i][1], writingSAT.length - 1);
          var mathRawScore = Math.min(numCorrect[i][2], mathSAT.length - 1);
  
          var englishScore = (readingSAT[readingRawScore] + writingSAT[writingRawScore]) 
          var mathScore = mathSAT[mathRawScore];
          var totalScore = englishScore + mathScore;
  
          TotalArr.push(totalScore);
          MathArr.push(mathScore);
          EnglishArr.push(englishScore);
      
      }

    }else{
      if(i < 4){
        
          
          var mathRawScore = Math.min(numCorrect[i][1], mathSAT.length - 1);
  
          var englishRAWScore = Math.min(numCorrect[i][0], verbalSAT.length - 1)
          
          var englishScore = verbalSAT[englishRAWScore]
    
          var mathScore = mathSAT[mathRawScore];
          var totalScore = englishScore + mathScore;
  
          TotalArr.push(totalScore);
          MathArr.push(mathScore);
          EnglishArr.push(englishScore);
      

      }else{

          
            var readingRawScore = Math.min(numCorrect[i][0], readingSAT.length - 1);
            var writingRawScore = Math.min(numCorrect[i][1], writingSAT.length - 1);
            var mathRawScore = Math.min(numCorrect[i][2], mathSAT.length - 1);
    
            var englishScore = (readingSAT[readingRawScore] + writingSAT[writingRawScore]) 
            var mathScore = mathSAT[mathRawScore];
            var totalScore = englishScore + mathScore;
    
            TotalArr.push(totalScore);
            MathArr.push(mathScore);
            EnglishArr.push(englishScore);
        
      }
    }
  }


    return [EnglishArr, MathArr, TotalArr];
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
    var numCorrect = GetDataFromSpreadsheet(data)[4]
   
    
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
    var MathConceptsArr = []
    var VerbalConceptsArr = []
    var ReadingConceptsArr = []
    var ScienceConceptsArr = []
    var ReadingAndWritingArr = []
    //PullTopicsFrom TopicsSAt
  
    var CurrentTestTopics = ''
    if(CurrTest == 'SAT'){
      CurrentTestTopics = Topics
    }else if(CurrTest == 'ACT'){
      CurrentTestTopics = TopicsACT
    }
    function removeEmptyElements(arr) {
        return arr.filter(Boolean);
    }
    for(var i = 0; i < CurrentTestTopics.length; i++){
      if(CurrentTestTopics[i][3] == 'Math'){
        MathConceptsArr[i] = CurrentTestTopics[i][0]
      }else if(CurrentTestTopics[i][3] == 'Verbal'){
        VerbalConceptsArr[i] = CurrentTestTopics[i][0]
      }
      else if(CurrentTestTopics[i][3] == 'Reading'){
        ReadingConceptsArr[i] = CurrentTestTopics[i][0]
      }
      else if(CurrentTestTopics[i][3] == 'Science'){
        ScienceConceptsArr[i] = CurrentTestTopics[i][0]
      }
      else if(CurrentTestTopics[i][3] == 'ReadingAndWriting'){
        ReadingAndWritingArr[i] = CurrentTestTopics[i][0]
      }
    }

    MathConceptsArr = removeEmptyElements(MathConceptsArr)
    VerbalConceptsArr = removeEmptyElements(VerbalConceptsArr)
    ReadingConceptsArr = removeEmptyElements(ReadingConceptsArr)
    ScienceConceptsArr = removeEmptyElements(ScienceConceptsArr)
    ReadingAndWritingArr = removeEmptyElements(ReadingAndWritingArr)

    var temparr = MoveReadingAndWritingIntoReadingOrWriting(ReadingAndWritingConceptsArr, ReadingConceptsArr, VerbalConceptsArr)
    ReadingConceptsArr = temparr[0]
    VerbalConceptsArr = temparr[1]


   
    var Arrs = GetDataFromSpreadsheet(data, CurrTest)
  
    var Mathrows = []
    var Verbalrows = []
    var Readingrows = []
    var Sciencerows = []
    

    if(true){
      for(var i = 0; i < MathConceptsArr.length; i++){
        Mathrows.push(Arrs[0][i][4])
      }
      for(var i = 0; i < VerbalConceptsArr.length; i++){
        Verbalrows.push(Arrs[1][i][4])
      }
      for (var i = 0; i < ReadingConceptsArr.length; i++){
        Readingrows.push(Arrs[2][i][4])
      }
      for (var i = 0; i < ScienceConceptsArr.length; i++){
        Sciencerows.push(Arrs[3][i][4])
      }

      var LocalTopics = CurrentTestTopics
      var MathTopics = []
      var VerbalTopics = []
      var ReadingTopics = []
      var ScienceTopics = []
      var ReadingAndWritingTopics = []
      for (var i = 0; i < LocalTopics.length; i++) {
        if (LocalTopics[i][3] == 'Math') {
          MathTopics.push(LocalTopics[i])
        } else if (LocalTopics[i][3] == 'Reading') {
          ReadingTopics.push(LocalTopics[i])
        } else if (LocalTopics[i][3] == 'Verbal') {
          VerbalTopics.push(LocalTopics[i])
        } else if (LocalTopics[i][3] == 'Science') {
          ScienceTopics.push(LocalTopics[i])
        } 

      }


      var TopicsMathX = MathTopics
      var TopicsVerbalX = VerbalTopics
      var TopicsReadingX = ReadingTopics
      var TopicsScienceX = ScienceTopics

      Mathrows.splice(4,1)
    
      
      for(var i = 0; i<Mathrows.length; i++){
        TopicsMathX[i][2] = parseInt(Mathrows[i])
      }
      for(var i = 0; i<Verbalrows.length; i++){
        TopicsVerbalX[i][2]= parseInt(Verbalrows[i])
      }
      for(var i = 0; i<Readingrows.length; i++){
        TopicsReadingX[i][2]= parseInt(Readingrows[i])
      }
      for(var i = 0; i<Sciencerows.length; i++){
        TopicsScienceX[i][2]= parseInt(Sciencerows[i])
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
   
      return([TopicsMathX,TopicsVerbalX,TopicsReadingX,TopicsScienceX])
    }
  
    setTopicsMath(TopicsMathX)
    setTopicsVerbal(TopicsVerbalX)
    
  }
  console.log('MathrowsGlobal', MathrowsGlobal)
  function CreateRows(data = null, index= 0, CurrTest = 0){
    if(CurrTest == 0){
      CurrTest = CurrentTest
    }
      function removeDuplicates(arr) {
        let uniqueArr = [];
        for(let i = 0; i < arr.length; i++) {
            if(uniqueArr.indexOf(arr[i]) === -1) {
                uniqueArr.push(arr[i]);
            }
        }
        return uniqueArr;
    }
  
   
    
    if(true){
 
      var Arrs = GetDataFromSpreadsheet(data,CurrTest)
   
      var Mathrows = []
      var Verbalrows = []
      var Readingrows = []
      var Sciencerows = []
      
      if(CurrTest == 'SAT'){
        CurrentTestTopics = Topics
      }else if(CurrTest == 'ACT'){
        CurrentTestTopics = TopicsACT
      }
      function removeEmptyElements(arr) {
          return arr.filter(Boolean);
      }
      for(var i = 0; i < CurrentTestTopics.length; i++){
        if(CurrentTestTopics[i][3] == 'Math'){
          MathConceptsArr[i] = CurrentTestTopics[i][0]
        }else if(CurrentTestTopics[i][3] == 'Verbal'){
          VerbalConceptsArr[i] = CurrentTestTopics[i][0]
        }
        else if(CurrentTestTopics[i][3] == 'Reading'){
          ReadingConceptsArr[i] = CurrentTestTopics[i][0]
        }
        else if(CurrentTestTopics[i][3] == 'Science'){
          ScienceConceptsArr[i] = CurrentTestTopics[i][0]
        }
      }
  
      MathConceptsArr = removeDuplicates(removeEmptyElements(MathConceptsArr))
      VerbalConceptsArr = removeDuplicates(removeEmptyElements(VerbalConceptsArr))
      ReadingConceptsArr = removeDuplicates(removeEmptyElements(ReadingConceptsArr))
      ScienceConceptsArr = removeDuplicates(removeEmptyElements(ScienceConceptsArr))
    

      for(var i = 0; i < MathConceptsArr.length; i++){
        Mathrows.push(createData(Arrs[0][i][0], Arrs[0][i][1], Arrs[0][i][2], Arrs[0][i][3], Arrs[0][i][4], Arrs[0][i][5]))
      }
      for(var i = 0; i < VerbalConceptsArr.length; i++){
        Verbalrows.push(createData(Arrs[1][i][0], Arrs[1][i][1], Arrs[1][i][2], Arrs[1][i][3], Arrs[1][i][4], Arrs[1][i][5]))
      }
      for (var i = 0; i < ReadingConceptsArr.length; i++){
        Readingrows.push(createData(Arrs[2][i][0], Arrs[2][i][1], Arrs[2][i][2], Arrs[2][i][3], Arrs[2][i][4], Arrs[2][i][5]))
      }
      for (var i = 0; i < ScienceConceptsArr.length; i++){
        Sciencerows.push(createData(Arrs[3][i][0], Arrs[3][i][1], Arrs[3][i][2], Arrs[3][i][3], Arrs[3][i][4], Arrs[3][i][5]))
      }

      

      if(index == 100){
        return([Mathrows,Verbalrows,Readingrows,Sciencerows])
      }
      setMathrowsGlobal(Mathrows)
      setVerbalrowsGlobal(Verbalrows)
      setReadingrowsGlobal(Readingrows)
      setSciencerowsGlobal(Sciencerows)
   
    }
   
    
  }

  
 
 
  

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
      if( CurrentTest != 'Other'){
        return(
          <Tooltip title="">
          <Button className={'IconDiv'} onClick={()=>setPageSwitch(3)}  style={{ backgroundColor: PageSwitch === 3 ? '#7494FB' : '' }} >
            
            <p className="NavTextStyle">Classroom</p>
          </Button>
          </Tooltip>
        )
      }
      else{
        return(null)
      }
    }

    function ShowQuiz(){
      if(CurrentTest == 'Other' || true){
        return(null)
      }
      else{
        return(
          <Tooltip title="">
          <Button className={'IconDiv'} onClick={() => { setPageSwitch(2); } } >

            <p>Quiz</p>
          </Button>
          </Tooltip>
        )
      }
    }

    function ShowPractice(){
      if(CurrentTest == 'Other' ){
        return(null)
      }
      else{
        return(
          <Tooltip title="">
          <Button className={'IconDiv'} onClick={() => { setPageSwitch(8); } } style={{ backgroundColor: PageSwitch === 8 ? '#7494FB' : '' }} >

            <p className="NavTextStyle">Practice</p>
          </Button>
          </Tooltip>
        )
      }
    }

    function ShowProgress(){
      if(CurrentTest == 'Other' ){
        return(null)
      }
      else{
        return(
          <Tooltip title="">
          <Button className={'IconDiv'} onClick={() => { setPageSwitch(1); } } style={{ backgroundColor: PageSwitch === 1 ? '#7494FB' : '' }} >

            <p className="NavTextStyle">Progress</p>
          </Button>
          </Tooltip>
        )
      }
    }

    if(Type[0] == '1'){
      return(
        null
      )
    }

    if((PageSwitch == 10 || PageSwitch == 9) && Type == 'Tutor'){
      
      function ShowSettings(){
        if(AdminBool == true && false){
          

          return(
            <Tooltip title="">
            <Button className={'IconDiv'} onClick={() => { setPageSwitch(9); } }  style={{ backgroundColor: PageSwitch === 9 ? '#7494FB' : '' }}>
              <p className="NavTextStyle">New User</p>
            </Button>
            </Tooltip>
          )
        }
      }
      var iconsize  = 25
      return(
        <><div className={'NavDiv'}>
          <div className="ImageCont">
           <img className="ImageDiv"  src={TutorSpaceLogo} />
           </div>
          <Tooltip title="">
            <Button className={'IconDiv'} onClick={()=>{setPageSwitch(10);resetAllStatesToOriginal();}} style={{ backgroundColor: PageSwitch === 10 ? '#7494FB' : '' }}>


              <p className="NavTextStyle"> Admin</p>
            </Button>
          </Tooltip>
          {ShowSettings()}
        </div><div className={'IconDivLogOffTutor'}>
            <Tooltip title="">
              <Link
                to={menuItems[0].link}

                onClick={menuItems[0].onClick}
                key={0}
                ref={(node) => {
                  links.current[0] = node;
                } }
              >
                <Button className={'IconDivLogOff2'} onClick={() => setPageSwitch(6)}>

                  <p className="NavTextStyle">Log Off</p>
                </Button>
              </Link>
            </Tooltip>
          </div></>
      )
    }

    if(Type == 'Tutor' && !(CurrentTest == 'Diagnostics')){
      var iconsize  = 25
      return(
        <><div className={'NavDiv'}>

          <div className="ImageCont">
            <img className="ImageDiv"  src={TutorSpaceLogo} />

          </div>
         
          <Tooltip title="">
            <Button className={'IconDiv'} onClick={() => {setPageSwitch(0);}} style={{ backgroundColor: PageSwitch === 0 ? '#7494FB' : '' }}>
              
  
              <p className="NavTextStyle" > Dashboard</p>
            </Button>
          </Tooltip>
          {ShowProgress()}
          {ShowQuiz()}
          {ShowPractice()}
          {GetClassroomIcon(iconsize)}
          
       
          <Tooltip title="">
          <Button className={'IconDiv'} onClick={() => setPageSwitch(4)} style={{ backgroundColor: PageSwitch === 4 ? '#7494FB' : '' }}>
            
            <p className="NavTextStyle">Calendar</p>
          </Button>
          </Tooltip>
          
          <Tooltip title="">
            <Button className={'IconDiv'} onClick={()=>{setPageSwitch(10);resetAllStatesToOriginal();}} >


              <p className="NavTextStyle"> Admin</p>
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
              <Button className={'IconDivLogOff2'} onClick={() => setPageSwitch(6)} style={{ backgroundColor: PageSwitch === 6 ? '#7494FB' : '' }}>
              
              <p className="NavTextStyle">Log Off</p>
              </Button>
            </Link>
            </Tooltip>
          </div></>
      )
    }
    else if(CurrentTest == 'Diagnostics' && Type == 'Tutor'){
      return(
        <><div className={'NavDiv'}>
          <div className="ImageCont">
           <img className="ImageDiv"  src={TutorSpaceLogo} />
           </div>
        <Tooltip title="Dashboard">
            <Button className={'IconDiv'}   >
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
            <Button className={'IconDivLogOff2'} onClick={() => setPageSwitch(6)} style={{ backgroundColor: PageSwitch === 6 ? '#7494FB' : '' }} >
              
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
      <div className="ImageCont">
           <img className="ImageDiv"  src={TutorSpaceLogo} />
           </div>
        <Tooltip title="Diagnostics">
          <Button className={'IconDiv'} onClick={() => { setPageSwitch(5); } }  style={{ backgroundColor: PageSwitch === 5 ? '#7494FB' : '' }}>
            
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
              <Button className={'IconDivLogOff2'} onClick={() => setPageSwitch(6)}  style={{ backgroundColor: PageSwitch === 6 ? '#7494FB' : '' }}>
              
              <p>Log Off</p>
              </Button>
            </Link>
            </Tooltip>
          </div></>
      )
    }
    else if(IsIndividual == true){
      return(
        <><div className={'NavDiv'}>
          <div className="ImageCont">
             <img className="ImageDiv"  src={TutorSpaceLogo} />
             </div>
           
  
            {ShowProgress()}
        
            {ShowQuiz()}
            <Tooltip title="">
            <Button className={'IconDiv'} onClick={() => { setPageSwitch(8); } } style={{ backgroundColor: PageSwitch === 8 ? '#7494FB' : '' }}>
              
              <p className="NavTextStyle">Practice</p>
            </Button>
            </Tooltip>
            <Tooltip title="">
            <Button className={'IconDiv'} onClick={() => { setPageSwitch(5); } }  style={{ backgroundColor: PageSwitch === 5 ? '#7494FB' : '' }} >
             
              <p>Diagnostics</p>
            </Button>
            </Tooltip>
            <p></p>
          
  
            
  
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
                <Button className={'IconDivLogOff2'} onClick={() => setPageSwitch(6)}  style={{ backgroundColor: PageSwitch === 6 ? '#7494FB' : '', borderBottomColor:'', borderTopColor:'#7494FB' }} >
                
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
        <div className="ImageCont">
           <img className="ImageDiv"  src={TutorSpaceLogo} />
           </div>
          <Tooltip title="">
            <Button className={'IconDiv'} onClick={() => {setPageSwitch(0);}} style={{ backgroundColor: PageSwitch === 0 ? '#7494FB' : '' }}>
              
  
              <p className="NavTextStyle" > Dashboard</p>

            </Button>
          </Tooltip>

          {ShowProgress()}
      
          {ShowQuiz()}
          <Tooltip title="">
          <Button className={'IconDiv'} onClick={() => { setPageSwitch(8); } } style={{ backgroundColor: PageSwitch === 8 ? '#7494FB' : '' }}>
            
            <p className="NavTextStyle">Practice</p>
          </Button>
          </Tooltip>
          <Tooltip title="">
          <Button className={'IconDiv'} onClick={() => { setPageSwitch(5); } }  style={{ backgroundColor: PageSwitch === 5 ? '#7494FB' : '' }} >
           
            <p>Diagnostics</p>
          </Button>
          </Tooltip>
          <p></p>
        

          

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
              <Button className={'IconDivLogOff2'} onClick={() => setPageSwitch(6)}  style={{ backgroundColor: PageSwitch === 6 ? '#7494FB' : '', borderBottomColor:'', borderTopColor:'#7494FB' }} >
              
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
      return(
        null
      )
      

    }
    else if(Type == 'Parent'){
      //Placeholder
      return(
        <>
      <p  className={'TitleTextStyle'}>Welcome to {UserName.toString().split(' ')[0]}'s Dashboard {ParentStudentName.toString().split(' ')[0]}</p>
      
        


      </>
      )
    }
  }

  function CreateWelcomeMessage(){
    if(Type == 'Student' || Type == 'Parent' || Type == 'Individual'){
      return(
        <>
        <p className={'TitleTextStyle'}>Welcome to your Dashboard, {UserName.toString().split(' ')[0]}</p>
        </>
      )
    }else if(Type == 'Tutor'){
      return(
        <>
        <p className={'TitleTextStyle'}>Welcome to {CurrentStudent.value.toString().split(' ')[0]}'s Dashboard, {UserName.toString().split(' ')[0]}</p>
    
        </>

      )
    }
  }

  function CreateWelcomeMessageClassroom(){
    return(
      <>
      <p className={'TitleTextStyle'}>Welcome to your Classroom's Dashboard, {UserName.toString().split(' ')[0]}</p>
      </>

    )
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
  const [penSize, setPenSize] = useState(4)
  const [currPDF, setcurrPDF] = useState('')
  const [showPDF, setshowPDF] = useState(false)
  const [whiteboardStyle, setwhiteboardStyle] = useState('sketchDivOutside')
  const [showCalculator, setshowCalculator] = useState(false)
  const [AddOrRemoveStudent, setAddOrRemoveStudent] = useState('add')

  /*
  useEffect(() => {
    const clearCanvasImage = canvasRefImage.current?.clearCanvas;
    if (clearCanvasImage) {
      clearCanvasImage();
    }
  }, [imageNumber]);
  */
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

 
    useEffect(()=>{
      if(ChangeAvailabilityObject !== null && Type == 'Tutor'){



        
        function reverseSelection(selectedTimes) {
        
          const selectedElements = selectedTimes.map((time) => {
          
            const [t, d] = time.split("-");
            return document.querySelector(`[time="${t}"][day="${d}"]`);
          });
          
          selectedElements.forEach((element) => {
           
            element.classList.add("tdSelected");
          });
          
        }
        reverseSelection(ChangeAvailabilityObject)
        
      }
    },[ChangeAvailabilityObject])






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
  
    /*
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
  */
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
      if(Type == 'Student' || Type == 'Parent' || Type == 'Individual'){

        if(NewArrFinished == true && dropdownDone == false){
    
            //setPageSwitch(1)
            try{
              setTimeout(() => {
                DropDownOnChange({value:UserName.toString() })
                setdropdownDone(true)
                
              }, 1000)
            }catch(e){
              console.log('err', e)
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
     
      
      for(var i = 0; i<AdminInfo.length; i++){
        
        if(AdminInfo[0][i] == student){
          if(AdminInfo[1][i] !== '' && AdminInfo[1][i] !== UserName.toString()){
       
            return(true)
          }
          else{
            return(false)
          }
        }
      }
    }

    if(AddStudentBinary){
      //Find Unique StudentsTotal
      let uniqueArray = [...new Set(StudentsTotal)];
      return(
        <FormGroup>
          
            {
              
              uniqueArray.map(obj=>{
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
      return("Add Student To My Roster")
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
        let uniqueArray = [...new Set(options)];
      
        const defaultOption = 'Please Choose Student';
       
        

        return(<Dropdown options={uniqueArray} onChange={(s)=>{DropDownOnChange(Remove(s),index)}} value={defaultOption} placeholder="Select an option" />)
      }
      else{
        return(null)
      }
    
  }
  const [DropdownSwitch, setDropdownSwitch] = useState(true)

  function GetMasterButton(){
    if(AdminBool == true){
      if(DropdownSwitch == false){
      return(<div className="MasterButton">
        <Button  style={{ backgroundColor:'#7494FB' }} color="black" onClick={()=>{setDropdownSwitch(!(DropdownSwitch))}}>
          Show All Students
        </Button>
        </div>
      )
      }else{
        return(
          <div className="MasterButton">
          <Button  style={{ backgroundColor:'#7494FB' }} color="black" onClick={()=>{setDropdownSwitch(!(DropdownSwitch))}}>
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
    
    function createData(Tutor, Student, NextMeeting, Email,ParentInfo, Phone, StudentProgress) {
      return { Tutor, Student, NextMeeting, Email,ParentInfo,Phone , StudentProgress};
    }

    function createParentData(Parent, Student,  Email, Phone) {
      return { Parent, Student, Email, Phone };
    }

    function createTutorData(Name, Email, Phone, Availability) {
      return { Name, Email, Phone, Availability };
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
      for(var x = 0; x < AdminInfo[0].length; x++){
        rows.push(createData(AdminInfo[1][x], AdminInfo[0][x], humanReadableDate(AdminInfo[2][x]), AdminInfo[3][x], [FindParents(AdminInfo[0][x])], AdminInfo[4][x], AdminInfo[5][x]))
      }
    }

    if(AdminInfoTutor !== null ){

      for(var x = 0; x < AdminInfoTutor[0].length; x++){
        rowsTutor.push(createTutorData(AdminInfoTutor[0][x], AdminInfoTutor[1][x], AdminInfoTutor[2][x], AdminInfoTutor[3][x]))
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


    function SwitchShowAvailability(x,name){
      if( ShowAvailabilityObjectName !== '' ){
        if(!ShowAvailabilityObject == false && name !== ShowAvailabilityObjectName){
          setShowAvailabilityObject(false)
        }else{
          setShowAvailabilityObject(!(ShowAvailabilityObject))
        }
        
      }
      
      setShowAvailabilityObjectName(name)
      setTimeout(() => {

        if(!ShowAvailabilityObject == false && name !== ShowAvailabilityObjectName){
          setShowAvailabilityObject(true)
        }
      }, 250);
      setTimeout(() => {
       
        setChangeAvailabilityObject(x)
        
      }, 750);
    }

   


    function SwitchShow(name){
      if(ShowAvailabilityObject && name == ShowAvailabilityObjectName){
        return("Hide")
      }else{
        
        return("Show")
      }
    }
    function showAvailability(){
      
      if(ShowAvailabilityObject){
        return(
          <div className='timeSelect' >
            <LabelColumn />
            <DayColumn day={'Sunday'}  />
            <DayColumn day={'Monday'} />
            <DayColumn day={'Tuesday'} />
            <DayColumn day={'Wednesday'} />
            <DayColumn day={'Thursday'} />
            <DayColumn day={'Friday'} />
            <DayColumn day={'Saturday'}/>
        </div>
        )
      }else{
        return(null)
      }

    }
    
    function Row(props) {

        function ShowProgressIcon(row){
          if(parseInt(row.StudentProgress) == 0){
            return (<FaArrowRight color="black" size={15} style={{marginTop:5}} />)

          }
          else if(parseInt(row.StudentProgress) > 0){
            return( <FaArrowUp color="green" size={15} style={{marginTop:5}} /> )
          } else{
            return( <FaArrowDown color="red" size={15} style={{marginTop:5}} />)
          }

        }
    
        const { row } = props;
        const [open, setOpen] = React.useState(false);
        function ShowNextMeeting(meeting){
          
          if(meeting != "Invalid Date"){
            return(meeting)
          }
          else{
            return('No Meeting Scheduled')
          }
        }
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
                  <TableCell align="right">{ShowNextMeeting(row.NextMeeting)} <span style={{display: "inline-block",width: "10px",height: "10px",borderRadius: "5px",backgroundColor: getDotColor()}}></span> </TableCell>
                 
                  <TableCell align="right"> {row.Email} <Button variant="text" color="black" onClick={()=>{window.open('mailto:'+row.Email)}}>  <FaEnvelope iconsize={35}/></Button></TableCell>
                  <TableCell align="right"> {row.Phone} <Button variant="text" color="black" onClick={()=>{window.open('tel:'+row.Phone)}}>  <FaPhone iconsize={35}/></Button></TableCell>
                  <TableCell align="right"> {row.StudentProgress} {ShowProgressIcon(row)}</TableCell>
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

      function PullFreeTrialData(){
      

        //Write a function that takes a datetime string and returns the number of days until that date
        function DaysUntilDate(DateString){
          var date = new Date(DateString);
          var today = new Date();
          var Difference_In_Time = date.getTime() - today.getTime();
          var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
          return(Math.round(Difference_In_Days))
        }


        if(InFreeTrial == true){
          return(
     
           <b>(Free Trial ending in {DaysUntilDate(FreeTrialEndingDay)} days)</b>
         
            )
        }
        else{
          return(null)
        }
      }

      function ChangeActive(){
    
        if(DisableService == true){
          return(<p style={{color:'green', fontWeight:'bold', fontSize:18}}>Active</p>)
        }else{
          return(<p style={{color:'red', fontWeight:'bold', fontSize:18}}>Disabled</p>)
        }
      }
      function ChangeActiveBilling(){
       
        if(DisableBilling == true){
          return(<p style={{color:'green', fontWeight:'bold', fontSize:18}}>Active</p>)
        }else{
          return(<p style={{color:'red', fontWeight:'bold', fontSize:18}}>Disabled</p>)
        }
      }
      if(AdminBool == true){
        return(
          <div >
          <p className="TextStyleLight">Students/Parents</p>
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
                <TableCell align="right">Progress</TableCell>
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
        <p className="TextStyleLight">Tutors</p>
  
        <div className="MaxHeightDivLarge">
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Phone</TableCell>
              <TableCell align="right">Availability</TableCell>
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
                <TableCell align="right"> <Button variant="text" color="black" onClick={()=>{SwitchShowAvailability(row.Availability, row.Name)}}>  {SwitchShow(row.Name)} </Button></TableCell>
                <TableCell align="right"> <Button variant="text" color="black" onClick={()=>{showAlert(row.Name) }}>  <FaTimes iconsize={35}/></Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </div>

      {showAvailability()}
     
        </div>
        )
      }
    }
    //AdminInfo
    if(Type == 'Tutor'){
      //
      return(
      <Fragment>
        <p className="TextStyleLight">{CompanyCode} Students</p>
        <p className="TextStyleLight"> </p>
        <div className="FullScreen">
          {SwitchDropdowns()}
          <p className="TextStyleLight"> </p>
          <div className='AddStudentPadding'>

          </div>
          <Button  style={{ backgroundColor:'#7494FB' }} color="black" onClick={()=>{setAddStudentBinary(!(AddStudentBinary))}}>
          {SwitchButton()}
          </Button>
          
          <div className="MaxHeightDiv">
            {GetStudentChecklist()}
          </div>
          {GetMasterButton()}
          <div className="AdminDiv">
          {IsAdmin()}
          </div>
         
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
  function GetHWPercentage(name){
    //HWrowsGlobal[index].Percent
    var index = HWrowsGlobal.findIndex(x => x.Category === name);
    if(index == -1){
      return(0)
    }
    else{
   
      return(HWrowsGlobal[index].Percent)
    }
  }

  function PullTestGradeForTutor(num){



    function showInputBluebookGrade() {

      function ChangeBluebookGrade(num, pos, grade) {
        var tempBluebookTestGrades = BluebookScore;
        var tempPos = num + pos;
        tempBluebookTestGrades[tempPos] = grade.toString();
        setBluebookScore(tempBluebookTestGrades);
        UpdateBluebookScore(tempBluebookTestGrades);
      }
      function GetBluebookGrade(num, pos) {
     
          var tempPos = num + pos + (num-1);
   
          if(tempPos <= BluebookScore.length){
           
            return BluebookScore[tempPos-1];
            
          }else{
            return(400)
          }
        
      }

      if (showBluebookTest == true && CurrentTestNumber <= 4) {
        return (
          <div className="BluebookGradeDiv">
            <p className="TextStyleLightInstructions">Bluebook Grade</p>
            <div className="rowDiv">
            <div className="columnDivBluebook">
            <p className="TextStyleLightInstructions">Math</p>
            <Dropdown
              options={[200,210,220,230,240,250,260,270,280,290,300,310,320,330,340,350,360,370,380,390, 400, 410, 420, 430, 440, 450, 460, 470, 480, 490, 500, 510, 520, 530, 540, 550, 560, 570, 580, 590, 600, 610, 620, 630, 640, 650, 660, 670, 680, 690, 700, 710, 720, 730, 740, 750, 760, 770, 780, 790, 800]}
              onChange={(x) => {
                //setBluebookScore([x.value, Blueboo);
                ChangeBluebookGrade(CurrentTestNumber, 0, x.value);
              }}
              value={GetBluebookGrade(CurrentTestNumber, 0).toString()}
              //value={(BluebookScore[0]).toString()}
              placeholder="Select a test"
            />
            </div>
            <div className="columnDivBluebook">
            <p className="TextStyleLightInstructions">Verbal</p>
           
            <Dropdown
              options={[200,210,220,230,240,250,260,270,280,290,300,310,320,330,340,350,360,370,380,390, 400, 410, 420, 430, 440, 450, 460, 470, 480, 490, 500, 510, 520, 530, 540, 550, 560, 570, 580, 590, 600, 610, 620, 630, 640, 650, 660, 670, 680, 690, 700, 710, 720, 730, 740, 750, 760, 770, 780, 790, 800]}
              onChange={(x) => {
                //setBluebookScore([BluebookScore[0], x.value]);
                ChangeBluebookGrade(CurrentTestNumber, 1, x.value);
              }}
              value={GetBluebookGrade(CurrentTestNumber, 1).toString()}
              placeholder="Select a test"
            />
            </div>
            </div>
          </div>
        );
      } else {
        return (
          <p className="TextStyleLight">
            Verbal - {SATLineDataVerbal[num].y} / Math - {SATLineDataMath[num].y} / Total - {SATLineDataTotal[num].y}
          </p>
        );
      }
    }

    if(CurrentTest == 'SAT'){
      return(
        <div className="ScoreDiv">

               {showInputBluebookGrade()}


                {GetDownloadLink(num)}
                <div className="BluebookDiv">
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    style={{ backgroundColor: showBluebookTest ? '#7494FB' : '#FFFFFF', color: 'black', marginRight: 10 }}
                    onClick={() => {
                        if (window.confirm("Switching to Bluebook will overwrite previous data. Proceed?")) {
                            setShowBluebookTest(true);
                        }
                    }}
                >
                    Bluebook
                </Button>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    style={{ backgroundColor: !showBluebookTest ? '#7494FB' : '#FFFFFF', color: 'black' }}
                    onClick={() => {
                        if (window.confirm("Switching to Linear will overwrite previous data. Proceed?")) {
                            setShowBluebookTest(false);
                        }
                    }}
                >
                    Linear
                </Button>
                </div>
              </div>

              
      )
    }
    else if(CurrentTest == 'ACT'){
      return(
        <div className="ScoreDiv">
                <p className="TextStyleLight">English - {ACTLineDataEnglish[num].y} / Math - {ACTLineDataMath[num].y} / Reading - {ACTLineDataReading[num].y} / Science - {ACTLineDataScience[num].y} / Total - {ACTLineDataTotal[num].y}</p>
                {GetDownloadLink(num)}
              </div>
      )
    }
  }

  function ErrorScreen(){
    if(ErrorScreenOn == true){
      return(
        <p  className={'TitleTextStyleLight'}>There appears to be an error loading your information. If you're a new member, please reach out to joseph@tutorspace.app for assistance with setting up your account. Otherwise, please refresh the page.</p>
      )
    }
  }

  function TooSmallScreen(){
    if(true){
      return(
        <p  className={'TitleTextStyleLight'} style={{"textAlign":'center'}}>Please use a larger screen to view this page.</p>
      )
    }
  }


  function DisabledScreen(){
    if(true){
      return(
        <p  className={'TitleTextStyleLight'}>Your Admin has disabled your account, please reach out to them directly. </p>
      )
    }
  }

//AssignmentsDoneClassroom

function ShowTopicsClassroom(){
   
    if(true){

      const assignmentsDoneGlobalSet = new Set(AssignmentsDoneClassroom);

      return(
        <div>
          {/* Convert Set to Array and map over it */}
          {[...assignmentsDoneGlobalSet].map((topic, index) => (
            <p className="TitleTextStyleSmallTopics" key={index}>{topic}</p>
          ))}
      
          {/* Mapping over filteredTopicsFullACT and printing items that have not been printed above. */}
          
        </div>
      )
    }else if(CurrentTest == 'ACT'){
      // Creating a set of all topics from AssignmentsDoneGlobal for efficient lookup.

  const assignmentsDoneGlobalSet = new Set(AssignmentsDoneClassroom);

  // Filtering TopicsFullACT to only include items that are not in AssignmentsDoneGlobal and obj[1] is true.
  const filteredTopicsFullACT = TopicsFullACT.filter(obj => obj[1] === true && !assignmentsDoneGlobalSet.has(obj[0]));

    
  return(
    <div>
      {/* Convert Set to Array and map over it */}
      {[...assignmentsDoneGlobalSet].map((topic, index) => (
        <p className="TitleTextStyleSmallTopics" key={index}>{topic}</p>
      ))}
  
      {/* Mapping over filteredTopicsFullACT and printing items that have not been printed above. */}
      
    </div>
  )
    }
}

  function ShowTopics(){
   
    if(true){

      const assignmentsDoneGlobalSet = new Set(AssignmentsDoneGlobal);

      return(
        <div>
          {/* Convert Set to Array and map over it */}
          {[...assignmentsDoneGlobalSet].map((topic, index) => (
            <p className="TitleTextStyleSmallTopics" key={index}>{topic}</p>
          ))}
      
          {/* Mapping over filteredTopicsFullACT and printing items that have not been printed above. */}
          
        </div>
      )
    }else if(CurrentTest == 'ACT'){
      // Creating a set of all topics from AssignmentsDoneGlobal for efficient lookup.

  const assignmentsDoneGlobalSet = new Set(AssignmentsDoneGlobal);

  // Filtering TopicsFullACT to only include items that are not in AssignmentsDoneGlobal and obj[1] is true.
  const filteredTopicsFullACT = TopicsFullACT.filter(obj => obj[1] === true && !assignmentsDoneGlobalSet.has(obj[0]));

    
  return(
    <div>
      {/* Convert Set to Array and map over it */}
      {[...assignmentsDoneGlobalSet].map((topic, index) => (
        <p className="TitleTextStyleSmallTopics" key={index}>{topic}</p>
      ))}
  
      {/* Mapping over filteredTopicsFullACT and printing items that have not been printed above. */}
      
    </div>
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
    for (var i = 0; i < ReadingrowsGlobal.length; i++) {
      var Temp = [ReadingrowsGlobal[i].Category,ReadingrowsGlobal[i].Percent]
      EnglishList.push(Temp)
    }
    for (var i = 0; i < SciencerowsGlobal.length; i++) {
      var Temp = [SciencerowsGlobal[i].Category,SciencerowsGlobal[i].Percent]
      MathList.push(Temp)
    }
    //Remove assignmentsDoneGlobal from both 
    for(var i = 0; i<AssignmentsDoneGlobal.length; i++){
      for(var x = 0; x<MathList.length; x++){
        if(AssignmentsDoneGlobal[i] == MathList[x][0]){
          MathList[x][1] = 200
        }
      }
      for(var x = 0; x<EnglishList.length; x++){
        if(AssignmentsDoneGlobal[i] == EnglishList[x][0]){
          EnglishList[x][1] = 200
        }
      }
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
    console.log('err', e)
    return([])
  }
  }

  useEffect(()=>{
    UpdateStudentNeedsImprovement(ShowAreasOfImprovement())

  },[MathrowsGlobal,VerbalrowsGlobal,ReadingrowsGlobal,SciencerowsGlobal])

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
  if(DisableService == false && AdminBool == false){

    return(
      <>
      <Fragment>
      {DisabledScreen()}
      </Fragment>
      </>
    )
  }
  if(PageSwitch == 11){
    return(
      <>

      <Fragment>
      {TooSmallScreen()}
     
      </Fragment>
      </>
    )
  }
  if(PageSwitch == 10){

    
    return(
      <>
      {GetNavigation()
      }
      <Fragment>
      {ErrorScreen()}
      {FrontPageIsTutor()}
      </Fragment>
      </>
    )
  }
  function RemoveIfOther(){
    if(CurrentTest == 'Other'){
      return(null)
  }else{

    return(



      <div style={{marginTop:30}}>
      
      <Box sx={{ width: '95%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={valueTab} onChange={handleChangeTab} aria-label="basic tabs example" variant="fullWidth" //sx={{backgroundColor: 'red'}}
          >
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
          <Spreadsheet data={data} onChange={setData} darkMode={false} hideRowIndicators={true} hideColumnIndicators={true} />
        </div>
   
   
   
    

    <div className="SubmitTest">
            <Button variant="outlined" onClick={()=>{CompleteData()}} className={'NotepadButton'} >
              <p>Save Test</p>
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
      </div>
    )
  }
  }
  function ShowPopup(){
    function extractTextBetween(str, startChar, endChar, startCharInstance = 1) {
      // Escaping special characters for regex use
      startChar = startChar.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      endChar = endChar ? endChar.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') : '';
  
      // Adjusting the regex pattern based on whether endChar is provided
      const regexPattern = endChar ? `(?:${startChar}.*?){${startCharInstance}}(.*?)${endChar}` : `(?:${startChar}.*?){${startCharInstance}}(.*)`;
      const regex = new RegExp(regexPattern);
  
      const matches = regex.exec(str);
      return matches ? matches[1].trim() : null;
  }
  
  function splitTextAndFormat(text, startChar, endChar, splitWord, startCharInstance = 1) {
    // Extract text between startChar and endChar, at the specified instance of startChar
    let extractedText = extractTextBetween(text, startChar, endChar, startCharInstance);

    if (!extractedText) {
        return <li className="TitleTextStyleSmallPopup">No valid text found</li>;
    }

    // Check if splitWord is present and split
    if (extractedText.includes(` ${splitWord} `)) {
        return extractedText.split(` ${splitWord} `).map((text, index) => (
            <li className="TitleTextStyleSmallPopup" key={index}>{text.trim()}</li>
        ));
    } else {
        return <li className="TitleTextStyleSmallPopup">{extractedText}</li>;
    }
    }

    function splitTextAndFormatToArray(text, startChar, endChar, splitWord, startCharInstance = 1) {
      // Extract text between startChar and endChar, at the specified instance of startChar
      let extractedText = extractTextBetween(text, startChar, endChar, startCharInstance);

      if (!extractedText) {
          return ["No valid text found"];
      }

      // Check if splitWord is present and split
      if (extractedText.includes(` ${splitWord} `)) {
          return extractedText.split(` ${splitWord} `).map(item => item.trim());
      } else {
          return [extractedText];
      }
    }
    function CombineTwoArrays(array1, array2){
      var array3 = []
      for(var i = 0; i<array1.length; i++){
        array3.push(array1[i])
      }
      for(var i = 0; i<array2.length; i++){
        array3.push(array2[i])
      }
      return(array3)
    }
    function ShowRejectIfTutor(){
      if(Type == 'Tutor'){
        return(
          <div className="AIPopupButtonDiv">
          <Button className="buttonWidthStyling" onClick={() => { console.log('clicked');UpdateStudentAssignmentsViewed();closeModalAI() } } color="black" style={{ backgroundColor: '#7494FB' }}> Reject </Button>
        </div>
        )
      }
      else{
        return(null)
      }
    }
    function ShowProplem(){
      if(CurrentStudentTestDate ==(new Date())){
        return(
          <p className="TitleTextStyleExtraSmallPopup">Must change Test Date</p>
        ) 
      } else if(CurrentTest == ''){
        return(
          <p className="TitleTextStyleExtraSmallPopup">Must select Test Type</p>
        )
      } else if(IntensityOfStudying == ''){
        return(
          <p className="TitleTextStyleExtraSmallPopup">Must select Intensity of Studying</p>
        )
      } else if(WeeklySchedule == ''){
        return(
          <p className="TitleTextStyleExtraSmallPopup">Must select Weekly Schedule</p>
        )
      }
    }
    function AllowDismiss(){
      if(CurrentStudentTestDate !== (new Date()) && CurrentTest !== '' && IntensityOfStudying !== '' && WeeklySchedule !== ''){
        return(<Button className="buttonWidthStyling" onClick={() => { console.log('clicked'); closeModalAI() } } color="black" style={{ backgroundColor: '#7494FB' }}> Finish </Button>
        )
      }else{
        return(null)
      }
    }
    if(WeeklySchedule == (new Date())){
      return(
        <><p className="TitleTextStyleSmallPopupHeader">Hey {UserName.toString().split(' ')[0]}! Let's start by gathering some information</p><p className="TitleTextStyleSmallPopup">Test Date</p><DatePicker
          selected={CurrentStudentTestDate}
          onChange={(date) => {
            setCurrentStudentTestDate(date);
            UpdateStudentTestDate(date);
          } }
          customInput={<TextField />} /><p className="TitleTextStyleSmallPopup">Test Type</p><Dropdown options={['SAT', 'ACT', 'Other']} onChange={(x) => { setUpdatedCurrentTest(x.value); } } value={CurrentTest} placeholder="Select a test" /><p className="TitleTextStyleSmallPopup">Intensity of Studying</p><input type="range" min="1" max="5" value={IntensityOfStudying} onChange={(e) => setIntensityOfStudying(e.target.value)} /><p className="TitleTextStyleSmallPopup">Weekly Practice Day</p><Dropdown options={['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']} onChange={(x) => { setWeeklySchedule(x.value); } } value={WeeklySchedule} placeholder="Select a day" /><div className="AIPopupButtonDiv">
            <div style={{height: 25}}></div>
            {AllowDismiss()}
            {ShowProplem()}
            <div style={{height: 25}}></div>
          </div></>
      )
    }
    else if(modalType == 'Assignments'){
      return(
        <><p className="TitleTextStyleSmallPopupHeader">Hey {UserName.toString().split(' ')[0]}! Here are your suggested weekly assignments</p>
       <p className="TitleTextStyleSmallPopup"> {extractTextBetween(SuggestedAssignments,'of',':')} Sections / Quizes </p>
        {splitTextAndFormat(SuggestedAssignments,':','.','and')}
   
       <p className="TitleTextStyleSmallPopup"> Homework Assignments </p>
       {splitTextAndFormat(SuggestedAssignments,':','','and',2)}

      <div className="AIPopupButtonDiv" style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button className="buttonWidthStyling" onClick={() => { console.log('clicked');UpdateStudentAssignmentsViewed();SubmitMultipleAssignments(CombineTwoArrays(splitTextAndFormatToArray(SuggestedAssignments,':','.','and'),splitTextAndFormatToArray(SuggestedAssignments,':','','and',2)));closeModalAI()  } } color="black" style={{ backgroundColor: '#7494FB', marginRight:10 }}> Accept </Button>
          <div style={{width: 10}}></div>
          {ShowRejectIfTutor()}
        </div>
          </>
      )
    }
    else if(modalType == 'AI'){
      //This is where the popup information will go
      return(
        <><p className="TitleTextStyleSmallPopupHeader">Hey {UserName.toString().split(' ')[0]}! Here is some popup information </p>
        <p className="TitleTextStyleSmallPopup">Some info</p>
        </>
        
      )
    }
   
   }
  if(PageSwitch == 0){

    function ShowCompletedAssignments(){
      if(Type == 'Tutor'){
        return(
          <div className ={'buttonDivCompleteAssignments'} >
          <Button className = "buttonWidthStylingComplete" onClick={()=>{RemoveAssignments()}} style={{ backgroundColor:'#7494FB' }} color="black" >Complete</Button>
        </div>
        )
        }else{
          return(null)
        }
      }

      function ShowAssignTask(){
        if(true){
          return(
            <div className ={'ButtonDivWaiting'} >
            <Button className="buttonWidthStyling" onClick={()=>{SubmitAssignment()}}  color="black" style={{ backgroundColor:'#7494FB' }} >Assign</Button>
          </div>
          )
        }else{
          return(

            <div className ={'ButtonDivWaiting'} >
                  <div className = "buttonWidthStylingComplete"></div>
                      </div>
          )
        }
      }
    //placeholderClass

    function ShowAvailability(){
      if(Type == 'Student'){
        return(
          <>
          <p className={'TitleTextStyleSmall'}>Tutor's Availability</p>
          <div style={{backgroundColor:'white', padding:'2%', paddingBottom:'4%', borderRadius:'4%', marginTop:'4%'}}>
           
          <TimeSelect />
        </div>
        </>
        )
      }
    }

    /*
    information the AI popup needs to gather from the user:
    1. Test Date
    2. Test Type
    3. intesnity of studying
    4. Weekly Schedule
    
    */

   

  
    return(
      <>
      {GetNavigation()}
      <div className="boxDiv">
      <div id='test'></div>
      <Fragment>
      
      {AddErrorMessgae()}
       {CreateWelcomeMessage()}
        
        
        <Modal
          isOpen={modalAIIsOpen}
          onRequestClose={closeModalAI}
          className={modalType == 'AI' ? 'AIPopupSmall' : 'AIPopup'}
          contentLabel="Example Modal"
        >
      
          {ShowPopup()}
     
        </Modal>
        
        <div className={'NotepadButtonDiv'}>
          <div>
          <p className={'TitleTextStyleSmallTestDate'}>Test Date</p>
          <div className="testDateDiv">
            <DatePicker
            selected={CurrentStudentTestDate}
            onChange={(date) => {
              setCurrentStudentTestDate(date);
              UpdateStudentTestDate(date);
            }}
            customInput={<TextField />}
          />
          </div>
          </div>
        <div className="VideoConferenceDiv">
          <p className="TitleTextStyleSmallVC">Video Chat </p>
            <Button target="_blank" href={ZoomLink}>
              <FaVideo size={50} color={'black'} />
            </Button>
        </div>
        <div className="CurrentTest">
          <p  className={'TitleTextStyleSmall2'}>Test Type</p>
          <Dropdown options={['SAT','ACT','Other']} onChange={(x)=>{setUpdatedCurrentTest(x.value)}} value={CurrentTest} placeholder="Select a test" />
        </div>
         

        
        </div>

  
     
                
            

      

        
        
        {//GetDropDown()
        }

        

        {
          /*
          onChange={(date:Date) => setNextCurrentStudentDate(date)}
          */
        }
        <div className='rowDiv'>
        <div className="columnDivCalendar">
        
          <p className={'TitleTextStyleSmall'}>Next Meeting</p>
       

            <p className="centerText">{formatDateString(NextCurrentStudentDate.toString())}</p>
            
     
        </div>
        <p></p>
        <div className="middlePart">
        <div className="columnDivAssignments">
          <p  className={'TitleTextStyleSmall'}>Assignments</p>
          <CustomDropdown options={TopicsNamesFull} onChange={(x)=>{setNewAssignment(x); }} placeholder="Select a assignment" />

         {ShowAssignTask()}
        </div>


        <div className="columnDivAssignments2">
        <div className="rowDivAssigned">
          <p  className={'TitleTextStyleSmall'}>Assigned</p>
          <div 
              className="hover-component" 
              onMouseEnter={() => setIsHovered(true)} 
              onMouseLeave={() => setIsHovered(false)}
          >
              <div className="icon">

               <FaInfo size={'8%'}/>

              </div>
              {isHovered && <div className="info">Submit all of your assignments to get a new custom set</div>}
          </div>
          </div>
        <div className="formDivContainer">
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
        
        {ShowCompletedAssignments()}

        </div>
        </div>
       
        
        </div>
        
        <div className="columnDivNotepad">
          <p className={'TitleTextStyleSmall'}>Student Feedback</p>
          <div className="StudentNotepadDiv">
          <textarea
              id={2}
              type="text"
              value={TextOutput}
              placeholder={'Enter Text Here'}

              onChange={handleTextChange}
              rows="15"
              style={{width:'100%', height:'100%'}}

              //onChange={this.changeValue.bind(this)}
              //onChange={(text)=>{UpdateNotepad(text)}}
              //onKeyPress={this.handleKeyPress.bind(this)}
              //onFocus={() => !locked && this.setState({ active: true })}
              //onBlur={() => !locked && this.setState({ active: true })}
            />
          </div>
          
        </div>

        
      

      
          
        
       
        

        <div className="TopicsContainer">

          <p  className={'TitleTextStyleSmallTopic'}>Completed Assignments</p>

        <div className={'TopicsDiv'}>
        
          

          <FormGroup>
          
            {
              
              ShowTopics()
            }    
          
          </FormGroup>
        </div>

        </div>
       
         <div style={{height:'50vh'}}></div>
        <p className={'TitleTextStyleSmall'}>Test Synopsis</p>
            {MathrowsGlobal.length > 0 && (
            <><EnhancedTableToolbar numSelected={selectedMath.length} /><TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                  <EnhancedTableHeadMath
                    numSelected={selectedMath.length}
                    order={orderMath}
                    orderBy={orderByMath}
                    onSelectAllClick={handleSelectAllClickMath}
                    onRequestSort={handleRequestSortMath}
                    rowCount={MathrowsGlobal.length} />
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
                            className="tableRow"
                          >
                            <StyledTableCell align="right">
                              {row.Category}
                            </StyledTableCell>

                            <StyledTableCell align="right">{row.Right}</StyledTableCell>
                            <StyledTableCell align="right">{row.Wrong}</StyledTableCell>
                            <StyledTableCell align="right">{row.Blank}</StyledTableCell>
                            <StyledTableCell align="right">{row.Percent}%</StyledTableCell>

                            <StyledTableCell align="right">{GetHWPercentage(row.Category)}</StyledTableCell>
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
              </TableContainer></>
            )}
            {VerbalrowsGlobal.length > 0 && (<>
            <EnhancedTableToolbar numSelected={selectedVerbal.length} /><TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <EnhancedTableHeadVerbal
                  numSelected={selectedVerbal.length}
                  order={orderVerbal}
                  orderBy={orderByVerbal}
                  onSelectAllClick={handleSelectAllClickVerbal}
                  onRequestSort={handleRequestSortVerbal}
                  rowCount={VerbalrowsGlobal.length} />
                 
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
                          className="tableRow"
                        >
                          <StyledTableCell align="right">
                            {row.Category}
                          </StyledTableCell>

                          <StyledTableCell align="right">{row.Right}</StyledTableCell>
                          <StyledTableCell align="right">{row.Wrong}</StyledTableCell>
                          <StyledTableCell align="right">{row.Blank}</StyledTableCell>
                          <StyledTableCell align="right">{row.Percent}%</StyledTableCell>
                          
                          <StyledTableCell align="right">{GetHWPercentage(row.Category)}</StyledTableCell>
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
            </>
            )}
            
            {ReadingrowsGlobal.length > 0 && (<>
            <EnhancedTableToolbar numSelected={selectedReading.length} /><TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <EnhancedTableHeadVerbal
                  numSelected={selectedReading.length}
                  order={orderReading}
                  orderBy={orderByReading}
                  onSelectAllClick={handleSelectAllClickReading}
                  onRequestSort={handleRequestSortReading}
                  rowCount={ReadingrowsGlobal.length} />
                 
                <TableBody>
                  {stableSort(ReadingrowsGlobal, getComparator(orderReading, orderByReading))

                    .map((row, index) => {
                      const isItemSelected = isSelectedReading(row.Category);
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
                          className="tableRow"
                        >
                          <StyledTableCell align="right">
                            {row.Category}
                          </StyledTableCell>

                          <StyledTableCell align="right">{row.Right}</StyledTableCell>
                          <StyledTableCell align="right">{row.Wrong}</StyledTableCell>
                          <StyledTableCell align="right">{row.Blank}</StyledTableCell>
                          <StyledTableCell align="right">{row.Percent}%</StyledTableCell>
                          
                          <StyledTableCell align="right">{GetHWPercentage(row.Category)}</StyledTableCell>
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
            </>)}

            {SciencerowsGlobalClassroom.length > 0 && (<>
            <EnhancedTableToolbar numSelected={selectedScience.length} /><TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <EnhancedTableHeadVerbal
                  numSelected={selectedScience.length}
                  order={orderScience}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClickScience}
                  onRequestSort={handleRequestSortScience}
                  rowCount={SciencerowsGlobalClassroom.length} />
                 
                <TableBody>
                  {stableSort(SciencerowsGlobalClassroom, getComparator(orderScience, orderByScience))

                    .map((row, index) => {
                      const isItemSelected = isSelectedScience(row.Category);
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
                          className="tableRow"
                        >
                          <StyledTableCell align="right">
                            {row.Category}
                          </StyledTableCell>

                          <StyledTableCell align="right">{row.Right}</StyledTableCell>
                          <StyledTableCell align="right">{row.Wrong}</StyledTableCell>
                          <StyledTableCell align="right">{row.Blank}</StyledTableCell>
                          <StyledTableCell align="right">{row.Percent}%</StyledTableCell>
                          
                          <StyledTableCell align="right">{GetHWPercentage(row.Category)}</StyledTableCell>
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
            </>)}
            
          {ShowAvailability()}
      </Fragment>
      </div>
      
      </>
    )
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

  function SwitchSATACTTopicsList(type, practice = true) {

    let selectedTopic = ''
    if(type == 'Math'){
      selectedTopic = TopicsMath
    }else if(type == 'Verbal'){
      selectedTopic = TopicsVerbal
    }else if(type == 'Reading'){
      selectedTopic = TopicsReading
    }else if(type == 'Science'){
      selectedTopic = TopicsScience
    }
    else if(type == 'VerbalAndReading'){

      let combinedArray = TopicsVerbal.concat(TopicsReading);
      selectedTopic = combinedArray
    }

    

    function CheckCurrentTopic(obj, testType) {
        if ((testType && CurrentLocalTopicForQuestions === obj[0]) || (!testType && CurrentQuizTopic === obj[0])) {
            return { backgroundColor: '#7494FB' };
        }
        return {};
    }

    function PullPractice(obj) {
        return (
            <div className={'quizTopicsContainer'}>
                <Button 
                    className={'quizTopics'} 
                    onClick={() => {
                        practice ? setCurrentLocalTopicForQuestions(obj[0]) : setCurrentQuizTopic(obj[0]);
                     

                    }} 
                    style={CheckCurrentTopic(obj, practice)}>
                        <p className={'quizTopicsP'}>{obj[0]}</p>
                </Button>
                <div style={{ width: 50, height: 50, marginTop:2,marginLeft:5}}>
                    <CircularProgressbar 
                        value={obj[2]}
                        text={`${obj[2]}`}
                        styles={buildStyles({
                            rotation: 0.0,
                            strokeLinecap: 'butt',
                            textSize: '35px',
                            pathTransitionDuration: 0.5,
                            pathColor: GetColorProgressBar(obj[2]),
                            textColor: 'black',
                            trailColor: '#d6d6d6',
                            backgroundColor: '#3e98c7'
                        })}
                    />
                </div>
                {//GetChecks(obj[0])
                }
            </div>
        );
    }

    return selectedTopic.map(obj => PullPractice(obj));
}
  
  function CreateNewQuiz(QuizName){
    //Placeholder Quiz
    //When looking back at this in the future. You must change the Topics variable at the begining of the file to add new quiz name. Must also move it to database.
    
   
    
   
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

    function ShowTestQuestions(){
      if(CurrentTest == 'SAT'){
        return(
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
               SwitchSATACTTopicsList('VerbalAndReading')
                } 
              </TabPanel>
            

             


            </Box>
        )


      }
      else if(CurrentTest == 'ACT'){

        return(
          <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={valueTabQuiz} onChange={handleChangeTabQuiz} aria-label="basic tabs example" variant="fullWidth">
                
                  <Tab label="Math" {...a11yProps(0)} />
                  <Tab label="Reading and Writing" {...a11yProps(1)} />
                  <Tab label="Science" {...a11yProps(2)} />
                 
                
                </Tabs>
              </Box>
           
              <TabPanel value={valueTabQuiz} index={0}>
                {
                SwitchSATACTTopicsList('Math')
                }    
              </TabPanel>
              <TabPanel value={valueTabQuiz} index={1}>
                
                {
               SwitchSATACTTopicsList('VerbalAndReading')
                } 
              </TabPanel>

              <TabPanel value={valueTabQuiz} index={2}>

                {
                SwitchSATACTTopicsList('Science')
                }
              </TabPanel>
            

             


            </Box>
        )
      }
    }

    return (
      <>
      {GetNavigation()}
      <div>
      <Fragment>
        {//GetDropDown(99)
        }
            <div className ={'rowDiv'}>
             
          
            
            <div className ={'columnDiv'}>
            
            
            {ShowTestQuestions()}
           
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
                      className="tableRow"
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
        </div>
        </>
        )
  }
 

  function ChangeTestLength(num){
    if(num == 1){
      return(1)
    }
    else{
      return(num)
    }
  }
  function GetChart(){
  
    if(true){
      return(
        CurrChart
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

  
    if(Type == 'Tutor'){
  
    return(
    <>
    <p className={'TitleTextStyleSmall'}>Tutor Notes</p>
    {//ShowEditButton()
    }
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


       
          <textarea
            id={2}
            type="text"
            value={TutorNotes}
            placeholder={'Enter Text Here'}
            onChange={handleTextChangeTutorNotes}
            rows="6" />
       
      </Modal></>
    )
        }
        else{
          return(<p className={'TitleTextStyleSmall'}>‎ </p>)
        }
  }

  if(PageSwitch == 1){
    function GetHWPercentage(name){
      //HWrowsGlobal[index].Percent
      var index = HWrowsGlobal.findIndex(x => x.Category === name);
      if(index == -1){
        return(0)
      }
      else{
        return(HWrowsGlobal[index].Percent)
      }
    }
    function ShowTextArea(){
 
      if(Type == 'Tutor'){
        return(
          <div className="columnDivImprovement">
           {EditTutorNotes()}
          
          <textarea
            id={2}
            type="text"
            value={TutorNotes}
            placeholder={'Enter Text Here'}
            onChange={handleTextChangeTutorNotes}
            rows="6" 
            style={{width:'100%'}}
            />
     

        
      </div>
        )

      }else{
        return(null)
      }
    }
    function ShowTutorNotes(){
      if(Type == 'Tutor'){
        return(
          <div className="columnDivImprovement">
          <textarea
                  id={2}
                  type="text"
                  value={TutorNotes}
                  placeholder={'Enter Text Here'}
                  onChange={handleTextChangeTutorNotes}
                  rows="6" 
                  style={{width:'100%', height:'90%'}}
                  />
                  </div>
        )
      }else{
        return(
          <div className="columnDivImprovementClear"></div>
        )
      }
    }
    function ShowIfOther(){


     
     function switchIfIndividual(){

      

        function switchShowData(){
          if(ShowTable){

            return(
              <>
              <p className={'TitleTextStyleSmall'}>Test Synopsis</p>
            {MathrowsGlobal.length > 0 && (
            <><EnhancedTableToolbar numSelected={selectedMath.length} /><TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                  <EnhancedTableHeadMath
                    numSelected={selectedMath.length}
                    order={orderMath}
                    orderBy={orderByMath}
                    onSelectAllClick={handleSelectAllClickMath}
                    onRequestSort={handleRequestSortMath}
                    rowCount={MathrowsGlobal.length} />
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
                            className="tableRow"
                          >
                            <StyledTableCell align="right">
                              {row.Category}
                            </StyledTableCell>

                            <StyledTableCell align="right">{row.Right}</StyledTableCell>
                            <StyledTableCell align="right">{row.Wrong}</StyledTableCell>
                            <StyledTableCell align="right">{row.Blank}</StyledTableCell>
                            <StyledTableCell align="right">{row.Percent}%</StyledTableCell>

                            <StyledTableCell align="right">{GetHWPercentage(row.Category)}</StyledTableCell>
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
              </TableContainer></>
            )}
            {VerbalrowsGlobal.length > 0 && (<>
            <EnhancedTableToolbar numSelected={selectedVerbal.length} /><TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <EnhancedTableHeadVerbal
                  numSelected={selectedVerbal.length}
                  order={orderVerbal}
                  orderBy={orderByVerbal}
                  onSelectAllClick={handleSelectAllClickVerbal}
                  onRequestSort={handleRequestSortVerbal}
                  rowCount={VerbalrowsGlobal.length} />
                 
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
                          className="tableRow"
                        >
                          <StyledTableCell align="right">
                            {row.Category}
                          </StyledTableCell>

                          <StyledTableCell align="right">{row.Right}</StyledTableCell>
                          <StyledTableCell align="right">{row.Wrong}</StyledTableCell>
                          <StyledTableCell align="right">{row.Blank}</StyledTableCell>
                          <StyledTableCell align="right">{row.Percent}%</StyledTableCell>
                          
                          <StyledTableCell align="right">{GetHWPercentage(row.Category)}</StyledTableCell>
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
            </>
            )}
            
            {ReadingrowsGlobal.length > 0 && (<>
            <EnhancedTableToolbar numSelected={selectedReading.length} /><TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <EnhancedTableHeadVerbal
                  numSelected={selectedReading.length}
                  order={orderReading}
                  orderBy={orderByReading}
                  onSelectAllClick={handleSelectAllClickReading}
                  onRequestSort={handleRequestSortReading}
                  rowCount={ReadingrowsGlobal.length} />
                 
                <TableBody>
                  {stableSort(ReadingrowsGlobal, getComparator(orderReading, orderByReading))

                    .map((row, index) => {
                      const isItemSelected = isSelectedReading(row.Category);
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
                          className="tableRow"
                        >
                          <StyledTableCell align="right">
                            {row.Category}
                          </StyledTableCell>

                          <StyledTableCell align="right">{row.Right}</StyledTableCell>
                          <StyledTableCell align="right">{row.Wrong}</StyledTableCell>
                          <StyledTableCell align="right">{row.Blank}</StyledTableCell>
                          <StyledTableCell align="right">{row.Percent}%</StyledTableCell>
                          
                          <StyledTableCell align="right">{GetHWPercentage(row.Category)}</StyledTableCell>
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
            </>)}

            {SciencerowsGlobalClassroom.length > 0 && (<>
            <EnhancedTableToolbar numSelected={selectedScience.length} /><TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <EnhancedTableHeadVerbal
                  numSelected={selectedScience.length}
                  order={orderScience}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClickScience}
                  onRequestSort={handleRequestSortScience}
                  rowCount={SciencerowsGlobalClassroom.length} />
                 
                <TableBody>
                  {stableSort(SciencerowsGlobalClassroom, getComparator(orderScience, orderByScience))

                    .map((row, index) => {
                      const isItemSelected = isSelectedScience(row.Category);
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
                          className="tableRow"
                        >
                          <StyledTableCell align="right">
                            {row.Category}
                          </StyledTableCell>

                          <StyledTableCell align="right">{row.Right}</StyledTableCell>
                          <StyledTableCell align="right">{row.Wrong}</StyledTableCell>
                          <StyledTableCell align="right">{row.Blank}</StyledTableCell>
                          <StyledTableCell align="right">{row.Percent}%</StyledTableCell>
                          
                          <StyledTableCell align="right">{GetHWPercentage(row.Category)}</StyledTableCell>
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
            </>)}
            </>
            )
          }
          else{
            return(
              RemoveIfOther()
            )
          }
        }
      if(IsIndividual){
        return(
          <div className="IndividualDiv">
           <Modal
              isOpen={modalAIIsOpen}
              onRequestClose={closeModalAI}
              className={modalType == 'AI' ? 'AIPopupSmall' : 'AIPopup'}
              contentLabel="Example Modal"
            >
          
              {ShowPopup()}
        
            </Modal>
          <div className="IndividualWelcome">
            <p className={'TitleTextStyle'}>Welcome to your Dashboard, {UserName.toString().split(' ')[0]}</p>
            <div className="columnDivIndividual">
            <p className={'TitleTextStyleSmallTestDate'}>Test Date</p>
              <div className="testDateDiv">
                <DatePicker
                selected={CurrentStudentTestDate}
                onChange={(date) => {
                  setCurrentStudentTestDate(date);
                  UpdateStudentTestDate(date);
                }}
                customInput={<TextField />}
              />
            </div>
            </div>
          </div>


          <p className={'TitleTextStyleSmallChart'}>{CurrentTest} Progress</p>
          <div className={'ChartDiv'}>
            {GetChart()}
            
          </div>
          <div className="columnDivProgressIndividual">

            
          <div className="columnDivWide">
          <div className="rowDivAssigned">
          <p className="TitleTextStyleSmall">Assigned</p>
          <div 
              className="hover-component" 
              onMouseEnter={() => setIsHovered(true)} 
              onMouseLeave={() => setIsHovered(false)}
          >
              <div className="icon">

               <FaInfo size={25}/>

              </div>
              {isHovered && <div className="info">Submit all of your assignments to get a new custom set</div>}
          </div>
          </div>
              <div className="columnDivImprovement">
              
              <div className="columnDivImprovementIndividual">
              <FormGroup key={refreshKey}>

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

                <div>
                  <Button className = "buttonWidthStylingCompleteSmall" onClick={()=>{RemoveAssignments(); setCanReleaseNewAssignments(true)}} style={{ backgroundColor:'#7494FB' }} >Complete</Button>
                </div>


              </div>

              <p className="TitleTextStyleSmall">Completed Assignments</p>

              <div className="columnDivImprovement">
              
              
              <FormGroup>
          
                  {
                    ShowTopics()
                  }    
                
              </FormGroup>
              </div>


          </div>
          <div className="columnDivNotes">
          {EditTutorNotes()}
              
              


                {ShowTutorNotes()}
                
               
             
              </div>

            </div>

            <div className="rowDivData">
                  <Button 
                   type="submit"
                   fullWidth
                   variant="contained"
                   color="black"
                   style={{backgroundColor: ShowTable ? '#7494FB': '#ccc', marginRight:20}}
                    onClick={()=>{setShowTable(true)}}
                  >Data</Button>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="black"
                    style={{backgroundColor: ShowTable ? '#ccc': '#7494FB'}}
                    onClick={()=>{setShowTable(false)}}
                  >Answers</Button>
            </div>
            
            {switchShowData()}
            
            </div>
        )
      }else{
        return(
          <>
          
          <p className={'TitleTextStyleSmallChart'}>{CurrentTest} Progress</p>
          <div className={'ChartDiv'}>
            {GetChart()}
            
          </div><div className="columnDivProgress">

            
          <div className="columnDivWide">
          <p className="TitleTextStyleSmall">Areas For Improvement</p>
              <div className="columnDivImprovement">
              
                
                {ShowAreasOfImprovement().map(obj => {
                  return (<p className="TextStyleLightInstructions"><li>{obj}</li></p>);
                })}
              </div>
          </div>
          <div className="columnDivNotes">
          {EditTutorNotes()}
              
              


                {ShowTutorNotes()}
                
               
             
              </div>

            </div>
            
            {RemoveIfOther()}
            
            </>
        )
      }
    }

    
      if(CurrentTest == 'Other'){
        return( 
         ShowTextArea()
        )
      }

    
     

      else{
        return(
          switchIfIndividual()
          
        )
      }
    }
    function GetBookList(){
      if(CurrentTest == 'Other'){
        return(null)
      }
      else{
        return(
          <><p className="TitleTextStyleLight">Book List: </p><ul>
            <a target="_blank" href='https://www.amazon.com/College-Pandas-SAT-Math-Advanced-dp-1733192727/dp/1733192727/ref=dp_ob_title_bk'><li>Pandas Math book</li></a>
            <a target="_blank" href='https://www.amazon.com/Critical-Reader-Fourth-Complete-Reading/dp/173358952X/ref=sr_1_1?keywords=the+complete+guide+to+sat+reading&qid=1669648931&sprefix=the+complete+sat+%2Caps%2C150&sr=8-1'> <li>SAT Reading book</li></a>
            <a target="_blank" href='https://www.amazon.com/Fifth-Ultimate-Guide-SAT-Grammar/dp/1733589538/ref=pd_bxgy_img_sccl_1/133-1338560-8271728?pd_rd_w=BHZ3B&content-id=amzn1.sym.7f0cf323-50c6-49e3-b3f9-63546bb79c92&pf_rd_p=7f0cf323-50c6-49e3-b3f9-63546bb79c92&pf_rd_r=MB5RHPG85584KHDZBG3D&pd_rd_wg=KJpCB&pd_rd_r=9a83c4ee-bca2-481c-8578-cc2b38f98705&pd_rd_i=1733589538&psc=1'><li>SAT Grammar book</li></a>
          </ul></>
        )
      }
    }
    /*
    <Fragment>
        
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
        
      </Fragment>
    */
   /*
<p className="TitleTextStyleLight">Files: </p>
      <Button target="_blank" href={GetLinkGoogleDrive()}>
        <FaGoogleDrive size ={50}/>
      </Button>
   */
    return (
      <>
      {GetNavigation()}
      {AddWelcome()}
      
      {ShowIfOther()}
      

     
      
      <p className="TitleTextStyleLight"> </p>

      </>
      )

  }

  if(PageSwitch == 3){
    //Placeholder for the SAT page
  
   
    var SATClassroomNumbers = []
    for(var i = 0; i < SATCLassroomNumbers[0].length; i++){
      if(SATClassroomNumbers.includes(SATCLassroomNumbers[0][i].integerValue) == false){
        SATClassroomNumbers.push(SATCLassroomNumbers[0][i].integerValue)
      }
    }


    var ACTClassroomNumbersLocal = []
    for(var i = 0; i < ACTClassroomNumbers[0].length; i++){
      if(ACTClassroomNumbersLocal.includes(ACTClassroomNumbers[0][i].integerValue) == false){
        ACTClassroomNumbersLocal.push(ACTClassroomNumbers[0][i].integerValue)
      }
    }
    
    /* Create an array with the prefix class to the SATCLassroomNumbers*/
    var SATClassroomNumbersPrefix = []
    for(var i = 0; i < SATClassroomNumbers.length; i++){
      SATClassroomNumbersPrefix.push('Class ' + SATClassroomNumbers[i])
    }
    if(SATClassroomNumbers.length == 0){
      SATClassroomNumbersPrefix.push('Class 1')
    }
    else{
      SATClassroomNumbersPrefix.push('Class '+ (parseInt(SATClassroomNumbers[SATClassroomNumbers.length-1])+1))
    }

    var ACTClassroomNumbersPrefix = []
    for(var i = 0; i < ACTClassroomNumbersLocal.length; i++){
      ACTClassroomNumbersPrefix.push('Class ' + ACTClassroomNumbersLocal[i])
    }
    if(ACTClassroomNumbersLocal.length == 0){
      ACTClassroomNumbersPrefix.push('Class 1')
    }
    else{
      ACTClassroomNumbersPrefix.push('Class '+ (parseInt(ACTClassroomNumbersLocal[ACTClassroomNumbersLocal.length-1])+1))
    }


    function PullCorrespondingStudentsFromClassroomNumber(){


      var ClassroomNumber = CurrentClassroomNumber
     
      function ClassroomNumbersIndexes(ClassroomNumber){
        var ClassroomNumbersIndexes = []
        if(ClassroomTest == 'SAT'){
          for(var i = 0; i < SATCLassroomNumbers[0].length; i++){
            
            if(parseInt(SATCLassroomNumbers[0][i].integerValue) == ClassroomNumber.toString().replace('Class ', '')){
              
              ClassroomNumbersIndexes.push(i)
            }
          }
        }else if(ClassroomTest == 'ACT'){
          for(var i = 0; i < ACTClassroomNumbers[0].length; i++){

            if(parseInt(ACTClassroomNumbers[0][i].integerValue) == ClassroomNumber.toString().replace('Class ', '')){

              ClassroomNumbersIndexes.push(i)
            }
          }
        }
        return(ClassroomNumbersIndexes)
      }
        
  

      var ClassroomNumbersIndexes = ClassroomNumbersIndexes(ClassroomNumber)

      var CorrespondingStudents = []
      for(var i = 0; i < ClassroomStudentsClean.length; i++){
        if(ClassroomNumbersIndexes.includes(i)){
          CorrespondingStudents.push(ClassroomStudentsClean[i])
        }
      }
    
   
      return(CorrespondingStudents)
    }
  

    function ShowTestSynopsis(){
     
      if(ClassroomTest == 'Other' || PullCorrespondingStudentsFromClassroomNumber().length == 0){
       
        return(null)
      }
      else{
        return(
          <><p className={'TitleTextStyleLight4'}>Test Synopsis</p><EnhancedTableToolbar numSelected={selectedMath.length} /><TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
              <EnhancedTableHeadMath
                numSelected={selectedMath.length}
                order={orderMath}
                orderBy={orderByMath}
                onSelectAllClick={handleSelectAllClickMath}
                onRequestSort={handleRequestSortMath}
                rowCount={MathrowsGlobalClassroom.length} />
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
                        className="tableRow"
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
          </TableContainer><p></p><p></p><p></p>
          
          
          
          
          <EnhancedTableToolbar numSelected={selectedVerbal.length} /><TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <EnhancedTableHeadVerbal
                  numSelected={selectedVerbal.length}
                  order={orderVerbal}
                  orderBy={orderByVerbal}
                  onSelectAllClick={handleSelectAllClickVerbal}
                  onRequestSort={handleRequestSortVerbal}
                  rowCount={VerbalrowsGlobalClassroom.length} />
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
                          className="tableRow"
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
            
            
            {ReadingrowsGlobalClassroom.length > 0 && (<>
            <EnhancedTableToolbar numSelected={selectedReading.length} /><TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <EnhancedTableHeadVerbal
                  numSelected={selectedReading.length}
                  order={orderReading}
                  orderBy={orderByReading}
                  onSelectAllClick={handleSelectAllClickReading}
                  onRequestSort={handleRequestSortReading}
                  rowCount={ReadingrowsGlobalClassroom.length} />
                 
                <TableBody>
                  {stableSort(ReadingrowsGlobalClassroom, getComparator(orderReading, orderByReading))

                    .map((row, index) => {
                      const isItemSelected = isSelectedReading(row.Category);
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
                          className="tableRow"
                        >
                          <StyledTableCell align="right">
                            {row.Category}
                          </StyledTableCell>

                          <StyledTableCell align="right">{row.Right}</StyledTableCell>
                          <StyledTableCell align="right">{row.Wrong}</StyledTableCell>
                          <StyledTableCell align="right">{row.Blank}</StyledTableCell>
                          <StyledTableCell align="right">{row.Percent}%</StyledTableCell>
                          
                          <StyledTableCell align="right">{GetHWPercentage(row.Category)}</StyledTableCell>
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
            </>)}

            {SciencerowsGlobal.length > 0 && (<>
            <EnhancedTableToolbar numSelected={selectedScience.length} /><TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                <EnhancedTableHeadVerbal
                  numSelected={selectedScience.length}
                  order={orderScience}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClickScience}
                  onRequestSort={handleRequestSortScience}
                  rowCount={SciencerowsGlobal.length} />
                 
                <TableBody>
                  {stableSort(SciencerowsGlobal, getComparator(orderScience, orderByScience))

                    .map((row, index) => {
                      const isItemSelected = isSelectedScience(row.Category);
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
                          className="tableRow"
                        >
                          <StyledTableCell align="right">
                            {row.Category}
                          </StyledTableCell>

                          <StyledTableCell align="right">{row.Right}</StyledTableCell>
                          <StyledTableCell align="right">{row.Wrong}</StyledTableCell>
                          <StyledTableCell align="right">{row.Blank}</StyledTableCell>
                          <StyledTableCell align="right">{row.Percent}%</StyledTableCell>
                          
                          <StyledTableCell align="right">{GetHWPercentage(row.Category)}</StyledTableCell>
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
            </>)}</>
        )
      }
    }

    function SwitchStudent(){
      if(true){
        return(
          "Change Student"
        )
      }
        else if(AddOrRemoveStudent == 'remove'){
          return(
            "Remove Student"
          )
        }

    }

    function SwitchButton(){
      if(true){
        return(
          <div className="quizTopicsAdd">
          <Button  color="black"    onClick={()=>{AddOrRemoveStudentToClass(DropdownStudentName, 'add')}}>
            <p className="quizTopicsPAdd">
              Add
            </p>
          </Button>
          <Button color="black" onClick={()=>{AddOrRemoveStudentToClass(DropdownStudentName, 'remove')}}>
          <p className="quizTopicsPAdd">
            Remove
          </p>
        </Button>
        </div>
        )
      }
        else if(AddOrRemoveStudent == 'remove'){
          return(
            <Button color="black" style={{marginTop:-100, marginBottom:200}}  className ={'quizTopicsAdd'} onClick={()=>{AddOrRemoveStudentToClass(DropdownStudentName, 'remove')}}>
            <p className="quizTopicsPAdd">
              Remove
            </p>
          </Button>
          )
        }

    }

    return (
      //placeholderclass
      <>
      <div id='test'></div>
      {GetNavigation()}
      {AddWelcome()}
      {CreateWelcomeMessageClassroom()}
      <div className={'NotepadButtonDivClassroom'}>
        <div className="CurrentTest">
          <p  className={'TitleTextStyleSmall2'}>Test Type</p>
          <Dropdown options={['SAT','ACT','Other']} onChange={(x)=>{ClassroomTestChange(x.value)}} value={ClassroomTest} placeholder="Select a test" className='dropdownClass'  />
        </div>

        <div className="CurrentTest" style={{marginLeft:10}}>
          <p className="TitleTextStyleSmall2">Class Name </p>
          <Dropdown options={SATClassroomNumbersPrefix} onChange={(x)=>{setCurrentClassroomNumber(x.value)}} value={SATClassroomNumbersPrefix[0]} placeholder="Select a test"  />
        </div>

        </div>


        <div className='rowDiv'>
        <div className="columnDivCalendarCalClass">

         
        
        <div className="middlePartClassroom">
        <div className="columnDivAssignmentsClass">
          <p  className={'TitleTextStyleSmall'}>Student Roster</p>
          <div className="RosterDiv">
          {PullCorrespondingStudentsFromClassroomNumber().map((obj)=>
          <p className="StudentsClassroom">{obj}</p>
            
         )}
          </div>
          <div className ={'ButtonDivWaitingClass'} >  
            <Button style={{ backgroundColor:'#7494FB' }} color="black" onClick={()=>{setIsOpenThree(true);setAddOrRemoveStudent('add')} }>
              Change Student
            </Button>
           </div> 
            





        </div>
        </div>


        </div>
        

        <div className="middlePartClassroom">
        <div className="columnDivAssignments">
          <p  className={'TitleTextStyleSmall'}>Assignments</p>
          <CustomDropdown options={TopicsNamesFull} onChange={(x)=>{setNewAssignment(x)}} placeholder="Select a assignment" />
   
          <div className ={'ButtonDivWaiting'} >
            <Button className="buttonWidthStyling" onClick={()=>{SubmitAssignmentClassroom()}}  color="black" style={{ backgroundColor:'#7494FB' }} >Assign</Button>
          </div>
        </div>


        <div className="columnDivAssignments2" key={refreshKey} >
          <p  className={'TitleTextStyleSmall'}>Assigned</p>
         <div className="formDivContainer">
        <FormGroup key={refreshKey}>

                 {
                    StudentAssignmentsClassroom.map(obj=>{
                      return(
                      <>
                      <FormControlLabel control={<Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }} style={{color:"black"}} labelStyle={{color:"black"}} checked={obj[1]}  onChange={()=>ChangeCheckClassroom(obj[2])}/>} label={obj[0]} />
                
                      </>
                      )
                    })
                 }    
        </FormGroup>
        </div>
        <div className ={'buttonDivCompleteAssignments'} >
          <Button className = "buttonWidthStylingComplete" onClick={()=>{RemoveAssignmentsClassroom()}} style={{ backgroundColor:'#7494FB' }} color="black" >Complete</Button>
        </div>
        </div>
        </div>
        </div>
      
        <div className="TopicsContainerClass" key={refreshKey} >

          <p  className={'TitleTextStyleSmallTopic'}>Completed Assignments</p>

        <div className={'TopicsDiv'}>
        
          

          <FormGroup>
          
            {
              
              ShowTopicsClassroom()
            }    
          
          </FormGroup>
        </div>

        </div>



       
       
        <p></p>
                
       
        
    

        <Modal
          isOpen={modalIsOpenThree}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModalThree}
          style={ModalCustomStyles}
          contentLabel="Example Modal"
          overlayClassName="Overlay"
          ariaHideApp={false}
          >
          <h2  style={{marginTop:-5}} >{SwitchStudent()}</h2>
          
          
          {GetCheckboxNames(StudentsTotalBool, PullCorrespondingStudentsFromClassroomNumber(), ClassroomStudentsClean)}

          {
            //DropdownStudentName
          }
          {//SwitchButton()
          }
         
        </Modal>
          
      
        <div className={'fieldSmall active false'} style={{display:'none'}}>
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
            </div>

          <div style={{marginTop:'50vh'}}></div>
        {ShowTestSynopsis()}
        
     
      </>
      )
  }





  




  function CalendarSwitchFunc(){
    if(CalendarSwitch){
      return('Show Current Student')
    }else{
      return('Show All Students')
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
    }, 35)
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
        null
      )
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
  



  function ClassScreen(){
    return(
      <div>


      </div>
    )
  }


  
  
  if(PageSwitch == 4){
    function GetSelected(){
      
    }
    return (
      <>
     
     
      {GetNavigation()}
      <Fragment>
      <p className="TitleTextStyleLight3">Scheduler</p>
      <div style={{backgroundColor:'white', padding:'2%', paddingBottom:'3%', borderRadius:'4%'}} key={key}> 
      {CurrCalendar}
    
       </div>
      </Fragment>
      <p></p>
      <Button style={{ backgroundColor:'#7494FB' }} color="black" onClick={()=>{SwitchCalendar()}} >
       {CalendarSwitchFunc()}
      </Button>
      <p></p>
    
      {GetSubmitPayroll()}
        <p className={'TitleTextStyleLight3'}>Set Availability</p>
        <div style={{backgroundColor:'white', padding:'2%', paddingBottom:'4%', borderRadius:'4%'}}>
          <TimeSelect />
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
        <p className="TextStyleLightInstructions">Download the Diagnostics Tests and complete only the questions not yet marked on the answer sheet. Once complete, enter your answers here and email your tutor to review your results and schedule your first future sessions!</p>
       
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
  //const eraseMode = canvasRef.current?.eraseMode;
  const eraseMode= canvasRefImage.current?.eraseMode;
 
  //if (eraseMode) {
    
    if(isEraser == false){
      setisEraser(true)
      eraseMode(true);
      //eraseModeImage(true);
    }else{
      setisEraser(false)
      eraseMode(false);
      //eraseModeImage(false);
    }

   
  //}
  
  
};







const clearHandler = () => {
  const clearCanvas = canvasRef.current?.clearCanvas;
  const clearCanvasImage = canvasRefImage.current?.clearCanvas;

  if (clearCanvas) {
    clearCanvas();
  }
  if (clearCanvasImage) {
    clearCanvasImage();
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



var pdfLinksSAT = ['1m1ILrGW4PEbDVJ13fmcAxEZxyEO3WgBE','1vLyCwsfdCWPNzffJC2LCkJ9uFPlBz_oD','1PVRRrp4ixtsK-CEh3Ao-zulWmAxOdzhG','1Ow-Zfvrj7UrTT71ii8_Ivzi6wPPSTWEP','1LotFzgn8hOQTmrXIjryCibqxPHAGmPyH','1UwwQJsXnIN_XTDebuckYJB--K2p5w8Xx','1BF0EFI4fZuCHtw4N-DTflvD_mneNgNXg','1IG-9JUVlhw5fybYnkwlzcbVU6YgbmMAU','1L4Ix7aKsVrNnWsaGRU107bj_Flc4Dtmm','1Bm5WNRw4oICRpXpZhf0rV2vItQgRLLi7','1FKdqKsW87FmV1V8J7291lT7Jk_skrHHT','19LJgs1oPagA7pLSMDfCBUEodA_z7s5dM','17h5GjU7aEpZdTCmQViuK7JKKb-Eev6-a']
var pdfLinksACT = ['1tvIecv6wR8VF-UQt9RgfdcqcnYZ_9JAa','1ZMC5eZALFBGji3-T-otgCClQQp50zfPs','1aLikRZWW5GRzA4iMGjbBWqsnAoNOhvYW','19rNXL5DRIwwOSVaj_7J7gCoCYWByeDl6','13siuyTAB1KxZqkOvAPZ9_a72VO1_hNRd','1LZQswWfQjJ7Xc9Hu-MOvsbO-KmCMV-74','17JvXhik4czV_fTJaeaPUyZMs1bFeknNC','1IfAZJEJJGF4TNm5sQ1IlTp58NFJgd6X9','14khBy-ei1HDftExWwuYt96tgisXJKQci','1iV5TtPPJGxN0Z97iSsb7DPEOfAhdnlxO','1_ZNyYCkW1f3JC5ias8ZNfmVeVzDq4nh6','1RjOEeEmfmhmXdUjkeVDwXiCMYYV9V_bi','17h5GjU7aEpZdTCmQViuK7JKKb-Eev6-a']
//https://drive.google.com/file/d/1FKdqKsW87FmV1V8J7291lT7Jk_skrHHT/view?usp=sharing

function AddDeletePDFButton(){
  for(var i = 0; i < NewPDFLinks.length; i++){
    if(currPDF.includes(NewPDFLinks[i][0])){
      return(
    
          <Button onChange={()=>{DeleteFromPDFLinks(NewPDFLinks[i][0])}} variant="outlined" color="black" >Delete</Button>
       
      )
    }
    else{
      return(null)
    }
  }
}

function PullPDFNames(){
  var pdfNames = ['Whiteboard','Practice Test 1','Practice Test 2','Practice Test 3','Practice Test 4','Practice Test 5','Practice Test 6','Practice Test 7','Practice Test 8','Practice Test 9','Practice Test 10', 'Grammar Book', 'Math Book','Reading Book']
  
  for(var i = 0; i < NewPDFLinks.length; i++){
    pdfNames.push(NewPDFLinks[i][0])
  }
  return(pdfNames)
}

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

 
  function RemoveExtra(url){
    
    var URLX = url.toString()
    var newURL = URLX.replace('https://drive.google.com/file/d/','').replace('/view?usp=sharing','')
    return(newURL)
  }
  if(num == null){
    return(null)
  }
  if(num.length>1){
    return('https://drive.google.com/file/d/'+RemoveExtra(NewPDFLinks[num[1]][1])+'/preview')
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
 
  if(currPDF.includes( '1')){
    return(null)
  }
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
      <Draggable>
      <div className="calculatorDiv">
        <iframe src="https://www.desmos.com/calculator/g7izucn6nn" width="100%" height="100%"></iframe>
      </div> 
      </Draggable>
    )
  }else{
    return(null)
  }
}

function GetPDFLink(){
  if(false){
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
        <p className="TextStyleLightInstructions">Copy the sharable link from Google Drive into the textbox then press add.</p>
        </div>
      </div>
      
    )
    
  }
  else{
    return(null)
  }
}

/*
function LoadImagePDF(){

  const stylesSketch = {
     
  };
  if(currPDF.includes( '1')){
    return(
      <><ImageSelector /><div className="imageWhiteboard">
        <div className="sketchDivWhiteboard">
          <ReactSketchCanvas
            style={stylesSketch}
            ref={canvasRefImage}
            strokeWidth={penSize}
            eraserWidth={20}
            strokeColor={penColor}
            onStroke={() => { IncreaseSAVnum(); } }
            canvasColor="rgba(0,0,0,0)" />
        </div>
      </div></>
    )
  }
}
*/


if(PageSwitch == 6){
    
    return(
      
      <>
      {GetNavigation()}
        { //LoadImagePDF()
        }
       

        <div className={whiteboardStyle}>
        <div className="sketchDiv">
          <ReactSketchCanvas
            style={stylesSketch}
            ref={canvasRef}
            strokeWidth={penSize}
            eraserWidth={20}
            strokeColor={penColor}
            onStroke={()=>{IncreaseSAVnum()}}
            canvasColor="rgba(0,0,0,0)"
          
            
          />
      </div>
      </div>
      {

        /*
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
        */
      }
      
      <div className="rowDivWhiteboard">

      

        <Tooltip title="Calculator">
        <Button onClick={()=>{setshowCalculator(!(showCalculator))}}>
          <FaCalculator size ={35} />
        </Button>
        </Tooltip>

        <Tooltip title="Save Whiteboard Image">
        <Button onClick={imageExportHandlerImageWithBackground}>
          
          <FaFileDownload size ={35} />
        </Button>
        </Tooltip>

        <Tooltip title={SwitchIconLabel()}>
        <Button onClick={eraserHandler}>
          
          {SwitchIcon()}
        </Button>
        </Tooltip>
       
      
        <Tooltip title="Clear">
        <Button onClick={clearHandler}>
          <FaTrash size ={35} />
        </Button>
        </Tooltip>
        
        <CirclePicker
        onChange={(color) => {setPenColor(color.hex)}}
        colors={['#FF6900',  '#0693E3', '#ABB8C3',  '#F78DA7', '#9900EF','#000000','#FFFFFF']}
        />
       <div style={{height:40, marginTop:33}}>
        <Button onClick={()=>{svgExportHandler()}} variant="outlined" color="black" >Share</Button>
       </div>
       <div style={{height:40, marginTop:33,marginLeft:10}}>
        <Button onClick={()=>{loadSVGHandler()}} variant="outlined" color="black" >Refresh</Button>
       </div>
      </div>
      <div className="PDFDropdown">
        <Dropdown options={PullPDFNames()} onChange={(x)=>{setcurrPDF(x.value)}}  placeholder="Select a PDF"  />
        <div style={{marginLeft:10}}>
          {AddDeletePDFButton()}
        </div>
       </div>
        {GetPDF()}
       
        {GetCalculator()}
        {GetPDFLink()}

       
      
      </>
    )
  }
 
  if(PageSwitch == 8){
    function TextDisplay(props) {
      const { text } = props;
  
      // Split text by two newline characters to create an array of paragraphs
      const paragraphs = text.split('\n\n');
  
      return (
          <div>
              {paragraphs.map((paragraph, index) => (
                <>
                  <p className="TextStyleLightLearn" key={index}>
                      {paragraph}
                      
                  </p>
                  <p> </p>
                  </>
              ))}
          </div>
      );
    }
    function SurveyForm() {
      const [name, setName] = useState('');
      const [email, setEmail] = useState('');
      const [agree, setAgree] = useState(false);
      const [option, setOption] = useState('');
    
      const handleSubmit = (event) => {
        event.preventDefault();
        const data = { name, email, agree, option };
   
        // Here you would typically send this data to your server or handle it as your application needs
      };
    
      return (
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
          <TextField
            label="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={agree}
                onChange={e => setAgree(e.target.checked)}
                name="agree"
              />
            }
            label="Do you agree?"
          />
          <FormControl component="fieldset">
            <FormLabel component="legend">Options</FormLabel>
            <RadioGroup
              aria-label="options"
              name="options"
              value={option}
              onChange={e => setOption(e.target.value)}
            >
              <FormControlLabel value="option1" control={<Radio />} label="Option 1" />
              <FormControlLabel value="option2" control={<Radio />} label="Option 2" />
            </RadioGroup>
          </FormControl>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      );
    }

    function GetSurvey(){
      function ShowSurvey(){
        if(SurveySentiment == 'negative'){
          return(
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">What went wrong?</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={ServeyAnswers}
              label="Issue"
              onChange={handleChangeSurveyAnswers}
            >
              <MenuItem value={"Question was incorrect/poorly formatted"}>Question was incorrect/poorly formatted</MenuItem>
              <MenuItem value={"Explanation was incorrect/poorly formatted"}>Explanation was incorrect/poorly formatted</MenuItem>
              <MenuItem value={"Question was too simple"}>Question was too simple</MenuItem>
              <MenuItem value={"Question was too difficult"}>Question was too difficult</MenuItem>
            </Select>
          </FormControl>
          )
        }else{
          return(null)
        }
      }

      return(
        //setQuestionNeedsReview
        <div>
          <div className="rowDivRating">
                  <FormControlLabel
                control={
                  <Checkbox
                    checked={QuestionNeedsReview}
                    onChange={(event) => setQuestionNeedsReview(event.target.checked)}
                    name="checked"
                    color="primary"
                  />
                }
                label="Question Needs Review"
              />
            </div>
        

            {ShowSurvey()}

            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Question Difficulty?</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={ServeyDifficulty}
              label="Issue"
              onChange={handleChangeSurveyDifficulty}
            >
              <MenuItem value={"1"}>1</MenuItem>
              <MenuItem value={"2"}>2</MenuItem>
              <MenuItem value={"3"}>3</MenuItem>
              <MenuItem value={"4"}>4</MenuItem>
              <MenuItem value={"5"}>5</MenuItem>
            </Select>
          </FormControl>
        </div>
      )
    }


    function GetExplanation(){
      function ShowCorrectOrIncorrect(){
        if(correctAnswerChoicePractice == 'correct'){
          
          return(
            <p className="TitleTextStyleLightCorrect">Correct!</p>
          )
        }
        else if(correctAnswerChoicePractice == 'incorrect'){
          
          return(
            <p className="TitleTextStyleLightIncorrect">Incorrect</p>
          )
        }
      }

      function ShowFinal(percent){
   
        
        var lengthLocal = GetCurrentQuizLength(CurrentLocalTopicForQuestions)
        

        if(CurrentQuizResults.length == lengthLocal){
          return(
            <div>
              <p className="TitleTextStyleLight">Final Score: {percent}%</p>
            </div>
          )
        }else{
          return(
            <div>
              <p className="TitleTextStyleLight">Score: {percent}%</p>
            </div>
          )
        }
      }

      function displayLessonPlan(lesson) {
      
          const lessonPlan = lesson.lesson_plan;

   
          /*
            <p className="TitleTextStyleLight">Learning Objective:</p>
              <p className="TextStyleLight">{lessonPlan.learningObjective}</p>
          */

         function RemoveExtra(step){
            var thingsToRemove = ['a)','b)','c)','d)','e)','A)','B)','C)','D)','E)','1)','2)','3)','4)','5)','6)','7)','8)','9)','10)']
            var newStep = step
            for(var i = 0; i < thingsToRemove.length; i++){
              newStep = newStep.replace(thingsToRemove[i],'')
            }
            return(newStep)
         }

         function showTopic(topic){
          if(topic){
            return(
              <p className="TitleTextStyleLight">Topic: {topic}</p>
            )
          }
          else{
            return(null)
          }
          }
          function showSteps(steps){
            if(steps){
              return(
                <div>
                  <p className="TitleTextStyleLight">Steps:</p>
                  <ol className="TextStyleLight">
                    {steps.map((step, i) => (
                      <li className="stepsli" key={i}>{RemoveExtra(step).replace((i+1).toString()+'.','').replace('Step','').replace((i+1).toString()+':','').replace((i+1).toString()+' :','')}</li>
                    ))}
                  </ol>
                </div>
              )
            }
            else{
              return(null)
            }
          }

          return (
            <div>
      
             
              <p className="TitleTextStyleLight">{showTopic(lessonPlan.topic)}</p>
              <p className="TitleTextStyleLight">Correct Answer: {lesson.answer}</p>
              {showSteps(lessonPlan.instructions)}
              
            </div>
          );
                
      }

    function ShowTestQuestions(){
      if(CurrentTest == 'SAT'){
        return(
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
               SwitchSATACTTopicsList('VerbalAndReading')
                } 
              </TabPanel>
            

             


            </Box>
        )


      }
      else if(CurrentTest == 'ACT'){

        return(
          <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={valueTabQuiz} onChange={handleChangeTabQuiz} aria-label="basic tabs example" variant="fullWidth">
                
                  <Tab label="Math" {...a11yProps(0)} />
                  <Tab label="Reading and Writing" {...a11yProps(1)} />
                  <Tab label="Science" {...a11yProps(2)} />
                 
                
                </Tabs>
              </Box>
           
              <TabPanel value={valueTabQuiz} index={0}>
                {
                SwitchSATACTTopicsList('Math')
                }    
              </TabPanel>
              <TabPanel value={valueTabQuiz} index={1}>
                
                {
               SwitchSATACTTopicsList('VerbalAndReading')
                } 
              </TabPanel>

              <TabPanel value={valueTabQuiz} index={2}>

                {
                SwitchSATACTTopicsList('Science')
                }
              </TabPanel>
            

             


            </Box>
        )
      }
    }
      if(showAI == true){
        return(
          <><ChatBot /></>
        )
      }
      if(false){ 
        return(
          <ChatBot/>
        )
      }
      else if(showExplanation == false ){
        
        return(
          <>
          
          {ShowTestQuestions()}


        </>
        )
      } 
      
      else if(correctAnswerChoicePractice != ''){ 
        //Calculate percent correct
        var percentCorrect = 0
        for(var i = 0; i < CurrentQuizResults.length; i++){
          if(CurrentQuizResults[i] == 'correct'){
            percentCorrect = percentCorrect + 1
          }
        }
        percentCorrect = Math.round(percentCorrect/CurrentQuizResults.length*100)
        
        if(QuizQuestionsDone == true && QuizSwitch == true){
          return(
            <Fade in={(correctAnswerChoicePractice != '')} timeout={500}>
              <div>
                {ShowCorrectOrIncorrect()}
                <p className="TitleTextStyleLight">Answer: {CurrentQuestionInfo.answer}</p>
                
              
                {ShowFinal(percentCorrect)}

              </div>
              </Fade>
              )
        }
        if(QuizSwitch == true){
          return(
            <Fade in={(correctAnswerChoicePractice != '')} timeout={500}>
              <div>
                {ShowCorrectOrIncorrect()}
              
                <p className="TitleTextStyleLight">Answer: {CurrentQuestionInfo.answer}</p>
                

                {ShowFinal(percentCorrect)}
                </div>
            </Fade>
            )
        }else{
          return(
            <Fade in={(correctAnswerChoicePractice != '')} timeout={500}>
              <div>
                {ShowCorrectOrIncorrect()}
              
                {displayLessonPlan(CurrentQuestionInfo)}
                {GetSurvey()}
                
                </div>
            </Fade>
            )
          }
      }
    }

    function ShowLoading(){
      if(CurrentPhaseInQuestion == 2){
        return(
          <div className="loading">
          <ReactLoading type={'spinningBubbles'} color={'#aebff5'} height={'100%'} width={'100%'} />
        </div>
        )


      }
      else{
        return(null)
      }
    }


    function QuizSwitchComponent(){

      function ShowQuestionNumber(){
        if(QuizSwitch == true){
          //
          return(
            <>
            
            <div className="TinyQuestionDiv">
              <p className="TitleTextStyleTiny">Question: {QuizProblemNumber + 1} </p>
            </div>
            
            <div className="TinyQuestionDropdownDiv">
                <Dropdown options={PosibleCurrentQuizQuestion} onChange={(x) => { setCurrentQuizQuestion(x.value); } } value={CurrentQuizQuestion.toString()} />

            </div>
              
              </>
          )
        }
        else if(ShowIntro == true){
          return(null)
        }
        else{
          //CurrentPracticeQuestion
         
         
            return(
              <div className="TinyQuestionDropdownDiv">
                <Dropdown options={PossibleCurrentPracticeQuestion} onChange={(x)=>{setCurrentPracticeQuestion(x.value)}}  value={CurrentPracticeQuestion.toString()}  />
              </div>
            )
          

        }
      }

      function ShowAI(){
        if(showAI == true){
          return(
            <div className="AskAIDivButton">
                <Button  size="large" sx={{ width: '100%', marginRight:'0%', backgroundColor:'#7494FB' }} onClick={()=>{setShowAI(false)}}>Sections</Button>
            </div>

          )
        }
        else{
          return(
            <div className="AskAIDivButton">
                <Button  size="large" sx={{ width: '100%', marginRight:'0%', backgroundColor:'#7494FB' }} onClick={()=>{setShowAI(true)}}>Ask AI</Button>
            </div>

          )
        }
      }

      if(QuizSwitch == false && ShowIntro == false){
        return(
          <Fade in={(QuizSwitch == false)} timeout={500}>
            <div className="rowDivSlim">
            <Button  size="large"  color="secondary" sx={{ width: '100%', marginRight:'0%' }}  onClick={()=>{setShowIntro(true); setQuizSwitch(false)}}><p className="buttonText">Learn</p></Button>
              <Button  size="large" sx={{ width: '100%', marginRight:'0%', backgroundColor:'#7494FB'}}><p className="buttonText">Practice</p></Button>
              <Button  color="secondary"  size="large" sx={{ width: '100%' }} onClick={()=>{setShowIntro(false); setQuizSwitch(true)}}><p className="buttonText">  Quiz  </p> </Button>
              {ShowQuestionNumber()}
              {ShowAI()}
            </div>
          </Fade>
        )
      }
      else if(QuizSwitch == true && ShowIntro == false){
        return(
          <Fade in={(QuizSwitch == true)} timeout={500}>
            <div className="rowDivSlim">
            <Button  size="large" color="secondary" sx={{ width: '100%', marginRight:'0%' }}  onClick={()=>{setShowIntro(true); setQuizSwitch(false)}}><p className="buttonText">Learn</p></Button>
            <Button  size="large" color="secondary" sx={{ width: '100%' }} onClick={()=>{setShowIntro(false); setQuizSwitch(false)}}><p className="buttonText">Practice</p></Button>
              <Button   size="large" sx={{ width: '100%', backgroundColor:'#7494FB' }}><p className="buttonText">  Quiz  </p></Button>
              {ShowQuestionNumber()}
            
            </div>
          </Fade>
        )
      }
      else{
        return(
          <Fade in={(true)} timeout={500}>
            <div className="rowDivSlim">
            <Button  size="large"  sx={{ width: '100%', marginRight:'0%', backgroundColor:'#7494FB' }}  ><p className="buttonText">Learn</p></Button>
            <Button  size="large" color="secondary" sx={{ width: '100%' }} onClick={()=>{setShowIntro(false); setQuizSwitch(false)}}><p className="buttonText">Practice</p></Button>
              <Button   size="large" color="secondary" sx={{ width: '100%' }} onClick={()=>{setShowIntro(false); setQuizSwitch(true)}}><p className="buttonText">  Quiz  </p></Button>
              {ShowQuestionNumber()}
              {ShowAI()}
            </div>
          </Fade>
        )
      }
    }


    function ShowIntroSketch(){
      if(ShowIntro == true){
        return(
          <div className="sketchDivPracticeOverflow">
             <TextDisplay text={IntroInformation} />
          </div>
        )
      }
      else{
        return(

          <div className="sketchDivPractice">
            <ReactSketchCanvas
              style={stylesSketch}
              ref={canvasRefImage}
              strokeWidth={penSize}
              eraserWidth={20}
              strokeColor={penColor}
              onStroke={()=>{IncreaseSAVnum()}}
              canvasColor="rgba(0,0,0,0)"
              backgroundImage={imageDataUrl}
              
            />
        </div>
        )
      }

    }
    

    function ShowWhiteboardControls(){
      if(true){
        var infinitysign = ''
      }else{
        var infinitysign = 'Q:' + CurrentAIQuestionInPacket
      }
      if(ShowIntro == true){
        return(null)
      }else{
        /*
        <Tooltip title="Increase Size">
              <Button onClick={() => { IncreaseStrokeWidth(); } }>
                <p className="TitleTextStyleBold">+</p>
              </Button>
            </Tooltip><Tooltip title="Decrease Size">
              <Button onClick={() => { DecreaseStrokeWidth(); } }>
                <p className="TitleTextStyleBold">-</p>
              </Button>
            </Tooltip>
        */
        return(
          <><div className="CurrentQuestionDiv">
            <p className="TitleTextStyle">{infinitysign}</p>
          </div><div className="ButtonContainer" style={{ width: choicesLength }}>


              <Buttons
                correctAnswerChoicePractice={correctAnswerChoicePractice}
                handleButtonClickPracticeAnswer={handleButtonClickPracticeAnswer}
                handleFreeResponse={handleFreeResponse} />
            </div><Tooltip title="Calculator">
              <Button onClick={() => { setshowCalculator(!(showCalculator)); } }>
                <FaCalculator size={30} />
              </Button>
            </Tooltip><Tooltip title="Save Whiteboard Image">
              <Button onClick={imageExportHandlerImageWithBackground}>

                <FaFileDownload size={30} />
              </Button>
            </Tooltip><Tooltip title={SwitchIconLabel()}>
              <Button onClick={eraserHandler}>

                {SwitchIcon()}
              </Button>
            </Tooltip><Tooltip title="Clear">
              <Button onClick={clearHandler}>
                <FaTrash size={30} />
              </Button>
            </Tooltip><div className="CirclePickerDiv">

              <CirclePicker
                onChange={(color) => { setPenColor(color.hex); } }
                colors={['#FF6900', '#FCB900', '#7BDCB5', '#00D084', '#8ED1FC', '#0693E3', '#ABB8C3', '#EB144C', '#F78DA7', '#FFFF00', '#9900EF', '#000000']} />
            </div></>
        )
      }
    }

    

    function extractLetters(arr) {
  
      if(CurrentQuestionInfo == ''){
        if(CurrentTest == 'ACT'){
          return(['A','B','C','D','E'])
        }else{
        return(['A','B','C','D'])
        }

      }
      try{
        if (arr.includes('Free Response') || arr.includes('Free response') || arr.includes('free response')) {
        
          return ['Free Response'];

        }
      }catch{
        return(['A','B','C','D'])
      }
      
      return arr.map(str => str.charAt(0));
    }
    
    //CurrentQuestionInfo
    try{
      var choices = extractLetters(CurrentQuestionInfo.options);
    }catch{
      var choices = extractLetters(CurrentQuestionInfo.questions);
    }
    
   
  var choicesLength =  0
  if(choices.length >1){
    choicesLength = choices.length*65
  }
  else{
    choicesLength = 65*4
  }
  const Buttons = ({ correctAnswerChoicePractice, handleButtonClickPracticeAnswer, handleFreeResponse }) => (
    choices.map(choice => (
      choice === 'Free Response' ?
      <>
      <TextField
        fullWidth
        multiline
        variant="outlined"
        sx={{ flexGrow: 1 }} // this tells the TextField to grow and take up the remaining space
        value={FreeResponsePractice}
        onChange={e => handleFreeResponse(e.target.value)}
      />
      <Button onClick={()=>{submitFreeResponse()}}>
        Submit
      </Button>
      </>
      :
      
      <Button
        key={choice}
        variant={currentChoiceSelected === choice ? 'success' : ''}
        color={currentChoiceSelected === choice ? 'green' : ''}
        onClick={() => handleButtonClickPracticeAnswer(choice)}
      >
        <p style={{ fontSize: 21 }}>{choice}</p>
      </Button>
    
    ))
  );
  function IncreasePlace(){
 
    //Make sure survey questions are answered:
   

    if(CurrentPracticeQuestion != 'Random' && QuizSwitch == false){
      console.log('in One')
        setCurrentPracticeQuestion(parseInt(CurrentPracticeQuestion) + 1)

    }
    resetChangeSurvey()
    var lengthLocal = GetCurrentQuizLength(CurrentLocalTopicForQuestions)
 
    if(CurrentQuizResults.length >= lengthLocal && QuizSwitch == true){
      console.log('in Tne')

      setShowExplanation(false)
      setCurrentQuizResults([])
    
      setQuizSwitch(false)
     
      setCurrentChoiceSelected('')

    }else{
      console.log('in Two')
      if(QuizSwitch == true){
        setCurrentChoiceSelected('')
        if(CurrentLocalTopicForQuestions != ''){
          
          setCurrentPhaseInQuestion(CurrentPhaseInQuestion + 1)
        
        }
      }
    
    /*
    else if(((SurveySentiment == 'negative' && ServeyAnswers == '') || (SurveySentiment == '') || ( ServeyDifficulty == '') && QuizSwitch == false)){
      alert('Please answer the survey questions before moving on.')
     
    }
    */
    else{
      console.log('in Three')
      setCurrentChoiceSelected('')
      if(CurrentLocalTopicForQuestions != ''){
        if(CurrentPracticeQuestion == 'Random'){
          setCurrentPhaseInQuestion(CurrentPhaseInQuestion + 1)
        }
      
      }
    }
  }

  }
  function ShowNextQuestion(){
    if(ShowIntro == true && QuizSwitch == false){
      return(
        null
      )
    }
    else{
      return(
      <div className="NextQuestionDiv">

      <Tooltip title="Next Question">
        <Button onClick={()=>{IncreasePlace(); setShowAI(false)}}>

          <FaPlay size ={45} color={'#7494FB'}/>
        </Button>
      </Tooltip>
      </div>
      )

    }
  }

  /*
  <div className="ChooseTopic"> 
            {CurrentLocalTopicForQuestions == '' ? <p className="TitleTextStyleLight">Choose Topic: </p> : null}
          </div>
  */




    return(
      
      <>
      {GetNavigation()}

     
    
       
      <div className="rowDivWide">
  
        
        {
        ShowIntroSketch()
       
        }

     
        <div className="QuizSwitchDiv">
          {QuizSwitchComponent()}
        </div>
      
         
            
          <div className ={'columnDivShort'} ref={PracticeDivRef}>
           
            {GetExplanation()}
            
           
            </div>
            
 
          </div>

      <div className="rowDivWhiteboardPractice">

        {ShowWhiteboardControls()}
        

      </div>

    
      {ShowNextQuestion()}

     

     

       
        {GetCalculator()}
      
       
      
      </>
    )
  }

  if(PageSwitch == 7){
    function ChangeBool(bool){
      if(bool == true){
        return('Active')
      }
      else{
        return('Inactive')
      }
    }
    function PullFreeTrialData(){
      

      //Write a function that takes a datetime string and returns the number of days until that date
      function DaysUntilDate(DateString){
        var date = new Date(DateString);
        var today = new Date();
        var Difference_In_Time = date.getTime() - today.getTime();
        var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        return(Math.round(Difference_In_Days))
      }


      if(InFreeTrial == true){
        return(
   
         <b>(Free Trial ending in {DaysUntilDate(FreeTrialEndingDay)} days)</b>
       
          )
      }
      else{
        return(null)
      }
    }

    function ChangeActive(){
    
      if(DisableService == true){
        return(<p style={{color:'green', fontWeight:'bold', fontSize:18}}>Active</p>)
      }else{
        return(<p style={{color:'red', fontWeight:'bold', fontSize:18}}>Disabled</p>)
      }
    }
    function ChangeActiveBilling(){
     
      if(DisableBilling == true){
        return(<p style={{color:'green', fontWeight:'bold', fontSize:18}}>Active</p>)
      }else{
        return(<p style={{color:'red', fontWeight:'bold', fontSize:18}}>Disabled</p>)
      }
    }
    return(
      <>
      {GetNavigation()}

      <div className="FinancialsDiv">
        <div className="Financials">
            <p className="TextStyleLight">Financials {PullFreeTrialData()}</p>
          </div>
          <div className="rowDiv">
         
          <div className="columnDivNoOverflow">
          <p className="TextStyleLightInstructions">Cost per hour (One on One)</p>

          <Dropdown options={[
            '$10',  '$15',  '$20',  '$25',  '$30',  '$35',  '$40',
            '$45',  '$50',  '$55',  '$60',  '$65',  '$70',  '$75',
            '$80',  '$85',  '$90',  '$95',  '$100', '$105', '$110',
            '$115', '$120', '$125', '$130', '$135', '$140', '$145',
            '$150', '$155', '$160', '$165', '$170', '$175', '$180',
            '$185', '$190', '$195', '$200', '$205', '$210', '$215',
            '$220', '$225', '$230', '$235', '$240', '$245', '$250',
            '$255', '$260', '$265', '$270', '$275', '$280', '$285',
            '$290', '$295', '$300', '$305', '$310', '$315', '$320',
            '$325', '$330', '$335', '$340', '$345', '$350', '$355',
            '$360', '$365', '$370', '$375', '$380', '$385', '$390',
            '$395', '$400', '$405', '$410', '$415', '$420', '$425',
            '$430', '$435', '$440', '$445', '$450', '$455', '$460',
            '$465', '$470', '$475', '$480', '$485', '$490', '$495',
            '$500'
          ]} onChange={(x)=>{UpdateFinancials(x, 'Private')}}  placeholder="Select cost"  value={PrivatePrice}/>
          </div>
          <div className="columnDivNoOverflow">
          <p className="TextStyleLightInstructions">Tutor Salary Per Hour</p>
          
          <Dropdown options={[
            '$10',  '$15',  '$20',  '$25',  '$30',  '$35',  '$40',
            '$45',  '$50',  '$55',  '$60',  '$65',  '$70',  '$75',
            '$80',  '$85',  '$90',  '$95',  '$100', '$105', '$110',
            '$115', '$120', '$125', '$130', '$135', '$140', '$145',
            '$150', '$155', '$160', '$165', '$170', '$175', '$180',
            '$185', '$190', '$195', '$200', '$205', '$210', '$215',
            '$220', '$225', '$230', '$235', '$240', '$245', '$250',
            '$255', '$260', '$265', '$270', '$275', '$280', '$285',
            '$290', '$295', '$300', '$305', '$310', '$315', '$320',
            '$325', '$330', '$335', '$340', '$345', '$350', '$355',
            '$360', '$365', '$370', '$375', '$380', '$385', '$390',
            '$395', '$400', '$405', '$410', '$415', '$420', '$425',
            '$430', '$435', '$440', '$445', '$450', '$455', '$460',
            '$465', '$470', '$475', '$480', '$485', '$490', '$495',
            '$500'
          ]} onChange={(x)=>{UpdateFinancials(x, 'PrivateTutor')}}  placeholder="Select cost"  value={PrivatePriceTutor}/>
          </div>
          </div>
          <div className="rowDiv">
          <div className="columnDivNoOverflow">
          <p className="TextStyleLightInstructions">Cost per hour (Class)</p>
          <Dropdown options={[
            '$10',  '$15',  '$20',  '$25',  '$30',  '$35',  '$40',
            '$45',  '$50',  '$55',  '$60',  '$65',  '$70',  '$75',
            '$80',  '$85',  '$90',  '$95',  '$100', '$105', '$110',
            '$115', '$120', '$125', '$130', '$135', '$140', '$145',
            '$150', '$155', '$160', '$165', '$170', '$175', '$180',
            '$185', '$190', '$195', '$200', '$205', '$210', '$215',
            '$220', '$225', '$230', '$235', '$240', '$245', '$250',
            '$255', '$260', '$265', '$270', '$275', '$280', '$285',
            '$290', '$295', '$300', '$305', '$310', '$315', '$320',
            '$325', '$330', '$335', '$340', '$345', '$350', '$355',
            '$360', '$365', '$370', '$375', '$380', '$385', '$390',
            '$395', '$400', '$405', '$410', '$415', '$420', '$425',
            '$430', '$435', '$440', '$445', '$450', '$455', '$460',
            '$465', '$470', '$475', '$480', '$485', '$490', '$495',
            '$500'
          ]} onChange={(x)=>{UpdateFinancials(x, 'Classroom')}}  placeholder="Select cost"  value={ClassroomPrice}/>
          </div>
          <div className="columnDivNoOverflow">
          <p className="TextStyleLightInstructions">Class Tutor Salary Per Hour:</p>
          <Dropdown options={[
            '$10',  '$15',  '$20',  '$25',  '$30',  '$35',  '$40',
            '$45',  '$50',  '$55',  '$60',  '$65',  '$70',  '$75',
            '$80',  '$85',  '$90',  '$95',  '$100', '$105', '$110',
            '$115', '$120', '$125', '$130', '$135', '$140', '$145',
            '$150', '$155', '$160', '$165', '$170', '$175', '$180',
            '$185', '$190', '$195', '$200', '$205', '$210', '$215',
            '$220', '$225', '$230', '$235', '$240', '$245', '$250',
            '$255', '$260', '$265', '$270', '$275', '$280', '$285',
            '$290', '$295', '$300', '$305', '$310', '$315', '$320',
            '$325', '$330', '$335', '$340', '$345', '$350', '$355',
            '$360', '$365', '$370', '$375', '$380', '$385', '$390',
            '$395', '$400', '$405', '$410', '$415', '$420', '$425',
            '$430', '$435', '$440', '$445', '$450', '$455', '$460',
            '$465', '$470', '$475', '$480', '$485', '$490', '$495',
            '$500'
          ]} onChange={(x)=>{UpdateFinancials(x, 'Group')}}  placeholder="Select cost"  value={ClassroomPriceTutor}/>
          </div>
          
          </div>
          <p></p>
          <div className="rowDivService">
          <p className="TextStyleLightInstructions">Service</p>
          <div style={{marginTop:11}}>
            <Switch checked={(DisableService)} label="Label"  onChange={(event)=>{GetAlert("Are you sure you want to change your service status to " + (ChangeBool(!(DisableService))).toString()+ "?",handleChangeDisabled(event))}}/>
          </div>
           {ChangeActive()}
          </div>
          <div className="rowDivService">
           <p className="TextStyleLightInstructions">Billing</p>
          <div style={{marginTop:11}}>
            <Switch checked={(DisableBilling)} label="Label"  onChange={(event)=>{GetAlert("Are you sure you want to change your service status to " + (ChangeBool(!(DisableBilling))).toString()+ "?",handleChangeDisabledBilling(event))}}/>
          </div>
           {ChangeActiveBilling()}
          </div>
        </div>


      <div className=""> 
        <div className="columnDivBig">
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
        
      </div>
      <div className="lowerPadding">

      </div>
       
      
      </>
    )
  }
  if(PageSwitch == 9){
     
    function GetStudentNameForm(){
    
      try{
        if(newStudentType == 'Parent'){
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
                //inputRef={registerStudentName}
                onChange={() => {
                 
                }}
                //FormHelperTextProps={{ error: true }}
              />
          )
        }
        else{
          return(null)
        }
      }catch(e){
        console.log('err', e)
        return(null)
      }
    }

    function ShowTestDropdown(){
      try{
        if(newStudentType == 'Parent' || newStudentType == 'Student'){
          return(
            null
          )
        }
        else{
          return(
            <>
              <div style={{height:40}}></div>
              <Dropdown options={['SAT','ACT','Diagnostics']} placeholder="Select a test"  onChange={(e)=>{setNewStudentTest(e)}}/>
            </>
          )
        }
      }catch(e){
        console.log('err', e)
        return(null)
      }
    }
    function generatePassword() {
      const words = [
          "apple", "banana", "carrot", "dog", "egg", "fish", "grape", "hand", "ant", "bear", 
          "cat", "deer", "eel", "bird", "frog", "horse", "iguana", "jelly", "kiwi", "lion", 
          "mouse", "nut", "ostrich", "pig", "quail", "rabbit", "snail", "tiger", "urchin", 
          "vole", "whale", "xray", "yak", "zebra", "bee", "cow", "duck", "elephant", "flamingo",
          "goat", "hawk", "insect", "jay", "kangaroo", "leopard", "monkey", "newt", "octopus",
          "panther", "quokka", "raccoon", "sheep", "turkey", "unicorn", "vulture", "walrus",
          "xenops", "yarn", "zeppelin", "bat", "chipmunk", "dolphin", "ferret", "gorilla", 
          "heron", "ibis", "jaguar", "koala", "llama", "meerkat", "narwhal", "otter", "penguin",
          "quartz", "rhino", "salamander", "toucan", "uakari", "viper", "wombat", "xerus",
          "yeti", "zucchini"
      ];
  
      const numWords = 3;
      let password = "";
  
      for (let i = 0; i < numWords; i++) {
          const randomIndex = Math.floor(Math.random() * words.length);
          let word = words[randomIndex];
          
          // Convert the first letter to uppercase
          password += word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
  
      return password;
  }
  
  

    return(
      <>
      {GetNavigation()}
      <p className="TextStyleLight">Add New User</p>
         <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            //error={status === "invalidEmail"}
            label="Email Address"
            autoFocus
            autoComplete="off"
            type="email"
            value ={newStudentEmail}

            onChange={(event) => setNewStudentEmail(event.target.value)}
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
            //inputRef={}
            value={newStudentName}
            onChange={(event) => setNewStudentName(event.target.value)}
           
            FormHelperTextProps={{ error: true }}
          />

          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            //error={status === "invalidEmail"}
            label="Phone Number"
            autoFocus
            autoComplete="off"
            type="tel"
            //inputRef={}
            value={newStudentPhoneNumber}
            onChange={(event) => setNewStudentPhoneNumber(event.target.value)}
            FormHelperTextProps={{ error: true }}
          />

          {GetStudentNameForm()}
          <div style={{height:40}}></div>
          <Dropdown options={['Parent','Student','Tutor']}  placeholder="Select an option" onChange={(e)=>{setNewStudentType(e)}} />
          
          <p></p>
          {ShowTestDropdown()}
          <p></p>
          <TextField
            variant="standard"
            margin="normal"
            required
            fullWidth
            
            label="Password"
            //inputRef={registerPassword}
            autoComplete="off"
            value={newStudentPassword}
            onChange={(event) => setNewStudentPassword(event.target.value)}
          />
         

            <div style={{marginTop:50}}></div>
            <p style={{color:'red'}}>
              {newUserError !== '' ? newUserError : null}
            </p>

        <Button className="buttonWidthStyling" color="black" style={{ backgroundColor:'#7494FB' }} onClick={()=>{setNewStudentPasswordConfirm(newStudentPasswordConfirm+1)}}>Create Student</Button>
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
