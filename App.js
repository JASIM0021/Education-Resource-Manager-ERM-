
import { SafeAreaView, StatusBar, useColorScheme } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigation from "./app/Navigations/AuthNavigation.js";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from 'react-redux';
import store from "./app/features/Store.js";

import auth from '@react-native-firebase/auth';
import HomeNavigation from "./app/Navigations/HomeNavigation.js";

import { useDispatch } from 'react-redux';
import { darkTheme, lightTheme } from "./app/thems/index.js";
import { GlobalStateProvider } from "./app/Context/GlobalContext.jsx";
//-------------------------------------//
export default function App() {
  const [user, setUser] = useState(null);
 

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setUser(user);
      console.log('user', user)
    });

    // Clean-up function
    return () => unsubscribe();
  }, []);
  // const getToken = async () => {
  //   // await getAsyncStorage("token").then((res) => setToken(res));
  // };

  // useEffect(() => {
  //   getToken();
  // }, []);

  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;

 
  return (
    // <GestureHandlerRootView style={{ flex: 1 }}>
    
    <Provider store={store}>
        <PaperProvider theme={theme}>
          <SafeAreaProvider>
            <StatusBar
              animated={true}
              backgroundColor={colorScheme === 'dark' ? darkTheme.colors.background : lightTheme.colors.background}
              barStyle= {colorScheme === 'dark' ? 'dark-content' :  'light-content'}
              showHideTransition='slide'
              hidden={false}
            />
            <NavigationContainer>
              
              {
                user ? <HomeNavigation/> : <AuthNavigation/>
              }
             
            </NavigationContainer>
           
          </SafeAreaProvider>
        </PaperProvider>
        </Provider>
      
    // </GestureHandlerRootView>
  );
}
