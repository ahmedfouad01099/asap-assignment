import React, { useState, useCallback } from "react";
import { Alert } from "react-native";
import { useCustomerDB, useCustomerCountDB } from "../database/hooks";
import { useFocusEffect } from "@react-navigation/native";
import { Customer } from "../database/types";

export const useCustomerManagement = () => {
  const { getCustomers, addCustomer, deleteCustomer } = useCustomerDB();
  const { getCustomersCount } = useCustomerCountDB();

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [count, setCount] = useState(0);
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [data, total] = await Promise.all([getCustomers(), getCustomersCount()]);
      setCustomers(data);
      setCount(total);
    } catch (error) {
      console.error("Error fetching customers:", error);
    } finally {
      setIsLoading(false);
    }
  }, [getCustomers, getCustomersCount]);

  useFocusEffect(
    React.useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  const handleAddCustomer = async () => {
    if (!newName || !newPhone) {
      Alert.alert("Error", "Name and phone are required");
      return;
    }
    try {
      await addCustomer(newName, newPhone, newEmail);
      setNewName("");
      setNewPhone("");
      setNewEmail("");
      setModalVisible(false);
      fetchData();
    } catch (e) {
      Alert.alert("Error", "Failed to add customer");
    }
  };

  const handleDelete = (id: number) => {
    Alert.alert("Delete", "Are you sure?", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: async () => {
        try {
          await deleteCustomer(id);
          fetchData();
        } catch (error) {
          Alert.alert("Error", "Failed to delete customer");
        }
      }}
    ]);
  };

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.phone.includes(search)
  );

  return {
    customers: filteredCustomers,
    count,
    search,
    setSearch,
    modalVisible,
    setModalVisible,
    newName,
    setNewName,
    newPhone,
    setNewPhone,
    newEmail,
    setNewEmail,
    handleAddCustomer,
    handleDelete,
    isLoading
  };
};
