const express = require('express')
const knex = require("knex")(require("../knexfile"));
const router = express.Router();

router.get("/:id", (req, res) => {
    const id = req.params.id;
    knex('middlegames').where({ id: req.params.id }).then((response) => {
        if (response.length > 0)
            return res.status(200).send(response[0])
        return res.status(404).send(`No puzzle with id ${req.params.id} found!`)
    }).catch(error => {
        res.status(500).send(error);
    })
})
//Returns the number of puzzles in the database with a given difficulty
router.get("/:difficulty/count", (req, res) => {
    const difficulty = req.params.difficulty;
    knex.raw(` select count(*) from middlegames_${difficulty}`).then(response => {
        if (response.length > 0)
            return res.status(200).send(response[0][0])
        return res.sendStatus(503)
    }).catch(() => {
        return res.status(404).send(`No table with that difficulty (${req.params.difficulty}) found!`)
    })
})
//Serves a middlegame puzzle with a given difficulty and a given id. 
router.get("/:difficulty/:id", (req, res) => {
    const id = req.params.id;
    const difficulty = req.params.difficulty;
    knex.raw(` select * from middlegames_${difficulty} where id = ${id}`).then(response => {
        if (response.length > 0)
            return res.status(200).send(response[0][0])
        return res.status(404).send(`No puzzle with id ${req.params.id} found!`)
    })
})
module.exports = router;