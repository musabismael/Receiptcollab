// styles.ts
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 10,
  },
  subtitle: {
    fontSize: 18,
    margin: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    margin: 5,
  },
  splitContainer: {
    margin: 10,
  },
  splitText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  splitOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
  },
  participantsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  participantsText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  participantsInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    margin: 5,
  },
  qrContainer: {
    alignItems: 'center',
    margin: 10,
  },
  qrText: {
    fontSize: 16,
    margin: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
  },
  webview: {
    flex: 1,
    width: '100%',
    margin: 10,
  },
});
export default styles;
