var fs = require("fs");
var querystring = require("querystring");

exports.dbscript = (response) => {
  console.log("Executing database script...");
  response.writeHead(200, { "Content-Type": "text/js" });
  fs.readFile("./database.js", null, (error, data) => {
    if (error) {
      response.writeHead(404);
      response.write("File not found");
    } else {
      response.write(data);
    }
    response.end();
  });
};

exports.titlebar = (response) => {
  console.log("Executing titlebar script...");
  response.writeHead(200, { "Content-Type": "text/js" });
  fs.readFile("./titlebar.js", null, (error, data) => {
    if (error) {
      response.writeHead(404);
      response.write("File not found");
    } else {
      response.write(data);
    }
    response.end();
  });
};

exports.serial = (response) => {
  console.log("Executing serial monitor script...");
  response.writeHead(200, { "Content-Type": "text/js" });
  fs.readFile("./serial.js", null, (error, data) => {
    if (error) {
      response.writeHead(404);
      response.write("File not found");
    } else {
      response.write(data);
    }
    response.end();
  });
};

exports.style = (response) => {
  console.log("Executing styling...");
  response.writeHead(200, { "Content-Type": "text/css" });
  fs.readFile("./style.css", null, (error, data) => {
    if (error) {
      response.writeHead(404);
      response.write("File not found");
    } else {
      response.write(data);
    }
    response.end();
  });
};

exports.mainMenu = (response) => {
  console.log("Executing main menu page...");
  response.writeHead(200, { "Content-Type": "text/html" });
  fs.readFile("./mainMenu.html", null, (error, data) => {
    if (error) {
      response.writeHead(404);
      response.write("File not found");
    } else {
      response.write(data);
    }
    response.end();
  });
};

exports.serialMonitor = (response) => {
  console.log("Executing serial monitor page...");
  response.writeHead(200, { "Content-Type": "text/html" });
  fs.readFile("./serialMonitor.html", null, (error, data) => {
    if (error) {
      response.writeHead(404);
      response.write("File not found");
    } else {
      response.write(data);
    }
    response.end();
  });
};

exports.database = (response) => {
  console.log("Executing database page...");
  response.writeHead(200, { "Content-Type": "text/html" });
  fs.readFile("./dbSetting.html", null, (error, data) => {
    if (error) {
      response.writeHead(404);
      response.write("File not found");
    } else {
      response.write(data);
    }
    response.end();
  });
};
