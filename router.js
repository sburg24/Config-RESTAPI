
var url = require("url");
var qs = require('querystring');
var controller = require("./controller.js");


function route(request, response) {
	console.log("Routing request for " + request.url);
  
	var path = url.parse(request.url).pathname;
	var parms = url.parse(request.url, true).query;
	var method = request.method;
	var body = "";
	var res = "";
	
	
	if (method == "GET") {
		// Check for logout
		var paths = url.parse(request.url).pathname.split("/");
		if (paths.length > 2) {
			if (paths[2] == "logout") {
				response.writeHead(401, {"Content-Type": "aplication/json"});
				response.write("{'status':'success', 'message':'Logged-out'}");
				response.end();
				return;
			}
		}
		
		// Dispatch to the GET controller
		res = controller.get(parms, function(err, data) {
			response.writeHead(200, {"Content-Type": "aplication/json"});
			if (err) {
				console.log("ERROR: ", err);
				response.write("{'status':'error'}");
			} else {
				console.log("Got the data: ", data);
				response.write(data);
			}
			
			response.end();
			return;
		});
		
	} else if (method == "DELETE") {
		var name = "";
		var paths = url.parse(request.url).pathname.split("/");
		if (paths.length > 2) {
			name = paths[2];
			console.log("Delete: ", name);
		} else {
			console.log("Delete: no record specified");
			response.writeHead(200, {"Content-Type": "aplication/json"});
			response.write("{'status':'error', 'message':'Delete: no record specified'}");
			response.end();

			return;
		}
		
		// Dispatch to the DELETE controller
		res = controller.remove(name, function(err, data) {
			response.writeHead(200, {"Content-Type": "aplication/json"});
			if (err) {
				console.log("ERROR: ", err);
				response.write("{'status':'error'}");
			} else {
				console.log("Record deleted.");
				response.write("{'status':'success'}");
			}
	
			response.end();
			return;
		});
		
	} else if (method == "POST") {
		// Extract the POSTed data
		request.on('data', function(chunk) {
			body += chunk;
		});
		request.on('end', function() {
			console.log('POSTed: ' + body);
			
			// We have all of the POSTed data, so dispatch to the POST controller
			res = controller.insert(qs.parse(body), function(err, data) {
				response.writeHead(200, {"Content-Type": "aplication/json"});
				if (err) {
					console.log("ERROR: ", err);
					response.write("{'status':'error', 'message':" + err + "}");
				} else {
					console.log("Record inserted.");
					response.write("{'status':'success'}");
				}

				response.end();
				return;
			});
		});
		
	} else {
		console.log("Invalid method received: " + method);
		response.writeHead(200, {"Content-Type": "aplication/json"});
		response.write("{'status':'error', 'message':'Invalid method received'}");
		response.end();
	}
	

}



exports.route = route;

