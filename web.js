var sys = require("sys"),
http = require("http"),
url = require("url"), 
path = require("path"),  
fs = require("fs"),  
events = require("events"),
lib1 = require("./lib.js") ;
/*http.createServer(function(request, response) {  
	response.writeHead(200, {"Content-Type": "text/html"});
	response.write("Hello World");
	response.end();
}).listen(8080); */


var event_emitter = new events.EventEmitter();


http.createServer(function(request, response) {
	sys.puts("Entering" );
	lib1.get_haproxy_status();	
        lib1.my_event_emitter.addListener("status", function(status1) {
		sys.puts("Got an event");
                response.writeHead(200, { "Content-Type" : "text/html" });
                response.write(status1);
		response.end();
        }
  
        );
}).listen(8080);

