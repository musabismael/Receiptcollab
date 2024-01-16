import React from 'react';
import {View, Text, Image} from 'react-native';
import QRCode from 'react-native-qrcode';

interface ExpenseDetailScreenProps {
  qrCodeData: string;
}

const ExpenseDetailScreen: React.FC<ExpenseDetailScreenProps> = ({
  qrCodeData,
}) => {
  console.log(qrCodeData);

  return (
    <View style={{padding: 10}}>
      <Text style={{fontSize: 35, color: '#324E47', fontWeight: 'bold'}}>
        Food expense
      </Text>
      <Text style={{color: 'grey'}}>Previous 7 days</Text>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#EBF3F2',
          padding: 5,
          borderRadius: 10,
          marginTop: 10,
        }}>
        <View
          style={{
            width: '65%',
          }}>
          <View>
            <Text style={{color: '#324E47', fontSize: 20}}>Food expense</Text>
            <Text style={{color: '#AFCFCA', fontSize: 15}}>Receipt Amount</Text>
            <Text style={{color: '#AFCFCA', fontSize: 15}}>1/5/2024</Text>
            <Text style={{color: '#AFCFCA', fontSize: 15}}>Split Number</Text>
            <Text style={{color: '#AFCFCA', fontSize: 15}}>Equal</Text>
          </View>
        </View>

        <View
          style={{
            width: 120,
            height: 120,
            backgroundColor: 'white',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            shadowColor: 'gray',
          }}>
          <QRCode value={qrCodeData} fgColor="#0A8E74" bgColor="white" />
        </View>
      </View>

      {/* Replace with actual image */}
      <Image
        source={{uri: 'https://example.com/receipt.png'}}
        style={{width: '100%', height: 200, marginTop: 10}}
      />
    </View>
  );
};

export default ExpenseDetailScreen;
