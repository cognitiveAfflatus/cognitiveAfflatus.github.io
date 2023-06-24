$(function() {
	//number type inputs default to 0 when blank, which isn't very intuitive, and doesn't really have a way to validate
	//stole this solution wholesale; https://stackoverflow.com/questions/41578153/prevent-html-input-type-number-from-ever-being-empty
	const numInputs = document.querySelectorAll('input[type=number]')

	numInputs.forEach(function(input) {
	  input.addEventListener('change', function(e) {
		if (e.target.value == '') {
		  e.target.value = 0
		}
	  })
	});
	
	$("#multiples").validate({ //this looks very simple but i spent a very long time trying to make it more complicated and it never actually worked
		rules: {
			required: true,
			number: true
		},
	});
});

function tablePrep() { //pull our values from the forum
	//collect values for validation
	var out1 = $("#row-low").val(),
		out2 = $("#row-high").val(),
		out3 = $("#col-low").val(),
		out4 = $("#col-high").val();
	
	//this is easier than and more inclusive than literally any jquery validation script i could make
	//trust me i spent literally three days trying to do it
	if(( Math.abs(out1 - out2) + Math.abs(out3 - out4) ) > 400){
		console.log("Input is too large. Ending process.");
		$("#error-handler").html("We're sorry, but the range you're trying to enter is too large.");
		return;
	}

	//build table
	const container = $("scroll-table"),
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
	$('#multi-table').replaceWith(tbl); //replace existing table as opposed to appending
	$("#error-handler").html(""); //clear error handler if successful
}