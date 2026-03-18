import React from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "../components/ui/Icon";
import { ActionCard } from "../components/ui/ActionCard";
import { useTheme } from "../context/ThemeContext";
import { SPACING, SHADOWS } from "../theme";
import { useItemDB } from "../database/hooks";
import { useFocusEffect } from "@react-navigation/native";

export const ItemMenuOverviewScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { theme, isDark } = useTheme();
  const { getInventorySummary } = useItemDB();

  const [summary, setSummary] = React.useState({ total_value: 0, total_items: 0, low_stock: 0 });

  useFocusEffect(
    React.useCallback(() => {
      const fetchSummary = async () => {
        const data = await getInventorySummary();
        setSummary(data || { total_value: 0, total_items: 0, low_stock: 0 });
      };
      fetchSummary();
    }, [getInventorySummary])
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        <TouchableOpacity 
          testID="btn-back"
          onPress={() => navigation.goBack()} 
          style={styles.backButton}
        >
          <Icon name="arrow_back_ios" color={theme.text} size={20} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Item Menu
        </Text>
        <TouchableOpacity style={styles.headerButton}>
          <Icon name="list_alt" color={theme.textSecondary} size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Inventory Summary Card */}
        <View style={styles.summarySection}>
          <View style={[styles.summaryCard, SHADOWS.primary, { backgroundColor: theme.primary }]}>
            <View style={styles.summaryHeader}>
              <View>
                <Text style={[styles.summaryLabel, { color: "rgba(255, 255, 255, 0.8)" }]}>Total Inventory Value</Text>
                <Text style={[styles.summaryValue, { color: "white" }]}>${(summary.total_value || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</Text>
              </View>
              <View style={[styles.summaryIconWrapper, { backgroundColor: "rgba(255, 255, 255, 0.2)" }]}>
                <Icon name="receipt_long" color="white" size={24} />
              </View>
            </View>
            <View style={[styles.summaryFooter, { borderTopColor: "rgba(255, 255, 255, 0.2)" }]}>
              <View style={styles.summaryStat}>
                <Text style={[styles.statLabel, { color: "rgba(255, 255, 255, 0.7)" }]}>Total Items</Text>
                <Text style={[styles.statValue, { color: "white" }]}>{(summary.total_items || 0).toLocaleString()}</Text>
              </View>
              <View style={styles.summaryStat}>
                <Text style={[styles.statLabel, { color: "rgba(255, 255, 255, 0.7)" }]}>Low Stock</Text>
                <Text style={[styles.statValue, { color: theme.danger }]}>{summary.low_stock} Items</Text>
              </View>
            </View>
          </View>
        </View>

        <Text style={[styles.sectionSubtitle, { color: theme.textSecondary }]}>
          Management Options
        </Text>

        {/* Menu Options */}
        <View style={styles.menuOptions}>
          <ActionCard 
            testID="btn-item-menu-add"
            title="Add Item"
            subtitle="Create a new inventory record"
            icon="add_circle_outline"
            onPress={() => navigation.navigate('AddItem')}
          />

          <ActionCard 
            testID="btn-item-menu-list"
            title="Item List"
            subtitle="View and edit all products"
            icon="list_alt"
            onPress={() => navigation.navigate('ItemList')}
          />

          <ActionCard 
            testID="btn-item-menu-category"
            title="Item Category"
            subtitle="Organize items into groups"
            icon="category"
            onPress={() => navigation.navigate('ItemCategory')}
          />

          <ActionCard 
            testID="btn-item-menu-inventory"
            title="Inventory"
            subtitle="Stock tracking and movements"
            icon="inventory_2"
            badge="ACTIVE"
            onPress={() => navigation.navigate('Inventory')}
          />
        </View>

        {/* Sync Info */}
        <View style={[styles.syncBar, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={[styles.syncIndicator, { backgroundColor: theme.success }]} />
          <Text style={[styles.syncText, { color: theme.textSecondary }]}>
            Database synced with SQLite: 2 mins ago
          </Text>
        </View>
      </ScrollView>
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
    borderBottomWidth: 1,
    justifyContent: "space-between",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: -0.5,
  },
  headerButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  summarySection: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
    paddingBottom: SPACING.sm,
  },
  summaryCard: {
    padding: 20,
    borderRadius: 20,
  },
  summaryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  summaryLabel: {
    fontSize: 14,
    fontWeight: "500",
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: "bold",
  },
  summaryIconWrapper: {
    padding: 8,
    borderRadius: 12,
  },
  summaryFooter: {
    flexDirection: "row",
    paddingTop: 16,
    borderTopWidth: 1,
  },
  summaryStat: {
    flex: 1,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sectionSubtitle: {
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
    paddingHorizontal: 24,
    paddingBottom: 8,
    paddingTop: 24,
  },
  menuOptions: {
    paddingHorizontal: SPACING.lg,
    gap: 12,
  },
  syncBar: {
    marginHorizontal: SPACING.lg,
    marginBottom: 24,
    marginTop: 32,
    padding: 16,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    borderWidth: 1,
  },
  syncIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  syncText: {
    fontSize: 12,
    fontWeight: "500",
  },
});
