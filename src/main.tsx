import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";
import "@fontsource-variable/roboto-flex";
import "@fontsource/fira-mono/400.css";
import "@fontsource/fira-mono/500.css";
import "@fontsource/fira-mono/700.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

/*
	<BrowserRouter> 
		<App />
	</BrowserRouter> 

*/
