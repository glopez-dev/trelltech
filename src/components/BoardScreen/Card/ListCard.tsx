import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useCardListContext } from './CardListContextProvider';
import Card from '@src/api/Card';
import CardModal from './CardModal';

type CardModalContextData = {
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
    isModalVisible: boolean
    focusedCard: Card
    setFocusedCard: React.Dispatch<React.SetStateAction<Card>>
}

const CardModalContext = React.createContext<CardModalContextData | null>(null);

export const useCardModalContext = () => {
    const context = React.useContext(CardModalContext);
    if (!context) {
        throw new Error('useCardModalContext must be used within a CardModalProvider');
    }
    return context;
}

/**
 * Generates a FlatList style component that displays a list of cards.
 *
 * @return {JSX.Element} The ListCard component
 * 
 * @ATTENTION Depends on the CardListContextProvider to provide access to the list's cards.
 */
export default function ListCard(): JSX.Element {

    const listContext = useCardListContext();
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [focusedCard, setFocusedCard] = React.useState<Card | null>(null);

    type CardElementProps = { item: Card }

    const CardElement = ({ item }: CardElementProps): JSX.Element => {

        const handleCardPress = () => {
            setIsModalVisible(true);
            setFocusedCard(item);
        }

        return (
            <View>
                <TouchableOpacity onPress={handleCardPress} style={styles.btn}>
                    <Text style={styles.cardItem}>{item.name}</Text>
                </TouchableOpacity>
                <CardModal />
            </View >
        );
    };


    const ItemSeparator = () => <View style={{ height: 10 }} />


    return (
        <CardModalContext.Provider value={{ setIsModalVisible, isModalVisible, setFocusedCard, focusedCard }}>
            <FlatList
                style={{ width: '100%', paddingBottom: 5 }}
                data={listContext.cards}
                renderItem={CardElement}
                ItemSeparatorComponent={ItemSeparator}
                keyExtractor={(item, index) => index.toString()}
            />
        </CardModalContext.Provider>
    );
};

const styles = StyleSheet.create({
    cardItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: 5,
        color: 'black',
        fontSize: 16,
        opacity: 0.8
    },

    btn: {

        flex: 1,
        backgroundColor: 'white',
        elevation: 5, // Ajustez la valeur de l'élévation selon vos besoins (pour Android)
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        borderRadius: 3,



    }
})