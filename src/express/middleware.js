var express = require('express')
var app = express()
// var mw = require('./my-middleware.js') //extrernal file

var myLogger = (req, res, next) => {
    console.log('LOGGED')
    next()
}
var myUserLogger = (req, res, next) => {
    if (req.params.name === 'vaman') {
        console.log("valid");
    } else {
        console.log("invalid");
    }
    next()
}

// app.use(myLogger)
// app.use(mw)//extrernal file

app.get('/', myLogger, (req, res) => {
    res.send('Hello World!')
})
app.get('/user/:name?', myUserLogger, (req, res) => {
    res.send('Hello user!')
})

app.listen(8000)