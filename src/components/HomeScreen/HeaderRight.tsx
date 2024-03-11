import * as React from 'react';
import { Button, AddIcon, ButtonIcon, View, Text } from "@gluestack-ui/themed";
import ModalWorkspaceAdd from '@src/components/HomeScreen/ModalWorkspaceAdd';

export default function HeaderRight() {

    const [isModalVisible, setIsModalVisible] = React.useState(false);

    const handleButtonClick = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };


    return (
        <>
            <View style={{ marginBottom: 9, alignItems: 'center', justifyContent: 'center' }}>
                <Button
                    size="sm"
                    variant="solid"
                    action="primary"
                    disabled={isModalVisible}
                    isFocusVisible={false}
                    bg="#2c333b"
                    opacity={isModalVisible ? -1.5 : 1}
                    onPress={handleButtonClick}
                >
                    <ButtonIcon as={AddIcon} size="xl" />
                </Button>
            </View>
            <ModalWorkspaceAdd isVisible={isModalVisible} onClose={handleCloseModal} />
        </>
    )
}
