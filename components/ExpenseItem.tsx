import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';

interface Props {
  category: string;
  detail: string;
  date: string;
  qrCodeUri: string;
}

const ExpenseItem: React.FC<Props> = ({
  category,
  detail,
  date,
  qrCodeUri,
  navigation,
}) => {
  const handlePress = () => {
    navigation.navigate('ExpenseDetailScreen', {
      category,
      detail,
      date,
      qrCodeUri,
    });
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
      }}>
      <TouchableOpacity onPress={handlePress}>
        <View style={{flex: 1}}>
          <Text style={{fontSize: 18, color: '#324E47'}}>{category}</Text>
          <Text style={{color: '#AFCFCA'}}>{detail}</Text>
          <Text style={{color: '#AFCFCA'}}>{date}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handlePress}>
        <Image source={{uri: qrCodeUri}} style={{width: 50, height: 50}} />
      </TouchableOpacity>
    </View>
  );
};

export default ExpenseItem;
