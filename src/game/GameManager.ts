import { Deck } from './Deck';
import { Player } from './Player';

export class GameManager {
	deck: Deck;
	players: Player[];

	startRound() {
		this.distributeCards();
	}

	distributeCards() {
		this.players[0].hand = this.deck.tiles.splice(0, 14);
		console.log(this.players[0].hand);
		for (let i = 1; i <= 3; i++) {
			this.players[i].hand = this.deck.tiles.splice(0, 13);
			console.log(this.players[i].hand);
		}
	}

	constructor(_playerIds: string[]) {
		this.deck = new Deck();
		this.players = _playerIds.map((_id) => new Player(_id));
		this.startRound();
	}
}