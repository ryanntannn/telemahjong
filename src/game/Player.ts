import { Markup } from 'telegraf';
import { InlineKeyboardMarkup } from 'telegraf/typings/core/types/typegram';
import { ExtraReplyMessage } from 'telegraf/typings/telegram-types';
import { bot } from '..';
import { Lobby } from './Lobby';
import { LobbyManager } from './LobbyManager';

export type ActionMap = PlayerAction[];

export type PlayerAction = {
	label: string;
	action: () => void;
};

export class Player {
	id: number;
	hand: string[] = [];
	gameId?: number;
	chatId: number;
	lobbyMessageId?: number;
	handMesageId?: number;
	tableMessageId?: number;
	shownTiles: string[] = [];
	username: string;
	ready: boolean = false;
	lobby?: Lobby;
	private activeActions: ActionMap = [];

	public async sendMessage(
		_msg: string,
		extra?: ExtraReplyMessage | undefined
	) {
		return await bot.telegram.sendMessage(this.chatId, _msg, extra);
	}

	public async setTableMessage(
		_msg: string,
		extra?: ExtraReplyMessage | undefined
	) {
		if (this.handMesageId == undefined) {
			const { message_id } = await bot.telegram.sendMessage(
				this.chatId,
				_msg,
				{ ...extra, parse_mode: 'HTML' }
			);
			this.tableMessageId = message_id;
			return;
		}
		await bot.telegram.editMessageText(
			this.chatId,
			this.tableMessageId,
			undefined,
			_msg
		);
	}

	public setReady() {
		this.ready = true;
		this;
	}

	public getLobbyActions(): Markup.Markup<InlineKeyboardMarkup> | null {
		if (this.lobby?.creator.id != this.id) return null;
		return Markup.inlineKeyboard(
			this.activeActions.map((action, i) =>
				Markup.button.callback(action.label, `AA${i}`)
			)
		);
	}

	public async setLobbyMessage(message: string) {
		try {
			if (this.lobby!.gameManager != undefined) return;
			if (this.lobbyMessageId == undefined) {
				console.log('test');
				const { message_id } = await bot.telegram.sendMessage(
					this.chatId,
					message,
					{
						...this.getLobbyActions(),
						parse_mode: 'HTML',
					}
				);
				this.lobbyMessageId = message_id;
				return;
			}
			await bot.telegram.editMessageText(
				this.chatId,
				this.lobbyMessageId,
				undefined,
				message
			);
			await bot.telegram.editMessageReplyMarkup(
				this.chatId,
				this.lobbyMessageId,
				undefined,
				this.getLobbyActions()?.reply_markup
			);
		} catch (err) {
			return;
		}
	}

	public async setHandMessage() {
		if (this.lobby!.gameManager == undefined) return;
		if (this.handMesageId == undefined) {
			const { message_id } = await bot.telegram.sendMessage(
				this.chatId,
				`${this.username.toString()} Starting Hand: ${this.hand.toString()}`,
				{
					...Markup.inlineKeyboard(
						this.activeActions.map((action, i) =>
							Markup.button.callback(action.label, `AA${i}`)
						)
					),
					parse_mode: 'HTML',
				}
			);
			this.handMesageId = message_id;
			return;
		}
		await bot.telegram.editMessageText(
			this.chatId,
			this.handMesageId,
			undefined,
			`${this.username.toString()}'s Hand: ${this.hand.toString()}`
		);
		await bot.telegram.editMessageReplyMarkup(
			this.chatId,
			this.handMesageId,
			undefined,
			this.getActiveActionButtons()
		);
	}

	public handleAction(_index: number) {
		if (this.lobby!.gameManager == undefined) return;
		console.log(
			`${this.username} used ${this.activeActions[_index].label}`
		);
		this.activeActions[_index]?.action();
	}

	public setActions(actions: PlayerAction[]) {
		if (this.lobby!.gameManager == undefined) return;
		this.activeActions = actions;
		this.setHandMessage();
	}

	public addAction(...actions: PlayerAction[]) {
		if (this.lobby!.gameManager == undefined) return;
		this.activeActions.push(...actions);
		this.setHandMessage();
	}

	public removeAction(...actions: PlayerAction[]) {
		if (this.lobby!.gameManager == undefined) return;
		actions.forEach((action) => {
			const index = this.activeActions.indexOf(action, 0);
			if (index > -1) {
				this.activeActions.splice(index, 1);
			}
		});
		this.setHandMessage();
	}

	private getActiveActionButtons(): InlineKeyboardMarkup {
		return Markup.inlineKeyboard(
			this.activeActions.map((action, i) =>
				Markup.button.callback(action.label, `AA${i}`)
			)
		).reply_markup;
	}

	constructor(_id: number, _username: string, _chatId: number) {
		this.id = _id;
		this.username = _username;
		this.chatId = _chatId;
	}
}
