import React from 'react';
import { View, StyleSheet } from 'react-native';
import BoardScreenHeader from '@src/components/BoardScreen/BoardScreenHeader';
import ButtonAddList from '@src/components/BoardScreen/ButtonAddList';
import { useRoute } from '@react-navigation/native';
import ListBoard from '@src/components/BoardScreen/ListBoard';

// Define the type of route.params
interface RouteParams {
    boardId: string; // Assuming boardId is of type string
}

export function boardScreenOptions({ route }) {
    return {
        header: () => <BoardScreenHeader routeParams={route.params} />,
    };
}

export function BoardScreen() {
    const route = useRoute();
    const { boardId }: RouteParams = route.params; // Specify the type of route.params

    return (
        <View style={styles.container}>
            {/* <ButtonAddList boardId={boardId} /> */}

            <ListBoard boardId={boardId} />

        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0079be',
        gap: 80

    },
});
