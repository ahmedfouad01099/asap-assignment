import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from '../context/ThemeContext';
import { Icon } from '../components/ui/Icon';
import { RootStackParamList, TabStackParamList } from './types';

// Screens
import { LoginScreen } from '../screens/LoginScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { ItemMenuOverviewScreen } from '../screens/ItemMenuOverviewScreen';
import { AddNewItemFormScreen } from '../screens/AddNewItemFormScreen';
import { CustomerManagementListScreen } from '../screens/CustomerManagementListScreen';
import { CreateSaleInvoiceScreen } from '../screens/CreateSaleInvoiceScreen';
import { ItemListScreen } from '../screens/ItemListScreen';
import { ItemCategoryScreen } from '../screens/ItemCategoryScreen';
import { SaleInvoiceListScreen } from '../screens/SaleInvoiceListScreen';
import { InventoryScreen } from '../screens/InventoryScreen';
import { TouchableOpacity } from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabStackParamList>();

// ✅ Reusable tab button factory (TypeScript-safe)
const createTabButton =
  (testID: string) =>
    (props: any) => {
      const { delayLongPress, ...rest } = props;

      return (
        <TouchableOpacity
          {...rest}
          delayLongPress={delayLongPress ?? undefined}
          testID={testID}
        />
      );
    };

const TabNavigator = () => {
  const { theme } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarStyle: {
          backgroundColor: theme.card,
          borderTopColor: theme.border,
          height: 85,
          paddingBottom: 25,
          paddingTop: 10,
        },
        tabBarIcon: ({ color, size }) => {
          let iconName: "home" | "inventory_2" | "receipt_long" | "group" = 'home';
          if (route.name === 'Dashboard') iconName = 'home';
          else if (route.name === 'ItemMenu') iconName = 'inventory_2';
          else if (route.name === 'SaleInvoiceList') iconName = 'receipt_long';
          else if (route.name === 'Customers') iconName = 'group';

          return <Icon name={iconName} color={color} size={size} />;
        },
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: "Home",
          tabBarButton: createTabButton("tab-home"),
        }}
      />

      <Tab.Screen
        name="ItemMenu"
        component={ItemMenuOverviewScreen}
        options={{
          tabBarLabel: "Items",
          tabBarButton: createTabButton("tab-items"),
        }}
      />

      <Tab.Screen
        name="SaleInvoiceList"
        component={SaleInvoiceListScreen}
        options={{
          tabBarLabel: "Sales",
          tabBarButton: createTabButton("tab-sales"),
        }}
      />

      <Tab.Screen
        name="Customers"
        component={CustomerManagementListScreen}
        options={{
          tabBarLabel: "CRM",
          tabBarButton: createTabButton("tab-crm"), // ✅ Maestro target
        }}
      />
    </Tab.Navigator>
  );
};

export const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="AddItem" component={AddNewItemFormScreen} />
      <Stack.Screen name="ItemList" component={ItemListScreen} />
      <Stack.Screen name="ItemCategory" component={ItemCategoryScreen} />
      <Stack.Screen name="Inventory" component={InventoryScreen} />
      <Stack.Screen name="CreateInvoice" component={CreateSaleInvoiceScreen} />
    </Stack.Navigator>
  );
};
