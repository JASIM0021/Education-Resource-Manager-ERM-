import React, { useCallback, useMemo, useRef } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  Animated,
  PanResponder,
} from 'react-native';
import Header from '../../../../Components/header/Header';
import Search from '../../../../Components/Search/Search';
import ScrollViewHelper from '../../../../Components/ScrollViewHelper/ScrollViewHelper';
import CustomText from '../../../../Components/Text';
import CustomCards from '../../../../Components/Cards/CustomCards';
import { responsiveHeight, responsiveWidth } from '../../../../themes';
import GolbalStyle from '../../../../Style';
import { useTheme } from 'react-native-paper';
import ImageConstant from '../../../../Constant/ImageConstant';
import Swiper from 'react-native-swiper';
import BookCard from '../../../../Components/BookCard/BookCard';
import AutocompleteDistricts from '../../../../Components/AutoComplete/AutocompleteDistricts';
import ActionSheet from 'react-native-actions-sheet';
import { useSelector } from 'react-redux';
import useNavigationHelper from '../../../helper/NavigationHelper';
import { SCREEN_NAME } from '../../../../Constant';

const HomeTab = () => {
  const theme = useTheme();
  const colorSchem = useColorScheme();
  const [selectedCategory, setSelectedCategory] = React.useState(new Set());
  const [isActionSheetVisible, setActionSheetVisible] = React.useState(false);
  const { location } = useSelector(state => state.globalReducer);
  console.log('location', location);
  const actionSheetRef = useRef(null);
  const openActionSheet = () => {
    setActionSheetVisible(true);
    actionSheetRef.current?.show();
  };

  const closeActionSheet = () => {
    setActionSheetVisible(false);
  };

  useMemo(() => {
    actionSheetRef.current?.hide();
  }, [location?.dustrict]);
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [
          null,
          { dy: pan.y }, // Track the movement along the y-axis
        ],
        { useNativeDriver: false },
      ),
      onPanResponderRelease: (e, gestureState) => {
        // Determine if the panel should be swiped up or down
        if (gestureState.dy > 0) {
          // Swiped down
          Animated.spring(pan, {
            toValue: { x: 0, y: responsiveHeight / 1.2 },
            useNativeDriver: false,
          }).start();
        } else {
          // Swiped up
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    button: {
      marginTop: 20,
    },
    swiperWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    swipImage: {
      width: '100%',
      height: responsiveHeight * 2,
      borderRadius: 10,
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
    cartSection: {
      height: responsiveHeight / 1.2,
      backgroundColor: theme.colors.surface,
      // borderWidth: 1,
      position: 'absolute',
      bottom: 0,
      right: 0,
      left: 0,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      justifyContent: 'space-between',
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
    },
  });

  const images = [
    'https://via.placeholder.com/600x300.png?text=Image+1',
    'https://via.placeholder.com/600x300.png?text=Image+2',
    'https://via.placeholder.com/600x300.png?text=Image+3',
  ];

  const handleImagePress = index => {
    console.log(`Image ${index + 1} clicked`);
  };

  const navigation = useNavigationHelper();

  return (
    <View style={styles.container}>
      <Header isBack={false} isShop={true} isPhone={true} />

      <View style={{ paddingHorizontal: 16 }}>
        <View style={[GolbalStyle.row]}>
          <CustomText
            text="Sample collection from"
            size="sm"
            bold="400"
            color="gray"
          />
          <TouchableOpacity onPress={() => openActionSheet()}>
            <View style={[GolbalStyle.row]}>
              <Image source={ImageConstant.location} />
              <CustomText
                text={location?.district}
                size="sm"
                bold="bold"
                underline
              />
            </View>
          </TouchableOpacity>
        </View>

        <Search isClick={true} />

        <ScrollViewHelper>
          {/* Image Swiper */}
          <View style={{ height: responsiveHeight * 2 }}>
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
                    source={ImageConstant.offer}
                    style={styles.swipImage}
                  />
                </TouchableOpacity>
              ))}
            </Swiper>
          </View>

          {/* Service */}
          <View style={[GolbalStyle.mtMD]}>
            <CustomText text="Service" bold="bold" />
          </View>

          {/* CARD */}
          <View style={[GolbalStyle.mtSM]}>
            <FlatList
              contentContainerStyle={{
                columnGap: 20,
              }}
              data={[1, 2]}
              horizontal={true}
              renderItem={({ item }) => {
                return (
                  <BookCard
                    onPress={() => {
                      console.log('first');
                      navigation.push({
                        screen: SCREEN_NAME.BloodGroupTest,
                        data: {},
                      });
                    }}
                    title={'Book a test and diagnostic appointment.'}
                    subTitle={'Blood test, X-ray, MRI, CT scan Etc...'}
                  />
                );
              }}
            />
          </View>
        </ScrollViewHelper>
      </View>

      {/* View cart section */}
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.cartSection,
          {
            transform: [{ translateY: pan.y }],
          },
        ]}
      >
        <TouchableOpacity>
          <View style={[GolbalStyle.row]}>
            <CustomText text={`1 Test | `} bold="bold" />
            <CustomText text={`Select`} />
            <Image
              source={ImageConstant.down_arrow}
              style={GolbalStyle.icon_sm}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            height: responsiveHeight / 2,
            backgroundColor: theme.colors.primary,
            padding: 10,
            paddingHorizontal: 30,
            borderRadius: 10,
          }}
        >
          <CustomText text="View Cart" bold="bold" color="white" />
        </TouchableOpacity>
      </Animated.View>

      <ActionSheet ref={actionSheetRef}>
        <View style={[GolbalStyle.column, { height: responsiveHeight * 4 }]}>
          <AutocompleteDistricts />
        </View>
      </ActionSheet>
    </View>
  );
};

export default HomeTab;
