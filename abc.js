// Dependacies for this sidecar
// 1. Axios for http requests
// 2. Handlebars for env variables interporation

function getRequest() {}
function postRequest() {}
function patchRequest() {}
function deleteRequest() {}
function putRequest() {}

class RequestHandler {
	constructor(url, method, query, params, headers, variables) {
		this.url = url;
		this.query = query;
		this.method = method;
		this.params = params;
		this.headers = headers;
		this.variables = variables;
	}

	sendOutput(data) {
		process.stdout.write(message);
	}

	sendError(message) {}

	listen() {
		process.stdin.on("data", (data) => {
			// data = data.toString().toUpperCase();
			// process.stdout.write(data + "\n");
			stdInParser(data);

			this.sendOutput(JSON.parse(data).name);
		});
	}
}

function decideRequestType(stream) {}

function stdInParser(stream) {}
