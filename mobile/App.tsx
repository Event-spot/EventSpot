import {StatusBar} from 'expo-status-bar';
import {AppRegistry, SafeAreaView, StyleSheet} from 'react-native';
import React from "react";
import Header from './src/layout/Header';
import Navbar from "./src/layout/Navbar";
import {NativeRouter, Route, Routes,} from 'react-router-native'
import HomePage from "./src/routes/HomePage";
import Events from "./src/routes/Events";
import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";
import {apolloDevToolsInit} from 'react-native-apollo-devtools-client';


const client = new ApolloClient({
    uri: 'http://localhost:3001/graphql',
    cache: new InMemoryCache(),
})

apolloDevToolsInit(client);
export default function App() {
    return (
        <ApolloProvider client={client}>
        <SafeAreaView style={styles.container}>
            {/*<StatusBar style={"dark"}/>*/}
            <NativeRouter>
            <Header/>
                <Routes>
                    <Route path={'/'} element={<HomePage/>}/>
                    <Route path={'/events'} element={<Events/>}/>
                </Routes>
            <Navbar/>
            </NativeRouter>
        </SafeAreaView>
        </ApolloProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

AppRegistry.registerComponent('EventSpot', () => App);