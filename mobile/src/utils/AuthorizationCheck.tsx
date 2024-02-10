import React, {useEffect} from "react";
import axios from "axios";
import {useAuth} from "../context/AuthContext";
import * as SecureStore from 'expo-secure-store';
import {View} from "react-native";

export default function AuthorizationCheck({children}: React.PropsWithChildren) {
    const {setCurrentUser} = useAuth();

    useEffect(() => {
        const verifyUser = async () => {
            const api = axios.create({
                baseURL: 'http://192.168.0.38:3001'
            });

            const token = await SecureStore.getItemAsync('jwt');
            if(token){
                api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            } else {
                delete api.defaults.headers.common['Authorization'];
            }

            try {
                const userData = await axios.get('http://192.168.0.38:3001/auth/verify').catch(error => {
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
    }, []);


    return(
        <>
        {children}
        </>
    )
}