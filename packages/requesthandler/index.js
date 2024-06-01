// Dependacies for this sidecar
// 1. Zod for stdIn input validation
// 2. Axios for http requests
// 3. Handlebars for env variables interporation
// const axios = require("axios").default;
import axios from "axios";

async function axiosRequestHandler() {
	// let instance = axios({})
	let req = await axios.get("https://pokeapi.co/api/v2/pokemon/ditto");
	console.log(req.data);
}

axiosRequestHandler();

function getRequest() {}
function postRequest() {}
function patchRequest() {}
function deleteRequest() {}
function putRequest() {}

// class RequestHandler extends SidecarHandler {
// 	url;
// 	query;
// 	method;
// 	params;
// 	headers;
// 	variables;

// 	constructor() {
// 		this._listen();
// 	}

// 	_stdIn(stream) {
// 		// let { url, method, query, params, headers, variables } = stream;

// 		stdInParser(stream);
// 	}

// 	_stdOut(data) {
// 		process.stdout.write(message);
// 	}

// 	_stdError(message) {
// 		process.stderr.write(message);
// 	}

// 	// _listen() {
// 	// 	process.stdin.on("data", (data) => {
// 	// 		try {
// 	// 			_stdIn(data);

// 	// 			return this._stdOut(JSON.parse(data).name);
// 	// 		} catch (error) {
// 	// 			return this._stdError(error);
// 	// 		}
// 	// 	});
// 	// }
// }

// class SidecarHandler {
// 	constructor() {
// 		_listen();
// 	}

// 	_stdIn(stream) {
// 		stdInParser(stream);
// 	}

// 	_stdOut(data) {
// 		process.stdout.write(message);
// 	}

// 	_stdError(message) {
// 		process.stderr.write(message);
// 	}

// 	_listen() {
// 		process.stdin.on("data", (data) => {
// 			try {
// 				_stdIn(data);

// 				return this._stdOut(JSON.parse(data).name);
// 			} catch (error) {
// 				return this._stdError(error);
// 			}
// 		});
// 	}
// }

// function decideRequestType(method) {}

function stdInParser(stream) {}

// new RequestHandler();
