import React, { useState } from 'react';
import { Modal, View, Button, Text, TextInput } from 'react-native';
import Workspace from '@src/api/Workspace';

interface Props {
    isVisible: boolean;
    onClose: () => void;
}

const ModalAdd: React.FC<Props> = ({ isVisible, onClose }) => {
    const [name, setName] = useState('');

    const handleNameChange = (value: string) => {
        setName(value);
    };

    const add = () => {
        Workspace.create(name);
        setName('');
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}

        >
            <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <View style={{ backgroundColor: 'white', height: '89%' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', backgroundColor: '#000000' }}>
                        <Button title="Fermer" onPress={onClose} />
                    </View>
                    <View style={{ height: '100%', backgroundColor: '#000000', gap: 10 }}>
                        <Text style={{ fontSize: 20, marginLeft: 10, color: 'white' }}>Nom de votre Workspace</Text>
                        <View style={{ marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 10, padding: 10, backgroundColor: '#1c1c1e', borderRadius: 5, flexDirection: 'row', alignItems: 'center', }}>
                            <TextInput style={{ flex: 1, color: 'white', }} placeholder="Nom de votre Workspace" value={name} onChangeText={handleNameChange} />
                            <Button title="Add" onPress={add} />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default ModalAdd;