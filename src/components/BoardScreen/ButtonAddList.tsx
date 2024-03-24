import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, StyleSheet } from 'react-native';
import List from '@src/api/List';
import { useBoardListsContext, BoardListsContextData } from './BoardListsContextProvider';

const ButtonAddList: React.FC<{ boardId: string }> = ({ boardId }) => {
    const [isInputVisible, setInputVisible] = useState<boolean>(false);
    const [name, setName] = useState<string>('');

    const { addList, board }: BoardListsContextData = useBoardListsContext();

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

    const handleAdd = async () => {

        try {
            const success = await addList(name, board);

            if (!success) {
                return;
            }

            setInputVisible(false);
            setName('');
        } catch (error) {
            console.error('[ButtonAddList] Error adding list:', error);
        }
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

                <View style={{ width: '90%', backgroundColor: 'white', padding: 10, borderRadius: 5 }}>

                    <TextInput
                        value={name}
                        onChangeText={handleChangeText}
                        onSubmitEditing={handleAdd}
                        placeholder="Entrez le nom de votre liste"

                        autoFocus
                        style={{ borderColor: 'gray', borderWidth: 1, padding: 10, marginBottom: 10, color: 'black', borderRadius: 5 }}
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
