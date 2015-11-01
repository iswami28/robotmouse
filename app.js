var http = require('http');
var robot = require('robotjs');
var url = require('url');

var PORT = 8080;

//all requests route through here
function handleRequest(request, response) {
	response.writeHead(200, { 
		'Content-type': 'application/json',  
		'Access-control-allow-origin': '*'
		});

	if (url.parse(request.url).pathname == '/') {
		var queryObject = url.parse(request.url, true).query;

		var x = queryObject.mx;
		var y = queryObject.my;
		var button = queryObject.mb;
		var state = queryObject.mp;

		if (x && y) {
			robot.moveMouse(x, y);
			response.end("{}");
		}
		else if(button && state)
		{
			robot.mouseToggle(state, button);
			response.end("{}");
			console.log(button, state);
		}
		else {
			response.end(JSON.stringify(robot.getScreenSize()));
			console.log(robot.getScreenSize());
		}
	}

	

}

var server = http.createServer(handleRequest);

server.listen(PORT, function () {
	console.log("Server started on port" + PORT)
})