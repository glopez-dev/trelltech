import React from 'react';
import Board from '@src/api/Board';
import Workspace from '@src/api/Workspace';
import { FlatList } from '@gluestack-ui/themed';
import BoardListHeader from './BoardListHeader';
import BoardItem from './BoardItem';
import { ListRenderItemInfo } from 'react-native';
import { useBoardListContext, BoardListContextData } from './BoardListContext';


/**
 * A list of boards for a workspace.
 * @param props The component properties.
 * @param props.workspace The workspace.
 * @param props.setWorkspace The function to update the workspace.
 * @returns The component.
 */
export default function BoardList(props: { workspace: Workspace }): JSX.Element {

    const context: BoardListContextData = useBoardListContext();

    React.useEffect(() => {

        context.initWorkspaceBoards(props.workspace);

    }, [props.workspace, context.reload]);

    return (
        <FlatList
            data={context.workspaceBoards}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item: Board, index: number) => index.toString()}
            renderItem={({ item }: ListRenderItemInfo<Board>) => <BoardItem item={item} />}
            ListHeaderComponent={() => <BoardListHeader workspace={props.workspace} />}
        />
    );

}
