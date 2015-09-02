function Controller(view, game){
	this.view = view
	this.game = game
}

Controller.prototype.bindEventListeners = function(){
	this.view.playersDropDown().addEventListener("change", this.view.createInputFields.bind(this), false);
	this.view.startGame().addEventListener("click", this.handleInitializeClick.bind(this), false);
}


Controller.prototype.handleInitializeClick = function(){
	var characters = this.view.getCharacters();
	for (i=0; i<characters.length; i++){
		this.game.players.push(new Player(i, this.sanitizeInputs(characters[i])));
		this.game.playerCount = this.game.players.length;
	}
	this.view.setupGame(characters.length);
	this.view.setupScoreboard(characters.length);
	document.addEventListener('keypress', this.updatePlayerPosition.bind(this));
}


Controller.prototype.sanitizeInputs = function(letter){

	if (letter.length > 1 || letter === ""){
		this.view.errorMessage();
	} 
	else {
		if (letter.charCodeAt() > 89 && letter.charCodeAt() < 123) {	
			return letter.charCodeAt();
		} 
		else if (letter.charCodeAt() < 90 && letter.charCodeAt() > 64) {
			return (letter.charCodeAt() + 32);
		} 
		else {
			this.view.errorMessage();
		}
	}
}


//is this the fastest way to do this?	
Controller.prototype.updatePlayerPosition = function(event){ 
	for (i=0;i<this.game.playerCount;i++){
		if (event.charCode == this.game.players[i]["charCode"]){
			this.game.players[i]["position"]++;
			this.view.moveRacers(i, this.game.players[i]["position"]);
			this.checkForFinish(i, this.game.players[i]["position"], this.game.finishLine);
		}
	}	
	console.log(this.game.players);
}


Controller.prototype.checkForFinish = function(player, position, finish){
	if (position == finish){
		this.game.players[player].winCount++;
		this.view.gameWin(player, this.game.players[player].winCount);
		this.resetPlayerPos();
	}
}

Controller.prototype.resetPlayerPos = function(){
	for (i=0;i<this.game.playerCount;i++){
		this.game.players[i].position = 0;
	}
}
