import React from "react";
import {SafeAreaView, StyleSheet, AppRegistry, StatusBar} from 'react-native';
import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Header from './src/layout/Header';
import HomePage from "./src/routes/HomePage";
import Events from "./src/routes/Events";
import Users from './src/routes/Users';
import Navbar from "./src/layout/Navbar";
import {AuthProvider} from "./src/context/AuthContext";
import Navigation from "./src/navigation/Navigation";
import AuthorizationCheck from "./src/utils/AuthorizationCheck";
import {config} from '@gluestack-ui/config';
import {GluestackUIProvider} from "@gluestack-ui/themed";
import UserProfile from "./src/routes/UserProfile";
import Kontakt from "./src/routes/Kontakt";
import EventDetails from "./src/routes/EventDetails";
import {RootStackParamList} from './src/Types/navigationTypes';
import CreateEvent from "./src/routes/CreateEvent";

const Stack = createNativeStackNavigator<RootStackParamList>();
const client = new ApolloClient({
    uri: 'http://192.168.0.38:3001/graphql',
    cache: new InMemoryCache(),
})
export default function App() {
    return (
        <AuthProvider>
            <GluestackUIProvider config={config}>
                <ApolloProvider client={client}>
                    <StatusBar barStyle="light-content"/>
                    <SafeAreaView style={styles.container}>
                        <NavigationContainer>
                            <Header/>
                            <Navigation/>
                            <Navbar/>
                        </NavigationContainer>
                    </SafeAreaView>
                </ApolloProvider>
            </GluestackUIProvider>
        </AuthProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

AppRegistry.registerComponent('EventSpot', () => App);