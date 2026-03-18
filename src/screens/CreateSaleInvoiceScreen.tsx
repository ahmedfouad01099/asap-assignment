import React from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Alert, Modal, FlatList, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "../components/ui/Icon";
import { useTheme } from "../context/ThemeContext";
import { SPACING, SHADOWS } from "../theme";
import { useCreateSaleInvoice } from "../hooks/useCreateSaleInvoice";
import { LineItem } from "../components/Invoice/LineItem";
import { InvoiceSummary } from "../components/Invoice/InvoiceSummary";
import { SelectionModal } from "../components/ui/SelectionModal";

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
    categories,
    categoryModalVisible,
    setCategoryModalVisible,
    invoiceNumber,
    invoiceDate,
    setInvoiceDate,
    subtotal,
    vat,
    total,
    addLineItem,
    removeLineItem,
    handleSave,
  } = useCreateSaleInvoice(navigation);

  const [showDatePicker, setShowDatePicker] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState<any>(null);



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
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={[styles.readonlyInput, { backgroundColor: theme.background, borderColor: theme.border }]}
              >
                <Text style={[styles.readonlyText, { color: theme.text }]}>
                  {invoiceDate.toISOString().split('T')[0]}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>Customer</Text>
            <TouchableOpacity
              testID="btn-select-customer"
              onPress={() => setCustomerModalVisible(true)}
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
            <LineItem 
              key={index}
              name={li.item.name}
              quantity={li.quantity}
              price={li.item.price}
              onRemove={() => removeLineItem(li.item.id)}
            />
          ))}

          <TouchableOpacity
            testID="btn-add-line-item"
            onPress={() => setCategoryModalVisible(true)}
            style={[styles.addButton, { borderColor: theme.border }]}
          >
            <Icon name="add_circle" color={theme.primary} size={18} />
            <Text style={[styles.addButtonText, { color: theme.primary }]}>Add Line Item</Text>
          </TouchableOpacity>
        </View>

        <InvoiceSummary 
          subtotal={subtotal}
          vat={vat}
          total={total}
        />
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

      {/* Category Selection Modal */}
      <SelectionModal
        visible={categoryModalVisible}
        title="Select Category"
        testID="modal-title-select-category"
        accessibilityLabel="Select Category"
        data={categories}
        onSelect={(category) => {
          setSelectedCategory(category);
          setCategoryModalVisible(false);
          setItemModalVisible(true);
        }}
        onClose={() => setCategoryModalVisible(false)}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            testID={`category-option-${index}`}
            onPress={() => {
              setSelectedCategory(item);
              setCategoryModalVisible(false);
              setItemModalVisible(true);
            }}
            style={[styles.modalItem, { borderBottomColor: theme.border }]}
          >
            <Text style={{ color: theme.text }}>{item.name}</Text>
            <Icon name="chevron_right" color={theme.textSecondary} size={20} />
          </TouchableOpacity>
        )}
      />

      {/* Customer Selection Modal */}
      <SelectionModal
        visible={customerModalVisible}
        title="Select Customer"
        testID="modal-title-select-customer"
        accessibilityLabel="Select Customer"
        data={customers}
        onSelect={(customer) => {
          setSelectedCustomer(customer);
          setCustomerModalVisible(false);
        }}
        onClose={() => setCustomerModalVisible(false)}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            testID={`customer-option-${index}`}
            onPress={() => {
              setSelectedCustomer(item);
              setCustomerModalVisible(false);
            }}
            style={[styles.modalItem, { borderBottomColor: theme.border }]}
          >
            <Text style={{ color: theme.text }}>{item.name} ({item.phone})</Text>
          </TouchableOpacity>
        )}
      />

      {/* Item Selection Modal */}
      <SelectionModal
        visible={itemModalVisible}
        title={selectedCategory ? `Products: ${selectedCategory.name}` : "Select Product"}
        testID="modal-title-select-product"
        accessibilityLabel="Select Product"
        data={items.filter(i => !selectedCategory || i.category_id === selectedCategory.id)}
        onSelect={(item) => {
          addLineItem(item);
          setItemModalVisible(false);
        }}
        onClose={() => setItemModalVisible(false)}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            testID={`item-option-${index}`}
            onPress={() => {
              addLineItem(item);
              // We usually want to stay in the modal to add multiple items? 
              // The original logic calls addLineItem(item) which doesn't close it, 
              // but handleSelectCustomer does.
              // Re-reading original item selection logic: it doesn't call setItemModalVisible(false)
            }}
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
      {showDatePicker && (
        <DateTimePicker
          value={invoiceDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setInvoiceDate(selectedDate);
            }
          }}
        />
      )}
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
  modalItem: {
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
