import React, { Component } from "react";
import { style } from "./stylesheet/style";
import { Link } from "react-router-dom";

const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

ipcRenderer.on("questionAddedSuccessfully", (event, data) => {
  alert("Added Successfully");

});

export default class AddQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unitList: [],
      unitName: "",
      questions: [""]
    };
  }

  componentDidMount() {
    ipcRenderer.send("getUnitList");
  }

  unitNamechangeHandler = (e, index) => {
    this.setState({
      unitName: e.target.value
    });
  };

  changeHandler = (e, index) => {
    let questions = [...this.state.questions];
    questions[index] = e.target.value;
    this.setState({
      questions: questions
    });
  };

  addHandler = () => {
    let questions = [...this.state.questions];
    questions.push("");
    this.setState({
      questions: questions
    });
  };

  removeHandler = (e, index) => {
    let questions = [...this.state.questions];
    questions.splice(index, 1);
    this.setState({
      questions: questions
    });
  };

  submitHandler = () => {
    ipcRenderer.send("addQuestion", {
      unitName: this.state.unitName,
      questionsArr: this.state.questions
    });
  };

  render() {
    // listen for unitListReady which gets all unitName from db
    ipcRenderer.on("unitListReady", (event, data) => {
      this.setState({
        unitList: data
      });
    });

    console.log(this.state.unitName);

    return (
      <div>
        <div style={style.selectUnitContainer}>
          <label style={style.selectBoxLabel}>Select Unit</label>
          <select
            defaultValue={"DEFAULT"}
            name="unit"
            style={style.selectBox}
            onChange={e => {
              this.unitNamechangeHandler(e);
            }}
          >
            <option value="DEFAULT" disabled>
              Choose Unit
            </option>
            {this.state.unitList.map((item, index) => {
              return <option key={index}>{item}</option>;
            })}
          </select>
        </div>

        <div style={style.questionInputContainer}>
          {this.state.questions.map((data, index) => {
            return (
              <div key={index}>
                <input
                  style={style.questionsInputType}
                  type="text"
                  value={this.state.questions[index]}
                  onChange={e => {
                    this.changeHandler(e, index);
                  }}
                  placeholder="Enter Question"
                  className="validate"
                />
                <img
                  src={process.env.PUBLIC_URL + "/close.svg"}
                  onClick={e => {
                    this.removeHandler(e, index);
                  }}
                  alt="Cancel Button"
                  height="20px"
                  style={style.button}
                />
              </div>
            );
          })}
          <br />
          {/* <button onClick={this.addHandler}>Add</button> */}
          <img
            src={process.env.PUBLIC_URL + "/add.svg"}
            onClick={this.addHandler}
            alt="Cancel Button"
            height="30px"
            style={style.button}
          />
          <br />
          {/* <button onClick={this.submitHandler} style={style.submitButton}>
            Submit
          </button> */}
          <Link
            href=""
            onClick={this.submitHandler}
            className="waves-effect waves-light btn"
            style={style.submitButton}
          >
            Submit
          </Link>
        </div>
      </div>
    );
  }
}
