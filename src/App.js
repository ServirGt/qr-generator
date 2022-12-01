import React from 'react';
import { useState, useEffect, useRef } from "react";
import html2canvas from 'html2canvas';
import logo from './logo.svg';
import './App.css';

function qr(){
	let vc2 = "BEGIN:VCARD"
	let vc3 = "N:Heinemann;Rodolfodd"
	let vc4 = "FN:Rodolfo Heinemann"
	let vc5 = "ORG:CENDIS"
	let vc6 = "TITLE:Director General"
	let vc7 = "ADR:;;2a Calle 9-15;Zona 10;CA;Edificio Mira Of. 101;Guatemala, Guatemala"
	let vc8 = "TEL;WORK;VOICE:+502 23795300"
	let vc9 = "TEL;CELL:+502 54035000"
	let vc10 = "TEL;MAIN:+502 23795303"
	let vc11 = "EMAIL;WORK;INTERNET:rodolfoh@centrodistribuidor.com"
	let vc12 = "URL:https://cendis.com.gt"
	let vc13 = "END:VCARD"
	let vc14 = "dark=001E61"

	let vc = vc2 + "\n" + vc3 + "\n" + vc4 + "\n" + vc5 + "\n" + vc6 + "\n" + vc7 + "\n" + vc8 + "\n" + vc9 + "\n" + vc10 + "\n" + vc11 + "\n" + vc12 + "\n" + vc13

	console.log(vc)

	console.log(encodeURIComponent(vc))
	return "https://quickchart.io/qr?text=" + encodeURIComponent(vc) + "&" + vc14

}

const App = () => {
	const printRef = useRef();
	let qrCode = qr()
	const handleDownloadImage = async () => {
		const element = printRef.current;
		const canvas = await html2canvas(element,  { useCORS: true });
	
		const data = canvas.toDataURL('image/jpg');
		const link = document.createElement('a');
	
		if (typeof link.download === 'string') {
			link.href = data;
			link.download = 'image.jpg';
	
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		} else {
			window.open(data);
		}
	  };

	

	
	return (
	<div className="App">
		<header className="App-header">
		<img src={logo} className="App-logo" alt="logo" />
		<p>
			Edit <code>src/App.js</code> and save to reload. 
		</p>
		<a
			className="App-link"
			href="https://reactjs.org"
			target="_blank"
			rel="noopener noreferrer"
		>
			Learn React
		</a>
		</header>

		<div ref={printRef}>
			<p>Hello</p>
			<img src={qrCode} />
			<p>Test</p>
		</div>

		<button type="button" onClick={handleDownloadImage}>
        	Download as Image
      	</button>
	</div>
  );
}

export default App;
