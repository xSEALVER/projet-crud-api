const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");
// const csurf = require("csurf");
const cookieParser = require("cookie-parser");

const app = express();

// Utilisation de Paramètres Liés : Utilisez des paramètres liés dans les requêtes SQL pour prévenir les injections SQL.

// Helmet : Configurez les en-têtes HTTP pour améliorer la sécurité des réponses HTTP.

// xss-clean : Nettoyez les entrées des utilisateurs pour éviter les attaques XSS.

// hpp (HTTP Parameter Pollution) : Évitez la pollution des paramètres HTTP pour éviter les attaques de type HTTP Parameter Pollution.

app.use(express.json()); // Middleware pour traiter les requêtes JSON
app.use(cors()); // Middleware pour permettre les requêtes cross-origin
app.use(cookieParser()); // Middleware pour parser les cookies
// app.use(csrfProtection); // middleware de protection CSRF

// Ajout de Helmet pour sécuriser les en-têtes HTTP
app.use(helmet()); // Helmet aide à protéger contre diverses vulnérabilités en configurant correctement les en-têtes HTTP

// Ajout de xss-clean pour nettoyer les entrées des utilisateurs contre les attaques XSS
app.use(xss()); // xss-clean nettoie les données entrantes pour éviter les attaques XSS

// Ajout de hpp pour éviter la pollution des paramètres HTTP
app.use(hpp()); // hpp protège contre les attaques de pollution des paramètres HTTP

// Configuration de la protection CSRF
// const csrfProtection = csurf({
//   cookie: true // Utilise des cookies pour stocker les jetons CSRF
// });

// Configuration de la base de données
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mydatabase"
});

db.connect(err => {
  if (err) {
    console.error("Error connecting to the database:", err); // Log de l'erreur de connexion
    return;
  }
  console.log("Connected to the database."); // Confirmation de la connexion à la base de données
});

// Route GET pour récupérer toutes les réservations
app.get("/", (req, res) => {
  const sql = "SELECT * FROM users";
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error executing query:", err); // Log de l'erreur d'exécution de la requête
      return res.status(500).json({ error: "Database query error" }); // Réponse d'erreur en cas d'échec de la requête
    }
    res.json({ data, csrfToken: req.csrfToken() }); // Réponse avec les données récupérées et le jeton CSRF
  });
});

// Route POST pour créer une réservation
app.post('/create', (req, res) => {
  const { name, email } = req.body;

  // Validation basique
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" }); // Réponse d'erreur si les champs requis sont absents
  }

  const sql = "INSERT INTO users (Name, Email) VALUES (?, ?)";
  const values = [name, email];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Error executing query:", err); // Log de l'erreur d'exécution de la requête
      return res.status(500).json({ error: "Database query error" }); // Réponse d'erreur en cas d'échec de la requête
    }
    res.json(data); // Réponse avec les données insérées
  });
});

// Route PUT pour mettre à jour une réservation
app.put('/update/:id', (req, res) => {
  const { name, email } = req.body;
  const id = req.params.id;

  // Validation basique
  if (!name || !email || !id) {
    return res.status(400).json({ error: "Name, email, and ID are required" }); // Réponse d'erreur si les champs requis sont absents
  }

  const sql = "UPDATE users SET Name = ?, Email = ? WHERE ID = ?";
  const values = [name, email, id];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Error executing query:", err); // Log de l'erreur d'exécution de la requête
      return res.status(500).json({ error: "Database query error" }); // Réponse d'erreur en cas d'échec de la requête
    }
    res.json(data); // Réponse avec les données mises à jour
  });
});

// Route DELETE pour supprimer une réservation
app.delete('/reservation/:id', (req, res) => {
  const id = req.params.id;

  // Validation basique
  if (!id) {
    return res.status(400).json({ error: "ID is required" }); // Réponse d'erreur si l'ID est absent
  }

  const sql = "DELETE FROM users WHERE ID = ?";
  const values = [id];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error("Error executing query:", err); // Log de l'erreur d'exécution de la requête
      return res.status(500).json({ error: "Database query error" }); // Réponse d'erreur en cas d'échec de la requête
    }
    res.json(data); // Réponse avec les données supprimées
  });
});

