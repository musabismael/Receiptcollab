import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import QRCode from 'react-native-qrcode';

interface Props {
  qrCodeData: string;
}

const QRCodeScreen: React.FC<Props> = ({qrCodeData}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textHeading}>Food Expense</Text>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#EBF3F2',
          borderRadius: 10,
        }}>
        <View
          style={{
            width: 250,
            height: 250,
            backgroundColor: 'white',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: 'gray',
            borderRadius: 20,
          }}>
          <QRCode value={qrCodeData} fgColor="#0A8E74" bgColor="white" />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  textHeading: {
    color: '#324E47',
    fontSize: 35,
    fontWeight: 'bold',
  },
});
export default QRCodeScreen;
