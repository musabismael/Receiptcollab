import React, {useState} from 'react';
import {View, Text, Image, TextInput, Button, StyleSheet} from 'react-native';
import CustomButton from '../components/CustomButton';

const HomeScreen = () => {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    // do something with the text input
    alert(`You entered: ${text}`);
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png',
        }}
        style={styles.logo}
      />
      <Text style={styles.welcome}>Welcome</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter something"
        value={text}
        onChangeText={setText}
      />
      <CustomButton width={200} label="Submit" />
      {/* <Button title="Submit" onPress={handleSubmit} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 100,
    height: 100,
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius:20,
    padding: 10,
    margin: 10,
  },
});

export default HomeScreen;
