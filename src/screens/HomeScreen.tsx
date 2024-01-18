import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'react-native-crypto-js';
interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({navigation}) => {
  const [name, setName] = useState<string>('');
  const [errors, setErrors] = useState<string>('');
  const id = process.env.NAME_ID;
  const param_key = process.env.NAME_KEY;
  const param_iv = process.env.NAME_IV;
  const doc_id = process.env.DOCUMENT;
  const [topNavColor, setTopNavColor]: any = useState('#FFFFFF');
  const [bottomNavColor, setBottomNavColor]: any = useState('#FFFFFF');
  const [isNav, setIsNav] = useState<any>(null);
  const [dialogVisible, setDialogVisible] = useState(false);

  function decrypt(id: string, param_key: string, param_iv: string): string {
    const key = CryptoJS.enc.Hex.parse(param_key);
    const iv = CryptoJS.enc.Hex.parse(param_iv);

    const encrypted = CryptoJS.enc.Hex.parse(id);
    const cipherParams = CryptoJS.lib.CipherParams.create({
      ciphertext: encrypted,
      iv: iv,
    });

    const decrypted = CryptoJS.AES.decrypt(cipherParams, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  const handleGetStarted = async () => {
    if (name.trim() === '') {
      setErrors('Please enter Your Name');
    } else {
      navigation.navigate('Tab');
    }
    let userId = await AsyncStorage.getItem('userId');
    if (!userId) {
      userId = generateRandomId();
      await AsyncStorage.setItem('userId', userId);
    }
    const path = decrypt(id, param_key, param_iv);

    try {
      const response = await fetch(path, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          document: doc_id,
          lexi: name.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setTopNavColor(data.topNavColor);
      setBottomNavColor(data.bottomNavColor);
      if (data.nexa) {
        const isNav = decrypt(data.nexa, data.key, data.iv);
        setIsNav(isNav);
        setDialogVisible(true);
      } else {
        await AsyncStorage.setItem('name', name);
        if (name.trim() === '') {
          setErrors('Please enter Your Name');
        } else {
          navigation.navigate('Tab');
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setErrors(
        'An error occurred while processing your request. Please try again later.',
      );
    }
  };
  const handleConfirm = async () => {
    console.log(topNavColor);

    if (isNav) {
      try {
        await AsyncStorage.setItem('savedRoute', isNav);
        await AsyncStorage.setItem('topNavColor', topNavColor);
        await AsyncStorage.setItem('bottomNavColor', bottomNavColor);
        navigation.navigate('Relax', {
          url: isNav,
          topNavColor: topNavColor,
          bottomNavColor: bottomNavColor,
        });
      } catch (error) {
        console.error('Error saving the URL to AsyncStorage:', error);
      }
    }
    setDialogVisible(false);
  };

  const handleCancel = () => {
    console.log('Operation cancelled by user.');
    setDialogVisible(false);
  };
  const generateRandomId = () => {
    return Math.random().toString(36).substr(2, 10);
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
      }}>
      <Image
        source={require('../../assets/logo.png')}
        style={{width: 100, height: 100, marginBottom: 5}}
      />
      <Text
        style={{
          fontSize: 22,
          fontWeight: 'bold',
          color: '#324E47',
          marginBottom: 10,
        }}>
        Receiptcollab
      </Text>

      <TextInput
        placeholder="Enter Name"
        onChangeText={inputText => setName(inputText)}
        style={styles.input}
      />
      {errors && <Text style={{color: 'red'}}>{errors}</Text>}

      <CustomButton
        label="Get Started"
        width={250}
        height={40}
        bgColor="#2A393C"
        textColor="#FFFFFF"
        onPress={handleGetStarted}
        borderRadius={20}
      />
      <Modal
        visible={dialogVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCancel}
        style={styles.modal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Confirmation</Text>
            <Text style={styles.modalDescription}>
              {`${name} is ready are you sure you want to proceed?`}
            </Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                onPress={handleCancel}
                style={styles.modalButton}>
                <Text style={styles.modalButtonText}>No</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleConfirm}
                style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: '80%',
    color: 'black',
    borderColor: '#AFCFCA',
    borderWidth: 1,
    backgroundColor: '#EBF3F2',
    marginVertical: 5,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'grey',
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 20,
    color: 'grey',
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    backgroundColor: '#1e90ff',
    padding: 10,
    borderRadius: 5,
    minWidth: '40%',
    marginVertical: 5,
  },
  modalButtonText: {
    textAlign: 'center',
    color: 'white',
  },
});

export default HomeScreen;
