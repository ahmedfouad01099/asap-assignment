import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from './Icon';
import { useTheme } from '../../context/ThemeContext';
import { SHADOWS } from '../../theme';

interface ActionCardProps {
  title: string;
  subtitle: string;
  icon: string;
  onPress: () => void;
  variant?: 'primary' | 'outline';
  badge?: string;
}

export const ActionCard: React.FC<ActionCardProps> = ({ 
  title, 
  subtitle, 
  icon, 
  onPress, 
  variant = 'outline',
  badge 
}) => {
  const { theme, isDark } = useTheme();
  const isPrimary = variant === 'primary';

  return (
    <TouchableOpacity 
      onPress={onPress}
      style={[
        styles.card,
        isPrimary ? [styles.primaryCard, { backgroundColor: theme.primary }, SHADOWS.primary] : [styles.outlineCard, { backgroundColor: theme.card, borderColor: theme.border }],
      ]}
    >
      <View style={styles.content}>
        <View style={[
          styles.iconWrapper, 
          { backgroundColor: isPrimary ? 'rgba(255, 255, 255, 0.2)' : (isDark ? 'rgba(19, 91, 236, 0.2)' : 'rgba(19, 91, 236, 0.1)') }
        ]}>
          <Icon name={icon as any} color={isPrimary ? 'white' : theme.primary} size={24} />
        </View>
        <View>
          <View style={styles.titleRow}>
            <Text style={[styles.title, { color: isPrimary ? 'white' : theme.text }]}>{title}</Text>
            {badge && (
              <View style={[styles.badge, { backgroundColor: isPrimary ? 'rgba(255, 255, 255, 0.2)' : (isDark ? '#334155' : '#f1f5f9') }]}>
                <Text style={[styles.badgeText, { color: isPrimary ? 'white' : (isDark ? '#cbd5e1' : '#475569') }]}>{badge}</Text>
              </View>
            )}
          </View>
          <Text style={[styles.subtitle, { color: isPrimary ? 'rgba(255, 255, 255, 0.8)' : theme.textSecondary }]}>
            {subtitle}
          </Text>
        </View>
      </View>
      <Icon name="chevron_right" color={isPrimary ? 'white' : theme.textSecondary} size={24} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderRadius: 16,
  },
  primaryCard: {
    // shadow applied via prop
  },
  outlineCard: {
    borderWidth: 1,
    ...SHADOWS.sm,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  iconWrapper: {
    padding: 8,
    borderRadius: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 4,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 99,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: "bold",
  },
});
