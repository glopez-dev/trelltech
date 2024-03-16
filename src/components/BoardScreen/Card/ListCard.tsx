import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useCardListContext } from './CardListContextProvider';
import Card from '@src/api/Card';
import CardModal from './CardModal';

type CardModalContextData = {
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
    isModalVisible: boolean
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

    type CardElementProps = { item: Card }

    const CardElement = ({ item }: CardElementProps): JSX.Element => {

        return (
            <View>
                <TouchableOpacity onPress={() => setIsModalVisible(true)}>
                    <Text style={styles.cardItem}>{item.name}</Text>
                </TouchableOpacity>
                <CardModal />
            </View >
        );
    };


    const ItemSeparator = () => <View style={{ height: 10 }} />


    return (
        <CardModalContext.Provider value={{ setIsModalVisible, isModalVisible }}>
            <FlatList
                style={{ width: '100%' }}
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
        backgroundColor: '#1c1c1e',
        borderWidth: 1,
        borderColor: '#2c333b',
        borderRadius: 5,
        color: 'white',
        fontSize: 16,
    }
})