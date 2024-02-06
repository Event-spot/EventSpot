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

const AuthContext: Context<IAuthContext | null> = createContext<IAuthContext | null>(null);

export const AuthProvider = ({children}: React.PropsWithChildren<{}>) => {
    const [currentUser, setCurrentUser] = useState<IUser | null>(null); // Dodano explicite `null` jako początkową wartość

    return (
        <AuthContext.Provider value={{currentUser, setCurrentUser}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = React.useContext(AuthContext);
    if (context === null) {
        throw new Error('useAuth musi być używany wewnątrz AuthProvider');
    }
    return context;
};