
function View(){}

View.prototype.errorMessage = function(){
	alert("Please enter a single lower case letter a - z, you dummy");
	window.location.reload(false); 
}

View.prototype.playersDropDown = function(){ 
	return document.getElementById("playersDropDown");
}
View.prototype.startGame = function(){
	return document.getElementById("startGame");
}

View.prototype.xout = function(){
	return document.getElementById("xout");
}

View.prototype.hide = function(section){
	section.setAttribute("class", "hidden");
}
//==============================
//  input section
//==============================

View.prototype.resetInputField = function(nodeList){
	while (nodeList.hasChildNodes()) {
		nodeList.removeChild(nodeList.firstChild);
	}
}

View.prototype.createInputFields = function(){
	this.view.show(document.getElementById("startGame"));
	this.view.resetInputField(document.getElementById("playerKeys"));
	document.getElementById("playerKeys").innerHTML = "<p>Please select a letter to press for your racer to move forward:</p>"
	for (i=0; i < event.target.selectedIndex; i++){
		var fieldHTML = "<br /><label for='player"+i+"'>Key for Player "+(i+1)+": </label><input type='text' class='player'><br />";
		document.getElementById("playerKeys").innerHTML += fieldHTML;
	}
}

View.prototype.getCharacters = function(){
	var nodeList = document.querySelectorAll('.player');
	var characters = [];
	for (i=0; i<nodeList.length; i++){
		characters.push(nodeList[i].value);
	}
	return characters;
}

View.prototype.hide = function(section){
	section.setAttribute("class", "hidden");
}

View.prototype.show = function(section){
	section.setAttribute("class", "shown");
}

//==============================
//  track generation 
//==============================

View.prototype.setupGame = function(players){
	this.hide(document.getElementById("input"));
	this.show(document.getElementById("scoreBoard"));
	this.setUpTrack(players, TRACK_LENGTH);
}

View.prototype.setupScoreboard = function(players){
	for(i=0;i<players;i++){
		var indieScores = "<p>Player " +(i+1)+ ": <span id='scoreFor"+i+"''>0</span></p>";
		document.getElementById("scoreBoard").innerHTML += indieScores;
	}
}

View.prototype.setUpTrack = function(playerNum, TRACK_LENGTH) {
	var block = this.createColumn(TRACK_LENGTH);
	for (i=0;i<playerNum;i++){
		var playerColumns = "<ul class = 'players' id = 'player"+i+"'>" + block + "</ul>";
		document.getElementById("track").innerHTML += playerColumns;
	}
	document.getElementById('track').setAttribute("style","width:" + (playerNum*124) + "px;");
}

View.prototype.createColumn = function(playerNum){
	var indyPiece = "<li><div class='piece'></div></li>"
	var trackHTML = "";
	for (i=0;i<=playerNum-1;i++){
		trackHTML+=indyPiece;
	}
	return trackHTML;
}

//==============================
//  player movement
//==============================


View.prototype.moveRacers = function(whichRacer, position){
	var racetrack = document.getElementById("track");
	this.reset(document.getElementById("player"+whichRacer).querySelectorAll(".active"+whichRacer));
	racetrack.childNodes[(whichRacer+1)].childNodes[position-1].childNodes[0].setAttribute("class", "piece active"+whichRacer);
	console.log(whichRacer, position, racetrack);
}

View.prototype.gameWin = function(player, wincount) {
	alert("Player " + (player+1) + " won!");
	this.reset(document.querySelectorAll(".piece"));
	document.getElementById("scoreFor"+player).innerHTML = wincount;
}


View.prototype.reset = function(nodeList){
	if (nodeList.length == 0){
		return
	}
	else if (nodeList.length == 1){
		nodeList[0].setAttribute("class", "piece");
		//WHY WAS THE BELOW FUCKING WITH ME
	} else if (nodeList.length > 1){
		for (i=0;i<nodeList.length;i++){
			nodeList[i].setAttribute("class", "piece")
		}
	}

}



