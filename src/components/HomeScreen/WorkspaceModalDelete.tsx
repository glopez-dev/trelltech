import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useAppContext } from '@src/context/AppContextProvider';
import Workspace from '@src/api/Workspace';

type WorkspaceModalDeleteProps = {
    isVisible: boolean,
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>
    workspace: Workspace
}

export default function WorkspaceModalDelete({ isVisible, setIsVisible, workspace }: Readonly<WorkspaceModalDeleteProps>): JSX.Element {

    const { deleteWorkspace } = useAppContext();

    const handlePressDelete = () => {
        deleteWorkspace(workspace);
        setIsVisible(false);
    }

    const styles = StyleSheet.create({
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
        },
        modalView: {
            width: '70%',
            margin: 20,
            backgroundColor: "white",
            borderRadius: 10,
            paddingTop: 20,
            alignItems: "center",
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
        },
        title: {
            color: "black",
            fontWeight: "600",
            fontSize: 18,
            paddingHorizontal: 20
        },
        text: {
            color: "black",
            fontSize: 14,
            fontWeight: "400",
            paddingTop: 5,
            paddingBottom: 16,
        },
        cancelText: {
            color: "#2196f3",
            fontWeight: "600",
            fontSize: 18,
            paddingVertical: 10,
            borderEndColor: "#E5E7EB",
            borderRightWidth: 1,
        },
        deleteText: {
            color: "#DC2626",
            fontWeight: "600",
            fontSize: 18,
            paddingVertical: 10,

        },
        buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            height: 'auto',
            borderTopColor: '#E5E7EB',
            borderTopWidth: 1,
            width: '100%',
        },
        buttonCancel: {
            paddingHorizontal: 20,
            alignItems: "center",
            justifyContent: "center",
            borderEndColor: "#E5E7EB",
            borderRightWidth: 1,
            width: '50%'
        },
        buttonDelete: {
            paddingHorizontal: 20,
            alignItems: "center",
            justifyContent: "center",
            width: '50%'
        },
    });

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isVisible}
            onRequestClose={() => setIsVisible(false)}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.title}>Confirmer la suppression</Text>
                    <Text style={styles.text}>Cette action sera irrévocable.</Text>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.buttonCancel} onPress={() => setIsVisible(false)}>
                            <Text style={styles.cancelText}>Annuler</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonDelete} onPress={handlePressDelete} >
                            <Text style={styles.deleteText}>Supprimer</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal >
    );
}

