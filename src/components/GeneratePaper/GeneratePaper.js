import React, { Component } from "react";
const low = window.require("lowdb");
const FileSync = window.require("lowdb/adapters/FileSync");

const adapter = new FileSync("db.json");
const db = low(adapter);

export default class GeneratePaper extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  //   componentDidMount() {
  //     let dbData = db.getState();
  //     alert(JSON.stringify(dbData));
  //   }

  render() {
    let dbData = db.getState();
    let unitArray = dbData.map(item => {
      return item.unitName;
    });
    // alert(JSON.stringify(unitArray));
    return (
      <div>
        {unitArray.map(unit => {
          return (
            <div>
              <p>{unit}</p>
              <input type="text" name="" id="" />
            </div>
          );
        })}
      </div>
    );
  }
}
