import '@testing-library/jest-native/extend-expect';

// Mock react-native
jest.mock('react-native', () => {
  const rn = jest.requireActual('react-native');
  rn.Platform.select = jest.fn(dict => dict.ios || dict.default);
  rn.Platform.OS = 'ios';
  
  // Mock NativeModules for sqlite
  rn.NativeModules.SQLite = {
    open: jest.fn(),
    close: jest.fn(),
    executeSql: jest.fn(),
  };
  
  return rn;
});

// Mock react-native-sqlite-storage
jest.mock('react-native-sqlite-storage', () => ({
  DEBUG: jest.fn(),
  enablePromise: jest.fn(),
  openDatabase: jest.fn(() => ({
    transaction: jest.fn((cb) => cb({ executeSql: jest.fn() })),
    executeSql: jest.fn().mockResolvedValue([{
      rows: {
        length: 0,
        item: (i) => null,
      },
      insertId: 0,
      rowsAffected: 0,
    }]),
  })),
}));

// Mock react-native-vector-icons
jest.mock('react-native-vector-icons/MaterialIcons', () => 'Icon');

// Mock react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => {
  const inset = { top: 0, right: 0, bottom: 0, left: 0 };
  return {
    SafeAreaProvider: jest.fn(({ children }) => children),
    SafeAreaView: jest.fn(({ children }) => children),
    useSafeAreaInsets: jest.fn(() => inset),
    SafeAreaInsetsContext: {
      Consumer: jest.fn(({ children }) => children(inset)),
    },
  };
});

// Mock @react-navigation/native
jest.mock('@react-navigation/native', () => {
  const React = require('react');
  return {
    useNavigation: () => ({
      navigate: jest.fn(),
      goBack: jest.fn(),
      reset: jest.fn(),
    }),
    useRoute: () => ({
      params: {},
    }),
    useFocusEffect: (cb) => {
      React.useEffect(() => {
        cb();
      }, []);
    },
    useIsFocused: () => true,
    NavigationContainer: ({ children }) => children,
    DefaultTheme: {
      colors: {
        primary: '',
        background: '',
        card: '',
        text: '',
        border: '',
        notification: '',
      },
    },
  };
});

// Mock @react-navigation/native-stack
jest.mock('@react-navigation/native-stack', () => ({
  createNativeStackNavigator: jest.fn(() => ({
    Navigator: jest.fn(({ children }) => children),
    Screen: jest.fn(() => null),
  })),
}));

// Mock @react-navigation/bottom-tabs
jest.mock('@react-navigation/bottom-tabs', () => ({
  createBottomTabNavigator: jest.fn(() => ({
    Navigator: jest.fn(({ children }) => children),
    Screen: jest.fn(() => null),
  })),
}));
