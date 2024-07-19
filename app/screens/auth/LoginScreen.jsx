// RegisterScreen.tsx
import React, { useCallback, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput, Snackbar, useTheme, Icon, IconButton, MD3Colors, Divider, HelperText } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import { googleRegister, loginUserRequest, registrationError } from '../../features/saga/auth/authAction';
import validations from '../../validations';
import CustomText from '../../Components/Text';
import GolbalStyle from '../../Style';
import appContent from '../../Constant/appContent';
import GlobalSlice, { startLoading } from '../../features/slice/GlobalSlice';
import CustomTextInput from '../../Components/Input/CustomTextInput';
import CustomButton from '../../Components/CustomButton/CustomButton';
import FirebaseError from '../../features/firebase/firebaseError';



const LoginScreen = () => {

  const theme = useTheme()
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      backgroundColor: theme.colors.background,
    },
    button: {
      marginTop: 20,
    }
  });

  const dispatch = useDispatch();
  const navigation = useNavigation()
  const [snackBarVisible, setSnackBarVisible] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');



  const { error, user, loader } = useSelector((state) => state.globalReducer)
  const data = useSelector((state) => state.globalReducer)


  console.log('data', data)

  const onDismissSnackBar = () => setSnackBarVisible(false);
 

  console.log('user', user)
  useEffect(() => {
    if (error) {
      setErrorMessage(FirebaseError({error}));
      setSnackBarVisible(true);
      // Clear error message after displaying it
      dispatch(registrationError(null));
    }
    if (user != null) {
      navigation.replace('Product')
    }
  }, [error]);
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };
  
  const InputForm = React.memo(() => {
   
    
    const [formData, setFormData] = React.useState({
      email: '',
      password: ''
    });
  
    const [errors, setErrors] = React.useState({
      email: '',
      password: ''
    });
  
    const handleRegister = () => {
      const { email, password } = formData;
      let valid = true;
      let newErrors = { email: '', password: '' };
  
      if (!validateEmail(email)) {
        newErrors.email = 'Invalid email address';
        valid = false;
      }
  
      if (password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
        valid = false;
      }
  
      setErrors(newErrors);
  
      if (valid) {
        console.log("login")
         dispatch(startLoading())
        dispatch(loginUserRequest({ email, password }));
      }
    };
  
    const handleChange = (name, value) => {
      setFormData({ ...formData, [name]: value });
    };
    const googleLogin = () =>{
      dispatch(googleRegister())
      
    }
    console.log('loader', loader)
  
    return (
      <>
        <CustomTextInput
          label="Email"
          value={formData.email}
          handleChange={(text) => handleChange('email', text)}
          handleBlur={() => {}}
          touched={true}
          errors={errors.email}
        />
        {errors?.email && (
          <HelperText style={{ color: theme.colors.error }}>
            {errors?.email}
          </HelperText>
        )}
        <CustomTextInput
          label="Password"
          isSecure={true}
          value={formData.password}
          handleChange={(text) => handleChange('password', text)}
          handleBlur={() => {}}
          touched={true}
          errors={errors.password}
        />
        {errors?.password && (
          <HelperText style={{ color: theme.colors.error }}>
            {errors?.password}
          </HelperText>
        )}
  
        <CustomButton
          label={'Continue'}
          onPress={handleRegister}
          marginTop={20}
          isLoading={loader}
        />
  
        <View style={[GolbalStyle.rowCenter, { marginTop: 30 }]}>
          <CustomText text={appContent.alrady_account} size='sm' spacing={2} textAlign='center' underline={true} />
          <CustomText text={'Sign In'} color='blue' size='sm' spacing={2} textAlign='center' underline={false} onPress={() => { }} />
        </View>
  
        <View style={[GolbalStyle.rowCenter]}>
          <Divider leftInset bold style={{ width: 100 }} />
          <CustomText text={'OR'} size='sm' spacing={2} textAlign='center' underline={true} />
          <Divider leftInset bold style={{ width: 100 }} />
        </View>
  
        <View style={[GolbalStyle.mtLG, { rowGap: 20 }]}>
          <Button icon="google" mode={'outlined'} onPress={() => googleLogin()}>
            {appContent.continue_with_google}
          </Button>
          <Button icon="facebook" mode={'outlined'} onPress={() => console.log('Pressed')}>
            {appContent.continue_with_facebook}
          </Button>
          <Button icon="apple" mode={'outlined'} onPress={() => console.log('Pressed')}>
            {appContent.continue_with_apple}
          </Button>
        </View>
      </>
    );
  });




  return (
    <View style={styles.container}>

      <View style={[GolbalStyle.align, GolbalStyle.statusBar, { rowGap: 16 }]}>
        <CustomText text={appContent.welcome} size='sm' />
        <CustomText text={appContent.create_account} size='lg' spacing={4} textAlign='center' />

      </View>

      <View style={[GolbalStyle.justify, GolbalStyle.mtLG]}>
        <InputForm />

      </View>
      <Snackbar
        visible={snackBarVisible}
        onDismiss={() => setSnackBarVisible(false)}
        action={{
          label: 'Close',
          onPress: () => {
            setSnackBarVisible(false);
          },
        }}>
        {errorMessage}
      </Snackbar>
    </View>
  );
};


export default LoginScreen;
