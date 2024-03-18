import * as React from 'react';
import { Button, AddIcon, ButtonIcon, View, Text } from "@gluestack-ui/themed";
import BoardModalCreate from './BoardModalCreate';
import Workspace from '@src/api/Workspace';
import { TouchableOpacity } from 'react-native';


export const BoardButtonAdd = ({ workspace }: { workspace: Workspace }) => {

    const [isModalVisible, setIsModalVisible] = React.useState(false);

    const handleButtonClick = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);

    };
    return (
        <>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <TouchableOpacity
                    style={{ paddingRight: 15 }}
                    disabled={isModalVisible}
                    opacity={isModalVisible ? -1.5 : 1}
                    onPress={handleButtonClick}
                >
                    <ButtonIcon as={AddIcon} size="xl" />
                </TouchableOpacity>
            </View >
            <BoardModalCreate isVisible={isModalVisible} onClose={handleCloseModal} workspace={workspace} />
        </>
    );
};
