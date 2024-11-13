// Import some dependencies/ packagaes

//HTTP framework for handling request
const express = require('express')
// Instance of express framework
const app = express();
// DBMS Mysql
const mysql = require('mysql2');
// Cross origin Resource Sharing
const cors = require ('cors');
// Environment variable doc
const dotenv = require('dotenv');

//
app.use(express.json());
app.use(cors());
dotenv.config();

// connection to the database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

// check if there is a connection
db.connect((err) => {
    // If no connection
    if(err) return console.log("Error connecting to MYSQL");

        //If connect works successfully
        console.log("Connected to MYSQL as id: ", db.threadId);
})

// < Your code goes down here

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Question 1

app.get('/patients', async (req, res) => {
    try {
        const result = await pool.query('SELECT patient_id, first_name, last_name, date_of_birth FROM patients');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Question 2
app.get('/providers', async (req, res) => {
    try {
        const result = await pool.query('SELECT first_name, last_name, provider_specialty FROM providers');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Question 3
app.get('/patients/filter', async (req, res) => {
    const { firstName } = req.query; // Expecting ?firstName=value
    try {
        const result = await pool.query('SELECT * FROM patients WHERE first_name = $1', [firstName]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Question 4
app.get('/providers/specialty', async (req, res) => {
    const { specialty } = req.query; // Expecting ?specialty=value
    try {
        const result = await pool.query('SELECT * FROM providers WHERE provider_specialty = $1', [specialty]);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// start the server
app.listen(process.env.PORT, () => {
    console.log(`server listening on port ${process.env.PORT}`);
    // Sending a message to the browser
console.log('Sending message to browser...');
app.get('/', (req,res) => {
    res.send('Server Started Successfully!');
});


});
