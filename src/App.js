import React from 'react';
import { useState, useRef, useEffect } from "react";
import {
	Button,
	Container,
	VStack,
	HStack,
	Stack,
	Input,
	InputGroup,
	InputLeftAddon,
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalFooter,
	ModalBody,
	ModalCloseButton,
	FormControl,
	FormLabel,
	FormErrorMessage,
	useDisclosure,
	Text,
	Heading,
	Select,
	Icon,
	VisuallyHidden
  } from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import html2canvas from 'html2canvas';
import { MdEmail, MdOutlinePhoneIphone, MdLocalPhone } from 'react-icons/md'
import logoCendis from './logoCendis.png'
import logoServir from './logoServir.png'
import './App.css';
import styles from './App.css';





function vcard(name, surname, organization, position, address, email, phone1, phone2){
	let vc2 = "BEGIN:VCARD"
	let vc3 = `N:${surname};${name}`
	let vc4 = `FN:${name} ${surname}`
	let vc5 = `ORG:${organization}`
	let vc6 = `TITLE:${position}`
	let vc7 = ''
	if (address === 'Mira'){
		vc7 = "ADR:;;2a Calle 9-15;Zona 10;CA;Edificio Mira Of. 101;Guatemala, Guatemala"
	} else if (address === 'Granat'){
		vc7 = "ADR:;;Ruta 4, 6-32;Zona 4;CA;Edificio Granat Of. 604;Guatemala, Guatemala"
	} else {
		vc7 = "ADR:;;Ruta 5, 1-40;Zona 4;Guatemala, Guatemala"
	}
	// let vc7 = "ADR:;;2a Calle 9-15;Zona 10;CA;Edificio Mira Of. 101;Guatemala, Guatemala"
	let vc8 = `TEL;WORK;VOICE:+502 ${phone1}`
	let vc9 = `TEL;CELL:+502 ${phone2}`
	// let vc10 = "TEL;MAIN:+502 23795303"
	let vc11 = `EMAIL;WORK;INTERNET:${email}`
	let vc12 = "URL:https://cendis.com.gt"
	let vc13 = "END:VCARD"
	let vc14 = "dark=001E61"
	let vc15 = "size=500"

	let vc = vc2 + "\n" + vc3 + "\n" + vc4 + "\n" + vc5 + "\n" + vc6 + "\n" + vc7 + "\n" + vc8 + "\n" + vc9 + "\n" + vc11 + "\n" + vc12 + "\n" + vc13

	console.log("https://quickchart.io/qr?text=" + encodeURIComponent(vc) + "&" + vc14)
	return "https://quickchart.io/qr?text=" + encodeURIComponent(vc) + "&" + vc14 + "&" + vc15

}


