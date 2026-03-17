export interface Category {
  id: number;
  name: string;
}

export interface Item {
  id: number;
  name: string;
  category_id: number;
  price: number;
  quantity: number;
}

export interface Customer {
  id: number;
  name: string;
  phone: string;
  email?: string;
}

export interface Invoice {
  id: number;
  invoice_number: string;
  customer_id: number;
  date: string;
  total: number;
  vat: number;
  due_amount: number;
}

export interface InvoiceItem {
  id: number;
  invoice_id: number;
  item_id: number;
  quantity: number;
  price: number;
  amount: number;
}
