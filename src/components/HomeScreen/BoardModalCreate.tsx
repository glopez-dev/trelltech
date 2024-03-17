import React, { useState } from 'react';
import { Modal, View, Button, Text, TextInput, StyleSheet } from 'react-native';
import Workspace from '@src/api/Workspace';
import Board from '@src/api/Board';
import { useBoardListContext } from './BoardListContext';

interface BoardModalCreateProps {
    isVisible: boolean;
    onClose: () => void;
    workspace: Workspace;
}

export default function BoardModalCreate(props: BoardModalCreateProps): JSX.Element {
    const [name, setName] = useState('');
    const context = useBoardListContext();

    const handleNameChange = (value: string) => {
        setName(value);
    };

    const add = async () => {
        const success: boolean = await context.addBoard(name, props.workspace);

        if (!success) {
            return;
        }

        setName('');
        props.onClose();
        context.triggerReload();
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.isVisible}
            onRequestClose={props.onClose}
        >
            <View style={styles.modal}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Button title="Fermer" onPress={props.onClose} />
                    </View>
                    <View style={styles.modalBody}>
                        <Text style={styles.modalBodyText}>Ajouter un tableau</Text>
                        <View style={styles.modalBodyInput}>
                            <TextInput style={styles.modalBodyInputText} placeholder="Nom de votre tableau" value={name} onChangeText={handleNameChange} />
                            <Button title="Add" onPress={add} />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        height: '89%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: '#000000',
    },
    modalBody: {
        height: '100%',
        backgroundColor: '#000000',
        gap: 10,
    },
    modalBodyText: {
        fontSize: 20,
        marginLeft: 10,
        color: 'white',
    },
    modalBodyInput: {
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
        backgroundColor: '#1c1c1e',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    modalBodyInputText: {
        color: 'white',
        flex: 1,
    },
});