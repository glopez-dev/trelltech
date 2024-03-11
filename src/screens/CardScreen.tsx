import * as React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HeaderRight from '@src/components/HomeScreen/HeaderRight';


export const cardScreenOptions = {
    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="card-text-outline" size={28} color={color} />,
    tabBarActiveTintColor: 'white',
    tabBarInactiveTintColor: 'gray',
    tabBarStyle: { backgroundColor: '#2c333b' },
    tabBarLabel: 'Mes cartes',
    /* Elone */
    headerStyle: { backgroundColor: '#2c333b' },
    headerTintColor: 'white',
    headerTitleStyle: { fontWeight: 'bold', fontSize: 25 },
    headerTitleAlign: 'center',
    headerTitle: 'Mes cartes',
    headerRight: HeaderRight,
};


export function CardScreen() {
    return (<HeaderRight />);
}