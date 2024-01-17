import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ExpenseItem from '../components/ExpenseItem';

interface Receipt {
  receiptName: string;
  billAmount: string;
  billDate: string;
}

interface ReceiptListProps {
  navigation: any; 
}

const ReceiptList: React.FC<ReceiptListProps> = ({ navigation }) => {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
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
          const userReceipts: Receipt[] = userReceiptsString
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
        <Text style={{color:'red'}}>Loading...</Text>
      ) : (
        <View style={{ paddingLeft: 20, paddingRight: 20 }}>
          <Text style={styles.head}>Library</Text>
          <Text style={styles.subHead}>Previous 7 days</Text>
          <ScrollView style={{ paddingBottom: 10 }}>
            {receipts.map((receipt, index) => {
            
            return (
              <ExpenseItem
                key={index}
                category={receipt.receiptName}
                detail={receipt.billAmount}
                date={receipt.billDate}
                qrCodeData={receipt}
                navigation={navigation}
              />
            )})}
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
