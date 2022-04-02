import { Markup } from 'telegraf';
import { Deck } from './Deck';
import { Player } from './Player';
import { Wind } from './types';

export class GameManager {
	deck: Deck;
	players: Player[];
	thrownTiles: string[] = [];
	wind: Wind = Wind.EAST;

	private startRound() {
		this.distributeCards();
	}

	private generateTableMessage(): string {
		return `Thrown Tiles: ${this.thrownTiles}\n\n ${this.players.map(
			(player) =>
				`<b>${player.username}${
					player.ready ? '' : '[Not Ready]'
				}'s</b> shown tiles:\n ${player.shownTiles}\n\n`
		)}`;
	}

	private sendTableMessage(_msg: string) {
		this.players.forEach((player) => {
			player.setTableMessage(_msg);
		});
	}

	public updateTableMessage() {
		this.sendTableMessage(this.generateTableMessage());
	}

	private distributeCards() {
		for (let i = 0; i <= 3; i++) {
			this.players[i].hand = this.deck.tiles.splice(0, i == 0 ? 14 : 13);
			this.players[i].hand.sort();
			console.log(this.players[i].hand);
		}
		this.updateTableMessage();
		this.players.forEach((player) => {
			player.setHandMessage();
		}); //update hand message
	}

	constructor(_players: Player[]) {
		this.deck = new Deck();
		this.players = _players;
		this.startRound();
	}
}
