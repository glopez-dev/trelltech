import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Workspace from '@src/api/Workspace';

import WorkspaceModalDelete from './WorkspaceModalDelete';
import WorkspaceModalUpdate from './WorkspaceModalUpdate';
import { WorkspaceButtonAdd } from './WorkspaceButtonAdd';

export default function BoardListHeader({ workspace }: { workspace: Workspace }) {


    const [modalVisible, setModalVisible] = React.useState(false);

    const ActivateModal = () => {
        console.log('test');
        setModalVisible(true);
    }

    const closeModal = () => {
        setModalVisible(false);
    };

    const [showModal, setShowModal] = React.useState(false);
    let pressTimer;

    // Démarrer un délai de 1000ms (1 seconde) pour afficher la modal
    const handlePressIn = () => {
        pressTimer = setTimeout(() => {
            setShowModal(true);
        }, 1000);
    };

    // Annuler le délai si l'utilisateur relâche le bouton avant 1 seconde
    const handlePressOut = () => {
        clearTimeout(pressTimer);
    };

    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>


                <TouchableOpacity
                    style={{ alignItems: 'center', padding: 9, marginTop: 10, }} onPress={ActivateModal} onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    activeOpacity={-1.6}
                >
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>{workspace.displayName}</Text>
                </TouchableOpacity>

                <WorkspaceModalDelete visible={modalVisible} onClose={closeModal} workspaceId={workspace.id} />
                <WorkspaceModalUpdate visible={showModal} onClose={() => setShowModal(false)} workspace={workspace} />

                <WorkspaceButtonAdd workspaceId={workspace.id} />
            </View>
        </View>

    );
}