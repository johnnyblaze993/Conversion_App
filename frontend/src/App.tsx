import "./App.css";
import axios from "axios";
import Digimon from "../Interfaces/DigimonInterface";
import { useState } from "react";
import React from "react";

function App() {
	const [digimons, setDigimons] = useState<Digimon[]>([]);

	const fetchDigimons = () => {
		axios.get("http://localhost:8081/digimon").then((response) => {
			setDigimons(response.data);
		});
	};

	return (
		<>
			<h2>Digi app!!!</h2>
			<button onClick={fetchDigimons}>Load Digimons</button>
			<div style={{ display: "flex", flexWrap: "wrap" }}>
				{digimons.map((digimon) => (
					<div
						key={digimon.id}
						style={{
							border: "1px solid black",
							margin: "10px",
							padding: "10px",
							width: "200px",
							borderRadius: "10px",
						}}
					>
						<h3>{digimon.name}</h3>
						<p>Type: {digimon.type}</p>
						<p>Number: {digimon.digimonNumber}</p>
					</div>
				))}
			</div>
		</>
	);
}

export default App;
