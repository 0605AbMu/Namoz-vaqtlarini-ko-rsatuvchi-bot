const app = (require("express"))();

app.get("/", (req, res) => {
    res.send("<h1>It is server of Namoz Vaqtlari bot</h1>");

})
app.get("/stat", (req, res) => {
    res.download("./data/userData.json")
})
require("./index");
app.listen(process.env.PORT || 4000);
console.log("Bot ishga tushdi!")