// Lancement du serveur sur le port 8081
app.listen(8081, () => {
  console.log("listening on port 8081"); // Confirmation du lancement du serveur
});





// const express = require("express");
// const cors = require("cors");
// const mysql = require("mysql");

// const app = express();

// app.use(express.json());
// app.use(cors());

// // // debut MySQL CRUD
// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "mydatabase"
// });

// db.connect(err => {
//     if (err) {
//         console.error("Error connecting to the database:", err);
//         return;
//     }
//     console.log("Connected to the database.");
// });

// app.get("/", (req, res) => {
//     const sql = "SELECT * FROM users";
//     db.query(sql, (err, data) => {
//         if (err) return res.json("Error");
//         return res.json(data);
//     });
// });

// app.post('/create', (req, res) => {
//     const sql = "INSERT INTO users (Name, Email) VALUES (?)";
//     const values = [
//         req.body.name,
//         req.body.email
//     ];
//     db.query(sql, [values], (err, data) => {
//         if (err) return res.json("Error");
//         return res.json(data);
//     });
// });

// app.put('/update/:id', (req, res) => {
//     const sql = "UPDATE users SET `Name` = ?, `Email` = ? WHERE ID = ?";
//     const values = [
//         req.body.name,
//         req.body.email
//     ];

//     const id = req.params.id;

//     db.query(sql, [...values, id], (err, data) => {
//         if (err) {
//             console.log(err);
//             return res.json("Error");
//         }
//         console.log('Update result:', data);
//         return res.json(data);
//     });
// });

// app.delete('/reservation/:id', (req, res) => {
//     const sql = "DELETE FROM users WHERE ID = ?";
//     const id = req.params.id;

//     db.query(sql, [id], (err, data) => {
//         if (err) return res.json("Error");
//         return res.json(data);
//     });
// });

// app.listen(8081, () => {
//     console.log("listening on port 8");
// });

// // // fin MySQL CRUD

// const express = require("express");
// const cors = require("cors");
// const mysql = require("mysql");
// const helmet = require("helmet");
// const xss = require("xss-clean");
// const hpp = require("hpp"); 
// const cookieParser = require('cookie-parser'); 
// const csrf = require('csurf');

// const app = express();

// app.use(express.json());
// app.use(cors());
// app.use(helmet());
// app.use(xss());
// app.use(hpp());
// app.use(cookieParser());

// const csrfProtection = csrf({ cookie: true });

// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "mydatabase"
// });

// db.connect(err => {
//     if (err) {
//         console.error("Error connecting to the database:", err);
//         return;
//     }
//     console.log("Connected to the database.");
// });

// app.get("/", csrfProtection, (req, res) => {
//     const sql = "SELECT * FROM users";
//     db.query(sql, (err, data) => {
//         if (err) {
//             console.error("Error executing query:", err);
//             return res.status(500).json({ error: "Database query error" });
//         }
//         return res.json(data);
//     });
// });

// app.post('/create', csrfProtection, (req, res) => {
//     const { name, email } = req.body;
//     if (!name || !email) {
//         return res.status(400).json({ error: "Name and email are required" });
//     }

//     const sql = "INSERT INTO users (Name, Email) VALUES (?, ?)";
//     const values = [name, email];

//     db.query(sql, values, (err, data) => {
//         if (err) {
//             console.error("Error executing query:", err);
//             return res.status(500).json({ error: "Database query error" });
//         }
//         return res.json(data);
//     });
// });

// app.put('/update/:id', csrfProtection, (req, res) => {
//     const { name, email } = req.body;
//     const id = req.params.id;
//     if (!name || !email || !id) {
//         return res.status(400).json({ error: "Name, email, and ID are required" });
//     }

//     const sql = "UPDATE users SET Name = ?, Email = ? WHERE ID = ?";
//     const values = [name, email, id];

//     db.query(sql, values, (err, data) => {
//         if (err) {
//             console.error("Error executing query:", err);
//             return res.status(500).json({ error: "Database query error" });
//         }
//         return res.json(data);
//     });
// });

// app.delete('/reservation/:id', csrfProtection, (req, res) => {
//     const id = req.params.id;
//     if (!id) {
//         return res.status(400).json({ error: "ID is required" });
//     }

