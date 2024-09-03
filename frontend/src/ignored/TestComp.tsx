import React from "react";
import ReactDOM from "react-dom/client"; // Import from 'react-dom/client' instead of 'react-dom'

const cat = "cat";
console.log(cat);

const TestComp = () => {
	const msg = "Test Message from Quokka!";
	console.log(msg); // This should be visible in Quokka

	return <div>{msg}</div>;
};

//fetch data from pokemon api
fetch("https://pokeapi.co/api/v2/pokemon/ditto")
	.then((response) => response.json())
	.then((data) => {
		console.log(data);
	});

// Force the component to render using the new createRoot API
const root = ReactDOM.createRoot(document.createElement("div"));
root.render(<TestComp />);

export default TestComp;
