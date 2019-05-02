import React, { Component } from "react";
import { style } from "./stylesheet/style";
import { Redirect } from "react-router-dom";

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
      redirect: false,
      metaDataForQuestionPaper: {
        subject: "",
        marks: "",
        time: ""
      }
    };
  }

  componentDidMount() {
    document.getElementById("generatepaperLink").style.color = "#2BBBAD";
    ipcRenderer.send("getUnitList");
  }

  componentWillUnmount(){
    document.getElementById("generatepaperLink").style.color = "#ffff";

  }

  changeHandler = (e, index) => {
    let questionsInfo = [...this.state.questionsInfo];
    let element = e.target.name;
    questionsInfo[index][element] = e.target.value;
    this.setState({
      questionsInfo: questionsInfo
    });
  };

  metadataChangeHandler = e => {
    let element = e.target.name;
    let metaDataForQuestionPaper = { ...this.state.metaDataForQuestionPaper };
    metaDataForQuestionPaper[element] = e.target.value;
    this.setState({
      metaDataForQuestionPaper: metaDataForQuestionPaper
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
    console.log(this.state);

    // listen for unitListReady which gets all unitName from db
    ipcRenderer.on("unitListReady", (event, data) => {
      this.setState({
        unitList: data
      });
    });

    //Listen for questionPaperData which gets random questions and other data for each question Number
    ipcRenderer.on("questionPaperData", (event, data) => {
      this.setState({
        questionPaperData: data,
        redirect: true
      });
    });

    if (this.state.redirect) {
      let questionPaperData = {
        questionsData: this.state.questionPaperData,
        metaDataForQuestionPaper: this.state.metaDataForQuestionPaper
      };
      return (
        <Redirect
          to={{
            pathname: "/questionPaper",
            state: { questionPaperData: questionPaperData }
          }}
        />
      );
    }

    return (
      <div style={style.pageContainer}>
        <div style={style.metadataContainer}>
          <input
            type="text"
            name="subject"
            value={this.state.metaDataForQuestionPaper.subject}
            onChange={e => {
              this.metadataChangeHandler(e);
            }}
            placeholder="Subject Name"
            className="validate"
          />

          <input
            type="text"
            name="marks"
            value={this.state.metaDataForQuestionPaper.marks}
            onChange={e => {
              this.metadataChangeHandler(e);
            }}
            placeholder="Marks"
            className="validate"
          />

          <input
            type="text"
            name="time"
            value={this.state.metaDataForQuestionPaper.time}
            onChange={e => {
              this.metadataChangeHandler(e);
            }}
            placeholder="Time"
            className="validate"
          />
        </div>
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
              <img
                src={process.env.PUBLIC_URL + "/close.svg"}
                onClick={e => {
                  this.removeHandler(e, index);
                }}
                alt="Cancel Button"
                height="27px"
                style={style.button}
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
            style={style.button}
          />

          <a
            onClick={this.submitHandler}
            className="waves-effect waves-light btn"
            style={style.submitButton}
          >
            Submit
          </a>
        </div>
      </div>
    );
  }
}
