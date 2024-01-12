// WebViewScreen.tsx
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { WebView } from 'react-native-webview';

function WebViewScreen({ route }) {
  const { receiptFile } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>View your receipt</Text>
      <WebView source={{ uri: receiptFile }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2d3748',
    margin: 10,
  },
});

export default WebViewScreen;
