import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';


var cors = require('cors')
const corsOptions ={
  origin:'http://localhost:3001', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
//App.use(cors()) // Use this after the variable declaration


class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to an error reporting service here
    // For example: logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI here
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}
//App.use(cors(corsOptions));

ReactDOM.render(
  <App />,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
