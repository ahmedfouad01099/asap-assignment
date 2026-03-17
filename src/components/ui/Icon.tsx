import React from "react";
import { Svg, Path, Circle, Rect } from "react-native-svg";

interface IconProps {
  name: "inventory_2" | "mail" | "lock" | "visibility" | "login" | "arrow_back_ios" | "notifications" | "menu" | "receipt_long" | "group" | "category" | "point_of_sale" | "home" | "list_alt" | "shopping_cart" | "person" | "chevron_right" | "search" | "info" | "database" | "expand_more" | "filter_list" | "call" | "edit" | "delete" | "add" | "calendar_today" | "unfold_more" | "add_circle" | "save" | "arrow_back";
  color?: string;
  size?: number;
}

export const Icon: React.FC<IconProps> = ({ name, color = "currentColor", size = 24 }) => {
  const getIcon = () => {
    switch (name) {
      case "inventory_2":
        return <Path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 18H5V4h14v16zM17 12H7v-2h10v2zm0-4H7V6h10v2z" fill={color} />;
      case "mail":
        return <Path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" fill={color} />;
      case "lock":
        return <Path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" fill={color} />;
      case "visibility":
        return <Path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill={color} />;
      case "login":
        return <Path d="M11 7L9.6 8.4l2.6 2.6H2v2h10.2l-2.6 2.6L11 17l5-5-5-5zm9 12h-8v2h8c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-8v2h8v14z" fill={color} />;
      case "arrow_back_ios":
        return <Path d="M11.67 3.87L9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z" fill={color} />;
      case "chevron_right":
        return <Path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" fill={color} />;
      case "search":
        return <Path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" fill={color} />;
      case "info":
        return <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" fill={color} />;
      case "database":
        return <Path d="M12 2C6.48 2 2 4.02 2 6.5s4.48 4.5 10 4.5 10-2.02 10-4.5S17.52 2 12 2zM2 9.5c0 2.48 4.48 4.5 10 4.5s10-2.02 10-4.5v2c0 2.48-4.48 4.5-10 4.5s-10-2.02-10-4.5v-2zm0 4.5c0 2.48 4.48 4.5 10 4.5s10-2.02 10-4.5v2c0 2.48-4.48 4.5-10 4.5s-10-2.02-10-4.5v-2z" fill={color} />;
      case "expand_more":
        return <Path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" fill={color} />;
      case "filter_list":
        return <Path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z" fill={color} />;
      case "call":
        return <Path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56-.35-.11-.74-.03-1.01.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.58l2.2-2.21c.28-.27.36-.66.25-1.01-.36-1.11-.56-2.3-.56-3.53 0-.55-.45-1-1-1H4.03c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.59c0-.55-.45-1-1-1z" fill={color} />;
      case "edit":
        return <Path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" fill={color} />;
      case "delete":
        return <Path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill={color} />;
      case "add":
        return <Path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill={color} />;
      case "calendar_today":
        return <Path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z" fill={color} />;
      case "unfold_more":
        return <Path d="M12 5.83L15.17 9l1.41-1.41L12 3 7.41 7.59 8.83 9 12 5.83zm0 12.34L8.83 15l-1.41 1.41L12 21l4.59-4.59L15.17 15 12 18.17z" fill={color} />;
      case "add_circle":
        return <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" fill={color} />;
      case "save":
        return <Path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z" fill={color} />;
      case "arrow_back":
        return <Path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" fill={color} />;
      default:
        return <Circle cx="12" cy="12" r="10" fill={color} />;
    }
  };

  return (
    <Svg height={size} width={size} viewBox="0 0 24 24">
      {getIcon()}
    </Svg>
  );
};
