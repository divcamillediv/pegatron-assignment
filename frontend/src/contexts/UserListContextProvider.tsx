import { createContext, useState } from "react";
import { UserState2 } from "../contexts/UserContextProvider";
import { loadState } from "../localStorage";

interface UserListHandler {
    userList: UserState2[];
    setUserList: React.Dispatch<React.SetStateAction<UserState2[]>>;
}

const emptyUserList: UserState2[] = [];

// const currentUserList: UserState2[] = loadState();

export const UserListContext = createContext<UserListHandler>(undefined as any);

const UserListContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [userList, setUserList] = useState<UserState2[]>(emptyUserList);

    return (
        <UserListContext.Provider value={{ userList, setUserList }}>
            {children}
        </UserListContext.Provider>
    );
};

export type { UserListHandler };
export default UserListContextProvider;




