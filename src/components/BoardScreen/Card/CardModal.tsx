import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleProp, TextStyle } from 'react-native';
import Modal from 'react-native-modal';
import { useCardModalContext } from './ListCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import CardFastActions from './CardFastActions';


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
                <Text style={{ color: 'white', fontSize: 20, padding: 15 }}>{card.name}</Text>
            </ModalContentHeader>

            {/* Content */}
            <SafeAreaView style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
                <CardFastActions />
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
            backgroundColor: '#2c333b',
            paddingTop: 40,
            paddingBottom: 5
        }}
            edges={['top', 'left', 'right']}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                {children}
            </View>

            <CardOptionsButton style={{ paddingRight: 15, color: 'white' }} />
        </SafeAreaView>
    );
}

function CloseModalButton(): JSX.Element {

    const { setIsModalVisible } = useCardModalContext();

    return (
        <AntDesign
            name="close"
            size={24}
            style={{ paddingLeft: 15, paddingRight: '20px', color: 'white' }}
            onPress={() => setIsModalVisible(false)}
        />
    );
}

function CardOptionsButton({ style }): JSX.Element {
    return (
        <Entypo
            name='dots-three-horizontal'
            size={20}
            style={style}
        />
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

