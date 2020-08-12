const electron = require("electron");
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const BrowserWindow = electron.BrowserWindow;

const path = require("path");
const url = require("url");

let mainWindow;

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
    backgroundColor: "#e3dcd8",
    show: false,
    frame: false,
  });

  mainWindow.loadURL("http://localhost:3000");
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });
  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  app.quit();
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

var server = require("./server");
var router = require("./router");
var handler = require("./handler");

var handle = {};

// Untuk menentukan pathname
handle["/"] = handler.mainMenu;
handle["/main"] = handler.mainMenu;
handle["/css"] = handler.style; // handler untuk style
handle["/serial"] = handler.serial; // handler untuk serial.js
handle["/titlebar"] = handler.titlebar; // handler untuk titlebar.js
handle["/sm"] = handler.serialMonitor;
handle["/db"] = handler.database;

server.startserver(router.route, handle);
