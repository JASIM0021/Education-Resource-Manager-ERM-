import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductScreen from "../screens/ProductScreen";
import AuthNavigation from "./AuthNavigation";
import { SCREEN_COMPONENT, SCREEN_NAME } from "../Constant";

const screen = [
  
  {
    name:'Product',
    component:ProductScreen
  },
  {
    name:SCREEN_NAME.Login,
    component:SCREEN_COMPONENT.LOGIN
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
];

const HomeNavigation = ({ route }) => {

  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaProvider>
    
       
        <Stack.Navigator
          initialRouteName={SCREEN_NAME.HomeTab}
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

export default HomeNavigation;
