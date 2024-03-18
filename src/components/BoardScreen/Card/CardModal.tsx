import React from 'react';
import { View, Text, Button, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { useCardModalContext } from './ListCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import CardFastActions from './CardFastActions';
import Card from '@src/api/Card';
import CardOptionsModal from './CardOptionsModal';


export default function CardModal(): JSX.Element {

    const { isModalVisible, setIsModalVisible, setFocusedCard, focusedCard } = useCardModalContext();

    return (
        <Modal
            isVisible={isModalVisible}
            onBackdropPress={() => {
                setFocusedCard(null);
                setIsModalVisible(!isModalVisible);
            }}
            animationIn="zoomIn"
            animationOut="zoomOut"
            backdropOpacity={0.5}
            style={{ margin: 0, justifyContent: 'center', alignItems: 'center' }}
        >
            <ModalContent card={focusedCard} />
        </Modal>
    )

}

type ModalContentProps = {
    card: Card
}

function ModalContent({ card }: ModalContentProps): JSX.Element {

    const { setIsModalVisible } = useCardModalContext();

    return (
        <SafeAreaView style={{ flex: 1, width: '100%', backgroundColor: 'white' }} >

            <ModalContentHeader>
                <CloseModalButton />
                <Text style={{ color: 'black', fontSize: 20, padding: 15 }}>{card.name}</Text>
            </ModalContentHeader>

            {/* Content */}
            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
                    <CardFastActions />
                </ScrollView>
            </SafeAreaView>

            {/* Footer */}
            <ModalFooter>
                <Button
                    title="Test"
                    onPress={() => {
                        setIsModalVisible(false);
                    }}
                />
            </ModalFooter>

        </SafeAreaView >
    );
}

function ModalContentHeader({ children }): JSX.Element {

    const { focusedCard } = useCardModalContext();

    return (
        <SafeAreaView style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#f0f2f3',
            paddingTop: 40,
            paddingBottom: 0,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.08,
            shadowRadius: 2,
        }}
            edges={['top', 'left', 'right']}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                {children}
            </View>

            <CardOptionsButton style={{ paddingRight: 15, color: 'black' }} />
        </SafeAreaView>
    );
}


function CloseModalButton(): JSX.Element {

    const { setIsModalVisible } = useCardModalContext();

    return (
        <AntDesign
            name="close"
            size={24}
            style={{ paddingLeft: 15, paddingRight: 10, color: 'black' }}
            onPress={() => setIsModalVisible(false)}
        />
    );
}

function CardOptionsButton({ style }): JSX.Element {
    const [isModalVisible, setIsModalVisible] = React.useState(false);

    return (
        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
            <Entypo
                name='dots-three-horizontal'
                size={20}
                style={style}
            />
            <CardOptionsModal isVisible={isModalVisible} setIsVisible={setIsModalVisible} />
        </TouchableOpacity>
    );
}

function ModalFooter({ children }): JSX.Element {
    return (
        <SafeAreaView style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            backgroundColor: '#2c333b',
            paddingBottom: 40,
            paddingTop: 5
        }}
            edges={['bottom', 'left', 'right']}
        >
            {children}
        </SafeAreaView>
    );
}

