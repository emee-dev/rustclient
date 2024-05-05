import axios, {
	AxiosHeaders,
	HeadersDefaults,
	AxiosRequestHeaders,
	RawAxiosRequestHeaders,
} from "axios";
import { useEffect, useState } from "react";

type RequestMethod = "GET" | "POST" | "PUT" | "OPTIONS" | "DELETE" | null;
type RequestBody = { [x: string]: any } | null;
type RequestHeaders = { [x: string]: any } | null;

interface RequestConfig {
	url: string;
	method: string;
	data: RequestBody;
	headers: RequestHeaders;
}
interface ResponseConfig {
	status: number;
	method: string;
	data: RequestBody;
	headers: RequestHeaders;
}

const useAxiosHttp = () => {
	const [isSendClicked, setIsSendClick] = useState<boolean>(false);
	const [request, setRequestConfig] = useState<RequestConfig>({
		url: "",
		method: "",
		data: null,
		headers: null,
	});

	const [responseConfig, setResponseConfig] = useState<ResponseConfig>({
		status: 0,
		data: null,
		method: "",
		headers: null,
	});

	const makeRequest = async (request: RequestConfig) => {
		try {
			let req = await axios({
				url: request.url,
				method: request.method,
				headers: request.headers as any,
				data: request.data,
			});

			// let responseData = await req.data;
			// let responseHeaders = await req.headers;
			// let responseStatus = await req.status;

			let response = await req.data;
			// return response;

			console.log({
				data: response,
				status: req.status,
				headers: req.headers,
				request: req.request,
				statusText: req.statusText,
				config: req.config,
			});
		} catch (err: any) {
			console.warn(err.message);
		}
	};

	useEffect(() => {
		if (isSendClicked) {
			makeRequest(request);
		}
	}, [isSendClicked]);

	return;
};

export default useAxiosHttp;
