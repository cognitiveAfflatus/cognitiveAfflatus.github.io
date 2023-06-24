/*
File: script.js
GUI Assignment 4
Thomas Dorval, UMass Lowell Computer Science, thomas_dorval@student.uml.edu
Copyright (c) 2023 by Dorval. All rights reserved.
Updated by Thomas on June 21, 2023 at 3:29 PM
Instructor: Professor Wenjin Zhou
Sources of Help: TraveryMedia on Youtube and StackOverflow
Brief Overview: 
*/

// modified code from; https://stackoverflow.com/questions/14643617/create-table-using-javascript
function tablePrep() { //pull our values from the forum
	//locate error handler
	var err = document.getElementById("error-handler");
	
	//collect values for validation
	var out1 = parseInt(document.getElementById("num1").value),
		out2 = parseInt(document.getElementById("num2").value),
		out3 = parseInt(document.getElementById("num3").value),
		out4 = parseInt(document.getElementById("num4").value);
	
	//validate values
	if(isNaN(out1) || isNaN(out2) || isNaN(out3) || isNaN(out4)){
		console.log("Input is non-numeric. Ending process.");
		err.innerHTML = "Please input a number!";
		return;
	}
	if(( Math.abs(out1 - out2) + Math.abs(out3 - out4) ) > 400){
		console.log("Input is too large. Ending process.");
		err.innerHTML = "We're sorry, but the values you're trying to enter are too large. Please try to stick to ranges of about 400 numbers.";
		return;
	}
	
	//build table
	const container = document.getElementById("scroll-table"),
		tbl = document.createElement('table'); //create our table
		tbl.setAttribute("id", "multi-table"); //set id so we can replace it
	tbl.style.width = '100px';
	tbl.style.border = '1px solid black';
	
	var rMax = Math.max(out1, out2) + 1; //add +1 because arrays start at 0 and our numbers don't (always)
	var cMax = Math.max(out3, out4) + 1;
	var rMin = (Math.min(out1, out2) - 1); //establish a "-1,-1" point to leave "blank" so the numbers line up
	var cMin = (Math.min(out3,out4) - 1);
	
	for (r = rMin; r < rMax; r++) { 
		const tr = tbl.insertRow(); //add our row
		for (c = cMin; c < cMax; c++) { 
			const td = tr.insertCell(); //add our cells to build our columns
			td.style.backgroundColor = 'black'; //because all our nodes are assumed to be products by default, we start with the odd values, and then change them in the default case
			td.style.color = '#fff2cc';
			switch(3-( ((r===rMin)*2) + (c===cMin) )){ //a very funny switch statement that lets me avoid checking the same values multiple times
				case 0: // if r && c
					td.appendChild(document.createTextNode(``)); //looks better if blank
					break;
				case 1: // if r
					td.appendChild(document.createTextNode(c)); //i cannot for the life of me figure out why the 0 column is so thin. and i do not have time to fix it!
					break;
				case 2: //if c
					td.appendChild(document.createTextNode(r)); //i could not tell if these bars were supposed to be sticky also but. i do not have the patience to add that right now.
					break;
				default: //i like having default statements :)
					td.appendChild(document.createTextNode(r*c));
					td.style.backgroundColor = '#fff2cc';
					td.style.color = 'black';
			}
			td.style.border = '1px solid black';
			td.style.width = '30px';
			td.style.height = '10px';
		}
	}
	container.replaceChild(tbl, document.getElementById("multi-table")); //replace existing table as opposed to appending
	err.innerHTML = ""; //clear error handler if successful
}