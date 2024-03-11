import * as React from 'react';
import Board from '@src/api/Board';
import Workspace from '@src/api/Workspace';
import { FlatList } from '@gluestack-ui/themed';
import BoardListHeader from './BoardListHeader';
import BoardItem from './BoardItem';
import { ListRenderItemInfo } from 'react-native';


/**
 * A list of boards for a workspace.
 * @param workspace The workspace.
 * @returns The component.
 */
export default function BoardList({ workspace }: { workspace: Workspace }): JSX.Element {

    const [workspaceBoards, setWorkspaceBoards] = React.useState<Board[]>([]);

    React.useEffect(() => {
        const initWorkspaceBoards = async (): Promise<void> => {
            const boards = await workspace.getBoards();
            setWorkspaceBoards(boards);
        }

        initWorkspaceBoards();

    }, [workspace]);

    return (
        <FlatList
            data={workspaceBoards}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item: Board, index: number) => index.toString()}
            renderItem={({ item }: ListRenderItemInfo<Board>) => <BoardItem item={item} />}
            ListHeaderComponent={() => <BoardListHeader workspace={workspace} />}
        />
    );

}
