import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button, FlatList } from 'react-native';
import QRCode from 'react-native-qrcode-svg'; // Assuming you are using this library

interface Item {
  name: string;
  price: string;
  split: number;
}

interface BillSplitScreenProps {
  route: {
    params: {
      receiptData: {
        items: Item[];
      };
      receiptFile: string;
    };
  };
  navigation: any; // Adjust the type according to your navigation setup
}

function BillSplitScreen({ route, navigation }: BillSplitScreenProps) {
  const { receiptData, receiptFile } = route.params;
  const [splitType, setSplitType] = useState<'equal' | 'custom'>('equal');
  const [customSplits, setCustomSplits] = useState<Item[]>(
    receiptData.items.map((item) => ({ ...item, split: 1 }))
  );

  const handleSplitTypeChange = (value: 'equal' | 'custom') => {
    setSplitType(value);
  };

  const handleCustomSplitChange = (index: number, text: string) => {
    const split = parseInt(text, 10) || 1;
    setCustomSplits((prevSplits) =>
      prevSplits.map((item, i) => (i === index ? { ...item, split } : item))
    );
  };

  const handleNext = () => {
    navigation.navigate('QR Code', { receiptData, receiptFile });
  };

  const renderItem = ({ item, index }: { item: Item; index: number }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>{item.price}</Text>
      <TextInput
        style={styles.itemSplit}
        value={item.split.toString()}
        onChangeText={(text) => handleCustomSplitChange(index, text)}
        keyboardType="numeric"
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Split your bill</Text>
      <Text style={styles.label}>Choose between custom or equal splitting</Text>
      <View style={styles.radioContainer}>
        <Text style={styles.radioLabel}>Custom</Text>
        {/* Your RadioButton component here */}
        <Text style={styles.radioLabel}>Equal</Text>
        {/* Your RadioButton component here */}
      </View>
      {splitType === 'custom' && (
        <View style={styles.listContainer}>
          <Text style={styles.listTitle}>Enter the number of people to split each item</Text>
          <FlatList
            data={customSplits}
            renderItem={renderItem}
            keyExtractor={(item) => item.name}
          />
        </View>
      )}
      {/* Use your QRCode component here */}
      <QRCode value="Your QR code data" />
      <Button title="Next" onPress={handleNext} />
    </View>
  );
}

  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f0f4f8',
      padding: 10,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#2d3748',
      margin: 10,
    },
    label: {
      fontSize: 16,
      color: '#4a5568',
      margin: 10,
    },
    radioContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      margin: 10,
    },
    radioLabel: {
      fontSize: 16,
      color: '#4a5568',
    },
    listContainer: {
      flex: 1,
      margin: 10,
    },
    listTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#2d3748',
      margin: 10,
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#ffffff',
      borderColor: '#cbd5e0',
      borderWidth: 1,
      borderRadius: 5,
      padding: 10,
      margin: 10,
    },
    itemName: {
      fontSize: 16,
      color: '#4a5568',
      flex: 1,
    },
    itemPrice: {
      fontSize: 16,
      color: '#4a5568',
      flex: 1,
      textAlign: 'center',
    },
    itemSplit: {
      fontSize: 16,
      color: '#4a5568',
      flex: 1,
      textAlign: 'right',
    },
  });
  export default BillSplitScreen;
  