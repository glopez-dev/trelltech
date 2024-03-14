import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import PagerView from 'react-native-pager-view'; // Import PagerView
import AddCard from './Card/AddCard';
import ButtonAddList from './ButtonAddList';
import ModalList from '@src/components/BoardScreen/ModalList';
import ListCard from './Card/ListCard';
import { CardListContextProvider } from './Card/CardListContextProvider';


import Board from '@src/api/Board';
import List from '@src/api/List';

type ListBoardProps = {
    board: Board;
}



export default function ListBoard({ board }: ListBoardProps): JSX.Element {
    const [lists, setLists] = useState<List[]>([]);

    useEffect(() => {
        const fetchLists = async () => {
            try {
                const fetchedLists = await Board.getLists(board.id);
                console.log("[ListBoard] fetchedLists:", fetchedLists);
                setLists(fetchedLists);
            } catch (error) {
                console.error(error);
            }
        };

        fetchLists();
    }, [board]);

    return (
        <View style={styles.container}>
            {lists.length > 0 && (
                <PagerView style={styles.viewPager} initialPage={0}>
                    {lists.map((list, index): JSX.Element => (
                        <CardListContextProvider list={list} key={index}>
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
                        </CardListContextProvider>
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

