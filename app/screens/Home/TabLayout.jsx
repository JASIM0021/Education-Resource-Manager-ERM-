import * as React from 'react';
import {
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';
import {
  Appbar,
  BottomNavigation,
  Card,
  Chip,
  Text,
  useTheme,
} from 'react-native-paper';
import GolbalStyle from '../../Style';
import CustomText from '../../Components/Text';
import Header from '../../Components/header/Header';
import Search from '../../Components/Search/Search';
import CustomCards from '../../Components/Cards/CustomCards';
import { darkTheme, lightTheme, responsiveHeight } from '../../themes';
import ScrollViewHelper from '../../Components/ScrollViewHelper/ScrollViewHelper';
import HomeTab from './Tabs/Home/HomeTab';
import BookTab from './Tabs/book/BookTab';
import { useRoute } from '@react-navigation/native';
import Profile from '../Profile/Profile';

const TabLayout = ({ navigation }) => {
  const route = useRoute();

  let _index = route?.params?.data?.index;

  console.log('_index', _index);
  const [index, setIndex] = React.useState(_index ? _index : 0);
  const [routes] = React.useState([
    {
      key: 'home',
      title: 'Book a Test',
      focusedIcon: 'calendar',
      unfocusedIcon: 'calendar-outline',
    },
    {
      key: 'book',
      title: 'Booking History',
      focusedIcon: 'view-list',
      unfocusedIcon: 'view-list-outline',
    },
    {
      key: 'Profile',
      title: 'Profile',
      focusedIcon: 'account',
      unfocusedIcon: 'account-outline',
    },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeTab,
    book: BookTab,
    Profile: Profile,
    // notifications: NotificationsRoute,
  });
  const theme = useTheme();
  return (
    <BottomNavigation
      barStyle={{ backgroundColor: theme.colors.background }}
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      // sceneAnimationType="shifting"
    />
  );
};

export default TabLayout;
