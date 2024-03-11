import * as React from 'react';
import { Button, AddIcon, ButtonIcon, View, Text } from "@gluestack-ui/themed";
import ModalCreateBoard from '@src/components/HomeScreen/ModalCreateBoard';



const ButtonAddWorkspace = ({ workspaceId }) => {

    const [isModalVisible, setIsModalVisible] = React.useState(false);

    const handleButtonClick = () => {
        setIsModalVisible(true);
        console.log(workspaceId);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);

    };
    return (
        <>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Button
                    size="sm"
                    variant="solid"
                    action="primary"
                    disabled={isModalVisible}
                    isFocusVisible={false}
                    bg="#000000"
                    opacity={isModalVisible ? -1.5 : 1}
                    onPress={handleButtonClick}
                >
                    <ButtonIcon as={AddIcon} size="xl" />
                </Button>
            </View >
            <ModalCreateBoard isVisible={isModalVisible} onClose={handleCloseModal} workspaceId={workspaceId} />
        </>
    );
};

export default ButtonAddWorkspace;