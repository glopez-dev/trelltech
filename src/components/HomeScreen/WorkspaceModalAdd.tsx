import * as React from 'react';
import { Modal, View, Button, Text, TextInput, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useAppContext } from '@src/context/AppContextProvider';

interface WorkspaceModalAddProps {
    isVisible: boolean;
    onClose: () => void;
}

export default function WorkspaceModalAdd(props: WorkspaceModalAddProps): JSX.Element {

    const [name, setName] = React.useState('');
    const appContext = useAppContext();

    const handleNameChange = (value: string) => setName(value);

    const add = async () => {
        const success = await appContext.addWorkspace(name);

        if (success) {
            appContext.triggerReload();
            setName('');
            props.onClose();
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.isVisible}
        >
            <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.modal}>
                        <View style={styles.modalContent}>
                            <View style={styles.modalHeader}>
                                <Button title="Fermer" onPress={props.onClose} />
                            </View>
                            <View style={styles.modalBody}>
                                <Text style={styles.modalBodyText}>Nom de votre Workspace</Text>
                                <View style={styles.modalBodyInput}>
                                    <TextInput style={styles.modalBodyInputText} placeholder="Nom de votre Workspace" value={name} onChangeText={handleNameChange} />
                                    <Button title="Add" onPress={add} />
                                </View>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </Modal>
    );
};


const styles = StyleSheet.create({
    modal: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        height: '33%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: 'hidden',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: '#f3f2f8',
        padding: 5,
    },
    modalBody: {
        backgroundColor: '#f3f2f8',
        flex: 1,
        padding: 10,
    },
    modalBodyText: {
        fontSize: 20,
        color: '#172b4c',
        marginBottom: 10,
    },
    modalBodyInput: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,

        borderRadius: 5,
        padding: 10,

    },
    modalBodyInputText: {
        color: '#172b4c',
        flex: 1,
    },
});




