import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, } from 'react-native';
import List from '@src/api/List';

export type ButtonUpdateListProps = {
    list: List;
    name: string;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ButtonAddList: React.FC<ButtonUpdateListProps> = ({ list, name, setModalVisible }) => {

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
        try {
            const updatedList = await List.get(list.id);

            updatedList.name = newName;
            const response = await updatedList.update();

            if (!response) {
                return;
            }

            setInputVisible(false);
            setModalVisible(false);

        } catch (error) {
            console.error("[ButtonUpdateList] Error updating list:", error);
        }
    };

    return (
        <View style={{ justifyContent: 'flex-start', alignItems: 'center', marginTop: 20 }}>
            {!isInputVisible ? (
                <View style={{ width: '100%', backgroundColor: '#ffffff' }}>
                    <TouchableOpacity style={{ backgroundColor: '#0079be', padding: 10, alignItems: 'center', borderRadius: 0 }} onPress={toggleInput}>
                        <Text style={{ color: 'white', fontSize: 20 }}>Modifier le nom de la liste</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={{ width: '100%', backgroundColor: '#0079be', padding: 10 }}>
                    <TextInput
                        value={newName}
                        onChangeText={handleChangeText}
                        onSubmitEditing={handleUpdate}
                        placeholder="Entrez le nom de votre liste"
                        autoFocus
                        style={{ borderColor: 'white', borderWidth: 1, padding: 10, marginBottom: 10, color: 'white' }}
                        placeholderTextColor="white"
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Button title="Annuler" onPress={handleCancel} color="white" />
                        <Button title="Modifier" onPress={handleUpdate} color="white" />
                    </View>
                </View>
            )}
        </View>
    );
};

export default ButtonAddList;
