const Resume = require("../model/resumeModel");
const fs = require("fs");
const path = require("path");

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


