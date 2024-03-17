import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import { AntDesign } from '@expo/vector-icons';
import { useAppContext } from '@src/context/AppContextProvider';
import Member from '@src/api/Member';

type Props = {
    isVisible: boolean,
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export default function CardMembersModal({ isVisible, setIsVisible }: Readonly<Props>) {

    const hideModal = () => {
        setIsVisible(false);
    };

    const styles = StyleSheet.create({
        modal: {
            margin: 0,
            justifyContent: 'flex-end',
        },
        modalContent: {
            paddingTop: 0,
            height: '88%',

            justifyContent: 'flex-start',
            alignItems: 'center',

            borderRadius: 10,
            backgroundColor: 'white',

            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
        },
    });


    return (
        <Modal
            isVisible={isVisible}
            style={styles.modal}
            onSwipeComplete={hideModal}
            swipeDirection={['down']}
            backdropOpacity={0.5}
        >
            <View style={styles.modalContent}>

                <Header setIsVisible={setIsVisible} />

                <Content />

            </View>
        </Modal>
    );


}

function Header({ setIsVisible }: { setIsVisible: React.Dispatch<React.SetStateAction<boolean>> }) {

    const styles = StyleSheet.create({
        header: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            padding: 18,
        },
        titleContainer: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            width: '90%',
        },
        text: {
            color: 'black',
            fontSize: 18,
            fontWeight: '500',
            transform: [{ translateX: -10 }],
        },
        closeIcon: {
            color: '#0077e6',
            fontWeight: '500'
        },
    });

    return (
        <View style={styles.header}>
            <AntDesign
                name="close"
                size={24}
                style={styles.closeIcon}
                onPress={() => setIsVisible(false)}
            />
            <View style={styles.titleContainer}>
                <Text style={styles.text}>Membres</Text>
            </View>
        </View>
    );
}

function Content() {

    const styles = StyleSheet.create({
        container: {
            width: '100%',
            height: '100%',
            backgroundColor: '#F3F4F6',
            borderTopWidth: 1,
            borderColor: '#D1D5DB',
            paddingTop: 40,
        }
    })

    return (
        <View style={styles.container}>
            <Text>Content</Text>
        </View>
    );
}

function MembersList() {
    // TODO: Trouver un moyen de récupérer le workspace actuel
    const { workspaces } = useAppContext();
    const workspace = workspaces[0];

    const [members, setMembers] = React.useState<Member[]>([]);

    React.useEffect(() => {

        const getMembersList = async () => {
            const members = await workspace.getMembers();
            setMembers(members);
        };

        getMembersList();
    }, []);

    return (
        <FlatList
            data={members}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <Text>{item.fullName}</Text>}
        />
    );
}