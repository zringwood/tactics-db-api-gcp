const express = require('express')
const router = express.Router();
const { BigQuery } = require('@google-cloud/bigquery');
const bigqueryClient = new BigQuery();

//Serve an endgame puzzle with a given difficulty
router.get("/:difficulty/:id", (req, res) => {
    const difficulty = req.params.difficulty;
    const sqlQuery = `SELECT *
    FROM \`tacticsdb-393323.puzzles.middlegames_${difficulty}\`
    WHERE id = ${Number(req.params.id)}`;
    const options = {
        query: sqlQuery,
        // Location must match that of the dataset(s) referenced in the query.
        location: 'us-central1',
    };
    // Run the query
    bigqueryClient.query(options).then(response => {
        res.status(200).send(response[0][0])
    }).catch(error => {
        console.log(error)
        res.sendStatus(404)
    })
})
module.exports = router;
