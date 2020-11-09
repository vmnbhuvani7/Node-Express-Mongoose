const path = require("path")
const express = require("express")
const app = express();

app.get("/", (req, res) => {
    res.send("This is home page")
})

app.get("/about/:id/book/:bookid", (req, res) => {
    console.log(req.params);
    res.status(200).send('This is about page : ' + req.params.id + ' ' + req.params.bookid) //not send multiple value
})
app.get("/about/:id?", (req, res) => {
    console.log(req.params);
    if (req.params.id === undefined) {
        res.status(200).send('This is about page without id pass') //not send multiple value
    }
    else {

        res.status(200).send('This is about page' + req.params.id) //not send multiple value
    }
})
// app.get("/about/:id", (req, res) => {
//     console.log(req.params);
//     res.status(200).send('This is about page' + req.params.id) //not send multiple value
// })
app.get("/flights/:From-:To", (req, res) => {  // same we can use . :From.:To same output as be like -
    console.log(req.params);
    res.status(200).send('This is Flight page  from :' + req.params.From + ' To: ' + req.params.To) //not send multiple value
})
app.get("/about", (req, res) => {
    console.log(req.params);
    res.status(200).send('This is about page') //not send multiple value
})

app.post('/post', function (req, res) {
    res.send('Got a POST request') //show in postman
})

app.listen(8000, () => {
    console.log("Port lister in 8000");
})