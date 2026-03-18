import React from 'react';
import { View, Text, Modal, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

interface SelectionModalProps {
  visible: boolean;
  title: string;
  testID?: string;
  accessibilityLabel?: string;
  data: any[];
  onSelect: (item: any) => void;
  onClose: () => void;
  renderItem?: ({ item, index }: { item: any; index: number }) => React.ReactElement;
  keyExtractor?: (item: any) => string;
}

export const SelectionModal: React.FC<SelectionModalProps> = ({ 
  visible, 
  title, 
  testID,
  accessibilityLabel,
  data, 
  onSelect, 
  onClose,
  renderItem,
  keyExtractor = (item) => item.id.toString(),
}) => {
  const { theme } = useTheme();

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, { backgroundColor: theme.card }]}>
          <Text 
            testID={testID}
            accessibilityLabel={accessibilityLabel}
            style={[styles.modalTitle, { color: theme.text }]}
          >
            {title}
          </Text>
          <FlatList
            data={data}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            ListEmptyComponent={
              <View style={{ padding: 20, alignItems: 'center' }}>
                <Text style={{ color: theme.textSecondary }}>No items found</Text>
              </View>
            }
          />
          <TouchableOpacity onPress={onClose} style={styles.modalClose}>
            <Text style={{ color: theme.primary }}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalClose: {
    marginTop: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
});
