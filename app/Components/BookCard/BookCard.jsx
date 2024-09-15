import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import CustomText from '../Text';
import ImageConstant from '../../Constant/ImageConstant';
import GolbalStyle from '../../Style';
import { useTheme } from 'react-native-paper';
import { responsiveHeight, responsiveWidth } from '../../themes';

const BookCard = ({ title, subTitle, bg, onPress }) => {
  const theme = useTheme();
  return (
    <View
      style={{
        backgroundColor: bg ? bg : theme.colors.primary,
        height: responsiveHeight + 200,
        width: responsiveWidth + 200,
        borderRadius: 20,
        padding: 16,
        rowGap: 10,
        justifyContent: 'space-between',
      }}
    >
      <View style={[GolbalStyle.column, { rowGap: 20 }]}>
        <CustomText
          text={title}
          bold="bold"
          size="md"
          color={theme.colors.textTitle}
          textAlign="left"
        />
        <CustomText
          text={subTitle}
          size="sm"
          textAlign="left"
          color={'white'}
          numberOfLine={2}
        />
      </View>

      <View style={[GolbalStyle.row]}>
        <TouchableOpacity
          onPress={() =>
            onPress
              ? onPress()
              : () => {
                  console.log('first');
                }
          }
        >
          <Image source={ImageConstant.btnBookNow} />
        </TouchableOpacity>
        <Image
          source={ImageConstant.doctor}
          resizeMode="cover"
          // resizeMethod="resize"
        />
      </View>
    </View>
  );
};

export default BookCard;

const styles = StyleSheet.create({});
