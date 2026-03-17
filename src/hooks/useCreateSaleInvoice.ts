import { useState, useMemo, useEffect, useCallback } from "react";
import { Alert } from "react-native";
import { useItemDB, useCustomerDB, useInvoiceDB } from "../database/hooks";
import { Item, Customer } from "../database/types";

interface LineItem {
  item: Item;
  quantity: number;
}

export const useCreateSaleInvoice = (navigation: any) => {
  const { getItems } = useItemDB();
  const { getCustomers } = useCustomerDB();
  const { createInvoice } = useInvoiceDB();

  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  
  const [itemModalVisible, setItemModalVisible] = useState(false);
  const [customerModalVisible, setCustomerModalVisible] = useState(false);

  const invoiceNumber = useMemo(() => `#INV-${Date.now().toString().slice(-6)}`, []);
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cData, iData] = await Promise.all([getCustomers(), getItems()]);
        setCustomers(cData);
        setItems(iData);
        if (cData.length > 0) setSelectedCustomer(cData[0]);
      } catch (error) {
        console.error("Error fetching invoice data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [getCustomers, getItems]);

  const addLineItem = useCallback((item: Item) => {
    if (item.quantity <= 0) {
      Alert.alert("Out of Stock", "This item is out of stock.");
      return;
    }
    setLineItems(prev => {
      const existing = prev.find(li => li.item.id === item.id);
      if (existing) {
        return prev.map(li => 
          li.item.id === item.id ? { ...li, quantity: li.quantity + 1 } : li
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
    setItemModalVisible(false);
  }, []);

  const removeLineItem = useCallback((itemId: number) => {
    setLineItems(prev => prev.filter(li => li.item.id !== itemId));
  }, []);

  const { subtotal, vat, total } = useMemo(() => {
    const sub = lineItems.reduce((acc, li) => acc + (li.item.price * li.quantity), 0);
    const v = sub * 0.15;
    const t = sub + v;
    return { subtotal: sub, vat: v, total: t };
  }, [lineItems]);

  const handleSave = async () => {
    if (lineItems.length === 0) {
      Alert.alert("Error", "Please add at least one item.");
      return;
    }

    try {
      await createInvoice({
        customer_id: selectedCustomer?.id || null,
        date: new Date().toISOString(),
        total: total,
        vat: vat,
        due_amount: total,
        items: lineItems.map(li => ({
          item_id: li.item.id,
          quantity: li.quantity,
          price: li.item.price,
          amount: li.item.price * li.quantity
        }))
      });

      Alert.alert("Success", "Invoice created successfully", [
        { text: "OK", onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      console.error("Save invoice error:", error);
      Alert.alert("Error", "Failed to save invoice");
    }
  };

  return {
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
  };
};
