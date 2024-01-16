import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import QRCode from 'react-native-qrcode';

interface Props {
  category: string;
  detail: string;
  date: string;
  qrCodeUri?: string;
  qrCodeData?: string;
}

const ExpenseItem: React.FC<Props> = ({
  category,
  detail,
  date,
  qrCodeData,
  navigation,
}) => {
  const handleQRCodePress = () => {

    navigation.navigate('QRCode', {qrCodeData});
  };
  const handleExpenseDetailCodePress = () => {

    navigation.navigate('ExpenseDetail', {qrCodeData});
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 10,
        marginBottom: 10,
        alignItems: 'center',
        backgroundColor: '#EBF3F2',
        borderRadius: 10,
      }}>
      <View style={{flex: 1}}>
        <TouchableOpacity onPress={handleExpenseDetailCodePress}>
          <Text style={{fontSize: 18, color: '#324E47'}}>{category}</Text>
          <Text style={{color: '#AFCFCA'}}>{detail}</Text>
          <Text style={{color: '#AFCFCA'}}>{date}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleQRCodePress}>
        <View
          style={{
            width: 120,
            height: 120,
            backgroundColor: 'white',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: 'gray',
            borderRadius: 20,
          }}>
          <QRCode value={qrCodeData}   fgColor='#0A8E74' bgColor="white" />
          
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ExpenseItem;
