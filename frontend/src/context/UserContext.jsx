import { Children, createContext } from "react";

const UserContext = createContext();
export const UserProvider = ({children}) => {
  return <UserContext.Provider value={{user:"sss"}}>{children}</UserContext.Provider>;
};
export default UserContext;
