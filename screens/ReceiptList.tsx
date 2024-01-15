import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ExpenseItem from '../components/ExpenseItem';

const ReceiptList = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={{paddingLeft: 20, paddingRight: 20}}>
        <Text style={styles.head}>Library</Text>

        <Text style={styles.subHead}>Previous 7 days</Text>
        <ExpenseItem
          category="Food expense"
          detail="Receipt Amount"
          qrCodeUri=""
          date="1/4/2024"
          navigation={navigation}

        />
        <Text style={styles.subHead}>Previous 30 days</Text>
        <ExpenseItem
          category="Food expense"
          detail="Receipt Amount"
          qrCodeUri=""
          date="1/4/2024"
        />
        <Text style={styles.subHead}>Previous years</Text>
        <ExpenseItem
          category="Food expense"
          detail="Receipt Amount"
          qrCodeUri=""
          date="1/4/2024"
        />
      </View>
    </View>
  );
};

export default ReceiptList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  head: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#324E47',
    padding: 5,
    fontStyle: 'normal',
  },
  subHead: {
    fontSize: 15,
    padding: 5,
    fontWeight: 'normal',
    color: '#324E47',
    fontStyle: 'normal',
  },
});
