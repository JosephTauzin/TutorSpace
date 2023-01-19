import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import db from "../src/firebase"

var cors = require('cors')
const corsOptions ={
  origin:'http://localhost:3001', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
//App.use(cors()) // Use this after the variable declaration


//App.use(cors(corsOptions));

ReactDOM.render(
  <App />,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
