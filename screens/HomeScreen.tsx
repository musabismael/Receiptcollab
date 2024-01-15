import React, {useState, useEffect} from 'react';
import {View, Text, Image, TextInput, StyleSheet} from 'react-native';
import {Button, TextInput as PaperTextInput} from 'react-native-paper';
import CustomButton from '../components/CustomButton';

const HomeScreen = ({route, navigation}) => {
  const [text, setText] = useState('');
  const [errors, setErrors] = useState('');

  useEffect(() => {
    if (text.trim() === '') {
      setErrors('Name is required');
    } else {
      setErrors('');
    }
  }, [text]);

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f5f5',
      }}>
      <Image
        source={require('../assets/logo.png')}
        style={{width: 100, height: 100, marginBottom: 5}}
      />
      <Text style={{fontSize: 22, fontWeight: 'bold', color:'#324E47', marginBottom: 10}}>
        Receiptcollab
      </Text>

      <TextInput
        placeholder="Enter Name"
        onChangeText={inputText => setText(inputText)}
        style={styles.input}
      />


      <CustomButton
        label="Get Started"
        width={250}
        height={40}
        bgColor="#2A393C"
        textColor="#FFFFFF"
        onPress={() =>{
          (!errors)
          navigation.navigate('Entry');

        }}
        borderRadius={20}
      />
     
            {errors && <Text style={{color: 'red'}}>{errors}</Text>}

    </View>
  );
};
const styles = StyleSheet.create({
  input: {
    height: 50,
    width: '80%',
    borderColor: '#AFCFCA',
    borderWidth: 1,
    backgroundColor: '#EBF3F2',
    marginVertical: 5,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
})
export default HomeScreen;
