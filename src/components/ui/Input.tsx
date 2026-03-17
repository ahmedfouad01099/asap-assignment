import React from "react";
import { View, Text, TextInput, type TextInputProps, StyleSheet, ViewStyle } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { SPACING } from "../../theme";

interface InputProps extends TextInputProps {
  label: string;
  icon?: React.ReactNode;
  error?: string;
  containerStyle?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({
  label,
  icon,
  error,
  containerStyle,
  ...props
}) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.label, { color: theme.textSecondary }]}>
        {label}
      </Text>
      <View style={[
        styles.inputContainer,
        { 
          backgroundColor: theme.background,
          borderColor: theme.border,
        }
      ]}>
        {icon && <View style={styles.iconWrapper}>{icon}</View>}
        <TextInput
          placeholderTextColor={theme.textSecondary}
          style={[styles.input, { color: theme.text }]}
          {...props}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
  },
  inputContainer: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 12,
    height: 56,
    overflow: "hidden",
    paddingHorizontal: SPACING.lg,
  },
  iconWrapper: {
    marginRight: SPACING.md,
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: "400",
    height: "100%",
  },
  errorText: {
    color: "#ef4444", // rose-500
    fontSize: 12,
    marginTop: 4,
  },
});
