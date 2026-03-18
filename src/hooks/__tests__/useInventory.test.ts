import { renderHook } from '@testing-library/react-native';
import { useInventory } from '../useInventory';
import { useItemList } from '../useItemList';
import { useTheme } from '../../context/ThemeContext';

// Mock the dependencies
jest.mock('../useItemList');
jest.mock('../../context/ThemeContext');

const mockTheme = {
  success: '#success',
  warning: '#warning',
  danger: '#danger',
};

describe('useInventory', () => {
  beforeEach(() => {
    (useTheme as jest.Mock).mockReturnValue({ theme: mockTheme });
  });

  it('calculates stats correctly for empty items', () => {
    (useItemList as jest.Mock).mockReturnValue({
      items: [],
      isLoading: false,
      fetchItems: jest.fn(),
    });

    const { result } = renderHook(() => useInventory());

    expect(result.current.stats).toEqual({
      totalQty: 0,
      lowStock: 0,
      outOfStock: 0,
      totalValue: 0,
    });
  });

  it('calculates stats correctly for mixed items', () => {
    const mockItems = [
      { id: 1, name: 'Item 1', quantity: 20, price: 10 }, // Healthy
      { id: 2, name: 'Item 2', quantity: 5, price: 20 },  // Low Stock
      { id: 3, name: 'Item 3', quantity: 0, price: 30 },  // Out of Stock
    ];

    (useItemList as jest.Mock).mockReturnValue({
      items: mockItems,
      isLoading: false,
      fetchItems: jest.fn(),
    });

    const { result } = renderHook(() => useInventory());

    expect(result.current.stats).toEqual({
      totalQty: 25,
      lowStock: 1,
      outOfStock: 1,
      totalValue: 300, // (20*10) + (5*20) + (0*30)
    });
  });

  it('returns correct stock status', () => {
    (useItemList as jest.Mock).mockReturnValue({
      items: [],
      isLoading: false,
      fetchItems: jest.fn(),
    });

    const { result } = renderHook(() => useInventory());

    // Out of Stock
    expect(result.current.getStockStatus(0)).toEqual({
      label: 'Out of Stock',
      color: '#danger',
    });

    // Low Stock
    expect(result.current.getStockStatus(5)).toEqual({
      label: 'Low Stock',
      color: '#warning',
    });

    // Healthy
    expect(result.current.getStockStatus(15)).toEqual({
      label: 'Healthy',
      color: '#success',
    });
  });
});
