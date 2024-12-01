import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SCREEN_COMPONENT, SCREEN_NAME } from '../Constant';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NativeModules } from 'react-native';

const { SharedPreferencesModule } = NativeModules;
const screen = [
  {
    name: SCREEN_NAME.Home,
    component: SCREEN_COMPONENT.Home,
  },
  {
    name: SCREEN_NAME.Guid,
    component: SCREEN_COMPONENT.Guid,
  },
];

const AuthNavigation = ({ route }) => {
  const Stack = createNativeStackNavigator();
  const secretCode = SharedPreferencesModule.getString('@first_time_open', '');
  console.log('secretCode', secretCode);
  return (
    <SafeAreaProvider>
      <Stack.Navigator
        initialRouteName={
          secretCode ? SCREEN_NAME.Home : SCREEN_NAME.GuidScreen
        }
        screenOptions={{
          headerShown: false,
        }}
      >
        {screen.map((sc, index) => {
          return (
            <Stack.Screen
              name={sc.name}
              component={sc.component}
              key={sc.name}
            />
          );
        })}
      </Stack.Navigator>
    </SafeAreaProvider>
  );
};

export default AuthNavigation;
