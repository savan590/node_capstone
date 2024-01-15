// import React, { createContext, useContext, useState } from "react";

// const SelectedContext = createContext();

// export const useLogin = () => {
//   return useContext(SelectedContext);
// };

// export const SelectedProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(!!window.localStorage.getItem("user"))
//   return (
//     <SelectedContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
//       {children}
//     </SelectedContext.Provider>
//   );
// };


// context.js
import React, { createContext, useContext, useState } from "react";

const SelectedContext = createContext();

export const useLogin = () => {
  return useContext(SelectedContext);
};

export const SelectedProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!window.localStorage.getItem("user");
  });

  const login = () => setIsLoggedIn(true);
  const logout = () => {
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("name");
    window.localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <SelectedContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </SelectedContext.Provider>
  );
};



