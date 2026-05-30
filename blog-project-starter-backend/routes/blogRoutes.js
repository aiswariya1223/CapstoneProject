const express = require("express");
const db = require("../config/db");
// ... rest of your existing codeconst express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");
const auth = require('../middleware/authMiddleware');
router.post("/", auth, blogController.createBlog);
router.post("/", auth, async (req, res) => {
    // Backend MUST use 'title' and 'content' here
    const { title, content, date } = req.body; 

    try {
        await db.execute(
            "INSERT INTO blogs (title, content, date, likes) VALUES (?, ?, ?, 0)",
            [title, content, date]
        );
        res.status(201).json({ message: "Success" });
    } catch (err) {
        console.log(err); // Look at your terminal to see this error!
        res.status(500).json(err);
    }
});
router.patch("/like/:id", async (req, res) => {
    try {
        await db.execute(
            "UPDATE blogs SET likes = likes + 1 WHERE id = ?", 
            [req.params.id]
        );
        res.json({ message: "Liked" });
    } catch (err) { 
        res.status(500).json(err); 
    }
});
router.delete("/:id", blogController.deleteBlog);

module.exports = router;