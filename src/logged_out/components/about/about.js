import React, { useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Grid, Box } from "@mui/material";
import withStyles from "@mui/styles/withStyles";
import FAQ from "./FAQ";
import useMediaQuery from "@mui/material/useMediaQuery";

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



  return (
    <Box
      display="flex"
      justifyContent="center"
      className={classNames(classes.wrapper, "lg-p-top")}
    >
      
      <div className={classes.blogContentWrapper}>
        <Grid container spacing={3}>
          
        <FAQ />
        </Grid>
      </div>
    </Box>
  );
}

About.propTypes = {

  classes: PropTypes.object.isRequired,

};

export default withStyles(styles, { withTheme: true })(About);
