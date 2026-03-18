import React from "react";
import { View, Text, Modal, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../../context/ThemeContext";
import { SHADOWS } from "../../theme";

interface Props {
    visible: boolean;
    onClose: () => void;
    name: string;
    setName: (v: string) => void;
    phone: string;
    setPhone: (v: string) => void;
    email: string;
    setEmail: (v: string) => void;
    onAdd: () => void;
}

export const AddCustomerModal: React.FC<Props> = ({
  visible,
  onClose,
  name,
  setName,
  phone,
  setPhone,
  email,
  setEmail,
  onAdd,
}) => {
  const { theme } = useTheme();

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
          <Text style={[styles.modalTitle, { color: theme.text }]}>New Customer</Text>

          <TextInput
            testID="input-customer-name"
            style={[styles.modalInput, { backgroundColor: theme.background, borderColor: theme.border, color: theme.text }]}
            placeholder="Full Name"
            placeholderTextColor={theme.textSecondary}
            value={name}
            onChangeText={setName}
          />

          <TextInput
            testID="input-customer-phone"
            style={[styles.modalInput, { backgroundColor: theme.background, borderColor: theme.border, color: theme.text }]}
            placeholder="Phone Number"
            placeholderTextColor={theme.textSecondary}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          <TextInput
            style={[styles.modalInput, { backgroundColor: theme.background, borderColor: theme.border, color: theme.text }]}
            placeholder="Email (Optional)"
            placeholderTextColor={theme.textSecondary}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <View style={styles.modalActions}>
            <TouchableOpacity onPress={onClose} style={styles.modalCancel}>
              <Text style={{ color: theme.textSecondary }}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity testID="btn-submit-customer" onPress={onAdd} style={[styles.modalAdd, { backgroundColor: theme.primary }]}>
              <Text style={{ color: "white", fontWeight: "bold" }}>Add Customer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
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
    fontWeight: "bold",
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
    flexDirection: "row",
    gap: 12,
    marginTop: 8,
  },
  modalCancel: {
    flex: 1,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
  },
  modalAdd: {
    flex: 2,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    ...SHADOWS.primary,
  },
});