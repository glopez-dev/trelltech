import React from 'react';
import { View, Text, Button } from 'react-native';
import Modal from 'react-native-modal';
import { useCardModalContext } from './ListCard';
import { SafeAreaView } from 'react-native-safe-area-context';



export default function CardModal(): JSX.Element {

    const { isModalVisible, setIsModalVisible } = useCardModalContext();

    return (
        <Modal
            isVisible={isModalVisible}
            onBackdropPress={() => {
                setIsModalVisible(!isModalVisible);
            }}
            animationIn="zoomIn"
            animationOut="zoomOut"
            backdropOpacity={0.5}
            style={{ margin: 0, justifyContent: 'center', alignItems: 'center' }}
        >
            <ModalContent setIsModalVisible={setIsModalVisible} />
        </Modal>
    )

}

type ModalContentProps = { setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>> }

function ModalContent({ setIsModalVisible }: ModalContentProps): JSX.Element {
    return (
        <SafeAreaView style={{ flex: 1, width: '100%', backgroundColor: 'white' }} >

            {/* Header */}
            <SafeAreaView style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                backgroundColor: '#2c333b',
                paddingTop: 40,
                paddingBottom: 5
            }}
                edges={['top', 'left', 'right']}
            >
                <Text style={{ color: 'white', fontSize: 20, padding: 15 }}>Card Edition Modal Header</Text>
            </SafeAreaView>

            {/* Content */}
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>This is your full-screen modal content</Text>
            </SafeAreaView>

            {/* Footer */}
            <SafeAreaView style={{
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                backgroundColor: '#2c333b',
                paddingBottom: 40,
                paddingTop: 5
            }}>
                <Button title="Close" onPress={() => setIsModalVisible(false)} />
            </SafeAreaView>

        </SafeAreaView >
    );
}
