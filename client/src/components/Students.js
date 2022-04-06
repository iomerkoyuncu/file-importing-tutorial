import React from "react";

function Students({ id, name, password }) {
	return (
		<div className='container mt-4 bg-gray d-flex justify-content-center'>
			<table>
				<tr>
					<td>{id}</td>
					<td>{name}</td>
					<td>{password}</td>
				</tr>
			</table>
		</div>
	);
}

export default Students;
