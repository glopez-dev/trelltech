import React from 'react';
import { View, Text, FlatList, ListRenderItem } from 'react-native';
import { useCardListContext } from './CardListContextProvider';
import Card from '@src/api/Card';

type CardElementProps = {
    item: Card
}

const CardElement: ListRenderItem<Card> = ({ item }: CardElementProps): JSX.Element => (
    <View>
        <Text style={{ color: 'white' }}>{item.name}</Text>
    </View>
);


/**
 * Generates a FlatList style component that displays a list of cards.
 *
 * @return {JSX.Element} The ListCard component
 * 
 * @ATTENTION Depends on the CardListContextProvider to provide access to the list's cards.
 */
const ListCard = () => {

    const listContext = useCardListContext();



    return (
        <FlatList
            data={listContext.cards}
            renderItem={CardElement}
            keyExtractor={(item, index) => index.toString()}
        />
    );
};

export default ListCard;