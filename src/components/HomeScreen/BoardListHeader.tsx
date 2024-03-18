import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Workspace from '@src/api/Workspace';
import WorkspaceModalDelete from './WorkspaceModalDelete';
import WorkspaceModalUpdate from './WorkspaceModalUpdate';
import { BoardButtonAdd } from './BoardButtonAdd';

export default function BoardListHeader({ workspace }: { workspace: Workspace }) {

    // Modale de suppression
    const [modalVisible, setModalVisible] = React.useState(false);
    let pressTimer;

    const activateModal = () => {
        console.log('test');
        setModalVisible(true);
    }

    // Démarrer un délai de 1000ms (1 seconde) pour afficher la modal
    const handlePressIn = () => {
        pressTimer = setTimeout(() => {
            activateModal();
        }, 500);
    };

    // Annuler le délai si l'utilisateur relâche le bouton avant 1 seconde
    const handlePressOut = () => {
        clearTimeout(pressTimer);
    };

    // Modale d'édition
    const [showModal, setShowModal] = React.useState(false);


    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>

                <TouchableOpacity
                    style={{ alignItems: 'center', padding: 9, marginTop: 10, }} onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                    activeOpacity={-1.6}
                >
                    <Text style={{ color: modalVisible ? '#a4262a' : '#172b4c', fontSize: 16, fontWeight: 'bold' }}>{workspace.displayName}</Text>
                </TouchableOpacity>

                <WorkspaceModalDelete isVisible={modalVisible} setIsVisible={setModalVisible} workspace={workspace} />
                <WorkspaceModalUpdate visible={showModal} onClose={() => setShowModal(false)} workspace={workspace} />

                <BoardButtonAdd workspace={workspace} />
            </View>
        </View>

    );
}