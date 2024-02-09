import React, { Fragment, Suspense, lazy, useContext, useEffect, createContext } from "react";
import { ThemeProvider, StyledEngineProvider, CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import theme from "./theme";
import GlobalStyles from "./GlobalStyles";
import Pace from "./shared/components/Pace";
import {GlobalOuputProvider} from './useGlobalOutput'
//import { createGlobalState } from 'react-hooks-global-state';
import AlertMUITemplate from "react-alert-template-mui";
import { positions, Provider } from "react-alert";
//import { createScreenScaler } from "screen-scaler";




const LoggedInComponent = lazy(() => import("./logged_in/components/Main"));

const LoggedOutComponent = lazy(() => import("./logged_out/components/Main"));



const options = {
  position: positions.MIDDLE
};
//const initialState = { count: 0 };
//const { useGlobalState } = createGlobalState(initialState);

//const [count, setCount] = useGlobalState('count');




function App() {
 
/*
  useEffect(() => {

    // Detect if the user agent is an iPad or iPhone
    const isIpadOrIphone =  true//  /iPad|iPhone/.test(navigator.userAgent) && !window.MSStream;
    // Directly apply scale to the body of the document
    const scaleValue = isIpadOrIphone ? '1.1' : '1';
   //document.body.style.transform = `scale(${scaleValue})`;
    document.body.style.transformOrigin = 'top left';
    document.body.style.width = isIpadOrIphone ? '150%' : '100%'; // Adjust width to compensate for the scale
  }, []);
*/





  return (
   
   
      <BrowserRouter>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles />
            <Pace color={theme.palette.primary.light} />
            <Suspense fallback={<Fragment />}>
              <Switch>
                <Route path="/c">
                  

                    <LoggedInComponent />
                  
                </Route>
                <Route>
                  <LoggedOutComponent />
                </Route>
              </Switch>
            </Suspense>
          </ThemeProvider>
        </StyledEngineProvider>
      </BrowserRouter>


  
  );
}

/*
<BrowserRouter>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <GlobalStyles />
          <Pace color={theme.palette.primary.light} />
          <Suspense fallback={<Fragment />}>
            <Switch>
              <Route path="/c">
                <Provider template={AlertMUITemplate} {...options}>
                  <LoggedInComponent />
                </Provider>
              </Route>
              <Route>
                <LoggedOutComponent />
              </Route>
            </Switch>
          </Suspense>
        </ThemeProvider>
      </StyledEngineProvider>
    </BrowserRouter>
*/
export default App;
