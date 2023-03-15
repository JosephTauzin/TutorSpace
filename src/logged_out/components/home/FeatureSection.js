import React from "react";
import { Grid, Typography } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import BuildIcon from "@mui/icons-material/Build";
import ComputerIcon from "@mui/icons-material/Computer";
import BarChartIcon from "@mui/icons-material/BarChart";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import CloudIcon from "@mui/icons-material/Cloud";
import MeassageIcon from "@mui/icons-material/Message";
import CancelIcon from "@mui/icons-material/Cancel";
import calculateSpacing from "./calculateSpacing";
import useMediaQuery from "@mui/material/useMediaQuery";
import { withTheme } from "@mui/styles";
import FeatureCard from "./FeatureCard";
import useWidth from "../../../shared/functions/useWidth";
import "./styleLoggedOut.css";

import AutoStories from "@mui/icons-material/AutoStories";
import VideoFile from "@mui/icons-material/VideoFile";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

import LibraryBooks from '@mui/icons-material/LibraryBooks'
import NotificationsActive from '@mui/icons-material/NotificationsActive'
import TrendingUp from '@mui/icons-material/TrendingUp'
const iconSize = 100;

const features = [
  {
    color: "#FFFFFF",
    headline: "Software for Success",
    text: "With technology we developed specifically for our service, forget about paper tests and printed progress reports - we make it easy to improve",
    icon: <div class="softwareSuccess icon"><img id="" data-aos="fade-right" data-aos-duration="600" src={require("./images/monitor.png")}/></div>,
    mdDelay: "0",
    smDelay: "0",
  },
  {
    color: "#FFFFFF",
    headline: "Refined by Practice",
    text: "Taught by students and alumni from the top universities in the country, we know what it takes to ace the admissions process and how to achieve it.",
    icon: <div class="refinedPractice icon"><img id="" data-aos="fade-right" data-aos-duration="600" src={require("./images/university.png")}/></div>,
    mdDelay: "200",
    smDelay: "200",
  },
  {
    color: "#FFFFFF",
    headline: "Enable Improvement",
    text: "We provide insight into how your students are performing to create targeted plans of action for growth. On average, we've raised scores by 100 points on the SAT!",
    icon: <div class="enableImprove icon"><img id="" data-aos="fade-right" data-aos-duration="600" src={require("./images/improvement.png")}/></div>,
    mdDelay: "400",
    smDelay: "0",
  },
  /*
  {
    color: "#d50000",
    headline: "Feature 4",
    text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.",
    icon: <ComputerIcon style={{ fontSize: iconSize }} />,
    mdDelay: "0",
    smDelay: "200",
  },
  {
    color: "#DD2C00",
    headline: "Feature 5",
    text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.",
    icon: <BarChartIcon style={{ fontSize: iconSize }} />,
    mdDelay: "200",
    smDelay: "0",
  },
  {
    color: "#64DD17",
    headline: "Feature 6",
    text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.",
    icon: <HeadsetMicIcon style={{ fontSize: iconSize }} />,
    mdDelay: "400",
    smDelay: "200",
  },
  {
    color: "#304FFE",
    headline: "Feature 7",
    text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.",
    icon: <CloudIcon style={{ fontSize: iconSize }} />,
    mdDelay: "0",
    smDelay: "0",
  },
  {
    color: "#C51162",
    headline: "Feature 8",
    text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.",
    icon: <CodeIcon style={{ fontSize: iconSize }} />,
    mdDelay: "200",
    smDelay: "200",
  },
  {
    color: "#00B8D4",
    headline: "Feature 9",
    text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et.",
    icon: <CancelIcon style={{ fontSize: iconSize }} />,
    mdDelay: "400",
    smDelay: "0",
  },
  */
];

function FeatureSection(props) {
  const { theme } = props;
  const width = useWidth();
  const isWidthUpMd = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>
      
        
        <div class="features" data-aos="fade-down" data-aos-duration="500">
            <h2>What Sets Us Apart</h2>
            <div class ="featuresContentWrap">
                <div class="softwareSuccess icon">
              
                </div>
                <div class="refinedPractice icon">
                 
                </div>
                <div class="enableImprove icon">
               
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
                    <p>We provide insight into how your students are performing to create targeted plans of action for growth. On average, we've raised scores by 100 points on the SAT!</p>
                </div>
            </div>

          

        </div>
      </div>
 
  );
}

FeatureSection.propTypes = {};

export default withTheme(FeatureSection);
//<img id="wideCollegeBanner" data-aos="fade-right" data-aos-duration="600" src={require("./images/studying.png")}/>