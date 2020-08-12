const electron = require("electron");
// const express = require("express");
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
      // preload: path.join(__dirname, 'preload.js')
    },
  });

  mainWindow.loadURL("http://localhost:3000");
  // and load the index.html of the app.
  // mainWindow.loadURL(
  //   url.format({
  //     pathname: path.join(__dirname, "mainMenu.html"),
  //     protocol: "file:",
  //     slashes: true,
  //   })
  // );

  // Emitted when the window is closed.
  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  app.quit();
});

app.on("activate", function () {
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
handle["/css"] = handler.style;
handle["/serial"] = handler.serial;
handle["/sm"] = handler.serialMonitor;
handle["/db"] = handler.database;

server.startserver(router.route, handle);
