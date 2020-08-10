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
    let dateAndData = dateTimeStamp() + '  ' + lastArr;
    let dataDisplayed = document.createTextNode(dateAndData);

    // if autoscroll checkbox is checked
    if (autoscroll.checked == true) {
      if (dataArr.length > 20) {
        dataMonitorLine.appendChild(dataDisplayed);
        dataMonitorContainer.appendChild(dataMonitorLine).scrollIntoView();

      } else if (dataArr.length > 0) {
        let lastArr = dataArr.slice(-1).pop();
        dateAndData = dateTimeStamp() + '  ' + lastArr;
        dataDisplayed = document.createTextNode(dateAndData);
        dataMonitorLine.appendChild(dataDisplayed);
        dataMonitorContainer.appendChild(dataMonitorLine);
      } else {
        dataMonitorLine.innerHTML = dateTimeStamp() + '  ' + "No incoming data";
        dataMonitorContainer.appendChild(dataMonitorLine);
      }
    } else {
      if (dataArr.length > 20) {
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

function dateTimeStamp() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = dd + '/' + mm + '/' + yyyy;
  return today;
}