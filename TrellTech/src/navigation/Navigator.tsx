import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '@src/screens/HomeScreen';
import Login from '@src/screens/LoginScreen';
import React, { useState } from 'react';
import { useSession } from '@src/authentication/SessionProvider';
import { Button, ButtonText, AddIcon, ButtonIcon, View } from "@gluestack-ui/themed";
import CustomModal from '@src/components/modal';


const Stack = createNativeStackNavigator();

export default function Navigator() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleButtonClick = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };




    return (
        <NavigationContainer>
            <Stack.Navigator>



                <Stack.Screen
                    name="Trello"
                    component={HomeScreen}
                    options={{
                        headerStyle: { backgroundColor: '#2c333b' },
                        headerTintColor: 'white',
                        headerTitleStyle: { fontWeight: 'bold', fontSize: 35 },
                        headerTitleAlign: 'center',
                        headerRight: () => (
                            <View style={{ marginBottom: 10, alignItems: 'center', justifyContent: 'center' }}>
                                <Button
                                    size="sm"
                                    variant="solid"
                                    action="primary"
                                    isDisabled={false}
                                    isFocusVisible={false}
                                    bg="#2c333b"
                                    opacity={setIsModalVisible ? 0.5 : 1}
                                    onPress={handleButtonClick}
                                >
                                    <ButtonIcon as={AddIcon} size="xl" />
                                </Button>
                            </View>
                        )
                    }}
                />
            </Stack.Navigator>

            <CustomModal isVisible={isModalVisible} onClose={handleCloseModal} />
        </NavigationContainer>
    );
}
