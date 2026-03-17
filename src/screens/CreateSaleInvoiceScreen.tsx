import React from "react";
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import { Icon } from "../components/ui/Icon";
import { useTheme } from "../context/ThemeContext";
import { SPACING, SHADOWS } from "../theme";

export const CreateSaleInvoiceScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      {/* Top Navigation Bar */}
      <View style={[styles.header, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.headerButton}
        >
          <Icon name="arrow_back" color={theme.text} size={24} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Create Sale Invoice
        </Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Invoice Header Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Invoice Header</Text>
            <View style={[styles.badge, { backgroundColor: 'rgba(19, 91, 236, 0.1)' }]}>
              <Text style={[styles.badgeText, { color: theme.primary }]}>Draft</Text>
            </View>
          </View>
          
          <View style={styles.row}>
            <View style={styles.flexField}>
              <Text style={[styles.label, { color: theme.textSecondary }]}>Invoice Number</Text>
              <View style={[styles.readonlyInput, { backgroundColor: theme.background, borderColor: theme.border }]}>
                <Text style={[styles.readonlyText, { color: theme.textSecondary }]}>#INV-2023-0842</Text>
              </View>
            </View>
            <View style={styles.flexField}>
              <Text style={[styles.label, { color: theme.textSecondary }]}>Date</Text>
              <View style={styles.inputWrapper}>
                <TextInput 
                  style={[styles.input, { backgroundColor: theme.card, borderColor: theme.border, color: theme.text }]}
                  value="2023-10-27"
                  editable={false}
                />
                <View style={styles.inputIcon}>
                  <Icon name="calendar_today" color={theme.textSecondary} size={18} />
                </View>
              </View>
            </View>
          </View>
          
          <View style={styles.fieldContainer}>
            <Text style={[styles.label, { color: theme.textSecondary }]}>Customer</Text>
            <TouchableOpacity style={[styles.pickerToggle, { backgroundColor: theme.card, borderColor: theme.border }]}>
              <Text style={[styles.pickerText, { color: theme.text }]}>Acme Corporation</Text>
              <View style={styles.inputIcon}>
                <Icon name="expand_more" color={theme.textSecondary} size={24} />
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Line Item Section */}
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }, SHADOWS.sm]}>
          <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Item Details</Text>
          <View style={styles.row}>
            <View style={styles.flexField}>
              <Text style={[styles.label, { color: theme.textSecondary }]}>Category</Text>
              <TouchableOpacity style={[styles.pickerToggleSmall, { backgroundColor: theme.background, borderColor: theme.border }]}>
                <Text style={[styles.pickerTextSmall, { color: theme.text }]}>Electronics</Text>
                <View style={styles.inputIconSmall}>
                  <Icon name="unfold_more" color={theme.textSecondary} size={18} />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.flexField}>
              <Text style={[styles.label, { color: theme.textSecondary }]}>Product</Text>
              <TouchableOpacity style={[styles.pickerToggleSmall, { backgroundColor: theme.background, borderColor: theme.border }]}>
                <Text style={[styles.pickerTextSmall, { color: theme.text }]}>Monitor 27" 4K</Text>
                <View style={styles.inputIconSmall}>
                  <Icon name="unfold_more" color={theme.textSecondary} size={18} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.row}>
            <View style={styles.smallField}>
              <Text style={[styles.tinyLabel, { color: theme.textSecondary }]}>Quantity</Text>
              <TextInput 
                style={[styles.inputSmall, { backgroundColor: theme.card, borderColor: theme.border, color: theme.text }]}
                value="2"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.smallField}>
              <Text style={[styles.tinyLabel, { color: theme.textSecondary }]}>Price</Text>
              <TextInput 
                style={[styles.inputSmall, { backgroundColor: theme.card, borderColor: theme.border, color: theme.text }]}
                value="350.00"
                keyboardType="numeric"
              />
            </View>
            <View style={styles.smallField}>
              <Text style={[styles.tinyLabel, { color: theme.textSecondary, textAlign: 'right' }]}>Subtotal</Text>
              <View style={[styles.subtotalBadge, { backgroundColor: 'rgba(19, 91, 236, 0.05)' }]}>
                <Text style={[styles.subtotalText, { color: theme.primary }]}>$700.00</Text>
              </View>
            </View>
          </View>
          
          <TouchableOpacity style={[styles.addButton, { borderColor: theme.border }]}>
            <Icon name="add_circle" color={theme.textSecondary} size={18} />
            <Text style={[styles.addButtonText, { color: theme.textSecondary }]}>Add Line Item</Text>
          </TouchableOpacity>
        </View>

        {/* Summary Section */}
        <View style={[styles.card, { backgroundColor: theme.card, borderColor: theme.border }, SHADOWS.sm]}>
          <View style={[styles.cardHeader, { borderBottomColor: theme.border }]}>
            <Text style={[styles.sectionTitle, { color: theme.textSecondary }]}>Invoice Summary</Text>
          </View>
          <View style={styles.cardContent}>
            <View style={styles.summaryRow}>
              <Text style={{ color: theme.textSecondary }}>Subtotal (2 items)</Text>
              <Text style={[styles.summaryValue, { color: theme.text }]}>$700.00</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={{ color: theme.textSecondary }}>VAT (15%)</Text>
              <Text style={[styles.summaryValue, { color: theme.text }]}>$105.00</Text>
            </View>
            <View style={[styles.totalRow, { borderTopColor: theme.border }]}>
              <Text style={[styles.totalLabel, { color: theme.text }]}>Grand Total</Text>
              <Text style={[styles.totalValue, { color: theme.primary }]}>$805.00</Text>
            </View>
          </View>
        </View>

        {/* Payment Info */}
        <View style={[styles.infoCard, { backgroundColor: 'rgba(19, 91, 236, 0.05)', borderColor: 'rgba(19, 91, 236, 0.1)' }]}>
          <Icon name="info" color={theme.primary} size={20} />
          <Text style={[styles.infoText, { color: theme.primary }]}>
            Payment is due within 30 days of invoice date.
          </Text>
        </View>
        
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Bottom Action Bar */}
      <View style={[styles.footer, { backgroundColor: theme.card, borderTopColor: theme.border }]}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={[styles.cancelButton, { borderColor: theme.border }]}
        >
          <Text style={[styles.cancelButtonText, { color: theme.textSecondary }]}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={[styles.saveButton, { backgroundColor: theme.primary }, SHADOWS.primary]}
        >
          <Icon name="save" color="white" size={20} />
          <Text style={styles.saveButtonText}>Save Invoice</Text>
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
  smallField: {
    flex: 1,
    gap: 6,
  },
  label: {
    fontSize: 14,
    fontWeight: "medium",
  },
  tinyLabel: {
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
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
    fontFamily: "monospace",
  },
  inputWrapper: {
    position: "relative",
    height: 44,
    justifyContent: "center",
  },
  input: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 14,
  },
  inputIcon: {
    position: "absolute",
    right: 12,
  },
  fieldContainer: {
    gap: 6,
    marginTop: 8,
  },
  pickerToggle: {
    flexDirection: "row",
    alignItems: "center",
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
  cardHeader: {
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  cardContent: {
    gap: 12,
  },
  pickerToggleSmall: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
  },
  pickerTextSmall: {
    fontSize: 13,
  },
  inputIconSmall: {
    position: "absolute",
    right: 8,
  },
  inputSmall: {
    width: "100%",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 14,
  },
  subtotalBadge: {
    width: "100%",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: "flex-end",
  },
  subtotalText: {
    fontSize: 14,
    fontWeight: "bold",
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
    fontWeight: "medium",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryValue: {
    fontWeight: "medium",
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
  infoCard: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  infoText: {
    fontSize: 12,
    fontWeight: "medium",
    flex: 1,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    paddingBottom: 32,
    borderTopWidth: 1,
    flexDirection: "row",
    gap: 16,
  },
  cancelButton: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderRadius: 16,
    alignItems: "center",
  },
  cancelButtonText: {
    fontWeight: "bold",
  },
  saveButton: {
    flex: 2,
    paddingVertical: 16,
    paddingHorizontal: 24,
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
});
