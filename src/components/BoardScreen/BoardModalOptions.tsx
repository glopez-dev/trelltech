import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { Ionicons } from '@expo/vector-icons';
import BoardModalDelete from '@src/components/BoardScreen/BoardModalDelete';

type BoardModalOptionsProps = { isVisible: boolean, setIsVisible: React.Dispatch<React.SetStateAction<boolean>> }


export default function BoardModalOptions({ isVisible, setIsVisible }: Readonly<BoardModalOptionsProps>): JSX.Element {

    const styles = StyleSheet.create({
        modal: {
            position: 'absolute',
            top: 65,
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
                <DeleteBoardButton />
            </View>
        </Modal>
    );
};



function DeleteBoardButton(): JSX.Element {

    const [isVisible, setIsVisible] = React.useState(false);

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

    const handlePress = () => {
        setIsVisible(true);
    }

    return (
        <TouchableOpacity style={styles.container} onPress={handlePress}>
            <Text style={styles.text}>Supprimer le tableau</Text>
            <Ionicons name="trash-outline" size={20} color="#DC2626" />
            <BoardModalDelete isVisible={isVisible} setIsVisible={setIsVisible} />
        </TouchableOpacity>
    );
}