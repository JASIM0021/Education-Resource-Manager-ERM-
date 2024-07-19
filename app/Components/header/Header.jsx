import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Appbar, useTheme } from 'react-native-paper'
import CustomText from '../Text'
import Ionicons from 'react-native-vector-icons/Ionicons'
import useNavigationHelper from '../../screens/helper/NavigationHelper'
const Header = ({ isHome, title, size ,isBack}) => {
  const theme = useTheme()
  const navigate = useNavigationHelper()
  return (
    <Appbar.Header style={{ backgroundColor: theme.colors.background, justifyContent: isHome ?'space-between':isBack ? 'space-between': 'flex-start'  }}>

      {
        isBack &&
        (
          <TouchableOpacity style={{marginRight:10}} onPress={()=>{
            navigate.back()
          }}>
            <Ionicons name="arrow-back" size={30} />
          </TouchableOpacity>

        )
      }

      <CustomText text={title} size={size ? size : "md"} spacing={0.5} fontWeight={"bold"} underline={true}/>

      {
        isHome &&

        <Appbar.Action icon="account" onPress={() => { }} />

      }
    </Appbar.Header>
  )
}

export default Header

const styles = StyleSheet.create({})