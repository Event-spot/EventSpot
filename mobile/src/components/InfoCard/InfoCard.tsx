import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from "@react-navigation/native";


interface InfoCardProps {
    type:'event';
}

interface InfoData {
    title: string;
    options: string[];
    buttonText: string;
}

const data: Record<InfoCardProps['type'], InfoData> = {
 
    event: {
        title: "Wydarzenia",
        options: [
            "Przeglądaj nadchodzące wydarzenia",
            "Znajdź wydarzenia w twojej okolicy",
            "Spotkaj się z miłośnikami motoryzacji",
            "Dołącz do uczestników",
        ],
        buttonText: "Odkryj wydarzenia",
    },
};

export default function InfoCard({ type }: InfoCardProps) {
    const content = data[type];
    const navigation = useNavigation();
   
    return (
        <View style={styles.container}>
            <Text style={styles.title}>{content.title}</Text>
            <View style={styles.content}>
                {content.options.map((option, index) => (
                    <View key={index} style={styles.optionContainer}>
                        <Text style={styles.option}>{option}</Text>
                        {index < content.options.length - 1 && <View style={styles.separator} />}
                    </View>
                ))}
            </View>
            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Events")}>
                <Text style={styles.buttonText}>{content.buttonText}</Text>
            </TouchableOpacity>
        </View>
    );
}


const colors = {
    primary: '#2E1A47',
    secondary: '#8A5FC0',
    white: '#FFFFFF',
};

const styles = StyleSheet.create({
    container: {
       
        minHeight: 450,
        maxWidth: 350,
        margin:10,
        width: '100%',
        backgroundColor: colors.secondary,
        borderWidth: 2,
        borderColor:colors.primary,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 20,
    },
    title: {
        color: colors.white,
        fontSize: 32,
        fontWeight: 'bold',
    },
    content: {
       
        fontWeight: 'bold',
        fontSize: 20,
        alignItems: 'center',
        width: '80%',
    },
     optionContainer: {
        width: '100%',
        alignItems: 'center',
    },
    separator: {
        height: 4,
        backgroundColor: colors.primary,
        width: '100%',
        maxWidth: 400,
        borderRadius: 5,
        marginTop: 12,
    },
    option: {
        textAlign: 'center',
        color: colors.white,
        width: '100%',
        marginVertical: 12,
        position: 'relative',
    },
    btn: { 
        backgroundColor: 'transparent',
        borderColor: colors.white,
        borderWidth: 2,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center', 
        justifyContent: 'center', 
        width: '80%', 
    },
    buttonText: { 
        color: colors.white,
        fontSize: 20,
        fontWeight: 'bold',
    },
});

