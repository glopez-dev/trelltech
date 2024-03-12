import React, { useState } from 'react';
import { View, Modal, Button, Text, TouchableOpacity } from 'react-native';
import { Icon, ThreeDotsIcon } from '@gluestack-ui/themed/build/components/Icons';


const ModalList = () => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View >

            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Icon as={ThreeDotsIcon} m="$2" w="$4" h="$4" color="white" />
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                    <View style={{ width: '100%', backgroundColor: 'white', padding: 20, borderRadius: 10, height: '45%', gap: 20 }}>

                        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} >
                            <Text style={{ color: 'blue' }}>Fermer</Text>
                        </TouchableOpacity>
                        <Text>Contenu de la modal</Text>

                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default ModalList;
