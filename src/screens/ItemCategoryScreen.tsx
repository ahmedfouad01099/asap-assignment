import React from "react";
import { View, Text, FlatList, SafeAreaView, TouchableOpacity, StyleSheet, TextInput, Alert } from "react-native";
import { Icon } from "../components/ui/Icon";
import { StatCard } from "../components/ui/StatCard";
import { useTheme } from "../context/ThemeContext";
import { SPACING, SHADOWS } from "../theme";
import { useItemCategory } from "../hooks/useItemCategory";
import { Category } from "../database/types";

export const ItemCategoryScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { theme } = useTheme();
  const { 
    categories, 
    newCategoryName, 
    setNewCategoryName, 
    handleAdd, 
    handleDelete 
  } = useItemCategory();

  const renderItem = ({ item }: { item: Category }) => (
    <View
      style={[styles.categoryCard, { backgroundColor: theme.card, borderColor: theme.border }]}
    >
      <Text style={[styles.categoryName, { color: theme.text }]}>{item.name}</Text>
      <TouchableOpacity onPress={() => handleDelete(item.id)} style={styles.deleteButton}>
        <Icon name="delete_outline" color={theme.danger} size={20} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow_back_ios" color={theme.text} size={20} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Categories</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={{ paddingHorizontal: SPACING.lg, paddingTop: SPACING.lg }}>
        <StatCard 
          label="Total Categories"
          value={categories.length}
          icon="category"
        />
      </View>

      <View style={styles.addSection}>
        <TextInput
          style={[styles.input, { backgroundColor: theme.card, borderColor: theme.border, color: theme.text }]}
          placeholder="New Category Name"
          placeholderTextColor={theme.textSecondary}
          value={newCategoryName}
          onChangeText={setNewCategoryName}
        />
        <TouchableOpacity
          onPress={handleAdd}
          style={[styles.addButton, { backgroundColor: theme.primary }]}
        >
          <Icon name="add" color="white" size={24} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Icon name="category" color={theme.textSecondary} size={48} />
            <Text style={[styles.emptyText, { color: theme.textSecondary }]}>No categories found</Text>
          </View>
        }
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
    padding: SPACING.lg,
    paddingBottom: SPACING.sm,
    borderBottomWidth: 1,
    justifyContent: "space-between",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  addSection: {
    flexDirection: "row",
    padding: SPACING.lg,
    gap: 12,
  },
  input: {
    flex: 1,
    height: 56,
    borderRadius: 16,
    borderWidth: 1,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  addButton: {
    width: 56,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    ...SHADOWS.primary,
  },
  listContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: 24,
    gap: 12,
  },
  categoryCard: {
    flexDirection: "row",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "space-between",
    ...SHADOWS.sm,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "500",
  },
  deleteButton: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
    gap: 16,
  },
  emptyText: {
    fontSize: 16,
  },
});
