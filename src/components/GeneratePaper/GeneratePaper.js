import React, { Component } from "react";
import { style } from "./stylesheet/style";
import { Link, Redirect } from "react-router-dom";

const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

export default class GeneratePaper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionsInfo: [
        {
          questionName: "",
          unit: "",
          questionsFromUnit: "",
          compulsoryQuestions: "",
          totalMarks: ""
        }
      ],
      unitList: [],
      questionPaperData: [],
      redirect: false
    };
  }

  componentDidMount() {
    ipcRenderer.send("getUnitList");
  }

  changeHandler = (e, index) => {
    let questionsInfo = [...this.state.questionsInfo];
    let element = e.target.name;
    questionsInfo[index][element] = e.target.value;
    this.setState({
      questionsInfo: questionsInfo
    });
  };

  addHandler = () => {
    let questionsInfo = [...this.state.questionsInfo];
    questionsInfo.push({
      questionName: "",
      unit: "",
      questionsFromUnit: "",
      compulsoryQuestions: "",
      totalMarks: ""
    });
    this.setState({
      questionsInfo: questionsInfo
    });
  };

  removeHandler = (e, index) => {
    let questionsInfo = [...this.state.questionsInfo];
    questionsInfo.splice(index, 1);
    this.setState({
      questionsInfo: questionsInfo
    });
  };

  submitHandler = () => {
    ipcRenderer.send("generateQuestions", this.state.questionsInfo);
  };

  render() {
    console.log(this.state.questionsInfo);

    // listen for unitListReady which gets all unitName from db
    ipcRenderer.on("unitListReady", (event, data) => {
      this.setState({
        unitList: data
      });
    });

    ipcRenderer.on("questionPaperData", (event, data) => {
      this.setState({
        questionPaperData: data,
        redirect: true
      });
    });

    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: "/questionPaper",
            state: { questionPaperData: this.state.questionPaperData }
          }}
        />
      );
    }

    return (
      <div style={style.pageContainer}>
        {this.state.questionsInfo.map((data, index) => {
          return (
            <div key={index} style={style.inputContainer}>
              <input
                type="text"
                name="questionName"
                value={this.state.questionsInfo[index].questionName}
                onChange={e => {
                  this.changeHandler(e, index);
                }}
                placeholder="Question Name Eg - Qt1, Qt1 A ..."
                className="validate"
              />

              <label>Select Unit</label>
              <select
                defaultValue={"DEFAULT"}
                name="unit"
                style={style.selectBox}
                onChange={e => {
                  this.changeHandler(e, index);
                }}
              >
                <option value="DEFAULT" disabled>
                  Choose Unit
                </option>
                {this.state.unitList.map((item, index) => {
                  return <option key={index}>{item}</option>;
                })}
              </select>

              <input
                type="number"
                name="questionsFromUnit"
                value={this.state.questionsInfo[index].questionsFromUnit}
                onChange={e => {
                  this.changeHandler(e, index);
                }}
                placeholder="Number of questions from unit"
                className="validate"
              />

              <input
                type="number"
                name="compulsoryQuestions"
                value={this.state.questionsInfo[index].compulsoryQuestions}
                onChange={e => {
                  this.changeHandler(e, index);
                }}
                placeholder="Number of compulsory questions from unit"
                className="validate"
              />

              <input
                type="number"
                name="totalMarks"
                value={this.state.questionsInfo[index].totalMarks}
                onChange={e => {
                  this.changeHandler(e, index);
                }}
                placeholder="Total Marks For This Question (Optional)"
                className="validate"
              />
            </div>
          );
        })}

        <div style={style.buttonsContainer}>
          <img
            src={process.env.PUBLIC_URL + "/add.svg"}
            onClick={this.addHandler}
            alt="Add Button"
            height="30px"
          />

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
