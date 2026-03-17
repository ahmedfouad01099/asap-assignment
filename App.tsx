import React from 'react';
import { StatusBar, TouchableOpacity } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { AuthProvider } from './src/context/AuthContext';
import { AppNavigator } from './src/navigation/AppNavigator';
import { Icon } from './src/components/ui/Icon';
import { DB } from './src/database';

const MainApp = () => {
  const { isDark, toggleTheme } = useTheme();

  React.useEffect(() => {
    DB.init().catch(err => console.error("DB Init error:", err));
  }, []);

  return (
    <NavigationContainer>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      
      <AppNavigator />

      {/* Theme Toggle for visibility during development */}
      <TouchableOpacity
        onPress={toggleTheme}
        style={{
          position: 'absolute',
          top: 56,
          right: 16,
          backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(19, 91, 236, 0.1)',
          padding: 8,
          borderRadius: 20,
          zIndex: 50
        }}
      >
        <Icon name="visibility" color={isDark ? "white" : "#135bec"} size={20} />
      </TouchableOpacity>
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

