
import React from 'react';
import { NavigationContainer, NavigationContainerProps } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import DataEntryScreen from './src/screens/DataEntryScreen';
import SplashScreen from './src/screens/SplashScreen';
import QRCodeScannerScreen from './src/screens/QRCodeScannerScreen';
import ExpenseDetailScreen from './src/screens/ExpenseDetailScreen';
import QRCodeScreen from './src/screens/QRCodeScreen';
import Tab from './src/BottomTabNavigator';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ExpenseDetail" component={ExpenseDetailScreen} />
        <Stack.Screen name="QRCode" component={QRCodeScreen} />
        <Stack.Screen name="Entry" component={DataEntryScreen} />
        <Stack.Screen name="Tab" component={Tab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}