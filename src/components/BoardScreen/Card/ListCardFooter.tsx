import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useCardListContext, CardListContextData } from './CardListContextProvider';
import Card from '@src/api/Card';

/**
 * Renders the ListCardFooter component.
 *
 * @return {JSX.Element} The rendered ListCardFooter component.
 */
export default function ListCardFooter(): JSX.Element {

    const [inputIsVisible, setInputIsVisible] = useState<boolean>(false);

    const listCardFooterStyles = StyleSheet.create({
        container: {
            justifyContent: 'flex-start',
            marginTop: 20,
            width: '100%',
        }
    });

    return (
        <View style={listCardFooterStyles.container}>
            {!inputIsVisible ? (
                <ToggleInputFieldButton inputIsVisible={inputIsVisible} setInputIsVisible={setInputIsVisible} />
            ) : (
                <InputField setInputIsVisible={setInputIsVisible} />
            )}
        </View>
    );
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

type ToggleInputFieldButtonProps = {
    inputIsVisible: boolean,
    setInputIsVisible: React.Dispatch<React.SetStateAction<boolean>>,
}

/**
 * Function component for a button that toggles the input field visibility.
 *
 * @param {boolean} inputIsVisible - Flag indicating if the input field is visible
 * @param {function} setInputIsVisible - Function to set the visibility of the input field
 * @return {JSX.Element} The button component
 */
function ToggleInputFieldButton({ inputIsVisible, setInputIsVisible }: Readonly<ToggleInputFieldButtonProps>): JSX.Element {

    const toggleInput = () => {
        setInputIsVisible(!inputIsVisible);
    };

    const styles = StyleSheet.create({
        button: {
            backgroundColor: '#000000',
            borderRadius: 0,
            width: '50%',
        },
        buttonText: { color: 'white', fontSize: 15 },
        inputWrapper: {
            width: '100%',
        }
    });

    return (
        <TouchableOpacity style={styles.button} onPress={toggleInput}>
            <Text style={styles.buttonText}>+ Ajouter une carte</Text>
        </TouchableOpacity>
    );
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


type InputFieldProps = {
    setInputIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * Component used tu add a new card to the list it belongs to. 
 *
 * @param {function} setInputIsVisible - Function to set the visibility of the input field
 * @return {JSX.Element} The input field component
 */
function InputField({ setInputIsVisible }: Readonly<InputFieldProps>): JSX.Element {

    const { addCard }: CardListContextData = useCardListContext();

    const [name, setName] = useState<string>('');

    const handleCancel = () => {
        setInputIsVisible(false);
        setName('');
    };

    const handleAdd = () => {
        addCard(name);
        setInputIsVisible(false);
        setName('');
    };

    const styles = StyleSheet.create({
        inputWrapper: {
            width: '100%',
        },
        input: {
            borderColor: 'gray',
            borderWidth: 1,
            padding: 10,
            marginBottom: 10,
            color: 'white',
            width: '100%',
        },
        buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
    });

    return (
        <View style={styles.inputWrapper}>
            <TextInput
                value={name}
                onChangeText={(inputText) => setName(inputText)}
                onSubmitEditing={handleAdd}
                placeholder="Nom de la card"
                autoFocus
                style={styles.input}
                placeholderTextColor="white"
            />
            <View style={styles.buttonContainer}>
                <Button title="Annuler" onPress={handleCancel} />
                <Button title="Ajouter" onPress={handleAdd} />
            </View>
        </View>
    )
}



