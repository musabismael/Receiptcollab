import {useRoute} from '@react-navigation/native';
import React from 'react';
import {View, Text, Image} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

interface ExpenseDetailScreenProps {
  qrCodeData: string;
}

const ExpenseDetailScreen: React.FC<ExpenseDetailScreenProps> = () => {
  const route = useRoute();
  const qrCodeData = route.params?.qrCodeData;

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
            <Text style={{color: '#324E47', fontSize: 20}}>
              {qrCodeData.receiptName}
            </Text>
            <Text style={{color: '#AFCFCA', fontSize: 15}}>
              {qrCodeData.resultAmount}
            </Text>
            <Text style={{color: '#AFCFCA', fontSize: 15}}>
              {qrCodeData.billDate}
            </Text>
            <Text style={{color: '#AFCFCA', fontSize: 15}}>
              {qrCodeData.splitPerson}
            </Text>
            <Text style={{color: '#AFCFCA', fontSize: 15}}>
              {qrCodeData.splitMode}
            </Text>
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
          <QRCode
            value={JSON.stringify(qrCodeData)}
            color="#0A8E74"
            backgroundColor="white"
          />
        </View>
      </View>

      <Image
        source={
          qrCodeData.receiptImageUri
            ? {uri: qrCodeData.receiptImageUri}
            : {uri: qrCodeData.receiptCameraUri}
        }
        style={{width: '100%', height: 200, marginTop: 10}}
      />
    </View>
  );
};

export default ExpenseDetailScreen;
