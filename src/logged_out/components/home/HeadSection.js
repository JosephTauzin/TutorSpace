import React, { Fragment, useEffect, useState,useRef } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Grid, Typography, Card, Button, Hidden, Box } from "@mui/material";
import withStyles from "@mui/styles/withStyles";
import WaveBorder from "../../../shared/components/WaveBorder";
import ZoomImage from "../../../shared/components/ZoomImage";
import useMediaQuery from "@mui/material/useMediaQuery";
import "./styleLoggedOut.css";
import ReactPlayer from 'react-player'
import MyImage from './Background.png';
import Papa from 'papaparse';
import Slider from '@mui/material/Slider';
import csvFile from './us_news_scrape_nona.csv'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Slideshow from './Slideshow'
//import { motion, useAnimationControls, AnimatePresence  } from "framer-motion"
import {AnimatePresence, motion, useAnimationControls} from "framer-motion/dist/framer-motion";
import { FaPause } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { FaStepBackward } from "react-icons/fa";
import { FaStepForward } from "react-icons/fa";
import { wrap } from "@popmotion/popcorn"
import { DateTimePicker, Picklist, PicklistOption } from 'react-rainbow-components';

import Modal from 'react-modal';



import { FaTimes } from "react-icons/fa";
import Contact from "./Contact";

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



const styles = (theme) => ({
 
  
  
});

function HeadSection(props) {

  //var perf =require('./index.html');
  const { classes, theme } = props;
  //const isWidthUpLg = useMediaQuery(theme.breakpoints.up("lg"));

  const [CurrTest, setCurrTest] = useState('SAT')
  const [value, setValue] = React.useState(1410);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeTest = (event, newValue) => {
  
    setCurrTest(newValue.props.value);
    if(newValue.props.value == 'ACT'){
      setValue(28)
    }else{
      setValue(1410)
    }

  };

 

  const [valueACT, setValueACT] = React.useState(30);

  const handleChangeACT = (event, newValue) => {
    setValueACT(newValue);
  };
  
  const [TotalRecords, setTotalRecords] = useState([])
  const [CurrentColleges, setCurrentColleges] = useState([])

  function FindColleges(){
    
    Papa.parse(csvFile, {
      download: true,
      complete: function (input) {
           const records = input.data;
         
           var RecordsArr = []
           for(var i = 0; i<records.length-1; i++){
       
            var Name = records[i][1]
            
            var Rank = parseInt((records[i][2].split(',')[0]).toString().replace('#',''))
            var Acceptance = records[i][4]
            var GPA = parseFloat(records[i][5])
            var SATScore = parseInt(records[i][6].split('/')[0])
            var ACTScore = parseInt(records[i][6].split('/')[1])
 
            var TempArr = [Name,Acceptance,GPA,SATScore,ACTScore]

            if(value>=SATScore && CurrTest == 'SAT'){

              RecordsArr.push(TempArr)
            }
            if(value>=ACTScore && CurrTest == 'ACT'){

              RecordsArr.push(TempArr)
            }
           }
          

           if(CurrTest == 'SAT'){
            RecordsArr.sort(sortFunctionSAT);
           }else if(CurrTest == 'ACT'){
            RecordsArr.sort(sortFunctionACT);
           }

           function sortFunctionSAT(a, b) {
            if (a[3] === b[3]) {
                return 0;
            }
            else {
                return (a[3] > b[3]) ? -1 : 1;
            }
          }
          function sortFunctionACT(a, b) {
            if (a[4] === b[4]) {
                return 0;
            }
            else {
                return (a[4] > b[4]) ? -1 : 1;
            }
          }

          RecordsArr = RecordsArr.slice(0,35)

       
          setTotalRecords(RecordsArr)
      }
    });
   
  }

  useEffect(()=>{
    FindColleges()
  },[value])

  function SwitchSlider(){
    if(CurrTest == 'SAT'){
      return(
        <Box fullWidth>
        <Slider
          aria-label="Always visible"
          defaultValue={value}
         
          step={10}
          onChange = {handleChange}
          valueLabelDisplay="on"
          min={400}
          max={1600}
        />
      </Box>
      )
    }else{
      return(
        <Box fullWidth>
        <Slider
          aria-label="Always visible"
          defaultValue={28}
         
          step={1}
          onChange = {handleChange}
          valueLabelDisplay="on"
          min={20}
          max={36}
        />
      </Box>
      )
    }
  }
/*
<div className={classNames("lg-p-top", classes.wrapper)}>


        <img src={MyImage} alt="logo" className="IMG" />
        <div className={classNames("container-fluid", classes.container)}>
          <Box display="flex" justifyContent="center" className="row">
            <Card
              className={classes.card}
              data-aos-delay="200"
              data-aos="zoom-in"
            >
              <div className={classNames(classes.containerFix, "container")}>
                <Box justifyContent="space-between">

                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="space-between"
                    height="100%"
                    width="100%"
                  >
                    <Box mb={4} className={'NewBox'}>
                      <Typography variant={isWidthUpLg ? "h2" : "h3"} color={'black'}>

                        Test Prep for Today's World

                      </Typography>
                    </Box>

                    <Box mb={4} className={'NewBox'}>
                      <Typography variant={isWidthUpLg ? "h5" : "body1"} color={'black'}>

                      Take your test scores to the next level and achieve excellence.

                      </Typography>
                    </Box>

                  </Box>

                  <Hidden mdDown>

                  </Hidden>
                </Box>
              </div>
            </Card>
          </Box>

        </div>
      </div>
*/
  const Headers = ['Test Prep for Today\'s World','Private, One on One Classroom','Custom Lesson Plans','Follow Along Weekly' ,'Your Success Network']
  const Paragraphs = ['Learn whether the SAT or ACT suits your talents better, then strengthen your weaknesses and achieve excellence.','Meet your expert instructor from anywhere, on your own schedule.','We analytically track your student\'s progress and create custom lesson plans for their specific pain points.','Everything from progress updates to HW assignments are accessible to parents and students through TutorSpace - our proprietary software suite.','From entrance exams to homework help, you\'re plugging into a network of experts dedicated to your success!']
  const [AnimationNext, setAnimationNext] = useState(0)
  const [AnimationNext2, setAnimationNext2] = useState(0)
  const [AnimationPause, setAnimationPause] = useState(false)
  const [ClearTimer, setClearTimer] = useState(false)
  const controlsText = useAnimationControls()
  const controlsTextSmall = useAnimationControls()
  const controlsImage = useAnimationControls()


  const [modalIsOpen, setIsOpen] = React.useState(false);


  const ModalCustomStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width:'70%',
      backgroundColor:'white',
      borderRadius:15,
      fontSize:6,
    },
  };
  let subtitle;

