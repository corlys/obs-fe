import { createContext, FC, ReactNode, useState, useEffect } from "react";
import { EditUser, User, CreateUser } from "@/types";
import { axiosClient } from "@/lib/utils";

type UserContextType = {
  users: User[];
  addUser: (value: CreateUser) => void;
  editUser: (id: number, value: EditUser) => void;
  deleteUser: (id: number) => void;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);

  const addUser = (value: CreateUser) => {
    const Ids = users.map((item) => item.id);
    const maxId = Math.max(...Ids);
    setUsers([{ ...value, id: maxId + 1 }, ...users]);
  };

  const fetchUser = async () => {
    const result = await axiosClient.get<User[]>("");
    const { data } = result;
    setUsers(data);
  };

  const editUser = (id: number, value: EditUser) => {
    const editedUsers = users.map((item) => {
      if (item.id === id) {
        item = { ...item, ...value };
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
