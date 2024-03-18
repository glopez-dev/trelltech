import * as React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import Workspace from '@src/api/Workspace';
import WorkspaceModalDelete from './WorkspaceModalDelete';
import WorkspaceModalUpdate from './WorkspaceModalUpdate';
import { BoardButtonAdd } from './BoardButtonAdd';
import { useAppContext } from '@src/context/AppContextProvider';

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
        <TouchableOpacity
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            activeOpacity={0.5}
        >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>

                <View
                    style={{ alignItems: 'center', padding: 9, marginTop: 10, }}
                >
                    <WorkspaceTitle workspace={workspace} modalVisible={modalVisible} />
                </View>

                <WorkspaceModalDelete isVisible={modalVisible} setIsVisible={setModalVisible} workspace={workspace} />
                <WorkspaceModalUpdate visible={showModal} onClose={() => setShowModal(false)} workspace={workspace} />

                <BoardButtonAdd workspace={workspace} />
            </View>
        </TouchableOpacity>

    );
}

function WorkspaceTitle({ workspace, modalVisible }: { workspace: Workspace, modalVisible: boolean }) {

    const [name, setName] = React.useState(workspace.displayName);
    const { triggerReload } = useAppContext();

    const updateName = async () => {
        if (workspace) {
            workspace.displayName = name;
            await workspace.update();
            triggerReload();
        }
    };

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <TextInput
                style={{
                    color: modalVisible ? '#a4262a' : '#172b4c',
                    fontSize: 16,
                    fontWeight: 'bold',
                }}
                value={name}
                onChangeText={text => setName(text)}
                onEndEditing={updateName}
            />
        </View>
    );
}