import React, { Component } from "react";
import "./App.css";
import store from "./store/store";
import { Provider } from "react-redux";

import MainRouter from "./router/MainRouter";

const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

// Communication tutorial basic
ipcRenderer.on("todo:add", (event, todo) => {
  console.log(todo, "Data received from electron in react");
});

class App extends Component {
  componentDidMount() {
    ipcRenderer.send("todo:add", "Akash");
  }

  render() {
    return (
      <Provider store={store}>
        <MainRouter />
      </Provider>
    );
  }
}

export default App;
