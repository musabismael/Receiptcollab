import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

type CustomButtonProps = {
  onPress: () => void;
  label: string;
  size?: number;
  bgColor?: string;
  textColor?: string;
  borderRadius?: number;
  width?: number;
  height?: number;
};

const CustomButton = ({
  onPress,
  label,
  width = 50,
  height = 50,
  bgColor = '#EBF3F2',
  textColor = '#0A8E74',
  borderRadius = 5,
}: CustomButtonProps) => (
  <TouchableOpacity
    style={[
      styles.button,
      {
        backgroundColor: bgColor,
        width: width,
        height: height,
        borderRadius: borderRadius,
      },
    ]}
    onPress={onPress}>
    <Text style={[styles.text, {color: textColor}]}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  button: {
    margin: 5, // add this line
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  text: {
    fontSize: 16,
  },
});

export default CustomButton;
