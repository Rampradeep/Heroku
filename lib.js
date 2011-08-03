var sys = require("sys"),
http = require("http"),
url = require("url"),
path = require("path"),
fs = require("fs"),
events = require("events");

var lib1 = exports;
var my_client = http.createClient(80, "www.google.com");
lib1.my_event_emitter = new events.EventEmitter();

lib1.get_haproxy_status = function get_haproxy_status()
{
        var request = my_client.request("GET", "/" , {"host": "api.developer.sears.com"} );
	sys.puts("Calling sears")
        request.addListener('response', function(response) {
                var body = "";
		sys.puts("body" + body);
                response.addListener('data', function(data) {
	                body += data;
			sys.puts("body" + body);
        	});
	        response.addListener('end' , function() {
			sys.puts("end" + body);
	//		setTimeout(get_haproxy_status,5000);
			lib1.my_event_emitter.emit("status", body);
	        });
                response.addListener('close' , function(data) {
                        sys.puts("end" + body);
        //                setTimeout(get_haproxy_status,5000);
                        lib1.my_event_emitter.emit("status", body);
                });
	}
	);
	request.end();
}


