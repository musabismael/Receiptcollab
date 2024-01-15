import React, {useEffect} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';

const App = ({navigation}) => {
  useEffect(() => {}, []);

  const onRead = result => {
    console.log('Scanned data:', result.data);
  };
  const handleCameraPress = result => {
    navigation.navigate('Entry', {scannedData: result.data});
  };
  return (
    <View style={styles.container}>
      <QRCodeScanner
        onRead={onRead}
        flashMode={RNCamera.Constants.FlashMode.off}
        reactivate={true}
        topContent={
          <Image
            source={require('../assets/logo.png')}
            style={{width: 100, height: 100, marginBottom: 30}}
          />
        }
        bottomContent={
          <View style={styles.camera}>
            <TouchableOpacity onPress={handleCameraPress}>
              <Image
                source={require('../assets/camera2.png')}
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

export default App;
