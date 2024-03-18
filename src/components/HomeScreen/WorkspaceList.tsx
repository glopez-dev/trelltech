import * as React from 'react';
import { FlatList, StyleSheet, Text, View, ListRenderItemInfo } from 'react-native';
import Member from '@src/api/Member';
import Workspace from '@src/api/Workspace';
import BoardList from '@src/components/HomeScreen/BoardList';
import { useAppContext } from '@src/context/AppContextProvider';
import { BoardListContextProvider } from './BoardListContext';

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f3f2f8', },
    staticTitle: { fontSize: 16, fontWeight: 'bold', color: '#44546e', marginTop: 10, padding: 5 },
});

/**
 * The header component for the workspace list.
 * @returns {JSX.Element} The header component.
 */
function WorkspaceListHeader(): JSX.Element {
    return (
        <View style={styles.container}>
            <Text style={styles.staticTitle}>VOS ESPACES DE TRAVAIL</Text>
        </View>
    );
}

export const fetchWorkspaces = async (memberId: string, setWorkspaces) => {

    if (!memberId) {
        console.error("WorkspaceList: fetchWorkspaces called with null/undefined memberId");
        setWorkspaces(null);
        return;
    }

    let workspaces: Workspace[];

    try {
        workspaces = await Member.getWorkspaces(memberId);
        setWorkspaces(workspaces)
        console.log("Fetched member workspaces:", workspaces);
    } catch (error) {
        console.error("Error fetching member workspaces:", error.message);
        setWorkspaces(null);
    }

}


type WorkspaceListProps = {
    memberId: string;
};

/**
 * A list of workspaces for a member.
 * @param memberId The member's ID.
 * @returns The component.
 */
export default function WorkspaceList(props: WorkspaceListProps): JSX.Element {

    const appContext = useAppContext();

    React.useEffect(() => {
        fetchWorkspaces(props.memberId, appContext.setWorkspaces);

    }, [props.memberId, appContext.reload]);

    if (!appContext.workspaces) {
        return <Text>Loading...</Text>;
    }

    try {
        return (
            <FlatList
                data={appContext.workspaces}
                style={styles.container}
                keyExtractor={(item: Workspace) => item.id}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => <WorkspaceListHeader />}
                renderItem={({ item }: ListRenderItemInfo<Workspace>) => (
                    <BoardListContextProvider key={item.id} workspace={item}>
                        <BoardList workspace={item} />
                    </BoardListContextProvider>
                )}
            />
        )

    } catch (error) {
        console.log("Error rendering Workspace list", error);
    }

};





