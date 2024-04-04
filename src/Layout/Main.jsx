import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";

const Main = () => {	
	return (
		<div>
			<Outlet></Outlet>
			<ScrollToTop />
		</div>
	);
};

export default Main;
