import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import DataEntryScreen from './screens/DataEntryScreen';
import SplashScreen from './screens/SplashScreen';
import QRCodeScannerScreen from './screens/QRCodeScannerScreen'
import ExpenseDetailScreen from './components/ExpenseDetailScreen';
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Entry" component={DataEntryScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="scan" component={QRCodeScannerScreen} />
        <Stack.Screen name="ExpenseDetailScreen" component={ExpenseDetailScreen} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}
