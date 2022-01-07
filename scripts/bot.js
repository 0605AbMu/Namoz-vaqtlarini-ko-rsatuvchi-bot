const { bot, tg, Extra } = require("../index");
const jfs = require("jsonfile");
const prayerTimes = require("./getPrayerTime");
const weather = require("./getWeather");
let botUsername = "@Helper0605bot";

function getPrayerTimes() {
    return new Promise((ress, rej) => {
prayerTimes()
    .then(res => {
        if (!res)ress("Aniqlanmadi!")
        ress(`
📅Bugungi sana: <i>${res[6]||"Noma'lum"};</i>
🌄Tong: <i>${res[0]||"Noma'lum"};</i>
🌅Quyosh: <i>${res[1]||"Noma'lum"};</i>
🏞Peshin: <i>${res[2]||"Noma'lum"};</i>
🌆Asr: <i>${res[3]||"Noma'lum"};</i>
🌃Shom: <i>${res[4]||"Noma'lum"};</i>
🌌Xufton: <i>${res[5] || "Noma'lum"};</i>

`)
})

    .catch(e => {
    rej(undefined)
})
    })
}

function getWeather() {
    return new Promise((ress, rej) => {
        weather()
            .then(res => {
                ress(`
🌡Havo harorati: ${res.gradus+(res.gradus.indexOf("C")==-1?"C":"")};
😓His etilish harorati: ${res.realFeel+(res.realFeel.indexOf("C")==-1?"C":"")};
🌍Kun: ${res.phrase};

`)
})

         
    })
}


bot.start((msg, next) => {
    botUsername = msg.botInfo.username||"Yo'q";
    msg.replyWithHTML("<b>Assalomu Alaykum Xush kelibsiz!. Surxondaryo viloyati Jarqo'rg'on tumani hududida Namoz vaqtlarini ko'rsatib turuvchi botimizga Xush kelibsiz!\n<code>Dasturchi @Abdumannon_Shamsiyev</code></b>").catch(e => { });
    let allData = jfs.readFileSync(".\\data\\userData.json");
    let userData = allData.find(({ __id }) => __id == (msg.chat.id || msg.from.id));
    if (!userData) {
        allData.push({
            __id: msg.chat.id || msg.from.id,
            username: msg.chat.username || "yo'q",
            first_name: msg.chat.first_name||"yo'q"
        })
        jfs.writeFileSync(".\\data\\userData.json", allData, { spaces: " " });
    };
    
    getPrayerTimes().then(res => {
        msg.replyWithHTML(`<b>${res + "@" + msg.botInfo.username}</b>`).catch(e => { })
    })
})

bot.command("ob_havo", msg => {
    
    getWeather().then(res=> {
        msg.replyWithHTML(`<b>${res + "@" + msg.botInfo.username}</b>`).catch(e=>{});
    })
})
bot.command("namoz_vaqti", msg => {
    getPrayerTimes().then(res => {
        msg.replyWithHTML(`<b>${res + "@" + msg.botInfo.username}</b>`).catch(e => { })
            .then(res => {
                tg.pinChatMessage(msg.chat.id||msg.from.id, res.message_id).catch(e=>{});
    })
    })
})

setInterval(() => {
    const allData = jfs.readFileSync(".\\data\\userData.json");
    let msg = ""
    getPrayerTimes().then(res => {
        
        getWeather().then(wres => {
            msg = `<b>${res + wres+ "@" + botUsername}</b>`    
        })
            .finally(() => {
                allData.forEach(x => {
        
                    tg.sendMessage(x.__id, msg, Extra.HTML(true)).catch(e => { })
                        .then(res => {
                            tg.pinChatMessage(x.__id, res.message_id).catch(e=>{});
                        });
                    
                })
        })
    })

    
}, 3600000)