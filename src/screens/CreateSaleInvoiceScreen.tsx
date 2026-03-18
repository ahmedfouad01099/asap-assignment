import React from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Alert, Modal, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "../components/ui/Icon";
import { useTheme } from "../context/ThemeContext";
import { SPACING, SHADOWS } from "../theme";
import { useCreateSaleInvoice } from "../hooks/useCreateSaleInvoice";

export const CreateSaleInvoiceScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { theme } = useTheme();
  const {
    loading,
    customers,
    items,
    selectedCustomer,
    setSelectedCustomer,
    lineItems,
    itemModalVisible,
    setItemModalVisible,
    customerModalVisible,
    setCustomerModalVisible,
    invoiceNumber,
    today,
    subtotal,
    vat,
    total,
    addLineItem,
    removeLineItem,
    handleSave,
  } = useCreateSaleInvoice(navigation);

  // iOS fix: track which modal to open after the current one fully dismisses
  const pendingModal = React.useRef<'item' | 'customer' | null>(null);

  const openItemModal = () => {
    if (customerModalVisible) {
      pendingModal.current = 'item';
      setCustomerModalVisible(false);
    } else {
      setItemModalVisible(true);
    }
  };

  const openCustomerModal = () => {
    if (itemModalVisible) {
      pendingModal.current = 'customer';
      setItemModalVisible(false);
    } else {
      setCustomerModalVisible(true);
    }
  };

  const handleModalDismiss = () => {
    if (pendingModal.current === 'item') {
      pendingModal.current = null;
      setItemModalVisible(true);
    } else if (pendingModal.current === 'customer') {
      pendingModal.current = null;
      setCustomerModalVisible(true);
    }
  };

  if (loading) return null;

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Icon name="arrow_back_ios" color={theme.text} size={20} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Create Sale Invoice</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Invoice Header</Text>
            <View style={[styles.badge, { backgroundColor: `${theme.success}15` }]}>
              <Text style={[styles.badgeText, { color: theme.success }]}>Sale</Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.flexField}>
              <Text style={[styles.label, { color: theme.textSecondary }]}>Invoice Number</Text>
              <View style={[styles.readonlyInput, { backgroundColor: theme.background, borderColor: theme.border }]}>
                <Text style={[styles.readonlyText, { color: theme.textSecondary }]}>{invoiceNumber}</Text>
              </View>
            </View>
            <View style={styles.flexField}>
              <Text style={[styles.label, { color: theme.textSecondary }]}>Date</Text>
              <View style={[styles.readonlyInput, { backgroundColor: theme.background, borderColor: theme.border }]}>
                <Text style={[styles.readonlyText, { color: theme.textSecondary }]}>{today}</Text>
              </View>
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>Customer</Text>
            <TouchableOpacity
              testID="btn-select-customer"
              onPress={openCustomerModal}
              style={[styles.pickerToggle, { backgroundColor: theme.card, borderColor: theme.border }]}
            >
              <Text
                testID="selected-customer-name"
                style={[styles.pickerText, { color: theme.text }]}
              >
                {selectedCustomer ? selectedCustomer.name : "Select Customer"}
              </Text>
              <Icon name="expand_more" color={theme.textSecondary} size={24} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }, SHADOWS.sm]}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Item Details</Text>

          {lineItems.map((li, index) => (
            <View key={index} style={styles.lineItemRow}>
              <View style={{ flex: 1 }}>
                <Text style={{ color: theme.text, fontWeight: 'bold' }}>{li.item.name}</Text>
                <Text style={{ color: theme.textSecondary, fontSize: 12 }}>{li.quantity} x ${li.item.price.toFixed(2)}</Text>
              </View>
              <Text style={{ color: theme.text, fontWeight: 'bold' }}>${(li.quantity * li.item.price).toFixed(2)}</Text>
              <TouchableOpacity onPress={() => removeLineItem(li.item.id)} style={{ marginLeft: 12 }}>
                <Icon name="delete_outline" color={theme.danger} size={20} />
              </TouchableOpacity>
            </View>
          ))}

          <TouchableOpacity
            testID="btn-add-line-item"
            onPress={openItemModal}
            style={[styles.addButton, { borderColor: theme.border }]}
          >
            <Icon name="add_circle" color={theme.primary} size={18} />
            <Text style={[styles.addButtonText, { color: theme.primary }]}>Add Line Item</Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }, SHADOWS.sm]}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Invoice Summary</Text>
          <View style={styles.cardContent}>
            <View style={styles.summaryRow}>
              <Text style={{ color: theme.textSecondary }}>Subtotal</Text>
              <Text style={[styles.summaryValue, { color: theme.text }]}>${subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={{ color: theme.textSecondary }}>VAT (15%)</Text>
              <Text style={[styles.summaryValue, { color: theme.text }]}>${vat.toFixed(2)}</Text>
            </View>
            <View style={[styles.totalRow, { borderTopColor: theme.border }]}>
              <Text style={[styles.totalLabel, { color: theme.text }]}>Grand Total</Text>
              <Text style={[styles.totalValue, { color: theme.primary }]}>${total.toFixed(2)}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: theme.card, borderTopColor: theme.border }]}>
        <TouchableOpacity
          testID="btn-cancel-invoice"
          onPress={() => navigation.goBack()}
          style={[styles.cancelButton, { borderColor: theme.border }]}
        >
          <Text style={[styles.cancelButtonText, { color: theme.textSecondary }]}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          testID="btn-complete-sale"
          onPress={handleSave}
          style={[styles.saveButton, { backgroundColor: theme.primary }, SHADOWS.primary]}
        >
          <Icon name="save" color="white" size={20} />
          <Text style={styles.saveButtonText}>Complete Sale</Text>
        </TouchableOpacity>
      </View>

      {/* Customer Modal */}
      <Modal visible={customerModalVisible} animationType="slide" transparent onDismiss={handleModalDismiss}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            <Text
              testID="modal-title-select-customer"
              accessibilityLabel="Select Customer"
              style={[styles.modalTitle, { color: theme.text }]}
            >
              Select Customer
            </Text>
            <FlatList
              data={customers}
              keyExtractor={c => c.id.toString()}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  testID={`customer-option-${index}`}
                  onPress={() => { setSelectedCustomer(item); setCustomerModalVisible(false); }}
                  style={[styles.modalItem, { borderBottomColor: theme.border }]}
                >
                  <Text style={{ color: theme.text }}>{item.name} ({item.phone})</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={() => setCustomerModalVisible(false)} style={styles.modalClose}>
              <Text style={{ color: theme.primary }}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Item Modal */}
      <Modal visible={itemModalVisible} animationType="slide" transparent onDismiss={handleModalDismiss}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
            <Text
              testID="modal-title-select-product"
              accessibilityLabel="Select Product"
              style={[styles.modalTitle, { color: theme.text }]}
            >
              Select Product
            </Text>
            <FlatList
              data={items}
              keyExtractor={i => i.id.toString()}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  testID={`item-option-${index}`}
                  onPress={() => addLineItem(item)}
                  style={[styles.modalItem, { borderBottomColor: theme.border }]}
                >
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: theme.text }}>{item.name}</Text>
                    <Text style={{ color: theme.textSecondary, fontSize: 12 }}>Stock: {item.quantity}</Text>
                  </View>
                  <Text style={{ color: theme.primary, fontWeight: 'bold' }}>${item.price.toFixed(2)}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={() => setItemModalVisible(false)} style={styles.modalClose}>
              <Text style={{ color: theme.primary }}>Close</Text>
            </TouchableOpacity>
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
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  headerButton: {
    padding: 8,
    borderRadius: 20,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: -0.5,
    marginRight: 40,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  scrollContent: {
    gap: 24,
  },
  section: {
    gap: 16,
    marginBottom: 8,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 99,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    gap: 16,
  },
  flexField: {
    flex: 1,
    gap: 6,
  },
  label: {
    fontSize: 14,
  },
  readonlyInput: {
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  readonlyText: {
    fontSize: 14,
  },
  fieldContainer: {
    gap: 6,
    marginTop: 8,
  },
  pickerToggle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  pickerText: {
    fontSize: 14,
  },
  card: {
    padding: 16,
    borderRadius: 20,
    borderWidth: 1,
    gap: 16,
  },
  cardContent: {
    gap: 12,
  },
  lineItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  addButton: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    borderWidth: 2,
    borderStyle: "dashed",
    borderRadius: 16,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: "bold",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryValue: {
    fontWeight: "bold",
  },
  totalRow: {
    paddingTop: 12,
    marginTop: 12,
    borderTopWidth: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  totalValue: {
    fontSize: 20,
    fontWeight: "bold",
  },
  footer: {
    padding: 16,
    paddingBottom: 32,
    borderTopWidth: 1,
    flexDirection: "row",
    gap: 16,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
  },
  cancelButtonText: {
    fontWeight: "bold",
  },
  saveButton: {
    flex: 2,
    paddingVertical: 16,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  saveButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalItem: {
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalClose: {
    marginTop: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
});
