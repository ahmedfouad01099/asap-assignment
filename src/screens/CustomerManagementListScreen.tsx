import React from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, FlatList, Alert, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "../components/ui/Icon";
import { StatCard } from "../components/ui/StatCard";
import { useTheme } from "../context/ThemeContext";
import { SPACING } from "../theme";
import { useCustomerManagement } from "../hooks/useCustomerManagement";
import { CustomerItem } from "../components/Customer/CustomerItem";
import { AddCustomerModal } from "../components/Customer/AddCustomerModal";

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
    isLoading,
  } = useCustomerManagement();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Customers
        </Text>
        <TouchableOpacity
          testID="btn-add-customer-header"
          onPress={() => setModalVisible(true)}
          style={styles.headerButton}
        >
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
            <View style={{ alignItems: "center", marginTop: 40 }}>
              <Text style={{ color: theme.textSecondary }}>
                {isLoading ? "Loading customers..." : "No customers found"}
              </Text>
            </View>
          }
        />
      </View>

      <AddCustomerModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        name={newName}
        setName={setNewName}
        phone={newPhone}
        setPhone={setNewPhone}
        email={newEmail}
        setEmail={setNewEmail}
        onAdd={handleAddCustomer}
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
    paddingVertical: 20,
  },
  listSection: {
    paddingHorizontal: SPACING.lg,
    gap: 12,
    marginTop: 8,
    paddingBottom: 24,
  },
});

