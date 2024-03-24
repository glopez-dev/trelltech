/**
 * This Component manages the nested navigation for the HomeScreen inside the main TabNavigator.
 */

import * as React from 'react';
import { Fontisto } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, homeScreenOptions } from '@src/screens/home/HomeScreen';
import { BoardScreen, boardScreenOptions } from '@src/screens/home/BoardScreen';

const Stack = createNativeStackNavigator();

/** 
 * The options that are passed to the `Tab.Screen` component that renders the `HomeStackNavigation`. 
 * This options are used to configure the appearance of the tab bar. 
 * 
 */
export function homeScreenTabOptions(): object {
    return ({
        tabBarIcon: ({ color, size }) => <Fontisto name="trello" size={22} color={color} />,
        tabBarActiveTintColor: '#0c65e3',
        tabBarInactiveTintColor: 'gray',
        tabBarLabel: 'Tableaux',
        headerShown: false,
    });

}
/**
 * The HomeStackNavigator manages the nested navigation for the HomeScreen inside the main TabNavigator. 
 *
 */
export function HomeStackNavigation() {
    /* Define all the Screens related to the Home page here. */
    return (
        <Stack.Navigator initialRouteName='Main' >
            <Stack.Screen name="MainScreen" component={HomeScreen} options={homeScreenOptions} />
            <Stack.Screen name="BoardScreen" component={BoardScreen} options={boardScreenOptions} />
        </Stack.Navigator>
    );
}
