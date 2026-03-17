import React, { useState, useCallback } from "react";
import { useInvoiceDB } from "../database/hooks";
import { useFocusEffect } from "@react-navigation/native";

export const useSaleInvoiceList = () => {
  const { getInvoices } = useInvoiceDB();
  const [invoices, setInvoices] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchInvoices = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await getInvoices();
      setInvoices(data);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    } finally {
      setIsLoading(false);
    }
  }, [getInvoices]);

  useFocusEffect(
    React.useCallback(() => {
      fetchInvoices();
    }, [fetchInvoices])
  );

  return {
    invoices,
    isLoading,
    fetchInvoices
  };
};
