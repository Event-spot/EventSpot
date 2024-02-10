import React, {useEffect} from "react";
import axios from "axios";
import {useAuth} from "../src/context/AuthContext";

export default function AuthorizationCheck({children}: React.PropsWithChildren) {
    const {setCurrentUser} = useAuth();


    useEffect(() => {
        axios.get('http://localhost:3001/auth/verify').then(response => {
            if(response.data.user){
                setCurrentUser(response.data.user);
            }
        })
    }, [])

    return (
        <>
        {children}
        </>
    )
}