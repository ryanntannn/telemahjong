import { Markup } from 'telegraf';
import { InlineKeyboardMarkup } from 'telegraf/typings/core/types/typegram';
import { ExtraReplyMessage } from 'telegraf/typings/telegram-types';
import { bot } from '..';
import { GameManager } from './GameManager';

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
	handMesageId?: number;
	tableMessageId?: number;
	shownTiles: string[] = [];
	username: string;
	ready: boolean = false;
	gameManager?: GameManager;
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

	public async setHandMessage() {
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
		console.log(
			`${this.username} used ${this.activeActions[_index].label}`
		);
		this.activeActions[_index]?.action();
	}

	public setActions(actions: PlayerAction[]) {
		this.activeActions = actions;
		this.setHandMessage();
	}

	public addAction(...actions: PlayerAction[]) {
		this.activeActions.push(...actions);
		this.setHandMessage();
	}

	public removeAction(...actions: PlayerAction[]) {
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
