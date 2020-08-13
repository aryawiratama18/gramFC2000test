const serialport = require("serialport");

serialport.list((err, ports) => {
  console.log("ports", ports);
  let port = new serialport(ports[0].comName, {
    baudRate: 9600,
  });
  let dataArr = [];
  let autoscroll = document.getElementById("autoscroll");

  // Kondisi awal portnya tertutup
  port.close((err) => {
    console.log("Port Closed", err);
  });

  // Connection button
  let connButton = document.querySelector("#conn-button");
  connButton.addEventListener("click", () => {
    if (connButton.innerHTML === "Connect") {
      connButton.innerHTML = "Disconnect";
      if (ports.length === 0) {
        console.log("No ports discovered");
      }
      port.open(() => {
        console.clear(); // Membersihkan console
        port.on("data", (data) => {
          let dataSerial = data.toString("utf-8");
          let dataMonitorContainer = document.getElementById("serial-data");
          let dataMonitorLine = document.createElement("div");

          dataArr.push(dataSerial);
          console.log(dataArr);

          let lastArr = dataArr.slice(-1).pop();
          let dateAndData = dateTimeStamp() + "  " + lastArr;
          let dataDisplayed = document.createTextNode(dateAndData);

          // if autoscroll checkbox is checked
          if (autoscroll.checked == true) {
            if (dataArr.length > 20) {
              dataMonitorLine.appendChild(dataDisplayed);
              dataMonitorContainer
                .appendChild(dataMonitorLine)
                .scrollIntoView();
            } else if (dataArr.length > 0) {
              let lastArr = dataArr.slice(-1).pop();
              dateAndData = dateTimeStamp() + "  " + lastArr;
              dataDisplayed = document.createTextNode(dateAndData);
              dataMonitorLine.appendChild(dataDisplayed);
              dataMonitorContainer.appendChild(dataMonitorLine);
            } else {
              dataMonitorLine.innerHTML =
                dateTimeStamp() + "  " + "No incoming data";
              dataMonitorContainer.appendChild(dataMonitorLine);
            }
          } else {
            if (dataArr.length > 20) {
              let lastArr = dataArr.slice(-1).pop();
              dateAndData = dateTimeStamp() + "  " + lastArr;
              dataDisplayed = document.createTextNode(dateAndData);
              dataMonitorLine.appendChild(dataDisplayed);
              dataMonitorContainer.appendChild(dataMonitorLine);
            } else if (dataArr.length > 0) {
              let lastArr = dataArr.slice(-1).pop();
              dateAndData = dateTimeStamp() + "  " + lastArr;
              dataDisplayed = document.createTextNode(dateAndData);
              dataMonitorLine.appendChild(dataDisplayed);
              dataMonitorContainer.appendChild(dataMonitorLine);
            } else {
              dataMonitorLine.innerHTML =
                dateTimeStamp() + "  " + "No incoming data";
              dataMonitorContainer.appendChild(dataMonitorLine);
            }
          }
        });
      });
    } else {
      port.close((err) => {
        console.log("Port Closed", err);
      });
      connButton.innerHTML = "Connect";
    }
  });
});

// Dropdown Baudrate
let dropdownButton = document.querySelector(".dropbtn");
dropdownButton.addEventListener("click", function () {
  document.getElementById("baudRateMenu").classList.toggle("show");
});

// Close the dropdown if the user clicks outside of it
window.onclick = function (e) {
  if (!e.target.matches(".dropbtn")) {
    var myDropdown = document.getElementById("baudRateMenu");
    if (myDropdown.classList.contains("show")) {
      myDropdown.classList.remove("show");
    }
  }
};

const baudRateMenu = document.getElementById("baudRateMenu");
baudRateMenu.addEventListener("click", function (e) {
  if (e.target.className == "baud") {
    document.getElementById("baud").forEach(function (b) {
      if (b.classList.contains("active")) {
        baudRateValue = b.innerHTML;
      } else {
        b.target.classList.add("active");
        baudRateValue = b.innerHTML;
      }
    });
  }
});

// Date
function dateTimeStamp() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();

  today = dd + "/" + mm + "/" + yyyy;
  return today;
}
