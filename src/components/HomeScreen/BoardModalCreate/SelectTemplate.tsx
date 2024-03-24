import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { RadioButton } from 'react-native-paper';

type SelectTemplateProps = {
    template: string;
    setTemplate: React.Dispatch<React.SetStateAction<string>>
}

export default function SelectTemplate({ template, setTemplate }: SelectTemplateProps): JSX.Element {

    const styles = StyleSheet.create({
        container: {
            paddingTop: 10,
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '100%',
            gap: 15,
            overflow: 'visible',
        },
        radio: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            width: '100%',
            overflow: 'visible',
        },
        radioLabel: {
            fontSize: 16,
            fontWeight: '500'
        },
        label: {
            fontSize: 16,
            fontWeight: '400'
        }
    })


    const handleRadioButtonPress = (value) => {
        console.log("Template:", value);
        setTemplate(value);
    };

    return (
        <View style={{ paddingTop: 10 }}>
            <Text style={{ color: 'black', fontSize: 18, fontWeight: '500', paddingBottom: 10 }}>Template</Text>

            <RadioButton.Group
                onValueChange={(value) => setTemplate(value)}
                value={template}
            >
                <Pressable style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => handleRadioButtonPress('tableau simple')} >
                    <RadioButton value="tableau simple" color="blue" uncheckedColor='gray' />
                    <Text style={styles.label}>Tableau Simple</Text>
                </Pressable>
                <Pressable style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => handleRadioButtonPress('modele kanban')} >
                    <RadioButton value="modele kanban" color="blue" uncheckedColor='gray' />
                    <Text style={styles.label}>Modèle Kanban</Text>
                </Pressable>
                <Pressable style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => handleRadioButtonPress('conduite de projet')} >
                    <RadioButton value="conduite de projet" color="blue" uncheckedColor='gray' />
                    <Text style={styles.label}>Conduite de projet</Text>
                </Pressable>

                <Pressable style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => handleRadioButtonPress('tableau agile')} >
                    <RadioButton value="tableau agile" color="blue" uncheckedColor='gray' />
                    <Text style={styles.label}>Tableau Agile</Text>
                </Pressable>

            </RadioButton.Group>
        </View>
    );
}
