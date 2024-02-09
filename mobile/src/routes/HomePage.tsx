import React, {useEffect} from "react";
import {StyleSheet, ScrollView, ImageBackground} from "react-native";
import {useAuth} from "../context/AuthContext";
import {NavigationProp, useNavigation} from "@react-navigation/native";

export default function HomePage(){
    return (
        <ImageBackground style={styles.bgImage} source={require('../assets/images/home_background.png')}>
            <ScrollView>
            </ScrollView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    bgImage: {
        flex: 1,
        resizeMode: 'cover'
    },
})