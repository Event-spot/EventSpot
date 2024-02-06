import {StatusBar} from 'expo-status-bar';
import {ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from "react";
import Header from './src/layout/Header';
import Navbar from "./src/layout/Navbar";
import {NativeRouter} from 'react-router-native'

export default function App() {
    return (
        <SafeAreaView style={styles.container}>
            {/*<StatusBar style={"dark"}/>*/}
            <Header/>
                <ImageBackground style={styles.bgImage} source={require('./src/assets/images/home_background.png')}>
            <ScrollView>

            </ScrollView>
                </ImageBackground>
            <Navbar/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    bgImage: {
        flex: 1,
        resizeMode: 'cover'
    },
});
