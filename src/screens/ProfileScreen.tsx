import * as React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import HeaderRight from '@src/components/HomeScreen/HeaderRight';
import { View, Text } from '@gluestack-ui/themed';

/**
 * The function that manages the logic to configure the HomeScreen options.
 * Is passed to the `Tab.Screen` component that renders the `ProfileScreen`.
 *
 * @param {object} - An object that contains the `navigation` and `route` props.
 * @returns {object} - An object that contains the `Screen` options. 
 */
export function profileScreenOptions({ navigation, route }): object {

    return {
        tabBarIcon: ({ color, size }) => <FontAwesome name="user-circle-o" size={22} color={color} />,
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: '#2c333b' },
        tabBarLabel: 'Compte',
        /* Elone */
        headerStyle: { backgroundColor: '#2c333b' },
        headerTintColor: 'white',
        headerTitleStyle: { fontWeight: 'bold', fontSize: 25 },
        headerTitleAlign: 'center',
        headerTitle: 'John Doe',
        headerRight: () => <HeaderRight />,
    };
}


export function ProfileScreen() {
    return (
        /* Home screen content goes here */
        <View>
            <Text>Card Screen</Text>
        </View>
    );
}