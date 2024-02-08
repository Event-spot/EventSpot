import {StyleSheet, Text, View, TouchableOpacity} from "react-native";
import {colors} from "../constants/colors";
import Icon from 'react-native-vector-icons/Ionicons';
import { Avatar } from '@rneui/themed';
import { useNavigation } from "@react-navigation/native";

export default function Navbar() {
    const navigation = useNavigation();

    return(
        <View style={styles.navbar}>
            <TouchableOpacity style={styles.link} onPress={() => navigation.navigate("Events")}>
            <View style={styles.item}><Icon name={'car-sport'} size={35} color={colors.secondary}/></View>
            </TouchableOpacity>
            <View style={styles.item}><Avatar size={45}
                                              icon={{ name: "pencil", type: "font-awesome" }}
                                              containerStyle={{ backgroundColor: colors.darkGray }}
            rounded/></View>
            <TouchableOpacity style={styles.link} onPress={() => navigation.navigate("Users")}>
            <View style={styles.item}><Icon name={'people-sharp'} size={35} color={colors.secondary}/></View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    navbar: {
        height: 50,
        borderTopColor: colors.black,
        borderTopWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    item: {
        width: 70,
        display: "flex",
        justifyContent: 'center',
        alignItems: 'center'
    },
    link: {
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
})