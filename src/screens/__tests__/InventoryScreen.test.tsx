import React from 'react';
import { render } from '@testing-library/react-native';
import { InventoryScreen } from '../InventoryScreen';
import { useInventory } from '../../hooks/useInventory';
import { useTheme } from '../../context/ThemeContext';

// Mock useInventory
jest.mock('../../hooks/useInventory');

// Mock useTheme
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

const mockStats = {
  totalQty: 100,
  lowStock: 5,
  outOfStock: 2,
  totalValue: 5000,
};

describe('InventoryScreen', () => {
  const mockNavigation = { goBack: jest.fn(), navigate: jest.fn() };

  beforeEach(() => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: mockTheme,
      isDark: false,
      toggleTheme: jest.fn(),
    });

    (useInventory as jest.Mock).mockReturnValue({
      items: [
        { id: 1, name: 'Item 1', quantity: 0, price: 10, category_name: 'Cat A' },
        { id: 2, name: 'Item 2', quantity: 5, price: 20, category_name: 'Cat B' },
        { id: 3, name: 'Item 3', quantity: 50, price: 30, category_name: 'Cat C' },
      ],
      stats: mockStats,
      isLoading: false,
      getStockStatus: jest.fn((qty) => {
        if (qty === 0) return { label: 'Out of Stock', color: '#dc3545' };
        if (qty < 10) return { label: 'Low Stock', color: '#ffc107' };
        return { label: 'Healthy', color: '#28a745' };
      }),
    });
  });

  const renderScreen = () => {
    return render(<InventoryScreen navigation={mockNavigation} />);
  };

  it('renders summary statistics correctly', () => {
    const { getByText } = renderScreen();

    expect(getByText('100')).toBeTruthy(); // totalQty
    expect(getByText('7')).toBeTruthy();   // lowStock + outOfStock (5 + 2)
  });

  it('renders inventory items with correct status labels', () => {
    const { getByText } = renderScreen();

    expect(getByText('Item 1')).toBeTruthy();
    expect(getByText('Item 2')).toBeTruthy();
    expect(getByText('Item 3')).toBeTruthy();

    expect(getByText('Out of Stock')).toBeTruthy();
    expect(getByText('Low Stock')).toBeTruthy();
    expect(getByText('Healthy')).toBeTruthy();
  });

  it('shows loading message when isLoading is true and items are empty', () => {
    (useInventory as jest.Mock).mockReturnValue({
      items: [],
      stats: { totalQty: 0, lowStock: 0, outOfStock: 0, totalValue: 0 },
      isLoading: true,
      getStockStatus: jest.fn(),
    });

    const { getByText } = renderScreen();
    expect(getByText('Loading inventory...')).toBeTruthy();
  });

  it('shows empty state message when no items exist and not loading', () => {
    (useInventory as jest.Mock).mockReturnValue({
      items: [],
      stats: { totalQty: 0, lowStock: 0, outOfStock: 0, totalValue: 0 },
      isLoading: false,
      getStockStatus: jest.fn(),
    });

    const { getByText } = renderScreen();
    expect(getByText('Your warehouse is empty.')).toBeTruthy();
  });
});
