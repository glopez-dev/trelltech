import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import Workspace from '@src/api/Workspace';
import { useAppContext } from '@src/context/AppContextProvider';

type WorkspaceDeleteModalProps = {
    visible: boolean;
    onClose: () => void;
    workspace: Workspace;
};

/**
 * Displays a modal for deleting a workspace.
 * @param visible Whether the modal is visible.
 * @param onClose Function to call when the modal is closed.
 * @param workspaceId ID of the workspace to delete.
 * @returns The component.
 */
export default function WorkspaceModalDelete(props: WorkspaceDeleteModalProps): JSX.Element {

    const { deleteWorkspace, triggerReload } = useAppContext();

    const pressDeleteHandler = async () => {
        deleteWorkspace(props.workspace);
        triggerReload();
        props.onClose(); // Ferme la modale après la suppression
    }

    return (
        <Modal
            visible={props.visible}
            animationType="slide"
            transparent={true}
            onRequestClose={props.onClose}>
            <View style={styles.modal}>

                <View style={styles.modalContent}>
                    <TouchableOpacity onPress={props.onClose} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Fermer</Text>
                    </TouchableOpacity>
                    <Text>Pour supprimer le Workspace, cliquez sur le bouton "Supprimer".</Text>
                    <TouchableOpacity onPress={pressDeleteHandler} style={styles.deleteButton}>
                        <Text style={styles.deleteButtonText}>Supprimer</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );

};

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        gap: 25,
    },
    closeButton: {
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    closeButtonText: {
        color: 'blue',
    },
    deleteButton: {
        backgroundColor: '#a4262a',
        padding: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    deleteButtonText: {
        color: 'white',
        fontSize: 20,
    },
});

