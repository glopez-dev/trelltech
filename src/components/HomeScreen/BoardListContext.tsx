import React from 'react';
import Board from '@src/api/Board';
import Workspace from '@src/api/Workspace';

export interface BoardListContextData {
    workspaceBoards: Board[];
    setWorkspaceBoards: React.Dispatch<React.SetStateAction<Board[]>>;
    initWorkspaceBoards: (workspace: Workspace) => Promise<void>;
    reload: boolean;
    triggerReload: () => void;
    addBoard: (name: string, workspace: Workspace) => Promise<boolean>;
}

const BoardListContext = React.createContext<BoardListContextData | null>(null);

export const useBoardListContext = () => {
    const context = React.useContext(BoardListContext);
    if (!context) {
        throw new Error('useBoardListContext must be used within a BoardListContextProvider');
    }
    return context;
};


export function BoardListContextProvider({ children }: { children: React.ReactNode }) {

    const [workspaceBoards, setWorkspaceBoards] = React.useState<Board[]>([]);
    const [reload, setReload] = React.useState(false);

    const triggerReload = () => {
        setReload(!reload);
    }

    const initWorkspaceBoards = async (workspace: Workspace): Promise<void> => {
        const boards = await workspace.getBoards();
        setWorkspaceBoards(boards);
    }

    const addBoard = async (name: string, workspace: Workspace): Promise<boolean> => {
        const newBoard: Board = await Board.create(name, workspace.id);

        if (!newBoard) {
            return false;
        }

        setWorkspaceBoards([...workspaceBoards, newBoard]);
        return true;
    }

    const contextValue: BoardListContextData = {
        workspaceBoards,
        setWorkspaceBoards,
        initWorkspaceBoards,
        triggerReload,
        reload,
        addBoard,
    };


    return (
        <BoardListContext.Provider value={contextValue}>
            {children}
        </BoardListContext.Provider>
    );

}

