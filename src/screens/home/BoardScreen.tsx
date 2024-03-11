import * as React from 'react';
import { View, Text } from '@gluestack-ui/themed';
import { StyleSheet } from 'react-native';
import BoardScreenHeader from '@src/components/BoardScreen/BoardScreenHeader';
import ButtonAddList from '@src/components/BoardScreen/ButtonAddList';
import { useRoute } from '@react-navigation/native';

/**
 * The function that manages the logic to configure the BoardScreen options.
 * Is passed to the `Tab.Screen` component that renders the `BoardScreen`.
 *
 * @param {object} - An object that contains the `navigation` and `route` props.
 * @returns {object} - An object that contains the `Screen` options. 
 */
export function boardScreenOptions({ navigation, route }): object {
    console.log("boardScreenOptions route", route);
    const { params } = route
    console.log("boardScreenOptions params", params);

    return {
        header: (params) => <BoardScreenHeader routeParams={params} />,
    };
}


export function BoardScreen() {

    const route = useRoute();
    const { boardId } = route.params;


    return (
        /* Home screen content goes here */
        <View style={styles.container}>
            <ButtonAddList />
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


