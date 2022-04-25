import React from "react";
import Longevity from "./Longevity/Longevity";
import Navigation from "./Navbar/Navigation";
import "./Global.css";
function App() {
	return (
		<React.Fragment>
			<Navigation />
			<Longevity />
		</React.Fragment>
	);
}

export default App;
