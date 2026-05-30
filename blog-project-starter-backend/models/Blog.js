const express = require("express");
const router = express.Router();
const db = require("../config/db");

router.post("/", async (req, res) => {
    // We pull 'title' and 'content' from the request body
    const { title, content, date } = req.body; 

    try {
        const query = "INSERT INTO blogs (title, content, date, likes) VALUES (?, ?, ?, 0)";
        await db.execute(query, [title, content, date]);
        res.status(201).json({ message: "Success" });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// LIKE A BLOG
router.patch("/like/:id", async (req, res) => {
    const { id } = req.params;
    try {
        // This SQL command adds 1 to the current likes value in MySQL
        const sql = "UPDATE blogs SET likes = likes + 1 WHERE id = ?";
        const [result] = await db.execute(sql, [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.json({ message: "Like added successfully" });
    } catch (err) {
        console.error("Like Error:", err);
        res.status(500).json({ error: err.message });
    }
});

// GET: Fetch all blogs
router.get("/", async (req, res) => {
    try {
        const [rows] = await db.execute("SELECT * FROM blogs ORDER BY id DESC");
        res.json(rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;