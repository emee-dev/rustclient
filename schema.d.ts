interface File {}

interface Meta {
	url: string;
	method: string;
}

interface Headers {
	[key: string]: string;
}

interface BasicAuth {
	username: string;
	password: string;
}

interface BearerAuth {
	token: string;
}

interface DigestAuth {
	username: string;
	password: string;
}

interface AwsV4Auth {
	accessKeyId: string;
	secretAccessKey: string;
	sessionToken: string;
	service: string;
	region: string;
	profileName: string;
}

interface OAuth2Auth {
	grant_type: string; // Depending on the grant_type the field changes, grant_type is dynamic
	callback_url: string;
	authorization_url: string;
	access_token_url: string;
	client_id: string;
	client_secret: string;
	scope: string;
	pkce: boolean;
}

type Xml = string;
type Json = string;
type TEXT = string;
type Multipart_Form = string;
type Form_Urlencoded = { [x: string]: string };

type Content = {
	content: Xml | Json | TEXT | Multipart_Form | Form_Urlencoded;
};

interface Body {
	json?: Content;
	xml?: Content;
	text?: Content;
	"multipart-form"?: Content;
	"form-urlencoded"?: Content;
}

interface Script {
	"before-request"?: { content: string };
	"after-response"?: { content: string };
}

interface Docs {
	content: string;
}

interface Config {
	file: {
		name: string;
		type: string;
		sequence: number;
	};
	meta: Meta;
	headers: Headers;
	auth?: {
		basic?: BasicAuth;
		bearer?: BearerAuth;
		digest?: DigestAuth;
		awsv4?: AwsV4Auth;
		oauth2?: OAuth2Auth;
	};
	body?: Body;
	script?: Script;
	docs: Docs;
}

// Example usage:
const config: Config = {
	file: {
		name: "get all users",
		type: "http",
		sequence: 1,
	},
	meta: {
		url: "https://echo.free.beeceptor.com",
		method: "post",
	},
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json",
	},
	auth: {
		oauth2: {
			grant_type: "authorization_code",
			callback_url: "callback",
			authorization_url: "authori",
			access_token_url: "access",
			client_id: "id",
			client_secret: "secre",
			scope: "scioe",
			pkce: false,
		},
	},
	body: {
		json: {
			content: `{
        "name": "emee"
      }`,
		},
	},
	script: {
		"before-request": {
			content: `console.log(res.body.name);`,
		},
		"after-response": {
			content: `console.log(res.body.name);`,
		},
	},
	docs: {
		content: `Hello this is a sample documentation preview page..
      **Bold** text for a markdown documentation page`,
	},
};
