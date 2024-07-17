// // debut MySQL CRUD

const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

app.use(express.json());
app.use(cors());

// // debut MySQL CRUD
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mydatabase"
});

db.connect(err => {
    if (err) {
        console.error("Error connecting to the database:", err);
        return;
    }
    console.log("Connected to the database.");
});

app.get("/", (req, res) => {
    const sql = "SELECT * FROM users";
    db.query(sql, (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    });
});

app.post('/create', (req, res) => {
    const sql = "INSERT INTO users (Name, Email) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email
    ];
    db.query(sql, [values], (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    });
});

app.put('/update/:id', (req, res) => {
    const sql = "UPDATE users SET `Name` = ?, `Email` = ? WHERE ID = ?";
    const values = [
        req.body.name,
        req.body.email
    ];

    const id = req.params.id;

    db.query(sql, [...values, id], (err, data) => {
        if (err) {
            console.log(err);
            return res.json("Error");
        }
        console.log('Update result:', data);
        return res.json(data);
    });
});

app.delete('/reservation/:id', (req, res) => {
    const sql = "DELETE FROM users WHERE ID = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, data) => {
        if (err) return res.json("Error");
        return res.json(data);
    });
});

app.listen(8081, () => {
    console.log("listening on port 8");
});

// // fin MySQL CRUD