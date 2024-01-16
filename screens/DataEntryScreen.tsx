import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import ReceiptComponent from '../components/ReceiptComponent';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ReceiptList from './ReceiptList';
import QRCodeScannerScreen from './QRCodeScannerScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCode from 'react-native-qrcode';

interface Props {
  navigation: any;
}

const DataEntryScreen: React.FC<Props> = props => {
  const [receiptName, setReceiptName] = useState('');
  const [billDate, setBillDate] = useState('');
  const [billAmount, setBillAmount] = useState('');
  const [errorMessages, setErrorMessages] = useState('');
  const [selectedButton, setSelectedButton] = useState('');
  const [resultAmount, setResultAmount] = useState(0);
  const [chooseButton, setChooseButton] = useState('');

  const storgePress = async () => => {
    try {
      const userId = await AsyncStorage.getItem("userId");
      if (!userId) {
        setErrorMessages("Error: User ID not found in AsyncStorage.");
        return;
      }
  
      const newReceipt = {
        receiptName,
        billDate,
        billAmount,
        splitMode: chooseButton,
        splitPerson: selectedButton,
        resultAmount,
      };
  
      if (!newReceipt.receiptName || !newReceipt.billDate || !newReceipt.billAmount || !newReceipt.splitMode || !newReceipt.splitPerson || newReceipt.resultAmount === 0) {
        setErrorMessages("Error: Please fill in all fields.");
        return;
      }
  
      const existingReceiptsString = await AsyncStorage.getItem(userId);
  
      const existingReceipts = existingReceiptsString
        ? JSON.parse(existingReceiptsString)
        : [];
  
      existingReceipts.push(newReceipt);
  
      await AsyncStorage.setItem(userId, JSON.stringify(existingReceipts));
  
      // Generate QR code
      const qrCodeData = JSON.stringify(newReceipt);
      
      const qrCodeImage = await QRCode.toDataURL(qrCodeData);
  
      // Store QR code in AsyncStorage
      await AsyncStorage.setItem(`${userId}_qrCode`, qrCodeImage);
  
      setErrorMessages("Success: Receipt saved successfully!");
      console.log("Receipt saved successfully!");
    } catch (error) {
      setErrorMessages("Error: Failed to save receipt to AsyncStorage.");
      console.error("Error saving receipt to AsyncStorage:", error);
    }
  };
  
  
  const handleSplitModePress = () => {
    setErrorMessages('');

    if (!receiptName.trim()) {
      setErrorMessages('Please enter Receipt Name. ');
      return;
    }

    if (!billDate.trim()) {
      setErrorMessages(errorMessages + 'Please enter Bill Date. ');
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
      setResultAmount(splitAmount);
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
        <TextInput
          placeholder="Bill date"
          style={styles.input}
          value={billDate}
          onChangeText={text => setBillDate(text)}
        />

        <TextInput
          placeholder="Bill Amount"
          style={styles.input}
          value={billAmount}
          keyboardType='numeric'
          onChangeText={text => setBillAmount(text)}
        />
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
          onPress={() => setSelectedButton('Custom')}
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
          <Text>Total per person</Text>
          <TouchableOpacity onPress={storgePress}>
            <Text>Save to Library</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const Tab = createBottomTabNavigator();

const BottomTabNavigatorComponent = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarShowLabel: false,
        tabBarBackground() {
          return (
            <ImageBackground
              source={require('../assets/cover.png')}
              resizeMode="cover"
              style={{width: '100%', height: '100%'}}
            />
          );
        },
        tabBarIcon: ({color, size}) => {
          let iconName;

          if (route.name === 'List') {
            iconName = 'library-outline';
          } else if (route.name === 'Qrscan') {
            iconName = 'qr-code';
          } else if (route.name === 'Home') {
            iconName = 'calculator-outline';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#8E9D97',
      })}>
      <Tab.Screen
        options={{
          title: 'Calculator',
        }}
        name="List"
        component={ReceiptList}
      />
      <Tab.Screen
        name="Home"
        component={DataEntryScreen}
        options={{
          title: '',
          headerLeft: () => (
            <Image
              source={require('../assets/logo.png')}
              style={{width: 35, height: 35, marginLeft: '20%'}}
            />
          ),
        }}
      />
      <Tab.Screen
        options={{
          headerShown: false,
        }}
        name="Qrscan"
        component={QRCodeScannerScreen}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigatorComponent;

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
