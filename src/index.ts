import { Context, Markup, Telegraf } from 'telegraf';
import { Update } from 'typegram';
import 'dotenv/config';

const bot: Telegraf<Context<Update>> = new Telegraf(
	process.env.BOT_TOKEN as string
);

bot.start((ctx) => {
	ctx.reply('Hello ' + ctx.from.first_name + '!');
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

bot.launch();
