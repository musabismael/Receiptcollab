import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera, BarCodeReadEvent} from 'react-native-camera';
import {NavigationProp} from '@react-navigation/native';

interface QrCodeScanProps {
  navigation: NavigationProp<any>;
}
const QrCodeScan: React.FC<QrCodeScanProps> = ({navigation}) => {

  const onRead = (result: BarCodeReadEvent) => {
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
