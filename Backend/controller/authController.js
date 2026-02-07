const User = require("../model/authModel");
const Token = require("../model/tokenModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const emailSender = require("../utils/emailSender");

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

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      profileUrl,
    });

    const token = await Token.create({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    });

    if (!token) {
      return res.status(400).json({ error: "Something went wrong!" });
    }

    let url = `http://localhost:8000/api/auth/verifyemail?token=${token.token}`;

    emailSender({
      from: "noreply@gmail.com",
      to: user.email,
      subject: "Verify Email",
      text: "Please Click on the link below to verify " + url,
      html: `<a href=${url}><button>Verify</button></a>`,
    });

    res.json({ message: "User Registered Successfully! Verify to continue" });
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

  if (!userExists.isVerified) {
    return res.status(400).json({
      message: "Your email is not verified.",
      actionText: "Resend verification link",
      actionLink: "/resendverification",
    });
  }

  const token = jwt.sign(
    {
      userId: userExists._id,
      email,
      name: userExists.name,
      profileUrl: userExists.profileUrl,
    },
    process.env.JWT_SECRET,
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
  const user = await User.findById(req.user.userId).select("-password");

  console.log("getUser called");

  if (!user) return res.status(500).json({ message: "User not found!" });

  res.send(user);
};

exports.updateProfilePicture = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");

    if (!user) return res.status(500).json({ message: "User not found!" });

    console.log("updateProfilePicture called", req.file);

    if (req.file) {
      const oldProfileUrl = user.profileUrl;
      if (oldProfileUrl) {
        const imageName = path.basename(oldProfileUrl);
        const requiredPath = path.join(__dirname, "..", "uploads", imageName);
        if (fs.existsSync(requiredPath)) {
          fs.unlink(requiredPath, (err) => console.log(err));
        }
      }

      const profileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
      user.profileUrl = profileUrl;
      await user.save();
      return res.json({ profileUrl });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Server Error!" });
  }
};

exports.verifyEmail = async (req, res) => {
  let token = await Token.findOne({ token: req.query.token });
  console.log("verifyEmail called", token);

  if (!token) {
    return res
      .status(400)
      .json({ error: "Invalid token or token may have been expired!" });
  }

  let user = await User.findById(token.userId);

  if (!user) {
    return res.status(400).json({ error: "Something went wrong" });
  }

  if (user.isVerified) {
    return res
      .status(400)
      .json({ error: "User is already verified! Login to continue" });
  }

  user.isVerified = true;
  user = await user.save();

  res.send({ message: "User Verified Successfully!" });
};

exports.resendVerification = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });

  console.log(user);

  if (!user) {
    return res.status(400).json({ error: "Email has not been registered!" });
  }

  if (user.isVerified) {
    return res
      .status(400)
      .json({ error: "User has already been verified! Login to continue" });
  }

  const token = await Token.create({
    userId: user._id,
    token: crypto.randomBytes(32).toString("hex"),
  });

  if (!token) {
    return res.status(400).json({ error: "Something went wrong!" });
  }

  let url = `http://localhost:8000/api/auth/verifyemail?token=${token.token}`;

  emailSender({
    from: "noreply@gmail.com",
    to: user.email,
    subject: "Verify Email",
    text: "Please Click on the link below to verify " + url,
    html: `<a href=${url}><button>Verify</button></a>`,
  });

  res.send({ message: "Verifcation Link has been sent to your Email!" });
};

exports.sendPasswordResetCode = async (req, res) => {
  const { email } = req.body;

  try {
    // 1. Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User with this email does not exist." });
    }

    // 2. Generate a 6-digit numeric OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // 3. Save OTP to database (linked to user)
    // We remove old tokens first so only the newest code works
    await Token.deleteMany({ userId: user._id });

    const token = await Token.create({
      userId: user._id,
      token: otp, // Storing the numeric OTP as the token
    });

    // 4. Send Email
    const mailOptions = {
      from: `"ResumeForge" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Your Password Reset Code",
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 500px; margin: auto; padding: 40px; border: 1px solid #f0f0f0; border-radius: 16px; color: #333;">
          <h2 style="font-size: 24px; font-weight: bold; margin-bottom: 20px;">Reset your password</h2>
          <p style="font-size: 16px; color: #666; line-height: 1.5;">
            Use the following verification code to reset your ResumeForge password. This code will expire in 1 hour.
          </p>
          <div style="margin: 35px 0; text-align: center;">
            <span style="font-size: 40px; font-weight: 900; letter-spacing: 8px; color: #000; background: #f4f4f4; padding: 15px 30px; border-radius: 12px; display: inline-block;">
              ${otp}
            </span>
          </div>
          <p style="font-size: 12px; color: #999; margin-top: 30px;">
            If you didn't request this code, you can safely ignore this email. Someone may have entered your email address by mistake.
          </p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
          <p style="font-size: 14px; font-weight: bold; color: #333;">ResumeForge Team</p>
        </div>
      `,
    };

    emailSender(mailOptions);

    res.status(200).json({ message: "Verification code sent to your email!" });
  } catch (error) {
    console.error("Reset Code Error:", error);
    res.status(500).json({ error: "Failed to send verification code." });
  }
};

exports.verifyPasswordResetCode = async (req, res) => {
  const { email, code } = req.body;

  try {
    // 1. Find the user first to get their ID
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // 2. Look for a valid token/code matching this user and the entered code
    // MongoDB TTL will automatically handle expired tokens, so if it's here, it's fresh.
    const validToken = await Token.findOne({
      userId: user._id,
      token: code,
    });

    if (!validToken) {
      return res.status(400).json({
        message: "Invalid or expired verification code.",
      });
    }

    // 3. Success!
    // We don't delete the token yet because we need it for the final step (updating password)
    // to prove the user actually verified their email.
    res.status(200).json({
      message: "Code verified successfully. You can now reset your password.",
      success: true,
    });
  } catch (error) {
    console.error("Verification Error:", error);
    res
      .status(500)
      .json({ message: "Internal server error during verification." });
  }
};

exports.resetPasswordFinal = async (req, res) => {
  const { email, code, newPassword } = req.body;

  try {
    // 1. Validate Input
    if (!email || !code || !newPassword) {
      return res
        .status(400)
        .json({ message: "All Email, code and new password are required." });
    }

    // 2. Find User
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // 3. Verify the token one last time
    const validToken = await Token.findOne({
      userId: user._id,
      token: code,
    });

    if (!validToken) {
      return res.status(400).json({
        message: "Session expired or invalid code. Please start over.",
      });
    }

    // 4. Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // 5. Update user password
    user.password = hashedPassword;
    await user.save();

    // 6. Security Cleanup: Delete the reset token so it can't be used again
    await Token.deleteMany({ userId: user._id });

    // 7. (Optional) Send a Confirmation Email
    // It's good practice to notify users when their password changes
    /*
    await transporter.sendMail({
      from: `"ResumeForge" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Your password has been reset",
      text: "This is a confirmation that the password for your account has been changed."
    });
    */
    emailSender({
      from: `"ResumeForge" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Your password has been reset",
      text: "This is a confirmation that the password for your account has been changed.",
    });

    res.status(200).json({
      success: true,
      message: "Password updated successfully! You can now log in.",
    });
  } catch (error) {
    console.error("Final Reset Error:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
