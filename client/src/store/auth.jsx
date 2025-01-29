import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState([]);
  const authorizationToken = `Bearer ${token}`;

  console.log("user from auth", user);
  console.log("services from aut", services);


// const API = import.meta.env.VITE_APP_URI_API;

  //function to stored the token in local storage
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("token", serverToken);
  };

  //   this is the get the value in either true or false in the original state of token
  let isLoggedIn = !!token;
  console.log("token", token);
  console.log("isLoggedin ", isLoggedIn);

  //   to check whether is loggedIn or not
  const LogoutUser = () => {
    setToken("");
    return localStorage.removeItem("token");
  };

  // function to check the user Authentication or not
  const userAuthentication = async () => {
    try {
      setIsLoading(true);
      // `${API}/api/auth/user`   add  this when doing live replac this keyword 
      const response = await fetch("http://localhost:5000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("dAAAAA", data);

        console.log("userData", data.userData);

        // our main goal is to get the user data 👇
        setUser(data.userData);
        setIsLoading(false);
      } else{
        console.log("error fetching user data");
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get servce data

  const getServiceData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/data/service", {
        method: "GET",
      });
      console.log("resssss", response);

      if (response.ok) {
        const data = await response.json();
        console.log("dataaaaaa", data);

        setServices(data.msg);
      }
      console.log("service", response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getServiceData();
    userAuthentication();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        storeTokenInLS,
        LogoutUser,
        user,
        services,
        authorizationToken,
        isLoading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};
