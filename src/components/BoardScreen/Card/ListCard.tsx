import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import List from '@src/api/List';
import { useCardListContext } from './CardListContextProvider';

type ListCardProps = {
    list: List
}

const ListCard = ({ list }: ListCardProps) => {
    const { cards, initListCards, addCard, deleteCard } = useCardListContext();


    const getListCards = async () => {
        const cards = await list.getCards();
        console.log(cards);

    }


    useEffect(() => {

        getListCards()


    }, []);

    const renderItem = ({ item }) => (
        <View>
            <Text>{item.name}</Text> {/* Afficher uniquement le nom de la carte */}
        </View>
    );

    return (
        <FlatList
            data={cards}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()} // Utilisez une clé unique pour chaque élément
        />
    );
};

export default ListCard;