import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ExpenseItem from '../components/ExpenseItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ScrollView} from 'react-native-gesture-handler';
import {useFocusEffect} from '@react-navigation/native';

const ReceiptList = ({navigation}) => {
  const [receipts, setReceipts] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      const fetchReceipts = async () => {
        try {
          const userId = await AsyncStorage.getItem('userId');
          if (!userId) {
            console.error('User ID not found in AsyncStorage.');
            return;
          }

          const userReceiptsString = await AsyncStorage.getItem(userId);
          const userReceipts = userReceiptsString
            ? JSON.parse(userReceiptsString)
            : [];

          setReceipts(userReceipts);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching receipts from AsyncStorage:', error);
          setLoading(false);
        }
      };

      fetchReceipts();
    }, []),
  );
  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <View style={{paddingLeft: 20, paddingRight: 20}}>
          <Text style={styles.head}>Library</Text>
          <Text style={styles.subHead}>Previous 7 days</Text>
          <ScrollView style={{paddingBottom: 10}}>
            {receipts.map((receipt, index) => (
              <ExpenseItem
                category={receipt.receiptName}
                detail={receipt.billAmount}
                date={receipt.billDate}
                navigation={navigation}
              />
            ))}
          </ScrollView>
        </View>
      )}
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
