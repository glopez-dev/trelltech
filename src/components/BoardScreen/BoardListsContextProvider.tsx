import React from 'react';
import List from '@src/api/List';
import Board from '@src/api/Board';

export type BoardListsContextData = {
    lists: List[]
    board: Board
    setLists: React.Dispatch<React.SetStateAction<List[]>>
    addList: (name: string, board: Board) => Promise<boolean>
    removeList: (deletedList: List) => Promise<boolean>
}

export const BoardListsContext = React.createContext<BoardListsContextData | null>(null);

export const useBoardListsContext = () => React.useContext(BoardListsContext)


export type BoardListsContextProviderProps = {
    children: React.ReactNode
    board: Board
}

export default function BoardListsContextProvider({ children, board }: Readonly<BoardListsContextProviderProps>): JSX.Element {

    const [lists, setLists] = React.useState<List[]>([]);

    React.useEffect(() => {

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

    const addList = async (name: string, board: Board): Promise<boolean> => {
        try {
            const newList = await List.create(name, board.id);
            setLists([...lists, newList]);
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    const removeList = async (deletedList: List): Promise<boolean> => {
        try {
            const success: boolean = await List.delete(deletedList.id);
            if (!success) {
                return false;
            }
            setLists(lists.filter((list: List) => list.id !== deletedList.id));
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    const contextValue = React.useMemo(() => ({
        lists,
        board,
        setLists,
        addList,
        removeList,
    }), [lists, setLists, addList, removeList]);


    return (
        <BoardListsContext.Provider value={contextValue}>
            {children}
        </BoardListsContext.Provider>
    )
}