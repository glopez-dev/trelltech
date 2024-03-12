import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
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
const WorkspaceModalDelete = (props: WorkspaceDeleteModalProps): JSX.Element => {

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
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>

                <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, gap: 25 }}>
                    <TouchableOpacity onPress={props.onClose} style={{ alignItems: 'flex-end', justifyContent: 'center' }}>
                        <Text style={{ color: 'blue' }}>Fermer</Text>
                    </TouchableOpacity>
                    <Text>Pour supprimer le Workspace, cliquez sur le bouton "Supprimer".</Text>
                    <TouchableOpacity onPress={pressDeleteHandler} style={{ backgroundColor: '#a4262a', padding: 10, alignItems: 'center', marginTop: 10 }}>
                        <Text style={{ color: 'white', fontSize: 20 }}>Supprimer</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default WorkspaceModalDelete;
