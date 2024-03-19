import * as React from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import HeaderRight from '@src/components/HomeScreen/HeaderRight';
import { View, Text } from '@gluestack-ui/themed';


/**
 * The function that manages the logic to configure the HomeScreen options.
 * Is passed to the `Tab.Screen` component that renders the `SearchScreen`.
 *
 * @param {object} - An object that contains the `navigation` and `route` props.
 * @returns {object} - An object that contains the `Screen` options. 
 */
export function searchScreenOptions({ navigation, route }): object {

    return {
        tabBarIcon: ({ color, size }) => <FontAwesome5 name="search" size={20} color={color} />,
        tabBarActiveTintColor: '#0c65e3',
        tabBarInactiveTintColor: 'gray',

        tabBarLabel: 'Recherchez',
        /* Elone */
        headerStyle: { backgroundColor: '#2c333b' },
        headerTintColor: 'white',
        headerTitleStyle: { fontWeight: 'bold', fontSize: 25 },
        headerTitleAlign: 'center',
        headerTitle: 'Trelltech',
        headerRight: () => <HeaderRight />,
    };
}


export function SearchScreen() {
    return (
        /* Search screen content goes here */
        <View>
            <Text>Search Screen</Text>
        </View>
    );
}
