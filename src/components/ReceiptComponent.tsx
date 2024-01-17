import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ImagePicker, {ImagePickerResponse} from 'react-native-image-picker';

interface ReceiptComponentProps {}

const ReceiptComponent: React.FC<ReceiptComponentProps> = () => {
  const [imageSource, setImageSource] = useState<ImagePickerResponse | null>(
    null,
  );
  const options = {
    title: 'My Pic App',
    takePhotoButtonTitle: 'Take photo with your camera',
    chooseFromLibraryButtonTitle: 'Choose photo from library',
  };

  const launchCamera = () => {
    ImagePicker.launchCamera(options, response => {
      console.log('Response = ', response);
    });
  };
  const launchImageLibrary = () => {
    ImagePicker.launchImageLibrary(options, response => {
      console.log('Response = ', response);
    });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.actionButton, imageSource && styles.doneButton]}
        onPress={launchImageLibrary}
        activeOpacity={0.7}>
        {imageSource ? (
          <>
            <Image source={{uri: imageSource.uri}} style={styles.image} />
            <Text style={styles.buttonTextDone}>Done</Text>
          </>
        ) : (
          <Text style={styles.buttonText}>Upload Receipt</Text>
        )}
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.actionButton, imageSource && styles.doneButton]}
        onPress={launchCamera}
        activeOpacity={0.7}>
        {imageSource ? (
          <>
            <Image source={{uri: imageSource.uri}} style={styles.image} />
            <Text style={styles.buttonTextDone}>Done</Text>
          </>
        ) : (
          <View>
            <Image
              source={require('../../assets/Camera.png')}
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
