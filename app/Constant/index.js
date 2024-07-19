import LoginScreen from "../screens/auth/LoginScreen"
import RegisterScreen from "../screens/auth/RegisterScreen"
import HomeTab from "../screens/Home/TabLayout"
import BookTab from "../screens/Home/Tabs/book/BookTab"
import onBoarding from "../screens/onBoarding/onBoarding"
import PdfViewer from "../screens/pdfView/PdfViewer"

export const  SCREEN_NAME = {
Login : "Login",
Register:'Register',
onBoarding:'onBoarding',
HomeTab:'HomeTab',
BookTab:'BookTab',
PdfViewer:'PdfViewer'

}

export const SCREEN_COMPONENT = {

    LOGIN : LoginScreen,
    REGISTER:RegisterScreen,
    ONBOARDING:onBoarding,
    HOMETAB:HomeTab,
    BOOKTAB:BookTab,
    PDFVIWER:PdfViewer
}




