import View from "./view.js";
import Store from "./store.js";

const players = [
	{
		id: 1,
		name: "Player 1",
		iconClass: "fa-x",
		colorClass: "turquoise",
	},
	{
		id: 2,
		name: "Player 2",
		iconClass: "fa-o",
		colorClass: "yellow",
	},
];

function init() {
	const view = new View();
	const store = new Store("Live-game-storage-key", players);

	store.addEventListener("statechange", () => {
		view.render(store.game, store.stats);
	});

	window.addEventListener("storage", () => {
		console.log("State changed from another tab");
		view.render(store.game, store.stats);
	});

	view.render(store.game, store.stats);

	view.bindGameResetEvent((e) => {
		store.reset();
	});

	view.bindNewRoundEvent((e) => {
		store.newRound();
	});

	view.bindPlayerMoveEvent((square) => {
		const existingMove = store.game.moves.find(
			(move) => move.squareId === +square.id
		);

		if (existingMove) {
			return;
		}

		// Advance to the next state by pushing a move to the move array
		store.playerMove(+square.id);
	});
}

window.addEventListener("load", init);
