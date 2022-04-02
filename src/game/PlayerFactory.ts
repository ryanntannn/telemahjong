import { Lobby } from './Lobby';
import { LobbyManager } from './LobbyManager';
import { Player } from './Player';

export class PlayerFactory {
	private static _playerDataBase: Map<number, Player> = new Map<
		number,
		Player
	>();

	public static build(
		_id: number,
		_username: string,
		_chatId: number
	): Player | undefined {
		if (this._playerDataBase.get(_id) != undefined) return undefined;
		const newPlayer = new Player(_id, _username, _chatId);
		this._playerDataBase.set(_id, newPlayer);
		return newPlayer;
	}

	public static getPlayer(_id: number): Player | undefined {
		return this._playerDataBase.get(_id);
	}

	public static hasPlayer(_id: number): boolean {
		return this._playerDataBase.has(_id);
	}

	public static getPlayerLobby(_id: number): Lobby | undefined {
		const gameId = this._playerDataBase.get(_id)?.gameId;
		if (gameId == undefined) return undefined;
		return LobbyManager.lobbies.get(gameId);
	}
}
