import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import List from '@src/api/List';
import { useBoardListsContext } from './BoardListsContextProvider';

const ButtonDeleteList = ({ list }: { list: List }) => {

    const { removeList } = useBoardListsContext();

    const deleted = async () => {
        try {
            const success = await removeList(list);
            if (!success) {
                return;
            }
        } catch (error) {
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