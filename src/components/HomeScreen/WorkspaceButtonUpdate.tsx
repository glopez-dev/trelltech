import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import WorkspaceModalUpdate from './WorkspaceModalUpdate';

export default function WorkspaceButtonUpdate({ workspace }): JSX.Element {
    const [showModal, setShowModal] = useState(false);
    let pressTimer;

    const handlePressIn = () => {
        // Démarrer un délai de 1000ms (1 seconde) pour afficher la modal
        pressTimer = setTimeout(() => {
            setShowModal(true);
        }, 1000);
    };

    const handlePressOut = () => {
        // Annuler le délai si l'utilisateur relâche le bouton avant 1 seconde
        clearTimeout(pressTimer);
    };

    return (
        <View>
            <TouchableOpacity
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                activeOpacity={0.6}
            >
                <View style={styles.button}>
                    <Text style={styles.buttonText}>Appuyez Longuement</Text>
                </View>
            </TouchableOpacity>
            <WorkspaceModalUpdate visible={showModal} onClose={() => setShowModal(false)} workspace={workspace} />
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        textAlign: 'center',
    },
});

