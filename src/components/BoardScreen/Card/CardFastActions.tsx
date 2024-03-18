import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import CardMembersModal from './CardMembersModal';

function Container({ children }) {

    return (
        <View style={{ width: '100%', borderBottomWidth: 10, borderColor: '#f0f2f3', backgroundColor: 'white', paddingHorizontal: 20, paddingBottom: 10 }}>
            {children}
        </View>
    );
}

function Header() {
    return (
        <View style={{ paddingVertical: 15 }}>
            <Text style={{ color: 'black', fontSize: 16, fontWeight: '500' }}>Actions rapides</Text>
        </View>
    );
}

function Body({ children }) {
    return (
        <View style={{ paddingVertical: 10, flexDirection: 'row', justifyContent: 'flex-start', gap: 10 }}>
            {children}
        </View>
    );
}

function Action() {

    const [isModalVisible, setIsModalVisible] = React.useState(false);

    const styles = StyleSheet.create({
        container: { flexDirection: 'row', alignItems: 'flex-start', backgroundColor: '#f0f2f3', borderRadius: 10, width: '50%', padding: 10, gap: 10 },
        icon: { backgroundColor: '#c084fc', borderRadius: 100, padding: 10, width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
        text: { color: 'black', fontSize: 16, fontWeight: '500', alignSelf: 'center' },
    })

    return (
        <TouchableOpacity style={styles.container} onPress={() => setIsModalVisible(true)}>

            <View style={styles.icon}>
                <FontAwesome name="user-o" size={20} color="white" />
            </View>

            <Text style={styles.text}>Membres</Text>

            <CardMembersModal isVisible={isModalVisible} setIsVisible={setIsModalVisible} />
        </TouchableOpacity>
    );
}



export default function CardFastActions(): JSX.Element {

    return (
        <Container>
            <Header />
            <Body>
                <Action />
            </Body>
        </Container>
    );

}

