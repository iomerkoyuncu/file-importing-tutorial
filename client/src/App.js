import "./App.css";
import FileUpload from "./components/FileUpload";

function App() {
	return (
		<div className='container mt-4'>
			<h4 className='display-4 text-center mt-4'>Upload Your File</h4>
			<FileUpload />
		</div>
	);
}

export default App;
