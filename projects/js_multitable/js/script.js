/*
File: script.js
GUI Assignment 4
Thomas Dorval, UMass Lowell Computer Science, thomas_dorval@student.uml.edu
Copyright (c) 2023 by Dorval. All rights reserved.
Updated by Thomas on June 21, 2023 at 3:29 PM
Instructor: Professor Wenjin Zhou
Sources of Help: TraveryMedia on Youtube, JQuery's API and extention APIs, and StackOverflow
Brief Overview: Check the comments to see what gave me the most headaches on each step :))))
*/

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
	
	$("#slider1").slider({
		range:true,
		values: [$("#row-low").val(), $("#row-high").val()],
		min: -50,
		max: 50,
		slide: function(){slideValues();},
		stop: function(){slideValues();}
	});
	$("#slider2").slider({
		range:true,
		values: [$("#col-low").val(), $("#col-high").val()],
		min: -50,
		max: 50,
		slide: function(){slideValues();},
		stop: function(){slideValues();}
	});
	
	var tabs = $("#my-tables").tabs();
	
	//copied from: https://jqueryui.com/tabs/#manipulation
	// Close icon: removing the tab on click
	tabs.on( "click", "span.ui-icon-close", function() {
		var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
		$( "#" + panelId ).remove();
		tabs.tabs( "refresh" );
		if($("#my-tabs li").length == 0){
			$("#table-manager").hide();
		}
    });
 
    tabs.on( "keyup", function( event ) {
		if ( event.altKey && event.keyCode === $.ui.keyCode.BACKSPACE ) {
			var panelId = tabs.find( ".ui-tabs-active" ).remove().attr( "aria-controls" );
			$( "#" + panelId ).remove();
			tabs.tabs( "refresh" );
		}
		if($("#my-tabs li").length == 0){
			$("#table-manager").hide();
		}
    });
	
	$("#multiples").validate({ //this looks very simple but i spent a very long time trying to make it more complicated and it never actually worked
		rules: {
			required: true,
			number: true,
			range: [-50,50]
		},
	});
});

function slideValues(){
	var values1 = $("#slider1").slider( "option", "values");
	var values2 = $("#slider2").slider( "option", "values");
	
	$("#row-low").val(values1[0]);
	$("#row-high").val(values1[1]);
	$("#col-low").val(values2[0]);
	$("#col-high").val(values2[1]);
	tablePrep();
}

function inputValues(){
	var out1 = $("#row-low").val(),
		out2 = $("#row-high").val(),
		out3 = $("#col-low").val(),
		out4 = $("#col-high").val();
	
	$("#slider1").slider( "values", [ out1, out2 ] );
	$("#slider2").slider( "values", [ out3, out4 ] );
	tablePrep();
}

function tablePrep() { //pull our values from the forum
	//collect values for validation
	var out1 = $("#row-low").val(),
		out2 = $("#row-high").val(),
		out3 = $("#col-low").val(),
		out4 = $("#col-high").val();
	
	var valid = $("#multiples").valid();
	if(!valid){
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
	$("#store-button").show();
}

//copied from: https://stackoverflow.com/questions/14702631/in-jquery-ui-1-9-how-do-you-create-new-tabs-dynamically
function storeTable(){
	let myTable = $("#multi-table").clone(false);
	var num_tabs = $("#my-tabs li").length + 1;

	$("#my-tabs").append(
		"<li id='h-tab" + num_tabs + "'><a href='#tab" + num_tabs + "'>Table " + num_tabs + "</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>"
	);
	$("#my-tables").append(
		"<div id='tab" + num_tabs + "'></div>"
	);
	$("#tab" + num_tabs).append(myTable);
	$("#del-container").append(
		"<div class='ch-cont'><input type='checkbox' id='del-tab" + num_tabs + "'><label for='del-tab" + num_tabs +"'>Table " + num_tabs + "</label></div>"
	);
	$("#my-tables").tabs("refresh");
	$("#my-tables").tabs("option", "active", 0);
	
	$("#table-manager").show();
	//$("#store-button").hide();
	
	/*var tbl = document.createElement('table');
	tbl.setAttribute("id", "multi-table");*/
	
	//$("#multi-table").replaceWith(tbl);
}

/*function deleteTabs(){
	var num_del = $("#del-container").length,
		i = 0, j = 0;
	for(i = 1; i < num_del; i++){
		if($("#del-tab" + i).checked){
			$("#tab" + i).remove();
			$("#htab" + i).remove();
			$("#del-tab" + i).remove();
			
			for(j = (i); j < num_del; j++){
				$("#tab" + j).setAttribute("id", "tab" + (j-1));
				$("#htab" + j).setAttribute("id", "htab" + (j-1));
				$("#del-tab" + j).setAttribute("id", "del-tab" + (j-1));
			}
			num_del -= 1;
			i -= 1;
		}
	}
	$("#my-tables").tabs("refresh");
}*/