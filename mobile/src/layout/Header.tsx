import {StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {colors} from '../constants/colors';
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {useAuth} from "../context/AuthContext";


export default function Header() {
    const navigation: NavigationProp<any> = useNavigation();
    const {currentUser} = useAuth();

    if(currentUser) {
        return (
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                    <Text style={styles.logo}>EventSpot</Text>
                </TouchableOpacity>
            </View>
        )
    } else {
        return null;
    }

}

const styles = StyleSheet.create({
    header: {
        height: 65,
        backgroundColor: colors.white,
        shadowColor: colors.black,
        elevation: 20,
        display: "flex",
        justifyContent: 'center'
    },
    logo: {
        fontSize: 32,
        color: colors.primary,
        fontWeight: 'bold',
        marginLeft: 15
    }
})