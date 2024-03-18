import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import { Octicons } from '@expo/vector-icons';

type CardOptionsModalProps = { isVisible: boolean, setIsVisible: React.Dispatch<React.SetStateAction<boolean>> }


export default function CardOptionsModal({ isVisible, setIsVisible }: Readonly<CardOptionsModalProps>): JSX.Element {

    const styles = StyleSheet.create({
        modal: {
            position: 'absolute',
            top: 70,
            right: 0
        },
        modalContent: {
            width: 240,
            height: 'auto',
            backgroundColor: 'white',
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
        },
    });

    const onClose = () => {
        setIsVisible(false);
    }

    return (
        <Modal
            isVisible={isVisible}
            style={styles.modal}
            onBackdropPress={onClose}
            backdropOpacity={0}
            animationIn="fadeIn"
            animationOut="fadeOut"
        >
            <View style={styles.modalContent}>
                <ArchivateCard />
                <DeleteCard />
            </View>
        </Modal>
    );
};

function ArchivateCard() {

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            height: 'auto',
            padding: 10,
            borderBottomColor: '#E5E7EB',
            borderBottomWidth: 1
        },
        text: {
            fontSize: 18
        }
    })

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Archiver la carte</Text>
            <Octicons name="archive" size={18} color="black" />
        </View>
    );
}

function DeleteCard() {

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            height: 'auto',
            padding: 10,
        },
        text: {
            fontSize: 18,
            fontWeight: '400',
            color: '#DC2626'
        }
    })

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Supprimer la carte</Text>
            <Ionicons name="trash-outline" size={20} color="#DC2626" />
        </View>
    );
}