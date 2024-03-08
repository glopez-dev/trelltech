import React, { useState } from 'react';
import { Modal, View, Button, Text, TextInput, TouchableOpacity } from 'react-native';
import Workspace from '@src/api/Workspace';

interface Props {
    isVisible: boolean;
    onClose: () => void;
}

const CustomModal: React.FC<Props> = ({ isVisible, onClose }) => {
    const [name, setName] = useState('');

    const handleNameChange = (value: string) => {
        setName(value);
    };

    const add = () => {
        Workspace.create(name);
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <View style={{ backgroundColor: 'white', height: '89%' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', backgroundColor: '#000000' }}>
                        <Button title="Fermer" onPress={onClose} />
                    </View>
                    <View style={{ height: '100%', backgroundColor: '#000000', gap: 13, paddingTop: 10 }}>
                        <Text style={{ fontSize: 20, marginLeft: 10, color: 'white' }}>Nom de votre Workspace</Text>
                        <View style={{ marginBottom: 10, marginLeft: 10, marginRight: 10, padding: 10, backgroundColor: '#2c333b', borderRadius: 5, flexDirection: 'row', alignItems: 'center' }}>
                            <TextInput style={{ flex: 1, color: 'white' }} placeholder="Nom de votre Workspace" value={name} onChangeText={handleNameChange} />

                            <TouchableOpacity style={{ backgroundColor: 'green', padding: 10, borderRadius: 5 }} onPress={add} >
                                <Text style={{ color: 'white' }}> Ajouter</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </View>
        </Modal >
    );
};

export default CustomModal;
