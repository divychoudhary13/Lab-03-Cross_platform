import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Colors, Fonts, Spacing, GlobalStyles } from '../../styles/globalStyles';

const CustomButton = ({ title, onPress, loading = false, disabled = false, style }) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabledButton, style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={title}
    >
      {loading ? (
        <ActivityIndicator color={Colors.text.light} />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    ...GlobalStyles.button,
  },
  buttonText: {
    ...GlobalStyles.buttonText,
  },
  disabledButton: {
    backgroundColor: '#95a5a6',
  },
});

export default CustomButton;