import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const useNavigationHelper = () => {

    const navigation = useNavigation()


    const push  = ({screen, data}) =>{
        navigation.navigate(screen,{
            data
        })
    }
    const replace = ({screen,data})=>{
        navigation.replace(screen,{
            data
        })
    }

    const back = () =>{
        navigation.goBack()
    }

  return {
    push,
    replace,
    back
  }
}

export default useNavigationHelper

const styles = StyleSheet.create({})