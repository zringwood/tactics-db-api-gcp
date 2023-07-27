'use strict';

//Activate the server. 
const express = require('express')
const app = express()
const cors = require('cors')
const  corsOptions = { origin: 'https://tactics.zacharyringwood.com'}
app.use(cors(corsOptions))
const sanitzer = require("perfect-express-sanitizer")
app.use(sanitzer.clean({
    sql:true
}))

const middlegames = require('./routes/middlegames')
const endgames = require('./routes/endgames')

app.use("/middlegames", middlegames)
app.use("/endgames", endgames)

app.get("/", (req, res) => {
    res.status(200).send("Server Online");
})

app.listen(8080, () => {
    console.log(`Server Listening on port ${8080}!`)
})

