/*
File: script.js
GUI Assignment 5
Thomas Dorval, UMass Lowell Computer Science, thomas_dorval@student.uml.edu
Copyright (c) 2023 by Dorval. All rights reserved.
Updated by Thomas on July 1, 2023 at 10:41 PM
Instructor: Professor Wenjin Zhou
Sources of Help: TraveryMedia on Youtube, JQuery's API and extention APIs, and StackOverflow
Brief Overview: If I get a zero on this I still pass with an 80 and I am frankly out of ideas and patience. 
Considering my life situation, I'm suprised I got this much done as is.
*/

$( function() {
	var ansLength = 0;
	$( ".hold-tile" ).draggable({ revert: 'invalid' });
	$( ".bonus-tile" ).droppable({
		drop: function( event, ui ) {
			$("#current-score").text(parseInt($("#current-score").text()) + 2);
		}
	});
	$( ".play-tile" ).droppable({
		drop: function( event, ui ) {
			$(this).css("background-color", "yellow");
			$("#current-score").text(parseInt($("#current-score").text()) + 1);
			//$("#current-word").text($("#current-word").text() + "*");
			//ansLength += 1;
		},
		out: function( event, ui ){
			$(this).css("background-color", "black");
			$("#current-score").text(parseInt($("#current-score").text()) - 1);
			//$("#current-word").text().replace('*','');
			//console.log("Pre: " + ansLength);
			/*if(ansLength > 1){
				ansLength -= 1;
				let old = $("#current-word").text();
				$("#current-word").text( old.substring(0,ansLength) );
				console.log("Post: " + ansLength);
			}
			else{
				$("#current-word").text("");
				console.log("Post-0: " + ansLength);
				ansLength = 0;
			}*/
		}
	});
	$("#hold-area").droppable();
	
	/*var myTiles = [];
	$("#hold-area li").each(function() { myTiles.push($(this)) } );
	for(let i = 0; i < myTiles.length; i++){
		randomTile(myTiles[i]);
	}*/
});

/*function randomTile(current_tile){
	let letterValue = Math.floor(Math.random() * 26) + 1;
	$.getJSON("pieces.json", function(){
		$.each(
	});
	if(alphabet[letterValue].amount > 0){
		current_tile.addClass(alphabet[letterValue].letter);
		alphabet[letterValue].amount -= 1;
		current_tile.css("background-image", "url('../graphics_data/Scrabble_Tiles/Scrabble_Tile_" + alphabet[letterValue].letter + ".jpg')");
	} else {
		randomTile(current_tile);
	}
	
}*/