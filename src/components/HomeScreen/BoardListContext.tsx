import React from 'react';
import Board from '@src/api/Board';
import Workspace from '@src/api/Workspace';

export interface BoardListContextData {
    workspace: Workspace;
    workspaceBoards: Board[];
    setWorkspaceBoards: React.Dispatch<React.SetStateAction<Board[]>>;
    initWorkspaceBoards: (workspace: Workspace) => Promise<void>;
    reload: boolean;
    triggerReload: () => void;
    addBoard: (name: string, workspace: Workspace) => Promise<boolean>;
    deleteBoard: (deletedBoard: Board) => Promise<boolean>;
}

const BoardListContext = React.createContext<BoardListContextData | null>(null);

export const useBoardListContext = () => {
    const context = React.useContext(BoardListContext);
    if (!context) {
        throw new Error('useBoardListContext must be used within a BoardListContextProvider');
    }
    return context;
};

type BoardListContextProviderProps = {
    children: React.ReactNode,
    workspace: Workspace;
}


export function BoardListContextProvider({ children, workspace }: BoardListContextProviderProps): JSX.Element {

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

    const deleteBoard = async (deletedBoard: Board): Promise<boolean> => {
        const success: boolean = await deletedBoard.delete();
        if (!success) {
            return false;
        }
        setWorkspaceBoards(workspaceBoards.filter((board: Board) => board.id !== deletedBoard.id));
        return true;
    }

    const contextValue: BoardListContextData = {
        workspace,
        workspaceBoards,
        setWorkspaceBoards,
        initWorkspaceBoards,
        triggerReload,
        reload,
        addBoard,
        deleteBoard,
    };


    return (
        <BoardListContext.Provider value={contextValue}>
            {children}
        </BoardListContext.Provider>
    );

}

