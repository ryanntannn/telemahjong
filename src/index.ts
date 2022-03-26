import { Context, Markup, Telegraf } from 'telegraf';
import { Update } from 'typegram';
import 'dotenv/config';
import { TilesDatabase } from './game/tiles/TilesDatabase';
import { GameManager } from './game/GameManager';
import { LobbyManager } from './game/LobbyManager';
import { PlayerManager } from './game/PlayerManager';

new TilesDatabase();
new LobbyManager();

const bot: Telegraf<Context<Update>> = new Telegraf(
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
	if (PlayerManager.getPlayerLobby(playerId) != undefined)
		return ctx.reply('Already in a lobby');
	LobbyManager.newLobby(playerId);
	const lobby = PlayerManager.getPlayerLobby(playerId)!;
	lobby.playerJoin(-1);
	lobby.playerJoin(-2);
	lobby.playerJoin(-3);
	lobby.startLobby();
	return ctx.reply(`Lobby ${lobby.gameManager?.players[0].hand}`);
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

bot.launch();
