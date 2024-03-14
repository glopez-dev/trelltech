import React from 'react';
import List from '@src/api/List';
import Card from '@src/api/Card';

export type ListContextProviderData = {
    cards,
    initListCards,
    addCard,
    deleteCard
}

const CardListContext = React.createContext<ListContextProviderData | null>(null);

export const useCardListContext = () => {
    const context = React.useContext(CardListContext);
    if (!context) {
        throw new Error('useCardListContext must be used within a CardListContextProvider');
    }
    return context;
};

type CardListContextProviderProps = {
    children: React.ReactNode,
    list: List,
}

/**
 * Provider component for card list context.
 * Provides access to the list's cards state and functions to add and delete cards.
 *
 * @param {React.ReactNode} children
 * @param {List} list - Trello list for the card list.
 * @returns {JSX.Element}
 */
export function CardListContextProvider({ children, list }: CardListContextProviderProps): JSX.Element {

    const [cards, setCards] = React.useState<Card[]>([]);

    const initListCards = async (list: List): Promise<void> => {
        const cards = await list.getCards();
        setCards(cards);
    };

    const addCard = async (name: string): Promise<void> => {
        const card = await Card.create(list.id, name);
        if (card) {
            setCards([...cards, card]);
        }
    };

    const deleteCard = async (card: Card): Promise<void> => {
        const success: boolean = await card.delete();
        if (!success) {
            return;
        }
        setCards(cards.filter((c) => c.id !== card.id));
    };

    const contextValue: ListContextProviderData = {
        cards,
        initListCards,
        addCard,
        deleteCard,
    };

    return (
        <CardListContext.Provider value={contextValue}>
            {children}
        </CardListContext.Provider>
    );

