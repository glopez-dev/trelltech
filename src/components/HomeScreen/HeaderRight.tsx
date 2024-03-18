import * as React from 'react';
import { Button, AddIcon, ButtonIcon, View, Text } from "@gluestack-ui/themed";
//import { WorkspaceModalAdd } from '@src/components/HomeScreen';
import WorkspaceModalAdd from './WorkspaceModalAdd';


export default function HeaderRight(): JSX.Element {

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
                    bg="#0c65e3"
                    opacity={isModalVisible ? -1.5 : 1}
                    onPress={handleButtonClick}
                >
                    <ButtonIcon as={AddIcon} size="xl" />
                </Button>
            </View>
            <WorkspaceModalAdd isVisible={isModalVisible} onClose={handleCloseModal} />
        </>
    )
}
