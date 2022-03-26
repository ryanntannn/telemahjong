import { Lobby } from './Lobby';
import { LobbyManager } from './LobbyManager';
import { Player } from './Player';

export class PlayerManager {
	private static _playerLobbyMap: Map<number, number> = new Map<
		number,
		number
	>();

	public static onJoinLobby(_id: number, _gameCode: number) {
		this._playerLobbyMap.set(_id, _gameCode);
	}

	public static getPlayerLobby(_id: number): Lobby | undefined {
		const gameId = this._playerLobbyMap.get(_id);
		if (gameId == undefined) return undefined;
		return LobbyManager.lobbies.get(gameId);
	}
}
