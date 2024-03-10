
import * as React from 'react';
import { FlatList, StyleSheet, Text, View, Pressable } from 'react-native';
import Member from '@src/api/Member';
import Workspace from '@src/api/Workspace';
import Board from '@src/api/Board';
import ButtonAdd from '@src/components/HomeScreen/ButtonAdd';
import { useNavigation } from '@react-navigation/native';


export const ListHome = () => {
    // Store all workspaces
    const [workspaces, setWorkspaces] = React.useState([]);
    // Maps workspace id to the list of its boards
    const [workspaceBoards, setWorkspaceBoards] = React.useState({});

    // Helper function
    const appendBoards = (workspace: Workspace, boardsList: Board[]) => {
        setWorkspaceBoards((prevState) => ({
            ...prevState,
            [workspace.id]: [...(prevState[workspace.id] || []), ...boardsList],
        }));
    };

    const fetchData = async () => {
        try {
            // On récupére tous les workspaces de l'utilisateur
            const responseWorkspace = await Member.getWorkspaces('622a3d0f72bc0865d9a6f349');
            // On stocke la liste des workspaces dans le state
            setWorkspaces(responseWorkspace);

            // On initialise le dictionnaire workspaceBoards
            for (const workspace of responseWorkspace) {
                const boards = await workspace.getBoards();
                appendBoards(workspace, boards);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    React.useEffect(() => {
        fetchData();
        return () => { };
    }, []);

    // Custom hook to retrieve the navigation object
    const navigation = useNavigation();

    /**
     * A function to handle press events on the list items.
     *
     * @param {Board} board - the board object
     * @return {void} 
     */
    const handlePress = (board: Board) => {
        navigation.navigate('BoardScreen', { board });
    };


    return (
        <FlatList
            style={styles.container}
            data={workspaces}
            ListHeaderComponent={<Text style={styles.staticTitle}>Vos espaces de travail</Text>}
            keyExtractor={(item, index) => index.toString()}
            /* Item is a Workspace object */
            renderItem={({ item }) => (
                <Pressable onPress={() => handlePress(item)}>
                    <View style={styles.boxTitle}>

                        <Text style={styles.title}>{item.displayName}  </Text>
                        <ButtonAdd workspaceId={item.id} />
                    </View>

                    <FlatList
                        data={workspaceBoards[item.id]}
                        renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
                        keyExtractor={(item, index) => index.toString()}
                    />

                </Pressable>
            )}
        />

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',


    },
    item: {
        padding: 15,
        backgroundColor: '#1c1c1e',
        color: 'white',
        borderWidth: 1,
        borderColor: '#2c333b',
        display: 'flex',



    },
    title: {
        fontSize: 17,
        fontWeight: 'bold',
        padding: 10,
        color: '#a0adbd',


        marginTop: 10,



    },
    title1: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#a0adbd',


    },
    staticTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#a0adbd',

        marginTop: 10,
        padding: 5,

    },

    boxTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }


});


