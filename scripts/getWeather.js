const axios = require("axios");
const cheerio = require("cheerio");



function getWeathers() {
    return new Promise((ress, rej) => {
       axios.default("https://www.accuweather.com/uz/uz/jarkurghon/356047/weather-forecast/356047", {method:"GET"})
           .then(res => {
               let rt = {};
               const $ = cheerio.load(res.data);
               rt.gradus = ($($("div.temp").toArray()[0]).text());
               let d = $($("div.real-feel").toArray()[0]).text().split("\n");
               if (d[2]) {
                   rt.realFeel = (d[2].trim());
               }
               rt.phrase = ($($("div.phrase").toArray()[0]).text())
               ress(rt);
           })
           
           .catch(e => {
           rej("Error: 404.")
       })
   })
}

module.exports = getWeathers;

