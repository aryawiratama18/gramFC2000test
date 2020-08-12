var http = require("http");
var url = require("url");

exports.startserver = (route, handle) => {
  function onRequest(request, response) {
    var serialMonitor = "";
    var pathname = url.parse(request.url).pathname;
    console.log("Request received for " + pathname);
    request.setEncoding("utf8");

    route(handle, pathname, response);
  }
  http.createServer(onRequest).listen(3000);
  console.log("Server started on localhost port 3000");
};
