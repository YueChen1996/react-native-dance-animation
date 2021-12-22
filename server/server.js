import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

import csv from 'csvtojson';
import fs from 'fs';
const csvFilePath = './moviesByVotes.csv';
import fetch from 'node-fetch';

const db = mysql.createConnection({
  host: '158.247.60.15',
  port: '6033',
  user: 'richard_xia',
  password: 'Dnsnetworks#123',
  database: 'nodemysql',
});

db.connect(err => {
  if (err) console.error(err);
  console.log('Connected to MySQL Server!');
});

const app = express();
app.use(express.json());
app.use(cors());

// Get all movies
app.get('/allMovies', (req, res) => {
  let sql = 'SELECT * FROM movies';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.json(result);
  });
});

//Yue: Get all users
app.get('/allUsers', (req, res) => {
  let sql = 'SELECT * FROM users';
  db.query(sql, (err, result) => {
    if (err) throw err;
    //console.log(result);
    res.json(result);
  });
});


// Get next movie
app.get('/nextMovie/:userId', (req, res) => {
  const userId = req.params.userId;
  let sql = `SELECT original_title, poster, imdb_title_id FROM movies WHERE imdb_title_id NOT IN (SELECT movieId FROM lookup WHERE userId=${userId})`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// Rate Movie
app.post('/rateMovie', (req, res) => {
  const { userId, movieId, action } = req.body;
  let sql = `INSERT INTO lookup SET ?`;
  db.query(sql, { userId, movieId, action }, (err, result) => {
    if (err) throw err;
    res.send('movie rated!');
  });
});

//next food
app.get('/nextFood/:userId', (req, res) => {
  const userId = req.params.userId;
  let sql = `SELECT id, name FROM food WHERE id NOT IN (SELECT foodId FROM food_lookup WHERE userId=${userId}) ORDER BY RAND() LIMIT 1 `;
  db.query(sql, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

// // Rate food
app.post('/rateFood', (req, res) => {
  const { userId, foodId, action } = req.body;
  let sql = `INSERT INTO food_lookup SET ?`;
  db.query(sql, { userId, foodId, action }, (err, result) => {
    if (err) throw err;
    res.send('food rated!');
  });
});
// Add User
app.put('/addUser', (req, res) => {
  let { name } = req.body;
  let sql = 'INSERT INTO users SET ?';
  db.query(sql, { name }, (err, result) => {
    if (err) throw err;
    res.send('User added');
  });
});

app.post('/addMovies', async (req, res) => {
  let { lines } = req.body;
  lines = lines.split('-');
  lines[0] = parseInt(lines[0]);
  lines[1] = parseInt(lines[1]);
  let jsonArray = await csv().fromFile(csvFilePath);
  for (var i = lines[0] - 2; i < lines[1] - 1; i++) {
    const response = await fetch(
      `https://www.omdbapi.com/?i=${jsonArray[i].imdb_title_id}&apikey=403602e3`
    );
    const data = await response.json();
    let movieTemp = jsonArray[i];
    movieTemp.poster = data.Poster;
    let sql = 'INSERT INTO movies SET ?';
    db.query(sql, { ...movieTemp }, (err, result) => {
      if (err) throw err;
    });
  }
  res.json('success');
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

//UNUSED FUNCTIONS
//CREATE DB
app.post('/createDB', (req, res) => {
  let sql = 'CREATE DATABASE nodemysql';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('DB created...');
  });
});

// CREATE TABLES
app.post('/createuserstable', (req, res) => {
  let sql =
    'CREATE TABLE users(id int AUTO_INCREMENT, name VARCHAR(255), PRIMARY KEY(id))';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Posts table created...');
  });
});

app.post('/createlookuptable', (req, res) => {
  let sql =
    'CREATE TABLE lookup(userId int, movieId VARCHAR(255), action VARCHAR(255))';
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send('Lookup table created...');
  });
});
