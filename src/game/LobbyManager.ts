import { Lobby } from './Lobby';
import { Player } from './Player';
import { randomGameCode } from './utils';

export class LobbyManager {
	private static _lobbies: Map<number, Lobby> = new Map<number, Lobby>();
	public static get lobbies(): Map<number, Lobby> {
		return LobbyManager._lobbies;
	}
	private static set lobbies(value: Map<number, Lobby>) {
		LobbyManager._lobbies = value;
	}

	public static newLobby(_creator: Player): Lobby {
		let gameCode = randomGameCode();
		while (this.lobbies.get(gameCode) != undefined)
			gameCode = randomGameCode();

		const newLobby = new Lobby(gameCode, _creator);
		this.lobbies.set(gameCode, newLobby);
		return newLobby;
	}
}
