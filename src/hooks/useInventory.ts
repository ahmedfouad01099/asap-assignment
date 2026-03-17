import { useMemo } from "react";
import { useItemList } from "./useItemList";
import { useTheme } from "../context/ThemeContext";

export const useInventory = () => {
  const { items, isLoading, fetchItems } = useItemList();
  const { theme } = useTheme();

  const stats = useMemo(() => {
    const totalQty = items.reduce((sum, item) => sum + (item.quantity || 0), 0);
    const lowStock = items.filter(item => (item.quantity || 0) < 10 && (item.quantity || 0) > 0).length;
    const outOfStock = items.filter(item => (item.quantity || 0) === 0).length;
    const totalValue = items.reduce((sum, item) => sum + ((item.quantity || 0) * (item.price || 0)), 0);

    return { totalQty, lowStock, outOfStock, totalValue };
  }, [items]);

  const getStockStatus = (quantity: number) => {
    if (quantity === 0) return { label: "Out of Stock", color: theme.danger };
    if (quantity < 10) return { label: "Low Stock", color: theme.warning };
    return { label: "Healthy", color: theme.success };
  };

  return {
    items,
    isLoading,
    fetchItems,
    stats,
    getStockStatus
  };
};
