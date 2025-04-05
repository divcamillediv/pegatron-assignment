import { createContext, useState } from "react";
import { Gender, Occupation } from "../types/types";

export interface UserState2 {
    _id: string;
    name: string;
    gender: Gender;
    birthday: string;
    occupation: Occupation;
    phoneNumber: string;
    profilePic: string;
  }

interface UserHandler {
    user: UserState2;
    setUser: React.Dispatch<React.SetStateAction<UserState2>>;
    isBeingEdited: UserState2 | null;
    setIsBeingEdited: React.Dispatch<React.SetStateAction<UserState2 | null>>;
}

export const UserContext = createContext<UserHandler>(undefined as any);

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserState2>({
        _id: "",
        name: "",
        gender: "Male",
        birthday: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
        occupation: "Student",
        phoneNumber: "",
        profilePic: "0default.jpg",
    });

    const [isBeingEdited, setIsBeingEdited] = useState<UserState2 | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser, isBeingEdited, setIsBeingEdited }}>
            {children}
        </UserContext.Provider>
    );
};