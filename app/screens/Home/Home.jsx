import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  FlatList,
  TouchableOpacity,
  Text,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import { requestPermissions } from '../../Permissions/PermissionHandler';
import { NativeModules } from 'react-native';
import { SCREEN_NAME } from '../../Constant';
import { CopilotStep, useCopilot, walkthroughable } from 'react-native-copilot';
import Icon from 'react-native-vector-icons/MaterialIcons'; // For icons
import { useNavigation } from '@react-navigation/native';
const { SharedPreferencesModule } = NativeModules;
const WalkthroughText = walkthroughable(Text);
const WalkthroughableImage = walkthroughable(Image);
const Home = () => {
  const navigation = useNavigation();
  const [secretCode, setSecretCode] = useState('');
  const [secretPhone, setSecretPhone] = useState('');
  const [emergencyNumbers, setEmergencyNumbers] = useState([]);
  const [newNumber, setNewNumber] = useState('');
  const { start, copilotEvents } = useCopilot();
  const [showSecretCode, setShowSecretCode] = useState(false);
  const [lastEvent, setLastEvent] = useState(null);
  useEffect(() => {
    const requestAllPermissions = async () => {
      const granted = await requestPermissions();
      if (!granted) {
        Alert.alert(
          'Permissions Needed',
          'To ensure the app works properly, we need access to your location and SMS. These permissions help us provide emergency alerts and location sharing. Please enable them in the settings.',
          [{ text: 'OK', onPress: () => requestPermissions() }],
        );
      }
    };
    requestAllPermissions();
    start();
  }, []);

  useEffect(() => {
    const loadEmergencyNumbers = async () => {
      try {
        const storedNumbers = SharedPreferencesModule.getString(
          '@emergency_numbers',
          '[]',
        );

        const secretCode = SharedPreferencesModule.getString(
          '@secret_code',
          '',
        );
        const secretPhone = SharedPreferencesModule.getString(
          '@secret_phone',
          '',
        );
        setSecretCode(secretCode);
        setSecretPhone(secretPhone);
        setEmergencyNumbers(JSON.parse(storedNumbers));
      } catch (error) {
        console.error('Error loading emergency numbers', error);
      }
    };
    loadEmergencyNumbers();
  }, []);

  const handleSave = async () => {
    try {
      SharedPreferencesModule.saveString('@secret_code', secretCode);
      SharedPreferencesModule.saveString('@secret_phone', secretPhone);
      SharedPreferencesModule.saveString(
        '@emergency_numbers',
        JSON.stringify(emergencyNumbers),
      );
      Alert.alert('Saved', 'Your information has been saved successfully.');
    } catch (error) {
      console.error('Error saving data', error);
    }
  };

  const validateIndianPhoneNumber = phoneNumber => {
    const regex = /^[6-9]\d{9}$/; // Validates Indian numbers starting with 6-9 and 10 digits long
    return regex.test(phoneNumber);
  };

  const addEmergencyNumber = () => {
    if (newNumber && validateIndianPhoneNumber(newNumber)) {
      if (!emergencyNumbers.includes(newNumber)) {
        setEmergencyNumbers([...emergencyNumbers, newNumber]);
        setNewNumber('');
      } else {
        Alert.alert(
          'Duplicate Number',
          'This number is already in your emergency list.',
        );
      }
    } else {
      Alert.alert(
        'Invalid Number',
        'Please enter a valid 10-digit Indian phone number.',
      );
    }
  };

  const confirmDeleteNumber = number => {
    Alert.alert('Delete Number', `Are you sure you want to delete ${number}?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => removeEmergencyNumber(number),
      },
    ]);
  };

  const removeEmergencyNumber = number => {
    setEmergencyNumbers(emergencyNumbers.filter(num => num !== number));
  };
  useEffect(() => {
    copilotEvents.on('stepChange', step => {
      console.log('tep.name', step.name);
      setLastEvent(`${step.name}`);
    });
    copilotEvents.on('start', () => {
      setLastEvent(`start`);
    });
    copilotEvents.on('stop', () => {
      setLastEvent(`stop`);

      navigation.navigate(SCREEN_NAME.Guid);
    });

    return () => {
      copilotEvents.off('stepChange', handleStepChange);
      copilotEvents.off('start', handleStart);
      copilotEvents.off('stop', handleStop);
      copilotEvents.off();
    };
  }, [copilotEvents, navigation]);

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        {/* <TouchableOpacity style={styles.button} onPress={() => start()}>
          <Text style={{}}>START THE TUTORIAL!</Text>
        </TouchableOpacity> */}
        <Text style={styles.header}>Setup Your Emergency Contacts</Text>

        <CopilotStep
          text="Enter a secret code for your safety feature . it is requred for confirming your security"
          order={1}
          name="secretCode"
        >
          <WalkthroughText>
            <View style={{ flexDirection: 'column', width: '100%' }}>
              <Text style={styles.label}>Secret Code</Text>

              <View>
                <TextInput
                  style={styles.input}
                  placeholder="Enter Secret Code"
                  value={secretCode}
                  onChangeText={setSecretCode}
                  secureTextEntry={!showSecretCode}
                  placeholderTextColor="#888"
                />
                <TouchableOpacity
                  style={styles.secureInputWrapper}
                  onPress={() => setShowSecretCode(!showSecretCode)}
                >
                  <Icon
                    name={showSecretCode ? 'visibility' : 'visibility-off'}
                    size={24}
                    color="#888"
                  />
                </TouchableOpacity>
              </View>
            </View>
          </WalkthroughText>
        </CopilotStep>

        <CopilotStep
          text="This is where you set the alternative phone number"
          order={2}
          name="alternativeNumber"
        >
          <WalkthroughText>
            <View style={{ flexDirection: 'column', width: '100%' }}>
              <Text style={styles.label}>Alternative Phone</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Secret Phone Number"
                value={secretPhone}
                onChangeText={setSecretPhone}
                keyboardType="phone-pad"
                placeholderTextColor="#888"
              />
            </View>
          </WalkthroughText>
        </CopilotStep>
        <CopilotStep
          text="Add your emergency numbers here"
          order={3}
          name="emergencyNumber"
        >
          <WalkthroughText>
            <View style={{ flexDirection: 'column', width: '100%' }}>
              <Text style={styles.label}>Emergency Number</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Emergency Number"
                value={newNumber}
                onChangeText={setNewNumber}
                keyboardType="phone-pad"
                onSubmitEditing={addEmergencyNumber}
                placeholderTextColor="#888"
              />
            </View>
          </WalkthroughText>
        </CopilotStep>

        <CopilotStep
          text="After entering an Emergency contact Number hit This button"
          order={5}
          name="saveNumber"
        >
          <WalkthroughText>
            <View
              style={{
                flexDirection: 'column',
                width: Dimensions.get('window').width - 60,
              }}
            >
              <TouchableOpacity
                style={styles.addButton}
                onPress={addEmergencyNumber}
              >
                <Text style={styles.addButtonText}>Add Emergency Number</Text>
              </TouchableOpacity>
            </View>
          </WalkthroughText>
        </CopilotStep>
        <CopilotStep
          text="Your Emergency Contact Number will list here"
          order={6}
          name="showlist"
        >
          <WalkthroughText>
            <View
              style={{
                flexDirection: 'column',
                width: Dimensions.get('window').width - 60,
                height: Dimensions.get('window').width - 200,
              }}
            >
              <FlatList
                data={emergencyNumbers}
                contentContainerStyle={{ width: '100%' }}
                keyExtractor={item => item}
                renderItem={({ item }) => (
                  <View style={styles.numberContainer}>
                    <Text style={styles.numberText}>{item}</Text>
                    <TouchableOpacity onPress={() => confirmDeleteNumber(item)}>
                      <Text style={styles.removeText}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                )}
                style={styles.list}
              />
            </View>
          </WalkthroughText>
        </CopilotStep>

        <CopilotStep
          text="After Filing  all above value save this data locally by entering this button"
          order={7}
          name="savedata"
        >
          <WalkthroughText>
            <View
              style={{
                flexDirection: 'column',
                width: Dimensions.get('window').width - 60,
              }}
            >
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </WalkthroughText>
        </CopilotStep>
        <TouchableOpacity
          style={styles.guidBtn}
          onPress={() => {
            start();
          }}
        >
          <Text style={styles.guidBtnText}>How To Use?</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  profilePhoto: {
    width: Dimensions.get('window').width - 60,
    height: 140,
    borderRadius: 70,
    marginVertical: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#F0F4F7',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    height: 50,
    width: Dimensions.get('window').width - 60,
    flex: 1,
    borderColor: '#C3C3C3',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    fontSize: 16,
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2, // For Android shadow
  },

  addButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 10,
    marginTop: 16,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  numberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  numberText: {
    fontSize: 16,
    color: '#333',
  },
  removeText: {
    color: '#f44336',
    fontSize: 14,
    fontWeight: '600',
  },
  list: {
    marginVertical: 10,
  },
  saveButton: {
    backgroundColor: '#1E88E5',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  guidBtn: {
    backgroundColor: '#FF5722',
    padding: 14,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: 40,
  },
  guidBtnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  secureInputWrapper: {
    position: 'absolute',
    right: 10,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 2,
  },
});

export default Home;
