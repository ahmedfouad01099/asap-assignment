import React, { useState, useCallback } from "react";
import { useItemDB } from "../database/hooks";
import { useFocusEffect } from "@react-navigation/native";

export const useItemList = () => {
  const { getItems } = useItemDB();
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchItems = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getItems();
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setIsLoading(false);
    }
  }, [getItems]);

  useFocusEffect(
    React.useCallback(() => {
      fetchItems();
    }, [fetchItems])
  );

  return {
    items,
    isLoading,
    fetchItems
  };
};
