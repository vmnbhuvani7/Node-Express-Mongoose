const path = require("path")
const express = require("express")
const app = express();

// built-in middleware
const staticPate = path.join(__dirname,"../public")
app.use(express.static(staticPate))

app.get("/", (req, res) => {
    res.send("This is home page")
})

app.get("/about", (req, res) => {
    res.status(200).send('This is about page') //not send multiple value
})

app.listen(8000, () => {
    console.log("Port lister in 8000");
})