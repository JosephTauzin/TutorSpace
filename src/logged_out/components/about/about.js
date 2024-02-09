import React, { useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Grid, Box } from "@mui/material";
import withStyles from "@mui/styles/withStyles";

import useMediaQuery from "@mui/material/useMediaQuery";

import TutorSpaceDashboard from "./images/TutorSpaceDashboard.png"
import TutorSpaceDashboardDarkShadow from "./images/TutorSpaceDashboardDarkShadow.png"
import TutorSpaceDashboardLightShadow from "./images/TutorSpaceDashboardLightShadow.png"
import TutorSpaceFeatures from "./images/TutorSpaceFeatures.png"
import TutorSpaceFooterLogo from "./images/TutorSpaceFooterLogo.png"

import TutorSpaceNavLogo from "./images/TutorSpaceNavLogo.png"

import './index.css'



const styles = (theme) => ({
  blogContentWrapper: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(4),
      marginRight: theme.spacing(4),
    },
    maxWidth: 1280,
    width: "100%",
  },
  wrapper: {
    minHeight: "60vh",
  },
  noDecoration: {
    textDecoration: "none !important",
  },
  IMG:{
    height:1000,
    width:1000
  }
});


function About(props) {
  const { classes, blogPosts, selectBlog, theme } = props;

  const isWidthUpSm = useMediaQuery(theme.breakpoints.up("sm"));
  const isWidthUpMd = useMediaQuery(theme.breakpoints.up("md"));

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
            <span class="navLink">Log In</span>
        </div></a>
    </div>

    <nav>
        <div class="logo">
            <img src ={TutorSpaceNavLogo}/>
        </div>
        <div class="navLinks">
            <a href="index"><span class="navLink">Home</span></a>
            <a href="about"><span class="navLink">About</span></a>
            <a href="index#contact"><span class="navLink">Contact</span></a>
            <a href="login"><span class="selectedNavLink">Log In</span></a>
            <xml version="1.0" encoding="UTF-8"><svg id="menuIcon" width="20px" height="20px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#2e4756"><path d="M3 5h18M3 12h18M3 19h18" stroke="#2e4756" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></xml>
        </div>
    </nav>

    <section class="aboutSection1">
        <div class="about1Content">
            <div class="aboutTagline">
                <h3>
                    Take the headache out of business administration and focus on creating excellent outcomes for students
                </h3>
            </div>
            <div class="aboutCaption">
                <ul>
                    <li>Automated Payments</li>
                    <li>Automated Reminders and Communications</li>
                    <li>Progress Tracking and Analytics</li>
                    <li>Student, Parent, and Tutor Portal Access</li>
                    <li>Pre-built SAT and ACT Courses</li>
                    <li>Interactive Whiteboard and Filesharing</li>
                    <li>Integrated Tests, Quizzes, and Grading </li>
                    <li>Session Scheduling</li>
                </ul>
            </div>
        </div>
    </section>

    <section class="aboutSection2">
        <div class="about2Content">
            <div class="aboutBlock">
                <h4>What is TutorSpace?</h4>
                <p>TutorSpace is a platform built with all the tools you need to manage a tutoring business; payments, assignments and scoring, progress reports, scheduling, and more all in one place!</p>
            </div>
            <div class="aboutBlock">
                <h4>Who is TutorSpace for?</h4>
                <p>TutorSpace is meant for tutoring businesses looking for an easier way to manage their logistics and processes and remove the need for spreadsheets, multiple external tools, and repetitive manual work.</p>
            </div>
            <div class="aboutBlock">
                <h4>How does TutorSpace work?</h4>
                <p>TutorSpace is a platform managed in the cloud that that you can access from anywhere. We'll work with you to set up accounts for administrators, students, and tutors and import your existing data. We'll also show you how to get the most out of TutorSpace and all the ways it can make your existing processes more efficient, from managing paymentsand scheduling sessions to creating progress reports and tracking scores.</p>
            </div>
            <div class="aboutBlock">
                <h4>How can I try out TutorSpace?</h4>
                <p>Fill out our contact form <a href="index.html#contact">here</a> to get a demo of the platform and we'll get you started!</p>
            </div>

        </div>
    </section>

    <footer>
        <div class="footerLogo">
            <img src={TutorSpaceFooterLogo}/>
        </div>

        <div class="navLinks">
            <a href="index.html"><span class="navLink">Home</span></a>
            <a href="about.html"><span class="navLink">About</span></a>
            <a href="index.html#contact"><span class="navLink">Contact</span></a>
            <a href="login.html"><span class="navLink">Log In</span></a>
        </div>
    </footer>


</body>
  );
}

About.propTypes = {

  classes: PropTypes.object.isRequired,

};

export default withStyles(styles, { withTheme: true })(About);
