import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import React from 'react';
import Header from '../../../../Components/header/Header';
import GolbalStyle from '../../../../Style';
import CustomText from '../../../../Components/Text';
import {
  ActivityIndicator,
  Avatar,
  Chip,
  Divider,
  Surface,
  useTheme,
} from 'react-native-paper';
import ScrollViewHelper from '../../../../Components/ScrollViewHelper/ScrollViewHelper';
import {
  darkTheme,
  lightTheme,
  responsiveHeight,
  responsiveWidth,
} from '../../../../themes';
import { useRoute } from '@react-navigation/native';
import useNavigationHelper from '../../../helper/NavigationHelper';
import { SCREEN_COMPONENT, SCREEN_NAME } from '../../../../Constant';
import { useGetAllBooksQuery } from '../../../../features/api/book/bookSlice';
import { ShowAlertMsg } from '../../../../helper/ShowAlert';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
const BookTab = () => {
  const route = useRoute();
  const navigation = useNavigationHelper();
  const navigate = useNavigationHelper();
  const theme = useTheme();
  const coloerSchime = useColorScheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: responsiveWidth / 4,
      backgroundColor: theme.colors.background,
    },
    box: {
      padding: responsiveHeight / 4,
      borderWidth: 0.5,
      borderRadius: responsiveHeight / 6,
    },
  });

  // if (bookData?.length == 0){

  // return (
  //   <View style={GolbalStyle.centerLoader}>
  //   <CustomText  text={"No Data"}/>
  // </View>
  // )

  // }

  // if (isLoading) {
  //   return (
  //     <View style={GolbalStyle.centerLoader}>
  //       <ActivityIndicator size={'large'} color={theme.colors.primary} />
  //     </View>
  //   );
  // }

  const listData = [
    {
      name: 'Matri Scan Center',
      description: ' USG whole abdomen',
      address: ' Matri scan Center, Ranisahib, Burdwan Pin- 713101 ',
    },
    {
      name: 'Burdwan Scan Centre Pvt. Ltd',
      description: ' USG whole abdomen',
      address: ' Matri scan Center, Ranisahib, Burdwan Pin- 713101 ',
    },
    {
      name: 'Matri Scan Center',
      description: ' USG whole abdomen',
      address: ' Matri scan Center, Ranisahib, Burdwan Pin- 713101 ',
    },
  ];

  return (
    <View style={styles.container}>
      <Header isBack={false} title="E appointment" />
      <Divider style={{ backgroundColor: 'gray' }} />
      <FlatList
        contentContainerStyle={{
          rowGap: responsiveHeight / 6,
          marginTop: responsiveHeight / 4,
        }}
        data={listData}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              index={index}
              style={[GolbalStyle.box, styles.box]}
              onPress={() => {
                navigation.push({
                  screen: SCREEN_NAME.ERecipt,
                  data: {},
                });
              }}
            >
              <View
                style={[
                  GolbalStyle.row,
                  { justifyContent: 'space-between', alignItems: 'center' },
                ]}
              >
                <View>
                  <CustomText text={item.name} bold="bold" size="lg" />
                  <CustomText
                    text={'Test name: ' + item.description}
                    size="md"
                  />
                  <CustomText
                    text={'Test Address Location: ' + item.address}
                    size="sm"
                    numberOfLines={2}
                  />
                </View>
                <EvilIcons
                  name="arrow-right"
                  size={30}
                  color={theme.colors.primary}
                />
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default BookTab;
