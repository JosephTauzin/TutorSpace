import React, {useEffect, useState} from 'react';
import withTheme from '@mui/styles/withTheme';
import AlertTemplate from "react-alert-template-basic"
import {positions, Provider, useAlert} from "react-alert"
import Button from '@mui/material/Button';
import "./style.css";
import Input from '@mui/material/Input';

function FileUploadPage(){
	const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
	
	const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsFilePicked(true);
	};
	
	const handleSubmission = () => {
		const formData = new FormData();

		formData.append('File', selectedFile);

		fetch(
			'http://127.0.0.1:5000/audio',
			{
				method: 'POST',
				body: formData,
			}
		)
			.then((response) => response.json())
			.then((result) => {
				console.log('Success:', result);
			})
			.catch((error) => {
				console.error('Error:', error);
			});
	};
	const optionsAlert = {
		// you can also just use 'bottom center'
		position: positions.BOTTOM_CENTER,
		timeout: 5000,
		
	}

	const Root = () => (
		<Provider template={AlertTemplate} {...optionsAlert}>

		</Provider>
	)

	function GetAlert(){
		
	}
	
	const [errorCheck, setErrorCheck] = useState()
	//const alert = useAlert();

	function CheckInput(){
		
		
		try{
			if((selectedFile.type).toString() === 'audio/mpeg'){
				//alert.show("Audio Processing...");
				setErrorCheck("YAY")
			}
			else{
				//alert.error("Incorrect File Type, Try Using .mp3 or .wav");
				setErrorCheck('AHHHH')
			}
		}catch(error){
		
		}
	}
	
	useEffect(()=>{
		CheckInput()
	},[selectedFile])
	/*
	{isFilePicked ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
					<p>errorCheck: {errorCheck}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</p>
				</div>
			) : (
				<p>Select a file to show details</p>
			)}
	*/
	return(
   	<div>
		   	<label for="file-upload" class="custom-file-upload">
				Upload Audio
			
			</label>
			<input id="file-upload" type="file" onChange={changeHandler}/>
			
			{isFilePicked ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					
				</div>
			) : (
				<p></p>
			)}
		
			
		</div>
	)
};

export default withTheme(FileUploadPage);