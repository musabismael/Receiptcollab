import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, StyleSheet } from 'react-native';
import CustomButton from '../components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface HomeScreenProps {
  navigation: any; // Replace with your specific navigation type
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [text, setText] = useState<string>('');
  const [errors, setErrors] = useState<string>('');

  useEffect(() => {
    if (text.trim() === '') {
      setErrors('Name is required');
    } else {
      setErrors('');
    }
  }, [text]);

  const handleGetStarted = async () => {
    if (!errors) {
      let userId = await AsyncStorage.getItem('userId');

      if (!userId) {
        userId = generateRandomId();

        await AsyncStorage.setItem('userId', userId);
      }

      navigation.navigate('Tab');
    }
  };

  const generateRandomId = () => {
    return Math.random().toString(36).substr(2, 10);
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
      }}>
      <Image
        source={require('../../assets/logo.png')} 
        style={{ width: 100, height: 100, marginBottom: 5 }}
      />
      <Text
        style={{
          fontSize: 22,
          fontWeight: 'bold',
          color: '#324E47',
          marginBottom: 10,
        }}>
        Receiptcollab
      </Text>

      <TextInput
        placeholder="Enter Name"
        onChangeText={(inputText) => setText(inputText)}
        style={styles.input}
      />
      {errors && <Text style={{ color: 'red' }}>{errors}</Text>}

      <CustomButton
        label="Get Started"
        width={250}
        height={40}
        bgColor="#2A393C"
        textColor="#FFFFFF"
        onPress={handleGetStarted}
        borderRadius={20}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: '80%',
    color:'black',
    borderColor: '#AFCFCA',
    borderWidth: 1,
    backgroundColor: '#EBF3F2',
    marginVertical: 5,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
});

export default HomeScreen;
