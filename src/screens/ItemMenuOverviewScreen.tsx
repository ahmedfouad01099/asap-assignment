import React from "react";
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "../components/ui/Icon";
import { useTheme } from "../context/ThemeContext";
import { SPACING, SHADOWS } from "../theme";

export const ItemMenuOverviewScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { theme, isDark } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow_back_ios" color={theme.primary} size={24} />
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: theme.text }]}>
            Item Menu
          </Text>
        </View>
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
                <Text style={[styles.summaryValue, { color: "white" }]}>$12,450.00</Text>
              </View>
              <View style={[styles.summaryIconWrapper, { backgroundColor: "rgba(255, 255, 255, 0.2)" }]}>
                <Icon name="receipt_long" color="white" size={24} />
              </View>
            </View>
            <View style={[styles.summaryFooter, { borderTopColor: "rgba(255, 255, 255, 0.2)" }]}>
              <View style={styles.summaryStat}>
                <Text style={[styles.statLabel, { color: "rgba(255, 255, 255, 0.7)" }]}>Total Items</Text>
                <Text style={[styles.statValue, { color: "white" }]}>1,284</Text>
              </View>
              <View style={styles.summaryStat}>
                <Text style={[styles.statLabel, { color: "rgba(255, 255, 255, 0.7)" }]}>Low Stock</Text>
                <Text style={[styles.statValue, { color: "#fecaca" }]}>12 Items</Text>
              </View>
            </View>
          </View>
        </View>

        <Text style={[styles.sectionSubtitle, { color: theme.textSecondary }]}>
          Management Options
        </Text>

        {/* Menu Options */}
        <View style={styles.menuOptions}>
          {/* Add Item */}
          <TouchableOpacity 
            onPress={() => navigation.navigate('AddItem')}
            style={[styles.menuItem, { backgroundColor: theme.card, borderColor: theme.border }]}
          >
            <View style={[styles.menuIconWrapper, { backgroundColor: isDark ? 'rgba(19, 91, 236, 0.2)' : 'rgba(19, 91, 236, 0.1)' }]}>
              <Icon name="category" color={theme.primary} size={28} />
            </View>
            <View style={styles.menuContent}>
              <Text style={[styles.menuTitle, { color: theme.text }]}>Add Item</Text>
              <Text style={[styles.menuSubtitle, { color: theme.textSecondary }]}>Create a new inventory record</Text>
            </View>
            <Icon name="chevron_right" color={theme.textSecondary} size={24} />
          </TouchableOpacity>

          {/* Item List */}
          <TouchableOpacity 
            onPress={() => navigation.navigate('ItemList')}
            style={[styles.menuItem, { backgroundColor: theme.card, borderColor: theme.border }]}
          >
            <View style={[styles.menuIconWrapper, { backgroundColor: isDark ? 'rgba(19, 91, 236, 0.2)' : 'rgba(19, 91, 236, 0.1)' }]}>
              <Icon name="list_alt" color={theme.primary} size={28} />
            </View>
            <View style={styles.menuContent}>
              <Text style={[styles.menuTitle, { color: theme.text }]}>Item List</Text>
              <Text style={[styles.menuSubtitle, { color: theme.textSecondary }]}>View and edit all products</Text>
            </View>
            <Icon name="chevron_right" color={theme.textSecondary} size={24} />
          </TouchableOpacity>

          {/* Item Category */}
          <TouchableOpacity 
            onPress={() => navigation.navigate('ItemCategory')}
            style={[styles.menuItem, { backgroundColor: theme.card, borderColor: theme.border }]}
          >
            <View style={[styles.menuIconWrapper, { backgroundColor: isDark ? 'rgba(19, 91, 236, 0.2)' : 'rgba(19, 91, 236, 0.1)' }]}>
              <Icon name="category" color={theme.primary} size={28} />
            </View>
            <View style={styles.menuContent}>
              <Text style={[styles.menuTitle, { color: theme.text }]}>Item Category</Text>
              <Text style={[styles.menuSubtitle, { color: theme.textSecondary }]}>Organize items into groups</Text>
            </View>
            <Icon name="chevron_right" color={theme.textSecondary} size={24} />
          </TouchableOpacity>

          {/* Inventory Tracking */}
          <TouchableOpacity 
            onPress={() => navigation.navigate('Inventory')}
            style={[styles.menuItem, { backgroundColor: theme.card, borderColor: theme.border }]}
          >
            <View style={[styles.menuIconWrapper, { backgroundColor: isDark ? 'rgba(19, 91, 236, 0.2)' : 'rgba(19, 91, 236, 0.1)' }]}>
              <Icon name="inventory_2" color={theme.primary} size={28} />
            </View>
            <View style={styles.menuContent}>
              <View style={styles.titleRow}>
                <Text style={[styles.menuTitle, { color: theme.text }]}>Inventory</Text>
                <View style={[styles.badge, { backgroundColor: isDark ? '#334155' : '#f1f5f9' }]}>
                  <Text style={[styles.badgeText, { color: isDark ? '#cbd5e1' : '#475569' }]}>ACTIVE</Text>
                </View>
              </View>
              <Text style={[styles.menuSubtitle, { color: theme.textSecondary }]}>Stock tracking and movements</Text>
            </View>
            <Icon name="chevron_right" color={theme.textSecondary} size={24} />
          </TouchableOpacity>
        </View>

        {/* Sync Info */}
        <View style={[styles.syncBar, { backgroundColor: theme.card, borderColor: theme.border }]}>
          <View style={[styles.syncIndicator, { backgroundColor: "#22c55e" }]} />
          <Text style={[styles.syncText, { color: theme.textSecondary }]}>
            Database synced with SQLite: 2 mins ago
          </Text>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={[styles.bottomNav, { backgroundColor: theme.card, borderTopColor: theme.border }]}>
        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')} style={styles.navItem}>
          <Icon name="home" color={theme.textSecondary} size={24} />
          <Text style={[styles.navText, { color: theme.textSecondary }]}>Dashboard</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="inventory_2" color={theme.primary} size={24} />
          <Text style={[styles.navText, { color: theme.primary }]}>Items</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="shopping_cart" color={theme.textSecondary} size={24} />
          <Text style={[styles.navText, { color: theme.textSecondary }]}>Sales</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="person" color={theme.textSecondary} size={24} />
          <Text style={[styles.navText, { color: theme.textSecondary }]}>Profile</Text>
        </TouchableOpacity>
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
    paddingBottom: 100,
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
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    gap: 16,
  },
  menuIconWrapper: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  menuSubtitle: {
    fontSize: 12,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    flexDirection: "row",
    paddingHorizontal: SPACING.lg,
    paddingBottom: 32,
    paddingTop: 8,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  navText: {
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
});
