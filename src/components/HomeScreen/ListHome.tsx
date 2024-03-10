import * as React from 'react';
import { FlatList, StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native';
import Member from '@src/api/Member';
import Workspace from '@src/api/Workspace';
import Board from '@src/api/Board';
import ButtonAdd from '@src/components/HomeScreen/ButtonAdd';
import ButtonDelete from '@src/components/HomeScreen/ButtonDelete';
import ModalDeleteWorkspace from '@src/components/HomeScreen/ModalDeleteWorkspace';
import { useNavigation } from '@react-navigation/native';

export const ListHome = () => {
    const [workspaces, setWorkspaces] = React.useState([]);
    const [workspaceBoards, setWorkspaceBoards] = React.useState({});
    const [modalVisible, setModalVisible] = React.useState(false);

    const appendBoards = (workspace: Workspace, boardsList: Board[]) => {
        setWorkspaceBoards((prevState) => ({
            ...prevState,
            [workspace.id]: [...(prevState[workspace.id] || []), ...boardsList],
        }));
    };

    const ActivateModal = () => {
        console.log('test');
        setModalVisible(true);
    }

    const closeModal = () => {
        setModalVisible(false);
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
                    const boards = await workspace.getBoards();
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

    const navigate = useNavigation();
    const handlePress = (board: Board) => {
        navigate.navigate('Board', { boardId: board.id });
    }

    return (
        <FlatList
            style={styles.container}
            data={workspaces}
            ListHeaderComponent={<Text style={styles.staticTitle}>Vos espaces de travail</Text>}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
                <View>
                    <View style={styles.boxTitle}>
                        {/* On affiche le nom de l'espace qui est un boutton pour ouvrir le modal pour supprimer le workspace */}
                        <TouchableOpacity style={{ alignItems: 'center', padding: 10, marginTop: 10, }} onPress={ActivateModal}>
                            <Text style={{ color: 'white', fontSize: 17 }}>{item.displayName}</Text>
                        </TouchableOpacity>
                        <ModalDeleteWorkspace visible={modalVisible} onClose={closeModal} workspaceId={item.id} />
                        {/* boutton pour ajouter une liste */}
                        <ButtonAdd workspaceId={item.id} />
                    </View>
                    <FlatList
                        data={workspaceBoards[item.id]}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) =>
                            <Pressable style={styles.boxItem} onPress={() => handlePress(item)}>
                                <Text style={styles.item}>{item.name}</Text>
                                <ButtonDelete BoardId={item.id} />
                            </Pressable>
                        }
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

