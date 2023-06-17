function tableCreate() {
	var out1 = parseInt(document.getElementById("num1").value),
		out2 = parseInt(document.getElementById("num2").value),
		out3 = parseInt(document.getElementById("num3").value),
		out4 = parseInt(document.getElementById("num4").value);
	
	const body = document.body,
		tbl = document.createElement('table');
	tbl.style.width = '100px';
	tbl.style.border = '1px solid black';
	  
	var columns = Math.abs(out2-out1),
		rows = Math.abs(out4-out3);

	for (let i = 0; i < rows; i++) {
		const tr = tbl.insertRow();
		for (let j = 0; j < columns; j++) {
			const td = tr.insertCell();
			td.appendChild(document.createTextNode(`Cell I${i}/J${j}`));
			td.style.border = '1px solid black';
		}
	}
	body.appendChild(tbl);
}

tableCreate();