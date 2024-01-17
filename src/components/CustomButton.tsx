import React, {useState} from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

interface CustomButtonProps {
  label: string;
  width?: number;
  height?: number;
  borderRadius?: number;
  onPress: () => void;
  textColor?: string;
  bgColor?: string;
  selected?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  label,
  width = 60,
  height = 40,
  borderRadius = 10,
  onPress,
  textColor = '#0A8E74',
  bgColor = '#EBF3F2',
  selected = false,
}) => {
  const buttonStyle = {
    width,
    backgroundColor: selected ? '#2A393C' : bgColor,
    borderRadius: borderRadius,
    paddingBottom: 5,
    height: height,
    paddingVertical: 10,
    alignItems: 'center',
  };

  const textStyle = {
    color: selected ? '#FFFFFF' : textColor,
  };

  return (
    <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onPress}>
      <Text style={[styles.buttonText, textStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    marginHorizontal: 5,
    borderColor: '#0A8E74',
  },
  buttonText: {
    fontSize: 16,
  },
});

export default CustomButton;
