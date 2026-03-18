import { useState, useEffect } from "react";
import { Alert } from "react-native";
import { useItemDB, useCategoryDB } from "../database/hooks";
import { Category } from "../database/types";

export const useAddNewItem = (navigation: any) => {
  const { addItem } = useItemDB();
  const { getCategories } = useCategoryDB();

  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
        if (data.length > 0) {
          setCategoryId(data[0].id);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, [getCategories]);

  const handleSave = async () => {
    if (!name || !categoryId || !price || !quantity) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    try {
      await addItem(name, categoryId, parseFloat(price), parseInt(quantity, 10));
      Alert.alert("Success", "Item added successfully", [
        { text: "OK", onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      console.error("Save item error:", error);
      Alert.alert("Error", "Failed to save item");
    }
  };

  const selectedCategory = categories.find(c => c.id === categoryId);

  return {
    name,
    setName,
    categoryId,
    setCategoryId,
    price,
    setPrice,
    quantity,
    setQuantity,
    categories,
    selectedCategory,
    handleSave,
    isModalVisible,
    setIsModalVisible
  };
};
