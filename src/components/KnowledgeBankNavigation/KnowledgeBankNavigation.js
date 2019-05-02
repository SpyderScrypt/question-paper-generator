import React, { Component } from "react";
import { Link } from "react-router-dom";
import style from "./stylesheet/style";

export default class KnowledgeBankNavigation extends Component {
  componentDidMount() {
    document.getElementById("knowledgebaseLink").style.color = "#2BBBAD";
  }
  componentWillUnmount() {
    document.getElementById("knowledgebaseLink").style.color = "#ffff";
  }
  render() {
    return (
      <div style={style.titleBlock}>
        <Link id="addUnitLink" to={"/addUnit"} style={style.titleText}>
          Add Unit
        </Link>
        <Link id="addQuestionLink" to={"/addQuestion"} style={style.titleText}>
          Add Question
        </Link>
        <Link id="editUnitLink" to={"/editUnit"} style={style.titleText}>
          Edit Unit
        </Link>
      </div>
    );
  }
}
