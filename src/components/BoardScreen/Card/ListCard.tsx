import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import List from '@src/api/List';
import { useCardListContext } from './CardListContextProvider';


const ListCard = () => {

    const listContext = useCardListContext();

    const renderItem = ({ item }) => (
        <View>
            <Text style={{ color: 'white' }}>{item.name}</Text>
        </View>
    );

    return (
        <FlatList
            data={listContext.cards}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
        />
    );
};

export default ListCard;