//     const sql = "DELETE FROM users WHERE ID = ?";
//     const values = [id];

//     db.query(sql, values, (err, data) => {
//         if (err) {
//             console.error("Error executing query:", err);
//             return res.status(500).json({ error: "Database query error" });
//         }
//         return res.json(data);
//     });
// });

// app.listen(8081, () => {
//     console.log("listening on port 8081");
// });




// const express = require("express");
// const cors = require("cors");
// const mysql = require("mysql");
// const helmet = require("helmet");
// const xss = require("xss-clean");
// const hpp = require("hpp"); // Importation de hpp

// const app = express();


// // Utilisation de Paramètres Liés : Utilisez des paramètres liés dans les requêtes SQL pour prévenir les injections SQL.

// // Helmet : Configurez les en-têtes HTTP pour améliorer la sécurité des réponses HTTP.

// // xss-clean : Nettoyez les entrées des utilisateurs pour éviter les attaques XSS.

// // hpp (HTTP Parameter Pollution) : Évitez la pollution des paramètres HTTP pour éviter les attaques de type HTTP Parameter Pollution.


// app.use(express.json()); // Middleware pour traiter les requêtes JSON
// app.use(cors()); // Middleware pour permettre les requêtes cross-origin

// // Ajout de Helmet pour sécuriser les en-têtes HTTP
// app.use(helmet()); // Helmet aide à protéger contre diverses vulnérabilités en configurant correctement les en-têtes HTTP

// // Ajout de xss-clean pour nettoyer les entrées des utilisateurs contre les attaques XSS
// app.use(xss()); // xss-clean nettoie les données entrantes pour éviter les attaques XSS

// // Ajout de hpp pour éviter la pollution des paramètres HTTP
// app.use(hpp()); // hpp protège contre les attaques de pollution des paramètres HTTP

// // Configuration de la base de données
// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "mydatabase"
// });

// db.connect(err => {
//     if (err) {
//         console.error("Error connecting to the database:", err); // Log de l'erreur de connexion
//         return;
//     }
//     console.log("Connected to the database."); // Confirmation de la connexion à la base de données
// });

// // Route GET pour récupérer toutes les réservations
// app.get("/", (req, res) => {
//     const sql = "SELECT * FROM users";
//     db.query(sql, (err, data) => {
//         if (err) {
//             console.error("Error executing query:", err); // Log de l'erreur d'exécution de la requête
//             return res.status(500).json({ error: "Database query error" }); // Réponse d'erreur en cas d'échec de la requête
//         }
//         return res.json(data); // Réponse avec les données récupérées
//     });
// });

// // Route POST pour créer une réservation
// app.post('/create', (req, res) => {
//     const { name, email } = req.body;

//     // Validation basique
//     if (!name || !email) {
//         return res.status(400).json({ error: "Name and email are required" }); // Réponse d'erreur si les champs requis sont absents
//     }

//     const sql = "INSERT INTO users (Name, Email) VALUES (?, ?)";
//     const values = [name, email];

//     db.query(sql, values, (err, data) => {
//         if (err) {
//             console.error("Error executing query:", err); // Log de l'erreur d'exécution de la requête
//             return res.status(500).json({ error: "Database query error" }); // Réponse d'erreur en cas d'échec de la requête
//         }
//         return res.json(data); // Réponse avec les données insérées
//     });
// });

// // Route PUT pour mettre à jour une réservation
// app.put('/update/:id', (req, res) => {
//     const { name, email } = req.body;
//     const id = req.params.id;

//     // Validation basique
//     if (!name || !email || !id) {
//         return res.status(400).json({ error: "Name, email, and ID are required" }); // Réponse d'erreur si les champs requis sont absents
//     }

//     const sql = "UPDATE users SET Name = ?, Email = ? WHERE ID = ?";
//     const values = [name, email, id];

//     db.query(sql, values, (err, data) => {
//         if (err) {
//             console.error("Error executing query:", err); // Log de l'erreur d'exécution de la requête
//             return res.status(500).json({ error: "Database query error" }); // Réponse d'erreur en cas d'échec de la requête
//         }
//         return res.json(data); // Réponse avec les données mises à jour
//     });
// });

