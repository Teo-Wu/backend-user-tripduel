import User from "../models/User.js";

// Controller to get user profile
export const getProfile = async (req, res) => {
  try {
    // req.user.id comes from JWT middleware
    const user = await User.findById(req.user.id).select("-password"); // exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      msg: "Profile available", 
      id: user._id,
      username: user.username,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
