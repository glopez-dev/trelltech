import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, StyleSheet } from 'react-native';
import List from '@src/api/List';

const ButtonAddList: React.FC<{ boardId: string }> = ({ boardId }) => {
    const [isInputVisible, setInputVisible] = useState<boolean>(false);
    const [name, setName] = useState<string>('');

    const toggleInput = () => {
        setInputVisible(!isInputVisible);
    };

    const handleChangeText = (inputText: string) => {
        setName(inputText);
    };

    const handleCancel = () => {
        setInputVisible(false);
        setName('');
    };

    const handleAdd = () => {
        List.create(name, boardId);
        console.log("Texte ajouté :", name + " dans la liste d'id : " + boardId);
        setInputVisible(false);
        setName('');
    };

    return (
        <View style={{ justifyContent: 'flex-start', alignItems: 'center', marginTop: 30 }}>
            {!isInputVisible ? (
                <View style={{ width: '90%', backgroundColor: '#ffffff', borderRadius: 10 }}>
                    <TouchableOpacity style={{ backgroundColor: '#005385', padding: 10, alignItems: 'center', borderRadius: 10, }} onPress={toggleInput}>
                        <Text style={{ color: 'white', fontSize: 20 }}>Ajouter une liste</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={{ width: '90%', backgroundColor: '#000000', padding: 10 }}>
                    <TextInput
                        value={name}
                        onChangeText={handleChangeText}
                        onSubmitEditing={handleAdd}
                        placeholder="Entrez le nom de votre liste"
                        autoFocus
                        style={{ borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 10, color: 'white' }}
                        placeholderTextColor="white"

                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Button title="Annuler" onPress={handleCancel} />
                        <Button title="Ajouter" onPress={handleAdd} />
                    </View>
                </View>
            )}
        </View>
    );
};

export default ButtonAddList;
