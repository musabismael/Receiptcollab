import {useRoute} from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Linking,
  TouchableOpacity,
  Alert,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Props {
  qrCodeData: string;
}

const QRCodeScreen: React.FC = ({navigation}) => {
  const route = useRoute();
  const qrCodeData = route.params?.qrCodeData;
  const handleOpenReceipt = () => {
    navigation.navigate('Bill', {qrCodeData: qrCodeData});
  };
  console.log( qrCodeData);

  const checkBill = async () => {
    try {
      const response = await axios.get(
        `http://192.168.50.38:3000/get-scan-info/${qrCodeData.newReceiptId}`,
      );
      console.log(qrCodeData.newReceiptId);

      if (response.status === 200) {
        console.log('Bill checked successfully:', response.data);

        const invoices = await AsyncStorage.getItem('userId');

        if (invoices && response.data) {
          const parsedInvoices = JSON.parse(invoices);
          const matchedInvoice = parsedInvoices.find(
            invoice => invoice.receiptId === response.data.receiptId,
          );

          if (matchedInvoice) {
            console.log('Matched invoice:', matchedInvoice);

            if (
              JSON.stringify(matchedInvoice) !== JSON.stringify(response.data)
            ) {
              console.log(
                'Bills are not similar, replacing the old with the new...',
              );

              const updatedInvoices = parsedInvoices.map(invoice =>
                invoice.receiptId === response.data.receiptId
                  ? response.data
                  : invoice,
              );

              await AsyncStorage.setItem(
                'userId',
                JSON.stringify(updatedInvoices),
              );
              console.log('Invoice replaced successfully.');
              Alert.alert(
                'Congratulations! Your bill has been updated with the new information.',
              );
            }
          } else {
            console.log('No matched invoice found');
          }
        }
      } else {
        console.log('Error checking bill:', response.statusText);
      }
    } catch (error) {
      console.error('API request error:', error.message);
    }
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
        <TouchableOpacity style={{paddingTop: 10}} onPress={handleOpenReceipt}>
          <Text style={{color: 'blue'}}>Open receipt URl</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{paddingTop: 10}} onPress={checkBill}>
          <Icon
            name="reload"
            size={30}
            style={{paddingLeft: 5}}
            color="green"
          />
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
