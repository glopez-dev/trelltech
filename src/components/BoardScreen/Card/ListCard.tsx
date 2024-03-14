import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import List from '@src/api/List';
import { useCardListContext } from './CardListContextProvider';


/**
 * Generates a ListCard component that displays a list of cards.
 *
 * @return {JSX.Element} The ListCard component
 * 
 * @ATTENTION Depends on the CardListContextProvider to provide access to the list's cards.
 */
const ListCard = () => {

    const listContext = useCardListContext();

    const CardElement = ({ item }) => (
        <View>
            <Text style={{ color: 'white' }}>{item.name}</Text>
        </View>
    );

    return (
        <FlatList
            data={listContext.cards}
            renderItem={CardElement}
            keyExtractor={(item, index) => index.toString()}
        />
    );
};

export default ListCard;