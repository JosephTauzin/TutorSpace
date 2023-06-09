import React, { Fragment, useEffect, useState, useRef, useCallback, memo } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Hidden, IconButton } from "@mui/material";
import withStyles from '@mui/styles/withStyles';
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import ContactsIcon from "@mui/icons-material/Contacts";
import BookIcon from "@mui/icons-material/Book";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import NavigationDrawer from "../../../shared/components/NavigationDrawer";
import MeasureUpLogo from "./MeasureUpLogoTransparent.png"

const styles = theme => ({
  appBar: {
    boxShadow: theme.shadows[0],
    backgroundColor: 'transparent'
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
   
  },
  menuButtonText: {
    fontSize: theme.typography.body1.fontSize,
    fontWeight: theme.typography.h6.fontWeight
  },
  brandText: {
    fontFamily: "'Baloo Bhaijaan', cursive",
    fontWeight: 400
  },
  noDecoration: {
    textDecoration: "none !important"
  },
  menuButton:{
    position: 'absolute',
    right: 0,
  }
});

function NavBar(props) {
  const {
    classes,
    openRegisterDialog,
    openLoginDialog,
    handleMobileDrawerOpen,
    handleMobileDrawerClose,
    mobileDrawerOpen,
    selectedTab
  } = props;
  const menuItems = [
    {
      link: "/",
      name: "Home",
      icon: <HomeIcon className="text-white" />
    },
  
    {
      link: "/about",
      name: "FAQ/About",
      icon: <InfoIcon className="text-white" />
    },
  
    {
      link: "#contact",
      name: "Contact",
      icon: <HomeIcon className="text-white" />
    },

    {
      link: "",
      name: "Blog",
      icon: <HomeIcon className="text-white" />
    },
  
    {
      name: "Login",
      onClick: openLoginDialog,
      icon: <LockOpenIcon className="text-white" />
    },
    /*
    {
      name: "Schedule Free Session!",
      link: '',
      icon: <LockOpenIcon className="text-white" />
    },
    */
  ];


  const menuItemsMobile = [
    {
      link: "/",
      name: "Home",
      icon: <HomeIcon className="text-white" />
    },
  
    {
      link: "/about",
      name: "FAQ/About",
      icon: <InfoIcon className="text-white" />
    },
  
    {
      link: "#contact",
      name: "Contact",
      icon: <ContactsIcon className="text-white" />
    },

    {
      link: "",
      name: "Blog",
      icon: <BookIcon className="text-white" />
    },
  
    
    /*
    {
      name: "Schedule Free Session!",
      link: '',
      icon: <LockOpenIcon className="text-white" />
    },
    */
  ];

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
  //window.location.href
  function LogoSwitcher(){
    if(isMobile == true){
      return(
        <div className = 'LogoDivMobile'>
            <img src={MeasureUpLogo}/>
          </div>
      )
    }else{
      return(
        <div className = 'LogoDiv'>
            <img src={MeasureUpLogo}/>
          </div>
      )
    }
  }
  const [page, setPage] = useState()
  useEffect(()=>{
   
    
  },[window.location.href])
  //&& !(window.location.href.includes('about'))
  //&& window.location.href.includes('about')
  return (
    <div >
      <AppBar position="relative" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          {LogoSwitcher()}
          <Hidden mdUp>
              <IconButton
                className={classes.menuButton}
                onClick={handleMobileDrawerOpen}
                aria-label="Open Navigation"
                size="large">
                <MenuIcon color="primary" />
              </IconButton>
            </Hidden>
          <div>
           
            <Hidden mdDown>
              {menuItems.map(element => {
                if(element.name == 'Blog'){
                  return(
                    <a href="https://measureupprep.medium.com/"  target="_blank">
                    
                    <Button
                      color="Orange"
                      size="large"
                      classes={{ text: classes.menuButtonText }}
                    >
                      {element.name}
                    </Button>
                  
                  </a>
                  )
                }
               
                if(element.name == 'Contact'){
                  return(
                    <a href="#contact">
                    
                    <Button
                      color="Orange"
                      size="large"
                      classes={{ text: classes.menuButtonText }}
                    >
                      {element.name}
                    </Button>
                  
                  </a>
                  )
                }
                if (element.link) {
        
                  if(element.name == 'FAQ/About' ){
                    return (
                      <Link
                        key={element.name}
                        to={element.link}
                        className={classes.noDecoration}
                        onClick={handleMobileDrawerClose}
                      >
                        <Button
                          color="Orange"
                          size="large"
                          classes={{ text: classes.menuButtonText }}
                        >
                          {element.name}
                        </Button>
                      </Link>
                    );
                  }
                  else if(element.name == 'Home' ){
                    return (
                      <Link
                        key={element.name}
                        to={element.link}
                        className={classes.noDecoration}
                        onClick={handleMobileDrawerClose}
                      >
                        <Button
                          color="Orange"
                          size="large"
                          classes={{ text: classes.menuButtonText }}
                        >
                          {element.name}
                        </Button>
                      </Link>
                    );
                  }
                  else{
                    return(null)
                  }
                }
                return (
                  <Button
                    color="Orange"
                    size="large"
                    //variant="outlined"
                    onClick={element.onClick}
                    classes={{ text: classes.menuButtonText }}
                    key={element.name}
                  >
                    {element.name}
                  </Button>
                );
              })}
            </Hidden>
          </div>
        </Toolbar>
      </AppBar>
      
          <NavigationDrawer
                  menuItems={menuItemsMobile}
                  anchor="right"
                  open={mobileDrawerOpen}
                  selectedItem={selectedTab}
                  onClose={handleMobileDrawerClose}
                />
    </div>
  );
}




 
NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  handleMobileDrawerOpen: PropTypes.func,
  handleMobileDrawerClose: PropTypes.func,
  mobileDrawerOpen: PropTypes.bool,
  selectedTab: PropTypes.string,
  openRegisterDialog: PropTypes.func.isRequired,
  openLoginDialog: PropTypes.func.isRequired
};

export default withStyles(styles, { withTheme: true })(memo(NavBar));
