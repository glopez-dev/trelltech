import * as React from 'react';
import { Fontisto } from '@expo/vector-icons';
import HeaderRight from '@src/components/HeaderRight';
import { FlatList, StyleSheet, Text, View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';


/**
 * The function that manages the logic to configure the HomeScreen options.
 * Is passed to the `Tab.Screen` component that renders the `HomeScreen`.
 *
 * @param {object} - An object that contains the `navigation` and `route` props.
 * @returns {object} - An object that contains the `Screen` options. 
 */
export function homeScreenOptions({ navigation, route }): object {

    return {
        headerStyle: { backgroundColor: '#2c333b' },
        headerTintColor: 'white',
        headerTitleStyle: { fontWeight: 'bold', fontSize: 25 },
        headerTitleAlign: 'center',
        headerTitle: 'Trelltech',
        headerRight: () => <HeaderRight />,
    };
}

export const HomeScreen = () => {

    const navigation = useNavigation();
    const handlePress = (board) => {
        navigation.navigate('Board', { board });
    };

    const data = [
        { title: 'Fruits', data: ['Banane', 'Pomme', 'Orange', 'Fraise', 'Kiwi',] },
        { title: 'Fleurs', data: ['Rose', 'Tulipe', 'Lavande', 'Lys', 'Marguerite'] },
        { title: 'Légumes', data: ['Carotte', 'Tomate', 'Brocoli', 'Courgette', 'Poivron'] },
    ];

    return (

        <FlatList
            style={styles.container}
            data={data}
            ListHeaderComponent={<Text style={styles.staticTitle}>Vos espaces de travail</Text>}
            renderItem={({ item }) => (
                <Pressable onPress={() => handlePress(item)}>
                    <Text style={styles.title}>{item.title}</Text>
                    <FlatList
                        data={item.data}
                        renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </Pressable>
            )}
            keyExtractor={(item, index) => index.toString()}
        />

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',


    },
    item: {
        padding: 15,
        backgroundColor: '#1c1c1e',
        color: 'white',
        borderWidth: 1,
        borderColor: '#2c333b',
        display: 'flex',



    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
        padding: 10,
        color: '#a0adbd',


        marginTop: 10,



    },
    title1: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#a0adbd',


    },
    staticTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#a0adbd',

        marginTop: 10,
        padding: 5,

    }


});
