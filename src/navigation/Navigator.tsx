import * as React from 'react';
import TabNavigator from './TabNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';

/**
 * NavigationContainer is a component which manages our navigation tree and contains the navigation state.
 */
import { NavigationContainer } from '@react-navigation/native';


export default function Navigator() {

    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <TabNavigator />
            </NavigationContainer>
        </SafeAreaProvider>
    );
}
