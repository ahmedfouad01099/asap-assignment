import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Icon } from '../ui/Icon';
import { useTheme } from '../../context/ThemeContext';

interface LineItemProps {
  name: string;
  quantity: number;
  price: number;
  onRemove: () => void;
}

export const LineItem: React.FC<LineItemProps> = ({ name, quantity, price, onRemove }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { borderBottomColor: theme.border }]}>
      <View style={{ flex: 1 }}>
        <Text style={{ color: theme.text, fontWeight: 'bold' }}>{name}</Text>
        <Text style={{ color: theme.textSecondary, fontSize: 12 }}>
          {quantity} x ${price.toFixed(2)}
        </Text>
      </View>
      <Text style={{ color: theme.text, fontWeight: 'bold' }}>
        ${(quantity * price).toFixed(2)}
      </Text>
      <TouchableOpacity onPress={onRemove} style={{ marginLeft: 12 }}>
        <Icon name="delete_outline" color={theme.danger} size={20} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});
