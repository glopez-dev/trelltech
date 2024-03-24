import React, { useState } from 'react';
import { Modal, View, Button, Text, TextInput, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';
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
            <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.modal}>
                        <View style={styles.modalContent}>
                            <View style={styles.modalHeader}>
                                <Button title="Fermer" onPress={props.onClose} color="#0c65e3" />
                            </View>
                            <View style={styles.modalBody}>
                                <Text style={styles.modalBodyText}>Ajouter un tableau</Text>
                                <View style={styles.modalBodyInput}>
                                    <TextInput style={styles.modalBodyInputText} placeholder="Nom de votre tableau" placeholderTextColor="black" value={name} onChangeText={handleNameChange} />
                                    <Button title="Add" onPress={add} color="#0c65e3" />
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
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
        height: '33%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: 'hidden',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: '#f3f2f8',
        padding: 5,
    },
    modalBody: {
        backgroundColor: '#f3f2f8',
        flex: 1,
        padding: 10,
    },
    modalBodyText: {
        fontSize: 20,
        color: '#172b4c',
        marginBottom: 10,
    },
    modalBodyInput: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,

        borderRadius: 5,
        padding: 5,


    },
    modalBodyInputText: {
        color: '#172b4c',
        flex: 1,
    },
});
