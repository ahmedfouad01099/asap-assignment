import React from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Icon } from "../components/ui/Icon";
import { useTheme } from "../context/ThemeContext";
import { SPACING, SHADOWS } from "../theme";
import { useAddNewItem } from "../hooks/useAddNewItem";

export const AddNewItemFormScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { theme, isDark } = useTheme();
  const {
    name,
    setName,
    price,
    setPrice,
    quantity,
    setQuantity,
    selectedCategory,
    handleSave,
    toggleCategory
  } = useAddNewItem(navigation);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow_back_ios" color={theme.text} size={20} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Add New Item
        </Text>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.fieldContainer}>
          <Text style={[styles.label, { color: theme.text }]}>
            Item Name
          </Text>
          <TextInput 
            style={[styles.input, { backgroundColor: theme.card, borderColor: theme.border, color: theme.text }]}
            placeholder="e.g. Wireless Headphones"
            placeholderTextColor={theme.textSecondary}
            value={name}
            onChangeText={setName}
          />
        </View>

        <View style={styles.fieldContainer}>
          <Text style={[styles.label, { color: theme.text }]}>
            Category
          </Text>
          <TouchableOpacity 
            onPress={toggleCategory}
            style={[styles.pickerToggle, { backgroundColor: theme.card, borderColor: theme.border }]}
          >
            <Text style={[styles.pickerText, { color: selectedCategory ? theme.text : theme.textSecondary }]}>
              {selectedCategory ? selectedCategory.name : "Select category"}
            </Text>
            <Icon name="expand_more" color={theme.textSecondary} size={24} />
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <View style={styles.flexField}>
            <Text style={[styles.label, { color: theme.text }]}>
              Price
            </Text>
            <View style={styles.priceInputWrapper}>
              <Text style={[styles.currencySymbol, { color: theme.textSecondary }]}>$</Text>
              <TextInput 
                style={[styles.input, styles.priceInput, { backgroundColor: theme.card, borderColor: theme.border, color: theme.text }]}
                placeholder="0.00"
                placeholderTextColor={theme.textSecondary}
                keyboardType="numeric"
                value={price}
                onChangeText={setPrice}
              />
            </View>
          </View>
          <View style={styles.flexField}>
            <Text style={[styles.label, { color: theme.text }]}>
              Quantity
            </Text>
            <TextInput 
              style={[styles.input, { backgroundColor: theme.card, borderColor: theme.border, color: theme.text }]}
              placeholder="0"
              placeholderTextColor={theme.textSecondary}
              keyboardType="numeric"
              value={quantity}
              onChangeText={setQuantity}
            />
          </View>
        </View>

        <View style={styles.infoSection}>
          <View style={[styles.infoCard, { backgroundColor: isDark ? `${theme.primary}15` : `${theme.primary}10`, borderColor: isDark ? `${theme.primary}30` : `${theme.primary}20` }]}>
            <View style={styles.infoIconWrapper}>
              <Icon name="info" color={theme.primary} size={20} />
            </View>
            <Text style={[styles.infoText, { color: theme.textSecondary }]}>
              Data will be synchronized with your local SQLite database and available offline.
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={[styles.footer, { backgroundColor: theme.card, borderTopColor: theme.border }]}>
        <TouchableOpacity 
          onPress={handleSave}
          style={[styles.saveButton, SHADOWS.primary, { backgroundColor: theme.primary }]}
        >
          <Icon name="database" color="white" size={20} />
          <Text style={[styles.saveButtonText, { color: "white" }]}>Save to SQLite</Text>
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
    padding: SPACING.lg,
    paddingBottom: SPACING.sm,
    borderBottomWidth: 1,
    justifyContent: "space-between",
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 40,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
  },
  scrollContent: {
    paddingVertical: 24,
    gap: 24,
  },
  fieldContainer: {
    gap: 8,
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    paddingHorizontal: 4,
  },
  input: {
    width: "100%",
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  pickerToggle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 16,
  },
  pickerText: {
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 8,
  },
  flexField: {
    flex: 1,
    gap: 8,
  },
  priceInputWrapper: {
    position: "relative",
    height: 56,
    justifyContent: "center",
  },
  currencySymbol: {
    position: "absolute",
    left: 16,
    zIndex: 10,
    fontWeight: "bold",
  },
  priceInput: {
    paddingLeft: 32,
  },
  infoSection: {
    paddingTop: 16,
  },
  infoCard: {
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },
  infoIconWrapper: {
    marginTop: 2,
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 20,
  },
  footer: {
    padding: SPACING.lg,
    paddingBottom: 40,
    borderTopWidth: 1,
  },
  saveButton: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    height: 56,
  },
  saveButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: "bold",
  },
});
