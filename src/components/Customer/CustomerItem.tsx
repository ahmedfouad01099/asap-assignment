import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "../ui/Icon";
import { useTheme } from "../../context/ThemeContext";
import { Customer } from "../../database/types";

export const CustomerItem: React.FC<{ customer: Customer; onDelete: (id: number) => void }> = ({ customer, onDelete }) => {
  const { theme } = useTheme();
  const initials = customer.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  return (
    <View style={[styles.customerCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
      <View style={[styles.avatar, { backgroundColor: `${theme.primary}15` }]}>
        <Text style={[styles.avatarText, { color: theme.primary }]}>{initials}</Text>
      </View>
      <View style={styles.customerInfo}>
        <Text style={[styles.customerName, { color: theme.text }]}>{customer.name}</Text>
        <Text style={[styles.contactText, { color: theme.textSecondary }]}>{customer.email || "No email"}</Text>
        <Text style={[styles.contactText, { color: theme.textSecondary }]}>{customer.phone}</Text>
      </View>
      <TouchableOpacity onPress={() => onDelete(customer.id)} style={styles.deleteButton}>
        <Icon name="delete" color={theme.danger} size={20} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
});