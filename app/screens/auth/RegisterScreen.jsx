import { KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../../Components/header/Header'
import { ActivityIndicator, Button, IconButton, MD2Colors, Tooltip, TouchableRipple, useTheme } from 'react-native-paper'
import GolbalStyle from '../../Style'
import CustomText from '../../Components/Text'
import CustomTextInput from '../../Components/Input/CustomTextInput'
import { responsiveHeight, responsiveWidth } from '../../thems'
import ScrollViewHelper from '../../Components/ScrollViewHelper/ScrollViewHelper'
import { useCreateUserMutation, useLoginUserMutation } from '../../features/api/user/userApiSlice'
import axios from 'axios'
import MyPressable from '../../Components/MyPressable'
import {Feather,AntDesign} from 'react-native-vector-icons'
import { ShowAlertMsg } from '../../helper/ShowAlert'
import FlashMessage from 'react-native-flash-message'
import useNavigationHelper from '../helper/NavigationHelper'
import { SCREEN_NAME } from '../../Constant'
import validations from '../../validations'
import { number } from 'yup'
const RegisterScreen = () => {
  const [selectedGender, setSelectedGender] = useState('male')
  const [formData, setFormData] = useState({
    fullName: '',
    gender: 'male',
    age: '',
    email: '',
    password: '',
    cpassword: ''
  })
  const [errors, setErrors] = React.useState({
    fullName: '',
    age: '',
    email: '',
    password: '',
    cpassword: ''
  });
  const [registrationMutation, { isError, data, isLoading, error }] = useCreateUserMutation()

  console.log('data', error, data?.message)

  const theme = useTheme()
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: responsiveHeight / 4,
      backgroundColor: theme.colors.background
    },
    gender: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      columnGap: 10
    },
    genbtn: (isSelcted) => {
      return {
        width: responsiveWidth + 60,
        height: responsiveHeight / 1.1,
        backgroundColor: theme.colors.background,
        justifyContent: 'center',
        alignItems: 'center',
        color: theme.colors.background,
        borderWidth: isSelcted ? 1 : 0.3,
        borderRadius: 10,
        borderColor: isSelcted ? theme.colors.primary : theme.colors.secondary

      }
    }
  })

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: name === 'age' ? parseInt(value) : value })
  }

