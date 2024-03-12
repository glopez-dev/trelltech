import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, } from 'react-native';
import List from '@src/api/List';

const ButtonAddList: React.FC<{ listId: string; name: string }> = ({ listId, name }) => {
    const [isInputVisible, setInputVisible] = useState<boolean>(false);
    const [newName, setNewName] = useState(name);

    const toggleInput = () => {
        setInputVisible(!isInputVisible);
    };

    const handleChangeText = (inputText: string) => {
        setNewName(inputText);
    };

    const handleCancel = () => {
        setInputVisible(false);
        setNewName(name);
    };

    const handleUpdate = async () => {
        const list = await List.get(listId);
        list.name = newName;
        list.update();
        console.log("Nom mis à jour :", newName);
        setInputVisible(false);
    };

    return (
        <View style={{ justifyContent: 'flex-start', alignItems: 'center', marginTop: 20 }}>
            {!isInputVisible ? (
                <View style={{ width: '100%', backgroundColor: '#ffffff' }}>
                    <TouchableOpacity style={{ backgroundColor: '#000000', padding: 10, alignItems: 'center', borderRadius: 0 }} onPress={toggleInput}>
                        <Text style={{ color: 'white', fontSize: 20 }}>Modifier le nom de la liste</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={{ width: '100%', backgroundColor: '#000000', padding: 10 }}>
                    <TextInput
                        value={newName}
                        onChangeText={handleChangeText}
                        onSubmitEditing={handleUpdate}
                        placeholder="Entrez le nom de votre liste"
                        autoFocus
                        style={{ borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 10, color: 'white' }}
                        placeholderTextColor="white"
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Button title="Annuler" onPress={handleCancel} />
                        <Button title="Modifier" onPress={handleUpdate} />
                    </View>
                </View>
            )}
        </View>
    );
};

export default ButtonAddList;
