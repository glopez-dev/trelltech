// React Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// Screens
import HomeScreen from '@src/screens/HomeScreen';
import Login from '@src/screens/LoginScreen';
// React
import React from 'react';
// Session
import { useSession } from '@src/authentication/SessionProvider';

/**
 * createNativeStackNavigator is a function that returns an object containing
 * 2 properties: Screen and Navigator
 * 
 * Both of them are React components used for configuring the navigator. 
 * The Navigator should contain Screen elements as its children to define the 
 * configuration for routes.
 */
const Stack = createNativeStackNavigator();


/**
 * Function representing the Navigator component.
 * Redirects to the Login page if the user is not logged in, otherwise redirects to the Home page.
 *
 * @return {JSX.Element} The navigation container with conditional rendering based on the session.
 */
export default function Navigator() { 

    const { session }= useSession();

    return (
        <NavigationContainer>
            <Stack.Navigator>
             
            <Stack.Screen 
  name="Trello" 
  component={HomeScreen} 
  options={{
    headerStyle: { backgroundColor: '#2c333b' }, 
    headerTintColor: 'white' ,
    headerTitleStyle: { fontWeight: 'bold' },
    headerTitleAlign: 'center',

  }}
/>


            </Stack.Navigator>
        </NavigationContainer>
    );
}