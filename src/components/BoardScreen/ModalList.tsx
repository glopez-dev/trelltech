import React, { useState } from 'react';
import { ScrollView, View, Modal, Button, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Icon, ThreeDotsIcon } from '@gluestack-ui/themed/build/components/Icons';
import ButtonDeleteList from './ButtonDeleteList';
import ButtonUpdateList from './ButtonUpdateList';

const ModalList = ({ listId, name }) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View>
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
                <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                            <View style={{ width: '100%', backgroundColor: 'white', padding: 20, borderRadius: 10, minHeight: '45%', gap: 20 }}>

                                <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} >
                                    <Text style={{ color: 'blue' }}>Fermer</Text>
                                </TouchableOpacity>

                                <ButtonDeleteList listId={listId} />
                                <ButtonUpdateList listId={listId} name={name} />
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </Modal>
        </View>
    );
};

export default ModalList;
