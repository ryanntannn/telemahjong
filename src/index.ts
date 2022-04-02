import { Context, Markup, Telegraf } from 'telegraf';
import { Message, Update } from 'typegram';
import 'dotenv/config';
import { TilesDatabase } from './game/tiles/TilesDatabase';
import { GameManager } from './game/GameManager';
import { LobbyManager } from './game/LobbyManager';
import { PlayerFactory } from './game/PlayerFactory';
import { Test } from 'tslint';

new TilesDatabase();
new LobbyManager();

export const bot: Telegraf<Context<Update>> = new Telegraf(
	process.env.BOT_TOKEN as string
);

bot.start((ctx) => {
	ctx.reply(
		`Hello ${ctx.from.username}, welcome to TeleMahjong!`,
		Markup.inlineKeyboard([
			Markup.button.callback('Start New Game', 'start'),
			Markup.button.callback('Join A Room', 'joinRoomHelp'),
		])
	);
});

bot.action('joinRoomHelp', (ctx) => {
	ctx.reply(
		'To join a room, type the 4 digit roon code that was shared with you'
	);
});

bot.action('start', (ctx) => {
	const playerId = ctx.from!.id!;
	const username = ctx.from?.username!;
	const chatId = ctx.chat!.id;
	const player = PlayerFactory.build(playerId, username, chatId);
	if (player == undefined) return ctx.reply('Already in a lobby');
	LobbyManager.newLobby(player!);
});

bot.action('test', (ctx) => {
	const playerId = ctx.from!.id!;
	const chatId = ctx.chat!.id;
	const player = PlayerFactory.getPlayer(playerId);
	player?.setActions([{ label: 'Au Au', action: () => {} }]);
});

bot.action(/AA[0-99]/, (ctx) => {
	const playerId = ctx.from!.id!;
	const chatId = ctx.chat!.id;
	const player = PlayerFactory.getPlayer(playerId);
	if (player == undefined) return;
	player.handleAction(parseInt(ctx.match[0].substring(2)));
});

bot.on('message', async (ctx) => {
	try {
		if ((ctx.update.message as any).text == undefined) return;
		const thisMessage = ctx.update.message as any;
		PlayerFactory.getPlayer(ctx.from!.id);
		if (PlayerFactory.hasPlayer(ctx.from!.id)) return;
		if (!/[0-9999]/.test(thisMessage.text)) return;
		if (!LobbyManager.lobbies.has(Number(thisMessage.text))) return;
		const player = PlayerFactory.build(
			ctx.from!.id,
			ctx.from!.username!,
			ctx.chat!.id
		);
		if (player == undefined) return ctx.reply('Already in a lobby');
		LobbyManager.lobbies.get(Number(thisMessage.text))?.playerJoin(player);
	} catch (err) {
		return;
	}
});

console.log(LobbyManager.newLobby(PlayerFactory.build(-1, '-1', -1)!).gameCode);

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

bot.launch();
