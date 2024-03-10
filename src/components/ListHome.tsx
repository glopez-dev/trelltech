
import * as React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Member from '@src/api/Member';
import Workspace from '@src/api/Workspace';
import Board from '@src/api/Board';
import ButtonAdd from './Home/ButtonAdd';
import ButtonDelete from './Home/ButtonDelete';


export const ListHome = () => {
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
            showsVerticalScrollIndicator={false}
            /* Item is a Workspace object */
            renderItem={({ item }) => (
                <View>
                    <View style={styles.boxTitle}>

                        <Text style={styles.title}>{item.displayName}  </Text>
                        <ButtonAdd workspaceId={item.id} />
                    </View>

                    <FlatList
                        data={workspaceBoards[item.id]}
                        renderItem={({ item }) =>

                            <View style={styles.boxItem}>

                                <Text style={styles.item}>{item.name}   </Text>
                                <ButtonDelete BoardId={item.id} />
                            </View>

                        }


                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}

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
    },

    boxItem: {
        flexDirection: 'row',

        justifyContent: 'space-between',
        backgroundColor: '#1c1c1e',
        borderWidth: 1,
        borderColor: '#2c333b',
    }




});


