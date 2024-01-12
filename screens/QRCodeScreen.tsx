import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import QRCode from 'react-native-qrcode';

function QRCodeScreen({ route, navigation }) {
  const { receiptData, receiptFile } = route.params;
  const qrData = JSON.stringify({ receiptData, receiptFile });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Share your receipt</Text>
      <Text style={styles.subtitle}>Scan this QR code to join the same receipt</Text>
      <QRCode value={qrData} size={200} />
      <Button title="View receipt" onPress={() => navigation.navigate('Web View', { receiptFile })} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d3748',
    margin: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#4a5568',
    margin: 10,
  },
});

export default QRCodeScreen;