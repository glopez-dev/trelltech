import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import Workspace from '@src/api/Workspace';

const ModalDeleteWorkspace = ({ visible, onClose, workspaceId }) => {
    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>

                <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, gap: 25 }}>
                    <TouchableOpacity onPress={onClose} style={{ alignItems: 'flex-end', justifyContent: 'center', }}>
                        <Text style={{ color: 'blue' }}>Fermer </Text>
                    </TouchableOpacity>
                    <Text>Pour supprimer le Workscapace,cliquez sur le bouton supprimer</Text>
                    <TouchableOpacity onPress={() => Workspace.delete(workspaceId)} style={{ backgroundColor: '#a4262a', padding: 10, alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 20 }}>Supprimer</Text>
                    </TouchableOpacity>

                </View>
            </View>
        </Modal>
    );
};

export default ModalDeleteWorkspace;
