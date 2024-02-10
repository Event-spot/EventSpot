import {
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback, Keyboard, ImageBackground
} from "react-native";
import React, {useState} from "react";
import {colors} from "../constants/colors";
import {Controller, useForm} from "react-hook-form";

type FormData = {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    retypePassword: string;
}


export default function Register() {
    const {control, handleSubmit} = useForm<FormData>()
    const [isFocused, setIsFocused] = useState({
        email: false,
        firstName: false,
        lastName: false,
        password: false,
        retypePassword: false
    });

    const onSubmit = async (data: FormData) => {
        console.log(data)
    }

    const handleFocus = (field: string) => {
        setIsFocused({...isFocused, [field]: true});
    };

    const handleBlur = (field: string) => {
        setIsFocused({...isFocused, [field]: false});
    };
    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ImageBackground style={styles.bgImage} source={require('../assets/images/registerBackground.png')}>
                <View style={styles.inner}>
                    <View style={styles.registerBox}>
                        <Text style={styles.loginTitle}>Utwórz konto</Text>
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
                                        handleBlur('email')
                                    }}
                                    onChangeText={onChange}
                                    onFocus={() => {
                                        handleFocus('email')
                                    }}
                                    value={value}
                                    placeholder='Email'
                                    placeholderTextColor={colors.lightGray}
                                />
                            )}
                            name="email"
                            rules={{required: true}}
                            defaultValue=''/>
                        <Controller
                            control={control}
                            render={({field: {onChange, onBlur, value}}) => (
                                <TextInput
                                    style={[
                                        styles.input,
                                        isFocused.firstName ? styles.focused : styles.notFocused
                                    ]}
                                    onBlur={() => {
                                        onBlur();
                                        handleBlur('firstName')
                                    }}
                                    onChangeText={onChange}
                                    onFocus={() => {
                                        handleFocus('firstName')
                                    }}
                                    value={value}
                                    placeholder='Imię'
                                    placeholderTextColor={colors.lightGray}
                                />
                            )}
                            name="firstName"
                            rules={{required: true}}
                            defaultValue=''/>
                        <Controller
                            control={control}
                            render={({field: {onChange, onBlur, value}}) => (
                                <TextInput
                                    style={[
                                        styles.input,
                                        isFocused.lastName ? styles.focused : styles.notFocused
                                    ]}
                                    onBlur={() => {
                                        onBlur();
                                        handleBlur('lastName')
                                    }}
                                    onChangeText={onChange}
                                    onFocus={() => {
                                        handleFocus('lastName')
                                    }}
                                    value={value}
                                    placeholder='Nazwisko'
                                    placeholderTextColor={colors.lightGray}
                                />
                            )}
                            name="lastName"
                            rules={{required: true}}
                            defaultValue=''/>
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
                                        handleBlur('password')
                                    }}
                                    onChangeText={onChange}
                                    onFocus={() => {
                                        handleFocus('password')
                                    }}
                                    value={value}
                                    placeholder='Hasło'
                                    placeholderTextColor={colors.lightGray}
                                />
                            )}
                            name="password"
                            rules={{required: true}}
                            defaultValue=''/>
                        <Controller
                            control={control}
                            render={({field: {onChange, onBlur, value}}) => (
                                <TextInput
                                    secureTextEntry={true}
                                    style={[
                                        styles.input,
                                        isFocused.retypePassword ? styles.focused : styles.notFocused
                                    ]}
                                    onBlur={() => {
                                        onBlur();
                                        handleBlur('retypePassword')
                                    }}
                                    onChangeText={onChange}
                                    onFocus={() => {
                                        handleFocus('retypePassword')
                                    }}
                                    value={value}
                                    placeholder='Powtórz hasło'
                                    placeholderTextColor={colors.lightGray}
                                />
                            )}
                            name="retypePassword"
                            rules={{required: true}}
                            defaultValue=''/>
                        <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button}>
                            <Text style={styles.btnText}>Utwórz konto</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                </ImageBackground>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    inner: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        width: '100%',
    },
    bgImage: {
        flex: 1,
        resizeMode: 'cover',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    registerBox: {
        backgroundColor: 'rgba(00, 00, 00, 0.8)',
        width: '90%',
        height: 500,
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: 'center'
    },
    loginTitle: {
        color: colors.white,
        textAlign: 'center',
        fontSize: 24
    },
    input: {
        width: '80%',
        padding: 10,
        borderBottomWidth: 2,
        marginBottom: 20,
        color: colors.white,
        fontSize: 16
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
})