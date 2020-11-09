const path = require("path")
const express = require("express")
const app = express();

const staticPate = path.join(__dirname,"../public")
app.use(express.static(staticPate))
app.get("/", (req, res) => {
    res.send("This is home page")
})
app.get("/about", (req, res) => {
    // res.status(200).send('This is about page') //not send multiple value
    res.status(200).write('<h1>This is about page</h1>') // send multiple value
    res.status(200).write('<h1>This is about page</h1>') // send multiple value
    res.send()
    // res.status(200).send('<h2>This is about page</h2>') //passed a html value
    // res.status(200).send({
    //     id: 1,
    //     name: "vaman"
    // }) //passed a object value
    // res.status(200).send([{
    //     id: 1,
    //     name: "vaman"
    // }]) //passed a array of object value
    // res.status(200).json([{
    //     id: 1,
    //     name: "vaman"
    // }]) //passed a array of object value usiing json

    // json vs send 

    // json also convert null object or array into json formate/json stringify 
    // but send can't convert the null object/array in to json formate

})

app.listen(8000, () => {
    console.log("Port lister in 8000");
})