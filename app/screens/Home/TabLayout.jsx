import * as React from 'react';
import { FlatList, ScrollView, StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import { Appbar, BottomNavigation, Card, Chip, Text, useTheme } from 'react-native-paper';
import GolbalStyle from '../../Style';
import CustomText from '../../Components/Text';
import Header from '../../Components/header/Header';
import Search from '../../Components/Search/Search';
import CustomCards from '../../Components/Cards/CustomCards';
import { darkTheme, lightTheme, responsiveHeight } from '../../thems';
import ScrollViewHelper from '../../Components/ScrollViewHelper/ScrollViewHelper';
import HomeTab from './Tabs/Home/HomeTab';
import BookTab from './Tabs/book/BookTab';
import { useRoute } from '@react-navigation/native';




const AccountRoute = () => <Text>AccountRoute</Text>;

const NotificationsRoute = () => <Text>Notifications</Text>;

const TabLayout = ({navigation}) => {

    const route = useRoute()
    
  let _index  = route?.params?.data?.index

console.log('_index', _index)
    const [index, setIndex] = React.useState(_index? _index : 0);
    const [routes] = React.useState([
        { key: 'home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'home-outline' },
        { key: 'book', title: 'book', focusedIcon: 'book', unfocusedIcon: 'book-outline' },
        { key: 'account', title: 'Account', focusedIcon: 'account', unfocusedIcon: 'account-outline' },
        { key: 'notifications', title: 'Notifications', focusedIcon: 'bell', unfocusedIcon: 'bell-outline' },
    ]);


    const renderScene = BottomNavigation.SceneMap({
        home: HomeTab,
        book: BookTab,
        account: AccountRoute,
        notifications: NotificationsRoute,
    });
    const theme = useTheme()
    return (
        <BottomNavigation

    
            // barStyle={{ backgroundColor: theme.colors.gray }}
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
        />
    );
};

export default TabLayout;