import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ReceiptComponent = () => {
  return (
    <View style={styles.container}>
      <View style={styles.uploadReceipt}>
        <Text style={{color: '#AFCFCA'}}>Upload Receipt</Text>
      </View>
      <View style={styles.uploadReceipt}>
        <Image
          source={require('../assets/Camera.png')}
          style={{width: 20, height: 20}}
        />
        <Text style={{color: '#AFCFCA'}}>Camera</Text>
      </View>
    </View>
  );
};

export default ReceiptComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
  },
  uploadReceipt: {
    width: '80%',
    height: 55,
    color: '#AFCFCA',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    alignContent: 'center',
    borderStyle: 'dashed',
    marginBottom: 5,
    borderRadius: 10,
  },
});
