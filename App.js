
import { LogBox, SafeAreaView, StatusBar, useColorScheme } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import React, { useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigation from "./app/Navigations/AuthNavigation.js";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from 'react-redux';
import store from "./app/features/Store.js";

// import auth from '@react-native-firebase/auth';
import HomeNavigation from "./app/Navigations/HomeNavigation.js";

import { useDispatch } from 'react-redux';
import { darkTheme, lightTheme } from "./app/thems/index.js";
import { GlobalStateProvider } from "./app/Context/GlobalContext.jsx";
import FlashMessage from "react-native-flash-message";
import AsyncStorageCustom from "./app/helper/AsyncStorage/index.js";
import AsyncStorage from "@react-native-async-storage/async-storage";



LogBox.ignoreAllLogs()

//-------------------------------------//
export default function App() {
  const [user, setUser] = useState(null);
  const [ token ,setToken] = useState('')
 

  useEffect(() => {
   
    getToken()
    // deleteToken()
    // Clean-up function
    return () =>{}
  }, []);
  const getToken = async () => {
    const token = await AsyncStorageCustom.getToken()
    setToken(token) 



    console.log('token', token)
  };


  const deleteToken = async()=>{
    await AsyncStorage.clear()
  }
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
                token ? <HomeNavigation/> : <AuthNavigation/>
              }
            <FlashMessage position="top" />

             
            </NavigationContainer>
          </SafeAreaProvider>
        </PaperProvider>
        </Provider>
      
    // </GestureHandlerRootView>
  );
}
