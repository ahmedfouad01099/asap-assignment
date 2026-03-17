import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export type IconName = 
  | "inventory_2" | "mail" | "lock" | "visibility" | "login" 
  | "arrow-back-ios" | "notifications" | "menu" | "receipt-long" 
  | "group" | "category" | "point-of-sale" | "home" | "list-alt" 
  | "shopping-cart" | "person" | "chevron-right" | "search" 
  | "info" | "database" | "expand-more" | "filter-list" 
  | "call" | "edit" | "delete" | "delete-outline" | "add" 
  | "calendar-today" | "unfold-more" | "add-circle" | "save" 
  | "arrow-back" | "dashboard" | "inventory" | "people";

interface IconProps {
  name: string; // Keep string to be flexible, but we target MaterialIcons
  color?: string;
  size?: number;
}

/**
 * A wrapper around react-native-vector-icons/MaterialIcons.
 * Note: Some names might need mapping if they differ from the custom SVG names.
 */
export const Icon: React.FC<IconProps> = ({ name, color = "#000", size = 24 }) => {
  // Map underscores to hyphens for MaterialIcons library convention if needed
  // Many MaterialIcons in the library use hyphens instead of underscores found in the web set
  const normalizedName = name.replace(/_/g, '-');
  
  return <MaterialIcons name={normalizedName} color={color} size={size} />;
};
