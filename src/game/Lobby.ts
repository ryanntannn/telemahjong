import { GameManager } from './GameManager';
import { Player } from './Player';
import { PlayerFactory } from './PlayerFactory';

export class Lobby {
	gameCode: number; //4 Digit game code
	players: Player[] = [];
	creator: Player;
	gameManager?: GameManager;

	public playerJoin(_player: Player) {
		console.log(`${_player.username} joined lobby ${this.gameCode}`);
		if (this.gameManager != undefined) return;
		_player.gameId = this.gameCode;
		_player.lobby = this;
		this.players.push(_player);
		this.players.forEach((player) =>
			player.setLobbyMessage(this.getLobbyMessage())
		);
	}

	public startLobby() {
		this.gameManager = new GameManager(this.players);
	}

	public getLobbyMessage() {
		return `Telemahjong Lobby: <b>${this.gameCode}</b>\n ${this.players.map(
			(player) =>
				`<b>${player.username}</b>: ${
					player.ready ? 'Ready' : 'Not Ready\n'
				}`
		)}`;
	}

	constructor(_code: number, _creator: Player) {
		this.gameCode = _code;
		this.creator = _creator;
		this.playerJoin(_creator);
	}
}
