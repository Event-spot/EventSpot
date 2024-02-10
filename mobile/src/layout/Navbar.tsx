import {StyleSheet, Text, View, TouchableOpacity} from "react-native";
import {colors} from "../constants/colors";
import Icon from 'react-native-vector-icons/Ionicons';
import {NavigationProp, useNavigation} from "@react-navigation/native";
import {useAuth} from "../context/AuthContext";
import {Avatar, AvatarImage, Menu, MenuItem, MenuItemLabel} from '@gluestack-ui/themed';
import {useState} from "react";
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from '../Types/navigationTypes';
import { StackNavigationProp } from '@react-navigation/stack';

export default function Navbar() {
    const navigation = useNavigation<UserProfileNavigationProp>();
    const {currentUser, setCurrentUser} = useAuth();
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const handleOpen = () => {
        setIsOpen(true);
    }

    const handleClose = () => {
        setIsOpen(false);
    }

    const logout = async () => {
        await SecureStore.deleteItemAsync('jwt');
        setCurrentUser(null);
    }

    const navigateToProfile = () => {
        navigation.navigate('Users', {id: currentUser?.id})
    }

    if (currentUser) {
        return (
            <View style={styles.navbar}>
                <TouchableWithoutFeedback style={styles.link} onPress={() => navigation.navigate("Events")}>
                    <View style={styles.item}><Icon name={'car-sport'} size={35} color={colors.secondary}/></View>
                </TouchableWithoutFeedback>
                <Menu offset={10} closeOnSelect={true} onClose={handleClose} isOpen={isOpen} placement={'top'}
                       trigger={({...triggerProps}) => {
                    return (
                        <TouchableOpacity  {...triggerProps} onPress={handleOpen}>
                            <Avatar>
                                <AvatarImage source={currentUser.avatarImage}
                                             alt={`${currentUser.firstName} ${currentUser.lastName}`}/>
                            </Avatar>
                        </TouchableOpacity>
                    )
                }}>
                    <MenuItem onPress={navigateToProfile} key={'Profile'} textValue={'Profil'}><MenuItemLabel>Profil</MenuItemLabel></MenuItem>
                    <MenuItem onPress={logout} key={'LogOut'} textValue={'Wyloguj się'}><MenuItemLabel>Wyloguj
                        się</MenuItemLabel></MenuItem>
                </Menu>
                <TouchableWithoutFeedback style={styles.link} onPress={() => navigation.navigate("Users")}>
                    <View style={styles.item}><Icon name={'people-sharp'} size={35} color={colors.secondary}/></View>
                </TouchableWithoutFeedback>
            </View>
        )
    } else {
        return null;
    }


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