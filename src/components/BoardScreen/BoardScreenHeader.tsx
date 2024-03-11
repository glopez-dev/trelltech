import * as React from 'react';
import { VStack, Text, Box } from '@gluestack-ui/themed';
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';


export default function BoardScreenHeader({ routeParams }) {

    const { board } = routeParams;

    const navigation = useNavigation();

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
                <Text style={{ fontSize: 18, color: 'white' }}>Board name</Text>
                <Text style={{ fontSize: 14, color: 'white', opacity: 0.5 }}>Workspace name </Text>
            </VStack>
        </SafeAreaView >
    );
}