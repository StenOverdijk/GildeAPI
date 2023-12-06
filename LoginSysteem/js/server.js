const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'rekenopdracht',
});

db.connect((err) => {
  if (err) {
    console.log('Error connecting to the database:', err);
  } else {
    console.log('Connected to the database');
  }
});

app.post('/updateData', (req, res) => {
    const { datumData, titelData, inhoudData } = req.body;
  
    if (!datumData || !titelData || !inhoudData) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    const query = 'INSERT INTO semdata (datatoegevoegd, datum, titel, inhoud) VALUES (?, ?, ?, ?)';
    db.query(query, [datumData, datumData, titelData, inhoudData], (err, results) => {
      if (err) {
        console.log('Error querying the database:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      res.json({ success: true });
    });
  });
  


  app.get('/getAllData', (req, res) => {
    const query = 'SELECT datum, titel, inhoud FROM semdata';
  
    db.query(query, (err, results) => {
      if (err) {
        console.log('Error querying the database:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      res.json(results);
    });
  });


  app.post('/removeLastRow', (req, res) => {
    const query = 'DELETE FROM semdata';
  
    db.query(query, (err, results) => {
      if (err) {
        console.log('Error querying the database:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      res.json({ success: true });
    });
  });
  




app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.log('Error querying the database:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (results.length > 0) {
      res.json({ success: true });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });
});

  
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });