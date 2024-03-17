import * as React from 'react';
// Gluestack UI
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { config } from "@gluestack-ui/config" // Optional if you want to use default theme
// Authentication
import { SessionProvider } from '@src/authentication/SessionProvider';
// Navigation
import Navigator from '@src/navigation/Navigator';
// Context
import { AppContextProvider } from '@src/context/AppContextProvider';

export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <SessionProvider>
        <AppContextProvider>
          <Navigator />
        </AppContextProvider>
      </SessionProvider>
    </GluestackUIProvider>
  );
}