const [imageToShow, setImageToShow] = useState(TutorSpaceNotes);
var topProcessMenuButton = document.querySelector('.topProcessMenuButton')
var secondProcessMenuButton = document.querySelector('.secondProcessMenuButton')
var thirdProcessMenuButton = document.querySelector('.thirdProcessMenuButton')
var fourthProcessMenuButton = document.querySelector('.fourthProcessMenuButton')
var bottomProcessMenuButton = document.querySelector('.bottomProcessMenuButton')

var processTitle = document.getElementById("processTitle")
var processContent = document.getElementById("processContent")
var processImage = document.getElementById("processImage")

const updateTopButtonContent = () => {
    processTitle.style.opacity = 0
    processContent.style.opacity = 0
    processImage.style.opacity = 0

    setTimeout(() => {
        processTitle.innerHTML = 'See <span class="bold">TutorSpace</span> Inside & Out'
        processContent.innerHTML = 'We’ll show you how TutorSpace can impact your business, dive into its features, and answer any questions you might have about the software. Fill out the contact form below to schedule a demo!'
        //processImage.src='./images/TutorSpaceDashboard.png'
        setImageToShow(TutorSpaceDashboard)
        processTitle.style.opacity = 1
        processContent.style.opacity = 1
        processImage.style.opacity = 1
    }, 300);

    topProcessMenuButton.classList.add("selectedProcessMenuButton")
    secondProcessMenuButton.classList.remove("selectedProcessMenuButton")
    thirdProcessMenuButton.classList.remove("selectedProcessMenuButton")
    fourthProcessMenuButton.classList.remove("selectedProcessMenuButton")
    bottomProcessMenuButton.classList.remove("selectedProcessMenuButton")
}

