import { useContext } from "react";
import { UserContext } from "../context/userContext";

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error("Must be called under UserProvider");
  return context;
};
