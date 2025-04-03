import { createContext, useEffect, useState } from "react";
import { UserState2 } from "../contexts/UserContextProvider";

interface UserListHandler {
    userList: UserState2[];
    setUserList: React.Dispatch<React.SetStateAction<UserState2[]>>;
}

const emptyUserList: UserState2[] = [];

export const UserListContext = createContext<UserListHandler>(undefined as any);

const UserListContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [userList, setUserList] = useState<UserState2[]>(emptyUserList);

    useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await fetch("http://localhost:3000/users");
            if (response.ok) {
              const data = await response.json();
              setUserList(data); // Set users from backend
            } else {
              console.error("Failed to fetch users");
            }
          } catch (error) {
            console.error("Error:", error);
          }
        };
      
        fetchUsers();
      }, []);

    return (
        <UserListContext.Provider value={{ userList, setUserList }}>
            {children}
        </UserListContext.Provider>
    );
};

export type { UserListHandler };
export default UserListContextProvider;




