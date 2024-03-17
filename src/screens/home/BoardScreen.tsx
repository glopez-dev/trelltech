import React from 'react';
import { View, StyleSheet } from 'react-native';
import BoardScreenHeader from '@src/components/BoardScreen/BoardScreenHeader';
import { useRoute } from '@react-navigation/native';
import ListBoard from '@src/components/BoardScreen/ListBoard';
import Board from '@src/api/Board';

interface RouteParams {
    board: Board;
}

export function boardScreenOptions({ route }) {
    return {
        header: () => <BoardScreenHeader routeParams={route.params} />,
    };
}

export function BoardScreen() {
    const route = useRoute();
    // @ts-ignore
    const { params }: RouteParams = route;

    return (
        <View style={styles.container}>
            <ListBoard board={params.board} />
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
