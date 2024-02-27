import { StyleSheet, View, Text } from 'react-native';

export default function LoginScreen() {
    return (
        <View style={styles.container}>
            <Text>Login Screen</Text>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
  },
});