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
import { motion, useAnimationControls, AnimatePresence  } from "framer-motion"
import { FaPause } from "react-icons/fa";
import { FaPlay } from "react-icons/fa";
import { FaStepBackward } from "react-icons/fa";
import { FaStepForward } from "react-icons/fa";
import { wrap } from "@popmotion/popcorn"
import { DateTimePicker, Picklist, PicklistOption } from 'react-rainbow-components';
import "./styles.scss"

import { IMAGES } from "./Images"
import studying from "./images/studying.png"
import VirtualClass from "./images/VirtualClass.png"
import Progress from "./images/Software.png"
import Goals from "./images/Goals.png"
import ReportCard from "./images/ReportCard.png"







const styles = (theme) => ({
  extraLargeButtonLabel: {
    fontSize: theme.typography.body1.fontSize,
    [theme.breakpoints.up("sm")]: {
      fontSize: theme.typography.h6.fontSize,
    },
  },
  extraLargeButton: {
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    [theme.breakpoints.up("xs")]: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    [theme.breakpoints.up("lg")]: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
  },
  card: {
    boxShadow: theme.shadows[0],
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.up("xs")]: {
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
    },
    [theme.breakpoints.up("sm")]: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
    },
    [theme.breakpoints.up("md")]: {
      paddingTop: theme.spacing(5.5),
      paddingBottom: theme.spacing(5.5),
      paddingLeft: theme.spacing(5),
      paddingRight: theme.spacing(5),
    },
    [theme.breakpoints.up("lg")]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
      paddingLeft: theme.spacing(6),
      paddingRight: theme.spacing(6),
    },
    [theme.breakpoints.down("xl")]: {
      width: "auto",
    },
    borderRadius:20,
    background:'transparent',
    marginLeft:-400,
    width:1000,
  },
  wrapper: {
    position: "relative",
    //background: 'linear-gradient(to right bottom, #7a91a1, #526572)',
    paddingBottom: theme.spacing(2),
    marginTop:-80,
    marginBottom:400
    
  },
  image: {
    maxWidth: "100%",
    verticalAlign: "middle",
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[4],
  },
  container: {
    marginTop: theme.spacing(12),
    marginBottom: theme.spacing(12),
    [theme.breakpoints.down("lg")]: {
      marginBottom: theme.spacing(9),
    },
    [theme.breakpoints.down("md")]: {
      marginBottom: theme.spacing(6),
    },
    [theme.breakpoints.down("md")]: {
      marginBottom: theme.spacing(3),
    },
   
  },
  containerFix: {
    [theme.breakpoints.up("md")]: {
      maxWidth: "none !important",
    },
   
  },
  waveBorder: {
    paddingTop: -theme.spacing(1),
    marginTop: -50
  },
  textBox:{
    width:20,
  }
  
  
});

