import { useState, useCallback } from 'react';
import { DB } from './index';
import { useAuth } from '../context/AuthContext';
import { Category, Item, Customer, Invoice, InvoiceItem } from './types';

// Auth Hooks
export const useAuthDB = () => {
  const getUserByEmail = useCallback(async (email: string) => {
    const users = await DB.selectAll<any>(
      "SELECT id, email, name, password FROM Users WHERE email = ?",
      [email.toLowerCase().trim()]
    );
    return users.length > 0 ? users[0] : null;
  }, []);

  return { getUserByEmail };
};

// Category Hooks
export const useCategoryDB = () => {
  const { user } = useAuth();
  const userId = user?.id;

  const getCategories = useCallback(async () => {
    if (!userId) return [];
    return await DB.selectAll<Category>("SELECT * FROM Categories WHERE user_id = ? ORDER BY name ASC", [userId]);
  }, [userId]);

  const addCategory = useCallback(async (name: string) => {
    if (!userId) return;
    await DB.executeQuery("INSERT INTO Categories (name, user_id) VALUES (?, ?)", [name, userId]);
  }, [userId]);

  const updateCategory = useCallback(async (id: number, name: string) => {
    if (!userId) return;
    await DB.executeQuery("UPDATE Categories SET name = ? WHERE id = ? AND user_id = ?", [name, id, userId]);
  }, [userId]);

  const deleteCategory = useCallback(async (id: number) => {
    if (!userId) return;
    await DB.executeQuery("DELETE FROM Categories WHERE id = ? AND user_id = ?", [id, userId]);
  }, [userId]);

  return { getCategories, addCategory, updateCategory, deleteCategory };
};

// Item Hooks
export const useItemDB = () => {
  const { user } = useAuth();
  const userId = user?.id;

  const getItems = useCallback(async () => {
    if (!userId) return [];
    return await DB.selectAll<Item>(
      "SELECT i.*, c.name as category_name FROM Items i LEFT JOIN Categories c ON i.category_id = c.id WHERE i.user_id = ?",
      [userId]
    );
  }, [userId]);

  const addItem = useCallback(async (name: string, category_id: number, price: number, quantity: number) => {
    if (!userId) return;
    await DB.executeQuery(
      "INSERT INTO Items (name, category_id, price, quantity, user_id) VALUES (?, ?, ?, ?, ?)",
      [name, category_id, price, quantity, userId]
    );
  }, [userId]);

  const updateStock = useCallback(async (id: number, quantity: number) => {
    if (!userId) return;
    await DB.executeQuery("UPDATE Items SET quantity = quantity + ? WHERE id = ? AND user_id = ?", [quantity, id, userId]);
  }, [userId]);

  const getInventorySummary = useCallback(async () => {
    if (!userId) return { total_value: 0, total_items: 0, low_stock: 0 };
    const results = await DB.selectAll<{ total_value: number, total_items: number, low_stock: number }>(`
      SELECT 
        SUM(price * quantity) as total_value,
        SUM(quantity) as total_items,
        COUNT(CASE WHEN quantity < 10 THEN 1 END) as low_stock
      FROM Items
      WHERE user_id = ?
    `, [userId]);
    return results[0] || { total_value: 0, total_items: 0, low_stock: 0 };
  }, [userId]);

  return { getItems, addItem, updateStock, getInventorySummary };
};

// Customer Hooks
export const useCustomerDB = () => {
  const { user } = useAuth();
  const userId = user?.id;

  const getCustomers = useCallback(async () => {
    if (!userId) return [];
    return await DB.selectAll<Customer>("SELECT * FROM Customers WHERE user_id = ? ORDER BY name ASC", [userId]);
  }, [userId]);

  const addCustomer = useCallback(async (name: string, phone: string, email?: string) => {
    if (!userId) return;
    await DB.executeQuery(
      "INSERT INTO Customers (name, phone, email, user_id) VALUES (?, ?, ?, ?)",
      [name, phone, email, userId]
    );
  }, [userId]);

  const updateCustomer = useCallback(async (id: number, name: string, phone: string, email?: string) => {
    if (!userId) return;
    await DB.executeQuery(
      "UPDATE Customers SET name = ?, phone = ?, email = ? WHERE id = ? AND user_id = ?",
      [name, phone, email, id, userId]
    );
  }, [userId]);

  const deleteCustomer = useCallback(async (id: number) => {
    if (!userId) return;
    await DB.executeQuery("DELETE FROM Customers WHERE id = ? AND user_id = ?", [id, userId]);
  }, [userId]);

  return { getCustomers, addCustomer, updateCustomer, deleteCustomer };
};

// Invoice Hooks
export const useInvoiceDB = () => {
  const { user } = useAuth();
  const userId = user?.id;

  const getInvoices = useCallback(async () => {
    if (!userId) return [];
    return await DB.selectAll<any>(
      "SELECT i.*, c.name as customer_name FROM Invoices i LEFT JOIN Customers c ON i.customer_id = c.id WHERE i.user_id = ? ORDER BY i.date DESC",
      [userId]
    );
  }, [userId]);

  const createInvoice = useCallback(async (data: {
    customer_id: number | null,
    date: string,
    total: number,
    vat: number,
    due_amount: number,
    items: { item_id: number, quantity: number, price: number, amount: number }[]
  }) => {
    if (!userId) return null;
    const { customer_id, date, total, vat, due_amount, items } = data;
    const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;

    // 1. Insert Invoice
    const result: any = await DB.executeQuery(
      "INSERT INTO Invoices (invoice_number, customer_id, date, total, vat, due_amount, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [invoiceNumber, customer_id, date, total, vat, due_amount, userId]
    );

    const invoiceId = result.insertId;

    // 2. Insert Invoice Items and Update Stock
    for (const item of items) {
      await DB.executeQuery(
        "INSERT INTO InvoiceItems (invoice_id, item_id, quantity, price, amount) VALUES (?, ?, ?, ?, ?)",
        [invoiceId, item.item_id, item.quantity, item.price, item.amount]
      );

      // Decrement stock
      await DB.executeQuery(
        "UPDATE Items SET quantity = quantity - ? WHERE id = ? AND user_id = ?",
        [item.quantity, item.item_id, userId]
      );
    }

    return invoiceNumber;
  }, [userId]);

  return {
    getInvoices,
    createInvoice,
    getInvoicesCount: useCallback(async () => {
      if (!userId) return 0;
      const results = await DB.selectAll<{ count: number }>("SELECT COUNT(*) as count FROM Invoices WHERE user_id = ?", [userId]);
      return results[0]?.count || 0;
    }, [userId])
  };
};

export const useItemCountDB = () => {
  const { user } = useAuth();
  const userId = user?.id;

  const getItemsCount = useCallback(async () => {
    if (!userId) return 0;
    const results = await DB.selectAll<{ count: number }>("SELECT COUNT(*) as count FROM Items WHERE user_id = ?", [userId]);
    return results[0]?.count || 0;
  }, [userId]);

  return { getItemsCount };
};

export const useCustomerCountDB = () => {
  const { user } = useAuth();
  const userId = user?.id;

  const getCustomersCount = useCallback(async () => {
    if (!userId) return 0;
    const results = await DB.selectAll<{ count: number }>("SELECT COUNT(*) as count FROM Customers WHERE user_id = ?", [userId]);
    return results[0]?.count || 0;
  }, [userId]);

  return { getCustomersCount };
};
