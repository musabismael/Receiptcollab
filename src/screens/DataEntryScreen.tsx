import {
  Image,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import ReceiptComponent from '../components/ReceiptComponent';
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import DateTimePicker from '@react-native-community/datetimepicker';

interface Props {
  navigation: any;
}

const DataEntryScreen: React.FC<Props> = props => {
  const [receiptName, setReceiptName] = useState('');
  const [billDate, setBillDate] = useState(new Date());
  const [billAmount, setBillAmount] = useState('');
  const [errorMessages, setErrorMessages] = useState('');
  const [selectedButton, setSelectedButton] = useState('');
  const [resultAmount, setResultAmount] = useState(0);
  const [chooseButton, setChooseButton] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [show, setShow] = useState(false);
  const [mode, setMode] = useState('date');

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setBillDate(currentDate);
  };
  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };
  const handleSavePress = () => {
    setSelectedButton(inputValue);
    setModalVisible(false);
  };

  const storgePress = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        setErrorMessages('Error: User ID not found in AsyncStorage.');
        return;
      }
      const newReceiptId = uuid.v4();
      let receiptCameraUri = null;
      let receiptImageUri = null;

      try {
        receiptCameraUri = await AsyncStorage.getItem('receiptCameraUri');
        receiptImageUri = await AsyncStorage.getItem('receiptImageUri');
      } catch (error) {
        console.error('Error retrieving image URIs from AsyncStorage:', error);
      }
      const newReceipt = {
        newReceiptId,
        receiptName,
        billDate,
        billAmount,
        splitMode: chooseButton,
        splitPerson: selectedButton,
        resultAmount,
        receiptCameraUri,
        receiptImageUri,
      };

      if (
        !newReceipt.receiptName ||
        !newReceipt.billDate ||
        !newReceipt.billAmount ||
        !newReceipt.splitMode ||
        !newReceipt.splitPerson ||
        newReceipt.resultAmount === 0
      ) {
        setErrorMessages('Error: Please fill in all fields.');
        return;
      }

      const existingReceiptsString = await AsyncStorage.getItem(userId);

      const existingReceipts = existingReceiptsString
        ? JSON.parse(existingReceiptsString)
        : [];

      existingReceipts.push(newReceipt);

      await AsyncStorage.setItem(userId, JSON.stringify(existingReceipts));
      props.navigation.navigate('List');

      console.log('Receipt saved successfully!');
      setReceiptName('');
      setBillAmount('');
      setChooseButton('');
      setSelectedButton('');
      setResultAmount(0);
      await AsyncStorage.removeItem('receiptCameraUri');
      await AsyncStorage.removeItem('receiptImageUri');
    } catch (error) {
      setErrorMessages('Error: Failed to save receipt to AsyncStorage.');
      console.error('Error saving receipt to AsyncStorage:', error);
    }
  };

  const handleSplitModePress = () => {
    setErrorMessages('');

    if (!receiptName.trim()) {
      setErrorMessages('Please enter Receipt Name. ');
      return;
    }

    if (!billAmount.trim()) {
      setErrorMessages(errorMessages + 'Please enter Bill Amount. ');
      return;
    }
    if (chooseButton === '') {
      setErrorMessages('Choose one of Equal / Custom. ');
      return;
    }
    if (selectedButton === '') {
      setErrorMessages('Please enter Split Person ');
      return;
    }
    const amount = parseFloat(billAmount);

    if (isNaN(amount) || amount <= 0) {
      setErrorMessages('Please enter a valid Bill Amount. ');
      return;
    }

    if (selectedButton === 'Custom') {
      setErrorMessages('Custom split logic not implemented yet.');
      return;
    }
    if (chooseButton === 'equal') {
      const splitAmount = amount / parseInt(selectedButton);
      let roundedAmount = Math.round(splitAmount * 100) / 100; // round to 2 decimal places
      if (roundedAmount > splitAmount) {
        roundedAmount = Math.round(splitAmount * 10) / 10; // reduce digits
      }
      setResultAmount(roundedAmount);
    }
    if (chooseButton === 'custom') {
      setResultAmount(amount);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.headText}>Splitter</Text>
        <TextInput
          placeholder="Receipt Name"
          style={styles.input}
          value={receiptName}
          onChangeText={text => setReceiptName(text)}
        />
        {/* <TextInput
          placeholder="Bill date"
          style={styles.input}
          value={billDate}
          onChangeText={text => setBillDate(text)}
        /> */}

        <TextInput
          placeholder="Bill Amount"
          style={styles.input}
          value={billAmount}
          keyboardType="numeric"
          onChangeText={text => setBillAmount(text)}
        />
        <CustomButton
          onPress={showDatepicker}
          width={100}
          bgColor="#EBF3F2"
          textColor="#AFCFCA"
          label="Bill date"
        />
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={billDate}
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
        <Text style={styles.errorText}>{errorMessages}</Text>

        <Text style={styles.headText2}>Split Person</Text>
      </View>
      <View style={styles.form2}>
        <CustomButton
          label="2"
          width={60}
          onPress={() => setSelectedButton('2')}
          textColor="#0A8E74"
          selected={selectedButton === '2'}
        />

        <CustomButton
          label="3"
          width={60}
          onPress={() => setSelectedButton('3')}
          textColor="#0A8E74"
          selected={selectedButton === '3'}
        />

        <CustomButton
          label="4"
          width={60}
          onPress={() => setSelectedButton('4')}
          textColor="#0A8E74"
          selected={selectedButton === '4'}
        />

        <CustomButton
          label="Custom"
          onPress={() => {
            setSelectedButton('Custom');
            setModalVisible(true);
          }}
          width={80}
          textColor="#0A8E74"
          selected={selectedButton === 'Custom'}
        />
      </View>
      <View style={styles.form}>
        <Text style={styles.headText2}>Split Mode</Text>
      </View>
      <View style={styles.form2}>
        <CustomButton
          label="Equal"
          width={70}
          onPress={() => setChooseButton('equal')}
          textColor="#0A8E74"
          selected={chooseButton === 'equal'}
        />
        <CustomButton
          label="Custom"
          width={80}
          onPress={() => setChooseButton('custom')}
          textColor="#0A8E74"
          selected={chooseButton === 'custom'}
        />
      </View>
      <View style={styles.form}>
        <Text style={styles.headText2}>Add Receipt</Text>
      </View>
      <ReceiptComponent />
      <CustomButton
        label="Split amount"
        width={250}
        height={40}
        bgColor="#2A393C"
        onPress={handleSplitModePress}
        textColor="#FFFFFF"
        borderRadius={20}
      />
      <View style={styles.footer}>
        <View style={styles.footerText}>
          <Text style={{color: '#2A393C', fontWeight: 'normal'}}>
            ${resultAmount}
          </Text>
          <Text style={{right: 30}}> &#9829;</Text>
        </View>
        <View style={styles.footerText}>
          <Text style={{color: 'black'}}>Total per person</Text>
          <TouchableOpacity onPress={storgePress}>
            <Text style={{color: 'black'}}>Save to Library</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible} // Set the visibility of the modal
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.textInput}
              value={inputValue}
              onChangeText={text => setInputValue(text)}
              placeholder="Enter split person"
              keyboardType="numeric"
            />
            <View style={{paddingBottom: 5}}>
              <CustomButton
                label="Save"
                width={100}
                onPress={handleSavePress}
              />
            </View>

            <CustomButton
              label="Close"
              width={100}
              onPress={handleSavePress}
              bgColor="gray"
              textColor="white"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DataEntryScreen;

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#F5FCFF',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: '1%',
    paddingLeft: '10%',
    paddingRight: '10%',
  },

  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
  },
  headText: {
    color: '#324E47',
    fontSize: 30,
    textAlign: 'left',
    fontFamily: 'Inter',
    fontWeight: 'bold',
    marginVertical: 10,
    width: '80%',
  },
  headText2: {
    color: '#324E47',
    fontSize: 12,
    textAlign: 'left',
    fontFamily: 'Inter',
    marginVertical: 5,
  },
  form: {
    width: '80%',
    paddingBottom: 5,
  },
  form2: {
    width: '80%',
    paddingBottom: 5,
    flexDirection: 'row',
  },
  input: {
    height: 50,
    width: '100%',
    color: 'black',
    borderColor: '#AFCFCA',
    borderWidth: 1,
    backgroundColor: '#EBF3F2',
    marginVertical: 5,
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  footer: {
    width: '90%',
    padding: 10,
    marginTop: 10,
    borderTopWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#2A393C',
  },
  footerText: {
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
});
