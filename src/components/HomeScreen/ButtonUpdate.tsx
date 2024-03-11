import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ModalWorkspaceUpdate from './ModalWorkspaceUpdate';

const ButtonUpdate = () => {
    const [isPressed, setIsPressed] = useState(false);
    const [showModal, setShowModal] = useState(false);

    let timeoutId;

    const handlePressIn = () => {
        setIsPressed(true);
        // Démarrer un délai de 3 secondes pour afficher la modal
        timeoutId = setTimeout(() => {
            setShowModal(true);
        }, 1000);
    };

    const handlePressOut = () => {
        setIsPressed(false);
        // Annuler le délai si l'utilisateur relâche le bouton avant 3 secondes
        clearTimeout(timeoutId);
    };

    return (
        <View>
            <TouchableOpacity
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                activeOpacity={0.6}
            >
                <View style={[styles.button, isPressed && styles.buttonPressed]}>
                    <Text style={styles.buttonText}>Appuyez Longuement</Text>
                </View>
            </TouchableOpacity>
            <ModalWorkspaceUpdate visible={showModal} onClose={() => setShowModal(false)} />
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
    buttonPressed: {
        backgroundColor: '#2980b9', // Couleur différente lors de l'appui long
    },
});

export default ButtonUpdate;
