window.addEventListener('load', init);

function init(){
	var view = new View;
	var game = new Game;
	var controller = new Controller(view, game);
	controller.bindEventListeners();
	controller.view.hide(document.getElementById("scoreBoard"));
}