import {
  createContext,
  FC,
  ReactNode,
  useState,
  useEffect,
  useContext,
} from "react";
import { EditUser, User } from "../types";
import { axiosClient } from "../utils/axios";

type UserContextType = {
  users: User[];
  addUser: (newUser: User) => void;
  editUser: (id: number, partialUser: EditUser) => void;
  deleteUser: (id: number) => void;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);

  const addUser = (newUser: User) => {
    setUsers([...users, newUser]);
  };

  const fetchUser = async () => {
    const result = await axiosClient.get<User[]>("");
    const { data } = result;
    console.log(data);
    setUsers(data);
  };

  const editUser = (id: number, partialUser: EditUser) => {
    const editedUsers = users.map((item) => {
      if (item.id === id) {
        item = { ...item, ...partialUser };
      }
      return item;
    });
    setUsers(editedUsers);
  };

  const deleteUser = (id: number) => {
    const filteredUser = users.filter((item) => item.id !== id);
    setUsers(filteredUser);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ users, addUser, editUser, deleteUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error("Must be called under UserProvider");
  return context;
};
