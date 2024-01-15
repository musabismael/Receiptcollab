import React, { useEffect } from 'react'
import { View, Text, Image, StyleSheet, Animated } from 'react-native'

const SplashScreen = ({ navigation }) => {
  const fadeAnim = new Animated.Value(0) // Initial value for opacity: 0

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Home')
    }, 3000) // 5000ms = 5 seconds

    // Clean up the timer on component unmount
    return () => clearTimeout(timer)
  }, [navigation])

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true, // Add this line
      }
    ).start()
  }, [fadeAnim])

  return (
    <View style={styles.container}>
      <Animated.View style={{ ...styles.logoContainer, opacity: fadeAnim }}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.text}>Receiptcollab</Text>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },

  logoContainer: {
    alignItems: 'center',
  },

  logo: {
    width: 200,
    height: 200,
  },

  text: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    fontStyle: 'normal',
    fontFamily: 'Inter',
    color: '#324E47',
  },
})

export default SplashScreen