const navigation = useNavigationHelper()
  useEffect(()=>{
console.log('error', error?.data?.errorMessage)

    if(error?.data){
      ShowAlertMsg.showError(error?.data?.message)
    }
    if(data?.success){
      ShowAlertMsg.showSuccess(data?.message)
      navigation.push({
        screen:SCREEN_NAME.Login,
        data:{}
      })
    }
    if(error?.error){
      ShowAlertMsg.showError(error?.error ? error?.error : "")
    }
  },[data,error])


  const handleregister = async() => {
    const { email, password,age,cpassword,fullName,gender } = formData;
    let valid = true;
    let newErrors = {
      fullName: '',
      age: '',
      email: '',
      password: '',
      cpassword: ''
    };
    

      // Validate full name
  if (!fullName || fullName.trim() === '') {
    newErrors.fullName = 'Full name is required';
    valid = false;
  }

  // Validate age
  if (!age || isNaN(age) ) {
    newErrors.age = 'Valid age is required ';
    valid = false;
  }
  

  // Validate email
  if (!validations.validateEmail(email)) {
    newErrors.email = 'Invalid email address';
    valid = false;
  }

  // Validate password
  if (password.length < 6) {
    newErrors.password = 'Password must be at least 6 characters';
    valid = false;
  }
  console.log('newErrors', newErrors)

  if (!validations.strongPasswordRegex.test(password)) {
    newErrors.password = 'Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character';
    valid = false;
  }

  // Confirm password match
  if (password !== cpassword) {
    newErrors.cpassword = 'Passwords do not match';
    valid = false;
  }

  // Validate gender
  if (!gender) {
    newErrors.gender = 'Gender is required';
    valid = false;
  }

  setErrors(newErrors);


    if (valid) {
      console.log('formData', formData)
      registrationMutation(formData)
    }
  };

  console.log('error', errors)

  return (
    <View style={styles.container}>

      <Header isBack={true} title={"Create Profile"} />
      <ScrollViewHelper>
        <KeyboardAvoidingView behavior={Platform.OS == 'android' ? 'padding' : 'position'}>
          <View style={[GolbalStyle.mtLG]}>
            <CustomText text={"Hey "} size={"lg"} bold={"bold"} />
            <CustomText text={"Help us known the Learner Batter"} size={"lg"} bold={"bold"} />
            <View style={[GolbalStyle.mtLG, { rowGap: responsiveHeight / 5 }]}>


              <CustomText text={"Profile Name"} size={"md"} bold={"bold"} />
              <CustomTextInput placeholder={'Your Fullname'}
                value={formData.fullName}
                handleChange={(text) => handleChange('fullName', text)}
                handleBlur={() => { }}
                touched={true}
                errors={errors.fullName}
              />
              <View style={styles.gender}>
                <CustomText text={"Identify the Learner's"} size={"md"} bold={"bold"} />
                <Tooltip title="This fiels is required">
                   <Feather  name="info" size={20} color={theme.colors.primary}/>
                </Tooltip>
              </View>

              <View style={{ ...styles.gender, justifyContent: 'space-evenly' }}>
                <TouchableOpacity style={styles.genbtn(formData.gender == 'male')} onPress={() => handleChange('gender', 'male')}>
                  <CustomText text={'⌾ Male'} size={"md"} bold={"bold"} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.genbtn(formData.gender == 'female')} onPress={() => handleChange('gender', 'female')}  >
                  <CustomText text={'⍉ Female'} size={"md"} bold={"bold"} />
                </TouchableOpacity>
              </View>

              <View style={styles.gender}>
                <CustomText text={"Enter Learner's Age"} size={"md"} bold={"bold"} />
                <Tooltip title="This fiels is required">
                   <Feather  name="info" size={20} color={theme.colors.primary}/>
                </Tooltip>
              </View>
              <CustomTextInput placeholder={'Enter your current age'}
                value={formData.age}
                handleChange={(text) => handleChange('age', text)}
                handleBlur={() => { }}
                touched={true}
                errors={errors.age}
              />
              <CustomText text={"Email ID"} size={"md"} bold={"bold"} />

              <CustomTextInput placeholder={'Enter your email id'}
                value={formData.email}
                handleChange={(text) => handleChange('email', text)}
                handleBlur={() => { }}
                touched={true}
                errors={errors.email}
              />

              <View style={styles.gender}>
                <CustomText text={"Secure your account with a stong password"} size={"md"} bold={"bold"} />
                <Tooltip title="This fiels is required">
                   <Feather  name="info" size={20} color={theme.colors.primary}/>
                </Tooltip>
              </View>
              <CustomTextInput placeholder={'Enter your password '}
                value={formData.password}
                handleChange={(text) => handleChange('password', text)}
                handleBlur={() => { }}
                touched={true}
                errors={errors.password}
              />
              <View style={styles.gender}>
                <CustomText text={"Confirm your security"} size={"md"} bold={"bold"} />
                <Tooltip title="This fiels is required">
                   <Feather  name="info" size={20} color={theme.colors.primary}/>
                </Tooltip>
              </View>
              <CustomTextInput placeholder={'Enter your password once again'}
                value={formData.cpassword}
                handleChange={(text) => handleChange('cpassword', text)}
                handleBlur={() => { }}
                touched={true}
                errors={errors.cpassword}
              />


              <TouchableRipple disabled={isLoading} rippleColor={theme.colors.primary} style={[styles.genbtn(true), { width: '100%' }]} onPress={() => {
                handleregister()

              }}>
                <View style={GolbalStyle.row}>
                  <CustomText style={styles} text={"Create "} size={"md"} bold={"bold"} />
                  <AntDesign name="login" size={20} color={theme.colors.primary}/>
                  {isLoading &&
                    <ActivityIndicator animating={true} color={theme.colors.primary} />

                  }
                </View>
              </TouchableRipple>


            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollViewHelper>
    </View>
  )
}

export default RegisterScreen
