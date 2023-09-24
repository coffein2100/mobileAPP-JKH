import React from 'react';
import Welcome from './pages/Welcome';
import Rooms from './pages/Rooms';
import Chetchiki from './pages/Chetchiki';
import History from './pages/History';
import Payments from './pages/Payments';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function Navigate () {
    return <NavigationContainer>
        <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
            <Stack.Screen
            name="Welcome"
            component={Welcome}/>
            <Stack.Screen
            name="Rooms"
            component={Rooms}/>

            <Stack.Screen
            name="Chetchiki"
            component={Chetchiki}/>

            <Stack.Screen
            name="History"
            component={History}/>

            <Stack.Screen
            name="Payments"
            component={Payments}/>

        </Stack.Navigator>
    </NavigationContainer>;
}