import * as React from 'react';
import { VStack, Text, Box } from '@gluestack-ui/themed';
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import Board from '@src/api/Board';
import { TextInput } from 'react-native';
import { useBoardListContext } from '@src/components/HomeScreen/BoardListContext';
import { useAppContext } from '@src/context/AppContextProvider';

export default function BoardScreenHeader({ routeParams }) {

    const { board, workspace } = routeParams;

    const navigation = useNavigation();

    const workspaceName = workspace ? workspace.displayName : 'Workspace name';

    return (
        <SafeAreaView style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: '#2c333b',
            paddingTop: 0,
            paddingBottom: 5
        }}
            edges={['top', 'left', 'right']}
        >
            <AntDesign
                name="close"
                size={24}
                color="black"
                style={{ paddingLeft: 15, paddingRight: 20, color: 'white' }}
                onPress={() => { navigation.goBack() }}
            />
            <VStack style={{ padding: 1, margin: 1 }}>
                <Title board={board} />
                <Text style={{ fontSize: 14, color: 'white', opacity: 0.5 }}>{workspaceName}</Text>
            </VStack>
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