// // Route DELETE pour supprimer une réservation
// app.delete('/reservation/:id', (req, res) => {
//     const id = req.params.id;

//     // Validation basique
//     if (!id) {
//         return res.status(400).json({ error: "ID is required" }); // Réponse d'erreur si l'ID est absent
//     }

//     const sql = "DELETE FROM users WHERE ID = ?";
//     const values = [id];

//     db.query(sql, values, (err, data) => {
//         if (err) {
//             console.error("Error executing query:", err); // Log de l'erreur d'exécution de la requête
//             return res.status(500).json({ error: "Database query error" }); // Réponse d'erreur en cas d'échec de la requête
//         }
//         return res.json(data); // Réponse avec les données supprimées
//     });
// });

// // Lancement du serveur sur le port 8081
// app.listen(8081, () => {
//     console.log("listening on port 8081"); // Confirmation du lancement du serveur
// });







// const express = require("express");
// const cors = require("cors");
// const mysql = require("mysql");

// const app = express();

// app.use(express.json());
// app.use(cors());

// // // debut MySQL CRUD
// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "mydatabase"
// });

// db.connect(err => {
//     if (err) {
//         console.error("Error connecting to the database:", err);
//         return;
//     }
//     console.log("Connected to the database.");
// });

// app.get("/", (req, res) => {
//     const sql = "SELECT * FROM users";
//     db.query(sql, (err, data) => {
//         if (err) return res.json("Error");
//         return res.json(data);
//     });
// });

// app.post('/create', (req, res) => {
//     const sql = "INSERT INTO users (Name, Email) VALUES (?)";
//     const values = [
//         req.body.name,
//         req.body.email
//     ];
//     db.query(sql, [values], (err, data) => {
//         if (err) return res.json("Error");
//         return res.json(data);
//     });
// });

// app.put('/update/:id', (req, res) => {
//     const sql = "UPDATE users SET `Name` = ?, `Email` = ? WHERE ID = ?";
//     const values = [
//         req.body.name,
//         req.body.email
//     ];

//     const id = req.params.id;

//     db.query(sql, [...values, id], (err, data) => {
//         if (err) {
//             console.log(err);
//             return res.json("Error");
//         }
//         console.log('Update result:', data);
//         return res.json(data);
//     });
// });

// app.delete('/reservation/:id', (req, res) => {
//     const sql = "DELETE FROM users WHERE ID = ?";
//     const id = req.params.id;

//     db.query(sql, [id], (err, data) => {
//         if (err) return res.json("Error");
//         return res.json(data);
//     });
// });

// app.listen(8081, () => {
//     console.log("listening on port 8");
// });

// // // fin MySQL CRUD

// const express = require("express");
// const cors = require("cors");
// const mysql = require("mysql");
// const helmet = require("helmet"); // Importation de Helmet

// const app = express();

// app.use(express.json());
// app.use(cors());

// // Ajout de Helmet pour sécuriser les en-têtes HTTP
// app.use(helmet());

// // Configuration de la base de données
// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "mydatabase"
// });

// db.connect(err => {
//     if (err) {
//         console.error("Error connecting to the database:", err);
//         return;
//     }
//     console.log("Connected to the database.");
// });

// // Route GET pour récupérer toutes les réservations
// app.get("/", (req, res) => {
//     const sql = "SELECT * FROM users";
//     db.query(sql, (err, data) => {
//         if (err) return res.json("Error");
//         return res.json(data);
//     });
// });

// // Route POST pour créer une réservation
// app.post('/create', (req, res) => {
//     const sql = "INSERT INTO users (Name, Email) VALUES (?)";
//     const values = [
//         req.body.name,
//         req.body.email
//     ];
//     db.query(sql, [values], (err, data) => {
//         if (err) return res.json("Error");
//         return res.json(data);
//     });
// });

// // Route PUT pour mettre à jour une réservation
// app.put('/update/:id', (req, res) => {
//     const sql = "UPDATE users SET `Name` = ?, `Email` = ? WHERE ID = ?";
//     const values = [
//         req.body.name,
//         req.body.email
//     ];

//     const id = req.params.id;

