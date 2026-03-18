import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { SHADOWS } from '../../theme';

interface InvoiceSummaryProps {
  subtotal: number;
  vat: number;
  total: number;
}

export const InvoiceSummary: React.FC<InvoiceSummaryProps> = ({ subtotal, vat, total }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }, SHADOWS.sm]}>
      <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Invoice Summary</Text>
      <View style={styles.cardContent}>
        <View style={styles.summaryRow}>
          <Text style={{ color: theme.textSecondary }}>Subtotal</Text>
          <Text style={[styles.summaryValue, { color: theme.text }]}>${subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={{ color: theme.textSecondary }}>VAT (15%)</Text>
          <Text style={[styles.summaryValue, { color: theme.text }]}>${vat.toFixed(2)}</Text>
        </View>
        <View style={[styles.totalRow, { borderTopColor: theme.border }]}>
          <Text style={[styles.totalLabel, { color: theme.text }]}>Grand Total</Text>
          <Text style={[styles.totalValue, { color: theme.primary }]}>${total.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    gap: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  cardContent: {
    gap: 12,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryValue: {
    fontWeight: "bold",
  },
  totalRow: {
    paddingTop: 12,
    marginTop: 12,
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  totalValue: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
