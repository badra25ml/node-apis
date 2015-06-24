var fs = require("fs"),
   http = require("http"),
   request = require('request'),
   url = require('url'),
   exec = require("child_process").exec;

http.createServer(responseHandler).listen(process.env.PORT || 8888);

function responseHandler(req, res) {
 var md5 = require('MD5');
 res.writeHead(200, {"Content-Type": "text/html"});
 if (req.url === "/") {
   res.end();
 } else if (req.url.match("/gravatar/")) {
   var hash = "";
   hash = md5(req.url.match(/gravatar\/(.*)/)[1]);
   res.write("http://www.gravatar.com/avatar/" + hash);
 } else if (req.url.match("/Calc/")) {
   var evaluation = eval(req.url.match(/Calc\/(.*)/)[1]);
   res.write(evaluation.toString());
 } else if(req.url.match("Counts")){
   var letters = (req.url.match(/Counts\/(.*)/)[1]).length;
   var words = (req.url).split(" ").length;
   res.write("Letters = "+ letters + "; words = " + words);
 }
 res.end();
}
