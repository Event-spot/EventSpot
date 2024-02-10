import React from "react";
import {SafeAreaView, StyleSheet, AppRegistry, StatusBar} from 'react-native';
import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";
import {NavigationContainer} from '@react-navigation/native';
import Header from './src/layout/Header';
import Navbar from "./src/layout/Navbar";
import {AuthProvider} from "./src/context/AuthContext";
import Navigation from "./src/navigation/Navigation";
import AuthorizationCheck from "./src/utils/AuthorizationCheck";
import {config} from '@gluestack-ui/config';
import {GluestackUIProvider} from "@gluestack-ui/themed";

const client = new ApolloClient({
    uri: 'http://192.168.0.49:3001/graphql',
    cache: new InMemoryCache(),
})

export default function App() {
    return (
        <AuthProvider>
            <ApolloProvider client={client}>
                <GluestackUIProvider config={config}>
                    <AuthorizationCheck>
                        <StatusBar barStyle="light-content"/>
                        <SafeAreaView style={styles.container}>
                            <NavigationContainer>
                                <Header/>
                                <Navigation/>
                                <Navbar/>
                            </NavigationContainer>
                        </SafeAreaView>
                    </AuthorizationCheck>
                </GluestackUIProvider>
            </ApolloProvider>
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