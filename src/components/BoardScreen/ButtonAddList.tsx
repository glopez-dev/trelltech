import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import List from '@src/api/List';

const ButtonAddList: React.FC<{ boardId: string }> = ({ boardId }) => {
    const [isInputVisible, setInputVisible] = useState<boolean>(false);
    const [name, setname] = useState<string>('');

    const toggleInput = () => {
        setInputVisible(!isInputVisible);
    };

    const handleChangeText = (inputText: string) => {
        setname(inputText);
    };

    const handleCancel = () => {
        setInputVisible(false);
        setname('');
    };

    const handleAdd = () => {
        List.create(name, boardId);


        console.log("Texte ajouté :", name + " dans la liste d'id : " + boardId);
        setInputVisible(false);
        setname('');
    };

    return (
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', marginTop: 20 }}>
            {!isInputVisible ? (
                <View style={{ width: '90%', backgroundColor: '#ffffff', }}>
                    <TouchableOpacity style={{ backgroundColor: '#000000', padding: 10, alignItems: 'center', borderRadius: 0, }} onPress={toggleInput}>
                        <Text style={{ color: 'white', fontSize: 20 }}>Press Here</Text>
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
            )
            }
        </View >
    );
};

export default ButtonAddList;
