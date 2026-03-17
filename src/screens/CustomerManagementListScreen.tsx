import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity, TextInput, StyleSheet, FlatList, Alert, Modal } from "react-native";
import { Icon } from "../components/ui/Icon";
import { StatCard } from "../components/ui/StatCard";
import { useTheme } from "../context/ThemeContext";
import { SPACING, SHADOWS } from "../theme";
import { useCustomerManagement } from "../hooks/useCustomerManagement";
import { Customer } from "../database/types";

const CustomerItem: React.FC<{
  customer: Customer;
  onDelete: (id: number) => void;
}> = ({ customer, onDelete }) => {
  const { theme } = useTheme();
  const initials = customer.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  
  return (
    <View 
      style={[
        styles.customerCard, 
        { backgroundColor: theme.card, borderColor: theme.border },
        SHADOWS.sm
      ]}
    >
      <View 
        style={[styles.avatar, { backgroundColor: `${theme.primary}15` }]}
      >
        <Text style={[styles.avatarText, { color: theme.primary }]}>{initials}</Text>
      </View>
      <View style={styles.customerInfo}>
        <Text style={[styles.customerName, { color: theme.text }]} numberOfLines={1}>{customer.name}</Text>
        <View style={styles.contactRow}>
          <Icon name="mail" color={theme.textSecondary} size={14} />
          <Text style={[styles.contactText, { color: theme.textSecondary }]} numberOfLines={1}>{customer.email || "No email"}</Text>
        </View>
        <View style={styles.contactRow}>
          <Icon name="call" color={theme.textSecondary} size={12} />
          <Text style={[styles.contactText, { color: theme.textSecondary }]} numberOfLines={1}>{customer.phone}</Text>
        </View>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(customer.id)}>
          <Icon name="delete" color={theme.danger} size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const CustomerManagementListScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { theme } = useTheme();
  const { 
    customers, 
    count, 
    search, 
    setSearch, 
    modalVisible, 
    setModalVisible, 
    newName, 
    setNewName, 
    newPhone, 
    setNewPhone, 
    newEmail, 
    setNewEmail, 
    handleAddCustomer, 
    handleDelete,
    isLoading 
  } = useCustomerManagement();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Customers
        </Text>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.headerButton}>
          <Icon name="add" color={theme.primary} size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={[styles.searchSection, { backgroundColor: theme.card }]}>
          <View style={[styles.searchBar, { backgroundColor: theme.background }]}>
            <Icon name="search" color={theme.textSecondary} size={20} />
            <TextInput 
              style={[styles.searchInput, { color: theme.text }]}
              placeholder="Search customers..."
              placeholderTextColor={theme.textSecondary}
              value={search}
              onChangeText={setSearch}
            />
          </View>
        </View>

        <View style={styles.statsContainer}>
          <StatCard 
            label="Total Customers"
            value={count}
            icon="group"
          />
        </View>

        <FlatList
          data={customers}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <CustomerItem customer={item} onDelete={handleDelete} />}
          contentContainerStyle={styles.listSection}
          ListEmptyComponent={
            <View style={{ alignItems: 'center', marginTop: 40 }}>
              <Text style={{ color: theme.textSecondary }}>
                {isLoading ? "Loading customers..." : "No customers found"}
              </Text>
            </View>
          }
        />
      </View>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>New Customer</Text>
            <TextInput 
              style={[styles.modalInput, { backgroundColor: theme.background, borderColor: theme.border, color: theme.text }]}
              placeholder="Full Name"
              placeholderTextColor={theme.textSecondary}
              value={newName}
              onChangeText={setNewName}
            />
            <TextInput 
              style={[styles.modalInput, { backgroundColor: theme.background, borderColor: theme.border, color: theme.text }]}
              placeholder="Phone Number"
              placeholderTextColor={theme.textSecondary}
              value={newPhone}
              onChangeText={setNewPhone}
              keyboardType="phone-pad"
            />
            <TextInput 
              style={[styles.modalInput, { backgroundColor: theme.background, borderColor: theme.border, color: theme.text }]}
              placeholder="Email (Optional)"
              placeholderTextColor={theme.textSecondary}
              value={newEmail}
              onChangeText={setNewEmail}
              keyboardType="email-address"
            />
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalCancel}>
                <Text style={{ color: theme.textSecondary }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleAddCustomer} style={[styles.modalAdd, { backgroundColor: theme.primary }]}>
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Add Customer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  content: {
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
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  listSection: {
    paddingHorizontal: SPACING.lg,
    gap: 12,
    marginTop: 8,
    paddingBottom: 24,
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
  deleteButton: {
    padding: 8,
    borderRadius: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    padding: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    gap: 16,
    paddingBottom: 40,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  modalInput: {
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  modalCancel: {
    flex: 1,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
  },
  modalAdd: {
    flex: 2,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    ...SHADOWS.primary,
  },
});

