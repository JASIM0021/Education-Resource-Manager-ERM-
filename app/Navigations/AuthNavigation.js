import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import ProductScreen from "../screens/ProductScreen";
import {  SCREEN_COMPONENT, SCREEN_NAME } from "../Constant";



const screen = [
  {
    name:SCREEN_NAME.onBoarding,
    component: SCREEN_COMPONENT.ONBOARDING,
  },
  {
    name:SCREEN_NAME.Register ,
    component: SCREEN_COMPONENT.REGISTER,
  },
  {
    name:SCREEN_NAME.Login,
    component: SCREEN_COMPONENT.LOGIN,
  },
  {
    name:SCREEN_NAME.HomeTab,
    component: SCREEN_COMPONENT.HOMETAB,
  },
  {
    name:SCREEN_NAME.BookTab,
    component: SCREEN_COMPONENT.BOOKTAB,
  },
  {
    name:SCREEN_NAME.PdfViewer,
    component: SCREEN_COMPONENT.PDFVIWER,
  },
  {
    name:'Product',
    component:ProductScreen
  },
  {
    name:SCREEN_NAME.Introduction,
    component:SCREEN_COMPONENT.INTRODUCTION
  },

];

const AuthNavigation = ({ route }) => {

  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaProvider>
        <Stack.Navigator
          initialRouteName={SCREEN_NAME.Introduction}
          screenOptions={{
            headerShown: false,
            headerSearchBarOptions: {
              cancelButtonText: "Cancel",
            },
          }}
        >
          {screen.map((sc,index) => {
            return (
              <>
                <Stack.Screen 
                  name={sc.name}
                  component={sc.component}
                  key={sc.name}
                />
              </>
            );
          })}
        </Stack.Navigator>
    
    </SafeAreaProvider>
  );
};

export default AuthNavigation;
