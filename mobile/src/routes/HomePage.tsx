import React from 'react';
import { View, Text, ImageBackground, ScrollView, StyleSheet } from 'react-native';
import InfoCard from "../components/InfoCard/InfoCard";

import React, {useEffect} from "react";
import {StyleSheet, ScrollView, ImageBackground} from "react-native";
import {useAuth} from "../context/AuthContext";
import {NavigationProp, useNavigation} from "@react-navigation/native";

export default function HomePage() {
    return (

        <ScrollView style={styles.container}>
            <View style={styles.overlaytop}>
                    <ImageBackground style={styles.bgImage} source={require('../assets/images/home_background.png')}>
                <View style={styles.content}>
                    <Text style={styles.title}>EventSpot</Text>
                    <Text style={styles.text}>Wszystkie wydarzenia w jednym miejscu.</Text>
                 </View>
                 </ImageBackground>
            </View>
            <View style={styles.overlaybottom}>
                     <InfoCard type='event'/>
            </View>

        </ScrollView>

    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },
    bgImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    overlaytop: {
        flex:1,
        minHeight:600,

    },
    overlaybottom: {
        flex:1,
        marginTop:10,
        alignItems:'center'

    },
    content: {
        marginTop: 50,
        height:150,
        justifyContent:'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    title: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
    },
    text: {
        fontSize: 18,
        fontWeight: '300',
        color: '#FFFFFF',
        textAlign: 'center',
    },
});