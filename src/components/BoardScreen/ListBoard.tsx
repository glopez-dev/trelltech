import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PagerView from 'react-native-pager-view'; // Import PagerView
import List from '@src/api/Board'; // Adjust the import path based on your project structure
import { Icon, ThreeDotsIcon } from '@gluestack-ui/themed/build/components/Icons';
import AddCard from './Card/AddCard';
import ButtonAddList from './ButtonAddList';
import ModalList from '@src/components/BoardScreen/ModalList';
import Board from '@src/api/Board';
import ListCard from './Card/ListCard';


type ListBoardProps = {
    board: Board;
}



const ListBoard: React.FC<ListBoardProps> = ({ board }: ListBoardProps) => {
    const [lists, setLists] = useState([]);

    useEffect(() => {
        const fetchList = async () => {
            try {
                const fetchedLists = await List.getLists(board.id);
                setLists(fetchedLists);
                console.log("list", fetchedLists);
            } catch (error) {
                console.error("Error fetching lists:", error);
            }
        };

        fetchList();
    }, [board]);

    return (
        <View style={styles.container}>
            {lists.length > 0 && (
                <PagerView style={styles.viewPager} initialPage={0}>
                    {lists.map((list, index) => (
                        <View key={index} style={styles.page}>
                            <View style={styles.container1}>
                                <View style={styles.container2}>
                                    <Text style={{ fontSize: 19, color: 'white' }}>{list.name}</Text>

                                    <ListCard list={list} />

                                    <AddCard list={list} />

                                </View>
                                <ModalList listId={list.id} name={list.name} />
                            </View>
                        </View>
                    ))}
                    <ButtonAddList boardId={board.id} />


                </PagerView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,



    },
    viewPager: {
        flex: 1,
    },
    page: {
        flex: 1,
        marginTop: 30,
        alignItems: 'center',
    },
    container1: {
        backgroundColor: 'black',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
    },
    container2: {
        flexDirection: 'column',
        width: '90%',
        alignItems: 'flex-start',
        padding: 10,
        gap: 15,
    }
});

export default ListBoard;
