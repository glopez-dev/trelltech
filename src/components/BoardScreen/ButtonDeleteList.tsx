import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import List from '@src/api/List';

const ButtonDeleteList = ({ listId }) => {

    const deleted = () => {

        try {
            List.delete(listId);


        }

        catch (error) {
            console.error("Error deleting list:", error);

        }


    }


    return (
        <TouchableOpacity onPress={deleted} style={{ backgroundColor: '#a4262a', padding: 10, alignItems: 'center' }}>
            <Text style={{ color: 'white', fontSize: 20 }}>Supprimer </Text>

        </TouchableOpacity>
    );
};

export default ButtonDeleteList;