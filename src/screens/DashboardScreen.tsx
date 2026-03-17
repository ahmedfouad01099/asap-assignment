import React from "react";
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Icon } from "../components/ui/Icon";
import { useTheme } from "../context/ThemeContext";
import { SPACING, SHADOWS } from "../theme";
import { useItemCountDB, useCustomerCountDB, useInvoiceDB } from "../database/hooks";
import { useFocusEffect } from "@react-navigation/native";

export const DashboardScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { theme, isDark } = useTheme();
  const { getItemsCount } = useItemCountDB();
  const { getCustomersCount } = useCustomerCountDB();
  const { getInvoicesCount } = useInvoiceDB();

  const [stats, setStats] = React.useState({ items: 0, customers: 0, invoices: 0 });

  useFocusEffect(
    React.useCallback(() => {
      const fetchStats = async () => {
        try {
          const [items, customers, invoices] = await Promise.all([
            getItemsCount(),
            getCustomersCount(),
            getInvoicesCount(),
          ]);
          setStats({ items, customers, invoices });
        } catch (err) {
          console.error("Fetch stats error:", err);
        }
      };
      fetchStats();
    }, [getItemsCount, getCustomersCount, getInvoicesCount])
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.headerButton}>
          <Icon name="menu" color={theme.text} size={24} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Dashboard Home
        </Text>
        <TouchableOpacity style={styles.headerButton}>
          <Icon name="notifications" color={theme.text} size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.statsRow}>
            {/* Items Stat */}
            <View style={[styles.statCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
              <View style={styles.statHeader}>
                <Icon name="inventory_2" color={theme.primary} size={20} />
                <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                  Items
                </Text>
              </View>
              <Text style={[styles.statValue, { color: theme.text }]}>{stats.items.toLocaleString()}</Text>
            </View>

            {/* Invoices Stat */}
            <View style={[styles.statCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
              <View style={styles.statHeader}>
                <Icon name="receipt_long" color={theme.primary} size={20} />
                <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                  Invoices
                </Text>
              </View>
              <Text style={[styles.statValue, { color: theme.text }]}>{stats.invoices.toLocaleString()}</Text>
            </View>
          </View>

          {/* Customers Stat */}
          <View style={[styles.statCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <View style={styles.statHeader}>
              <Icon name="group" color={theme.primary} size={20} />
              <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
                Total Customers
              </Text>
            </View>
            <Text style={[styles.statValue, { color: theme.text }]}>{stats.customers.toLocaleString()}</Text>
          </View>
        </View>

        {/* Quick Navigation */}
        <View style={styles.quickNavSection}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Quick Navigation
          </Text>
          
          <View style={styles.quickNavGrid}>
            {/* Item Menu */}
            <TouchableOpacity 
              onPress={() => navigation.navigate('ItemMenu')}
              style={[styles.primaryActionCard, SHADOWS.primary, { backgroundColor: theme.primary }]}
            >
              <View style={styles.cardContent}>
                <View style={[styles.primaryIconWrapper, { backgroundColor: 'rgba(255, 255, 255, 0.2)' }]}>
                  <Icon name="category" color="white" size={24} />
                </View>
                <View>
                  <Text style={[styles.primaryActionTitle, { color: "white" }]}>Item Menu</Text>
                  <Text style={[styles.primaryActionSubtitle, { color: "rgba(255, 255, 255, 0.8)" }]}>Manage stocks & categories</Text>
                </View>
              </View>
              <Icon name="chevron_right" color="white" size={24} />
            </TouchableOpacity>

            {/* Transaction Menu */}
            <TouchableOpacity 
              onPress={() => navigation.navigate('SaleInvoiceList')}
              style={[styles.secondaryActionCard, { backgroundColor: theme.card, borderColor: theme.border }]}
            >
              <View style={styles.cardContent}>
                <View style={[styles.secondaryIconWrapper, { backgroundColor: isDark ? 'rgba(19, 91, 236, 0.2)' : 'rgba(19, 91, 236, 0.1)' }]}>
                  <Icon name="point_of_sale" color={theme.primary} size={24} />
                </View>
                <View>
                  <Text style={[styles.secondaryActionTitle, { color: theme.text }]}>Transaction Menu</Text>
                  <Text style={[styles.secondaryActionSubtitle, { color: theme.textSecondary }]}>Invoices & sales history</Text>
                </View>
              </View>
              <Icon name="chevron_right" color={theme.textSecondary} size={24} />
            </TouchableOpacity>

            {/* Customer Management */}
            <TouchableOpacity 
              onPress={() => navigation.navigate('Customers')}
              style={[styles.secondaryActionCard, { backgroundColor: theme.card, borderColor: theme.border }]}
            >
              <View style={styles.cardContent}>
                <View style={[styles.secondaryIconWrapper, { backgroundColor: isDark ? 'rgba(19, 91, 236, 0.2)' : 'rgba(19, 91, 236, 0.1)' }]}>
                  <Icon name="group" color={theme.primary} size={24} />
                </View>
                <View>
                  <Text style={[styles.secondaryActionTitle, { color: theme.text }]}>Customer Management</Text>
                  <Text style={[styles.secondaryActionSubtitle, { color: theme.textSecondary }]}>Directory & active profiles</Text>
                </View>
              </View>
              <Icon name="chevron_right" color={theme.textSecondary} size={24} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Inventory Report Banner */}
        <View style={styles.bannerSection}>
          <View style={styles.bannerContainer}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9PKbbuFxsbg3WTeEfi0ZgXD0omNXQvbjq4J_BoC8MwtCbK1tXLx2VevyBAU_-s-vf5d1nl7FYIVez88sNfETBLlI4TxoQASK6_fXu-_QjlqwdGSNcaDTCJTbt_lYlq1vxqIwA_OczxMTSup3WLy-4L-_93VhLbf89vspUYlgpusucuZ0knih5LV4mvBySS7GkFs82xgSkzmx8YfD3yUW6xyjqvbbJO65cGWcHOJ6m7vF-VBmTPo12V1VwRbs11fHGl2VwdZZk11BH' }}
              style={styles.bannerImage}
            />
            <View style={[styles.bannerOverlay, { backgroundColor: 'rgba(19, 91, 236, 0.8)' }]}>
              <Text style={styles.bannerLabel}>Inventory Check</Text>
              <Text style={styles.bannerText}>Run daily report</Text>
            </View>
          </View>
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
    paddingBottom: SPACING.sm,
    borderBottomWidth: 1,
    justifyContent: "space-between",
  },
  headerButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  statsSection: {
    padding: SPACING.lg,
    gap: 16,
  },
  statsRow: {
    flexDirection: "row",
    gap: 16,
  },
  statCard: {
    flex: 1,
    borderRadius: 16,
    padding: SPACING.lg,
    borderWidth: 1,
    ...SHADOWS.sm,
  },
  statHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
  },
  quickNavSection: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  quickNavGrid: {
    gap: 16,
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  primaryActionCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderRadius: 16,
  },
  primaryIconWrapper: {
    padding: 8,
    borderRadius: 12,
  },
  primaryActionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  primaryActionSubtitle: {
    fontSize: 14,
  },
  secondaryActionCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    ...SHADOWS.sm,
  },
  secondaryIconWrapper: {
    padding: 8,
    borderRadius: 12,
  },
  secondaryActionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  secondaryActionSubtitle: {
    fontSize: 14,
  },
  bannerSection: {
    padding: SPACING.lg,
  },
  bannerContainer: {
    borderRadius: 16,
    overflow: "hidden",
    height: 128,
    position: "relative",
  },
  bannerImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
    height: "100%",
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    padding: SPACING.xl,
    justifyContent: "center",
  },
  bannerLabel: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 14,
    fontWeight: "500",
  },
  bannerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});
