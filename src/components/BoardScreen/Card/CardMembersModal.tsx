import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Modal from 'react-native-modal';
import { AntDesign } from '@expo/vector-icons';
import { useAppContext } from '@src/context/AppContextProvider';
import Workspace from '@src/api/Workspace';
import Member from '@src/api/Member';
import { useRoute } from '@react-navigation/native';
import {
    Avatar,
    AvatarFallbackText,
} from '@gluestack-ui/themed';
import { useCardModalContext } from './ListCard';
import { Feather } from '@expo/vector-icons';

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
            <MembersList />
        </View>
    );
}

function MembersList() {
    const { workspace } = useRoute().params as { workspace: Workspace };
    const [items, setItems] = React.useState<Member[]>([]);
    const [cardMembers, setCardMembers] = React.useState<Member[]>([]);
    const [reload, setReload] = React.useState(false);

    const { focusedCard } = useCardModalContext();

    React.useEffect(() => {
        const getMembers = async () => {
            try {
                const members = await workspace.getMembers();
                console.log(`[MembersList:getMembers] members:`, members);
                setItems(members);
            } catch (error) {
                console.error("Error getting workspace members:",);
                setItems(null);
            }
        };

        getMembers();

        const getCardMembers = async () => {
            try {
                const cardMembers = await focusedCard.getMembers();
                console.log(`[MembersList:getCardMembers] card members:`, cardMembers);
                setCardMembers(cardMembers);
            } catch (error) {
                console.error("Error getting workspace card members:",);
                setCardMembers(null);
            }
        };

        getCardMembers();

    }, [reload]);


    function checkIsMember(member: Member): boolean {
        const status = cardMembers.some((cardMember) => cardMember.id === member.id);
        console.log(`[MembersList:checkIsMember] is member:`, status);
        return status;
    }


    if (!items || items.length === 0) return <Text>Loading...</Text>;

    return (
        <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <MemberItem
                member={item}
                card={focusedCard}
                setReload={setReload}
                reload={reload}
                checkIsMember={checkIsMember}
            />
            }
        />
    );
}

function MemberItem(props) {

    const { member, card, checkIsMember, setReload, reload } = props;

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 10,
            width: '100%',
            padding: 15,
            backgroundColor: 'white',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62
        },
        text: {
            fontSize: 18
        },
        icon: {
            opacity: checkIsMember(member) ? 1 : 0,
            color: '#0077e6',
        }
    });

    const fullNameArray = member.fullName.split(" ");

    const firstName = fullNameArray[0][0].toUpperCase() + fullNameArray[0].slice(1).toLowerCase();
    const lastName = fullNameArray[1].toUpperCase();
    const displayName = firstName + " " + lastName;

    async function assignMemberToCard() {
        if (checkIsMember(member)) {
            const success: boolean = await card.removeMember(member);
            if (success)
                setReload(!reload)
        } else {
            const success: boolean = await card.addMember(member);
            if (success)
                success && setReload(!reload);
        }
    }

    return (
        <TouchableOpacity style={styles.container} onPress={assignMemberToCard}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                <Avatar bgColor="$amber600" borderRadius="$full" style={{ width: 40, height: 40 }}>
                    <AvatarFallbackText>{displayName}</AvatarFallbackText>
                </Avatar>
                <Text style={styles.text}>
                    {displayName}
                </Text>

            </View>

            <Feather name="check" size={24} color="black" style={styles.icon} />

        </TouchableOpacity>
    )
}
