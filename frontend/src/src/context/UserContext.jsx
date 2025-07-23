import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import UserService from "../services/users";
import TRANSLATIONS from "../translations";

const UserContext = createContext({
  userInfo: {},
  t: (key) => key,
  setUserInfo: () => {},
  loading: true,
});


export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userService = new UserService();
    userService
      .getInfo()
      .then((res) => setUserInfo(res?.data || {}))
      .catch(() => setUserInfo({}))
      .finally(() => setLoading(false));
  }, []);

  const t = useCallback(
    (key) => {
      const lang = userInfo.language || "ru";
      return TRANSLATIONS[key]?.[lang] || TRANSLATIONS[key]?.ru || key;
    },
    [userInfo]
  );

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo, t, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
