const axios = require("axios");
const cheerio = require("cheerio");
const jquery = require("jquery");


// function getTimes(res) {

//     }

function getTimes() {
    return new Promise((ress, rej) => {
            axios.default("https://praytime.uz/?region_id=168", { method: "GET" })
    .then(res => {
        const $ = cheerio.load(res.data)
        let rt = [];
         $(".time").toArray()
            .forEach(x => {
                let d = $(x).text();
                if (d.indexOf(":") != -1) {
                    rt.push(d);
                } else {
                    rt.push($(".countdown-time").text())
                }
        })
        rt.push($(".date").text().trim().split("\n").map(x=>{return x.trim()}).join(" "));
        ress(rt);

    })
                .catch(e => {
      rej("Error: 404.")
  })


    })
}

module.exports = getTimes;