const updateSecondButtonContent = () => {
    processTitle.style.opacity = 0
    processContent.style.opacity = 0
    processImage.style.opacity = 0

    setTimeout(() => {
        processTitle.innerHTML = 'Hit the Ground Running'
        processContent.innerHTML = 'We’ll configure TutorSpace to meet your needs, create your student, tutor, and administrative accounts, upload existing data from your business, and show you the ropes to get the most out of the product.'
        //processImage.src='./images/TutorSpaceMenuRoster.png'
        setImageToShow(TutorSpaceMenuRoster)
        processTitle.style.opacity = 1
        processContent.style.opacity = 1
        processImage.style.opacity = 1
    }, 300);

    secondProcessMenuButton.classList.add("selectedProcessMenuButton")
    topProcessMenuButton.classList.remove("selectedProcessMenuButton")
    thirdProcessMenuButton.classList.remove("selectedProcessMenuButton")
    fourthProcessMenuButton.classList.remove("selectedProcessMenuButton")
    bottomProcessMenuButton.classList.remove("selectedProcessMenuButton")
}

const updateThirdButtonContent = () => {
    processTitle.style.opacity = 0
    processContent.style.opacity = 0
    processImage.style.opacity = 0

    setTimeout(() => {
        processTitle.innerHTML = 'Start Using TutorSpace'
        processContent.innerHTML = 'Once your accounts have been set up and all your data has been added to TutorSpace, we’ll help make sure things go smoothly as you start using TutorSpace and be available to help solve any problems.'
        //processImage.src='./images/TutorSpaceNotes.png'
        setImageToShow(TutorSpaceNotes)
        processTitle.style.opacity = 1
        processContent.style.opacity = 1
        processImage.style.opacity = 1
    }, 300);

    thirdProcessMenuButton.classList.add("selectedProcessMenuButton")
    secondProcessMenuButton.classList.remove("selectedProcessMenuButton")
    topProcessMenuButton.classList.remove("selectedProcessMenuButton")
    fourthProcessMenuButton.classList.remove("selectedProcessMenuButton")
    bottomProcessMenuButton.classList.remove("selectedProcessMenuButton")
}

const updateFourthButtonContent = () => {
    processTitle.style.opacity = 0;
    processContent.style.opacity = 0;
    processImage.style.opacity = 0;

    setTimeout(() => {
        processTitle.innerHTML = 'Supercharge Your Business'
        processContent.innerHTML = 'Moving your regular processes into TutorSpace makes your business more efficient and easier to run! Set up integrated Stripe payments and invoicing, automatic emails to parents and students, and more.'
        //processImage.src='./images/TutorSpacePayments.png'
        setImageToShow(TutorSpacePayments)
        processTitle.style.opacity = 1
        processContent.style.opacity = 1
        processImage.style.opacity = 1
    }, 300);

    fourthProcessMenuButton.classList.add("selectedProcessMenuButton")
    secondProcessMenuButton.classList.remove("selectedProcessMenuButton")
    thirdProcessMenuButton.classList.remove("selectedProcessMenuButton")
    topProcessMenuButton.classList.remove("selectedProcessMenuButton")
    bottomProcessMenuButton.classList.remove("selectedProcessMenuButton")
}

