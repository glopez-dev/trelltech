import * as React from 'react';
import WorkspaceList from '@src/components/HomeScreen/WorkspaceList';
import HeaderRight from '@src/components/HomeScreen/HeaderRight';

export const homeScreenOptions = {
    headerStyle: { backgroundColor: '#0c65e3' },
    headerTintColor: 'white',
    headerTitleStyle: { fontWeight: 'bold', fontSize: 25 },
    headerTitleAlign: 'center',
    headerTitle: 'Trelltech',
    headerRight: HeaderRight,
};

export const HomeScreen: React.FC = () => {
    return (
        <WorkspaceList memberId="622a3d0f72bc0865d9a6f349" />
    );
};
