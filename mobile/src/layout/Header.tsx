import {StyleSheet, Text, View, TouchableOpacity } from "react-native";
import {colors} from '../constants/colors';
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from '../Types/navigationTypes';
import { StackNavigationProp } from '@react-navigation/stack';

type UserProfileNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
export default function Header() {
    const navigation = useNavigation<UserProfileNavigationProp>();
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <Text style={styles.logo}>EventSpot</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Kontakt")}>
                <Text style={styles.contact}>Kontakt</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        height: 65,
        backgroundColor: colors.white,
        shadowColor: colors.black,
        elevation: 20,
        display: "flex",
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingRight: 10,
        alignItems: 'center',
    },
    logo: {
        fontSize: 32,
        color: colors.primary,
        fontWeight: 'bold',
        marginLeft: 15
    },
    contact: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.primary,
    }
})