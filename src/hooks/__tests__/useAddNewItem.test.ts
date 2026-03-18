import { renderHook, act } from '@testing-library/react-native';
import { useAddNewItem } from '../useAddNewItem';
import { useItemDB, useCategoryDB } from '../../database/hooks';

// Mock dependencies
jest.mock('../../database/hooks');
import { Alert } from 'react-native';

describe('useAddNewItem ROI Logic', () => {
  const mockNavigation = { goBack: jest.fn() };
  const mockAddItem = jest.fn();
  const mockGetCategories = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Alert, 'alert');
    (useItemDB as jest.Mock).mockReturnValue({ addItem: mockAddItem });
    (useCategoryDB as jest.Mock).mockReturnValue({ getCategories: mockGetCategories });
  });

  it('validates required fields before saving', async () => {
    mockGetCategories.mockResolvedValue([]);
    const { result } = renderHook(() => useAddNewItem(mockNavigation));

    await act(async () => {
      await result.current.handleSave();
    });

    expect(Alert.alert).toHaveBeenCalledWith("Error", "Please fill all fields");
    expect(mockAddItem).not.toHaveBeenCalled();
  });

  it('calls addItem with correctly parsed values', async () => {
    mockGetCategories.mockResolvedValue([{ id: 1, name: 'Electronics' }]);
    const { result } = renderHook(() => useAddNewItem(mockNavigation));

    // Wait for categories to load
    await act(async () => {});

    act(() => {
      result.current.setName('Test Item');
      result.current.setPrice('99.99');
      result.current.setQuantity('10');
    });

    await act(async () => {
      await result.current.handleSave();
    });

    expect(mockAddItem).toHaveBeenCalledWith('Test Item', 1, 99.99, 10);
    expect(Alert.alert).toHaveBeenCalledWith("Success", "Item added successfully", expect.any(Array));
  });

  it('toggles through categories correctly', async () => {
    const categories = [
      { id: 1, name: 'A' },
      { id: 2, name: 'B' }
    ];
    mockGetCategories.mockResolvedValue(categories);
    
    const { result } = renderHook(() => useAddNewItem(mockNavigation));
    await act(async () => {}); // Load categories

    expect(result.current.categoryId).toBe(1);

    act(() => {
      result.current.toggleCategory();
    });
    expect(result.current.categoryId).toBe(2);

    act(() => {
      result.current.toggleCategory();
    });
    expect(result.current.categoryId).toBe(1);
  });
});
