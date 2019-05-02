import React, { Component } from "react";
import style from "./stylesheet/UnitInputStyle";
import { Link } from "react-router-dom";

const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

ipcRenderer.on("unitNamePresent", (event, data) => {
  alert("Unit Name Already Present");
});

ipcRenderer.on("unitAddedSuccessfully", event => {
  alert("Unit Added Successfully");
});

export default class UnitInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unitName: "",
      // marks: null,
      questions: [""]
    };
    this.unitNameInput = React.createRef();
    // this.unitMarksInput = React.createRef();

    this.submitHandler = this.submitHandler.bind(this);
  }

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

  async submitHandler() {
    await this.setState({
      unitName: this.unitNameInput.current.value,
      // marks: this.state.marks,
      // marks: this.unitMarksInput.current.value
    });

    ipcRenderer.send("addUnit", {
      unitName: this.state.unitName,
      questionsArr: this.state.questions,
      // marks: this.state.marks
    });
  }

  render() {
    return (
      <div>
        <div style={style.inputContainer}>
          <div>
            <input
              type="text"
              ref={this.unitNameInput}
              placeholder="Enter Unit Name"
              class="validate"
            />
          </div>
          {/* <div>
            <input
              type="number"
              ref={this.unitMarksInput}
              placeholder="Marks for this unit (optional)"
              class="validate"
            />
          </div> */}
        </div>
        <div style={style.questionInputContainer}>
          {this.state.questions.map((data, index) => {
            return (
              <div>
                <input
                  style={style.questionsInputType}
                  type="text"
                  value={this.state.questions[index]}
                  onChange={e => {
                    this.changeHandler(e, index);
                  }}
                  placeholder="Enter Question"
                  class="validate"
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
            class="waves-effect waves-light btn"
            style={style.submitButton}
          >
            Submit
          </Link>
        </div>
      </div>
    );
  }
}
