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

		//console.log(queryObject);

		var x = queryObject.mx;
		var y = queryObject.my;
		var button = queryObject.mb;
		
		var key = queryObject.kp;
		var keyDirection = queryObject.kd;

		if (x && y) {
			robot.moveMouse(x, y);
			response.end("{}");
		}
		else if(button)
		{
			robot.mouseClick(button);
			response.end("{}");
			//console.log(button);
		}
		
		else if(key)
		{
			robot.keyToggle(key, "down");
			console.log(key);
			robot.keyToggle(key, "up");
			response.end("{}");
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