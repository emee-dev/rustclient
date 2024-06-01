import Dashboard from "./components/Dashboard";
import { Routes, Route } from "react-router-dom";

function MainRoutes() {
	return (
		<Routes>
			<Route path="/" element={<Dashboard />}></Route>
			<Route path="*" element={<> Page Not Found</>}></Route>
		</Routes>
	);
}

export default MainRoutes;
