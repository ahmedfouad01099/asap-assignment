import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "../components/ui/Icon";
import { InvoiceItem } from "../components/Invoice/InvoiceItem";
import { StatCard } from "../components/ui/StatCard";
import { useTheme } from "../context/ThemeContext";
import { SPACING, SHADOWS } from "../theme";
import { useSaleInvoiceList } from "../hooks/useSaleInvoiceList";

export const SaleInvoiceListScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { theme } = useTheme();
  const { invoices, isLoading } = useSaleInvoiceList();

  const renderItem = ({ item }: { item: any }) => (
    <InvoiceItem 
      item={item}
      onPress={() => {/* In the future, navigate to invoice detail */}}
    />
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Sales Invoices</Text>
        <TouchableOpacity 
          testID="btn-add-invoice-header"
          onPress={() => navigation.navigate("CreateInvoice")} 
          style={styles.addButton}
        >
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
