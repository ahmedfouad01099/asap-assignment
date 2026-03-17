import React, { useState, useCallback } from "react";
import { Alert } from "react-native";
import { useCategoryDB } from "../database/hooks";
import { useFocusEffect } from "@react-navigation/native";
import { Category } from "../database/types";

export const useItemCategory = () => {
  const { getCategories, addCategory, deleteCategory } = useCategoryDB();
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategoryName, setNewCategoryName] = useState("");

  const fetchCategories = useCallback(async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, [getCategories]);

  useFocusEffect(
    React.useCallback(() => {
      fetchCategories();
    }, [fetchCategories])
  );

  const handleAdd = async () => {
    if (!newCategoryName.trim()) return;
    try {
      await addCategory(newCategoryName.trim());
      setNewCategoryName("");
      fetchCategories();
    } catch (error) {
      Alert.alert("Error", "Category already exists or failed to save");
    }
  };

  const handleDelete = (id: number) => {
    Alert.alert(
      "Delete Category",
      "Are you sure? This won't delete items in this category, but they will have no category.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteCategory(id);
              fetchCategories();
            } catch (error) {
              Alert.alert("Error", "Failed to delete category");
            }
          }
        }
      ]
    );
  };

  return {
    categories,
    newCategoryName,
    setNewCategoryName,
    handleAdd,
    handleDelete
  };
};
