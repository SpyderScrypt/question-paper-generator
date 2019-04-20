import React, { Component } from "react";
import style from "./stylesheet/style";
import { Link } from "react-router-dom";

export default class MainNavbar extends Component {
  render() {
    return (
      <div style={style.titleBlock}>
        <p>
          <Link style={style.titleText} to={"/knowledgebase"}>
            Knowledge Bank
          </Link>
        </p>
        <p style={style.titleText}>
          <Link style={style.titleText} to={"/generatepaper"}>
            Generate Paper
          </Link>
        </p>
        <p style={style.titleText}>
          <Link style={style.titleText} to={"/"}>
            Instructions
          </Link>
        </p>
      </div>
    );
  }
}
