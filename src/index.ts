import { Context, Markup, Telegraf } from 'telegraf';
import { Update } from 'typegram';
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

bot.action('start', (ctx) => {
	const playerId = ctx.from!.id!;
	const username = ctx.from?.username!;
	const chatId = ctx.chat!.id;
	const player = PlayerFactory.build(playerId, username, chatId);
	if (player == undefined) return ctx.reply('Already in a lobby');
	LobbyManager.newLobby(player!);
	const lobby = PlayerFactory.getPlayerLobby(playerId)!;
	lobby.playerJoin(PlayerFactory.build(-1, 'Bot 1', chatId)!);
	lobby.playerJoin(PlayerFactory.build(-2, 'Bot 2', chatId)!);
	lobby.playerJoin(PlayerFactory.build(-3, 'Bot 3', chatId)!);
	lobby.startLobby();
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

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

bot.launch();
