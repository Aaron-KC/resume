import { createContext, useEffect, useState } from "react";
import { axiosInstance } from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

export const userContext = createContext()

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.AUTH.GET_USER);
      if (res.data) {
        setUser(res.data)
      }
    } catch (e) {
      if (err.response && err.response.data) {
        console.error(err.response.data.message)
      } else {
        console.error('Something Went Wrong!')
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const accessToken = localStorage.getItem('token');

    if (!accessToken) {
      setUser(null);
      setLoading(false);
      return;
    }
    fetchUser()
  }, [])

  const updateUser = async (userInfo, callback) => {
    try {
      const res = await axiosInstance.post(API_PATHS.AUTH.LOGIN, userInfo);
      if (res.data) {
        setUser(res.data)
        localStorage.setItem('token', res.data.token);
        callback('/dashboard');
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setErr(err.response.data.message);
        setError(err.response.data);
      } else {
        setErr('Something Went Wrong!');
      }
    }
  }

  return <userContext.Provider value={{ updateUser, user, err, loading, setUser, fetchUser, error }}>
    {children}
  </userContext.Provider>
}