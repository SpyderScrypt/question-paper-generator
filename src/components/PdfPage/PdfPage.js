import React, { Component } from "react";
import { style } from "./stylesheet/style";
import { Redirect } from "react-router-dom";

const electron = window.require("electron");
const ipcRenderer = electron.ipcRenderer;

export default class PdfPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    };
  }

  componentDidMount() {
    document.getElementsByClassName("main-nav")[0].style.display = "none";
    ipcRenderer.send("print-to-pdf");
  }

  render() {
    if (this.state.redirect) {
      return (
        <Redirect
          to={{
            pathname: "/generatepaper"
          }}
        />
      );
    }

    ipcRenderer.on("printSuccessful", (event, data) => {
      this.setState({
        redirect: true
      });
      document.getElementsByClassName("main-nav")[0].style.display = "flex";
    });

    let questionsData = this.props.location.state.questionPaperData
      .questionsData;
    let metaDataForQuestionPaper = this.props.location.state.questionPaperData
      .metaDataForQuestionPaper;
    console.log(this.props.location.state.questionPaperData);

    return (
      <div>
        {/* Question Paper MetaData  */}
        <div style={style.metaDataContainer}>
          <p style={style.metaDataItem}>
            Subject:- {metaDataForQuestionPaper.subject}
          </p>
          <p style={style.metaDataItem}>
            Marks:- {metaDataForQuestionPaper.marks}
          </p>
          <p style={style.metaDataItem}>
            Time:- {metaDataForQuestionPaper.time}
          </p>
        </div>

        {/* Questions */}
        {questionsData.map((questionData, index) => {
          return (
            <div key={index}>
              <div style={style.mainQuestionContainer}>
                <div style={style.mainQuestionNumber}>
                  <p>{questionData.questionName}</p>
                </div>
                <div style={style.mainQuestionOption}>
                  <p>
                    Attempt any {questionData.compulsoryQuestions} of the
                    following
                  </p>
                </div>
                <div style={style.mainQuestionMarks}>
                  <p>{questionData.totalMarks}</p>
                </div>
              </div>
              <div style={style.subQuestionContainer}>
                <div style={style.questionsContainer}>
                  {questionData.questionsArr.map((question, index) => {
                    return (
                      <div key={index} style={style.questionsAndMarksContainer}>
                        <div style={style.questionNumber}>
                          <p>{index + 1} ) </p>
                        </div>
                        <div style={style.question}>
                          <p>{question}</p>
                        </div>
                        <div style={style.questionMarks}>
                          <p>
                            {questionData.totalMarks /
                              questionData.compulsoryQuestions}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}
