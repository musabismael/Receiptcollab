import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import ReceiptComponent from '../components/ReceiptComponent';
interface Props {}

const DataEntryScreen: React.FC<Props> = props => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/logo.png')}
          style={{width: 35, height: 35}}
        />
        <Image
          source={require('../assets/brCode.png')}
          style={{width: 35, height: 35}}
        />
      </View>
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
          onPress={() => {
            alert('Person added');
          }}
          color="#00897b"
          textColor="#0A8E74"
        />
        <CustomButton
          label="3"
          onPress={() => {
            alert('Person added');
          }}
          color="#00897b"
          textColor="#0A8E74"
        />
        <CustomButton
          label="4"
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
      <CustomButton label='Save' width={300} bgColor='#2A393C' textColor='#FFFFFF' borderRadius={20}/>
      <CustomButton label='Split amount' width={300} bgColor='#2A393C' textColor='#FFFFFF' borderRadius={20}/>

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
    paddingLeft: 5,
    paddingRight: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    paddingBottom: '5%',
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
    fontSize: 20,
    textAlign: 'left',
    fontFamily: 'Inter',
    marginVertical: 5,
    width: '80%',
  },
  form: {
    width: '80%',
    paddingBottom: 10,
  },
  form2: {
    width: '80%',
    paddingBottom: 10,
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
});
