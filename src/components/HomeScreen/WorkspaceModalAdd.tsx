import * as React from 'react';
import { Modal, View, Button, Text, TextInput } from 'react-native';
import { useAppContext } from '@src/context/AppContextProvider';

interface WorkspaceModalAddProps {
    isVisible: boolean;
    onClose: () => void;
}

export default function WorkspaceModalAdd(props: WorkspaceModalAddProps): JSX.Element {

    const [name, setName] = React.useState('');
    const appContext = useAppContext();


    const handleNameChange = (value: string): void => {
        setName(value);
    };

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
            <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                <View style={{ backgroundColor: 'white', height: '89%' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', backgroundColor: '#000000' }}>
                        <Button title="Fermer" onPress={props.onClose} />
                    </View>
                    <View style={{ height: '100%', backgroundColor: '#000000', gap: 10 }}>
                        <Text style={{ fontSize: 20, marginLeft: 10, color: 'white' }}>Nom de votre Workspace</Text>
                        <View style={{ marginTop: 10, marginBottom: 10, marginLeft: 10, marginRight: 10, padding: 10, backgroundColor: '#1c1c1e', borderRadius: 5, flexDirection: 'row', alignItems: 'center', }}>
                            <TextInput style={{ flex: 1, color: 'white', }} placeholder="Nom de votre Workspace" value={name} onChangeText={handleNameChange} />
                            <Button title="Add" onPress={add} />
                        </View>
                    </View>
                </View>
            </View>
        </Modal>
    );
};
