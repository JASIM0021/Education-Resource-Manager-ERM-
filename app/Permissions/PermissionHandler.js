import { PermissionsAndroid, Platform } from 'react-native';
import * as Location from 'expo-location';

export const requestPermissions = async () => {
  try {
    if (Platform.OS === 'android') {
      // Request location permission
      const locationGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (locationGranted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.warn('Location permission not granted');
        return false;
      }

      // Request SMS permission
      const smsGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.SEND_SMS,
      );
      if (smsGranted !== PermissionsAndroid.RESULTS.GRANTED) {
        console.warn('SMS permission not granted');
        return false;
      }

      return true;
    } else if (Platform.OS === 'ios') {
      // Request location permission for iOS
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Location permission not granted');
        return false;
      }

      // iOS-specific SMS permissions (if needed) can be handled here
      return true;
    }
  } catch (err) {
    console.warn('Permission request error:', err);
    return false;
  }
};
