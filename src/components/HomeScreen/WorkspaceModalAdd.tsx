import * as React from 'react';
import { Modal, View, Button, Text, TextInput, StyleSheet } from 'react-native';
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
        height: '89%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: '#000000',
    },
    modalBody: {
        height: '100%',
        backgroundColor: '#000000',
        gap: 10,
    },
    modalBodyText: {
        fontSize: 20,
        marginLeft: 10,
        color: 'white',
    },
    modalBodyInput: {
        marginTop: 10,
        marginBottom: 10,
        margin: 10,
        padding: 10,
        backgroundColor: '#1c1c1e',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    modalBodyInputText: {
        flex: 1,
        color: 'white',
    },
    modalBodyInputButton: {},
});




