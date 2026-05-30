const db = require("../config/db");

// 1. Fetch Blogs
exports.getBlogs = async (req, res) => {
    try {
        const [rows] = await db.execute("SELECT * FROM blogs ORDER BY id DESC");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2. Add Blog (Matches your 'Add Blog' button)
exports.addBlog = async (req, res) => {
    // These names MUST match the keys sent in the axios.post above
    const { title, content, date } = req.body; 

    try {
        const sql = "INSERT INTO blogs (title, content, date, likes) VALUES (?, ?, ?, 0)";
        await db.execute(sql, [title, content, date]);
        res.status(201).json({ message: "Blog Added" });
    } catch (err) {
        console.error("SQL Error:", err);
        res.status(500).json(err);
    }
};
// 3. Like Blog (Matches your 'Like' button)
exports.likeBlog = async (req, res) => {
    const { id } = req.params;
    try {
        await db.execute("UPDATE blogs SET likes = likes + 1 WHERE id = ?", [id]);
        res.json({ message: "Liked" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// 4. Delete Blog (Matches your 'Delete' button)
exports.deleteBlog = async (req, res) => {
    const { id } = req.params;
    try {
        await db.execute("DELETE FROM blogs WHERE id = ?", [id]);
        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};