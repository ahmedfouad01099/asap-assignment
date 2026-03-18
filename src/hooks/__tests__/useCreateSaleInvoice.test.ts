import { renderHook, act } from '@testing-library/react-native';
import { useCreateSaleInvoice } from '../useCreateSaleInvoice';
import { useItemDB, useCustomerDB, useInvoiceDB } from '../../database/hooks';

// Mock database hooks
jest.mock('../../database/hooks');

describe('useCreateSaleInvoice', () => {
  const mockItems = [
    { id: 1, name: 'Item A', price: 100, quantity: 10, category_name: 'Cat 1', category_id: 1 },
    { id: 2, name: 'Item B', price: 200, quantity: 5, category_name: 'Cat 2', category_id: 1 },
  ];

  const mockCustomers = [
    { id: 1, name: 'Customer 1', phone: '123', email: 'c1@test.com' },
  ];

  beforeEach(() => {
    (useItemDB as jest.Mock).mockReturnValue({
      getItems: jest.fn().mockResolvedValue(mockItems),
    });
    (useCustomerDB as jest.Mock).mockReturnValue({
      getCustomers: jest.fn().mockResolvedValue(mockCustomers),
    });
    (useInvoiceDB as jest.Mock).mockReturnValue({
      createInvoice: jest.fn().mockResolvedValue(1),
    });
  });

  it('calculates totals correctly when adding items', async () => {
    const mockNav = { goBack: jest.fn() };
    const { result } = renderHook(() => useCreateSaleInvoice(mockNav));

    // Initially 0
    expect(result.current.subtotal).toBe(0);
    expect(result.current.vat).toBe(0);
    expect(result.current.total).toBe(0);

    // Add Item A (100)
    await act(async () => {
      result.current.addLineItem(mockItems[0]);
    });

    expect(result.current.lineItems).toHaveLength(1);
    expect(result.current.subtotal).toBe(100);
    expect(result.current.vat).toBe(15); // 15% of 100
    expect(result.current.total).toBe(115);

    // Add Item B (200)
    await act(async () => {
      result.current.addLineItem(mockItems[1]);
    });

    expect(result.current.lineItems).toHaveLength(2);
    expect(result.current.subtotal).toBe(300);
    expect(result.current.vat).toBe(45); // 15% of 300
    expect(result.current.total).toBe(345);
  });

  it('increments quantity correctly for existing items', async () => {
    const mockNav = { goBack: jest.fn() };
    const { result } = renderHook(() => useCreateSaleInvoice(mockNav));

    await act(async () => {
      result.current.addLineItem(mockItems[0]); // Qty 1
      result.current.addLineItem(mockItems[0]); // Qty 2
    });

    expect(result.current.lineItems).toHaveLength(1);
    expect(result.current.lineItems[0].quantity).toBe(2);
    expect(result.current.subtotal).toBe(200);
  });

  it('removes line items correctly', async () => {
    const mockNav = { goBack: jest.fn() };
    const { result } = renderHook(() => useCreateSaleInvoice(mockNav));

    await act(async () => {
      result.current.addLineItem(mockItems[0]);
      result.current.addLineItem(mockItems[1]);
    });

    expect(result.current.lineItems).toHaveLength(2);

    await act(async () => {
      result.current.removeLineItem(mockItems[0].id);
    });

    expect(result.current.lineItems).toHaveLength(1);
    expect(result.current.lineItems[0].item.id).toBe(2);
    expect(result.current.subtotal).toBe(200);
  });
});
