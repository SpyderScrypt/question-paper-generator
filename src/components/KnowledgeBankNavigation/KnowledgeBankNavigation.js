import React, { Component } from "react";
import { Link } from "react-router-dom";
import style from "./stylesheet/style";

export default class KnowledgeBankNavigation extends Component {
  render() {
    return (
      <div style={style.titleBlock}>
        <Link to={"/addUnit"} style={style.titleText}>Add Unit</Link>
        <Link to={"/addQuestion"} style={style.titleText}>Add Question</Link>
        <Link to={"/addUnit"} style={style.titleText}>Edit Unit</Link>
      </div>
    );
  }
}
