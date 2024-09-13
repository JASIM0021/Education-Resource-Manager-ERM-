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
} from 'react-native';
import { requestPermissions } from '../../Permissions/PermissionHandler';
import { NativeModules } from 'react-native';
import { SCREEN_NAME } from '../../Constant';

const { SharedPreferencesModule } = NativeModules;

const Home = ({ navigation }) => {
  const [secretCode, setSecretCode] = useState('');
  const [secretPhone, setSecretPhone] = useState('');
  const [emergencyNumbers, setEmergencyNumbers] = useState([]);
  const [newNumber, setNewNumber] = useState('');

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

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter Secret Code"
        value={secretCode}
        onChangeText={setSecretCode}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Secret Phone Number"
        value={secretPhone}
        onChangeText={setSecretPhone}
        keyboardType="phone-pad"
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Emergency Number"
        value={newNumber}
        onChangeText={setNewNumber}
        keyboardType="phone-pad"
        onSubmitEditing={addEmergencyNumber}
      />
      <Button title="Add Emergency Number" onPress={addEmergencyNumber} />
      <FlatList
        data={emergencyNumbers}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <View style={styles.numberContainer}>
            <Text style={styles.numberText}>{item}</Text>
            <TouchableOpacity onPress={() => confirmDeleteNumber(item)}>
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Button title="Save" onPress={handleSave} />
      <TouchableOpacity
        style={styles.guidBtn}
        onPress={() => {
          navigation.navigate(SCREEN_NAME.GuidScreen, {
            direct: true,
          });
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: 20,
            color: 'white',
          }}
        >
          How To Use ?
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  guidBtn: {
    position: 'absolute',
    backgroundColor: 'green',
    height: 200,
    width: 200,
    bottom: 140,
    right: 100,
    // left: 0,
    // left: '40%',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 48,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  numberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginVertical: 4,
    borderColor: '#ddd',
    borderWidth: 1,
  },
  numberText: {
    fontSize: 16,
    color: '#333',
  },
  removeText: {
    color: '#ff0000',
    fontSize: 14,
  },
});

export default Home;
