import User from '../model/userModel.js';
import validator from "validator";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { gentoken, gentoken1 } from '../config/token.js';

// ✅ Registration Controller
export const registration = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existUser = await User.findOne({ email });
        if (existUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ name, email, password: hashPassword });

        const token = await gentoken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        return res.status(201).json({
            message: "User registered successfully",
            user: { id: user._id, name: user.name, email: user.email }
        });
    } catch (error) {
        console.log("Registration error:", error);
        res.status(500).json({ message: "Error registering user", error });
    }
};

// ✅ Login Controller
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = await gentoken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            message: "User logged in successfully",
            user: { id: user._id, name: user.name, email: user.email }
        });
    } catch (error) {
        console.log("Login error:", error);
        res.status(500).json({ message: "Error logging in user", error });
    }
};

// ✅ Logout Controller
export const logOut = async (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });
        return res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.log("Logout error:", error);
        res.status(500).json({ message: "Error logging out user", error });
    }
};

// ✅ Google Login Controller
export const googleLogin = async (req, res) => {
    try {
        const { name, email } = req.body;
        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                name,
                email,
                password: 'google_auth_user'
            });
        }

        const token = await gentoken(user._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            message: "Google login successful",
            user: { id: user._id, name: user.name, email: user.email }
        });
    } catch (error) {
        console.log("Google login error:", error);
        res.status(500).json({ message: "Error logging in with Google", error });
    }
};

// ✅ Auth Check Controller
export const checkAuth = async (req, res) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({ message: "No token provided" });
        }

        // Import jwt for token verification
        
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Check if it's an admin token (email-based ID)
            if (decoded.id === process.env.ADMIN_EMAIL) {
                return res.status(200).json({
                    message: "Admin authenticated",
                    user: { 
                        name: "Admin", 
                        email: process.env.ADMIN_EMAIL,
                        role: "admin" 
                    }
                });
            }
            
            // For regular users, fetch from database
            const user = await User.findById(decoded.id);
            if (user) {
                return res.status(200).json({
                    message: "User authenticated",
                    user: { 
                        id: user._id, 
                        name: user.name, 
                        email: user.email,
                        role: "user"
                    }
                });
            }
            
            return res.status(401).json({ message: "User not found" });
            
        } catch (jwtError) {
            return res.status(401).json({ message: "Invalid token" });
        }
        
    } catch (error) {
        console.log("Auth check error:", error);
        res.status(401).json({ message: "Authentication failed" });
    }
};

// ✅ Admin Login Controller
export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const user = {
                name: "Admin",
                email: process.env.ADMIN_EMAIL,
                role: "admin"
            };

            const token = await gentoken1(user.email); // generate admin token with email or role

            res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                sameSite: "none",
                maxAge: 7 * 24 * 60 * 60 * 1000
            });

            return res.status(200).json({
                message: "Admin logged in successfully",
                user
            });
        } else {
            return res.status(400).json({ message: "Invalid admin credentials" });
        }
    } catch (error) {
        console.log("Admin login error:", error);
        res.status(500).json({ message: "Error logging in admin", error });
    }
};
