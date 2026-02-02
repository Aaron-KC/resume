const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const resumeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  user: {
    type: ObjectId,
    ref: "User",
    required: true,
  },
  personalInformation: {
    profileUrl: String,
    thumbnailUrl: String,
    fullName: String,
    description: String,
    summary: String,
  },
  contactInformation: {
    address: String,
    email: String,
    phoneNumber: String,
    linkedIn: String,
    github: String,
    portfolio: String,
  },
  theme: {
    template: [{
      id: {
        type: String,
        default: '01'
      },
    }],
    colorPalette: [String],
  },
  workExperience: [
    {
      company: String,
      role: String,
      startDate: Date,
      endDate: Date,
      description: String,
      currentlyWorking: {type: Boolean, default: false}
    },
  ],
  education: [
    {
      degree: String,
      institution: String,
      startDate: Date,
      endDate: Date,
      currentlyStudying: {type: Boolean, default: false}
    },
  ],
  skills: [
    {
      name: String,
      proficiency: Number,
    },
  ],
  projects: [
    {
      title: String,
      description: String,
      githubLink: String,
      demoUrl: String,
    },
  ],
  certifications: [{
    title: String,
    issuer: String,
    year: String
  }],
  additionalInfo: [{
    language: String,
    proficiency: Number
  }],
  interests: [String]
}, {timestamps: true});

module.exports = mongoose.model('Resume', resumeSchema)
