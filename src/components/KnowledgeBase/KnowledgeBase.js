import React, { Component } from "react";
import style from "./stylesheet/style";

export default class KnowledgeBase extends Component {
  render() {
    return (
      <div style={style.titleBlock}>
        <p style={style.titleText}>Add Unit</p>
        <p style={style.titleText}>Edit Unit</p>
        <p style={style.titleText}>Delete Unit</p>
      </div>
    );
  }
}
