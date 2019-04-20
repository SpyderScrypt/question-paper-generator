import React, { Component } from "react";
import style from "./stylesheet/UnitInputStyle";

const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

ipcRenderer.on("unitNamePresent", (event, data) => {
  alert("Unit Name Already Present");
});

export default class UnitInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unitName: "",
      marks: null,
      questions: [""]
    };
    this.unitNameInput = React.createRef();
    this.unitMarksInput = React.createRef();

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
      marks: this.state.marks,
      marks: this.unitMarksInput.current.value
    });

    ipcRenderer.send("addUnit", {
      unitName: this.state.unitName,
      questionsArr: this.state.questions,
      marks: this.state.marks
    });
  }

  render() {
    return (
      <div>
        <div style={style.inputContainer}>
          <div>
            <span>Enter Unit Name - </span>
            <input type="text" ref={this.unitNameInput} />
          </div>
          <div>
            <span>Enter Marks - </span>
            <input type="number" ref={this.unitMarksInput} />
          </div>
        </div>
        <div style={style.questionInputContainer}>
          {this.state.questions.map((data, index) => {
            return (
              <div>
                <p>Enter Question</p>
                <input
                  style={style.questionsInputType}
                  type="text"
                  value={this.state.questions[index]}
                  onChange={e => {
                    this.changeHandler(e, index);
                  }}
                />
                <button
                  onClick={e => {
                    this.removeHandler(e, index);
                  }}
                >
                  Remove
                </button>
              </div>
            );
          })}
          <br />
          <button onClick={this.addHandler}>Add</button>
          <br />
          <button onClick={this.submitHandler}>Submit</button>
        </div>
      </div>
    );
  }
}
