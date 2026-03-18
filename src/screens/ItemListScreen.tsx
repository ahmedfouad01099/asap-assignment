import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "../components/ui/Icon";
import { StatCard } from "../components/ui/StatCard";
import { useTheme } from "../context/ThemeContext";
import { SPACING, SHADOWS } from "../theme";
import { useItemList } from "../hooks/useItemList";

export const ItemListScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { theme } = useTheme();
  const { items, isLoading } = useItemList();

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      testID={`item-card-${item.name}`}
      style={[styles.itemCard, { backgroundColor: theme.card, borderColor: theme.border }]}
    >
      <View style={styles.itemInfo}>
        <Text 
          testID={`item-name-${item.name}`}
          style={[styles.itemName, { color: theme.text }]}
        >
          {item.name}
        </Text>
        <Text style={[styles.itemCategory, { color: theme.textSecondary }]}>{item.category_name || "No Category"}</Text>
      </View>
      <View style={styles.itemRight}>
        <Text style={[styles.itemPrice, { color: theme.primary }]}>${item.price.toFixed(2)}</Text>
        <View style={[styles.stockBadge, { backgroundColor: item.quantity < 10 ? `${theme.danger}15` : `${theme.success}15` }]}>
          <Text style={[styles.stockText, { color: item.quantity < 10 ? theme.danger : theme.success }]}>
            {item.quantity} in stock
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow_back_ios" color={theme.text} size={20} />
        </TouchableOpacity>
        <Text 
          testID="header-item-list"
          style={[styles.headerTitle, { color: theme.text }]}
        >
          Item List
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('AddItem')} style={styles.addButton}>
          <Icon name="add" color={theme.primary} size={24} />
        </TouchableOpacity>
      </View>

      <View style={{ padding: SPACING.lg, paddingBottom: 0 }}>
        <StatCard
          label="Total Products"
          value={items.length}
          icon="inventory_2"
        />
      </View>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="inventory_2" color={theme.textSecondary} size={48} />
            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
              {isLoading ? "Loading items..." : "No items found"}
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
  itemCard: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "space-between",
    ...SHADOWS.sm,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  itemCategory: {
    fontSize: 12,
  },
  itemRight: {
    alignItems: "flex-end",
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  stockBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 99,
  },
  stockText: {
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
