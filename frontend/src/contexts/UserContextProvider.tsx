import { createContext, useState } from "react";
import { Gender, Occupation } from "../types/types";

export interface UserState2 {
    id: number;
    name: string;
    gender: Gender;
    birthday: string;
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
        id: new Date().getTime(),
        name: "",
        gender: "Other",
        birthday: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
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