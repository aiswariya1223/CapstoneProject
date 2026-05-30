import React, { useEffect, useState } from 'react';
import axios from "axios";
import Footer from './common/Footer';

function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');

    // 1. FETCH ALL BLOGS
    const fetchBlogs = async () => {
        const token = localStorage.getItem("token");
        try {
            const res = await axios.get("http://localhost:5000/api/blogs", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setBlogs(res.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    // 2. LIKE A BLOG
    const handleLike = async (blog_id) => {
        const token = localStorage.getItem("token");
        try {
            await axios.patch(`http://localhost:5000/api/blogs/like/${blog_id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchBlogs();
        } catch (error) {
            console.error(error);
        }
    };

    // 3. CREATE NEW BLOG
    const handleNewBlogSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const blogData = {
            title: newTitle,
            content: newContent,
            date: new Date().toLocaleDateString()
        };

        try {
            await axios.post("http://localhost:5000/api/blogs", blogData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setNewTitle('');
            setNewContent('');
            fetchBlogs();
        } catch (err) {
            console.error("Submission Error:", err.response?.data || err.message);
            alert("Server rejected the request. Check your Backend Terminal!");
        }
    }; // This closes handleNewBlogSubmit

    // 4. DELETE A BLOG (Moved inside the Blogs function)
    const handleDelete = async (id) => {
        const token = localStorage.getItem("token");
        if (window.confirm("Delete this blog?")) {
            try {
                await axios.delete(`http://localhost:5000/api/blogs/${id}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                fetchBlogs();
            } catch (error) {
                console.error("Error deleting:", error);
            }
        }
    };

    // 5. RETURN (Now correctly inside the Blogs function)
    return (
        <div className="blog-section py-14 bg-gray-50 min-h-screen">
            <h2 className="text-center text-5xl font-bold mb-14 text-gray-800">
                Latest <span className='text-orange-400'>Blogs</span> 📚
            </h2>

            {/* CREATE BLOG FORM */}
            <div className="max-w-3xl mx-auto mb-12 shadow-md p-8 bg-white rounded-xl">
                <form onSubmit={handleNewBlogSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Blog Title"
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        className="p-3 border rounded-lg focus:outline-orange-400"
                        required
                    />
                    <textarea
                        placeholder="Blog Content"
                        value={newContent}
                        onChange={(e) => setNewContent(e.target.value)}
                        className="p-3 border rounded-lg focus:outline-orange-400"
                        rows="4"
                        required
                    />
                    <button type="submit" className="bg-orange-400 text-white font-bold p-3 rounded-lg hover:bg-orange-600 transition">
                        Add Blog
                    </button>
                </form>
            </div>

            {/* BLOG LIST */}
            <div className="blogs-container grid grid-cols-1 md:grid-cols-2 gap-6 container mx-auto px-4 mb-20">
                {blogs.map((blog) => (
                    <div key={blog.id} className="blog-post p-6 bg-white shadow-lg rounded-xl border border-gray-100 flex flex-col justify-between">
                        <div>
                            <h3 className="font-bold text-2xl text-gray-800 mb-2">{blog.title}</h3>
                            <p className="text-gray-400 text-xs mb-4 uppercase tracking-wider">{blog.date}</p>
                            <p className="text-gray-600 leading-relaxed mb-6">{blog.content}</p>
                        </div>

                        <div className="flex justify-between items-center border-t pt-4">
                            <div className="flex items-center gap-4">
                                <button onClick={() => handleLike(blog.id)} className="text-blue-500 hover:text-blue-700 transition font-medium">
                                    👍 Like
                                </button>
                                <span className="text-gray-500 text-sm font-semibold">{blog.likes || 0} Likes</span>
                            </div>
                            <button onClick={() => handleDelete(blog.id)} className="text-red-400 hover:text-red-600 transition text-sm">
                                🗑️ Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
} // <--- Final closing brace for Blogs component

export default Blogs;