import React, { Fragment, Suspense, lazy } from "react";
import { ThemeProvider, StyledEngineProvider, CssBaseline } from "@mui/material";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import theme from "./theme";
import GlobalStyles from "./GlobalStyles";
import Pace from "./shared/components/Pace";
import {GlobalOuputProvider} from './useGlobalOutput'
//import { createGlobalState } from 'react-hooks-global-state';
import AlertMUITemplate from "react-alert-template-mui";
import { positions, Provider } from "react-alert";
const LoggedInComponent = lazy(() => import("./logged_in/components/Main"));

const LoggedOutComponent = lazy(() => import("./logged_out/components/Main"));

const options = {
  position: positions.MIDDLE
};
//const initialState = { count: 0 };
//const { useGlobalState } = createGlobalState(initialState);

//const [count, setCount] = useGlobalState('count');

function App() {
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
  
  );
}

export default App;
