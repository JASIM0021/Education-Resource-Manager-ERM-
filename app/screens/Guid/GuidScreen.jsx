import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
} from 'react-native';
import { SCREEN_NAME } from '../../Constant';
import { NativeModules } from 'react-native';

const { SharedPreferencesModule } = NativeModules;
const { width } = Dimensions.get('window');

const GuidScreen = () => {
  const params = useRoute();

  const data = params?.params;
  const [showGuide, setShowGuide] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const fadeAnim = useState(new Animated.Value(0))[0];

  const guideImages = [
    require('../../assets/Images/image1.jpeg'),
    require('../../assets/Images/image2.jpeg'),
    require('../../assets/Images/image3.jpeg'),
    require('../../assets/Images/image4.jpeg'),
    require('../../assets/Images/image5.jpeg'),
    require('../../assets/Images/image6.jpeg'),
    require('../../assets/Images/image7.jpeg'),
    require('../../assets/Images/image8.jpeg'),
    require('../../assets/Images/image9.jpeg'),
    require('../../assets/Images/image10.jpeg'),
  ];

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const handleNext = () => {
    if (currentImageIndex < guideImages.length - 1) {
      fadeAnim.setValue(0);
      setCurrentImageIndex(currentImageIndex + 1);
      fadeIn();
    }
  };

  const navigation = useNavigation();

  const handleFinish = () => {
    SharedPreferencesModule.saveString('@first_time_open', 'save');
    navigation.navigate(SCREEN_NAME.Home);
  };

  return (
    <View style={styles.container}>
      {!showGuide ? (
        <>
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleFinish()}
          >
            <Text style={styles.buttonText}>Skip and Go</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setShowGuide(true);
              fadeIn();
            }}
          >
            <Text style={styles.buttonText}>How to Use</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.guideContainer}>
          <Animated.View style={[styles.imageContainer, { opacity: fadeAnim }]}>
            <Image
              source={guideImages[currentImageIndex]}
              style={styles.image}
            />
          </Animated.View>
          {currentImageIndex < guideImages.length - 1 ? (
            <TouchableOpacity style={styles.button} onPress={handleNext}>
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleFinish}>
              <Text style={styles.buttonText}>Finish</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

export default GuidScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  guideContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  imageContainer: {
    width: width,
    height: width,
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    // width: '100%',
    // height: '100%',
    flex: 1,
    resizeMode: 'contain',
  },
});
