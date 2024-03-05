// Gluestack UI
import { GluestackUIProvider} from '@gluestack-ui/themed';
import { config } from "@gluestack-ui/config" // Optional if you want to use default theme
// Authentication
import { SessionProvider } from '@src/authentication/SessionProvider';
// Navigation
import Navigator from '@src/navigation/Navigator';


export default function App() {
  return (
    <GluestackUIProvider config={config}>
      <SessionProvider>
        <Navigator />
      </SessionProvider>
    </GluestackUIProvider>
  );
}



