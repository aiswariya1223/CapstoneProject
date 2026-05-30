import Home from "./components/Home";
import Blogs from "./components/Blogs";
import Navbar from "./components/common/Navbar";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";

// 1. Create the Protected Route logic
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // Check if user is logged in
  if (!token) {
    return <Navigate to="/login" replace />; // Redirect if not logged in
  }
  return children;
};

function App() {
  return (
    <div className="px-10 bg-white border rounded-md">
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected Routes */}
          <Route path="/home" element={
            <ProtectedRoute> <Home /> </ProtectedRoute>
          } />
          <Route path="/blogs" element={
            <ProtectedRoute> <Blogs /> </ProtectedRoute>
          } />

          {/* Default Route */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;