import React from "react";
import { SafeAreaView, StyleSheet, AppRegistry, StatusBar  } from 'react-native';
import {ApolloClient, InMemoryCache, ApolloProvider} from "@apollo/client";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {apolloDevToolsInit} from 'react-native-apollo-devtools-client';
import Header from './src/layout/Header';
import HomePage from "./src/routes/HomePage";
import Events from "./src/routes/Events";
import Users from './src/routes/Users';
import Navbar from "./src/layout/Navbar";
import UserProfile from "./src/routes/UserProfile";
import EventDetails from "./src/routes/EventDetails";
import { RootStackParamList } from '../mobile/src/Types/navigationTypes';

const Stack = createNativeStackNavigator<RootStackParamList>();
const client = new ApolloClient({
    uri: 'http://192.168.18.2:3001/graphql',
    cache: new InMemoryCache(),
})

apolloDevToolsInit(client);
export default function App() {
    return (
      <ApolloProvider client={client}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={styles.container}>
          <NavigationContainer>
            <Header />
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Home" component={HomePage} />
              <Stack.Screen name="Events" component={Events} />
              <Stack.Screen name="Users" component={Users} />
              <Stack.Screen name="UserProfile" component={UserProfile} />
              <Stack.Screen name="EventDetails" component={EventDetails} />
            </Stack.Navigator>
            <Navbar />
          </NavigationContainer>
        </SafeAreaView>
      </ApolloProvider>
    );
  }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

AppRegistry.registerComponent('EventSpot', () => App);