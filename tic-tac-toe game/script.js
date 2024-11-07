const App = {
	// All of our HTML elements
	$: {
		menu: document.querySelector('[data-id="menu"]'),
		menuItems: document.querySelector(".items"),
		resetBtn: document.querySelector('[data-id="reset-btn"]'),
		newRoundBtn: document.querySelector('[data-id="new-round-btn"]'),
		squares: document.querySelectorAll('[data-id="square"]'),
	},

	state: {
		currentPlayer: 1,
	},

	// menu functionality
	init() {
		App.registerEventListeners();
	},

	registerEventListeners() {
		App.$.menu.addEventListener("click", (e) => {
			App.$.menuItems.classList.toggle("hidden");
		});

		App.$.resetBtn.addEventListener("click", (e) => {
			console.log("reset the game");
		});

		App.$.newRoundBtn.addEventListener("click", (e) => {
			console.log("add new game");
		});

		// square grid functionality.
		App.$.squares.forEach((square) => {
			square.addEventListener("click", (e) => {
				if (square.hasChildNodes()) {
					return;
				}

				const currentPlayer = App.state.currentPlayer;
				const icon = document.createElement("i");

				if (currentPlayer === 1) {
					icon.classList.add("fa-solid", "fa-x", "yellow");
				} else {
					icon.classList.add("fa-solid", "fa-o", "turquoise");
				}

				App.state.currentPlayer = App.state.currentPlayer === 1 ? 2 : 1;

				square.replaceChildren(icon);
			});
		});
	},
};

window.addEventListener("load", App.init);
