import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Divider, useTheme } from 'react-native-paper';
import { responsiveHeight, responsiveWidth } from '../../themes';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../Components/header/Header';
import Vstack from '../../Components/Vstack/Vstack';
import Hstack from '../../Components/Hstack/Hstack';
import CustomText from '../../Components/Text';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import GolbalStyle from '../../Style';
const ERecipt = () => {
  const theme = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      // paddingHorizontal: responsiveWidth / 4,
      backgroundColor: theme.colors.background,
    },
    box: {
      padding: responsiveHeight / 4,
      // borderWidth: 0.5,
      // borderRadius: responsiveHeight / 6,
    },
    header: {
      height: responsiveHeight + 20,
      backgroundColor: theme.colors.secondary,
    },
  });
  return (
    <View style={styles.container}>
      <SafeAreaView edges={['top']}>
        {/* <View style={styles.header}> */}
        <Header bg={theme.colors.secondary} tint={'white'} title="E receipt" />
        <View style={styles.box}>
          <Vstack>
            <Hstack
              columnGap={10}
              justifyContent="space-between"
              alignItems="center"
              style={{ padding: 20, width: '100%' }}
            >
              <CustomText text="USG whole abdomen" bold="bold" size="md" />
              <CustomText
                text="Paid"
                color={theme.colors.secondary}
                bold="bold"
              />
            </Hstack>
            <Divider
              style={{ height: 0.5, backgroundColor: 'gray', width: '100%' }}
            />
          </Vstack>

          {/* Payment */}
          <Vstack columnGap={10} rowGap={10} justifyContent="center">
            <Hstack
              columnGap={10}
              justifyContent="space-between"
              alignItems="center"
              style={{ padding: 16, width: '100%' }}
            >
              <Vstack style={{ rowGap: 10 }}>
                <CustomText text="Payment ID" bold="300" size="md" />
                <CustomText text="T240816175845856646" size="sm" />
              </Vstack>
              <TouchableOpacity>
                <MaterialIcons
                  name="content-copy"
                  size={30}
                  color={theme.colors.primary}
                />
              </TouchableOpacity>
            </Hstack>
            <Divider
              style={{ height: 0.5, backgroundColor: 'gray', width: '100%' }}
            />
          </Vstack>

          {/* Booking */}
          <Vstack columnGap={10} rowGap={10} justifyContent="center">
            <Hstack
              columnGap={10}
              justifyContent="space-between"
              alignItems="center"
              style={{ padding: 16, width: '100%' }}
            >
              <Vstack style={{ rowGap: 10 }}>
                <CustomText text="Booking ID" bold="300" size="md" />
                <CustomText text="T240816175845856646" size="sm" />
              </Vstack>
              <TouchableOpacity>
                <MaterialIcons
                  name="content-copy"
                  size={30}
                  color={theme.colors.primary}
                />
              </TouchableOpacity>
            </Hstack>
            <Divider
              style={{ height: 0.5, backgroundColor: 'gray', width: '100%' }}
            />
          </Vstack>

          <Vstack style={GolbalStyle.mtMD}>
            <CustomText text="Patient Details" bold="bold" />
            <Hstack
              columnGap={10}
              justifyContent="space-between"
              alignItems="center"
              style={{ padding: 6, width: '100%' }}
            >
              <CustomText text="Patient name" size="md" />
              <CustomText text="SK Jasimuddin (21)" size="sm" />
            </Hstack>
            <Hstack
              columnGap={10}
              justifyContent="space-between"
              alignItems="center"
              style={{ padding: 6, width: '100%' }}
            >
              <CustomText text="Date" size="md" />
              <CustomText text="17-08-2024" size="sm" />
            </Hstack>
            <Hstack
              columnGap={10}
              justifyContent="space-between"
              alignItems="center"
              style={{ padding: 6, width: '100%' }}
            >
              <CustomText text="Organization name" size="md" />
              <CustomText text="Matri Scan Diagnostic center" size="sm" />
            </Hstack>
            <Hstack
              columnGap={10}
              justifyContent="space-between"
              alignItems="center"
              style={{ padding: 10, width: '100%' }}
            >
              <CustomText text="Organization Address" size="sm" />
              <Vstack>
                <CustomText
                  text="163, RC Das Road"
                  size="sm"
                  textAlign="center"
                  bold="400"
                  // textAlign="center"
                />
                <CustomText
                  text="Purba, Ranisiyer west, "
                  size="sm"
                  textAlign="center"
                  bold="400"
                  // textAlign="center"
                />
                <CustomText
                  text="Bardhaman, West Bengal 713101"
                  size="sm"
                  textAlign="center"
                  bold="400"
                  // textAlign="center"
                />
              </Vstack>
            </Hstack>
          </Vstack>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default ERecipt;

const styles = StyleSheet.create({});
