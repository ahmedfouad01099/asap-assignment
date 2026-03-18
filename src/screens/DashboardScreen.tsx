import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "../components/ui/Icon";
import { StatCard } from "../components/ui/StatCard";
import { ActionCard } from "../components/ui/ActionCard";
import { useTheme } from "../context/ThemeContext";
import { useDashboard } from "../hooks/useDashboard";
import { SPACING, SHADOWS } from "../theme";

export const DashboardScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { theme, isDark } = useTheme();
  const { user, stats, handleLogout, getFirstName } = useDashboard(navigation);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={handleLogout} style={styles.headerButton}>
          <Icon name="login" color={theme.text} size={24} />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={[styles.headerTitle, { color: theme.text }]}>
            Hey, {getFirstName()} 👋
          </Text>
          <Text style={{ fontSize: 10, color: theme.textSecondary }}>StockSync Pro Dashboard</Text>
        </View>
        <TouchableOpacity style={styles.headerButton}>
          <Icon name="notifications" color={theme.text} size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.statsRow}>
            <StatCard 
              testID="dashboard-items-stat"
              label="Items"
              value={stats.items}
              icon="inventory_2"
            />
            <StatCard 
              testID="dashboard-invoices-stat"
              label="Invoices"
              value={stats.invoices}
              icon="receipt_long"
            />
          </View>

          <StatCard 
            testID="dashboard-customers-stat"
            label="Total Customers"
            value={stats.customers}
            icon="group"
          />
        </View>

        {/* Quick Navigation */}
        <View style={styles.quickNavSection}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Quick Navigation
          </Text>
          
          <View style={styles.quickNavGrid}>
            <ActionCard 
              testID="nav-item-menu"
              title="Item Menu"
              subtitle="Manage stocks & categories"
              icon="category"
              variant="primary"
              onPress={() => navigation.navigate('ItemMenu')}
            />

            <ActionCard 
              testID="nav-transaction-menu"
              title="Transaction Menu"
              subtitle="Invoices & sales history"
              icon="point_of_sale"
              onPress={() => navigation.navigate('SaleInvoiceList')}
            />

            <ActionCard 
              testID="nav-customer-management"
              title="Customer Management"
              subtitle="Directory & active profiles"
              icon="group"
              onPress={() => navigation.navigate('Customers')}
            />
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
