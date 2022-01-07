const { Telegraf, Extra, Markup } = require("telegraf");
const token = "5079844316:AAFtThAdl0LA40HGEAUpw6jodyC-i0fu1jc";
const bot = new Telegraf(token);
bot.launch({ polling: true });

module.exports = {
    bot: bot,
    token: token,
    Extra: Extra,
    Markup: Markup,
    tg: bot.telegram
}

require("./scripts/bot")