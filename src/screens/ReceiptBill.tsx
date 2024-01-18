import React from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import WebView from 'react-native-webview'

const ReceiptBillScreen = ({ route, navigation }) => {
  const { qrCodeData } = route.params
  console.log(qrCodeData)
  const html = `
    <html>
      <head>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
          body {
            font-family: 'Roboto', sans-serif;
            font-size: 24px;
            line-height: 1.5;
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 5rem;
            background-color: #f5f5f5;
          }
          h1 {
            font-weight: 700;
            font-size: 3.5rem;
            margin-bottom: 1rem;
            color: #3f51b5;
          }
          p {
            margin-bottom: 0.5rem;
            color: #333;
          }
          .total {
            font-weight: 700;
            font-size: 2.5rem;
            color: #f44336;
          }
        </style>
      </head>
      <body>
        <h1>Receipt</h1>
        <p>Thank you for your purchase!</p>
        <p>Order Number: ${qrCodeData.newReceiptId}</p>
        <p>Date:${qrCodeData.billDate}</p>
        <p class="total">Total: $${qrCodeData.resultAmount}</p>
        <button id="close-button" style="display:none;">Close</button>
      </body>
    </html>
  `

  const onMessage = (event) => {
    if (event.nativeEvent.data === 'close') {
      navigation.goBack()
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <WebView
        originWhitelist={['*']}
        source={{ html }}
        style={{ flex: 1 }}
        onMessage={onMessage}
        injectedJavaScript={`
          document.getElementById('close-button').addEventListener('click', function() {
            window.ReactNativeWebView.postMessage('close');
          });
        `}
      />
      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 20,
          right: 20,
          backgroundColor: '#3f51b5',
          padding: 10,
          borderRadius: 5,
        }}
        onPress={() => navigation.goBack()}
      >
        <Text style={{ color: '#fff' }}>Close</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ReceiptBillScreen