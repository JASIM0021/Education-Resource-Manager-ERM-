// RegisterScreen.tsx
import React, { useCallback, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, TextInput, Snackbar, useTheme, Icon, IconButton, MD3Colors, Divider, HelperText } from 'react-native-paper';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import { googleRegister, loginUserRequest, registrationError } from '../../../features/saga/auth/authAction';
import validations from '../../../validations';
import CustomText from '../../../Components/Text';
import GolbalStyle from '../../../Style';
import appContent from '../../../Constant/appContent';
import GlobalSlice, { startLoading } from '../../../features/slice/GlobalSlice';
import CustomTextInput from '../../../Components/Input/CustomTextInput';
import CustomButton from '../../../Components/CustomButton/CustomButton';
import FirebaseError from '../../../features/firebase/firebaseError';
import { responsiveWidth } from '../../../thems';
import { SCREEN_NAME } from '../../../Constant';
import { useLoginUserMutation } from '../../../features/api/user/userApiSlice';
import { ShowAlertMsg } from '../../../helper/ShowAlert';
import AsyncStorage from '../../../helper/AsyncStorage';
import MyPressable from '../../../Components/MyPressable';
import useNavigationHelper from '../../helper/NavigationHelper';



const LoginScreen = () => {

  const theme = useTheme()
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      backgroundColor: theme.colors.background,
      justifyContent: 'center'
    },
    button: {
      marginTop: 20,
    }
  });

  const dispatch = useDispatch();
  const navigation = useNavigation()
  const [snackBarVisible, setSnackBarVisible] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const [{ data: loginData, error: loginerror, isLoading }] = useLoginUserMutation()


  const { error, user, loader } = useSelector((state) => state.globalReducer)
  const data = useSelector((state) => state.globalReducer)

  console.log('loginData,', loginData, loginerror)

  console.log('data', data, error)

  const onDismissSnackBar = () => setSnackBarVisible(false);



  useEffect(() => {
    if (error) {
      setErrorMessage(FirebaseError({ error }));
      setSnackBarVisible(true);
      // Clear error message after displaying it
      dispatch(registrationError(null));
    }
    if (user != null) {
      navigation.replace('Product')
    }
  }, [error]);


  const InputForm = React.useCallback(() => {
    const [loginUser, { data: loginData, error: loginerror, isLoading }] = useLoginUserMutation()
    console.log('loginData,', loginData, loginerror)
    const navigation = useNavigationHelper()

    const [formData, setFormData] = React.useState({
      email: '',
      password: ''
    });
    const [errors, setErrors] = React.useState({
      email: '',
      password: ''
    });



    const saveUserData = async(data) =>{
      await AsyncStorage.setToken(data?.data?.token)
      await AsyncStorage.setUser(data?.data)
    }
    useEffect( () => {
      if (loginerror?.data) {
        ShowAlertMsg.showError(loginerror?.data?.message)
      }
      if (loginData?.success) {
        ShowAlertMsg.showSuccess(loginData?.message)
        saveUserData(loginData)

        navigation.push({
          screen: SCREEN_NAME.HomeTab,
          data: {}
        })
      }
      if (loginerror?.error) {
        ShowAlertMsg.showError(loginerror?.error ? loginerror?.error : "")
      }
    }, [loginerror, loginData])

    const handleLogin = async () => {
      const { email, password } = formData;
      let valid = true;
      let newErrors = { email: '', password: '' };
      //  console.log('newErrors', newErrors)

      if (!(validations.validateEmail(email))) {
        newErrors.email = 'Invalid email address';
        valid = false;
      }

      if (password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
        valid = false;
      }

      setErrors(newErrors);


      if (valid) {
        loginUser(formData)
        //  console.log('newErrors', newErrors)

      }
    };



    const handleChange = (name, value) => {
      setFormData({ ...formData, [name]: value });
    };




   

    return (
      <>
        <CustomTextInput
          label="Email"
          value={formData.email}
          handleChange={(text) => handleChange('email', text)}
          handleBlur={() => { }}
          touched={true}
          errors={errors.email}
        />

        <CustomTextInput
          label="Password"
          isSecure={true}
          value={formData.password}
          handleChange={(text) => handleChange('password', text)}
          handleBlur={() => { }}
          touched={true}
          errors={errors.password}
        />



        {/* <Button  style={[GolbalStyle.mtMD]}  mode={'contained'}  onPress={()=> {
          console.log('first')
          handleLogin()}}>
     
          </Button> */}
        <MyPressable
          android_ripple={{ color: 'darkgrey', borderless: true, radius: 28 }}
          touchOpacity={0.6}

          style={[GolbalStyle.mtMD, GolbalStyle.btn]} isLoading={isLoading} onPress={() => {
            console.log('first')
            handleLogin()
          }}
        >
          <CustomText text={"Continue"} color={theme.colors.background} />
        </MyPressable>

        <View style={[GolbalStyle.rowCenter, { marginTop: 30 }]}>
          <CustomText text={appContent.dont_have_account} size='sm' spacing={2} textAlign='center' />
          <CustomText text={'Sign Up'} color='blue' size='sm' spacing={2} textAlign='center' underline={true} onPress={() => {
            navigation.navigate(SCREEN_NAME.Register)
          }} />
        </View>

        {/* <View style={[GolbalStyle.rowCenter,GolbalStyle.mtMD]}>
          <Divider style={{ width: responsiveWidth }} />
          <CustomText text={'OR'} size='sm' spacing={2} textAlign='center'  />
          <Divider  style={{ width: responsiveWidth }} />
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
        </View> */}
      </>
    );
  });




  return (
    <View style={styles.container}>

      <View style={[GolbalStyle.align, GolbalStyle.statusBar, { rowGap: 16 }]}>
        <CustomText text={appContent.welcome} size='md' />
        <CustomText text={appContent.create_account} size='lg' spacing={4} textAlign='center' bold={'bold'} />

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
