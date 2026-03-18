import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { SHADOWS } from '../../theme';

interface InvoiceItemProps {
  item: {
    invoice_number: string;
    customer_name?: string;
    date: string | number | Date;
    total: number;
  };
  onPress?: () => void;
}

export const InvoiceItem: React.FC<InvoiceItemProps> = ({ item, onPress }) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity 
      onPress={onPress}
      style={[styles.invoiceCard, { backgroundColor: theme.card, borderColor: theme.border }]}
    >
      <View style={styles.invoiceInfo}>
        <Text style={[styles.invoiceNumber, { color: theme.text }]}>{item.invoice_number}</Text>
        <Text style={[styles.customerName, { color: theme.textSecondary }]}>{item.customer_name || "Guest"}</Text>
        <Text style={[styles.invoiceDate, { color: theme.textSecondary }]}>{new Date(item.date).toLocaleDateString()}</Text>
      </View>
      <View style={styles.invoiceRight}>
        <Text style={[styles.invoiceTotal, { color: theme.primary }]}>${item.total.toFixed(2)}</Text>
        <View style={[styles.paidBadge, { backgroundColor: `${theme.success}15` }]}>
          <Text style={[styles.paidText, { color: theme.success }]}>PAID</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  invoiceCard: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "space-between",
    ...SHADOWS.sm,
  },
  invoiceInfo: {
    flex: 1,
  },
  invoiceNumber: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 2,
  },
  customerName: {
    fontSize: 14,
    marginBottom: 2,
  },
  invoiceDate: {
    fontSize: 12,
  },
  invoiceRight: {
    alignItems: "flex-end",
  },
  invoiceTotal: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  paidBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 99,
  },
  paidText: {
    fontSize: 10,
    fontWeight: "bold",
  },
});
