import React, { Component } from "react";
import { Link } from "react-router-dom";
import { style } from "./stylesheet/style";

const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

ipcRenderer.on("dataEditedSuccessfully", event => {
  alert("Edited Successfully");
});

export default class EditUnit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unitList: [],
      unitName: "",
      questions: null
    };
  }

  componentDidMount() {
    ipcRenderer.send("getUnitList");
  }

  unitNamechangeHandler = (e, index) => {
    let selectedUnit = e.target.value;
    this.setState({
      unitName: selectedUnit
    });

    ipcRenderer.send("getSelectedUnitQuestions", selectedUnit);
  };

  changeHandler = (e, index) => {
    let questions = [...this.state.questions];
    questions[index] = e.target.value;
    this.setState({
      questions: questions
    });
  };

  submitHandler = () => {
    ipcRenderer.send("saveEditedQuestionsData", {
      unitName: this.state.unitName,
      questionsArr: this.state.questions
    });
  };

  deleteHandler = index => {
    let questions = [...this.state.questions];
    questions.splice(index, 1);
    this.setState({
      questions: questions
    });
  };

  render() {
    ipcRenderer.on("unitListReady", (event, data) => {
      this.setState({
        unitList: data
      });
    });

    ipcRenderer.on("selectedUnitQuestionsData", (event, questionsArr) => {
      this.setState({
        questions: questionsArr
      });
    });

    console.log("questions Arr =======>", this.state.questions);

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

        {this.state.questions && (
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
                  <Link
                    onClick={e => {
                      this.deleteHandler(index);
                    }}
                    class="waves-effect waves-light btn-small"
                  >
                    Delete
                  </Link>
                </div>
              );
            })}
            <br />

            <Link
              href=""
              onClick={this.submitHandler}
              className="waves-effect waves-light btn"
              style={style.submitButton}
            >
              Save Changes
            </Link>
          </div>
        )}
      </div>
    );
  }
}
