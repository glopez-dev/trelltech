import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, homeScreenOptions } from '@src/screens/home/HomeScreen';
import { CardScreen, cardScreenOptions } from '@src/screens/CardScreen';
import { SearchScreen, searchScreenOptions } from '@src/screens/SearchScreen';
import { NotificationScreen, notificationScreenOptions } from '@src/screens/NotificationScreen';
import { ProfileScreen, profileScreenOptions } from '@src/screens/ProfileScreen';

import { HomeStackNavigation, homeScreenTabOptions } from '@src/navigation/HomeStackNavigation';

export const Tab = createBottomTabNavigator();

export default function TabNavigator(): JSX.Element {

    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" options={homeScreenTabOptions} component={HomeStackNavigation} />
            <Tab.Screen name="Card" options={cardScreenOptions} component={CardScreen} />
            <Tab.Screen name="Search" options={searchScreenOptions} component={SearchScreen} />
            <Tab.Screen name="Notification" options={notificationScreenOptions} component={NotificationScreen} />
            <Tab.Screen name="Profile" options={profileScreenOptions} component={ProfileScreen} />
        </Tab.Navigator>
    );
}