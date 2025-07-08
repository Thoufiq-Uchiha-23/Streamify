import User from "../models/User.js";
import jwt from "jsonwebtoken";

export async function signup(req, res) {
  const { email, password, fullName } = req.body;

  try {
    if (!email || !password || !fullName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const existingUser = await User.findOne({email})

    if(existingUser) {
      return res.status(400).json({message: "Email already exists. please use a different one"})
    }

    const idx = Math.floor(Math.random() * 100) + 1; // generate a number between 1-100
    const randomAvatar = `https://avatar-placeholder.iran.liara.run/public/${idx}.png`

    const newUser = new User.create({
      email,
      password,
      fullName,
      profilePic : randomAvatar
    })

    //jwt

    const token = jwt.sign({userId: newUser._id})
  } catch (error) {}
}

export async function login(req, res) {
  res.send("Login Route");
}

export async function logout(req, res) {
  res.send("Logout Route");
}