//     db.query(sql, [...values, id], (err, data) => {
//         if (err) {
//             console.log(err);
//             return res.json("Error");
//         }
//         console.log('Update result:', data);
//         return res.json(data);
//     });
// });

// // Route DELETE pour supprimer une réservation
// app.delete('/reservation/:id', (req, res) => {
//     const sql = "DELETE FROM users WHERE ID = ?";
//     const id = req.params.id;

//     db.query(sql, [id], (err, data) => {
//         if (err) return res.json("Error");
//         return res.json(data);
//     });
// });

// // Lancement du serveur sur le port 8081
// app.listen(8081, () => {
//     console.log("listening on port 8081");
// });

// const express = require("express");
// const cors = require("cors");
// const mysql = require("mysql");
// const helmet = require("helmet");
// const xss = require("xss-clean"); // Importation de xss-clean

// const app = express();

// app.use(express.json());
// app.use(cors());

// // Ajout de Helmet pour sécuriser les en-têtes HTTP
// app.use(helmet());

// // Ajout de xss-clean pour nettoyer les entrées des utilisateurs contre les attaques XSS
// app.use(xss());

// // Configuration de la base de données
// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "mydatabase"
// });

// db.connect(err => {
//     if (err) {
//         console.error("Error connecting to the database:", err);
//         return;
//     }
//     console.log("Connected to the database.");
// });

// // Route GET pour récupérer toutes les réservations
// app.get("/", (req, res) => {
//     const sql = "SELECT * FROM users";
//     db.query(sql, (err, data) => {
//         if (err) return res.json("Error");
//         return res.json(data);
//     });
// });

// // Route POST pour créer une réservation
// app.post('/create', (req, res) => {
//     const sql = "INSERT INTO users (Name, Email) VALUES (?)";
//     const values = [
//         req.body.name,
//         req.body.email
//     ];
//     db.query(sql, [values], (err, data) => {
//         if (err) return res.json("Error");
//         return res.json(data);
//     });
// });

// // Route PUT pour mettre à jour une réservation
// app.put('/update/:id', (req, res) => {
//     const sql = "UPDATE users SET `Name` = ?, `Email` = ? WHERE ID = ?";
//     const values = [
//         req.body.name,
//         req.body.email
//     ];

//     const id = req.params.id;

//     db.query(sql, [...values, id], (err, data) => {
//         if (err) {
//             console.log(err);
//             return res.json("Error");
//         }
//         console.log('Update result:', data);
//         return res.json(data);
//     });
// });

// // Route DELETE pour supprimer une réservation
// app.delete('/reservation/:id', (req, res) => {
//     const sql = "DELETE FROM users WHERE ID = ?";
//     const id = req.params.id;

//     db.query(sql, [id], (err, data) => {
//         if (err) return res.json("Error");
//         return res.json(data);
//     });
// });

// // Lancement du serveur sur le port 8081
// app.listen(8081, () => {
//     console.log("listening on port 8081");
// });

// const express = require("express");
// const cors = require("cors");
// const mysql = require("mysql");
// const helmet = require("helmet");
// const xss = require("xss-clean");
// const hpp = require("hpp"); // Importation de hpp

// const app = express();

// app.use(express.json());
// app.use(cors());

// // Ajout de Helmet pour sécuriser les en-têtes HTTP
// app.use(helmet());

// // Ajout de xss-clean pour nettoyer les entrées des utilisateurs contre les attaques XSS
// app.use(xss());

// // Ajout de hpp pour éviter la pollution des paramètres HTTP
// app.use(hpp());

// // Configuration de la base de données
// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "mydatabase"
// });

// db.connect(err => {
//     if (err) {
//         console.error("Error connecting to the database:", err);
//         return;
//     }
//     console.log("Connected to the database.");
// });

// // Route GET pour récupérer toutes les réservations
// app.get("/", (req, res) => {
//     const sql = "SELECT * FROM users";
//     db.query(sql, (err, data) => {
//         if (err) return res.json("Error");
//         return res.json(data);
//     });
// });

// // Route POST pour créer une réservation
// app.post('/create', (req, res) => {
//     const sql = "INSERT INTO users (Name, Email) VALUES (?)";
//     const values = [
//         req.body.name,
//         req.body.email
//     ];
//     db.query(sql, [values], (err, data) => {
//         if (err) return res.json("Error");
//         return res.json(data);
//     });
// });

