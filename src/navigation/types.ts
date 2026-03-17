export type TabStackParamList = {
  Dashboard: undefined;
  ItemMenu: undefined;
  SaleInvoiceList: undefined;
  Customers: undefined;
};

export type RootStackParamList = {
  Login: undefined;
  Main: { screen?: keyof TabStackParamList }; // The Main screen is the Tab Navigator
  AddItem: undefined;
  ItemList: undefined;
  ItemCategory: undefined;
  Inventory: undefined;
  CreateInvoice: undefined;
};
