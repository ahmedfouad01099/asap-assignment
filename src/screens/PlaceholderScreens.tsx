import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from "react-native";
import { Icon } from "../components/ui/Icon";
import { useTheme } from "../context/ThemeContext";
import { SPACING } from "../theme";

interface PlaceholderScreenProps {
  title: string;
  onBack: () => void;
}

const PlaceholderScreen: React.FC<PlaceholderScreenProps> = ({ title, onBack }) => {
  const { theme } = useTheme();
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.card, borderBottomColor: theme.border }]}>
        <TouchableOpacity onPress={onBack} style={styles.backButton}>
          <Icon name="arrow_back" color={theme.text} size={24} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          {title}
        </Text>
      </View>
      <View style={styles.content}>
        <Icon name="inventory_2" color={theme.primary} size={64} />
        <Text style={[styles.title, { color: theme.text }]}>{title}</Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          This screen is under development based on the design requirements.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export const ItemListScreen = ({ navigation }: any) => (
  <PlaceholderScreen title="Item List" onBack={() => navigation.goBack()} />
);

export const ItemCategoryScreen = ({ navigation }: any) => (
  <PlaceholderScreen title="Item Category" onBack={() => navigation.goBack()} />
);

export const InventoryScreen = ({ navigation }: any) => (
  <PlaceholderScreen title="Inventory" onBack={() => navigation.goBack()} />
);

export const SaleInvoiceListScreen = ({ navigation }: any) => (
  <PlaceholderScreen title="Sale Invoice List" onBack={() => navigation.goBack()} />
);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    letterSpacing: -0.5,
    marginRight: 40,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  title: {
    marginTop: 16,
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    marginTop: 8,
    textAlign: "center",
    fontSize: 14,
    lineHeight: 20,
  },
});
