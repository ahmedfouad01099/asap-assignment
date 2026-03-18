import { renderHook, act } from '@testing-library/react-native';
import { useItemList } from '../useItemList';
import { useItemDB } from '../../database/hooks';

// Mock database hooks
jest.mock('../../database/hooks');

describe('useItemList', () => {
  const mockItems = [
    { id: 1, name: 'Item A', price: 100, quantity: 10, category_name: 'Cat 1', category_id: 1 },
  ];

  const mockGetItems = jest.fn();

  beforeEach(() => {
    mockGetItems.mockReset();
    (useItemDB as jest.Mock).mockReturnValue({
      getItems: mockGetItems,
      deleteItem: jest.fn().mockResolvedValue(true),
    });
  });

  it('fetches items correctly on mount via useFocusEffect', async () => {
    mockGetItems.mockResolvedValue(mockItems);

    const { result } = renderHook(() => useItemList());

    // Wait for the fetch within useFocusEffect to complete
    await act(async () => {
      // The mock useFocusEffect in jest.setup.js calls the callback immediately
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.items).toEqual(mockItems);
    expect(mockGetItems).toHaveBeenCalledTimes(1);
  });

  it('provides a manual fetchItems function', async () => {
    mockGetItems.mockResolvedValue(mockItems);

    const { result } = renderHook(() => useItemList());
    
    await act(async () => {
      await result.current.fetchItems();
    });

    // Called once on mount, once manually
    expect(mockGetItems).toHaveBeenCalledTimes(2);
  });
});
