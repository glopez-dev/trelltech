import * as React from 'react';
import Board from '@src/api/Board';
import Workspace from '@src/api/Workspace';
import { FlatList } from '@gluestack-ui/themed';
import BoardListHeader from './BoardListHeader';
import BoardItem from './BoardItem';


export default function BoardList({ workspace }: { workspace: Workspace }) {

    const [workspaceBoards, setWorkspaceBoards]: [Board[], React.Dispatch<React.SetStateAction<Board[]>>] = React.useState([]);

    React.useEffect(() => {
        const initWorkspaceBoards = async () => {
            const boards = await workspace.getBoards();
            setWorkspaceBoards(boards);
        }

        initWorkspaceBoards();

    }, [workspace]);

    return (
        <FlatList
            data={workspaceBoards}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <BoardItem item={item as Board} />}
            ListHeaderComponent={workspace => <BoardListHeader workspace={workspace} />}
        />
    );

}
