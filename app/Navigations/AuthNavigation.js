import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ProductScreen from '../screens/ProductScreen';
import { SCREEN_COMPONENT, SCREEN_NAME } from '../Constant';

const screen = [
  {
    name: SCREEN_NAME.Login,
    component: SCREEN_COMPONENT.LOGIN,
  },

  {
    name: SCREEN_NAME.Splash,
    component: SCREEN_COMPONENT.Splash,
  },
  {
    name: SCREEN_NAME.OTPScreen,
    component: SCREEN_COMPONENT.OTPScreen,
  },
  {
    name: SCREEN_NAME.Location,
    component: SCREEN_COMPONENT.Location,
  },
  {
    name: SCREEN_NAME.HomeTab,
    component: SCREEN_COMPONENT.HomeTab,
  },
  {
    name: SCREEN_NAME.Search,
    component: SCREEN_COMPONENT.Search,
  },
  {
    name: SCREEN_NAME.BloodGroupTest,
    component: SCREEN_COMPONENT.BloodGroupTest,
  },
];

const AuthNavigation = ({ route }) => {
  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaProvider>
      <Stack.Navigator
        initialRouteName={SCREEN_NAME.Login}
        screenOptions={{
          headerShown: false,
          headerSearchBarOptions: {
            cancelButtonText: 'Cancel',
          },
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
