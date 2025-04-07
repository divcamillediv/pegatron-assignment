import { createContext, useState } from "react";
import { Gender, Occupation } from "../types/types";

export interface UserState {
    _id: string;
    name: string;
    gender: Gender;
    birthday: string;
    occupation: Occupation;
    phoneNumber: string;
    profilePic: string;
  }

interface UserHandler {
    user: UserState;
    setUser: React.Dispatch<React.SetStateAction<UserState>>;
    isBeingEdited: UserState | null;
    setIsBeingEdited: React.Dispatch<React.SetStateAction<UserState | null>>;
}

export const UserContext = createContext<UserHandler>(undefined as any);

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserState>({
        _id: "",
        name: "",
        gender: "Male",
        birthday: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
        occupation: "Student",
        phoneNumber: "",
        profilePic: "0default.jpg",
    });

    const [isBeingEdited, setIsBeingEdited] = useState<UserState | null>(null);

    return (
        <UserContext.Provider value={{ user, setUser, isBeingEdited, setIsBeingEdited }}>
            {children}
        </UserContext.Provider>
    );
};