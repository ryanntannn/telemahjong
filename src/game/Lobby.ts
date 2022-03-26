import { GameManager } from './GameManager';
import { PlayerManager } from './PlayerManager';

export class Lobby {
	gameCode: number; //4 Digit game code
	playerIds: number[] = [];
	gameManager?: GameManager;

	playerJoin(_id: number) {
		if (this.gameManager != undefined) return;
		this.playerIds.push(_id);
		PlayerManager.onJoinLobby(_id, this.gameCode);
	}

	startLobby() {
		this.gameManager = new GameManager(this.playerIds);
	}

	constructor(_code: number) {
		this.gameCode = _code;
	}
}
