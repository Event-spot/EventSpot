import HomePage from "../routes/HomePage";
import Events from "../routes/Events";
import Users from "../routes/Users";
import Login from "../routes/Login";
import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {useAuth} from "../context/AuthContext";
import Register from "../routes/Register";
import UserProfile from "../routes/UserProfile";
import Kontakt from "../routes/Kontakt";
import CreateEvent from "../routes/CreateEvent";
import EventDetails from "../routes/EventDetails";

export default function Navigation() {
    const Stack = createNativeStackNavigator();
    const {currentUser} = useAuth();

    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            {currentUser ? (
                <>
                    <Stack.Screen name="Home" component={HomePage}/>
                    <Stack.Screen name="Events" component={Events}/>
                    <Stack.Screen name="Users" component={Users}/>
                    <Stack.Screen name="UserProfile" component={UserProfile}/>
                    <Stack.Screen name="Kontakt" component={Kontakt}/>
                    <Stack.Screen name="CreateEvent" component={CreateEvent}/>
                    <Stack.Screen name="EventDetails" component={EventDetails}/>
                </>
            ) : (
                <>
                    <Stack.Screen name="Login" component={Login}/>
                    <Stack.Screen name="Register" component={Register}/>
                </>
            )}
        </Stack.Navigator>
    )
}