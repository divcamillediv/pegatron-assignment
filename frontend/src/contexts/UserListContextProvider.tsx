import { createContext, useState } from "react";
import { emptyUserList } from "../models/userList";
import { UserListState } from "../models/userList";

interface UserListHandler {
    userList: UserListState;
    setUserList: React.Dispatch<React.SetStateAction<UserListState>>;
}

const UserListContext = createContext<UserListHandler>(undefined as any);

const UserListContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [userList, setUserList] = useState<UserListState>(emptyUserList);
    return (
        <UserListContext.Provider value={{ userList, setUserList }}>
            {children}
        </UserListContext.Provider>
    );
};

export type { UserListHandler };
export default UserListContextProvider;




