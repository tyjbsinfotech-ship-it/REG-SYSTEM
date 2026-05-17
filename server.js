const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DATABASE CONNECTION
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "registration_db"
});

// Check DB connection
db.connect((err) => {
    if (err) {
        console.log("❌ Database connection failed:", err);
    } else {
        console.log("✅ Database connected successfully");
    }
});


// =========================
// 🔎 SEARCH API (MAIN FEATURE)
// =========================

app.get("/search", (req, res) => {
    const keyword = req.query.q;

    if (!keyword) {
        return res.json([]);
    }

    const sql = `
        SELECT * FROM registrations
        WHERE client_name LIKE ?
        OR engine_no LIKE ?
        OR chassis_no LIKE ?
        OR plate_no LIKE ?
        LIMIT 20
    `;

    const value = `%${keyword}%`;

    db.query(sql, [value, value, value, value], (err, results) => {
        if (err) {
            console.log(err);
            return res.json({ error: "Database query error" });
        }

        res.json(results);
    });
});


// =========================
// 🚀 START SERVER
// =========================

app.listen(3000, () => {
    console.log("🚀 Server running at http://localhost:3000");
});