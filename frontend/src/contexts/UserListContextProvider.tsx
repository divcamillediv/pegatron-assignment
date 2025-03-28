import { createContext, useState } from "react";
import { UserState2 } from "../contexts/UserContextProvider";

interface UserListHandler {
    userList: UserState2[];
    setUserList: React.Dispatch<React.SetStateAction<UserState2[]>>;
}

export const UserListContext = createContext<UserListHandler>(undefined as any);

const UserListContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [userList, setUserList] = useState<UserState2[]>([]);
    return (
        <UserListContext.Provider value={{ userList, setUserList }}>
            {children}
        </UserListContext.Provider>
    );
};

export type { UserListHandler };
export default UserListContextProvider;




