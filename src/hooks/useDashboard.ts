import { useState, useCallback } from 'react';
import { Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import { useItemCountDB, useCustomerCountDB, useInvoiceDB } from '../database/hooks';

export const useDashboard = (navigation: any) => {
  const { user, logout } = useAuth();
  const { getItemsCount } = useItemCountDB();
  const { getCustomersCount } = useCustomerCountDB();
  const { getInvoicesCount } = useInvoiceDB();

  const [stats, setStats] = useState({
    items: 0,
    customers: 0,
    invoices: 0
  });

  useFocusEffect(
    useCallback(() => {
      const fetchStats = async () => {
        try {
          const [items, customers, invoices] = await Promise.all([
            getItemsCount(),
            getCustomersCount(),
            getInvoicesCount(),
          ]);
          setStats({ items, customers, invoices });
        } catch (err) {
          console.error("Fetch stats error:", err);
        }
      };
      fetchStats();
    }, [getItemsCount, getCustomersCount, getInvoicesCount])
  );

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to exit?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Logout", 
          style: "destructive",
          onPress: () => {
            logout();
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          }
        }
      ]
    );
  };

  const getFirstName = () => {
    return user?.name?.split(' ')[0] || 'User';
  };

  return {
    user,
    stats,
    handleLogout,
    getFirstName
  };
};
