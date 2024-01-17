import React, {useEffect} from 'react';
import {
  Alert,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera, BarCodeReadEvent} from 'react-native-camera';
import {NavigationProp} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface QrCodeScanProps {
  navigation: NavigationProp<any>;
}
const QrCodeScan: React.FC<QrCodeScanProps> = ({navigation}) => {
  const onRead = async (e: BarCodeReadEvent) => {
    var jsonObject = JSON.parse(e.data);
    let userId = await AsyncStorage.getItem('userId');

    if (jsonObject) {
      navigation.navigate('Entry');
      axios
        .post('http://localhost:3000/log-scan', {
          userId,
          scannedData: jsonObject,
        })
        .then(response => {
          console.log('Scan logged successfully', response);
        })
        .catch(error => {

          console.error('Error logging scan:', error);
        });
       Alert.alert(
        'Operation completed',
        'The operation has been completed.',
        [{text: 'OK', onPress: () => console.log('OK pressed')}],
        {cancelable: false},
      );
    }
  };
  const handleCameraPress = (result: BarCodeReadEvent) => {
    navigation.navigate('Entry');
  };

  return (
    <View style={styles.container}>
      <QRCodeScanner
        onRead={onRead}
        flashMode={RNCamera.Constants.FlashMode.off}
        reactivate={true}
        topContent={
          <Image
            source={require('../../assets/logo.png')}
            style={{width: 100, height: 100, marginBottom: 30}}
          />
        }
        bottomContent={
          <View style={styles.camera}>
            <TouchableOpacity onPress={handleCameraPress}>
              <Image
                source={require('../../assets/camera2.png')}
                style={{width: 50, height: 50}}
              />
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  camera: {
    backgroundColor: 'black',
    borderRadius: 100,
    marginTop: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    height: 80,
    width: 80,
    overflow: 'hidden',
  },
});

export default QrCodeScan;
