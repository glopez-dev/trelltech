import React from 'react';
import { View, Text } from 'react-native';

function Container({ children }) {

    return (
        <View style={{ width: '100%', borderTopWidth: 1, borderColor: 'white', backgroundColor: '#48525e', paddingHorizontal: 20 }}>
            {children}
        </View>
    );
}

function Header() {
    return (
        <View style={{ paddingVertical: 15 }}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: '500' }}>Actions rapides</Text>
        </View>
    );
}



export default function CardFastActions(): JSX.Element {

    return (
        <Container>
            <Header />
        </Container>
    );

}