// // Route PUT pour mettre à jour une réservation
// app.put('/update/:id', (req, res) => {
//     const sql = "UPDATE users SET `Name` = ?, `Email` = ? WHERE ID = ?";
//     const values = [
//         req.body.name,
//         req.body.email
//     ];

//     const id = req.params.id;

//     db.query(sql, [...values, id], (err, data) => {
//         if (err) {
//             console.log(err);
//             return res.json("Error");
//         }
//         console.log('Update result:', data);
//         return res.json(data);
//     });
// });

// // Route DELETE pour supprimer une réservation
// app.delete('/reservation/:id', (req, res) => {
//     const sql = "DELETE FROM users WHERE ID = ?";
//     const id = req.params.id;

//     db.query(sql, [id], (err, data) => {
//         if (err) return res.json("Error");
//         return res.json(data);
//     });
// });

// // Lancement du serveur sur le port 8081
// app.listen(8081, () => {
//     console.log("listening on port 8081");
// });

// const express = require("express");
// const cors = require("cors");
// const mysql = require("mysql");
// const helmet = require("helmet");
// const xss = require("xss-clean");
// const hpp = require("hpp"); // Importation de hpp

// const app = express();

// app.use(express.json());
// app.use(cors());

// // Ajout de Helmet pour sécuriser les en-têtes HTTP
// app.use(helmet());

// // Ajout de xss-clean pour nettoyer les entrées des utilisateurs contre les attaques XSS
// app.use(xss());

// // Ajout de hpp pour éviter la pollution des paramètres HTTP
// app.use(hpp());

// // Configuration de la base de données
// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "mydatabase"
// });

// db.connect(err => {
//     if (err) {
//         console.error("Error connecting to the database:", err);
//         return;
//     }
//     console.log("Connected to the database.");
// });

// // Route GET pour récupérer toutes les réservations
// app.get("/", (req, res) => {
//     const sql = "SELECT * FROM users";
//     db.query(sql, (err, data) => {
//         if (err) {
//             console.error("Error executing query:", err);
//             return res.status(500).json({ error: "Database query error" });
//         }
//         return res.json(data);
//     });
// });

// // Route POST pour créer une réservation
// app.post('/create', (req, res) => {
//     const { name, email } = req.body;

//     // Validation basique
//     if (!name || !email) {
//         return res.status(400).json({ error: "Name and email are required" });
//     }

//     const sql = "INSERT INTO users (Name, Email) VALUES (?, ?)";
//     const values = [name, email];

//     db.query(sql, values, (err, data) => {
//         if (err) {
//             console.error("Error executing query:", err);
//             return res.status(500).json({ error: "Database query error" });
//         }
//         return res.json(data);
//     });
// });

// // Route PUT pour mettre à jour une réservation
// app.put('/update/:id', (req, res) => {
//     const { name, email } = req.body;
//     const id = req.params.id;

//     // Validation basique
//     if (!name || !email || !id) {
//         return res.status(400).json({ error: "Name, email, and ID are required" });
//     }

//     const sql = "UPDATE users SET Name = ?, Email = ? WHERE ID = ?";
//     const values = [name, email, id];

//     db.query(sql, values, (err, data) => {
//         if (err) {
//             console.error("Error executing query:", err);
//             return res.status(500).json({ error: "Database query error" });
//         }
//         return res.json(data);
//     });
// });

// // Route DELETE pour supprimer une réservation
// app.delete('/reservation/:id', (req, res) => {
//     const id = req.params.id;

//     // Validation basique
//     if (!id) {
//         return res.status(400).json({ error: "ID is required" });
//     }

//     const sql = "DELETE FROM users WHERE ID = ?";
//     const values = [id];

//     db.query(sql, values, (err, data) => {
//         if (err) {
//             console.error("Error executing query:", err);
//             return res.status(500).json({ error: "Database query error" });
//         }
//         return res.json(data);
//     });
// });

// // Lancement du serveur sur le port 8081
// app.listen(8081, () => {
//     console.log("listening on port 8081");
// });











