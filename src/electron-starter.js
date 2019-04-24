const electron = require("electron");
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;
const ipcMain = electron.ipcMain;

const path = require("path");
const url = require("url");

// LowDb imports
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);

const {
  default: installExtension,
  REDUX_DEVTOOLS
} = require("electron-devtools-installer");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({ width: 800, height: 600 });

  installExtension(REDUX_DEVTOOLS)
    .then(name => console.log(`Added Extension: ${name}`))
    .catch(err => console.log("An error occurred: ", err));

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
        questionsArr: unitData.questionsArr,
        marks: unitData.marks
      })
      .write();
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

// -------------------------------- Dump Code ----------------------------------

// Dump
// // Communication tutorial basic
// ipcMain.on("todo:add", (event, todo) => {
//   console.log(todo, "received data from react in index.js");
//   mainWindow.webContents.send("todo:add", "Akash");
// });
