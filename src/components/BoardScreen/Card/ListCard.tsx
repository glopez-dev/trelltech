import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import List from '@src/api/List';

type ListCardProps = {
    list: List
}


const ListCard = ({ list }: ListCardProps) => {
    const [cards, setCards] = useState([]);


    const getCards = async () => {

        try {
            const cards = await list.getCards();
            setCards(cards);
            console.log("caca", cards);

        }

        catch (error) {
            console.error("Error fetching cards:", error);
        }




    }

    useEffect(() => {

        getCards();


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