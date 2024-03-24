import React, { useState } from 'react';
import { View, Button, Text, TextInput, StyleSheet, Pressable } from 'react-native';
import Workspace from '@src/api/Workspace';
import { useBoardListContext } from './BoardListContext';
import Modal from 'react-native-modal';
import { AntDesign } from '@expo/vector-icons';
import SelectTemplate from './BoardModalCreate/SelectTemplate';

interface BoardModalCreateProps {
    isVisible: boolean;
    onClose: () => void;
    workspace: Workspace;
}

export default function BoardModalCreate(props: BoardModalCreateProps): JSX.Element {
    const [name, setName] = useState('');
    const [template, setTemplate] = useState('');
    const context = useBoardListContext();

    const handleNameChange = (value: string) => {
        setName(value);
    };

    const add = async () => {

        if (name === '') {
            return;
        }

        const success: boolean = await context.addBoard(name, props.workspace);

        if (!success) {
            return;
        }

        setName('');
        props.onClose();
        context.triggerReload();
    };

    return (
        <Modal
            animationIn={"slideInUp"}
            animationOut={"slideOutDown"}
            backdropColor='#000'
            backdropOpacity={0.5}
            backdropTransitionInTiming={500}
            isVisible={props.isVisible}
            onSwipeComplete={props.onClose}
            swipeDirection={"down"}
            avoidKeyboard={true}
            style={{ justifyContent: 'flex-end', margin: 0 }}
        >
            <View style={styles.modal}>
                <View style={styles.modalContent}>

                    <View style={styles.modalHeader}>
                        <Text style={styles.headerTitle}>Ajouter un tableau</Text>
                        <AntDesign
                            name="close"
                            size={24}
                            style={styles.closeIcon}
                            onPress={props.onClose}
                        />
                    </View>

                    <View style={styles.modalBody}>
                        <Text style={{ color: 'black', fontSize: 18, fontWeight: '500' }}>Nom</Text>
                        <View style={styles.modalBodyInput}>
                            <TextInput style={styles.modalBodyInputText} placeholder="Nom de votre tableau" value={name} onChangeText={handleNameChange} />
                        </View>

                        <SelectTemplate template={template} setTemplate={setTemplate} />

                        <View style={styles.modalFooter}>
                            <Pressable onPress={add} style={styles.button}>
                                <Text style={styles.buttonText}>Ajouter</Text>
                            </Pressable>
                        </View>
                    </View>

                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: 'flex-end',
        height: '100%',
        width: '100%',
    },
    modalContent: {
        height: '60%',
        paddingHorizontal: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: 'hidden',
        backgroundColor: 'white',
    },
    modalHeader: {
        paddingVertical: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        paddingLeft: 5,
        fontSize: 18,
        fontWeight: '500'
    },
    closeIcon: {
        color: '#0077e6',
        fontWeight: '500'
    },

    modalBody: {
        flex: 1,
        justifyContent: 'flex-start',
        gap: 10,
        paddingTop: 5,
    },
    modalBodyText: {
        fontSize: 20,
        color: '#172b4c',
        marginBottom: 15,
        paddingLeft: 5,

    },
    modalBodyInput: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#172b4c',
        backgroundColor: '#f0f2f3',

        borderRadius: 5,
        padding: 10,

    },
    modalBodyInputText: {
        color: '#172b4c',
        flex: 1,
    },
    modalFooter: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 40,
        padding: 10,
    },
    button: {
        backgroundColor: '#0077e6',
        width: '33%',
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '500'
    }
});
