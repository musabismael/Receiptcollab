import React from 'react';
import {View, Text, Image} from 'react-native';

const ExpenseDetailScreen = ({category, detail, date, qrCodeUri}) => {
  return (
    <View style={{padding: 10}}>
      <Text style={{fontSize: 24}}>Food expense</Text>
      <Text style={{color: 'grey'}}>Previous 7 days</Text>

      <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor:'#EBF3F2', marginTop: 10}}>
        <View>
          <Text>Food expense</Text>
          <Text>Receipt Amount</Text>
          <Text>1/5/2024</Text>
          <Text>Split Number</Text>
          <Text>Equal</Text>
        </View>

        <Image
          source={{uri: '[1](https://example.com/qrcode.png)'}}
          style={{width: 50, height: 50, marginLeft: 'auto'}}
        />
      </View>

      {/* Replace with actual image */}
      <Image
        source={{uri: '[2](https://example.com/receipt.png)'}}
        style={{width: '100%', height: 200, marginTop: 10}}
      />
    </View>
  );
};

export default ExpenseDetailScreen;
