const electron = require("electron");
const { shell } = require("electron");
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;

const path = require("path");
const url = require("url");
const fs = require("fs");

// LowDb imports
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);

// const {
//   default: installExtension,
//   REDUX_DEVTOOLS
// } = require("electron-devtools-installer");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 800, height: 600 });

  // installExtension(REDUX_DEVTOOLS)
  //   .then(name => console.log(`Added Extension: ${name}`))
  //   .catch(err => console.log("An error occurred: ", err));

  // and load the index.html of the app.
  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, "/../build/index.html"),
      protocol: "file:",
      slashes: true
    });
  mainWindow.loadURL(startUrl);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on("closed", function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function() {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// -------------------------------- Events ---------------------------------------

// On addUnit event
ipcMain.on("addUnit", (event, unitData) => {
  console.log(unitData, "received Unit data from react");
  // If unit name is already present, alert user, if not then add data to db
  let lowerCaseUnitName = unitData.unitName.toLowerCase();
  // Get all data in db
  let dbData = db.getState();
  let unitNamePresentFlag = false;

  for (let i = 0; i < dbData.length; i++) {
    if (dbData[i].unitName.toLowerCase() == lowerCaseUnitName) {
      unitNamePresentFlag = true;
      break;
    }
  }

  if (unitNamePresentFlag) {
    mainWindow.webContents.send("unitNamePresent");
  } else {
    // Add data to db
    let result = db
      //   .get()
      .push({
        unitName: unitData.unitName,
        questionsArr: unitData.questionsArr
        // marks: unitData.marks
      })
      .write();

    mainWindow.webContents.send("unitAddedSuccessfully");
  }
});

// On getUnitList event
ipcMain.on("getUnitList", event => {
  let dbData = db.getState();
  let unitListArr = dbData.map(item => {
    return item.unitName;
  });

  mainWindow.webContents.send("unitListReady", unitListArr);
});

// On generateQuestions event
ipcMain.on("generateQuestions", (event, questionsData) => {
  console.log("Question Data from user ==> ", questionsData);

  // Create array containing data of user given unit name to optmize
  // so that below loops will only loop through that data and not whole db array
  // First Get all data from db
  let dbData = db.getState();
  // console.log("DB DATA ============>", dbData);

  // Get all unitNames passed by user
  let allUnitName = questionsData.map(item => {
    return item.unit;
  });
  let filteredDbData = [];
  // Get array of data from db which contains unit name passed by user
  for (let i = 0; i < dbData.length; i++) {
    if (allUnitName.indexOf(dbData[i].unitName) !== -1) {
      // Here deep copy is need to push data otherwise it mutates
      // filteredDbData.push(dbData[i]);
      filteredDbData.push(JSON.parse(JSON.stringify(dbData[i])));
    }
  }

  // Generate random questions for each question number as given by user and push it in
  // result array
  let result = [];

  questionsData.forEach(qtData => {
    for (let i = 0; i < filteredDbData.length; i++) {
      if (filteredDbData[i].unitName == qtData.unit) {
        let resultObj = {};
        resultObj.unitName = qtData.unit;
        resultObj.questionsArr = [];
        resultObj.questionName = qtData.questionName;
        resultObj.compulsoryQuestions = qtData.compulsoryQuestions;
        resultObj.totalMarks = qtData.totalMarks;

        // Get number of questions in that unit
        let noOfQuestions = filteredDbData[i].questionsArr.length;
        // Get required questions form that unit
        let requiredQuestions = qtData.questionsFromUnit;

        // Generate "N" random numbers where "N" is requiredQuestions
        for (let n = 0; n < requiredQuestions; n++) {
          // generate random number between 1 and number of qts in that unit
          let randomIndex = Math.floor(Math.random() * noOfQuestions);
          // push qt[randomindex]
          resultObj.questionsArr.push(
            filteredDbData[i].questionsArr[randomIndex]
          );
          //once qt is added, remove it from questionsArr to avoid getting that qt multiple times
          filteredDbData[i].questionsArr.splice(randomIndex, 1);
          noOfQuestions--;
        }
        result.push(resultObj);
      }
    }
  });
  console.log("Result ==> ", result);
  mainWindow.webContents.send("questionPaperData", result);
});

// On addQuestion event
ipcMain.on("addQuestion", (event, unitData) => {
  // Get selected unit data
  let selectedUnit = db.find({ unitName: unitData.unitName }).value();
  // Get questions from selected unit
  let oldQuestionsArr = selectedUnit.questionsArr;
  // Add new and old questions in newQuestionArr
  let newQuestionArr = [...oldQuestionsArr, ...unitData.questionsArr];
  // write new newQuestionArr to db
  db.find({ unitName: unitData.unitName })
    .assign({ questionsArr: newQuestionArr })
    .write();

  mainWindow.webContents.send("questionAddedSuccessfully");
});

// On getSelectedUnitQuestions event
ipcMain.on("getSelectedUnitQuestions", (event, unitName) => {
  // Get selected unit data
  let selectedUnit = db.find({ unitName: unitName }).value();
  // Get questions from selected unit
  let selectedUnitQuestions = selectedUnit.questionsArr;
  // Send that questions array to react

  mainWindow.webContents.send(
    "selectedUnitQuestionsData",
    selectedUnitQuestions
  );
});

// On saveEditedQuestionsData event
ipcMain.on("saveEditedQuestionsData", (event, data) => {
  let unitName = data.unitName;
  let questionsArr = data.questionsArr;
  console.log(data);

  // write new edited questionsArr to db
  db.find({ unitName: unitName })
    .assign({ questionsArr: questionsArr })
    .write();
  mainWindow.webContents.send("dataEditedSuccessfully");
});

// On print-to-pdf event (Pdf printing logic)
ipcMain.on("print-to-pdf", function(event) {
  // First Create a directory manually called outputpdf
  const pdfPath = path.join(__dirname, "/outputpdf/print.pdf");
  // Get window which is sending event
  const win = BrowserWindow.fromWebContents(event.sender);
  // Print pdf
  win.webContents.printToPDF(
    { printBackground: true, landscape: true },
    function(error, data) {
      if (error) throw error;
      fs.writeFile(pdfPath, data, function(error) {
        if (error) {
          throw error;
        }
        // Open pdf after saving it to disk
        shell.openExternal("file://" + pdfPath);
        mainWindow.webContents.send("printSuccessful");
      });
    }
  );
});

// On deleteUnit
ipcMain.on("deleteUnit", (event, unitName) => {
  db.remove({ unitName: unitName }).write();

  mainWindow.webContents.send("unitDeletedSuccessfully");
});

// -------------------------------- Dump Code ----------------------------------

// Dump
// // Communication tutorial basic
// ipcMain.on("todo:add", (event, todo) => {
//   console.log(todo, "received data from react in index.js");
//   mainWindow.webContents.send("todo:add", "Akash");
// });

// LowDB Api adapter update
// db.find({ unitName: unitData.unitName })
// .assign({ title: "hi!" })
// .write();

// LowDB API to get Data
// let selectedUnit = db.find({ unitName: unitData.unitName }).value();
