import { NavigationContainer } from '@react-navigation/native';
import { LogBox } from 'react-native';
import AuthNavigation from './app/Navigations/AuthNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CopilotProvider } from 'react-native-copilot';

LogBox.ignoreAllLogs();

//-------------------------------------//
export default function App() {
  return (
    <SafeAreaProvider>
      <CopilotProvider androidStatusBarVisible overlay="svg">
        <NavigationContainer>
          <AuthNavigation />
        </NavigationContainer>
      </CopilotProvider>
    </SafeAreaProvider>
  );
}
