import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { PermissionsAndroid, Platform } from 'react-native';


interface ReceiptComponentProps {}

const ReceiptComponent: React.FC<ReceiptComponentProps> = () => {
  const [imageCameraUploaded, setCameraUploaded] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const options = {
    title: 'My Pic App',
    takePhotoButtonTitle: 'Take photo with your camera',
    chooseFromLibraryButtonTitle: 'Choose photo from library',
  };
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'This app needs access to your camera to take photos.',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Camera permission granted');
        } else {
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };
  const launchCameraUplaod = async () => {
    try {
      await requestCameraPermission();
      const response = await launchCamera(options);
      if (response.didCancel) {
        console.log('User cancelled image capture');
        return;
      }
      if (
        !response.assets ||
        !Array.isArray(response.assets) ||
        response.assets.length === 0
      ) {
        console.error('Invalid response from camera');
        return;
      }

      const cameraUri = response.assets[0]['uri'];
      await AsyncStorage.setItem('receiptCameraUri', cameraUri);
      if (cameraUri) setImageUploaded(false);
      setCameraUploaded(false);
      setModalVisible(true);
    } catch (error) {
      console.error('Error launching camera:', error);
    }
  };

  const launchImageLibraryUpload = async () => {
    try {
      const response = await launchImageLibrary(options);
      if (response.didCancel) {
        console.log('User cancelled image selection');
        return;
      }

      if (
        !response.assets ||
        !Array.isArray(response.assets) ||
        response.assets.length === 0
      ) {
        console.error('Invalid response from image library');
        return;
      }

      const imageUri = response.assets[0]['uri'];

      await AsyncStorage.setItem('receiptImageUri', imageUri);
      if (imageUri) setImageUploaded(false);
      setModalVisible(true);
    } catch (error) {
      console.error('Error launching image library:', error);
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={launchImageLibraryUpload}
        activeOpacity={0.7}>
        <Text style={styles.buttonText}>
          {imageUploaded ? 'Done' : 'Upload Receipt'}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.actionButton}
        onPress={launchCameraUplaod}
        activeOpacity={0.7}>
        <View>
          {!imageCameraUploaded && (
            <Image
              source={require('../../assets/Camera.png')}
              style={{
                width: 20,
                height: 20,
                alignContent: 'center',
                alignSelf: 'center',
              }}
            />
          )}

          <Text
            style={imageUploaded ? styles.buttonTextDone : styles.buttonText}>
            {imageCameraUploaded ? 'Done' : 'Camera'}
          </Text>
        </View>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleModalClose}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Image saved successfully!</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleModalClose}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ReceiptComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '100%',
    alignItems: 'center',
  },
  actionButton: {
    width: '80%',
    height: 55,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    marginBottom: 5,
    borderRadius: 10,
  },
  doneButton: {
    borderColor: 'green',
  },
  buttonText: {
    color: '#AFCFCA',
  },
  buttonTextDone: {
    color: 'green',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#fff',
  },
});
