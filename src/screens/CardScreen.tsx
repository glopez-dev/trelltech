import * as React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HeaderRight from '@src/components/HomeScreen/HeaderRight';
import { View, Text } from '@gluestack-ui/themed';
import ModalList from '@src/components/BoardScreen/ModalList';
// import ButtonUpdate from '@src/components/HomeScreen/ButtonUpdate';

/**
 * The function that manages the logic to configure the HomeScreen options.
 * Is passed to the `Tab.Screen` component that renders the `HomeScreen`.
 *
 * @param {object} - An object that contains the `navigation` and `route` props.
 * @returns {object} - An object that contains the `Screen` options. 
 */
export function cardScreenOptions({ navigation, route }): object {

    return {
        tabBarIcon: ({ color, size }) => <MaterialCommunityIcons name="card-text-outline" size={28} color={color} />,
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
        headerRight: () => <HeaderRight />,
    };
}


export function CardScreen() {

    const [modalVisible, setModalVisible] = React.useState(false);

    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };
    return (

        <>
            <ModalList />
        </>
    );
}