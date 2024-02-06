import {StyleSheet, Text, View} from "react-native";
import {colors} from '../constants/colors';

export default function Header() {
    return (
        <View style={styles.header}>
            <Text style={styles.logo}>EventSpot</Text>
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
        justifyContent: 'center'
    },
    logo: {
        fontSize: 32,
        color: colors.primary,
        fontWeight: 'bold',
        marginLeft: 15
    }
})