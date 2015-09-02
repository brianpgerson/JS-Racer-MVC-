var TRACK_LENGTH = 5;


function Game(){
	this.playerCount = 0;
	this.players = [];
	this.finishLine = TRACK_LENGTH;
}

function Player(id, charCode){
	this.id = id;
	this.position = 0;
	this.charCode = charCode;
	this.winCount = 0;
}

