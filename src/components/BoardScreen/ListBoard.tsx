import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import List from '@src/api/Board'; // Adjust the import path based on your project structure

interface ListData {
    // Define the structure of your list data
    name: string;
    // Add more properties as needed
}

const ListBoard: React.FC<{ boardId: string }> = ({ boardId }) => {
    const [lists, setLists] = useState<ListData[]>([]);

    useEffect(() => {
        const fetchList = async () => {
            try {
                const fetchedLists = await List.getLists(boardId);
                setLists(fetchedLists);

            } catch (error) {
                console.error("Error fetching lists:", error);
            }
        };

        fetchList();
    }, [boardId]);

    return (
        <View style={styles.container2} >
            {lists.map((list, index) => (
                <View style={styles.container1}>
                    <Text style={styles.container} key={index}>{list.name}</Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {

        backgroundColor: 'red',
        flexDirection: 'row',

    },
    container1: {
        backgroundColor: 'green',
        flexDirection: 'row',

    },

    container2: {
        backgroundColor: 'green',
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
})
export default ListBoard;
