import React from 'react';
import {
  NavigationContainer,
  NavigationContainerProps,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import DataEntryScreen from './src/screens/DataEntryScreen';
import SplashScreen from './src/screens/SplashScreen';
import ExpenseDetailScreen from './src/screens/ExpenseDetailScreen';
import QRCodeScreen from './src/screens/QRCodeScreen';
import ReceiptBill from './src/screens/ReceiptBill';
import Tab from './src/BottomTabNavigator';
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ExpenseDetail" component={ExpenseDetailScreen} />
        <Stack.Screen
          options={{
            headerRight: () => (
              <Icon
                name="reload"
                size={20}
                style={{paddingLeft: 5}}
                color="gray"
              />
            ),
          }}
          name="QRCode"
          component={QRCodeScreen}
        />
        <Stack.Screen name="Entry" component={DataEntryScreen} />
        <Stack.Screen name="Bill" component={ReceiptBill} />
        <Stack.Screen name="Tab" component={Tab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
