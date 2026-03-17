import React, { useMemo } from "react";
import { 
  View, 
  Text, 
  FlatList, 
  SafeAreaView, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView 
} from "react-native";
import { Icon } from "../components/ui/Icon";
import { StatCard } from "../components/ui/StatCard";
import { useTheme } from "../context/ThemeContext";
import { SPACING, SHADOWS } from "../theme";
import { useInventory } from "../hooks/useInventory";

export const InventoryScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { theme } = useTheme();
  const { items, isLoading, stats, getStockStatus } = useInventory();

  const renderItem = ({ item }: { item: any }) => {
    const qty = item.quantity || 0;
    const { label, color } = getStockStatus(qty);

    return (
      <View style={[styles.itemRow, { backgroundColor: theme.card, borderColor: theme.border }]}>
        <View style={styles.itemMain}>
          <Text style={[styles.itemName, { color: theme.text }]}>{item.name}</Text>
          <Text style={[styles.itemCategory, { color: theme.textSecondary }]}>{item.category_name || "General"}</Text>
        </View>
        
        <View style={styles.stockInfo}>
          <View style={[styles.statusBadge, { backgroundColor: `${color}15`, borderColor: `${color}30` }]}>
            <Text style={[styles.statusText, { color }]}>{label}</Text>
          </View>
          <Text style={[styles.qtyText, { color: theme.text }]}>{qty.toLocaleString()}</Text>
          <Text style={[styles.unitText, { color: theme.textSecondary }]}>units</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow_back" color={theme.text} size={24} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Stock Inventory</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AddItem')} style={styles.headerButton}>
          <Icon name="add" color={theme.primary} size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        {/* Quick Summary */}
        <View style={styles.summaryGrid}>
          <StatCard 
            label="Total Units"
            value={stats.totalQty}
            icon="inventory_2"
            style={styles.summaryCard}
          />
          <StatCard 
            label="Low/Out"
            value={stats.lowStock + stats.outOfStock}
            icon="warning"
            color={theme.danger}
            style={styles.summaryCard}
          />
        </View>

        <View style={styles.listHeader}>
          <Text style={[styles.listSubtitle, { color: theme.textSecondary }]}>Item Name</Text>
          <Text style={[styles.listSubtitle, { color: theme.textSecondary }]}>Available Stock</Text>
        </View>

        <FlatList
          data={items}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          initialNumToRender={10}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Icon name="inventory" color={theme.textSecondary} size={48} />
              <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
                {isLoading ? "Loading inventory..." : "Your warehouse is empty."}
              </Text>
            </View>
          }
        />
      </View>
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
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    justifyContent: "space-between",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: -0.5,
  },
  headerButton: {
    padding: 8,
  },
  container: {
    flex: 1,
  },
  summaryGrid: {
    flexDirection: "row",
    padding: SPACING.lg,
    gap: 12,
  },
  summaryCard: {
    flex: 1,
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  listSubtitle: {
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  listContent: {
    padding: SPACING.lg,
    paddingTop: 12,
    gap: 8,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    ...SHADOWS.sm,
  },
  itemMain: {
    flex: 1,
    marginRight: 16,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  itemCategory: {
    fontSize: 12,
  },
  stockInfo: {
    alignItems: "flex-end",
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 99,
    borderWidth: 1,
    marginBottom: 6,
  },
  statusText: {
    fontSize: 10,
    fontWeight: "bold",
  },
  qtyText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  unitText: {
    fontSize: 10,
    marginTop: -2,
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
