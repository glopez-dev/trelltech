import * as React from 'react';
import { Fontisto } from '@expo/vector-icons';
import HeaderRight from '@src/components/HeaderRight';
import { View, Text } from '@gluestack-ui/themed';


/**
 * The function that manages the logic to configure the HomeScreen options.
 * Is passed to the `Tab.Screen` component that renders the `HomeScreen`.
 *
 * @param {object} - An object that contains the `navigation` and `route` props.
 * @returns {object} - An object that contains the `Screen` options. 
 */
export function homeScreenOptions({ navigation, route }): object {

    return {
        tabBarIcon: ({ color, size}) => <Fontisto name="trello" size={22} color={color} />,
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: '#2c333b' },
        tabBarLabel: 'Tableaux',
        /* Elone */
        headerStyle: { backgroundColor: '#2c333b' },
        headerTintColor: 'white',
        headerTitleStyle: { fontWeight: 'bold', fontSize: 25 },
        headerTitleAlign: 'center',
        headerTitle: 'Trelltech',
        headerRight: () => <HeaderRight />,
    };
}


export function HomeScreen() {
    return (
        /* Home screen content goes here */
        <View>
            <Text>Home Screen</Text>
        </View>
    );
}

