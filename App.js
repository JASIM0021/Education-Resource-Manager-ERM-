import { NavigationContainer } from '@react-navigation/native';
import { LogBox } from 'react-native';
import AuthNavigation from './app/Navigations/AuthNavigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';

LogBox.ignoreAllLogs();

//-------------------------------------//
export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AuthNavigation />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
