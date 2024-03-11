import * as React from 'react';
import { Pressable, Text, } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import Board from '@src/api/Board';
import { StyleSheet } from 'react-native';
import BoardButtonDelete from './BoardButtonDelete';

export default function BoardItem({ item }: { item: Board }) {

    const { navigate } = useNavigation();

    const navigateToBoardScreen = (board: Board) => {
        /* @ts-ignore */
        navigate('BoardScreen', { boardId: board.id });
    }

    const styles = StyleSheet.create({
        item: { padding: 15, backgroundColor: '#1c1c1e', color: 'white', flex: 1 },
        itemBox: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: '#1c1c1e',
            borderWidth: 1,
            borderColor: '#2c333b',
        },
    });

    return (
        <Pressable
            style={styles.itemBox}
            onPress={() => navigateToBoardScreen(item)}
        >
            <Text style={styles.item}>{item.name}</Text>
            <BoardButtonDelete boardId={item.id} />
        </Pressable>
    );


}