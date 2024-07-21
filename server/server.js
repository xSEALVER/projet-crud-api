const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");
const { body, validationResult, query } = require('express-validator');

const app = express();

// Middleware pour gérer les requêtes JSON et les en-têtes CORS
app.use(express.json());
app.use(cors());

// Ajout de Helmet pour sécuriser les en-têtes HTTP
app.use(helmet());

// Protection contre les attaques XSS
app.use(xss());

// Protection contre les attaques de pollution des paramètres HTTP
app.use(hpp());

// Limitation du nombre de requêtes
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limite chaque IP à 100 requêtes par fenêtre de 15 minutes
});
app.use(limiter);

// Configuration de la base de données
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

// Middleware de validation et d'assainissement
const validateSignin = [
    query('email').isEmail().withMessage('Must be a valid email'),
    query('name').isLength({ min: 1 }).withMessage('Name is required'),
];

const validateCreate = [
    body('email').isEmail().withMessage('Must be a valid email'),
    body('name').isLength({ min: 1 }).withMessage('Name is required'),
];

// Route GET pour la connexion
app.get('/signin', validateSignin, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, name } = req.query;

    const sql = "SELECT * FROM users WHERE Email = ? AND Name = ?";
    db.query(sql, [email, name], (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json("Error");
        }
        if (data.length === 0) {
            return res.status(401).json("Invalid credentials");
        }
        return res.json(data);
    });
});

// Route POST pour créer un utilisateur
app.post('/create', validateCreate, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const sql = "INSERT INTO users (Name, Email) VALUES (?)";
    const values = [
        req.body.name,
        req.body.email
    ];
    db.query(sql, [values], (err, data) => {
        if (err) return res.status(500).json("Error");
        return res.json(data);
    });
});

// Route PUT pour mettre à jour un utilisateur
app.put('/update/:id', validateCreate, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const sql = "UPDATE users SET `Name` = ?, `Email` = ? WHERE ID = ?";
    const values = [
        req.body.name,
        req.body.email
    ];

    const id = req.params.id;

    db.query(sql, [...values, id], (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).json("Error");
        }
        console.log('Update result:', data);
        return res.json(data);
    });
});

// Route DELETE pour supprimer un utilisateur
app.delete('/reservation/:id', (req, res) => {
    const sql = "DELETE FROM users WHERE ID = ?";
    const id = req.params.id;

    db.query(sql, [id], (err, data) => {
        if (err) return res.status(500).json("Error");
        return res.json(data);
    });
});

// Lancement du serveur sur le port 8081
app.listen(8081, () => {
    console.log("Server is running on port 8081");
});
