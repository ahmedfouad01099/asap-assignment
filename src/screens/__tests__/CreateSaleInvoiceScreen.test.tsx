import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { CreateSaleInvoiceScreen } from '../CreateSaleInvoiceScreen';
import { useCreateSaleInvoice } from '../../hooks/useCreateSaleInvoice';
import { useTheme } from '../../context/ThemeContext';

// Mock the hook
jest.mock('../../hooks/useCreateSaleInvoice');
jest.mock('../../context/ThemeContext');

// Mock Icon component
jest.mock('../../components/ui/Icon', () => {
  const { Text } = require('react-native');
  return {
    Icon: ({ name }: { name: string }) => <Text>{name}</Text>,
  };
});

const mockTheme = {
  background: '#ffffff',
  card: '#f0f0f0',
  text: '#000000',
  textSecondary: '#666666',
  primary: '#007bff',
  success: '#28a745',
  warning: '#ffc107',
  danger: '#dc3545',
  border: '#dddddd',
};

describe('CreateSaleInvoiceScreen', () => {
  const mockNavigation = { goBack: jest.fn(), navigate: jest.fn() };
  const mockSetItemModalVisible = jest.fn();
  const mockSetCustomerModalVisible = jest.fn();
  const mockHandleSave = jest.fn();

  beforeEach(() => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: mockTheme,
      isDark: false,
    });

    (useCreateSaleInvoice as jest.Mock).mockReturnValue({
      loading: false,
      customers: [{ id: 1, name: 'John Doe', phone: '123' }],
      items: [{ id: 1, name: 'Product A', price: 100, quantity: 10 }],
      selectedCustomer: { id: 1, name: 'John Doe', phone: '123' },
      lineItems: [],
      itemModalVisible: false,
      setItemModalVisible: mockSetItemModalVisible,
      customerModalVisible: false,
      setCustomerModalVisible: mockSetCustomerModalVisible,
      invoiceNumber: '#INV-123456',
      today: '2026-03-18',
      subtotal: 0,
      vat: 0,
      total: 0,
      addLineItem: jest.fn(),
      removeLineItem: jest.fn(),
      handleSave: mockHandleSave,
    });
  });

  const renderScreen = () => {
    return render(<CreateSaleInvoiceScreen navigation={mockNavigation} />);
  };

  it('renders invoice details correctly', () => {
    const { getByText } = renderScreen();

    expect(getByText('#INV-123456')).toBeTruthy();
    expect(getByText('John Doe')).toBeTruthy();
  });

  it('opens item modal when clicking "Add Line Item"', () => {
    const { getByText } = renderScreen();
    
    const addButton = getByText('Add Line Item');
    fireEvent.press(addButton);

    expect(mockSetItemModalVisible).toHaveBeenCalledWith(true);
  });

  it('calls handleSave when clicking "Complete Sale"', () => {
    const { getByText } = renderScreen();
    
    const saveButton = getByText('Complete Sale');
    fireEvent.press(saveButton);

    expect(mockHandleSave).toHaveBeenCalled();
  });

  it('displays subtotal and total accurately', () => {
    (useCreateSaleInvoice as jest.Mock).mockReturnValue({
      loading: false,
      selectedCustomer: { id: 1, name: 'John Doe', phone: '123' },
      lineItems: [{ item: { id: 1, name: 'Product A', price: 100 }, quantity: 1 }],
      invoiceNumber: '#INV-123456',
      today: '2026-03-18',
      subtotal: 100,
      vat: 15,
      total: 115,
      itemModalVisible: false,
      customerModalVisible: false,
      setItemModalVisible: jest.fn(),
      setCustomerModalVisible: jest.fn(),
      handleSave: jest.fn(),
    });

    const { getAllByText, getByText } = renderScreen();

    // $100.00 appears twice: once in Line Item and once in Subtotal
    expect(getAllByText('$100.00')).toHaveLength(2); 
    expect(getByText('$115.00')).toBeTruthy(); // Total
  });
});
