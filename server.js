'use strict';

//Activate the server. 
const express = require('express')
const app = express()
const cors = require('cors')
const  corsOptions = { origin: 'https://tactics.zacharyringwood.com'}
app.use(cors(corsOptions))
// Import the Google Cloud client library
const { BigQuery } = require('@google-cloud/bigquery');
// Create a client
const bigqueryClient = new BigQuery();

app.get("/", (req, res) => {
    res.status(200).send("Server Online");
})
//Serve an endgame puzzle. 
app.get("/endgames/:id", (req, res) => {
    const sqlQuery = `SELECT *
    FROM \`tacticsdb-393323.puzzles.endgames\`
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
//Serve a middlegame puzzle. 
app.get("/middlegames/:id", (req, res) => {
    const sqlQuery = `SELECT *
    FROM \`tacticsdb-393323.puzzles.middlegames\`
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

app.listen(8080, () => {
    console.log(`Server Listening on port ${8080}!`)
})

