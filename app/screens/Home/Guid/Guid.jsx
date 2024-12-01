import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import ImageConstant from '../../../Constant/ImageConstant';

const Guid = () => {
  const navigation = useNavigation();
  const [expandedStep, setExpandedStep] = useState(null);

  const toggleStep = step => {
    setExpandedStep(expandedStep === step ? null : step);
  };

  const infoArray = [
    {
      title: 'Step 1: Activate Service',
      image: ImageConstant.active_service,
      details:
        'To activate the service, you need to click the safety icon in your control panel or tile section. If you cannot find it in your control area, make sure to add it. To add the icon, click the edit icon in your control panel and drag and drop the safety icon from the icon list section into your control panel edit section.',
    },
    {
      title: 'Step 2: Show Notification',
      image: ImageConstant.show_notification,
      details:
        'When you activate this service successfully, you will receive a notification with three options (You can activate it through the control panel, notification panel, or simply by clicking the app).',
    },
    {
      title: 'Step 3: Click Not Safe',
      image: ImageConstant.click_not_safe,
      details:
        'If you feel unsafe, for example, if someone is following you, click this option. After clicking this option, an emergency alert will be sent to all your emergency contacts along with your current location, which you have previously saved.',
    },
    {
      title: 'Step 4: Click Safe Now',
      image: ImageConstant.click_save_now,
      details:
        'Confirm your safety every 10 minutes. If you do not click this option, an emergency SMS will be sent along with your current location. After clicking the safe button, you need to verify your identity by confirming your secret password, which you have previously saved.',
    },
    {
      title: 'Step 5: Safety Complete',
      image: ImageConstant.click_safty_complete,
      details:
        'After clicking this safe button, you need to verify your identity by confirming your secret password, which you have previously saved.',
    },
    {
      title: 'Step 6: Stop Service',
      image: ImageConstant.stop_service,
      details:
        'After entering the correct secret, the service will stop and will not run until you restart it. If it behaves differently with your device, please report it to skjasimuddin9153@gmail.com. If you enter the wrong code or exit from it, an emergency alert will be sent to your saved contacts along with your location.',
    },
  ];

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <Text style={styles.header}>Step-by-Step Safety Guide</Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Steps Array */}
        {infoArray.map((step, index) => (
          <View key={index} style={styles.stepContainer}>
            <Text style={styles.stepText}>{step.title}</Text>
            <Image source={step.image} style={styles.image} />
            <TouchableOpacity onPress={() => toggleStep(index)}>
              <Text style={styles.readMore}>
                {expandedStep === index ? 'Read Less' : 'Read More'}
              </Text>
            </TouchableOpacity>
            {expandedStep === index && (
              <Text style={styles.details}>{step.details}</Text>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default Guid;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 50,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#4CAF50',
    borderRadius: 50,
    padding: 10,
    zIndex: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333',
  },
  stepContainer: {
    marginVertical: 15,
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  stepText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  readMore: {
    color: '#4CAF50',
    marginVertical: 10,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});
