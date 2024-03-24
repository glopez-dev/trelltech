import * as React from 'react';
import { VStack, HStack, Text, Box } from '@gluestack-ui/themed';
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useAppContext } from '@src/context/AppContextProvider';
import { Entypo } from '@expo/vector-icons';
import BoardModalOptions from './BoardModalOptions';

export default function BoardScreenHeader({ routeParams }) {

    const { board, workspace } = routeParams;

    const navigation = useNavigation();

    const workspaceName = workspace ? workspace.displayName : 'Workspace name';

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#0d4f72',
            paddingTop: 0,
            paddingBottom: 5
        },
        leftSide: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        closeButton: {
            paddingLeft: 15,
            paddingRight: 20,
            color: 'white'
        },
        titleContainer: {
            padding: 1,
            margin: 1,
        },
        workspaceName: {
            fontSize: 14,
            color: 'white',
            opacity: 0.5,
        },
        optionsButton: {
            paddingLeft: 15,
            paddingRight: 20,
            color: 'white'
        }

    });

    return (
        <SafeAreaView
            style={styles.container}
            edges={['top', 'left', 'right']}
        >
            <HStack style={styles.leftSide}>
                <AntDesign
                    name="close"
                    size={24}
                    color="black"
                    style={styles.closeButton}
                    onPress={() => { navigation.goBack() }}
                />

                <VStack style={styles.titleContainer}>
                    <Title board={board} />
                    <Text style={styles.workspaceName}>{workspaceName}</Text>
                </VStack>

            </HStack>

            <BoardOptionsButton style={styles.optionsButton} />

        </SafeAreaView >
    );
}

function Title({ board }): JSX.Element {

    const [boardName, setBoardName] = React.useState(board.name);
    const { triggerReload } = useAppContext();

    const updateBoardName = async () => {
        if (board) {
            board.name = boardName;
            await board.update();
            triggerReload();
        }
    }

    return (
        <TextInput style={{ color: 'white', fontSize: 18 }} value={boardName} onChangeText={setBoardName} onEndEditing={updateBoardName} />
    );

}

function BoardOptionsButton({ style }): JSX.Element {
    const [isModalVisible, setIsModalVisible] = React.useState(false);

    return (
        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
            <Entypo
                name='dots-three-horizontal'
                size={18}
                style={style}
            />
            <BoardModalOptions isVisible={isModalVisible} setIsVisible={setIsModalVisible} />
        </TouchableOpacity>
    );
}