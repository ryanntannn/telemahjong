import { GameManager } from './GameManager';
import { Player } from './Player';
import { PlayerFactory } from './PlayerFactory';

export class Lobby {
	gameCode: number; //4 Digit game code
	players: Player[] = [];
	gameManager?: GameManager;

	playerJoin(_player: Player) {
		if (this.gameManager != undefined) return;
		_player.gameId = this.gameCode;
		this.players.push(_player);
	}

	startLobby() {
		this.gameManager = new GameManager(this.players);
	}

	constructor(_code: number) {
		this.gameCode = _code;
	}
}
