import * as React from 'react';
import { Fontisto } from '@expo/vector-icons';
import HeaderRight from '@src/components/HeaderRight';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Member from '@src/api/Member';
import Workspace from '@src/api/Workspace';
import Board from '@src/api/Board';


/**
 * The function that manages the logic to configure the HomeScreen options.
 * Is passed to the `Tab.Screen` component that renders the `HomeScreen`.
 *
 * @param {object} - An object that contains the `navigation` and `route` props.
 * @returns {object} - An object that contains the `Screen` options. 
 */
export function homeScreenOptions({ navigation, route }): object {

    return {
        tabBarIcon: ({ color, size }) => <Fontisto name="trello" size={22} color={color} />,
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: '#2c333b' },
        tabBarLabel: 'Tableaux',
        /* Elone */
        headerStyle: { backgroundColor: '#2c333b' },
        headerTintColor: 'white',
        headerTitleStyle: { fontWeight: 'bold', fontSize: 25 },
        headerTitleAlign: 'center',
        headerTitle: 'Trelltech',
        headerRight: () => <HeaderRight />,
    };
}

export const HomeScreen = () => {
    const [workspaces, setWorkspaces] = React.useState([]);
    const [workspaceBoards, setWorkspaceBoards] = React.useState({});

    const appendBoards = (workspace: Workspace, boardsList: Board[]) => {
        setWorkspaceBoards((prevState) => ({
            ...prevState,
            [workspace.id]: [...(prevState[workspace.id] || []), ...boardsList],
        }));
    };


    React.useEffect(() => {
        const fetchData = async () => {
            try {

                // On récupére tous les workspaces de l'utilisateur
                const responseWorkspace = await Member.getWorkspaces('622a3d0f72bc0865d9a6f349');
                // On stocke la lsite des workspaces dans le state
                setWorkspaces(responseWorkspace);
                // On affich les 
                console.log(responseWorkspace);

                for (const workspace of responseWorkspace) {
                    const boards = await Workspace.getBoards(workspace.id);
                    console.log(boards);
                    appendBoards(workspace, boards);
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();

        return () => {

        };
    }, []);

    return (

        <FlatList
            style={styles.container}
            data={workspaces}
            ListHeaderComponent={<Text style={styles.staticTitle}>Vos espaces de travail</Text>}
            keyExtractor={(item, index) => index.toString()}
            /* Item is a Workspace object */
            renderItem={({ item }) => (
                <View>
                    <Text style={styles.title}>{item.displayName}</Text>

                    <FlatList
                        data={workspaceBoards[item.id]}
                        renderItem={({ item }) => <Text style={styles.item}>{item.name}</Text>}
                        keyExtractor={(item, index) => index.toString()}
                    />

                </View >
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

    }


});
