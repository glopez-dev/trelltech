import * as React from 'react';
import { VStack, Text, Box } from '@gluestack-ui/themed';
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';


export default function BoardScreenHeader({ routeParams }) {

    const { board, workspace } = routeParams;

    const navigation = useNavigation();
    const route = useRoute();

    const boardName = board ? board.name : 'Board name';
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
                <Text style={{ fontSize: 18, color: 'white' }}>{boardName}</Text>
                <Text style={{ fontSize: 14, color: 'white', opacity: 0.5 }}>{workspaceName}</Text>
            </VStack>
        </SafeAreaView >
    );
}