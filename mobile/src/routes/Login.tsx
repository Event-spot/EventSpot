import {
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
    Text,
    ScrollView,
    ImageBackground,
    KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard
} from "react-native";
import React, {useState} from "react";
import {Controller} from "react-hook-form";
import {useForm} from 'react-hook-form';
import {colors} from "../constants/colors";
import Svg, {Path} from 'react-native-svg';
import axios from "axios";
import {useAuth} from "../context/AuthContext";
import * as SecureStore from 'expo-secure-store';
import {NavigationProp, useNavigation} from "@react-navigation/native";

type FormData = {
    email: string;
    password: string;
}

export default function Login() {
    const {control, handleSubmit} = useForm<FormData>();
    const [isFocused, setIsFocused] = useState({email: false, password: false});
    const {setCurrentUser} = useAuth();
    const navigation: NavigationProp<any> = useNavigation();

    const onSubmit = async (data: FormData) => {
        await axios.post('http://192.168.0.38:3001/auth/login', {email: data.email, password: data.password})
            .then(async response => {
                await SecureStore.setItemAsync('jwt', response.data.access_token);
                setCurrentUser(response.data.user)
            });
    };

    const handleFocus = (field: string) => {
        setIsFocused({...isFocused, [field]: true});
    };

    const handleBlur = (field: string) => {
        setIsFocused({...isFocused, [field]: false});
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>
                    <Svg style={styles.svgTop} width={'100%'} height={200}>
                        <Path translateX={-550} fill="#8A5FC0" fill-opacity="1"
                              d="M0,288L60,266.7C120,245,240,203,360,160C480,117,600,75,720,90.7C840,107,960,181,1080,213.3C1200,245,1320,235,1380,229.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"/>
                    </Svg>
                    <ImageBackground style={styles.bgImage} source={require('../assets/images/loginBackground.png')}>
                        <View style={styles.loginBox}>
                            <Text style={styles.loginTitle}>Zaloguj się</Text>
                            <Controller
                                control={control}
                                render={({field: {onChange, onBlur, value}}) => (
                                    <TextInput
                                        style={[
                                            styles.input,
                                            isFocused.email ? styles.focused : styles.notFocused
                                        ]}
                                        onBlur={() => {
                                            onBlur();
                                            handleBlur('email');
                                        }}
                                        onChangeText={onChange}
                                        value={value}
                                        onFocus={() => handleFocus('email')}
                                        placeholder="Email"
                                        placeholderTextColor={colors.lightGray}
                                    />
                                )}
                                name="email"
                                rules={{required: true}}
                                defaultValue=""
                            />
                            <Controller
                                control={control}
                                render={({field: {onChange, onBlur, value}}) => (
                                    <TextInput
                                        secureTextEntry={true}
                                        style={[
                                            styles.input,
                                            isFocused.password ? styles.focused : styles.notFocused
                                        ]}
                                        onBlur={() => {
                                            onBlur();
                                            handleBlur('password');
                                        }}
                                        onChangeText={onChange}
                                        value={value}
                                        onFocus={() => handleFocus('password')}
                                        placeholder="Hasło"
                                        placeholderTextColor={colors.lightGray}
                                    />
                                )}
                                name="password"
                                rules={{required: true}}
                                defaultValue=""
                            />
                            <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
                                <Text style={styles.btnText}>Zaloguj się</Text>
                            </TouchableOpacity>
                            <TouchableWithoutFeedback onPress={() => navigation.navigate('Register')}>
                                <Text style={styles.linkText}>Nie posiadasz konta? Załóż je tutaj.</Text>
                            </TouchableWithoutFeedback>
                        </View>
                    </ImageBackground>
                    <Svg style={styles.svgBottom} width={'100%'} height={200}>
                        <Path translateX={-550} fill="#8A5FC0" fill-opacity="1"
                              d="M0,288L60,266.7C120,245,240,203,360,160C480,117,600,75,720,90.7C840,107,960,181,1080,213.3C1200,245,1320,235,1380,229.3L1440,224L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"/>
                    </Svg>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    input: {
        width: '80%',
        padding: 10,
        borderBottomWidth: 2,
        marginBottom: 20,
        color: colors.white,
        fontSize: 16
    },
    inner: {
        flex: 1
    },
    focused: {
        borderBottomColor: colors.secondary,
    },
    notFocused: {
        borderBottomColor: colors.lightGray,
    },
    button: {
        marginTop: 20,
        backgroundColor: colors.secondary,
        padding: 10,
    },
    btnText: {
        color: colors.white,
    },
    svgTop: {
        position: 'absolute',
        top: -40,
        zIndex: 99
    },
    svgBottom: {
        zIndex: 99,
        position: 'absolute',
        bottom: -40,
        transform: [{rotate: '180deg'}]
    },
    bgImage: {
        flex: 1,
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loginBox: {
        backgroundColor: 'rgba(00, 00, 00, 0.8)',
        borderRadius: 15,
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20
    },
    loginTitle: {
        fontSize: 24,
        color: colors.white,
    },
    linkText: {
        color: colors.secondary,
        marginTop: 25,
        width: '40%',
        textAlign: 'center'
    }
});