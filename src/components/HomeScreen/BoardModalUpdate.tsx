import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput } from 'react-native';
import Board from '@src/api/Board';

export default function BoardModalUpdate({ visible, onClose, board }): JSX.Element {
    const [newName, setNewName] = useState(board.name);

    const Rename = async (boardId) => {
        const board = await Board.get(boardId);
        board.name = newName;
        await board.update();
        onClose(); // Close modal after updating
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, gap: 25 }}>
                    <TouchableOpacity onPress={onClose} style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                        <Text style={{ color: 'blue' }}>Fermer</Text>
                    </TouchableOpacity>
                    <Text>Changer le nom du board</Text>
                    <TextInput
                        style={{ borderWidth: 1, borderColor: 'gray', padding: 5 }}
                        placeholder={board.name}
                        value={newName}
                        onChangeText={text => setNewName(text)}
                    />
                    <TouchableOpacity onPress={() => Rename(board.id)} style={{ backgroundColor: '#a4262a', padding: 10, alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 20 }}>Rename</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

