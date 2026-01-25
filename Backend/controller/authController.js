const User = require("../model/authModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let profileUrl = null;

    if (req.file) {
      profileUrl = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
    }

    let userExists = await User.findOne({ name });

    if (userExists) {
      if (profileUrl) {
        fs.unlink("uploads/" + req.file.filename, (e) => console.log(e));
      }
      return res.status(500).json({ message: "Username already Exists!" });
    }

    userExists = await User.findOne({ email });

    if (userExists) {
      if (profileUrl) {
        fs.unlink("uploads/" + req.file.filename, (e) => console.log(e));
      }
      return res.status(500).json({ message: "Email already Exists!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({
      name,
      email,
      password: hashedPassword,
      profileUrl,
    });

    res.json({ message: "User Registered Successfully!" });
  } catch (e) {
    res.status(500).json({ message: "Server Error!" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  let userExists = await User.findOne({ email });

  if (!userExists)
    return res.status(500).json({ message: "User does not exist!" });

  const passwordIsCorrect = await bcrypt.compare(password, userExists.password);

  if (!passwordIsCorrect)
    return res.status(500).json({ message: "Incorrect email or password!" });

  const token = jwt.sign(
    {
      userId: userExists._id,
      email,
      name: userExists.name,
      profileUrl: userExists.profileUrl,
    },
    process.env.JWT_SECRET
  );

  res.send({
    userId: userExists._id,
    email,
    name: userExists.name,
    profileUrl: userExists.profileUrl,
    token,
  });
};

exports.getUser = async (req, res) => {
  const user = await User.findById(req.user.userId).select('-password');

  console.log('getUser called')

  if (!user) return res.status(500).json({ message: "User not found!" });

  res.send(user);
};
