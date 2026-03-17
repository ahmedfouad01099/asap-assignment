export const THEMES = {
  light: {
    background: "#f6f6f8",
    card: "#ffffff",
    text: "#0f172a",
    textSecondary: "#64748b",
    border: "#e2e8f0",
    primary: "#135bec",
    success: "#22c55e",
    warning: "#f59e0b",
    danger: "#ef4444",
  },
  dark: {
    background: "#101622",
    card: "#1e293b",
    text: "#f1f5f9",
    textSecondary: "#94a3b8",
    border: "#334155",
    primary: "#135bec",
    success: "#22c55e",
    warning: "#f59e0b",
    danger: "#ef4444",
  },
};

export const COLORS = THEMES.light; // Legacy fallback

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const SHADOWS = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  primary: {
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  }
};

export const theme = {
  colors: COLORS,
  spacing: SPACING,
  shadows: SHADOWS,
  fonts: {
    display: "Public Sans",
  }
};
