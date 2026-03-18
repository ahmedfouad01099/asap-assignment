import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { AuthProvider } from './src/context/AuthContext';
import { AppNavigator } from './src/navigation/AppNavigator';

import { DB } from './src/database';

const MainApp = () => {
  const { isDark } = useTheme();

  React.useEffect(() => {
    DB.init().catch(err => console.error("DB Init error:", err));
  }, []);

  return (
    <NavigationContainer>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      
      <AppNavigator />


    </NavigationContainer>
  );
};

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ThemeProvider>
          <MainApp />
        </ThemeProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

export default App;

