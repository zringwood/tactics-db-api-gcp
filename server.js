'use strict';

//Activate the server. 
const express = require('express')
const app = express()
const cors = require('cors')
const  corsOptions = { origin: 'https://tactics.zacharyringwood.com'}
app.use(cors(corOptions))
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
//Serve an introductory puzzle. 
app.get("/introduction/easy/:id", (req, res) => {
    const id = req.params.id
    const puzzles = [
        {
            moves: "b5a5 d3b5", 
            fen: "8/3B4/8/1k6/8/3Q4/8/6K1 b - - 1 1", 
            themes: "checkmateTheKing!"
        },
        {
            moves: "b7c8 d7c8", 
            fen: "8/1b1P4/8/1k3K2/8/8/8/8 b - - 1 1", 
            themes: "promoteThePawn!"
        }
    ]
    if(id < 1 || id > puzzles.length){
        res.status(404).send(`No introductory puzzle with id ${id} found!`)
    }
   res.status(200).send(puzzles[id-1])
})

app.listen(8080, () => {
    console.log(`Server Listening on port ${8080}!`)
})

