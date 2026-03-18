import { renderHook } from '@testing-library/react-native';
import { useItemDB, useInvoiceDB } from '../hooks';
import { DB } from '../index';
import { useAuth } from '../../context/AuthContext';

// Mock dependencies
jest.mock('../index');
jest.mock('../../context/AuthContext');

describe('Database Hooks ROI Logic', () => {
  const mockUser = { id: 1, email: 'admin@asap.com', name: 'Admin' };

  beforeEach(() => {
    jest.clearAllMocks();
    (useAuth as jest.Mock).mockReturnValue({ user: mockUser });
  });

  describe('useItemDB', () => {
    it('getInventorySummary executes correct aggregation SQL', async () => {
      const mockSummary = [{ total_value: 5000, total_items: 100, low_stock: 5 }];
      (DB.selectAll as jest.Mock).mockResolvedValue(mockSummary);

      const { result } = renderHook(() => useItemDB());
      const summary = await result.current.getInventorySummary();

      expect(DB.selectAll).toHaveBeenCalledWith(
        expect.stringContaining('SUM(price * quantity)'),
        [mockUser.id]
      );
      expect(summary).toEqual(mockSummary[0]);
    });

    it('addItem inserts correct item data', async () => {
      (DB.executeQuery as jest.Mock).mockResolvedValue({});

      const { result } = renderHook(() => useItemDB());
      await result.current.addItem('New Item', 1, 100, 50);

      expect(DB.executeQuery).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO Items'),
        ['New Item', 1, 100, 50, mockUser.id]
      );
    });
  });

  describe('useInvoiceDB', () => {
    it('createInvoice decrements stock for each item', async () => {
      (DB.executeQuery as jest.Mock).mockResolvedValue({ insertId: 123 });
      
      const invoiceData = {
        customer_id: 1,
        date: '2026-03-18',
        total: 115,
        vat: 15,
        due_amount: 115,
        items: [
          { item_id: 10, quantity: 2, price: 50, amount: 100 }
        ]
      };

      const { result } = renderHook(() => useInvoiceDB());
      await result.current.createInvoice(invoiceData);

      // Verify invoice insertion
      expect(DB.executeQuery).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO Invoices'),
        expect.arrayContaining([1, '2026-03-18', 115, 15, 115, mockUser.id])
      );

      // Verify stock decrement (THE MOST CRITICAL ROI STEP)
      expect(DB.executeQuery).toHaveBeenCalledWith(
        expect.stringContaining('UPDATE Items SET quantity = quantity - ?'),
        [2, 10, mockUser.id]
      );
    });
  });
});
