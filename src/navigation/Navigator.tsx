import * as React from 'react';
import TabNavigator from './TabNavigator';

/**
 * NavigationContainer is a component which manages our navigation tree and contains the navigation state.
 */
import { NavigationContainer } from '@react-navigation/native';


export default function Navigator() {

    return (
        <NavigationContainer>
            <TabNavigator />
        </NavigationContainer>
    );
}
