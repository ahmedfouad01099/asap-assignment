import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Icon } from './Icon';
import { useTheme } from '../../context/ThemeContext';
import { SPACING, SHADOWS } from '../../theme';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: string;
  color?: string;
  style?: ViewStyle;
  testID?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ 
  label, 
  value, 
  icon, 
  color,
  style,
  testID
}) => {
  const { theme } = useTheme();

  return (
    <View 
      testID={testID}
      style={[
      styles.statCard, 
      { backgroundColor: theme.card, borderColor: theme.border },
      style
    ]}>
      <View style={styles.statHeader}>
        <Icon name={icon as any} color={color || theme.primary} size={20} />
        <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
          {label}
        </Text>
      </View>
      <Text style={[styles.statValue, { color: theme.text }]}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: SPACING.lg,
    borderWidth: 1,
    ...SHADOWS.sm,
  },
  statHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
