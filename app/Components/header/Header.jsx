import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Appbar, Divider, TouchableRipple, useTheme } from 'react-native-paper';
import CustomText from '../Text';
import useNavigationHelper from '../../screens/helper/NavigationHelper';
import { Image } from 'react-native';
import ImageConstant from '../../Constant/ImageConstant';
import GolbalStyle from '../../Style';
import { screenWidth } from '../../themes';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomTextInput from '../Input/CustomTextInput';
const Header = ({
  isHome,
  title = 'Screen Name',
  isShop,
  isBack = true,
  isPhone,
  bg,
  tint,
}) => {
  const theme = useTheme();
  const navigate = useNavigationHelper();
  const onBackPress = () => {
    navigate.back();
  };

  return (
    <Appbar.Header
      style={{ backgroundColor: bg ? bg : theme.colors.background }}
    >
      <View
        style={{
          ...GolbalStyle.row,
          justifyContent: 'space-between',
          width: '100%',
          padding: 10,
        }}
      >
        {isBack ? (
          <TouchableOpacity onPress={onBackPress}>
            <View style={GolbalStyle.row}>
              <Ionicons name="arrow-back" size={22} color={tint ? tint : ''} />
              <CustomText
                text={title}
                bold="bold"
                spacing={0}
                size="md"
                color={tint && tint}
              />
            </View>
          </TouchableOpacity>
        ) : (
          <View style={GolbalStyle.row}>
            <Image source={ImageConstant.logo} style={GolbalStyle.logo} />
            <CustomText
              text={'BUPSU'}
              bold={'bold'}
              spacing={1.5}
              size="md"
              color={theme.colors.primary}
            />
          </View>
        )}

        <View style={[GolbalStyle.row, { columnGap: 20 }]}>
          {isShop && (
            <TouchableRipple>
              <Image source={ImageConstant.shop} />
            </TouchableRipple>
          )}
          {isPhone && (
            <TouchableRipple>
              <Image source={ImageConstant.call} />
            </TouchableRipple>
          )}
        </View>
      </View>
    </Appbar.Header>
  );
};

export default Header;

const styles = StyleSheet.create({});
