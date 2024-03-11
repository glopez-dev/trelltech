import * as React from 'react';
import { View, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import Board from '@src/api/Board';

interface ButtonDeleteBoardProps {
    BoardId: string;
}

const ButtonDeleteBoard: React.FC<ButtonDeleteBoardProps> = ({ BoardId }) => {
    const deleted = () => {
        Board.delete(BoardId);
    };

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <TouchableOpacity style={{ backgroundColor: '#a4262a', padding: 10, alignItems: 'center' }} onPress={deleted}>
                <Text style={{ color: 'white', fontSize: 20 }}>Supprimer</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ButtonDeleteBoard;
