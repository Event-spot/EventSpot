'use client'
import React, {useEffect} from "react";
import {useAuth} from "@/context/AuthContext";
import axios from "axios";

export default function AuthorizationCheck({children}: React.PropsWithChildren) {
    const {currentUser, setCurrentUser} = useAuth();

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const userData = await axios.get('http://localhost:3001/auth/verify', {withCredentials: true}).catch(error => {
                    console.log(error);
                });
                if (userData) {
                    setCurrentUser(userData.data.user);
                }
            } catch (error) {
                return null;
            }
        }

        verifyUser();
    }, [])

    return (
        <div>
            {children}
        </div>
    )
}