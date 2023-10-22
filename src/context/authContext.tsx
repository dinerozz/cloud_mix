import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  FC,
} from "react";

const initialState = {
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  isInitialized: false,
  setUser: (userInfo: TUserInfo) => {},
  userInfo: {
    id: "",
    username: "",
  },
};

export const AuthContext = createContext(initialState);

type TAuthContextProvider = {
  children: ReactNode;
};

type TUserInfo = { id: string; username: string };

export const AuthProvider: FC<TAuthContextProvider> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<TUserInfo>(initialState.userInfo);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("AUTH_TOKEN");

    if (token) {
      setIsLoggedIn(true);
    }
    setIsInitialized(true);
  }, []);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const setUser = (userInfo: TUserInfo) => {
    setUserInfo(userInfo);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, setUser, userInfo, isInitialized }}
    >
      {children}
    </AuthContext.Provider>
  );
};
