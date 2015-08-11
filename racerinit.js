window.addEventListener('load', init);

function init(){
	var view = new View;
	var game = new Game;
	var controller = new Controller(view, game);
	controller.bindEventListeners();
	console.log(controller);
}