const App = () => {
	const printRef = useRef();
	const printRefQR = useRef();
	const [url, setUrl] = useState(false);
	const [qr, setQr] = useState("");
	const [name, setName] = useState("");
	const [position, setPosition] = useState("");
	const [phone, setPhone] = useState("");
	const [phone2, setPhone2] = useState("");
	const [email, setEmail] = useState("");
	const [organization, setOrganization] = useState("");
	const { isOpen, onOpen, onClose } = useDisclosure({ defaultIsOpen: true, scale: Math.min(window.devicePixelRatio, 2)})


	useEffect(() => {
		const script = document.createElement('script');
	  
		script.src = "https://teams.microsoft.com/share/launcher.js";
		script.async = true;
		script.defer = true;
	  
		document.body.appendChild(script);
	  
		return () => {
		  document.body.removeChild(script);
		}
	  }, []);

	const handleDownloadImage = async () => {
		const element = printRef.current;
		// element.style.transform = 'scale(0.28)';
		const canvas = await html2canvas(element,  { useCORS: true });
	
		const data = canvas.toDataURL('image/png');
		const link = document.createElement('a');
	
		if (typeof link.download === 'string') {
			link.href = data;
			link.download = 'vcard.png';
	
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		} else {
			window.open(data);
		}
	};


	const handleDownloadPDF = async () => {
		const element = printRef.current;
		const canvas = await html2canvas(element,  { useCORS: true });
	
		const data = canvas.toDataURL('document/pdf');
		const link = document.createElement('a');
	
		if (typeof link.download === 'string') {
			link.href = data;
			link.download = 'vcard.pdf';
	
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		} else {
			window.open(data);
		}
	};


	const handleDownloadQR = async () => {
		const element = printRefQR.current;
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
	<div className = { styles }>
		<Formik
			initialValues={{ name: '' }}
			onSubmit={(values, actions) => {
				setTimeout(() => {
					// alert(JSON.stringify(values, null, 2))
					setQr(vcard(values.name, values.surname, values.organization, values.position, values.campus, values.email, values.phone, values.phone2))
					// console.log(setQr(vcard(values.name, values.surname, values.organization, values.position, values.campus, values.email, values.phone, values.phone2)))
					setName(values.name + " " + values.surname)
					setOrganization(values.organization)
					setPosition(values.position)
					setEmail(values.email)
					setPhone(values.phone)
					setPhone2(values.phone2)
					actions.setSubmitting(false)
					setUrl(true)
				}, 1000)
			}}
		>
			{(props) => (
				<Form className='formContainer'>
					<Container align='center' className='cardContainer'>
						<Stack spacing='3vh'>
							<Stack spacing='1vh'>
								<Heading size='lg'>Generación de tarjeta virtual</Heading>
								<Text size='md'>Por favor complete todos los campos para poder generar el QR.</Text>
							</Stack>
							<VStack spacing='2vh'>
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
										<Select {...field} placeholder='Organización'>
											<option value='Cendis'>Cendis</option>
											<option value='Servir'>Servir</option>
										</Select>
										<FormErrorMessage>{form.errors.name}</FormErrorMessage>
									</FormControl>
									)}
								</Field>

								<Field name='campus' validate={validateName}>
									{({ field, form }) => (
									<FormControl isInvalid={form.errors.name && form.touched.name}>
										<FormLabel>Sede</FormLabel>
										<Select {...field} placeholder='Seleccione su sede'>
											<option value='Mira'>Mira</option>
											<option value='Granat'>Granat</option>
											<option value='Almacén'>Almacén</option>
										</Select>
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
										<FormLabel>Teléfono principal</FormLabel>						
										<InputGroup>
											<InputLeftAddon children='+502' />
											<Input {...field} placeholder='Teléfono principal'  type='tel' id='phone'/>
										</InputGroup>
										<FormErrorMessage>{form.errors.name}</FormErrorMessage>
									</FormControl>
									)}
								</Field>

								<Field name='phone2' validate={validateName}>
									{({ field, form }) => (
									<FormControl isInvalid={form.errors.name && form.touched.name}>
										<FormLabel>Celular/Extensión</FormLabel>
										<InputGroup>
											<InputLeftAddon children='+502' />
											<Input {...field} placeholder='Teléfono celular o extensión'  type='tel' />
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
							</VStack>
						</Stack>
					</Container>
				</Form>
			)}
		</Formik>
		<div className='mobile-message'>
			<Heading>Por favor, ingrese desde una computadora o laptop para generar su tarjeta virtual.</Heading>
		</div>

		{
			url ? 
				<>
					{/* <Button onClick={onOpen}>Open Modal</Button> */}

					<Modal isOpen={isOpen} id='mymodal' isCentered>
						<ModalOverlay />
						{/* <ModalContent maxW="67.3%"> */}
						{/* <ModalContent maxW="fit-content"> */}
						<ModalContent maxH='fit-content' maxW='fit-content'>
							<ModalHeader>
								¡Su VCard esta lista!
							</ModalHeader>
							<ModalCloseButton />
							<ModalBody>
								Navegue hacia abajo para descargar tanto la VCard como el QR.
								<div className='vcardCon'>
								<VisuallyHidden>
									<div ref={printRef} className='vcard'>
										{
											organization === "Cendis" ?
												<>
												<div className='organizationTitle'>
													<img src={logoCendis} alt='logo Cendis' />
												</div>
												
												<div className='person'>
													<b><Text className='pName'>{name}</Text></b>
													<HStack spacing='3vw'>
														<Text className='pPosition'>{position}</Text>
														<div className='line'></div>
													</HStack>
												</div>


												<div className='contact'>
													<Stack spacing='4'>
														<div className='contactDetail'>
															<Icon as={MdOutlinePhoneIphone}  boxSize={20}/>
															<Text className='testt'>(502) {phone.match(/.{1,4}/g).join(' ')}</Text>
														</div>
														<div className='contactDetail cSpace'>
															<Icon as={MdLocalPhone}  boxSize={20}/>
															<Text className='testt'>(502) {phone2.match(/.{1,4}/g).join(' ')}</Text>
														</div>
														<div className='contactDetail cSpace'>
															<Icon as={MdEmail}  boxSize={20}/>
															<Text className='testt'>{email}</Text>
														</div>
													</Stack>
												</div>

												<div className='qr'>
													<img src={qr} ref={printRefQR} alt='QR' className='qrImage'/>
												</div>

												<div className='footer'>
													<p>
														<a href='cendis.com.gt'>cendis.com.gt</a>
													</p>
												</div>
												</>

											:
											<>
											<div className='organizationTitleSer'>
												<img src={logoServir} alt='logo Servir' className='servirLogo'/>
											</div>

											<div className='person'>
												<Text className='pName'>{name}</Text>
												<HStack spacing='3vw'>
													<Text className='pPosition'>{position}</Text>
													<div className='lineSer'></div>
												</HStack>
											</div>


											<div className='contact'>
												<Stack spacing='4'>
													<div className='contactDetail'>
														<Icon as={MdOutlinePhoneIphone}  boxSize={20}/>
														<Text className='testt'>(502) {phone.match(/.{1,4}/g).join(' ')}</Text>
													</div>
													<div className='contactDetail cSpace'>
														<Icon as={MdLocalPhone}  boxSize={20}/>
														<Text className='testt'>(502) {phone2.match(/.{1,4}/g).join(' ')}</Text>
													</div>
													<div className='contactDetail cSpace'>
														<Icon as={MdEmail}  boxSize={20}/>
														<Text className='testt'>{email}</Text>
													</div>
												</Stack>
												
											</div>

											<div className='qrSer'>
												<img src={qr} ref={printRefQR} alt='QR' className='qrImage'/>
											</div>

											<div className='footerSer'>
												{/* <p>
													<a href='cendis.com.gt'>cendis.com.gt</a>
												</p> */}
											</div>
											</>


										}

										{/* <div className='person'>
											<Text className='pName'>{name}</Text>
											<HStack spacing='3vw'>
												<Text className='pPosition'>{position}</Text>
												<div className='line'></div>
											</HStack>
										</div>


										<div className='contact'>
											<Stack spacing='4'>
												<div className='contactDetail'>
													<Icon as={MdOutlinePhoneIphone}  boxSize={20}/>
													<Text className='testt'>(502) {phone.match(/.{1,4}/g).join(' ')}</Text>
												</div>
												<div className='contactDetail cSpace'>
													<Icon as={MdLocalPhone}  boxSize={20}/>
													<Text className='testt'>(502) {phone2.match(/.{1,4}/g).join(' ')}</Text>
												</div>
												<div className='contactDetail cSpace'>
													<Icon as={MdEmail}  boxSize={20}/>
													<Text className='testt'>{email}</Text>
												</div>
											</Stack>
											
										</div>

										<div className='qr'>
											<img src={qr} ref={printRefQR} alt='QR' className='qrImage'/>
										</div>

										<div className='footer'>
											<p>
												<a href='cendis.com.gt'>cendis.com.gt</a>
											</p>
										</div> */}
									</div>
								</VisuallyHidden>
								</div>
							</ModalBody>

							<ModalFooter>
								{/* <Button colorScheme='blue' mr={3} onClick={onClose}>
									Close
								</Button> */}
								<Button colorScheme='blue' mr={3} onClick={handleDownloadImage}>
									Descargar VCard (png)
								</Button>
								<Button colorScheme='blue' mr={3} onClick={handleDownloadPDF}>
									Descargar VCard (pdf)
								</Button>
								<Button variant='ghost' onClick={handleDownloadQR}>Descargar QR</Button>
								<div
									className="teams-share-button"
									data-href="https://support.apple.com/en-us/HT201196"
									data-icon-px-size="64">
								</div>
							</ModalFooter>
						</ModalContent>
					</Modal> 
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
