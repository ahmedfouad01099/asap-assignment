import React from 'react';
import { StatusBar, TouchableOpacity, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { LoginScreen } from './src/screens/LoginScreen';
import { DashboardScreen } from './src/screens/DashboardScreen';
import { ItemMenuOverviewScreen } from './src/screens/ItemMenuOverviewScreen';
import { AddNewItemFormScreen } from './src/screens/AddNewItemFormScreen';
import { CustomerManagementListScreen } from './src/screens/CustomerManagementListScreen';
import { CreateSaleInvoiceScreen } from './src/screens/CreateSaleInvoiceScreen';
import { 
  ItemListScreen, 
  ItemCategoryScreen, 
  InventoryScreen, 
  SaleInvoiceListScreen 
} from './src/screens/PlaceholderScreens';
import { Icon } from './src/components/ui/Icon';
import { RootStackParamList } from './src/navigation/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const MainApp = () => {
  const { isDark, toggleTheme, theme } = useTheme();

  return (
    <NavigationContainer>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="ItemMenu" component={ItemMenuOverviewScreen} />
        <Stack.Screen name="AddItem" component={AddNewItemFormScreen} />
        <Stack.Screen name="ItemList" component={ItemListScreen} />
        <Stack.Screen name="ItemCategory" component={ItemCategoryScreen} />
        <Stack.Screen name="Inventory" component={InventoryScreen} />
        <Stack.Screen name="Customers" component={CustomerManagementListScreen} />
        <Stack.Screen name="SaleInvoiceList" component={SaleInvoiceListScreen} />
        <Stack.Screen name="CreateInvoice" component={CreateSaleInvoiceScreen} />
      </Stack.Navigator>
      
      {/* Theme Toggle for visibility during development */}
      <TouchableOpacity 
        onPress={toggleTheme}
        style={[styles.themeToggle, { backgroundColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(19, 91, 236, 0.1)' }]}
      >
        <Icon name="visibility" color={isDark ? "white" : "#135bec"} size={20} />
      </TouchableOpacity>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  themeToggle: {
    position: 'absolute',
    top: 56, // top-14 equivalent in RN (14 * 4)
    right: 16, // right-4 equivalent
    padding: 8, // p-2 equivalent
    borderRadius: 20, // rounded-full equivalent
    zIndex: 50,
  },
});

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <MainApp />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default App;

