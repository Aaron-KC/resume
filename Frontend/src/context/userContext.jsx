import { createContext, useEffect, useState } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

export const userContext= createContext()

export const UserContextProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accessToken = localStorage.getItem('token');

    if(!accessToken) {
      setUser(null);
      setLoading(false);
      return;
    }
  const fetchUser = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.AUTH.GET_USER);
      console.log(res);
      if(res.data) {
        setUser(res.data)        
      }
    } catch(err) {
      if(err.response && err.response.data) {
        console.error(err.response.data.message)
      } else {
       console.error('Something Went Wrong!')
      }
    } finally{
      setLoading(false);
    }
  }
  fetchUser()
  }, [])

  const updateUser = async (userInfo, callback) => {
    try {
      const res = await axiosInstance.post(API_PATHS.AUTH.LOGIN, userInfo);
      console.log(res)
      if(res.data) {
        setUser(res.data)
        localStorage.setItem('token', res.data.token);
        callback('/dashboard');
      }
    } catch(err) {
      if(err.response && err.response.data) {
        setErr(err.response.data.message);
      } else {
        setErr('Something Went Wrong!');
      }
    }
  }
  
  return <userContext.Provider value={{updateUser, user, err, loading, setUser}}>
    {children}
  </userContext.Provider>
}