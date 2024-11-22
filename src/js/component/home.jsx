import React, {useState, useEffect} from "react";


//create your first component
const Home = () => {
	// State for Traffic Light car, pedestrian and pedestrian timer
	const [activeLightCar, setActiveLightCar] = useState(0)
	const [activeLightWalker, setActiveLightWalker] = useState(0)
	const [activeCountdownPedestrian, setActiveCountdownPedestrian ] = useState(10)
	// Object with values for the traffic car light
	const lightCar = [
		{colour: "red", className:"bg-danger", blur: "add-blur-red"},
		{colour: "yellow", className:"bg-warning", blur: "add-blur-yellow"},
		{colour: "green", className: "bg-success", blur: "add-blur-green"}
	]

	// Set ilumination for only one car light
	function iluminateCar(colour) {
		setActiveLightCar(colour)
	}

	// Object with values for the traffic pedestrian light
	const lightWalker = [
		{colour: "red", className:"bg-danger", blur: "add-blur-red", symbol: "fa-solid fa-person", content: ""},
		{colour: "green", className: "bg-success", blur: "add-blur-green", symbol:"fa-solid fa-person-walking", content: ""},
		{colour: "yellow", className: "bg-warning", blur: "add-blur-yellow", symbol:"", content: `${activeCountdownPedestrian < 10 ? "0" + activeCountdownPedestrian : activeCountdownPedestrian}`}
	]

	// Set ilumination for only one pedestrian light
	function iluminateWalker(colour) {
		setActiveLightWalker(colour)
		console.log(colour)
	}

	// Start traffic light on reload
	useEffect(() => {
		setActiveLightCar("green")
		setActiveLightWalker("red")
		console.log("im working once")
	}, [])

	// Pedestrian button
	let trafficLightButtonClicked = false
	function trafficLightButton() {
		if (!trafficLightButtonClicked){
			trafficLightButtonClicked = true
			setTimeout(() => {
				setActiveLightCar("yellow")
			}, 5000);
			setTimeout(() => {
				setActiveLightCar("red")
				setActiveLightWalker("green")
				startPedestrianCountDown()
			}, 6000);
			setTimeout(() => {
				setActiveLightWalker("yellow")
			}, 13000)
			setTimeout(() => {
				setActiveLightCar("green")
				setActiveLightWalker("red")
				trafficLightButtonClicked = false
			}, 17000)

		}
	}

	// Pedestrian Countdown Function
	function startPedestrianCountDown() {
		let counter = 10;
		const countdownInterval = setInterval(() => {
			if (counter > 0) {
				counter--;
				
				setActiveCountdownPedestrian(counter);
			} else {
				setActiveCountdownPedestrian(10)
				clearInterval(countdownInterval);
			}
		}, 1000);
	}

	return (
		<>
		<div className="position-absolute bottom-0 end-0 me-3" >
			<div className="d-flex flex-column bg-dark rounded-2">
				{lightCar.map((lightCar) => (
					<span 
					className={`
						mx-auto my-2 p-4 dot-${lightCar.colour} 
						${activeLightCar === lightCar.colour ? lightCar.className : ""} 
						${activeLightCar === lightCar.colour ? lightCar.blur : ""}
					`}
					onClick={()=> iluminateCar(lightCar.colour)}>
					</span>
				))}
			</div>
			<div className="d-flex flex-column bg-dark rounded-2 mt-5">
				{lightWalker.map((lightWalker) => (
				<span
				className={`
					mx-auto my-1 rounded-5 p-3 walker-${lightWalker.colour}
					${activeLightWalker === lightWalker.colour ? lightWalker.className : ""}
					${activeLightWalker === lightWalker.colour ? lightWalker.blur : ""}
					${lightWalker.colour === "yellow" ? "text-warning bg-dark fs-5" : ""}
				`}
				onClick={()=> iluminateWalker(lightWalker.colour)}
				><i className={`${lightWalker.colour === "red" || lightWalker.colour === "green" ?  `${lightWalker.symbol} fa-2x fs-4` : ""} `}></i> {lightWalker.content}</span>
				))}
			</div>

			<div className="pole-line"></div>

			<div className="d-flex flex-column bg-dark rounded-2 mt-5 text-center">
				<span className="text-white mx-2 mt-2">Press me</span>
				<span className="text-white mx-2">to cross</span>
				<button className="mx-auto my-3 dot-button p-3" onClick={trafficLightButton}></button>
			</div>
		</div>
		</>
	);
};

export default Home;
