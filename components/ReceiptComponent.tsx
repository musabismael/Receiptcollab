import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ImagePicker from 'react-native-image-picker';

const ReceiptComponent = () => {
  const [imageSource, setImageSource] = useState(null);

  const handleUploadReceipt = () => {
    ImagePicker.showImagePicker({title: 'Select Image'}, response => {
      if (!response.didCancel && !response.error) {
        // Image selected successfully
        setImageSource({uri: response.uri});
      }
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.actionButton, imageSource && styles.doneButton]}
        onPress={handleUploadReceipt}
        activeOpacity={0.7}>
        {imageSource ? (
          <>
            <Image source={imageSource} style={styles.image} />
            <Text style={styles.buttonTextDone}>Done</Text>
          </>
        ) : (
          <Text style={styles.buttonText}>Upload Receipt</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.actionButton, imageSource && styles.doneButton]}
        onPress={handleUploadReceipt}
        activeOpacity={0.7}>
        {imageSource ? (
          <>
            <Image source={imageSource} style={styles.image} />
            <Text style={styles.buttonTextDone}>Done</Text>
          </>
        ) : (
          <View>
            <Image
              source={require('../assets/Camera.png')}
              style={{
                width: 20,
                height: 20,
                alignContent: 'center',
                alignSelf: 'center',
              }}
            />

            <Text style={styles.buttonText}>Camera</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ReceiptComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '100%',
    alignItems: 'center',
  },
  actionButton: {
    width: '80%',
    height: 55,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
    marginBottom: 5,
    borderRadius: 10,
  },
  doneButton: {
    borderColor: 'green',
  },
  buttonText: {
    color: '#AFCFCA',
  },
  buttonTextDone: {
    color: 'green',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
});
