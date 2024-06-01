import { useEffect, useState } from "react";
type ParsedUrl = {
	protocol: string;
	hostname: string;
	path: string;
	query: {
		[x: string]: string;
	};
	fragment: string;
};

/* 
https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=SYD&destinationLocationCode=BKK&departureDate=2024-02-25&adults=1&nonStop=false&max=250

https -> green
:// -> gray
test.api.amadeus.com -> blue
/v2/shopping/flight-offers -> skyblue
symbols such as `?=&` ->  
*/

function parseURL(url: string) {
	const urlRegex = /^(https?):\/\/([^/]+)(\/[^?]*)(\?[^#]*)?(#.*)?$/;
	const match = url.match(urlRegex);

	if (!match) {
		console.error("Invalid URL");
		return;
	}

	const [, protocol, hostname, path, query, fragment] = match;
	const queryParameters = new URLSearchParams(query || "");

	return {
		protocol,
		hostname,
		path,
		query: Object.fromEntries(queryParameters.entries()),
		fragment,
	};
}

const url =
	"https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=SYD&destinationLocationCode=BKK&departureDate=2024-02-25&adults=1&nonStop=false&max=250";
const parsedURL = parseURL(url);

if (parsedURL) {
	console.log(parsedURL);
} else {
	console.error("Unable to parse URL");
}

const useParseUrl = () => {
	const [url, setUrl] = useState<string>("");
	const [parsedUrl, setParsedUrl] = useState<ParsedUrl | null>(null);

	useEffect(() => {
		let newUrl = parseURL(url);

		if (newUrl) {
			setParsedUrl(newUrl);
		}
	}, [url]);

	return [parsedUrl, setUrl] as const;
};

export default useParseUrl;
