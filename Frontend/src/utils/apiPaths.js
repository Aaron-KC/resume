export const BASE_URL = "http://localhost:8000/api/";

export const API_PATHS = {
  AUTH: {
    LOGIN: "/auth/login",
    GET_USER: "/auth/getuser",
    REGISTER: "/auth/register",
  },
  RESUME: {
    GETRESUMEBYUSER: "/resume/getresumebyuser",
    CREATE_RESUME: "/resume/createresume",
    GET_RESUME_BY_ID: "/resume/getresumebyid/",
    UPLOAD_RESUME_IMAGES: "/resume/uploadresumeimages/",
    UPDATE_RESUME: "/resume/updateresume/",
    DELETE_RESUME: "/resume/deleteresume/",
  },
};
