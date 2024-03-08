import * as React from 'react';
/* Authentication */
import Login from '@src/screens/LoginScreen';
import { useSession } from '@src/authentication/SessionProvider';

import TabNavigator from './TabNavigator';

/**
 * NavigationContainer is a component which manages our navigation tree and contains the navigation state.
 */
import { NavigationContainer } from '@react-navigation/native';

import  StackNavigator from '@src/navigation/StackNavigator';

export default function Navigator() {

    return (
        <NavigationContainer>
            <TabNavigator />
        </NavigationContainer>
    );
}
