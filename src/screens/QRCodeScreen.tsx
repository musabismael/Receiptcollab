import {useRoute} from '@react-navigation/native';
import React from 'react';
import {View, Text, Image, StyleSheet, Linking, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import QRCode from 'react-native-qrcode-svg';

interface Props {
  qrCodeData: string;
}

const QRCodeScreen: React.FC = ({navigation}) => {
  const route = useRoute();
  const qrCodeData = route.params?.qrCodeData;
  const handleOpenReceipt = () => {
    navigation.navigate('Bill', { qrCodeData: qrCodeData });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.textHeading}>Food Expense</Text>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
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
          <QRCode
            value={JSON.stringify(qrCodeData)}
            size={200}
            color="#0A8E74"
            backgroundColor="white"
          />
        </View>
        <TouchableOpacity
          style={{ paddingTop: 10 }}
          onPress={handleOpenReceipt}
        >
          <Text style={{color: 'blue'}}>Open receipt URl</Text>
        </TouchableOpacity>
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
  input: {
    height: 50,
    width: '100%',
    color: 'black',
    borderColor: '#AFCFCA',
    borderWidth: 1,
    backgroundColor: '#EBF3F2',
    marginVertical: 5,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  textHeading: {
    color: '#324E47',
    fontSize: 35,
    fontWeight: 'bold',
  },
});
export default QRCodeScreen;