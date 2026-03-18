import React from "react";
import { TouchableOpacity, Text, View, ActivityIndicator, StyleSheet, ViewStyle, TextStyle } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { SPACING, SHADOWS } from "../../theme";

interface ButtonProps {
  label: string;
  onPress?: () => void;
  variant?: "primary" | "secondary" | "outline";
  icon?: React.ReactNode;
  loading?: boolean;
  style?: ViewStyle;
  disabled?: boolean;
  testID?: string;
  accessibilityLabel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onPress,
  variant = "primary",
  icon,
  loading = false,
  style,
  disabled = false,
  testID,
  accessibilityLabel,
}) => {
  const { theme } = useTheme();

  const getVariantStyle = (): ViewStyle => {
    switch (variant) {
      case "primary":
        return {
          backgroundColor: theme.primary,
          ...SHADOWS.primary,
        };
      case "secondary":
        return {
          backgroundColor: theme.card,
        };
      case "outline":
        return {
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: theme.border,
        };
      default:
        return {
          backgroundColor: theme.primary,
        };
    }
  };

  const getTextStyle = (): TextStyle => {
    switch (variant) {
      case "primary":
        return {
          color: "#ffffff",
        };
      case "secondary":
      case "outline":
        return {
          color: theme.text,
        };
      default:
        return {
          color: "#ffffff",
        };
    }
  };

  return (
    <TouchableOpacity
      testID={testID}
      accessibilityLabel={accessibilityLabel}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      style={[
        styles.base,
        getVariantStyle(),
        disabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variant === "primary" ? "#ffffff" : theme.primary} />
      ) : (
        <View style={styles.content}>
          <Text style={[styles.text, getTextStyle()]}>
            {label}
          </Text>
          {icon && <View style={styles.iconContainer}>{icon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: SPACING.lg,
    paddingHorizontal: SPACING.xl,
    borderRadius: 12,
  },
  disabled: {
    opacity: 0.5,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  iconContainer: {
    marginLeft: SPACING.sm,
  },
});
