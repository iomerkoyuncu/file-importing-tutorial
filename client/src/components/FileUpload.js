import { useState } from "react";
import Axios from "axios";

import Students from "./Students";

var XLSX = require("xlsx");

function FileUpload() {
	const [file, setFile] = useState("");
	const [uploadedFile, setUploadedFile] = useState({});
	const [content, setContent] = useState([]);

	const onChange = (e) => {
		setFile(e.target.files[0]);
	};

	const onSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("file", file);

		try {
			const res = await Axios.post("/upload", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			const { fileName, filePath } = res.data;

			setUploadedFile({ fileName, filePath });
		} catch (err) {
			if (err.response.status === 500) {
				console.log("500 INTERNAL SERVER ERROR");
			} else if (err.response.status === 400) {
				console.log("400 BAD REQUEST");
			} else {
				console.log("Success.");
			}
		}
	};

	const parseExcel = async (e) => {
		const data = await file.arrayBuffer();
		const wb = XLSX.read(data);
		console.log(wb);
		const jsonData = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
		setContent(jsonData);
		console.log(jsonData);
	};

	return (
		<div className='app text-center'>
			<form onSubmit={onSubmit} className='text-center'>
				<div className='my-3'>
					<input
						className='form-control'
						type='file'
						id='formFile'
						onChange={onChange}
					/>
				</div>
				<input
					type='submit'
					value='Upload File'
					className=' btn btn-primary m-1'
				/>
			</form>

			{uploadedFile ? (
				<div className='row mt-5'>
					<div className='col-md-6 m-auto'>
						<h5 className='text-center'>{uploadedFile.fileName}</h5>
						<img style={{ width: "100%" }} src={uploadedFile.filePath} alt='' />
						<button className='btn btn-primary m-2' onClick={parseExcel}>
							Parse File
						</button>
					</div>
				</div>
			) : null}

			{content.map((element) => {
				return (
					<Students
						id={element.Id}
						name={element.İsim}
						password={element.Şifre}
					/>
				);
			})}
		</div>
	);
}

export default FileUpload;
