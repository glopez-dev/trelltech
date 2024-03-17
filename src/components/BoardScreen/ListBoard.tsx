import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PagerView from 'react-native-pager-view';
import ButtonAddList from './ButtonAddList';
import ModalList from '@src/components/BoardScreen/ModalList';
import ListCard from './Card/ListCard';
import { CardListContextProvider } from './Card/CardListContextProvider';
import Board from '@src/api/Board';
import List from '@src/api/List';
import ListCardFooter from './Card/ListCardFooter';
import { useCardListContext } from './Card/CardListContextProvider';

type ListBoardProps = {
    board: Board;
}


export default function ListBoard({ board }: Readonly<ListBoardProps>): JSX.Element {
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

    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        viewPager: {
            flex: 1,
        },
    });

    return (
        <View style={styles.container}>
            {lists.length > 0 && (

                <PagerView style={styles.viewPager} initialPage={0}>

                    {lists.map((list): JSX.Element => (

                        <CardListContextProvider list={list} key={list.id}>

                            <ListBoardPage key={list.id}>

                                <ListContainer key={list.id}>

                                    <ListHeader>{list.name}</ListHeader>

                                    <ListContent key={list.id}>
                                        <ListCard />
                                    </ListContent>

                                    <ListCardFooter />

                                </ListContainer>

                            </ListBoardPage>

                        </CardListContextProvider>
                    ))}

                    <ButtonAddList boardId={board.id} />

                </PagerView>
            )
            }
        </View >
    );
};

function ListBoardPage({ children }): JSX.Element {

    const styles = StyleSheet.create({
        page: {
            flex: 1,
            marginTop: 30,
            alignItems: 'center',
        },
    })

    return (
        <View style={styles.page}>
            {children}
        </View>
    );
}

function ListContainer({ children }): JSX.Element {
    const styles = StyleSheet.create({
        container1: {
            flexDirection: 'column',
            backgroundColor: 'black',
            justifyContent: 'space-between',
            width: '90%',
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 5,
        },
    })
    return (
        <View style={styles.container1}>
            {children}
        </View>

    );
}

function ListHeader({ children }): JSX.Element {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10, }}>
            <Text style={{ fontSize: 19, color: 'white' }}>
                {children}
            </Text>
            <ModalList />
        </View>
    );
}

function ListContent({ children }): JSX.Element {

    const styles = StyleSheet.create({
        container2: {
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '100%',
            gap: 15,
            overflow: 'visible',
        }
    });


    return (
        <View style={styles.container2}>
            {children}
        </View >
    );
}



