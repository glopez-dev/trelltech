import * as React from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Pressable, ListRenderItemInfo } from 'react-native';
import Member from '@src/api/Member';
import Workspace from '@src/api/Workspace';
import BoardList from '@src/components/HomeScreen/BoardList';



const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000000' },
    staticTitle: { fontSize: 20, fontWeight: 'bold', color: '#a0adbd', marginTop: 10, padding: 5 },
});

/**
 * The header component for the workspace list.
 * @returns {JSX.Element} The header component.
 */
function WorkspaceListHeader(): JSX.Element {
    return (
        <View style={styles.container}>
            <Text style={styles.staticTitle}>Vos espaces de travail</Text>
        </View>
    );
}

const fetchWorkspaces = async (memberId: string, setWorkspaces) => {

    if (!memberId) {
        console.error("WorkspaceList: fetchWorkspaces called with null/undefined memberId");
        setWorkspaces(null);
        return;
    }

    let workspaces: Workspace[];

    try {
        workspaces = await Member.getWorkspaces(memberId);
        console.log(workspaces)
        setWorkspaces(workspaces)
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

    const [workspaces, setWorkspaces] = React.useState<Workspace[] | null>(null);

    React.useEffect(() => {

        fetchWorkspaces(props.memberId, setWorkspaces);

    }, [props.memberId, setWorkspaces]);

    if (!workspaces) {
        return <Text>Loading...</Text>;
    }

    try {
        return (
            <FlatList
                data={workspaces}
                style={styles.container}
                keyExtractor={(item: Workspace) => item.id}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => <WorkspaceListHeader />}
                renderItem={({ item }: ListRenderItemInfo<Workspace>) => <BoardList workspace={item} />}
            />
        );

    } catch (error) {
        console.log("Error rendering Workspace list", error);
    }
};



