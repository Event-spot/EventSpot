import {StyleSheet, Text, View} from "react-native";
import {colors} from "../constants/colors";
import Icon from 'react-native-vector-icons/Ionicons';
import { Avatar } from '@rneui/themed';
import {Link} from 'react-router-native';

export default function Navbar() {
    return(
        <View style={styles.navbar}>
            <Link style={styles.link} to={'/events'}><View style={styles.item}><Icon name={'car-sport'} size={35} color={colors.secondary}/></View></Link>
            <View style={styles.item}><Avatar size={45}
                                              icon={{ name: "pencil", type: "font-awesome" }}
                                              containerStyle={{ backgroundColor: colors.darkGray }}
            rounded/></View>
            <View style={styles.item}><Icon name={'people-sharp'} size={35} color={colors.secondary}/></View>
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