const updateBottomButtonContent = () => {
    processTitle.style.opacity = 0;
    processContent.style.opacity = 0;
    processImage.style.opacity = 0;
    
    setTimeout(() => {
        processTitle.innerHTML = 'Build Momentum'
        processContent.innerHTML = 'We provide ongoing support while you‘re using TutorSpace and are available to troubleshoot, answer questions, build new features and tools suited for your business, and incorporate feedback to make TutorSpace better for you.'
        //processImage.src='./images/TutorSpaceWhiteboard.png'
        setImageToShow(TutorSpaceWhiteboard)
        processTitle.style.opacity = 1
        processContent.style.opacity = 1
        processImage.style.opacity = 1
    }, 300);

    bottomProcessMenuButton.classList.add("selectedProcessMenuButton")
    secondProcessMenuButton.classList.remove("selectedProcessMenuButton")
    thirdProcessMenuButton.classList.remove("selectedProcessMenuButton")
    fourthProcessMenuButton.classList.remove("selectedProcessMenuButton")
    topProcessMenuButton.classList.remove("selectedProcessMenuButton")
} 
setTimeout(() => {
  topProcessMenuButton.addEventListener('click', updateTopButtonContent)
  secondProcessMenuButton.addEventListener('click', updateSecondButtonContent)
  thirdProcessMenuButton.addEventListener('click', updateThirdButtonContent)
  fourthProcessMenuButton.addEventListener('click', updateFourthButtonContent)
  bottomProcessMenuButton.addEventListener('click', updateBottomButtonContent)

  var contactForm = document.getElementById("contact")
  var contactLink = document.querySelectorAll(".contactLink")

  contactLink.forEach(formLink => {
      formLink.addEventListener('click', () => contactForm.scrollIntoView({behavior: 'smooth', block: 'center'}))
  })
  onPageContactLink.addEventListener('click', () => {
    handleMenuClick();
    contactForm.scrollIntoView({behavior: 'smooth', block: 'center'})
})
}, 300);

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

