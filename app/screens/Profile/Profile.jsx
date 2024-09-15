import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { Avatar, Divider, useTheme } from 'react-native-paper';
import Header from '../../Components/header/Header';
import Hstack from '../../Components/Hstack/Hstack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';
import Vstack from '../../Components/Vstack/Vstack';
import { responsiveHeight, responsiveWidth } from '../../themes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomText from '../../Components/Text';
import useNavigationHelper from '../helper/NavigationHelper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GolbalStyle from '../../Style';
const Profile = () => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    box: {
      backgroundColor: theme.colors.primary,
      height: responsiveHeight + 300,
      paddingHorizontal: responsiveWidth / 2,
      // paddingVertical: 10,
      paddingTop: StatusBar.currentHeight + 60,
    },
  });

  const navigation = useNavigationHelper();

  return (
    <View style={styles.container}>
      <SafeAreaView edges={['bottom']}>
        <Vstack style={[GolbalStyle.box, styles.box]}>
          {/* Back btn */}

          <Hstack
            justifyContent="space-between"
            style={{ width: Dimensions.get('screen').width - 40 }}
          >
            <CustomText text="My Profile" bold="bold" color="white" />
            <Hstack gap={20}>
              <View
                style={{
                  backgroundColor: theme.colors.background,
                  padding: 5,
                  borderRadius: 20,
                }}
              >
                <AntDesign name="poweroff" size={20} color={''} />
              </View>

              <View
                style={{
                  backgroundColor: theme.colors.background,
                  padding: 5,
                  borderRadius: 20,
                }}
              >
                <AntDesign name="edit" size={20} color={''} />
              </View>
            </Hstack>
          </Hstack>

          <Vstack
            justifyContent="center"
            alignItems="center"
            style={{ width: '100%' }}
            gap={10}
          >
            <Avatar.Text
              style={{
                backgroundColor: theme.colors.secondary,
              }}
              size={responsiveHeight + 40}
              label="SJ"
            />
            <CustomText text="Sk Jasimuddin (21)" bold="bold" color="white" />
          </Vstack>

          <Vstack
            style={{
              width: '100%',
              marginTop: responsiveHeight,
              borderRadius: responsiveHeight / 4,
              padding: responsiveHeight / 4,
              backgroundColor: theme.colors.background,
            }}
          >
            <AccountItems title={'Edit Profile Name'} icon={'account'} />
            <AccountItems title={'Change Number'} icon={'phone'} />

            <AccountItems title={'E appointment'} icon={'view-list-outline'} />

            <AccountItems
              title={'View Prescription'}
              icon={'sticker-plus-outline'}
            />
          </Vstack>
        </Vstack>
      </SafeAreaView>
    </View>
  );
};

export default Profile;

const AccountItems = ({ title, icon }) => {
  return (
    <Vstack style={{ width: '100%', height: 'auto', padding: 20 }} gap={10}>
      <Hstack
        justifyContent="space-between"
        style={{ width: '100%', alignSelf: 'center' }}
      >
        <Hstack gap={20}>
          <MaterialCommunityIcons name={icon} size={22} />
          <CustomText text={title} />
        </Hstack>

        <AntDesign name="arrowright" size={22} />
      </Hstack>
      <Divider
        style={{
          width: '100%',
          backgroundColor: 'black',
          height: 0.5,
        }}
      />
    </Vstack>
  );
};
