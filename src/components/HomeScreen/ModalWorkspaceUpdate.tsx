import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, TextInput } from 'react-native';
import Workspace from '@src/api/Workspace';

const ModalWorkspaceUpdate = ({ visible, onClose, workspaceId, name }) => {
    const [newName, setNewName] = useState(name);

    const Rename = async () => {
        const workspace = await Workspace.get(workspaceId);
        workspace.displayName = newName;
        await workspace.update();
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
                    <Text>Changer le nom du Workspace</Text>
                    <TextInput
                        style={{ borderWidth: 1, borderColor: 'gray', padding: 5 }}
                        placeholder={name}
                        value={newName}
                        onChangeText={text => setNewName(text)}
                    />
                    <TouchableOpacity onPress={Rename} style={{ backgroundColor: '#a4262a', padding: 10, alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 20 }}>Rename</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default ModalWorkspaceUpdate;
