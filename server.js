
var url = require("url");
var http = require("http");
var auth = require("./auth.js");

var appName = "configurations";

function start(router) {
	  function onRequest(request, response) {
		  var path = request.url;
		  var method = request.method;
		  var authHeader = request.headers['authorization']; 
		  
		  console.log("Authorization Header is: ", authHeader);
		  console.log("Request for " + method + " : " + path + " received.");
		  
		  if(!authHeader) { 
			  
			  // Send a 401 status to request authentication
			  response.statusCode = 401;
			  response.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
			 
			  response.end('<html><body>Please login</body></html>');
			  return;
		  } else if (authHeader) { 
			  
			  var tmp = authHeader.split(' '); 
			  
			  // Use a base64 buffer to convert the auth string
			  var buf = new Buffer(tmp[1], 'base64'); 
			  var plain_auth = buf.toString(); 
			   
			  // plain_auth = "username:password"
			  console.log("Decoded Authorization ", plain_auth);
			  			  			   
			  var creds = plain_auth.split(':');
			  var username = creds[0];
			  var password = creds[1];
			  
			  if (!auth.authenticate(username, password)) {
				  // Authentication failed - request it again
				  response.statusCode = 401;
				  response.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
				  response.end('<html><body>Invalid login info.  Please try again.</body></html>');	
				  return;
			  }
		  
		  }
		  
		  // Get the initial path member to determine if this is a call that we need to handle
		  var application = "";
		  var paths = url.parse(path).pathname.split("/");
		  if (paths.length > 1) {
			  application = paths[1];
		  }
			  
		  if (application == appName) {
			  // Route the request to the proper handler
			  router(request, response);
		  } else {
			  console.log("Invalid request received");
			  
			  response.writeHead(200, {"Content-Type": "text/plain"});
			  response.write("Invalid request received.");
			  response.end();
		  }
	  }

	  http.createServer(onRequest).listen(8888);
	  console.log("Server has started.");
}



exports.start = start;

