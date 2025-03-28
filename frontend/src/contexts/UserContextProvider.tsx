import { createContext, useState } from "react";
import { Gender, Occupation } from "../types/types";

export interface UserState2 {
    name: string;
    gender: Gender;
    birthday: number;
    occupation: Occupation;
    phoneNumber: number;
    profilePic: File | null;
  }

interface UserHandler {
    user: UserState2;
    setUser: React.Dispatch<React.SetStateAction<UserState2>>;
}

export const UserContext = createContext<UserHandler>(undefined as any);

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserState2>({
        name: "",
        gender: "Other",
        birthday: new Date().getTime(),
        occupation: "Unemployed",
        phoneNumber: 0,
        profilePic: null,
    });

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};