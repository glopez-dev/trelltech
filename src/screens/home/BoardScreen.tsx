import * as React from 'react';
import { View, Text } from '@gluestack-ui/themed';
import { StyleSheet } from 'react-native';
import BoardScreenHeader from '@src/components/BoardScreen/BoardScreenHeader';

/**
 * The function that manages the logic to configure the BoardScreen options.
 * Is passed to the `Tab.Screen` component that renders the `BoardScreen`.
 *
 * @param {object} - An object that contains the `navigation` and `route` props.
 * @returns {object} - An object that contains the `Screen` options. 
 */
export function boardScreenOptions({ navigation, route }): object {

    return {
        // headerStyle: { backgroundColor: '#00438f' },
        // headerTintColor: 'white',
        // headerTitleStyle: { fontWeight: 'bold', fontSize: 25 },
        // headerTitleAlign: 'center',
        // headerTitle: 'Trelltech',
        // headerLeft: () => <Text>Test</Text>,
        // headerRight: () => <Text>Test</Text>,
        header: () => <BoardScreenHeader />,
    };
}

export function BoardScreen() {
    return (
        /* Home screen content goes here */
        <View style={styles.container}>
            <Text style={styles.text}>Board Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0260cc',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
    },
});

const mockLists = [
    { id: '1', name: 'To Do' },
    { id: '2', name: 'In Progress' },
    { id: '3', name: 'Done' },
]


