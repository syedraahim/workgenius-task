import React from "react";
import "./App.css";
import { Typography } from "@material-ui/core";
import { Provider } from 'react-redux';
import CssBaseline from '@mui/material/CssBaseline';
import InteractiveHeading from "./components/common/typography";
import store from './redux/store';
import UploadImages from "./components/upload-images";

function App() {
  return (
    <Provider store={store}>
      <CssBaseline />
    <div className="container">
      <div className="mg20">
      <InteractiveHeading text="WorkGenius Task" variant="h2" />
      <InteractiveHeading text="Image Uploader"  variant="h5"/>
      </div>

      <UploadImages />
    </div>
    </Provider>
  );
}

export default App;
