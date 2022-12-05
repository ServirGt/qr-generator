import React from 'react';
import { useState, useEffect, useRef } from "react";
import {
	Button,
	ButtonGroup,
	// Form,
	// Field,
	Input,
	InputGroup,
	InputLeftAddon,
	InputLeftElement,
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
  } from '@chakra-ui/react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import html2canvas from 'html2canvas';
import logo from './logo.svg';
import './App.css';

function qr2(){
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

function vcard(name, surname, organization, position, email, phone1, phone2){
	let vc2 = "BEGIN:VCARD"
	let vc3 = `N:${surname};${name}`
	let vc4 = `FN:${name} ${surname}`
	let vc5 = `ORG:${organization}`
	let vc6 = `TITLE:${position}`
	let vc7 = "ADR:;;2a Calle 9-15;Zona 10;CA;Edificio Mira Of. 101;Guatemala, Guatemala"
	let vc8 = `TEL;WORK;VOICE:+502 ${phone1}`
	let vc9 = `TEL;CELL:+502 ${phone2}`
	let vc10 = "TEL;MAIN:+502 23795303"
	let vc11 = `EMAIL;WORK;INTERNET:${email}`
	let vc12 = "URL:https://cendis.com.gt"
	let vc13 = "END:VCARD"
	let vc14 = "dark=001E61"

	let vc = vc2 + "\n" + vc3 + "\n" + vc4 + "\n" + vc5 + "\n" + vc6 + "\n" + vc7 + "\n" + vc8 + "\n" + vc9 + "\n" + vc10 + "\n" + vc11 + "\n" + vc12 + "\n" + vc13

	// console.log(vc3)
	// console.log(vc)

	console.log(encodeURIComponent(vc))
	return "https://quickchart.io/qr?text=" + encodeURIComponent(vc) + "&" + vc14

}

const App = () => {
	const printRef = useRef();
	const [url, setUrl] = useState(false);
	const [qr, setQr] = useState("");

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


	function validateName(value) {
		let error
		if (!value) {
			error = 'Este campo es requerido'
		} // else if (value.toLowerCase() !== 'naruto') {
		// 	error = "Jeez! You're not a fan 😱"
		// }
		return error
	}

	

	
	return (
	<div className="App">
		{/* <header className="App-header">
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
		</header> */}

		<Formik
			initialValues={{ name: '' }}
			onSubmit={(values, actions) => {
				setTimeout(() => {
					alert(JSON.stringify(values, null, 2))
					setQr(vcard(values.name, values.surname, values.organization, values.position, values.email, values.phone, values.phone2))
					actions.setSubmitting(false)
					setUrl(true)
				}, 1000)
			}}
		>
			{(props) => (
				<Form>
					<Field name='name' validate={validateName}>
						{({ field, form }) => (
						<FormControl isInvalid={form.errors.name && form.touched.name}>
							<FormLabel>Nombre</FormLabel>
							<Input {...field} placeholder='Nombre' />
							<FormErrorMessage>{form.errors.name}</FormErrorMessage>
						</FormControl>
						)}
					</Field>

					<Field name='surname' validate={validateName}>
						{({ field, form }) => (
						<FormControl isInvalid={form.errors.name && form.touched.name}>
							<FormLabel>Apellido</FormLabel>
							<Input {...field} placeholder='Apellido' />
							<FormErrorMessage>{form.errors.name}</FormErrorMessage>
						</FormControl>
						)}
					</Field>

					<Field name='organization' validate={validateName}>
						{({ field, form }) => (
						<FormControl isInvalid={form.errors.name && form.touched.name}>
							<FormLabel>Organización</FormLabel>
							<Input {...field} placeholder='Cendis/Servir' />
							<FormErrorMessage>{form.errors.name}</FormErrorMessage>
						</FormControl>
						)}
					</Field>

					<Field name='position' validate={validateName}>
						{({ field, form }) => (
						<FormControl isInvalid={form.errors.name && form.touched.name}>
							<FormLabel>Cargo</FormLabel>
							<Input {...field} placeholder='Cargo dentro la empresa' />
							<FormErrorMessage>{form.errors.name}</FormErrorMessage>
						</FormControl>
						)}
					</Field>

					<Field name='email' validate={validateName}>
						{({ field, form }) => (
						<FormControl isInvalid={form.errors.name && form.touched.name}>
							<FormLabel>Email</FormLabel>
							<Input {...field} placeholder='Correo electrónico' />
							<FormErrorMessage>{form.errors.name}</FormErrorMessage>
						</FormControl>
						)}
					</Field>

					<Field name='phone' validate={validateName}>
						{({ field, form }) => (
						<FormControl isInvalid={form.errors.name && form.touched.name}>
							<FormLabel>Teléfono</FormLabel>
							{/* <Input {...field} placeholder='Teléfono principal' /> */}
							<InputGroup>
								<InputLeftAddon children='+502' />
								<Input {...field} placeholder='Teléfono principal'  type='tel' />
							</InputGroup>
							<FormErrorMessage>{form.errors.name}</FormErrorMessage>
						</FormControl>
						)}
					</Field>

					<Field name='phone2' validate={validateName}>
						{({ field, form }) => (
						<FormControl isInvalid={form.errors.name && form.touched.name}>
							<FormLabel>Teléfono 2</FormLabel>
							{/* <Input {...field} placeholder='Teléfono principal' /> */}
							<InputGroup>
								<InputLeftAddon children='+502' />
								<Input {...field} placeholder='Teléfono trabajo'  type='tel' />
							</InputGroup>
							<FormErrorMessage>{form.errors.name}</FormErrorMessage>
						</FormControl>
						)}
					</Field>

					<Button
						mt={4}
						colorScheme='teal'
						isLoading={props.isSubmitting}
						type='submit'
					>
						Generar QR
					</Button>
				</Form>
			)}
		</Formik>

		{
			url ? 
				<>
					<div ref={printRef}>
						<p>Hello</p>
						<img src={qr} />
						<p>Test</p>
					</div>
					<Button type="button" onClick={handleDownloadImage}>
						Descargar
					</Button>
				</>
			: <></>
		}

		{/* <div ref={printRef}>
			<p>Hello</p>
			<img src={qrCode} />
			<p>Test</p>
		</div> */}

		{/* <Button type="button" onClick={handleDownloadImage}>
        	Descargar
      	</Button> */}
	</div>
  );
}

export default App;
