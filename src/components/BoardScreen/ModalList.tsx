import React, { useState } from 'react';
import { ScrollView, View, Modal, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { Icon, ThreeDotsIcon } from '@gluestack-ui/themed/build/components/Icons';
import ButtonDeleteList from './ButtonDeleteList';
import ButtonUpdateList from './ButtonUpdateList';
import { useCardListContext } from './Card/CardListContextProvider';

const ModalList = () => {

    const [modalVisible, setModalVisible] = useState(false);

    const { list } = useCardListContext();

    return (
        <View>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Icon as={ThreeDotsIcon} color="$black" style={{ transform: [{ translateY: 2 }] }} />
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                            <View style={{ width: '100%', backgroundColor: 'white', padding: 20, borderRadius: 10, minHeight: '26%', }}>

                                <TouchableOpacity onPress={() => setModalVisible(false)} >
                                    <Text style={{ color: 'blue', alignSelf: 'flex-end', marginBottom: 15 }}>Fermer</Text>
                                </TouchableOpacity>

                                <View style={{ justifyContent: 'center', backgroundColor: 'white', }}>
                                    <ButtonDeleteList list={list} setModalVisible={setModalVisible} />
                                    <ButtonUpdateList list={list} name={list.name} setModalVisible={setModalVisible} />
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </Modal>

        </View >
    );
};

export default ModalList;
