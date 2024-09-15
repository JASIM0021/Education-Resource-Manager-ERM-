import Location from '../screens/auth/Location/Location';
import LoginScreen from '../screens/auth/login/LoginScreen';
import OTPScreen from '../screens/auth/OTP/OtpScreen';
import BloodGroupTest from '../screens/BlodGroupTest/BloodGroupTest';
import ERecipt from '../screens/E-Recipt/ERecipt';
import TabLayout from '../screens/Home/TabLayout';
import HomeTab from '../screens/Home/Tabs/Home/HomeTab';
import SearchScreen from '../screens/SearchScreen/SearchScreen';
import Splash from '../screens/Splash/Splash';

export const SCREEN_NAME = {
  Splash: 'Splash',
  Login: 'Login',
  OTPScreen: 'OTPScreen',
  Register: 'Register',
  onBoarding: 'onBoarding',
  HomeTab: 'HomeTab',
  BookTab: 'BookTab',
  PdfViewer: 'PdfViewer',
  Location: 'Location',
  Search: 'Search',
  BloodGroupTest: 'BloodGroupTest',
  ERecipt: 'ERecipt',
};

export const SCREEN_COMPONENT = {
  Splash: Splash,
  LOGIN: LoginScreen,
  OTPScreen: OTPScreen,
  Location: Location,
  HomeTab: TabLayout,
  Search: SearchScreen,
  BloodGroupTest: BloodGroupTest,
  ERecipt: ERecipt,
};
