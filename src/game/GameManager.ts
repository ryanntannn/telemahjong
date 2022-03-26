import { Markup } from 'telegraf';
import { Deck } from './Deck';
import { Player } from './Player';
import { Wind } from './types';

export class GameManager {
	deck: Deck;
	players: Player[];
	thrownTiles: string[] = [];
	wind: Wind = Wind.EAST;

	startRound() {
		this.distributeCards();
	}

	generateTableMessage(): string {
		return `Thrown Tiles: ${this.thrownTiles}\n\n ${this.players.map(
			(player) =>
				`<b>${player.username}'s</b> shown tiles:\n ${player.shownTiles}\n\n`
		)}`;
	}

	sendTableMessage(_msg: string) {
		this.players.forEach((player) => {
			player.setTableMessage(_msg);
		});
	}

	distributeCards() {
		this.players[0].hand = this.deck.tiles.splice(0, 14);
		this.players[0].hand.sort();
		console.log(this.players[0].hand);
		for (let i = 1; i <= 3; i++) {
			this.players[i].hand = this.deck.tiles.splice(0, 13);
			this.players[i].hand.sort();
			console.log(this.players[i].hand);
		}
		this.sendTableMessage(this.generateTableMessage());
		this.players.forEach((player) => {
			player.setHandMessage(
				`${player.id.toString()} Starting Hand: ${player.hand.toString()}`,
				Markup.inlineKeyboard([Markup.button.callback('Test', 'test')])
			);
		});
	}

	constructor(_players: Player[]) {
		this.deck = new Deck();
		this.players = _players;
		this.startRound();
	}
}
