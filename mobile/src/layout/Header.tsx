import {StyleSheet, Text, View} from "react-native";
import {colors} from '../constants/colors';
import {Link} from "react-router-native";

export default function Header() {
    return (
        <View style={styles.header}>
            <Link to={'/'}><Text style={styles.logo}>EventSpot</Text></Link>
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