function HeadSection(props) {

  //var perf =require('./index.html');
  const { classes, theme } = props;
  const isWidthUpLg = useMediaQuery(theme.breakpoints.up("lg"));

  const [CurrTest, setCurrTest] = useState('SAT')
  const [value, setValue] = React.useState(1410);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeTest = (event, newValue) => {
    console.log('NEWVAL')
    console.log(newValue.props)
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
           console.log('RECRODS')
           console.log(records)
           var RecordsArr = []
           for(var i = 0; i<records.length-1; i++){
            console.log(records[i])
            var Name = records[i][1]
            
            var Rank = parseInt((records[i][2].split(',')[0]).toString().replace('#',''))
            var Acceptance = records[i][4]
            var GPA = parseFloat(records[i][5])
            var SATScore = parseInt(records[i][6].split('/')[0])
            var ACTScore = parseInt(records[i][6].split('/')[1])
            console.log(TempArr)
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

          RecordsArr = RecordsArr.slice(0,6)

          console.log(RecordsArr)
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
  const Headers = ['Test Prep for Today\'s World','Virtual One on One tutoring','Custom Lession Plans','Follow Along Weekly' ,'Your Success Network']
  const Paragraphs = ['Discover which test is right for you, strengthen your weaknesses, and achieve excellence.','Meet your expert instructor from anywhere, on your scheudle.','We analytically track your students progress and create custom lesson plans for their specific pain points.','Everything from weekly progress updates to HW assisgnments are accessible to parents and students through our website.','From Entrance Exams to Homework Help. You\'re joinging a network of experts dedicated to your success!']
  const [AnimationNext, setAnimationNext] = useState(0)
  const [AnimationNext2, setAnimationNext2] = useState(0)
  const [AnimationPause, setAnimationPause] = useState(false)
  const [ClearTimer, setClearTimer] = useState(false)
  const controlsText = useAnimationControls()
  const controlsTextSmall = useAnimationControls()
  const controlsImage = useAnimationControls()

  function SwitchAnimationNext(num){
    if(num< Headers.length-1){
      setAnimationNext(num+1)
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
  
  
  function SwitchImage(){
    if(AnimationNext2 == 0){
      return(<img src={studying}/>)
    }
    else if(AnimationNext2 == 1){
      return(<img src={VirtualClass}/>)
    }
    else if(AnimationNext2 == 2){
      return(<img src={Progress}/>)
    }
    else if(AnimationNext2 == 3){
      return(<img src={ReportCard}/>)
    }
    else if(AnimationNext2 == 4){
      return(<img src={Goals}/>)
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
      console.log("isMobile")
      console.log(isMobile)
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
        <h2 style={{textAlign:'center'}}>200+ points go a long way to reaching your dream school</h2>
   

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



  return (

    <body>
      
      
      
      
      
      <Fragment>
      <div className = "TopPadding">

      </div>
      
    <header class="header" data-aos="zoom-in">
    
        <motion.div class="headerTitle"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={controlsText}
        transition={{ duration: 1 }}
        >

            <h1>{GetHeader()}</h1>
            <p>{GetParagraphs()}</p>
            <a href="#contact"><button class={LearnMoreClass}>Learn More</button></a>
            
        </motion.div>

        
        
        
        <AnimatePresence initial={false} custom={direction}>
          
          <motion.div class="headerImage"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={controlsImage} 
            transition={{ duration: 1 }}
          >
            <div style={{height:1 * InverseHeightWidth(Dimensions[0],Dimensions[1]), marginTop: 100 * InverseHeightWidth(Dimensions[0],Dimensions[1])}}>

            </div>
            <div className="imageDiv">
              {SwitchImage()}
            </div>
          </motion.div>
        </AnimatePresence>

        
        
     
    </header>


      <div class="content-wrapper">
      <div class="collegeBanner">

            <h2 data-aos="fade-right" style={{textAlign:'center'}}>Taught by Elite Graduates, 99th Percentile Scorers</h2>
            <img id="wideCollegeBanner" data-aos="fade-right" data-aos-duration="600" src={require("./images/collegeBanner.png")}/>
            {<img id="mobileCollegeBanner" data-aos="fade-right" data-aos-duration="600" src={require("./images/verticalCollegeBanner.png")}/>
            }

      </div>

      
      <div class="features" data-aos="fade-down" data-aos-duration="500">
            <h2 style={{textAlign:'center'}}>What Sets Us Apart</h2>
            <div class ="featuresContentWrap">
                <div class="softwareSuccess icon">
                  <img src={require("./images/monitor.png")}/>
                </div>
                <div class="refinedPractice icon">
                    <img src={require("./images/university.png")}/>
                </div>
                <div class="enableImprove icon">
                    <img src={require("./images/improvement.png")}/>
                </div>
                <div class="ssCaption text">
                    <h3>Software for Success</h3>
                    <p>With technology we developed specifically for our service, forget about paper tests and printed progress reports - we make it easy to improve.</p>
                </div>
                <div class="rpCaption text">
                    <h3>Refined by Practice</h3>
                    <p>Taught by students and alumni from the top universities in the country, we know what it takes to ace the admissions process and how to achieve it. </p>
                </div>
                <div class="eiCaption text">
                    <h3>Enable Improvement</h3>
                    <p>We provide insight into how your students are performing to create targeted plans of action for growth. On average, we've raised scores by 150 points on the SAT!</p>
                </div>
            </div>

          

        </div>
        </div>

    {ShowSchool()}
    <div class="content-wrapper">
    <div id="contact" class="contact" data-aos="fade-up">
            <h2 style={{textAlign:'center'}}>Get In Touch</h2>
            <p style={{fontSize:25, marginTop:20}}>Contact us for a free diagnostics test!</p>
            <form class="contactForm" action="https://usebasin.com/f/a15221a633b7" method="POST"/>
                <input type="text" name="name" placeholder="Name*" class="contactField" required/>
                <input type="email" name="email" placeholder="Email Address*" class="contactField" required/>
                
                <textarea rows="15" name="message" placeholder="How can we help you succeed?*" class="contactField" required></textarea>
                <button type="submit" class='buttonClass'>Submit</button>
            </div>
      </div>
      <div className='bottomDiv'>

      </div>
    </Fragment>
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
  theme: PropTypes.object,
};

export default withStyles(styles, { withTheme: true })(HeadSection);
