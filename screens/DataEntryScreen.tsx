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

interface Props {
  navigation: any;
}

const DataEntryScreen: React.FC<Props> = props => {
  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.headText}>Splitter</Text>
        <TextInput placeholder="Receipt Name" style={styles.input} />
        <TextInput placeholder="Bill date" style={styles.input} />
        <TextInput placeholder="Bill Amount" style={styles.input} />
        <Text style={styles.headText2}>Split Person</Text>
      </View>
      <View style={styles.form2}>
        <CustomButton
          label="2"
          width={60}
          onPress={() => {
            alert('Person added');
          }}
          color="#00897b"
          textColor="#0A8E74"
        />
        <CustomButton
          label="3"
          width={60}
          onPress={() => {
            alert('Person added');
          }}
          color="#00897b"
          textColor="#0A8E74"
        />
        <CustomButton
          label="4"
          width={60}
          onPress={() => {
            alert('Person added');
          }}
          color="#00897b"
          textColor="#0A8E74"
        />
        <CustomButton
          label="Custom"
          onPress={() => {
            alert('Person added');
          }}
          width={80}
          color="#00897b"
          textColor="#0A8E74"
        />
      </View>
      <View style={styles.form}>
        <Text style={styles.headText2}>Split Mode</Text>
      </View>
      <View style={styles.form2}>
        <CustomButton
          label="Equal"
          onPress={() => {
            alert('Person added');
          }}
          width={70}
          color="#00897b"
          textColor="#0A8E74"
        />
        <CustomButton
          label="Custom"
          onPress={() => {
            alert('Person added');
          }}
          width={80}
          color="#00897b"
          textColor="#0A8E74"
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
        textColor="#FFFFFF"
        borderRadius={20}
      />
      <View style={styles.footer}>
        <View style={styles.footerText}>
          <Text style={{color: '#2A393C', fontWeight: 'normal'}}>$0</Text>
          <Text style={{right: 30}}> &#9829;</Text>
        </View>
        <View style={styles.footerText}>
          <Text>Total per person</Text>
          <Text>Save to Library</Text>
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
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Entry')}>
              <Icon name="arrow-back" size={24} color="#27C4A6" />
            </TouchableOpacity>
          ),
        }}
        name="List"
        component={ReceiptList}
      />
      <Tab.Screen
        name="Home"
        component={DataEntryScreen}
        options={{
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
