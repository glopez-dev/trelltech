import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import List from '@src/api/List';
import Card from '@src/api/Card';

const AddCard: React.FC<{ list: List }> = ({ list }) => {
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
        Card.create(list.id, name);
        console.log("Texte ajouté :", name + " dans la liste d'id : " + list.id);
        setInputVisible(false);
        setName('');
    };

    return (
        <View style={{ justifyContent: 'flex-start', marginTop: 20, width: '100%' }}>
            {!isInputVisible ? (

                <View style={{ backgroundColor: '#ffffff', width: '50%', }}>

                    <TouchableOpacity style={{ backgroundColor: '#000000', borderRadius: 0, }} onPress={toggleInput}>
                        <Text style={{ color: 'white', fontSize: 15 }}>+ Ajouter une card</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={{ width: '100%', }}>
                    <TextInput
                        value={name}
                        onChangeText={handleChangeText}
                        onSubmitEditing={handleAdd}
                        placeholder="Nom de la card"
                        autoFocus
                        style={{ borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 10, color: 'white', width: '100%' }}
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

export default AddCard;
