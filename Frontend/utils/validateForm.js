function isFilled(obj) {
  return Object.entries(obj)
    .filter(([key]) => key !== "_id")  // ignore _id
    .some(([_, value]) => {
      if (value === null || value === undefined) return false;
      if (typeof value === "string") return value.trim() !== "";
      if (typeof value === "number") return true;
      if (Array.isArray(value)) return value.length > 0;
      return Boolean(value);
    });
}

export function getValidationErrors(formData) {
  const errors = [];

  // Step 0: Personal Information (required)
  if (
    !formData.personalInformation.fullName?.trim() ||
    !formData.personalInformation.description?.trim() ||
    !formData.personalInformation.summary?.trim()
  ) {
    errors.push("Please complete your personal information.");
  } else {
    errors.push(null);
  }

  // Step 1: Contact Information (required)
  if (
    !formData.contactInformation.email?.trim() ||
    !formData.contactInformation.phoneNumber?.trim()
  ) {
    errors.push("Please enter your email and phone number.");
  } else {
    errors.push(null);
  }

  // Step 2: Work Experience (at least one complete required)
  const validWork = formData.workExperience.some(exp =>
    exp.company?.trim() &&
    exp.role?.trim() &&
    exp.startDate?.trim() &&
    exp.endDate?.trim() &&
    exp.description?.trim()
  );
  errors.push(validWork ? null : "Please provide at least one complete work experience.");

  // Step 3: Education (at least one complete required)
  const validEdu = formData.education.some(edu =>
    edu.degree?.trim() &&
    edu.institution?.trim() &&
    edu.startDate?.trim() &&
    edu.endDate?.trim()
  );
  errors.push(validEdu ? null : "Please provide at least one complete education entry.");

  // Step 4: Skills (at least one complete required)
  const validSkill = formData.skills.some(skill =>
    skill.name?.trim() !== "" &&
    typeof skill.proficiency === "number" &&
    !isNaN(skill.proficiency)
  );
  errors.push(validSkill ? null : "Please add at least one skill with proficiency.");

  // Step 5: Projects (at least one complete required)
  const validProject = formData.projects.some(project =>
    project.title?.trim() &&
    project.description?.trim()
  );
  errors.push(validProject ? null : "Please provide at least one complete project.");

  // Step 6: Certifications (at least one complete required)
  const validCert = formData.certifications.some(cert =>
    cert.title?.trim() &&
    cert.issuer?.trim() &&
    cert.year?.trim()
  );
  errors.push(validCert ? null : "Please provide at least one complete certification.");

  // Step 7: Additional Info (Languages) (at least one complete required)
  const validLang = formData.additionalInfo.some(info =>
    info.language?.trim() &&
    (typeof info.proficiency === "number" || (typeof info.proficiency === "string" && info.proficiency.trim() !== ""))
  );
  errors.push(validLang ? null : "Please provide at least one language with proficiency.");

  // Step 8: Interests (at least one interest required)
  const validInterest = Array.isArray(formData.interests) && formData.interests.length > 0;
  errors.push(validInterest ? null : "Please add at least one interest.");

  // Step 9: Theme (optional)
  errors.push(null); // always valid

  return errors;
}
