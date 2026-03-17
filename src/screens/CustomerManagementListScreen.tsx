import React from "react";
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { Icon } from "../components/ui/Icon";
import { useTheme } from "../context/ThemeContext";
import { SPACING, SHADOWS } from "../theme";

const CustomerItem: React.FC<{
  initials: string;
  name: string;
  email: string;
  phone: string;
  bgColor: string;
  textColor: string;
  opacity?: number;
}> = ({ initials, name, email, phone, bgColor, textColor, opacity = 1 }) => {
  const { theme } = useTheme();
  
  return (
    <View 
      style={[
        styles.customerCard, 
        { opacity, backgroundColor: theme.card, borderColor: theme.border },
        SHADOWS.sm
      ]}
    >
      <View 
        style={[styles.avatar, { backgroundColor: bgColor }]}
      >
        <Text style={[styles.avatarText, { color: textColor }]}>{initials}</Text>
      </View>
      <View style={styles.customerInfo}>
        <Text style={[styles.customerName, { color: theme.text }]} numberOfLines={1}>{name}</Text>
        <View style={styles.contactRow}>
          <Icon name="mail" color={theme.textSecondary} size={14} />
          <Text style={[styles.contactText, { color: theme.textSecondary }]} numberOfLines={1}>{email}</Text>
        </View>
        <View style={styles.contactRow}>
          <Icon name="call" color={theme.textSecondary} size={12} />
          <Text style={[styles.contactText, { color: theme.textSecondary }]} numberOfLines={1}>{phone}</Text>
        </View>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.iconButton}>
          <Icon name="edit" color={theme.primary} size={20} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton}>
          <Icon name="delete" color="#ef4444" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const CustomerManagementListScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { theme, isDark } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Icon name="menu" color={theme.primary} size={24} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Customers
        </Text>
        <TouchableOpacity style={styles.headerButton}>
          <Icon name="filter_list" color={theme.primary} size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Search Bar */}
        <View style={[styles.searchSection, { backgroundColor: theme.card }]}>
          <View style={[styles.searchBar, { backgroundColor: theme.background }]}>
            <Icon name="search" color={theme.textSecondary} size={20} />
            <TextInput 
              style={[styles.searchInput, { color: theme.text }]}
              placeholder="Search customers..."
              placeholderTextColor={theme.textSecondary}
            />
          </View>
        </View>

        {/* Stats / Overview */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.statsContainer}>
          <View style={[styles.statBadge, { backgroundColor: isDark ? 'rgba(19, 91, 236, 0.2)' : 'rgba(19, 91, 236, 0.1)', borderColor: isDark ? 'rgba(19, 91, 236, 0.2)' : 'rgba(19, 91, 236, 0.1)' }]}>
            <Text style={[styles.statLabel, { color: theme.primary }]}>Total Customers</Text>
            <Text style={[styles.statValue, { color: theme.text }]}>1,284</Text>
          </View>
          <View style={[styles.statBadge, { backgroundColor: isDark ? '#1e293b' : '#f1f5f9', borderColor: theme.border }]}>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>Active Today</Text>
            <Text style={[styles.statValue, { color: theme.text }]}>42</Text>
          </View>
        </ScrollView>

        {/* Customer List Section */}
        <View style={styles.listSection}>
          <CustomerItem 
            initials="JD" 
            name="Johnathan Doe" 
            email="john.doe@enterprise.com" 
            phone="+1 (555) 012-3456" 
            bgColor="rgba(19, 91, 236, 0.1)" 
            textColor="#135bec" 
          />
          <CustomerItem 
            initials="JS" 
            name="Jane Smith" 
            email="jane.smith@design.co" 
            phone="+1 (555) 987-6543" 
            bgColor="rgba(79, 70, 229, 0.1)" 
            textColor="#4f46e5" 
          />
          <CustomerItem 
            initials="RW" 
            name="Robert Williams" 
            email="robert.w@techpulse.io" 
            phone="+1 (555) 246-8101" 
            bgColor="rgba(20, 184, 166, 0.1)" 
            textColor="#14b8a6" 
          />
          <CustomerItem 
            initials="LB" 
            name="Linda Brown" 
            email="linda.b@marketplace.com" 
            phone="+1 (555) 333-4444" 
            bgColor="rgba(245, 158, 11, 0.1)" 
            textColor="#f59e0b" 
          />
          <CustomerItem 
            initials="MM" 
            name="Michael Moore" 
            email="m.moore@logistics.net" 
            phone="+1 (555) 555-0199" 
            bgColor="rgba(100, 116, 139, 0.1)" 
            textColor="#64748b" 
            opacity={0.8}
          />
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity 
        style={[styles.fab, SHADOWS.primary, { backgroundColor: theme.primary }]}
      >
        <Icon name="add" color="white" size={30} />
      </TouchableOpacity>

      {/* Bottom Navigation Bar */}
      <View style={[styles.bottomNav, { backgroundColor: theme.card, borderTopColor: theme.border }]}>
        <TouchableOpacity onPress={() => navigation.navigate('ItemMenu')} style={styles.navItem}>
          <Icon name="inventory_2" color={theme.textSecondary} size={24} />
          <Text style={[styles.navText, { color: theme.textSecondary }]}>Inventory</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SaleInvoiceList')} style={styles.navItem}>
          <Icon name="receipt_long" color={theme.textSecondary} size={24} />
          <Text style={[styles.navText, { color: theme.textSecondary }]}>Sales</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="group" color={theme.primary} size={24} />
          <Text style={[styles.navText, { color: theme.primary, fontWeight: "bold" }]}>Customers</Text>
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
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.sm,
    paddingTop: SPACING.lg,
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
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
  },
  searchSection: {
    padding: SPACING.lg,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 16,
    height: 44,
    paddingHorizontal: 16,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 12,
    fontSize: 16,
  },
  statsContainer: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    gap: 12,
    flexDirection: "row",
  },
  statBadge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    marginRight: 12,
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
  listSection: {
    paddingHorizontal: SPACING.lg,
    gap: 12,
    marginTop: 8,
    paddingBottom: 112,
  },
  customerCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
  },
  avatar: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    height: 48,
    width: 48,
  },
  avatarText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  customerInfo: {
    flex: 1,
    minWidth: 0,
  },
  customerName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  contactRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  contactText: {
    fontSize: 12,
    marginLeft: 4,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 4,
  },
  iconButton: {
    padding: 8,
    borderRadius: 8,
  },
  deleteButton: {
    padding: 8,
    borderRadius: 8,
  },
  fab: {
    position: "absolute",
    bottom: 96,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
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
    justifyContent: "space-around",
    alignItems: "center",
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  navText: {
    fontSize: 10,
  },
  navTextActive: {
  },
});

