import LoginScreen from "../screens/auth/login/LoginScreen"
import RegisterScreen from "../screens/auth/RegisterScreen"
import HomeTab from "../screens/Home/TabLayout"
import BookTab from "../screens/Home/Tabs/book/BookTab"
import { IntroductionAnimationScreen } from "../screens/introduction_animation"
import onBoarding from "../screens/onBoarding/onBoarding"
import PdfViewer from "../screens/pdfView/PdfViewer"

export const  SCREEN_NAME = {
Login : "Login",
Register:'Register',
onBoarding:'onBoarding',
HomeTab:'HomeTab',
BookTab:'BookTab',
PdfViewer:'PdfViewer',
Introduction:'introduction'

}

export const SCREEN_COMPONENT = {

    LOGIN : LoginScreen,
    REGISTER:RegisterScreen,
    ONBOARDING:onBoarding,
    HOMETAB:HomeTab,
    BOOKTAB:BookTab,
    PDFVIWER:PdfViewer,
    INTRODUCTION:IntroductionAnimationScreen
}





