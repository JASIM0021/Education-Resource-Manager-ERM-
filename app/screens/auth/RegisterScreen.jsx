// RegisterScreen.tsx
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { useSelector } from 'react-redux'
import { googleRegister } from '../../features/saga/auth/authSaga';
import { registerUserRequest } from '../../features/saga/auth/authAction';
import validations from '../../validations';

GoogleSignin.configure({
  webClientId: '63550769299-tj1v075g1jr7fkeudpmvsg4hj6kh4u5u.apps.googleusercontent.com',
});
const RegisterScreen = () => {
  const { error , user ,loader} = useSelector((state) => state.globalReducer)
  async function onGoogleButtonPress() {
   dispatch(googleRegister())
  }
  const dispatch = useDispatch();

 

  const handleRegister = (values) => {
    console.log('values', values)
    dispatch(registerUserRequest({email:values.email,password:values.password}));
  };
const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={validations.authValidation}
        onSubmit={handleRegister}>
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <>
            <TextInput
            style={{marginBottom:10}}
              label="Email"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              error={Boolean(touched.email) &&  Boolean(errors.email)}
            />
            <TextInput
              label="Password"
              secureTextEntry
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              error={Boolean(touched.password) &&  Boolean(errors.password)}
              
            />
            <Button  loading={loader} mode="contained" onPress={()=>handleSubmit()} style={styles.button}>
              Register
            </Button>
            <GoogleSigninButton style={{
              width:'100%',
              marginTop:10
              
            }}
            onPress={() => onGoogleButtonPress()}
            />
              

            <Text onPress={()=>navigation.navigate('Login')} style={{marginTop:10}}>Alrady have an account <Text style={{
              fontWeight:'bold'
            }}>Login Here</Text></Text>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  button: {
    marginTop: 20,
  },
});

export default RegisterScreen;