//Contact Form Link Handler
var onPageContactLink = document.querySelector(".contactLinkMobile")


  function openModal() {
    if(isMobile == false){
      setIsOpen(true);
    }
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



  function SwitchAnimationNext(num){
    if(num< Headers.length-1){
      setAnimationNext(num)
    }else{
      setAnimationNext(0)
    }
    
  }
  function ManuallyChangeImage(num){
    //clearTimeout(timer)
    if(num == 1){
      setAnimationNext(AnimationNext => AnimationNext+1)
    }else if(num == -1){
      if(AnimationNext2 == 0){

      }
      else{
        setAnimationNext(AnimationNext => AnimationNext-1)
      }
    }

  }
  useEffect(() => {
    if(AnimationPause == false){
      const interval = setInterval(() => {
    
        setAnimationNext(AnimationNext => AnimationNext+1)
      }, 12500);
      return () => clearInterval(interval);
    }
  }, [AnimationPause]);

  useEffect(()=>{
    if(AnimationPause == false){
      if(AnimationNext< Headers.length){
        setAnimationNext2(AnimationNext)
      }else{
        setAnimationNext2(0)
        setAnimationNext(0)
      }
    }
  },[AnimationNext])

  
  function GetHeader(){
    return(Headers[AnimationNext2])
  }
  function GetParagraphs(){
    return(Paragraphs[AnimationNext2])
  }
  const [yScale, setyScale]= useState(0)
  const [ButtonClass, setButtonClass]= useState('buttons')
  const [LearnMoreClass, setLearnMoreClass] = useState('buttonClassLearnMore')
  useEffect(() => {
    if(yScale !== 0){
    controlsText.start({ opacity: 1, scale: 1, y: yScale })
    controlsTextSmall.start({ opacity: 1, scale: 1, y: -50 })
    controlsImage.start({opacity:1, scale: 1, y: -50})
    if(AnimationPause == false){
    const timer = setTimeout(() => {
        controlsText.start({ opacity: 0, scale: 0.5, y: -0 })
        controlsTextSmall.start({ opacity: 0, scale: 0.5, y: 0 })
        controlsImage.start({opacity:0, scale: 0.8, y: -0})
      }, 10000)

    return () => clearTimeout(timer);
    }
  }
  }, [AnimationNext2,ClearTimer,AnimationPause, yScale])

  const [[imageCount, direction], setImageCount] = useState([0, 0])



  function PausePlaySwitch(){
    if(AnimationPause == false){
      return(<FaPause size = {25} color={'black'}/>)
    }else{
      return(<FaPlay size = {25} color={'black'}/>)
    }
  }
  
  

  const [width, setWidth] = useState(window.innerWidth);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    const isMobile = width <= 768;

    useEffect(()=>{
    
      if(isMobile == true){
        setyScale(-150)
        setButtonClass('buttonsMobile')
        setLearnMoreClass('buttonClassLearnMoreMobile')
      }
      else{
        setyScale(50)
        setButtonClass('buttons')
        setLearnMoreClass('buttonClassLearnMore')
      }
    },[isMobile])
  /*
   <div>
        <Button onClick={() => swipeToImage(-1)}>
          <FaStepBackward size = {25} color={'black'}/>
        </Button>
        <Button onClick={()=>setAnimationPause(!(AnimationPause))}>
          <FaPause size = {25} color={'black'}/>
        </Button>
        <Button onClick={() => swipeToImage(1)}>
          <FaStepForward size = {25} color={'black'}/>
        </Button>
      </div>
  */

  function ShowSchool(){
    if(isMobile == false){
      return(
        <>
        <h2 style={{textAlign:'center'}}>200+ SAT points go a long way to reaching your dream school</h2>
   

    <div className="TotalBox">
    <div className="TestSliderBox">
    
    
    
    <div className="SliderBox">
      <p className="Score">Your Score:</p>
      {SwitchSlider()}

      
    </div>
    <div className='TestBox'>
    <p className="Score">Your Test:</p>
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Test</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={CurrTest}
          label="Test"
          onChange={handleChangeTest}
        >
          <MenuItem value={'SAT'}>SAT</MenuItem>
          <MenuItem value={'ACT'}>ACT</MenuItem>
          
        </Select>
      </FormControl>
    </Box>
    </div>
    </div>
    <div className="UniversityBox">
    <TableContainer  component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
            <TableRow>
              <TableCell>University</TableCell>
              <TableCell align="right">Acceptance Rate</TableCell>
              <TableCell align="right">GPA</TableCell>
              <TableCell align="right">SAT</TableCell>
              <TableCell align="right">ACT</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
          {TotalRecords.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row[0]}
              </TableCell>
              <TableCell align="right">{row[1]}</TableCell>
              <TableCell align="right">{row[2]}</TableCell>
              <TableCell align="right">{row[3]}</TableCell>
              <TableCell align="right">{row[4]}</TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>
      </TableContainer>
   
    </div>
    </div>
    </>
      )
    }
    else{
      return(null)
    }
  }

  function ShowPlayPauseButtons(){
    if(isMobile == false){
      return(
        <>
        <h2>{AnimationNext2+1}/5 </h2>
        <div className='buttonsInner'>
          <Button onClick={() => ManuallyChangeImage(-1)}>
            <FaStepBackward size = {25} color={'black'}/>
          </Button>
          <Button onClick={()=>setAnimationPause(!(AnimationPause))}>
            {PausePlaySwitch()}
          </Button>
          <Button onClick={() => ManuallyChangeImage(1)}>
            <FaStepForward size = {25} color={'black'}/>
          </Button>
          </div>
          </>
      )
    }else{
      return(null)
    }
  }
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  const [Dimensions, setDimensions ] = useState([0,0])
  function InverseHeightWidth(x,y){
   
    const constant = 1
    if(x>y*1.3){
      return(-y/x*constant*0)
    }else{
      return(y/x*constant)
    }
    return(y/x*constant)
  }


  

  useEffect(()=>{
    setDimensions([window.innerWidth,window.innerHeight])
  },[window.innerWidth,window.innerHeight])

  /*
<div className = {ButtonClass}>
        
          
          {ShowPlayPauseButtons()}
      </div>
  */

      const containerStyles = {
        maxWidth: 400,
    };
    
    const initialState = {
        value: new Date('2019-10-25 10:44'),
        locale: { name: 'en-US', label: 'English (US)' },
    };
    
    const okButtonLocalizedLabel = {
        'en-US': 'OK',
        'es-ES': 'Aceptar',
        'fr-Fr': "D'accord",
    };
    
    const cancelButtonLocalizedLabel = {
        'en-US': 'Cancel',
        'es-ES': 'Cancelar',
        'fr-Fr': 'Annuler',
    };

    function DotList({ currentDot }) {
      const dots = [0,1, 2, 3, 4];
      return (
        <div>
          {dots.map((dot, index) => (
            <><Button onClick={()=>{setAnimationNext(dot)}} size="small" key={index} style={{ color: '#E26D5C', marginLeft: 0, fontWeight: dot === currentDot ? 'bold' : '200', opacity: dot === currentDot ? 1 : 0.5, fontSize: dot === currentDot ? 30 : 30 }}>
              
              &#9679;

            </Button></>
          ))}
        </div>
      );
    }





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
            <span class="navLink">Try TutorSpace</span>
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
            <a href="login"><span class="selectedNavLink">Try TutorSpace</span></a>
            <xml version="1.0" encoding="UTF-8"><svg id="menuIcon" width="20px" height="20px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#2e4756"><path d="M3 5h18M3 12h18M3 19h18" stroke="#2e4756" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></xml>
        </div>
    </nav>

    <header>
        <div class="shapedHeaderBackground"></div>
        <div class="headerContent">
            <div class="headerText">
                <h1>Technology for Tutoring Today</h1>
                <p>Prepare students for tomorrow with all the tools you need to run your tutoring business, all in one place.</p>
                <button class="headerFreeTrialCTA contactLink">Try 1 Month Free!</button>
            </div>
            <div class="headerImage">
                <img src={TutorSpaceDashboard} class="screenshot" alt="TutorSpace Dashboard Screenshot"/>
                <img src={TutorSpaceDashboardDarkShadow} class="imageTopDarkShadow"/>
                <img src={TutorSpaceDashboardLightShadow} class="imageBottomLightShadow"/>

            </div>
        </div>
    </header>

    <section class="section1">
        <div class="captionText">
            <p>
                Progress Tracking | Analytics | Billing
            </p>
            <p>
                Scheduling | Reminders | Grading
            </p>
            <p>
                Everything you need in one place
            </p>
        </div>
    </section>
    <div class="shapedSection2Background"></div>
    <section class="section2">
    
        <div class="section2Content">
            <div class="feature1Text" data-aos="fade-up" data-aos-duration="300">
                <h3 class="textColor">
                    Manage every student and their progress from one dashboard
                </h3>
                <p class="textColor">
                    Get a bird’s eye view of your student roster to track engagement and keep information up to date
                </p>
            </div>
            <div class="feature1Screenshot" data-aos="fade-up" data-aos-duration="300">
                <img src={TutorSpaceRoster} class="feature1Image" alt="TutorSpace Student Roster Screenshot"/> 
                <img src={TutorSpaceWhiteShadow} class="feature1TopShadow"/>
                <img src={TutorSpaceWhiteShadow} class="feature1BottomShadow"/>
            </div>

            <div class="feature2Text" data-aos="fade-up" data-aos-duration="300">
                <h3 class="textColor">
                    Test students and find areas of weakness with one tool
                </h3>
                <p class="textColor">
                    Dive into student performance across different topics to identify areas of improvement and customize tutoring to the <span class="italics">individual</span>
                </p>
            </div>
            <div class="feature2Screenshot" data-aos="fade-up" data-aos-duration="300">
                <img src={TutorSpaceQuiz} class="feature2Image" alt="TutorSpace Quiz Feature Screenshot"/> 
                <img src={TutorSpaceWhiteShadow} class="feature2TopShadow"/>
                <img src={TutorSpaceWhiteShadow} class="feature2BottomShadow"/>
            </div>

            <div class="feature3Text" data-aos="fade-up" data-aos-duration="300">
                <h3 class="textColor">
                    Visualize progress over time across different topics and test scores
                </h3>
                <p class="textColor">
                    Let your performance data speak for itself and use it to adapt tutoring plans to match a student’s growth                
                </p>
            </div>
            <div class="feature3Screenshot" data-aos="fade-up" data-aos-duration="300">
                <img src={TutorSpaceProgress} class="feature3Image" alt="TutorSpace Progress Tracking Feature Screenshot"/> 
                <img src={TutorSpaceWhiteShadow} class="feature3TopShadow"/>
                <img src={TutorSpaceWhiteShadow} class="feature3BottomShadow"/>
            </div>
        </div>
    </section>

    <section class="section3">
        <div class="section3Content">
            <div class="section3Text">
                <h4>Take charge of your business with tools to empower your operations</h4>
                <p>Take the spreadsheets and checklists out of your day to day. <span class="bold">TutorSpace</span> makes it easy to run your business so you can focus on what matters: teaching.</p>
                <button class="learnMoreCTA contactLink">Learn More</button>
            </div>
            <div class="section3Image">
                <img src={TutorSpaceFeatures} alt="TutorSpace Features List"/>
            </div>
        </div>
    </section>

    <section class="section4">
        <div class="section4Content">
            <h3>Getting Started</h3>
            <div class="processMenu">
                <div class="processButtons">
                    <button class="processMenuButton topProcessMenuButton selectedProcessMenuButton">1. Demo</button>
                    <button class="processMenuButton secondProcessMenuButton">2. Setup</button>
                    <button class="processMenuButton thirdProcessMenuButton">3. Onboard</button>
                    <button class="processMenuButton fourthProcessMenuButton">4. Integrate</button>
                    <button class="processMenuButton bottomProcessMenuButton">5. Support</button>
                </div>
                <div class="processContent">
                    <h5 id="processTitle">See <span class="bold">TutorSpace</span> Inside & Out</h5>
                    <p id="processContent">We’ll show you how TutorSpace can impact your business, dive into its features, and answer any questions you might have about the software. Fill out the contact form below to schedule a demo!</p>
                    <img src={imageToShow} id="processImage" alt="TutorSpace Feature Screenshot"/>           
                </div>
            </div>
        </div>
    </section>

    <section class="section5">
        <div class="section5Content">
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
                     <button class="enterpriseCTA contactLink">Contact Us</button>
                </div>
            </div> 


            <div class ="freeTrialCaption">
                <p>Try <span class="bold">TutorSpace</span> for free for 1 month, no strings attached!</p>
            </div>
        </div>
    </section>

    <section class ="section6">
        <div class="section6Content">
            <div class="contactCTAText">
                <h3>See What TutorSpace Can Do For You</h3>
                <p>Ready to see how TutorSpace can help you run your business? Tell us a bit about yourself and we’ll reach out to set up a demo of the platform and answer any questions about the product!</p>
            </div>

            <div class="contactForm">
                <form id="contact" action="https://usebasin.com/f/a15221a633b7" method="POST">
                    <div class="inputs">
                        <div class="contactBlock" id="firstNameBlock">
                            <label for="firstName" class="requiredField">First Name</label>
                            <input type="text" name="firstName" required/>
                        </div>

                        <div class="contactBlock" id="lastNameBlock">
                            <label for="lastName" class="requiredField">Last Name</label>
                            <input type="text" name="lastName" required/>
                        </div>

                        <div class="contactBlock" id="emailBlock">
                            <label for="email" class="requiredField">Email</label>
                            <input type="email" name="email" required/>
                        </div>

                        <div class="contactBlock" id="companyNameBlock">
                            <label for="companyName" class="requiredField">Company Name</label>
                            <input type="text" name="companyName" required/>
                        </div>

                        <div class="contactBlock" id="companyWebsiteBlock">
                            <label for="companyWebsite">Company Website <span class="optional">(Optional)</span></label>
                            <input type="text" name="companyWebsite"/>
                        </div>
                    </div> 

                    <div class="contactBlock" id="messageBlock">
                        <label for="message">What can we do for you? <span class="optional">(Optional)</span></label>
                        <textarea name="message" id="message" rows="6"></textarea>
                    </div>
                    
                    <button class="formSubmit">Submit</button>
                </form>
            </div>
        </div>
    </section>

    <footer>
        <div class="footerLogo">
            <img src={TutorSpaceFooterLogo} alt="TutorSpace Logo"/>
        </div>

        <div class="navLinks">
            <a href="index"><span class="navLink">Home</span></a>
            <a href="about"><span class="navLink">About</span></a>
            <span class="navLink contactLink">Contact</span>
            <a href="login"><span class="navLink">Log In</span></a>
        </div>
    </footer>


</body>
 
  );
}
/*
<input type="text" name="companyName" placeholder="Company Name" class="contactField"/>
                <input type="text" name="location" placeholder="Company City/State" class="contactField"/>
*/
/*
<Button
                          variant="contained"
                          color="secondary"
                          fullWidth
                          className={classes.extraLargeButton}
                          classes={{ label: classes.extraLargeButtonLabel }}
                          href="https://github.com/dunky11/react-saas-template"
                        >
                          Download from GitHub
                        </Button>
*/

HeadSection.propTypes = {
  classes: PropTypes.object,
  
};

export default withStyles(styles, { withTheme: false })(HeadSection);
