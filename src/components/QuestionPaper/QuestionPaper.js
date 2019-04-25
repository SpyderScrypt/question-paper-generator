import React, { Component } from "react";
import { style } from "./stylesheet/style";

export default class QuestionPaper extends Component {
  render() {
    let questionPaperData = this.props.location.state.questionPaperData;

    return (
      <div>
        {questionPaperData.map(questionData => {
          return (
            <div>
              <p>{questionData.questionName}</p>
              <div style={style.mainContainer}>
                <div style={style.questionsContainer}>
                  {questionData.questionsArr.map((question, index) => {
                    return (
                      <div style={style.questionsAndMarksContainer}>
                        <div style={style.questionNumber}>
                          <p>{index + 1} - </p>
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
