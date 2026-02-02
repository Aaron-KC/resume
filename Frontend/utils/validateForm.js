function isFilled(obj) {
  return Object.entries(obj)
    .filter(([key]) => key !== "_id") // ignore _id
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

  // Regex Patterns
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // Flexible phone regex: matches +optional, country codes, spaces, dashes, and parens
  const phoneRegex =
    /^\+?[0-9]{1,4}?[-.\s]?\(?[0-9]{1,3}?\)?[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,9}$/;

  // Step 0: Personal Information (Full Name only)
  if (!formData.personalInformation.fullName?.trim()) {
    errors.push("Please enter your full name.");
  } else {
    errors.push(null);
  }

  // Step 1: Contact Information (Email and Phone with Regex)
  const email = formData.contactInformation.email?.trim();
  const phone = formData.contactInformation.phoneNumber?.trim();

  if (!email || !emailRegex.test(email)) {
    errors.push("Please enter a valid email address.");
  } else if (!phone || !phoneRegex.test(phone)) {
    errors.push("Please enter a valid phone number (e.g., +977 9812345678).");
  } else {
    errors.push(null);
  }

  // Step 2: Work Experience (Start Date and conditional End Date)
  // Step 2: Work Experience (Start Date < End Date)
  // Step 2: Work Experience (Optional but must be logical if filled)
  const validWork = formData.workExperience.every((exp) => {
    const start = exp.startDate ? new Date(exp.startDate) : null;
    const end = exp.endDate ? new Date(exp.endDate) : null;

    // 1. If both fields are empty, it's valid (optional)
    if (!start && !end) return true;

    // 2. If it's a current job, we just need the start date to be a real date (if provided)
    if (exp.currentlyWorking) {
      return start ? !isNaN(start.getTime()) : true;
    }

    // 3. If both exist, check that start is before end
    if (start && end && !isNaN(start.getTime()) && !isNaN(end.getTime())) {
      return start <= end;
    }

    // 4. If only one exists or dates are malformed, it's still valid based on "optional"
    // but usually, you want a start if there is an end.
    // Let's keep it simple: only fail if start > end.
    return true;
  });

  errors.push(
    validWork ? null : "Work start date cannot be later than the end date.",
  );

  // Step 3: Education (Start Date < End Date)
  const validEdu = formData.education.every((edu) => {
    const start = edu.startDate ? new Date(edu.startDate) : null;
    const end = edu.endDate ? new Date(edu.endDate) : null;

    // 1. If both fields are empty, it's valid (optional)
    if (!start && !end) return true;

    // 2. If it's a current job, we just need the start date to be a real date (if provided)
    if (edu.currentlyStudying) {
      return start ? !isNaN(start.getTime()) : true;
    }

    // 3. If both exist, check that start is before end
    if (start && end && !isNaN(start.getTime()) && !isNaN(end.getTime())) {
      return start <= end;
    }

    // 4. If only one exists or dates are malformed, it's still valid based on "optional"
    // but usually, you want a start if there is an end.
    // Let's keep it simple: only fail if start > end.
    return true;
  });

  errors.push(
    validEdu ? null : "Education start date cannot be later than the end date.",
  );

  // Steps 4-9: No validation required
  for (let i = 4; i <= 9; i++) errors.push(null);

  return errors;
}
