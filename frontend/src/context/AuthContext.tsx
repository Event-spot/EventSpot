'use client'
import React, {Context, createContext, useState} from "react";


interface IAuthContext {
    currentUser: IUser | null;
    setCurrentUser: React.Dispatch<React.SetStateAction<IUser | null>>;
}

interface IUser {
    id: number;
    firstName: string;
    lastName: string;
    avatarImage: string;
}

const AuthContext: Context<IAuthContext | null> = createContext<IAuthContext | {}>({});

export const AuthProvider = ({children}: React.PropsWithChildren) => {
    const [currentUser, setCurrentUser] = useState<IUser | null>();

    return (
        <AuthContext.Provider value={{currentUser, setCurrentUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => React.useContext(AuthContext);