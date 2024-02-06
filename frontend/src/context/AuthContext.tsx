'use client'
import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from "react";

interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    avatarImage: string;
}

interface IAuthContext {
    currentUser: IUser | null;
    setCurrentUser: Dispatch<SetStateAction<IUser | null>>;
}

const AuthContext = createContext<IAuthContext | null>(null);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [currentUser, setCurrentUser] = useState<IUser | null>(null);

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (context === null) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
