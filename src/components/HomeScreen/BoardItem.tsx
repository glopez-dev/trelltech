import * as React from 'react';
import { Pressable, Text, } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import Board from '@src/api/Board';
import { StyleSheet } from 'react-native';
import BoardButtonDelete from './BoardButtonDelete';
import { useBoardListContext } from './BoardListContext';

export default function BoardItem({ item }: { item: Board }) {

    const context = useBoardListContext();
    const { navigate } = useNavigation();

    const navigateToBoardScreen = (board: Board) => {
        /* @ts-ignore */
        navigate('BoardScreen', { board: board, workspace: context.workspace });
    }

    const styles = StyleSheet.create({
        item: { padding: 15, backgroundColor: '#ffffff', color: '#172b4c', flex: 1, },
        itemBox: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: '#1c1c1e',
            borderTopWidth: 0.5,
            borderColor: '#2c333b',
        },
    });

    return (
        <Pressable
            style={styles.itemBox}
            onPress={() => navigateToBoardScreen(item)}
        >
            <Text style={styles.item}>{item.name}</Text>
            {/* <BoardButtonDelete board={item} /> */}
        </Pressable>
    );


}