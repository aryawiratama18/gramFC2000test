// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const serialport = require("serialport");


serialport.list((err, ports) => {
  console.log('ports', ports);
  if (err) {
    console.log(err.message);
    return
  } else {
    console.log('');
  }

  if (ports.length === 0) {
    console.log('No ports discovered');
  }


  let port = new serialport(ports[0].comName, {
    baudRate: 9600,
  });
  let autoscroll = document.getElementById("autoscroll");
  let dataArr = [];

  port.on("open", () => {
    console.log("Port opened");
  });
  port.on("data", (data) => {
    let dataSerial = data.toString("utf-8");
    let dataMonitorContainer = document.getElementById("serial-data");
    let dataMonitorLine = document.createElement("div");

    dataArr.push(dataSerial);
    console.log(dataArr);
    let lastArr = dataArr.slice(-1).pop();
    let dataDisplayed = document.createTextNode(lastArr);
    // if autoscroll checkbox is checked
    if (autoscroll.checked == true) {
      if (dataArr.length > 20) {
        dataArr.shift();
        dataMonitorContainer.removeChild(dataMonitorContainer.firstElementChild);
        dataMonitorLine.appendChild(dataDisplayed);
        dataMonitorContainer.appendChild(dataMonitorLine);
      } else if (dataArr.length > 0) {
        let lastArr = dataArr.slice(-1).pop();
        dataDisplayed = document.createTextNode(lastArr);
        dataMonitorLine.appendChild(dataDisplayed);
        dataMonitorContainer.appendChild(dataMonitorLine);
      } else {
        dataMonitorLine.innerHTML = "No incoming data";
        dataMonitorContainer.appendChild(dataMonitorLine);
      }
    } else {
      if (dataArr.length > 20) {
        dataArr.shift();
        let lastArr = dataArr.slice(-1).pop();
        dataDisplayed = document.createTextNode(lastArr);
        dataMonitorLine.appendChild(dataDisplayed);
        dataMonitorContainer.appendChild(dataMonitorLine);
      } else if (dataArr.length > 0) {
        let lastArr = dataArr.slice(-1).pop();
        dataDisplayed = document.createTextNode(lastArr);
        dataMonitorLine.appendChild(dataDisplayed);
        dataMonitorContainer.appendChild(dataMonitorLine);
      } else {
        dataMonitorLine.innerHTML = "No incoming data";
        dataMonitorContainer.appendChild(dataMonitorLine);
      }
    }
  });
});