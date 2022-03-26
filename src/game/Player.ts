import { Markup } from 'telegraf';
import { ExtraReplyMessage } from 'telegraf/typings/telegram-types';
import { bot } from '..';

export class Player {
	id: number;
	hand: string[] = [];
	gameId?: number;
	chatId: number;
	handMesageId?: number;
	tableMessageId?: number;
	shownTiles: string[] = [];
	username: string;

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

	public async setHandMessage(
		_msg: string,
		extra?: ExtraReplyMessage | undefined
	) {
		if (this.handMesageId == undefined) {
			const { message_id } = await bot.telegram.sendMessage(
				this.chatId,
				_msg,
				{ ...extra, parse_mode: 'HTML' }
			);
			this.handMesageId = message_id;
			return;
		}
		await bot.telegram.editMessageText(
			this.chatId,
			this.handMesageId,
			undefined,
			_msg
		);
	}

	constructor(_id: number, _username: string, _chatId: number) {
		this.id = _id;
		this.username = _username;
		this.chatId = _chatId;
	}
}
