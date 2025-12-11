import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { username, password } = req.body;
  try {
    // 1. check existing user
    const exist = await User.findOne({ username });
    if (exist) return res.status(400).json({ msg: "User already exists" });

    // 2. hash password
    const hashed = await bcrypt.hash(password, 10);

    // 3. save new user
    const user = await User.create({
      username,
      password: hashed
    });

    res.json({ msg: "Registered successfully", user });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    // 1. check if user registered
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    // 2. check if pwd match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // 3. create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d"
    });

    res.json({ msg: "Logged in", token, user });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
