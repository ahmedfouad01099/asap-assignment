import React from "react";
import { View, Text, FlatList, SafeAreaView, TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "../components/ui/Icon";
import { StatCard } from "../components/ui/StatCard";
import { useTheme } from "../context/ThemeContext";
import { SPACING, SHADOWS } from "../theme";
import { useSaleInvoiceList } from "../hooks/useSaleInvoiceList";

export const SaleInvoiceListScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { theme } = useTheme();
  const { invoices, isLoading } = useSaleInvoiceList();

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
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

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Sales Invoices</Text>
        <TouchableOpacity onPress={() => navigation.navigate('CreateInvoice')} style={styles.addButton}>
          <Icon name="add" color={theme.primary} size={24} />
        </TouchableOpacity>
      </View>

      <View style={{ padding: SPACING.lg, paddingBottom: 0 }}>
        <StatCard 
          label="Total Invoices"
          value={invoices.length}
          icon="receipt_long"
        />
      </View>

      <FlatList
        data={invoices}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="receipt_long" color={theme.textSecondary} size={48} />
            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
              {isLoading ? "Loading invoices..." : "No invoices found"}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.lg,
    paddingBottom: SPACING.sm,
    borderBottomWidth: 1,
    justifyContent: "space-between",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  addButton: {
    padding: 8,
  },
  listContent: {
    padding: SPACING.lg,
    gap: 12,
  },
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
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
    gap: 16,
  },
  emptyText: {
    fontSize: 16,
  },
});
