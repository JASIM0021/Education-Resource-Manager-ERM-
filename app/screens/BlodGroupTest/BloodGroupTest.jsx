import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React from 'react';
import Header from '../../Components/header/Header';
import { useTheme } from 'react-native-paper';
import BannerImageScroll from './BannerImageScroll';
import ImageConstant from '../../Constant/ImageConstant';
import { responsiveHeight, responsiveWidth } from '../../themes';
import Swiper from 'react-native-swiper';
import CustomText from '../../Components/Text';
import GolbalStyle from '../../Style';
import Bluerparalel from '../../Components/blurRotate/BlurRotate';

const BloodGroupTest = () => {
  const theme = useTheme();

  const styles = StyleSheet.create({
    swiperWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    swipImage: {
      width: '100%',
      height: responsiveHeight,
      borderRadius: 10,
      // resizeMode: 'contain',

      borderWidth: 1,
      borderColor: theme.colors.primary,
    },
    dot: {
      backgroundColor: 'rgba(0,0,0,.2)',
      width: 8,
      height: 8,
      borderRadius: 4,
      margin: 3,
    },
    activeDot: {
      backgroundColor: '#000',
      width: 8,
      height: 8,
      borderRadius: 4,
      margin: 3,
    },
  });

  const images = [
    'https://via.placeholder.com/600x300.png?text=Image+1',
    'https://via.placeholder.com/600x300.png?text=Image+2',
    'https://via.placeholder.com/600x300.png?text=Image+3',
  ];

  const listData = [
    {
      orgName: 'USG whole abdomen',
      description:
        'Lorem Ipsumis simply dummy text of the printing and typesetting industry.',
      price: 800,
    },
    {
      orgName: 'USG upper abdomen',
      description:
        'Lorem Ipsumis simply dummy text of the printing and typesetting industry.',
      price: 700,
    },
    {
      orgName: 'MRI Brain',
      description:
        'Lorem Ipsumis simply dummy text of the printing and typesetting industry.',
      price: 1200,
    },
    {
      orgName: 'CT Scan Brain',
      description:
        'Lorem Ipsumis simply dummy text of the printing and typesetting industry.',
      price: 1600,
    },
  ];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.background,
        paddingHorizontal: 16,
      }}
    >
      <Header isBack={true} title="Blood Group Test" />
      <View style={{ height: responsiveHeight }}>
        <Swiper
          style={styles.swiperWrapper}
          autoplay
          autoplayTimeout={2.5}
          dot={<View style={styles.dot} />}
          activeDot={<View style={styles.activeDot} />}
        >
          {images.map((image, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleImagePress(index)}
            >
              <Image
                resizeMethod="scale"
                resizeMode="cover"
                source={ImageConstant.offer}
                style={styles.swipImage}
              />
            </TouchableOpacity>
          ))}
        </Swiper>
      </View>

      <View style={GolbalStyle.mtLG}>
        <CustomText
          text="Select A Test"
          size="lg"
          bold="bold"
          textAlign="center"
          underline
        />
      </View>
      <View
        style={[
          GolbalStyle.mtSM,
          { justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        <Bluerparalel data={listData} />
      </View>
    </View>
  );
};

export default BloodGroupTest;
