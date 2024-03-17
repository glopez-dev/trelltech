import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Board from '@src/api/Board';
import { useBoardListContext } from './BoardListContext';

interface BoardButtonDeleteProps {
    board: Board;
}

/**
 * Delete button component for a board.
 * @param props The button properties.
 * @param props.boardId The ID of the board to delete.
 * @returns The Delete button component.
 */
export default function BoardButtonDelete(props: BoardButtonDeleteProps): JSX.Element {

    const context = useBoardListContext();

    const handleDelete = async () => {

        const success: boolean = await context.deleteBoard(props.board);

        if (!success) {
            return;
        }

        context.triggerReload();
    }

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity style={{ backgroundColor: '#a4262a', padding: 10, alignItems: 'center' }} onPress={handleDelete}>
                <Text style={{ color: 'white', fontSize: 20 }}>Supprimer</Text>
            </TouchableOpacity>
        </View>
    );

}

