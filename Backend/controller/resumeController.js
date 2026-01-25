const Resume = require("../model/resumeModel");
const fs = require("fs");
const path = require("path");
const upload = require("../utils/upload.js");

exports.createResume = async (req, res) => {
  const { title } = req.body;
  const user = req.user;

  console.log(user);
  if (!title) return res.status(400).json({ message: "Title is required!" });

  if (!user) return res.status(401).json({ message: "User not logged In!" });

  const resume = await Resume.create({
    title,
    user: user.userId,
    personalInformation: {
      profileUrl: "",
      fullName: "",
      description: "",
      summary: "",
      thumbnailUrl: ""
    },
    contactInformation: {
      address: "",
      email: "",
      phoneNumber: "",
      linkedIn: "",
      github: "",
      portfolio: "",
    },
    theme: {
      template: [],
      colorPalette: [],
    },
    workExperience: [
      {
        company: "",
        role: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ],
    education: [
      {
        degree: "",
        institution: "",
        startDate: "",
        endDate: "",
      },
    ],
    skills: [
      {
        name: "",
        proficiency: "",
      },
    ],
    projects: [
      {
        title: "",
        description: "",
        githubLink: "",
        demoUrl: "",
      },
    ],
    certifications: [
      {
        title: "",
        issuer: "",
        year: "",
      },
    ],
    additionalInfo: [
      {
        language: "",
        proficiency: "",
      },
    ],
    interests: [],
  });

  if (!resume)
    return res.status(400).json({ message: "Something Went Wrong!" });

  res.json(resume);
};

exports.updateResume = async (req, res) => {
  const resume = await Resume.findById(req.params.resumeId);
  if (!resume) return res.status(400).json({ error: "Something Went Wrong!" });

console.log('resume up', resume)
  let profileImg = resume.personalInformation.profileUrl;
    if (profileImg && !req.body.personalInformation.profileUrl) {
      const filename = path.basename(profileImg);
      console.log(filename)
      if(filename) {
        const filepath = path.join(__dirname, "..", "uploads", filename);
        console.log(filepath)
        if (fs.existsSync(filepath)) {
          fs.unlinkSync(filepath);
        }
      }
    }

  Object.assign(resume, req.body);

  await resume.save();

  return res.json(resume);
};

exports.getAllResumes = async (req, res) => {
  const user = req.user;
  if (!user) return res.status(401).json({ message: "User not logged In!" });

  const resumes = await Resume.find();

  if (!resumes)
    return res.status(400).json({ message: "Something Went Wrong!" });

  res.send(resumes);
};

exports.getResumeById = async (req, res) => {
  const { resumeId } = req.params;

  const resume = await Resume.findById(resumeId);

  if (!resume)
    return res.status(400).json({ message: "Something Went Wrong!" });

  res.send(resume);
};

exports.getResumesByUser = async (req, res) => {
  const user = req.user;

  const resume = await Resume.find({ user: user.userId });

  if (!resume)
    return res.status(400).json({ message: "Something Went Wrong!" });

  res.send(resume);
};

exports.deleteResume = async (req, res) => {
  console.log("delete called", req.params.resumeId)
  const user = req.user;

  const resume = await Resume.findOneAndDelete({
    _id: req.params.resumeId,
    user: user.userId,
  });

  if (!resume) {
    return res.status(400).json({ message: "Resume could not be found!" });
  }

  const { profileUrl, thumbnailUrl } = resume.personalInformation;

  if (profileUrl) {
    const imageName = path.basename(profileUrl);
    const requiredPath = path.join(__dirname, "..", "uploads", imageName);
    if (fs.existsSync(requiredPath)) {
      fs.unlink(requiredPath, err => console.log(err));
    }
  }

  if(thumbnailUrl) {
    const imageName = path.basename(thumbnailUrl);
    const requiredPath = path.join(__dirname, "..", "uploads", imageName);
    if (fs.existsSync(requiredPath)) {
      fs.unlink(requiredPath, err => console.log(err));
    }
  }

  return res.json({ message: "Resume Deleted Successfully!" });
};

exports.uploadResumeImages = async (req, res) => {
  const { resumeId } = req.params;

  const resume = await Resume.findById(resumeId);

  if (!resume)
    return res.status(400).json({ message: "Something Went Wrong!" });
  // console.log(req)
  if(req.files?.profilePic) {
    let profileImg = resume.personalInformation.profileUrl;
    if (profileImg) {
      const filename = path.basename(profileImg);
      const filepath = path.join(__dirname, "..", "uploads", filename);
  
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
    }
    const newfilename = req.files?.profilePic[0].filename;
    const newLink = `${req.protocol}://${req.get('host')}/uploads/${newfilename}`

    resume.personalInformation.profileUrl = newLink
  }
  console.log(req.files)

  if(req.files?.thumbnailPic) {
    let thumbnail = resume.personalInformation.thumbnailUrl;
    if (thumbnail) {
      const filename = path.basename(thumbnail);
      const filepath = path.join(__dirname, "..", "uploads", filename);
  
      if (fs.existsSync(filepath)) {
        fs.unlinkSync(filepath);
      }
    }
    const newfilename = req.files?.thumbnailPic[0].filename;
    const newLink = `${req.protocol}://${req.get('host')}/uploads/${newfilename}`

    resume.personalInformation.thumbnailUrl = newLink
  }
  console.log(resume)
  resume.save()
  res.json(resume)
};

